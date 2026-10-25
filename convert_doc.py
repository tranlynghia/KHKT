import sys
import os

doc_path = os.path.abspath(r"e:\Tools\KHKT\HD CONG TAC THI DUA HOC SINH 2026-2027.doc")
docx_path = os.path.abspath(r"e:\Tools\KHKT\data\HD CONG TAC THI DUA HOC SINH 2026-2027.docx")
txt_path = os.path.abspath(r"e:\Tools\KHKT\data\HD CONG TAC THI DUA HOC SINH 2026-2027.txt")

os.makedirs(r"e:\Tools\KHKT\data", exist_ok=True)

# Try win32com if available
try:
    import win32com.client
    word = win32com.client.Dispatch("Word.Application")
    word.Visible = False
    doc = word.Documents.Open(doc_path)
    text = doc.Content.Text
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write(text)
    doc.SaveAs2(docx_path, FileFormat=16) # wdFormatXMLDocument
    doc.Close()
    word.Quit()
    print("SUCCESS: Converted via win32com!")
    sys.exit(0)
except Exception as e:
    print(f"win32com failed: {e}")

# Fallback: check if doc can be extracted with other libraries
