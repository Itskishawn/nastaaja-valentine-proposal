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

  // After the confetti animations have finished, reveal the "Next" button
  // so she can proceed to the next part of the surprise.  The delay here
  // should be long enough to encompass the multi‑directional bursts as well.
  setTimeout(() => {
    showNextButton();
  }, 3500);

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

/*
 * Additional logic for multi‑level experience
 *
 * After the initial question and celebration, the user can progress through
 * several levels of interaction.  The "Next" button appears once the
 * confetti has finished, and clicking it reveals level 3.  Level 3
 * displays a congratulatory message with a bouncing surprise image and
 * invites the user to continue.  Level 4 contains a February calendar
 * where only the 14th can be selected; choosing that date reveals a
 * continuation button.  Level 5 shares the final gift information and
 * triggers a dreamy smoke effect after a short pause.
 */

// Show the "Next" button
function showNextButton() {
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) {
    nextBtn.style.display = 'inline-block';
  }
}

// Transition to level 3
function showLevel3() {
  const messageEl = document.getElementById('message');
  const level3 = document.getElementById('level3');
  if (messageEl) messageEl.style.display = 'none';
  if (level3) level3.style.display = 'flex';
  // Hide the "Next" button now that it has been used
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.style.display = 'none';
}

// Build the February calendar and attach click listener to the 14th
function generateCalendar() {
  const container = document.getElementById('calendarContainer');
  if (!container) return;
  container.innerHTML = '';
  const table = document.createElement('table');
  // Header row for days of week
  const headerRow = document.createElement('tr');
  const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  days.forEach(day => {
    const th = document.createElement('th');
    th.textContent = day;
    headerRow.appendChild(th);
  });
  table.appendChild(headerRow);
  // Determine February of current year
  const year = new Date().getFullYear();
  const monthIndex = 1; // February
  const firstDay = new Date(year, monthIndex, 1).getDay();
  const daysInMonth = 28; // non‑leap year February
  let dayCounter = 1;
  // Up to 6 rows of weeks
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');
      if (i === 0 && j < firstDay) {
        cell.textContent = '';
      } else if (dayCounter > daysInMonth) {
        cell.textContent = '';
      } else {
        cell.textContent = dayCounter;
        if (dayCounter === 14) {
          cell.classList.add('available');
          cell.addEventListener('click', () => selectDate(cell));
        }
        dayCounter++;
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
    if (dayCounter > daysInMonth) break;
  }
  container.appendChild(table);
}

// Called when the 14th is clicked
function selectDate(cell) {
  cell.classList.add('selected');
  const btn = document.getElementById('toLevel5Btn');
  if (btn) btn.style.display = 'inline-block';
}

// Transition to level 4
function showLevel4() {
  const level3 = document.getElementById('level3');
  const level4 = document.getElementById('level4');
  if (level3) level3.style.display = 'none';
  if (level4) level4.style.display = 'flex';
  generateCalendar();
}

// Transition to level 5
function showLevel5() {
  const level4 = document.getElementById('level4');
  const level5 = document.getElementById('level5');
  if (level4) level4.style.display = 'none';
  if (level5) level5.style.display = 'flex';
  // Show smoke effect after 5 seconds
  setTimeout(() => {
    const smoke = document.getElementById('smokeEffect');
    if (smoke) smoke.style.display = 'block';
  }, 5000);
}

// Attach event handlers once the DOM has been parsed
document.addEventListener('DOMContentLoaded', () => {
  const nextBtn = document.getElementById('nextBtn');
  if (nextBtn) nextBtn.addEventListener('click', showLevel3);
  const toLevel4Btn = document.getElementById('toLevel4Btn');
  if (toLevel4Btn) toLevel4Btn.addEventListener('click', showLevel4);
  const toLevel5Btn = document.getElementById('toLevel5Btn');
  if (toLevel5Btn) toLevel5Btn.addEventListener('click', showLevel5);
});