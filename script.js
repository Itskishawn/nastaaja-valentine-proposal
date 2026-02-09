const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const message = document.getElementById('message');
const buttonsDiv = document.getElementById('buttons');

// Function to randomly reposition the No button inside its container
function moveNoButton() {
  // Get the size of the container and the button
  const containerRect = buttonsDiv.getBoundingClientRect();
  const btnRect = noBtn.getBoundingClientRect();

  // Calculate the maximum top/left values (stay within container)
  const maxLeft = containerRect.width - btnRect.width;
  const maxTop = containerRect.height - btnRect.height;

  // Generate random positions
  const randLeft = Math.random() * maxLeft;
  const randTop = Math.random() * maxTop;

  // Apply positions
  noBtn.style.left = `${randLeft}px`;
  noBtn.style.top = `${randTop}px`;
  // Reset the transform so the button isn't shifted by its initial translateX
  noBtn.style.transform = 'none';
  // Remove the bottom property so random positioning based on `top` works correctly
  noBtn.style.bottom = 'auto';
}

// Show celebration message and confetti
function showLoveMessage() {
  buttonsDiv.style.display = 'none';
  message.style.display = 'block';
  // Build the final message with a drawing heart and lines
  message.innerHTML = `
    <svg class="big-heart" viewBox="0 0 32 29.6">
      <defs>
        <!-- Define a radial gradient to give the heart a subtle 3D effect -->
        <radialGradient id="heartGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#f06292" />
          <stop offset="100%" stop-color="#c2185b" />
        </radialGradient>
      </defs>
      <!-- Heart path: the stroke draws first, then the fill animates. The fill uses the gradient defined above. -->
      <path class="heart-path" d="M23.6,0c-3.7,0-6.8,2.9-7.6,4.2C15.2,2.9,12.1,0,8.4,0C3.8,0,0,3.7,0,8.3c0,9.5,16,21.3,16,21.3s16-11.6,16-21.3 C32,3.7,28.3,0,23.6,0z" fill="url(#heartGradient)"></path>
    </svg>
    <h2 class="yay">Yay! 🎉</h2>
    <p class="best">Best decision ever!</p>
    <p class="love">I LOVE YOU 😘</p>
  `;
  // Trigger confetti for celebration
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  // Change the background to the uploaded image once she answers
  const bgUrl = '8B81FBBF-208F-4171-841B-F0031EC20145.jpeg';

  // Hide the note (track-star message) so it's only shown on the initial question screen
  const noteEl = document.querySelector('.note');
  if (noteEl) {
    noteEl.style.display = 'none';
  }

  document.body.style.backgroundImage = `url(${bgUrl})`;
  // Set the background size to "contain" so the full photo is visible
  document.body.style.backgroundSize = 'contain';
  document.body.style.backgroundRepeat = 'no-repeat';
  // Position the image so the couple appears in view.  Using center bottom helps
  // keep the subjects in the frame while still showing the background.
  document.body.style.backgroundPosition = 'center bottom';

  // Hide the original question heading once she answers so only the celebration message is shown
  const questionEl = document.querySelector('.question');
  if (questionEl) {
    questionEl.style.display = 'none';
  }

  // Once she answers, unmute and play the background music.  We use the YouTube
  // IFrame API via postMessage to control the player.  The iframe is muted
  // initially to satisfy autoplay restrictions.  Calling playVideo and unMute
  // after a user interaction will allow the audio to be heard.
  const musicFrame = document.getElementById('bg-music');
  if (musicFrame && musicFrame.contentWindow) {
    // Play the video (in case it was paused) and unmute it
    try {
      musicFrame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo', args: [] }), '*');
      musicFrame.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'unMute', args: [] }), '*');
    } catch (e) {
      // Some browsers may restrict postMessage; ignore errors silently
      console.warn('Unable to control music iframe:', e);
    }
  }
}

// When hovering over the No button, move it away
noBtn.addEventListener('mouseover', moveNoButton);

// When the No button is clicked, ask if she's sure, otherwise move again
noBtn.addEventListener('click', (e) => {
  e.preventDefault();
  // Ask for confirmation. If she confirms, treat as yes; otherwise, keep moving.
  const sure = confirm("Are you sure? You can't say no to love! 😊");
  if (sure) {
    showLoveMessage();
  } else {
    moveNoButton();
  }
});

// When the Yes button is clicked, show the love message
yesBtn.addEventListener('click', (e) => {
  e.preventDefault();
  showLoveMessage();
});

// Function to start floating hearts animation
function startHearts() {
  const container = document.getElementById('hearts-container');
  if (!container) return;
  setInterval(() => {
    const heart = document.createElement('span');
    heart.classList.add('floating-heart');
    heart.textContent = '💕';
    // random horizontal position
    heart.style.left = Math.random() * 100 + 'vw';
    // random duration between 4 and 7 seconds
    const duration = 4 + Math.random() * 3;
    heart.style.animationDuration = duration + 's';
    container.appendChild(heart);
    // remove after animation ends
    setTimeout(() => {
      heart.remove();
    }, duration * 1000);
  }, 800);
}

// Start floating hearts when the page has loaded.  We do not reposition the
// No button on load so that it begins below the Yes button.
window.addEventListener('load', () => {
  startHearts();
});