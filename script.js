// Function to toggle a specific day
function openDay(id) {
  const daySection = document.getElementById(id);
  const isActive = daySection.classList.contains('active');
  
  // Close all day sections first
  document.querySelectorAll('.day-section').forEach(section => {
    section.classList.remove('active');
  });
  
  // Remove active class from all timeline days
  document.querySelectorAll('.timeline-day').forEach(day => {
    day.classList.remove('active');
  });
  
  // If the section wasn't already active, open it
  if (!isActive) {
    // Open the clicked day
    daySection.classList.add('active');
    
    // Add active class to the corresponding timeline day
    const timelineDay = document.querySelector(`.timeline-day[data-day="${id}"]`);
    if (timelineDay) {
      timelineDay.classList.add('active');
    }
    
    // Scroll to the day section
    setTimeout(() => {
      daySection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }
  // If it was active, we've already closed it by removing the active class above
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

// Function to open feature video in modal
function openFeatureVideo(videoName) {
  const modal = document.querySelector('.feature-video-modal');
  const videoElement = document.getElementById('modal-video');
  const videoSource = document.getElementById('modal-video-source');
  const videoQuicktime = document.getElementById('modal-video-quicktime');
  
  // Set the video source
  const videoPath = `media/${videoName}.mov`;
  videoSource.src = videoPath;
  videoQuicktime.src = videoPath;
  
  // Reset the video
  videoElement.load();
  
  // Show the modal
  modal.style.display = 'flex';
  
  // Attempt to play the video
  videoElement.play().catch(e => console.log('Autoplay prevented:', e));
  
  // Prevent background scrolling
  document.body.style.overflow = 'hidden';
}

// Function to open embedded Loom video
function openEmbeddedVideo(videoId) {
  const modal = document.getElementById(`${videoId}-modal`);
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Function to open final demo video
function openDemoVideo(event) {
  event.preventDefault();
  const modal = document.getElementById('final-demo-modal');
  if (modal) {
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
}

// Animated AXIOM logo - now it's an image, so we'll animate the container
function animateAxiomLogo() {
  const logoContainer = document.getElementById('axiom-logo');
  if (!logoContainer) return;
  
  // Now that it's an image, we'll just add a subtle fade-in animation to the container
  logoContainer.style.opacity = '0';
  logoContainer.style.transition = 'opacity 0.8s ease';
  
  setTimeout(() => {
    logoContainer.style.opacity = '1';
  }, 300);
}

function animateMagicalTitle() {
  const titleContainer = document.getElementById('magical-title');
  if (!titleContainer) return;
  
  // Replace text with animated spans
  const text = titleContainer.textContent;
  titleContainer.textContent = '';
  
  // Create a span for each letter with staggered delay
  [...text].forEach((char, index) => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.animationDelay = `${index * 0.05}s`;
    titleContainer.appendChild(span);
  });
  
  // Add additional magical effects
  titleContainer.addEventListener('mouseover', function() {
    titleContainer.style.textShadow = '0 0 15px rgba(255, 255, 255, 1), 0 0 25px rgba(255, 255, 255, 0.8)';
  });
  
  titleContainer.addEventListener('mouseout', function() {
    titleContainer.style.textShadow = '0 0 10px rgba(255, 255, 255, 0.8)';
  });
}

window.onload = function () {
  // Animate AXIOM logo
  animateAxiomLogo();
  
  // Animate magical title
  animateMagicalTitle();
  
  // All days are closed by default - don't open any on load
  
  // Setup feature video modal close button
  const closeFeatureBtn = document.querySelector('.close-feature-video');
  const featureModal = document.querySelector('.feature-video-modal');
  const modalVideo = document.getElementById('modal-video');
  
  if (closeFeatureBtn && featureModal) {
    closeFeatureBtn.addEventListener('click', () => {
      featureModal.style.display = 'none';
      if (modalVideo && !modalVideo.paused) {
        modalVideo.pause();
      }
      document.body.style.overflow = ''; // Restore scrolling
    });
    
    // Also close when clicking outside the video
    featureModal.addEventListener('click', (e) => {
      if (e.target === featureModal) {
        featureModal.style.display = 'none';
        if (modalVideo && !modalVideo.paused) {
          modalVideo.pause();
        }
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  }
  
  // Setup Loom video modals close buttons
  const loomModals = document.querySelectorAll('.loom-video-modal');
  const loomCloseButtons = document.querySelectorAll('.close-loom-video');
  
  loomCloseButtons.forEach(button => {
    button.addEventListener('click', () => {
      const modal = button.closest('.loom-video-modal');
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });
  
  loomModals.forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
      }
    });
  });
  
  // Handle escape key for all modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const activeFeatureModal = featureModal.style.display === 'flex' ? featureModal : null;
      const activeLoomModal = [...loomModals].find(modal => modal.style.display === 'flex');
      
      if (activeFeatureModal) {
        activeFeatureModal.style.display = 'none';
        if (modalVideo && !modalVideo.paused) {
          modalVideo.pause();
        }
      }
      
      if (activeLoomModal) {
        activeLoomModal.style.display = 'none';
      }
      
      if (activeFeatureModal || activeLoomModal) {
        document.body.style.overflow = ''; // Restore scrolling
      }
    }
  });
  
  // Video player setup
  const videoContainer = document.querySelector('.local-video-container');
  const video = document.querySelector('.local-video');
  const overlay = document.querySelector('.video-overlay');
  const closeBtn = document.querySelector('.close-video');
  const playIcon = document.querySelector('.play-icon');
  
  // Video related elements
  const aiJourneyBtn = document.getElementById('ai-journey-btn');
  const feedbackBtn = document.getElementById('customer-feedback-btn');
  
  const feedbackVideoContainer = document.querySelector('.feedback-video-container');
  const feedbackVideo = document.querySelector('.feedback-video');
  const closeFeedbackBtn = document.querySelector('.close-feedback-video');
  const feedbackPlayIcon = feedbackVideoContainer.querySelector('.play-icon');
  
  // Day 3 demo videos
  const coolestDemoBtn = document.getElementById('coolest-demo-btn');
  const theoMicBtn = document.getElementById('theo-mic-btn');
  
  const coolestVideoContainer = document.querySelector('.coolest-video-container');
  const coolestVideo = document.querySelector('.coolest-video');
  const closeCoolestBtn = document.querySelector('.close-coolest-video');
  const coolestPlayIcon = coolestVideoContainer ? coolestVideoContainer.querySelector('.play-icon') : null;
  
  const theoVideoContainer = document.querySelector('.theo-video-container');
  const theoVideo = document.querySelector('.theo-video');
  const closeTheoBtn = document.querySelector('.close-theo-video');
  const theoPlayIcon = theoVideoContainer ? theoVideoContainer.querySelector('.play-icon') : null;
  
  // Mobile detection
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  // Video containers are hidden by default via CSS
  // No need to set display: none here since we've added it to the CSS
  
  // Set initial state for videos
  if (video) video.controls = false;
  if (feedbackVideo) feedbackVideo.controls = false;
  if (coolestVideo) coolestVideo.controls = false;
  if (theoVideo) theoVideo.controls = false;
  
  // AI Journey button setup
  if (aiJourneyBtn && videoContainer && video) {
    aiJourneyBtn.addEventListener('click', function() {
      // Show and expand video in one step
      videoContainer.style.display = 'block';
      expandVideo(videoContainer, video, closeBtn, playIcon);
    });
    
    // Close button functionality
    closeBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedVideo(videoContainer, video, closeBtn, playIcon);
      
      // Hide video container after closing
      setTimeout(() => {
        videoContainer.style.display = 'none';
      }, 300);
    });
    
    // Make video container clickable to expand
    videoContainer.addEventListener('click', function(e) {
      if (!videoContainer.classList.contains('expanded')) {
        expandVideo(videoContainer, video, closeBtn, playIcon);
      }
    });
  }
  
  // Customer feedback button setup
  if (feedbackBtn && feedbackVideoContainer && feedbackVideo) {
    feedbackBtn.addEventListener('click', function() {
      // Show and expand feedback video in one step
      feedbackVideoContainer.style.display = 'block';
      expandVideo(feedbackVideoContainer, feedbackVideo, closeFeedbackBtn, feedbackPlayIcon);
    });
    
    // Close button functionality for feedback video
    closeFeedbackBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedVideo(feedbackVideoContainer, feedbackVideo, closeFeedbackBtn, feedbackPlayIcon);
      
      // Hide feedback video container after closing
      setTimeout(() => {
        feedbackVideoContainer.style.display = 'none';
      }, 300);
    });
    
    // Make feedback video container clickable to expand
    feedbackVideoContainer.addEventListener('click', function(e) {
      if (!feedbackVideoContainer.classList.contains('expanded')) {
        expandVideo(feedbackVideoContainer, feedbackVideo, closeFeedbackBtn, feedbackPlayIcon);
      }
    });
  }
  
  // Coolest Demo button setup
  if (coolestDemoBtn && coolestVideoContainer && coolestVideo) {
    coolestDemoBtn.addEventListener('click', function() {
      // Show and expand video in one step
      coolestVideoContainer.style.display = 'block';
      expandVideo(coolestVideoContainer, coolestVideo, closeCoolestBtn, coolestPlayIcon);
    });
    
    // Close button functionality
    closeCoolestBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedVideo(coolestVideoContainer, coolestVideo, closeCoolestBtn, coolestPlayIcon);
      
      // Hide video container after closing
      setTimeout(() => {
        coolestVideoContainer.style.display = 'none';
      }, 300);
    });
    
    // Make video container clickable to expand
    coolestVideoContainer.addEventListener('click', function(e) {
      if (!coolestVideoContainer.classList.contains('expanded')) {
        expandVideo(coolestVideoContainer, coolestVideo, closeCoolestBtn, coolestPlayIcon);
      }
    });
  }
  
  // Theo Drops the Mic button setup
  if (theoMicBtn && theoVideoContainer && theoVideo) {
    theoMicBtn.addEventListener('click', function() {
      // Show and expand video in one step
      theoVideoContainer.style.display = 'block';
      expandVideo(theoVideoContainer, theoVideo, closeTheoBtn, theoPlayIcon);
    });
    
    // Close button functionality
    closeTheoBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      closeExpandedVideo(theoVideoContainer, theoVideo, closeTheoBtn, theoPlayIcon);
      
      // Hide video container after closing
      setTimeout(() => {
        theoVideoContainer.style.display = 'none';
      }, 300);
    });
    
    // Make video container clickable to expand
    theoVideoContainer.addEventListener('click', function(e) {
      if (!theoVideoContainer.classList.contains('expanded')) {
        expandVideo(theoVideoContainer, theoVideo, closeTheoBtn, theoPlayIcon);
      }
    });
  }
  
  // Close when clicking overlay
  overlay.addEventListener('click', function() {
    // Check which video is expanded and close it
    if (videoContainer.classList.contains('expanded')) {
      closeExpandedVideo(videoContainer, video, closeBtn, playIcon);
      setTimeout(() => {
        videoContainer.style.display = 'none';
      }, 300);
    } else if (feedbackVideoContainer.classList.contains('expanded')) {
      closeExpandedVideo(feedbackVideoContainer, feedbackVideo, closeFeedbackBtn, feedbackPlayIcon);
      setTimeout(() => {
        feedbackVideoContainer.style.display = 'none';
      }, 300);
    } else if (coolestVideoContainer && coolestVideoContainer.classList.contains('expanded')) {
      closeExpandedVideo(coolestVideoContainer, coolestVideo, closeCoolestBtn, coolestPlayIcon);
      setTimeout(() => {
        coolestVideoContainer.style.display = 'none';
      }, 300);
    } else if (theoVideoContainer && theoVideoContainer.classList.contains('expanded')) {
      closeExpandedVideo(theoVideoContainer, theoVideo, closeTheoBtn, theoPlayIcon);
      setTimeout(() => {
        theoVideoContainer.style.display = 'none';
      }, 300);
    }
  });
  
  // Handle escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      if (videoContainer.classList.contains('expanded')) {
        closeExpandedVideo(videoContainer, video, closeBtn, playIcon);
        setTimeout(() => {
          videoContainer.style.display = 'none';
        }, 300);
      } else if (feedbackVideoContainer.classList.contains('expanded')) {
        closeExpandedVideo(feedbackVideoContainer, feedbackVideo, closeFeedbackBtn, feedbackPlayIcon);
        setTimeout(() => {
          feedbackVideoContainer.style.display = 'none';
        }, 300);
      } else if (coolestVideoContainer && coolestVideoContainer.classList.contains('expanded')) {
        closeExpandedVideo(coolestVideoContainer, coolestVideo, closeCoolestBtn, coolestPlayIcon);
        setTimeout(() => {
          coolestVideoContainer.style.display = 'none';
        }, 300);
      } else if (theoVideoContainer && theoVideoContainer.classList.contains('expanded')) {
        closeExpandedVideo(theoVideoContainer, theoVideo, closeTheoBtn, theoPlayIcon);
        setTimeout(() => {
          theoVideoContainer.style.display = 'none';
        }, 300);
      }
    }
  });
  
  // Function to expand video
  function expandVideo(container, videoElement, closeButton, playButton) {
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
    container.classList.add('expanded');
    overlay.style.display = 'block';
    closeButton.style.display = 'block';
    playButton.style.display = 'none';
    
    // Enable controls when expanded
    setTimeout(() => {
      videoElement.controls = true;
      if (videoElement.paused) {
        videoElement.play().catch(e => console.log('Autoplay prevented:', e));
      }
    }, 300); // Small delay for transition to complete
  }
  
  // Function to close expanded video
  function closeExpandedVideo(container, videoElement, closeButton, playButton) {
    document.body.style.overflow = ''; // Restore scrolling
    container.classList.remove('expanded');
    overlay.style.display = 'none';
    closeButton.style.display = 'none';
    
    // Disable controls and restore play icon
    videoElement.controls = false;
    setTimeout(() => {
      playButton.style.display = 'block';
    }, 300);
    
    // Pause video when closing
    if (!videoElement.paused) {
      videoElement.pause();
    }
  }
};