/**
 * ===================================================================
 * TRƯỜNG PTDTNT THCS VÀ THPT PHƯỚC SƠN - MAIN SCRIPT
 * Phong cách Bảng Phấn Xanh Tối Giản (Clean Chalkboard)
 * ===================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================== DOM ELEMENTS ==================
  const chatMessages = document.getElementById('chat-messages');
  const messagesStream = document.getElementById('messages-stream') || chatMessages;
  const userInput = document.getElementById('user-input');
  const btnSend = document.getElementById('btn-send');
  const typingIndicator = document.getElementById('typing-indicator');
  const charCount = document.getElementById('char-count');
  const welcomeBanner = document.getElementById('welcome-banner');

  // Header & Navigation
  const btnClearChat = document.getElementById('btn-clear-chat');
  const btnWindGust = document.getElementById('btn-wind-gust');
  const btnToggleLeaves = document.getElementById('btn-toggle-leaves');
  const btnToggleHandbook = document.getElementById('btn-toggle-handbook');
  const handbookDrawerBackdrop = document.getElementById('handbook-drawer-backdrop');
  const btnCloseDrawer = document.getElementById('btn-close-drawer');
  const btnOpenUpload = document.getElementById('btn-open-upload');
  const btnQuickAttach = document.getElementById('btn-quick-attach');
  const btnOpenSettings = document.getElementById('btn-open-settings');
  const kbStatusText = document.getElementById('kb-status-text');

  // Upload Modal
  const uploadModal = document.getElementById('upload-modal');
  const btnCloseUpload = document.getElementById('btn-close-upload');
  const btnCancelUpload = document.getElementById('btn-cancel-upload');
  const dropzone = document.getElementById('dropzone');
  const fileInput = document.getElementById('file-input');
  const selectedFilePreview = document.getElementById('selected-file-preview');
  const previewFileName = document.getElementById('preview-file-name');
  const previewFileSize = document.getElementById('preview-file-size');
  const btnRemoveSelected = document.getElementById('btn-remove-selected');
  const btnSubmitUpload = document.getElementById('btn-submit-upload');
  const uploadProgressBar = document.getElementById('upload-progress-bar');
  const uploadProgressContainer = document.getElementById('upload-progress-container');
  const existingFilesList = document.getElementById('existing-files-list');
  const existingCount = document.getElementById('existing-count');

  // Settings Modal
  const settingsModal = document.getElementById('settings-modal');
  const btnCloseSettings = document.getElementById('btn-close-settings');
  const btnSaveSettings = document.getElementById('btn-save-settings');
  const leafDensitySlider = document.getElementById('leaf-density-slider');
  const leafDensityVal = document.getElementById('leaf-density-val');
  const ttsAutoToggle = document.getElementById('tts-auto-toggle');

  // Voice Input
  const btnVoice = document.getElementById('btn-voice');

  // ================== STATE & CONFIG ==================
  let selectedFile = null;
  let isGenerating = false;
  let leafDensity = parseInt(localStorage.getItem('school_leaf_density') || '14', 10);
  let autoTts = localStorage.getItem('school_auto_tts') === 'true';

  if (leafDensitySlider) {
    leafDensitySlider.value = leafDensity;
    leafDensityVal.textContent = `${leafDensity} hạt`;
  }
  if (ttsAutoToggle) ttsAutoToggle.checked = autoTts;

  // ================== HỆ THỐNG CHỦ ĐỀ LỄ HỘI & HẠT HIỆU ỨNG (GSAP) ==================
  const initialTheme = localStorage.getItem('school_ai_theme') || 'autumn';
  document.body.setAttribute('data-theme', initialTheme);

  const leavesEngine = new HolidayParticlesEngine('autumn-leaves-container', {
    theme: initialTheme,
    density: leafDensity,
    enabled: true
  });

  // Theme Dropdown Elements
  const btnThemeSelector = document.getElementById('btn-theme-selector');
  const themeDropdownMenu = document.getElementById('theme-dropdown-menu');

  function applyTheme(themeId, notify = true) {
    if (!window.THEMES_DATA || !window.THEMES_DATA[themeId]) return;

    leavesEngine.setTheme(themeId);
    document.body.setAttribute('data-theme', themeId);
    localStorage.setItem('school_ai_theme', themeId);

    // Cập nhật trạng thái active trong dropdown
    document.querySelectorAll('.theme-dropdown-item').forEach(item => {
      item.classList.toggle('active', item.dataset.themeId === themeId);
    });

    // Cập nhật trạng thái active trong modal cài đặt
    document.querySelectorAll('.settings-theme-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.themeId === themeId);
    });

    if (notify) {
      const info = window.THEMES_DATA[themeId];
      showToast(`${info.icon} Đã áp dụng chủ đề: ${info.name}`, 'success');
    }
  }

  // Khởi động đồng bộ theme ban đầu
  applyTheme(initialTheme, false);

  // Mở/Đóng Dropdown Chủ Đề
  if (btnThemeSelector && themeDropdownMenu) {
    btnThemeSelector.addEventListener('click', (e) => {
      e.stopPropagation();
      const isVisible = themeDropdownMenu.style.display === 'flex';
      themeDropdownMenu.style.display = isVisible ? 'none' : 'flex';
      btnThemeSelector.classList.toggle('open', !isVisible);
      btnThemeSelector.setAttribute('aria-expanded', !isVisible);
    });

    // Chọn chủ đề từ Dropdown
    document.querySelectorAll('.theme-dropdown-item').forEach(item => {
      item.addEventListener('click', (e) => {
        e.stopPropagation();
        const themeId = item.dataset.themeId;
        applyTheme(themeId, true);
        themeDropdownMenu.style.display = 'none';
        btnThemeSelector.classList.remove('open');
        btnThemeSelector.setAttribute('aria-expanded', 'false');
      });
    });

    // Đóng dropdown khi bấm ra ngoài
    document.addEventListener('click', (e) => {
      if (!btnThemeSelector.contains(e.target) && !themeDropdownMenu.contains(e.target)) {
        themeDropdownMenu.style.display = 'none';
        btnThemeSelector.classList.remove('open');
        btnThemeSelector.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Chọn chủ đề trong Modal Cài Đặt
  document.querySelectorAll('.settings-theme-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const themeId = pill.dataset.themeId;
      applyTheme(themeId, true);
    });
  });

  // Nút tương tác hiệu ứng đặc trưng (Gió thổi / Bão tuyết / Dơi bay / Hoa rơi...)
  if (btnWindGust) {
    btnWindGust.addEventListener('click', () => {
      leavesEngine.triggerWindGust();
      const currentTheme = window.THEMES_DATA[leavesEngine.currentThemeId] || window.THEMES_DATA.autumn;
      showToast(`${currentTheme.icon} ${currentTheme.actionName}!`, 'info');
    });
  }

  // Nút bật / tắt hiệu ứng hạt rơi
  if (btnToggleLeaves) {
    btnToggleLeaves.addEventListener('click', () => {
      if (leavesEngine.isRunning) {
        leavesEngine.stop();
        btnToggleLeaves.classList.remove('active');
        showToast('Đã tạm dừng hiệu ứng', 'info');
      } else {
        leavesEngine.start();
        btnToggleLeaves.classList.add('active');
        showToast('Đã kích hoạt lại hiệu ứng', 'success');
      }
    });
  }

  // Hiệu ứng GSAP mở màn nhẹ nhàng
  gsap.from('.chalk-header', {
    y: -15,
    opacity: 0,
    duration: 0.5,
    ease: 'power2.out'
  });

  gsap.from('.chalk-board-main', {
    y: 15,
    opacity: 0,
    duration: 0.6,
    delay: 0.1,
    ease: 'power2.out'
  });

  // ================== DRAWER SỔ TAY NỀ NẾP ==================
  function openHandbookDrawer() {
    if (handbookDrawerBackdrop) handbookDrawerBackdrop.style.display = 'flex';
  }

  function closeHandbookDrawer() {
    if (handbookDrawerBackdrop) handbookDrawerBackdrop.style.display = 'none';
  }

  if (btnToggleHandbook) btnToggleHandbook.addEventListener('click', openHandbookDrawer);
  if (btnCloseDrawer) btnCloseDrawer.addEventListener('click', closeHandbookDrawer);
  if (handbookDrawerBackdrop) {
    handbookDrawerBackdrop.addEventListener('click', (e) => {
      if (e.target === handbookDrawerBackdrop) closeHandbookDrawer();
    });
  }

  // ================== THẺ GỢI Ý CÂU HỎI (PROMPT CHIPS) ==================
  document.querySelectorAll('.chalk-prompt-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const promptText = item.getAttribute('data-prompt');
      userInput.value = promptText;
      autoResizeTextarea();
      sendMessage();
    });
  });

  // ================== TỰ ĐỘNG CO GIÃN TEXTAREA ==================
  function autoResizeTextarea() {
    userInput.style.height = 'auto';
    userInput.style.height = Math.min(userInput.scrollHeight, 120) + 'px';
    charCount.textContent = `${userInput.value.length} / 2000 ký tự`;
  }

  userInput.addEventListener('input', autoResizeTextarea);
  userInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  if (btnSend) {
    btnSend.addEventListener('click', (e) => {
      e.preventDefault();
      sendMessage();
    });
  }

  // ================== HÀM GỬI CÂU HỎI ==================
  async function sendMessage() {
    const question = userInput.value.trim();
    if (!question || isGenerating) return;

    // Ẩn welcome banner
    if (welcomeBanner && welcomeBanner.style.display !== 'none') {
      welcomeBanner.style.display = 'none';
    }

    // Hiển thị tin nhắn học sinh
    appendMessage('user', question, null, true);
    userInput.value = '';
    autoResizeTextarea();

    // Bật hiệu ứng typing
    showTyping(true);
    isGenerating = true;

    try {
      const response = await fetch('/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: question
        })
      });

      const data = await response.json();
      showTyping(false);

      if (data.answer) {
        appendMessage('bot', data.answer, data.source, true);
        if (autoTts) {
          speakText(data.answer);
        }
      } else {
        appendMessage('bot', '⚠️ Không nhận được phản hồi từ hệ thống.', null, true);
      }
    } catch (err) {
      console.error(err);
      showTyping(false);
      appendMessage('bot', `⚠️ Lỗi kết nối máy chủ: ${err.message}`, null, true);
    } finally {
      isGenerating = false;
      userInput.focus();
    }
  }

  // ================== THÊM TIN NHẮN VÀO BẢNG ==================
  function appendMessage(sender, text, source = null, saveToStorage = true) {
    const row = document.createElement('div');
    row.className = `message-row ${sender}-row`;

    const now = new Date();
    const timeString = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    if (sender === 'user') {
      row.innerHTML = `
        <div class="msg-avatar" title="Học sinh hỏi">
          <i class="fa-solid fa-graduation-cap"></i>
        </div>
        <div class="msg-content-wrapper">
          <div class="msg-bubble">${escapeHtml(text)}</div>
          <div class="msg-meta">
            <span>${timeString}</span>
          </div>
        </div>
      `;
    } else {
      const rawHtml = marked.parse(text);
      const cleanHtml = DOMPurify.sanitize(rawHtml);
      const uniqueId = 'msg-' + Date.now();

      row.innerHTML = `
        <div class="msg-avatar" title="Cố vấn học đường">
          <i class="fa-solid fa-chalkboard-user"></i>
        </div>
        <div class="msg-content-wrapper">
          <div class="msg-bubble" id="${uniqueId}">
            ${cleanHtml}
          </div>
          <div class="msg-meta">
            <span>${timeString}</span>
            ${source ? `<span class="msg-model-tag">${source}</span>` : ''}
            <div class="msg-actions">
              <button type="button" class="msg-action-btn btn-copy" title="Sao chép câu trả lời">
                <i class="fa-regular fa-copy"></i>
              </button>
              <button type="button" class="msg-action-btn btn-speak" title="Đọc to câu trả lời">
                <i class="fa-solid fa-volume-high"></i>
              </button>
            </div>
          </div>
        </div>
      `;

      setTimeout(() => {
        const copyBtn = row.querySelector('.btn-copy');
        const speakBtn = row.querySelector('.btn-speak');

        if (copyBtn) {
          copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(text).then(() => {
              showToast('Đã sao chép nội dung vào clipboard!', 'success');
              copyBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
              setTimeout(() => { copyBtn.innerHTML = '<i class="fa-regular fa-copy"></i>'; }, 2000);
            });
          });
        }

        if (speakBtn) {
          speakBtn.addEventListener('click', () => speakText(text));
        }
      }, 40);
    }

    messagesStream.appendChild(row);

    // Lưu vào sessionStorage bền vững
    if (saveToStorage) {
      try {
        const history = JSON.parse(sessionStorage.getItem('school_chat_history') || '[]');
        history.push({ sender, text, source, time: timeString });
        sessionStorage.setItem('school_chat_history', JSON.stringify(history));
      } catch (e) {}
    }

    // GSAP hiệu ứng xuất hiện thanh thoát
    gsap.from(row, {
      opacity: 0,
      y: 10,
      duration: 0.25,
      ease: 'power2.out'
    });

    scrollToBottom();
  }

  // Khôi phục lịch sử khi tải lại
  function restoreChatHistory() {
    try {
      const history = JSON.parse(sessionStorage.getItem('school_chat_history') || '[]');
      if (history.length > 0) {
        if (welcomeBanner) welcomeBanner.style.display = 'none';
        history.forEach(item => {
          appendMessage(item.sender, item.text, item.source, false);
        });
      }
    } catch (e) {}
  }

  restoreChatHistory();

  function showTyping(show) {
    if (show) {
      typingIndicator.style.display = 'flex';
      messagesStream.appendChild(typingIndicator);
      scrollToBottom();
    } else {
      typingIndicator.style.display = 'none';
    }
  }

  function scrollToBottom() {
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  function escapeHtml(string) {
    const div = document.createElement('div');
    div.textContent = string;
    return div.innerHTML;
  }

  // ================== TEXT-TO-SPEECH (TTS) ==================
  function speakText(text) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ đọc giọng nói.', 'info');
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`~>[\]]/g, '').trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'vi-VN';
    utterance.rate = 1.0;

    window.speechSynthesis.speak(utterance);
    showToast('Đang phát giọng đọc cố vấn...', 'info');
  }

  // ================== SPEECH-TO-TEXT ==================
  if (btnVoice) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'vi-VN';
      recognition.continuous = false;
      recognition.interimResults = false;

      let isRecording = false;

      btnVoice.addEventListener('click', () => {
        if (!isRecording) {
          try {
            recognition.start();
            isRecording = true;
            btnVoice.classList.add('recording');
            showToast('Đang lắng nghe câu hỏi...', 'info');
          } catch (e) {}
        } else {
          recognition.stop();
          isRecording = false;
          btnVoice.classList.remove('recording');
        }
      });

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        autoResizeTextarea();
        isRecording = false;
        btnVoice.classList.remove('recording');
        showToast('Nhận diện giọng nói thành công!', 'success');
      };

      recognition.onerror = () => {
        isRecording = false;
        btnVoice.classList.remove('recording');
        showToast('Không nhận dạng được âm thanh.', 'error');
      };

      recognition.onend = () => {
        isRecording = false;
        btnVoice.classList.remove('recording');
      };
    } else {
      btnVoice.style.display = 'none';
    }
  }

  // ================== CƠN GIÓ MÙA THU & LÁ RƠI ==================
  btnWindGust.addEventListener('click', () => {
    gsap.to(btnWindGust, {
      rotate: 360,
      duration: 0.5,
      ease: 'back.out(2)',
      onComplete: () => gsap.set(btnWindGust, { rotate: 0 })
    });
    leavesEngine.triggerWindGust();
    showToast('🍂 Cơn gió mùa thu thổi lá vàng bay!', 'info');
  });

  btnToggleLeaves.addEventListener('click', () => {
    if (leavesEngine.isRunning) {
      leavesEngine.stop();
      btnToggleLeaves.classList.remove('active');
      showToast('Đã dừng lá rơi.', 'info');
    } else {
      leavesEngine.start();
      btnToggleLeaves.classList.add('active');
      showToast('Đã bật lá rơi mùa thu.', 'info');
    }
  });

  // Làm mới bảng
  btnClearChat.addEventListener('click', () => {
    if (confirm('Làm mới lại toàn bộ bảng trò chuyện?')) {
      try {
        sessionStorage.removeItem('school_chat_history');
      } catch (e) {}

      const messages = messagesStream.querySelectorAll('.message-row');
      if (messages.length > 0) {
        gsap.to(messages, {
          opacity: 0,
          y: -10,
          stagger: 0.03,
          duration: 0.2,
          onComplete: () => {
            messagesStream.innerHTML = '';
            if (welcomeBanner) {
              welcomeBanner.style.display = 'flex';
              gsap.fromTo(welcomeBanner, { opacity: 0 }, { opacity: 1, duration: 0.3 });
            }
          }
        });
      } else {
        if (welcomeBanner) welcomeBanner.style.display = 'flex';
      }
    }
  });

  // ================== UPLOAD MODAL ==================
  function openUploadModal() {
    uploadModal.style.display = 'flex';
    fetchKnowledgeStats();
  }

  function closeUploadModal() {
    uploadModal.style.display = 'none';
    resetUploadState();
  }

  btnOpenUpload.addEventListener('click', openUploadModal);
  btnQuickAttach.addEventListener('click', openUploadModal);
  btnCloseUpload.addEventListener('click', closeUploadModal);
  btnCancelUpload.addEventListener('click', closeUploadModal);

  uploadModal.addEventListener('click', (e) => {
    if (e.target === uploadModal) closeUploadModal();
  });

  dropzone.addEventListener('click', () => fileInput.click());

  ['dragenter', 'dragover'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.add('dragover');
    });
  });

  ['dragleave', 'drop'].forEach(eventName => {
    dropzone.addEventListener(eventName, (e) => {
      e.preventDefault();
      dropzone.classList.remove('dragover');
    });
  });

  dropzone.addEventListener('drop', (e) => {
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFileSelect(files[0]);
  });

  fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFileSelect(e.target.files[0]);
  });

  function handleFileSelect(file) {
    const ext = file.name.split('.').pop().toLowerCase();
    if (!['pdf', 'docx', 'doc', 'txt'].includes(ext)) {
      showToast('Chỉ chấp nhận file .doc, .docx, .pdf, .txt!', 'error');
      return;
    }

    selectedFile = file;
    previewFileName.textContent = file.name;
    previewFileSize.textContent = formatBytes(file.size);

    dropzone.querySelector('.dropzone-content').style.display = 'none';
    selectedFilePreview.style.display = 'flex';
    btnSubmitUpload.disabled = false;
  }

  btnRemoveSelected.addEventListener('click', (e) => {
    e.stopPropagation();
    resetUploadState();
  });

  function resetUploadState() {
    selectedFile = null;
    fileInput.value = '';
    dropzone.querySelector('.dropzone-content').style.display = 'block';
    selectedFilePreview.style.display = 'none';
    btnSubmitUpload.disabled = true;
    uploadProgressContainer.style.display = 'none';
    uploadProgressBar.style.width = '0%';
  }

  btnSubmitUpload.addEventListener('click', async () => {
    if (!selectedFile) return;

    btnSubmitUpload.disabled = true;
    uploadProgressContainer.style.display = 'block';
    uploadProgressBar.style.width = '30%';

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      uploadProgressBar.style.width = '75%';

      const res = await fetch('/upload', {
        method: 'POST',
        body: formData
      });

      const result = await res.json();
      uploadProgressBar.style.width = '100%';

      if (res.ok) {
        showToast(result.message || 'Tải lên thành công!', 'success');
        setTimeout(() => {
          closeUploadModal();
          fetchKnowledgeStats();
        }, 500);
      } else {
        showToast(result.message || 'Lỗi khi tải file.', 'error');
        btnSubmitUpload.disabled = false;
      }
    } catch (err) {
      console.error(err);
      showToast(`Lỗi: ${err.message}`, 'error');
      btnSubmitUpload.disabled = false;
    }
  });

  async function fetchKnowledgeStats() {
    try {
      const res = await fetch('/stats');
      const data = await res.json();

      if (data.files_count > 0) {
        kbStatusText.textContent = `${data.files_count} văn bản quy định sẵn sàng`;
        existingCount.textContent = data.files_count;

        existingFilesList.innerHTML = data.files.map(f => `
          <li>
            <span><i class="fa-regular fa-file-lines"></i> ${f.name}</span>
            <span class="file-size-tag">${f.size_kb} KB</span>
          </li>
        `).join('');
      } else {
        kbStatusText.textContent = 'Chưa nạp tài liệu';
        existingCount.textContent = '0';
        existingFilesList.innerHTML = '<li class="empty-list-notice">Chưa có văn bản quy định nào.</li>';
      }
    } catch (err) {
      kbStatusText.textContent = 'Máy chủ chưa sẵn sàng';
    }
  }

  fetchKnowledgeStats();

  // ================== SETTINGS MODAL ==================
  btnOpenSettings.addEventListener('click', () => {
    settingsModal.style.display = 'flex';
  });

  btnCloseSettings.addEventListener('click', () => {
    settingsModal.style.display = 'none';
  });

  settingsModal.addEventListener('click', (e) => {
    if (e.target === settingsModal) settingsModal.style.display = 'none';
  });

  leafDensitySlider.addEventListener('input', (e) => {
    leafDensityVal.textContent = `${e.target.value} hạt`;
  });

  btnSaveSettings.addEventListener('click', () => {
    leafDensity = parseInt(leafDensitySlider.value, 10);
    localStorage.setItem('school_leaf_density', leafDensity);
    leavesEngine.setDensity(leafDensity);

    autoTts = ttsAutoToggle.checked;
    localStorage.setItem('school_auto_tts', autoTts);

    settingsModal.style.display = 'none';
    showToast('Đã lưu cấu hình!', 'success');
  });

  // ================== TIỆN ÍCH ==================
  function formatBytes(bytes, decimals = 1) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }

  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let icon = 'fa-circle-info';
    if (type === 'success') icon = 'fa-circle-check';
    if (type === 'error') icon = 'fa-triangle-exclamation';

    toast.innerHTML = `
      <i class="fa-solid ${icon} toast-icon"></i>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    gsap.fromTo(toast, 
      { opacity: 0, x: 30, scale: 0.9 }, 
      { opacity: 1, x: 0, scale: 1, duration: 0.25, ease: 'power2.out' }
    );

    setTimeout(() => {
      gsap.to(toast, {
        opacity: 0,
        x: 20,
        scale: 0.85,
        duration: 0.2,
        onComplete: () => toast.remove()
      });
    }, 3000);
  }
});
