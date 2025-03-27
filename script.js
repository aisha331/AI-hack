function toggleDay(id) {
  const section = document.getElementById(id);
  const content = section.querySelector('.day-content');
  content.style.display = (content.style.display === 'none' || content.style.display === '') ? 'block' : 'none';
}

function createConfetti() {
  const confettiContainer = document.querySelector('.confetti-container');
  confettiContainer.innerHTML = '';
  
  const colors = ['#9ecdf2', '#f29ead', '#9ef2b1', '#f2dc9e', '#d59ef2'];
  const emojis = ['🎉', '🤖', '✨', '🚀', '🧠', '💻', '⚡'];
  
  // Create confetti pieces
  for (let i = 0; i < 100; i++) {
    const confetti = document.createElement('div');
    confetti.className = 'confetti';
    
    // Randomize properties
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100; // random position
    const fallDuration = 3 + Math.random() * 2; // between 3-5s
    const shakeDuration = 0.5 + Math.random() * 1; // between 0.5-1.5s
    
    confetti.style.setProperty('--color', color);
    confetti.style.setProperty('--fall-duration', `${fallDuration}s`);
    confetti.style.setProperty('--shake-duration', `${shakeDuration}s`);
    confetti.style.left = `${left}%`;
    
    // Some confetti are emojis instead of blocks
    if (i % 5 === 0) {
      confetti.style.background = 'transparent';
      confetti.style.width = '20px';
      confetti.style.height = '20px';
      confetti.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    }
    
    confettiContainer.appendChild(confetti);
  }
  
  // Clear confetti after animation completes
  setTimeout(() => {
    confettiContainer.innerHTML = '';
  }, 5000);
}

window.onload = function () {
  const allContents = document.querySelectorAll('.day-content');
  allContents.forEach(el => el.style.display = 'block');
  
  // Video player setup
  const videoContainer = document.querySelector('.local-video-container');
  const video = document.querySelector('.local-video');
  const overlay = document.querySelector('.video-overlay');
  const closeBtn = document.querySelector('.close-video');
  const playIcon = document.querySelector('.play-icon');
  
  if (videoContainer && video) {
    // Mobile detection
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    // Set initial state
    video.controls = false;
    
    videoContainer.addEventListener('click', function(e) {
      if (!videoContainer.classList.contains('expanded')) {
        // Expand video
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
        videoContainer.classList.add('expanded');
        overlay.style.display = 'block';
        closeBtn.style.display = 'block';
        playIcon.style.display = 'none';
        
        // Enable controls when expanded
        setTimeout(() => {
          video.controls = true;
          if (video.paused) {
            video.play().catch(e => console.log('Autoplay prevented:', e));
          }
        }, 300); // Small delay for transition to complete
      }
    });
    
    // Close button functionality
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedVideo();
    });
    
    // Close when clicking overlay
    overlay.addEventListener('click', function() {
      closeExpandedVideo();
    });
    
    // Handle escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && videoContainer.classList.contains('expanded')) {
        closeExpandedVideo();
      }
    });
    
    // Function to close expanded video
    function closeExpandedVideo() {
      document.body.style.overflow = ''; // Restore scrolling
      videoContainer.classList.remove('expanded');
      overlay.style.display = 'none';
      closeBtn.style.display = 'none';
      
      // Disable controls and restore play icon
      video.controls = false;
      setTimeout(() => {
        playIcon.style.display = 'block';
      }, 300);
      
      // Pause video when closing
      if (!video.paused) {
        video.pause();
      }
    }
  }
};