// Drag & Drop Visuals
const dropArea = document.getElementById('drop-area');

['dragenter', 'dragover'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.style.borderColor = '#fff';
    dropArea.style.transform = 'scale(1.02)';
  }, false);
});

['dragleave', 'drop'].forEach(eventName => {
  dropArea.addEventListener(eventName, () => {
    dropArea.style.borderColor = '#a855f7'; // Return to purple
    dropArea.style.transform = 'scale(1)';
  }, false);
});

// Drop Handler
dropArea.addEventListener('drop', handleDrop, false);

function handleDrop(e) {
  e.preventDefault();
  e.stopPropagation();
  const files = e.dataTransfer.files;
  handleFiles(files);
}

function handleFiles(files) {
  if(files.length > 0) {
    alert(`File "${files[0].name}" received! Processing...`);
    // Add your backend upload logic here
  }
}

// Toggle Chat
function toggleChat() {
    const chat = document.getElementById('chat-overlay');
    chat.classList.toggle('hidden');
}