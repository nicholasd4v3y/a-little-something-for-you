const symbols = [
  '🌿','🌿',
  '🍃','🍃',
  '🌲','🌲',
  '🍂','🍂',
  '🌱','🌱',
  '🌾','🌾',
  '🍀','🍀',
  '🌼','🌼',
  '🌸','🌸',
  '🍁','🍁'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

const board = document.getElementById('gameBoard');
const note = document.getElementById('gameNote');

// shuffle
symbols.sort(() => Math.random() - 0.5);

symbols.forEach(symbol => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.symbol = symbol;
  card.textContent = symbol;

  card.addEventListener('click', () => {
    if (lockBoard || card.classList.contains('open')) return;

    card.classList.add('open');

    if (!firstCard) {
      firstCard = card;
    } else {
      secondCard = card;
      lockBoard = true;

      if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetTurn();
        checkWin();
      } else {
        setTimeout(() => {
          firstCard.classList.remove('open');
          secondCard.classList.remove('open');
          resetTurn();
        }, 750);
      }
    }
  });

  board.appendChild(card);
});

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function checkWin() {
  const matched = document.querySelectorAll('.matched');
  if (matched.length === symbols.length) {
    note.innerHTML = `
      You took your time.<br>
      Some things are nicer when they’re not rushed.
    `;
  }
}

const wishInput = document.getElementById('wishInput');
const livePreview = document.getElementById('livePreview');
const submitWish = document.getElementById('submitWish');

if (wishInput) {
  // live typing preview
  wishInput.addEventListener('input', () => {
    if (wishInput.value.trim() === '') {
      livePreview.textContent = "I’m here. Take your time.";
    } else {
      livePreview.textContent = wishInput.value;
    }
  });

  // save wish
  submitWish.addEventListener('click', () => {
    const text = wishInput.value.trim();
    if (!text) return;

    localStorage.setItem('herWish', text);
    livePreview.innerHTML = `
      It’s saved.<br>
      Thank you for sharing this.
    `;
    wishInput.disabled = true;
  });
}

function scrollCarousel(direction) {
  const track = document.getElementById('carouselTrack');
  const scrollAmount = 200;
  track.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

function showCategory(id) {
  document.querySelectorAll('.category').forEach(c => c.classList.remove('active'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));

  document.getElementById(id).classList.add('active');
  event.target.classList.add('active');
}


