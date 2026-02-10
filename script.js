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
  // Insert the large heart SVG and celebratory messages.  The heart path uses
  // the .heart-path class for animations defined in the CSS.  We do not
  // include any <defs> here because the fill is controlled by CSS.  After
  // drawing, the heart will fill with a rich pink and then beat.
  message.innerHTML = `
    <svg class="big-heart" viewBox="0 0 32 29.6">
      <path class="heart-path" d="M23.6,0c-3.7,0-6.8,2.9-7.6,4.2C15.2,2.9,12.1,0,8.4,0C3.8,0,0,3.7,0,8.3c0,9.5,16,21.3,16,21.3s16-11.6,16-21.3 C32,3.7,28.3,0,23.6,0z"></path>
    </svg>
    <h2 class="yay">Yay! 🎉</h2>
    <p class="best">Best decision ever!</p>
    <p class="love">I LOVE YOU 😘</p>
  `;
  // Trigger the first burst of confetti for celebration
  confetti({
    particleCount: 150,
    spread: 70,
    origin: { y: 0.6 },
  });

  // Schedule additional confetti bursts from all four corners after the
  // initial celebration has subsided.  This delivers the requested
  // multi‑directional shower once the first effect is complete.  The delay
  // (2000ms) roughly matches the duration of the initial burst.
  setTimeout(() => {
    // Trigger simultaneous bursts from all four corners.  We vary the
    // `angle` property to direct confetti diagonally into the centre.
    [
      { origin: { x: 0, y: 0 }, angle: 60 },    // top left → down-right
      { origin: { x: 1, y: 0 }, angle: 120 },   // top right → down-left
      { origin: { x: 0, y: 1 }, angle: 60 },    // bottom left → up-right
      { origin: { x: 1, y: 1 }, angle: 120 }    // bottom right → up-left
    ].forEach((cfg) => {
      confetti(Object.assign({ particleCount: 100, spread: 90 }, cfg));
    });
  }, 2000);

  // Hide the note (track-star message) so it's only shown on the initial question screen
  const noteEl = document.querySelector('.note');
  if (noteEl) {
    noteEl.style.display = 'none';
  }

  // Hide the original question heading once she answers so only the celebration message is shown
  const questionEl = document.querySelector('.question');
  if (questionEl) {
    questionEl.style.display = 'none';
  }

  // Keep the pink gradient background for the second level rather than switching
  // to the photo.  We intentionally avoid overriding the body's background
  // properties here so the second level matches the first.  This also ensures
  // there is no white space where the photo does not cover the page.

  // Once she answers the question, we leave the iframe alone.  Modern browsers
  // will typically allow unmuted playback after a user interaction, so
  // the music should begin automatically.  If autoplay is blocked, your
  // browser may still require a manual interaction with the player to start.
}

// When hovering over or entering the No button, move it away.  Using
// both mouseover and mouseenter ensures the button runs when the cursor
// touches it, even if pointer events behave differently across browsers.
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('mouseenter', moveNoButton);

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