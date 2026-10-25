import sys
import os

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

try:
    from google import genai
except ImportError:
    genai = None

from flask import Flask, render_template, request, jsonify

try:
    from docx import Document
except ImportError:
    Document = None

try:
    from pypdf import PdfReader
except ImportError:
    PdfReader = None

app = Flask(__name__)
app.config["TEMPLATES_AUTO_RELOAD"] = True
app.config["SEND_FILE_MAX_AGE_DEFAULT"] = 0
DATA_FOLDER = "data"

# ================== CẤU HÌNH API ==================
# Tự động nạp cấu hình từ .env nếu tồn tại
_env_file = os.path.join(os.path.dirname(__file__), ".env")
if os.path.exists(_env_file):
    try:
        with open(_env_file, "r", encoding="utf-8") as _f:
            for _line in _f:
                _line = _line.strip()
                if _line and not _line.startswith("#") and "=" in _line:
                    _k, _v = _line.split("=", 1)
                    os.environ.setdefault(_k.strip(), _v.strip().strip('"').strip("'"))
    except Exception:
        pass

# API key của Google Gemini
GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")

# SDK mới của Google GenAI
client = None
MODEL_NAME = "gemini-3.5-flash-lite"
FALLBACK_MODELS = ["gemini-3.5-flash-lite", "gemini-3.1-flash-lite", "gemini-3.6-flash", "gemini-3.8-flash"]

try:
    if GEMINI_API_KEY:
        client = genai.Client(api_key=GEMINI_API_KEY)
        ai_model = MODEL_NAME
        model_name = MODEL_NAME
        print(f"--- Đã khởi tạo Gemini: {MODEL_NAME} thành công! ---")
    else:
        ai_model = MODEL_NAME
        model_name = MODEL_NAME
        print("--- Lưu ý: Chưa có GEMINI_API_KEY ---")
except Exception as e:
    client = None
    ai_model = None
    model_name = "Error"
    print(f"--- Lỗi khởi tạo Gemini: {e} ---")

# Biến lưu trữ dữ liệu tập trung để tăng tốc
GLOBAL_CONTEXT = ""

def read_content(path):
    try:
        lower_path = path.lower()
        if lower_path.endswith(".txt"):
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                return f.read()

        elif lower_path.endswith(".docx"):
            if Document is None:
                print(f"Cảnh báo: Chưa cài python-docx để đọc {path}")
                return ""
            doc = Document(path)
            parts = []
            for p in doc.paragraphs:
                txt = p.text.strip()
                if txt:
                    parts.append(txt)
            # Trích xuất toàn bộ bảng biểu (rất quan trọng trong quy chế thi đua)
            for table in doc.tables:
                for row in table.rows:
                    row_cells = [cell.text.strip() for cell in row.cells if cell.text.strip()]
                    if row_cells:
                        # Loại bỏ các ô trùng lặp do merge cells
                        seen = set()
                        unique_cells = []
                        for c in row_cells:
                            if c not in seen:
                                seen.add(c)
                                unique_cells.append(c)
                        parts.append(" | ".join(unique_cells))
            return "\n".join(parts)

        elif lower_path.endswith(".pdf"):
            if PdfReader is None:
                print(f"Cảnh báo: Chưa cài pypdf để đọc {path}")
                return ""
            reader = PdfReader(path)
            texts = []
            for page in reader.pages:
                text = page.extract_text()
                if text:
                    texts.append(text)
            return "\n".join(texts)

    except Exception as e:
        print(f"Lỗi đọc file {path}: {e}")

    return ""

def refresh_context():
    """Đọc tất cả file một lần duy nhất và lưu vào RAM (loại trừ trùng lặp)."""
    global GLOBAL_CONTEXT

    print("--- Đang nạp dữ liệu vào bộ nhớ đệm... ---")
    temp_text = ""

    if not os.path.exists(DATA_FOLDER):
        os.makedirs(DATA_FOLDER)

    files_loaded = []
    # Ưu tiên đọc .docx, nếu không có mới đọc .txt hoặc .pdf có cùng tên
    all_files = os.listdir(DATA_FOLDER)
    seen_bases = set()

    # Sắp xếp để .docx được đọc trước, tránh đọc trùng file .txt phụ
    sorted_files = sorted(all_files, key=lambda x: (not x.lower().endswith(".docx"), x))

    for f in sorted_files:
        if f.startswith("~$"):
            continue
        lower_f = f.lower()
        if lower_f.endswith((".pdf", ".docx", ".txt")):
            base_name, _ = os.path.splitext(f)
            if base_name in seen_bases:
                continue
            seen_bases.add(base_name)

            content = read_content(os.path.join(DATA_FOLDER, f))
            if content:
                temp_text += f"\n--- [Tài liệu: {f}] ---\n" + content + "\n"
                files_loaded.append(f)

    GLOBAL_CONTEXT = temp_text
    print(f"--- Đã nạp xong {len(files_loaded)} tài liệu ({len(GLOBAL_CONTEXT)} ký tự)! ---")
    return files_loaded

# Nạp dữ liệu ngay khi khởi động
refresh_context()

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/stats", methods=["GET"])
def stats():
    files = []
    if os.path.exists(DATA_FOLDER):
        for f in os.listdir(DATA_FOLDER):
            if not f.startswith("~$") and (f.lower().endswith(".pdf") or f.lower().endswith(".docx") or f.lower().endswith(".txt")):
                path = os.path.join(DATA_FOLDER, f)
                size_kb = round(os.path.getsize(path) / 1024, 1)
                files.append({"name": f, "size_kb": size_kb})
    return jsonify({
        "files_count": len(files),
        "files": files,
        "char_count": len(GLOBAL_CONTEXT),
        "model": model_name
    })

@app.route("/upload", methods=["POST"])
def upload():
    if "file" not in request.files:
        return jsonify({"message": "Chưa chọn file."}), 400

    file = request.files["file"]

    if not file.filename:
        return jsonify({"message": "Tên file không hợp lệ."}), 400

    if not os.path.exists(DATA_FOLDER):
        os.makedirs(DATA_FOLDER)

    path = os.path.join(DATA_FOLDER, file.filename)
    file.save(path)

    loaded = refresh_context()

    return jsonify({
        "message": f"Tải lên '{file.filename}' và cập nhật dữ liệu thành công!",
        "files_count": len(loaded)
    })

@app.route("/ask", methods=["POST"])
def ask():
    global GLOBAL_CONTEXT, client, ai_model

    data = request.get_json() or {}
    question = data.get("question", "").strip()

    if not question:
        return jsonify({
            "answer": "Bạn chưa nhập câu hỏi.",
            "source": None
        })

    if not GLOBAL_CONTEXT.strip():
        return jsonify({
            "answer": "⚠️ Hiện tại cơ sở dữ liệu nội quy đang trống. Thầy/Cô hoặc bạn vui lòng nhấn vào biểu tượng **Tải tài liệu lên** để nạp file PDF hoặc Word (.docx) chứa quy chế của trường nhé!",
            "source": None
        })

    # Cập nhật client nếu vừa được set key hoặc fallback
    api_key_override = data.get("api_key", "").strip()
    active_client = client
    if api_key_override:
        try:
            active_client = genai.Client(api_key=api_key_override)
        except Exception as e:
            return jsonify({"answer": f"API Key cung cấp không hợp lệ: {e}", "source": None})

    if active_client is None:
        return jsonify({
            "answer": "⚠️ Gemini chưa được khởi tạo API Key. Vui lòng cấu hình `GEMINI_API_KEY` trong file `app.py` hoặc nhập API Key trực tiếp trong phần Cài đặt.",
            "source": None
        })

    prompt = f"""
Bạn là Trợ Lý Học Đường AI - Chuyên gia tư vấn Quy định, Nội quy và Sổ tay Học sinh/Sinh viên của Nhà trường.
Phong cách giao tiếp: Lịch sự, ân cần, chuẩn mực sư phạm, rõ ràng và mạch lạc.

Quy tắc trả lời:
1. Hãy trả lời câu hỏi CHỈ dựa trên dữ liệu nội quy được cung cấp dưới đây.
2. Nếu dữ liệu không có thông tin để trả lời câu hỏi, hãy nói rõ: "Không tìm thấy thông tin này trong tài liệu nội quy đã nạp." Không được tự suy diễn hoặc bịa đặt quy định ngoài tài liệu.
3. Trình bày câu trả lời đẹp mắt bằng Markdown: dùng gạch đầu dòng, in đậm các ý then chốt, chia mục rõ ràng nếu nội dung dài.

Dữ liệu nội quy nhà trường:
{GLOBAL_CONTEXT}

Câu hỏi của học sinh / giáo viên:
{question}
"""

    last_error = None
    target_models = [ai_model] + [m for m in FALLBACK_MODELS if m != ai_model]

    for current_model in target_models:
        try:
            response = active_client.models.generate_content(
                model=current_model,
                contents=prompt
            )

            answer = response.text or "Không nhận được nội dung trả lời từ AI."

            return jsonify({
                "answer": answer,
                "source": current_model
            })
        except Exception as e:
            last_error = e
            print(f"Lỗi với model {current_model}: {e}, đang thử model tiếp theo...")

    return jsonify({
        "answer": f"Đã xảy ra lỗi khi kết nối với Gemini: {str(last_error)}",
        "source": None
    })

if __name__ == "__main__":
    from waitress import serve

    ip_address = "127.0.0.1"
    port_number = 8080

    print("\n" + "=" * 45)
    print("   🍂 TRỢ LÝ HỌC ĐƯỜNG AI - MÙA THU 🍂")
    print("=" * 45)
    print(f"  Truy cập cục bộ: http://localhost:{port_number}")
    print(f"  Khởi động server trên cổng: {port_number}")
    print("=" * 45 + "\n")

    serve(
        app,
        host="0.0.0.0",
        port=port_number,
        threads=10
    )
