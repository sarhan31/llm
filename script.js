// JS for sidebar toggle with animation
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const overlay = document.createElement('div');
overlay.classList.add('sidebar-overlay');
document.body.appendChild(overlay);

sidebarToggle?.addEventListener('click', () => {
  sidebar.classList.toggle('show');
  sidebar.classList.toggle('slide-in');
  overlay.classList.toggle('active');
});

// Auto-close sidebar on link click (mobile)
sidebar.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('show');
      sidebar.classList.remove('slide-in');
      overlay.classList.remove('active');
    }
  });
});

overlay?.addEventListener('click', () => {
  sidebar.classList.remove('show');
  sidebar.classList.remove('slide-in');
  overlay.classList.remove('active');
});

// JS to handle sending message with animation
const textarea = document.getElementById('messageInput');
const chatBox = document.getElementById('chatBox');
const sendBtn = document.getElementById('sendBtn');
const fileInput = document.getElementById('fileInput');

function appendMessage(sender, text) {
  const bubble = document.createElement('div');
  bubble.className = `chat-bubble ${sender} fade-in`;
  bubble.textContent = text;
  chatBox.appendChild(bubble);
  setTimeout(() => {
    chatBox.scrollTo({
      top: chatBox.scrollHeight,
      behavior: 'smooth'
    });
  }, 100);
}

sendBtn?.addEventListener('click', () => {
  const msg = textarea.value.trim();
  if (msg !== '') {
    appendMessage('user', msg);
    textarea.value = '';
    textarea.focus();

    // Simulated bot response with animation
    setTimeout(() => appendMessage('bot', '💬 Processing your input...'), 700);
  }
});

// Submit on Enter key
textarea?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

// Handle file upload with feedback
fileInput?.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    appendMessage('user', `📄 Uploaded: ${file.name}`);
  }
});

// Responsive sidebar toggle on resize
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    sidebar.classList.remove('show');
    sidebar.classList.remove('slide-in');
    overlay.classList.remove('active');
  }
});

// BONUS: Drag and drop file upload
chatBox.addEventListener('dragover', (e) => {
  e.preventDefault();
  chatBox.classList.add('drag-hover');
});

chatBox.addEventListener('dragleave', () => {
  chatBox.classList.remove('drag-hover');
});

chatBox.addEventListener('drop', (e) => {
  e.preventDefault();
  chatBox.classList.remove('drag-hover');
  const file = e.dataTransfer.files[0];
  if (file) {
    appendMessage('user', `📎 Dropped: ${file.name}`);
  }
});
// Download chat as text file
const downloadBtn = document.querySelector('.download-btn');

downloadBtn?.addEventListener('click', () => {
  const messages = document.querySelectorAll('.chat-bubble');
  let chatContent = '';
  messages.forEach(msg => {
    const sender = msg.classList.contains('user') ? 'User' : 'Bot';
    chatContent += `${sender}: ${msg.textContent.trim()}\n`;
  });

  const blob = new Blob([chatContent], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'chat_history.txt';
  a.click();
  URL.revokeObjectURL(url);
});


