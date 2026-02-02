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
}

// Show celebration message and confetti
function showLoveMessage() {
  buttonsDiv.style.display = 'none';
  message.style.display = 'block';
  message.innerHTML = `Yay! I knew you'd say yes, <strong>Nastaaja</strong>!<br>Happy Valentine's Day! 🥰`;
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
  // Position the image so the couple is centered toward the top of the screen
  document.body.style.backgroundPosition = 'center top';
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

// Initially position the No button randomly once the page loads
window.addEventListener('load', moveNoButton);