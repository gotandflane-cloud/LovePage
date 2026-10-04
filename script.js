const openButton = document.querySelector(
  ".love-page > .love-card:not(.second-screen):not(.third-screen) .main-button",
);
const firstScreen = document.querySelector(
  ".love-page > .love-card:not(.second-screen):not(.third-screen)",
);
const secondScreen = document.querySelector(".second-screen");
const nextButton = document.querySelector(".next-button");
const thirdScreen = document.querySelector(".third-screen");
const questionButton = document.querySelector(".question-button");
const fourthScreen = document.querySelector(".love-question");
const finalScreen = document.querySelector(".final-screen");
const yesButton = document.querySelector(".yes-btn");
const noButton = document.querySelector(".no-btn");

let noButtonStart = null;

openButton.addEventListener("click", function () {
  firstScreen.style.display = "none";
  secondScreen.style.display = "block";
});

nextButton.addEventListener("click", function () {
  secondScreen.style.display = "none";
  thirdScreen.style.display = "block";
});

questionButton.addEventListener("click", function () {
  thirdScreen.style.display = "none";
  fourthScreen.style.display = "flex";
  noButtonStart = null;
});

yesButton.addEventListener("click", function () {
  fourthScreen.style.display = "none";
  finalScreen.style.display = "flex";
});

function moveNoButton(event) {
  const buttonRect = noButton.getBoundingClientRect();

  if (!noButtonStart) {
    noButtonStart = { left: buttonRect.left, top: buttonRect.top };
  }

  const minX = 8 - noButtonStart.left;
  const maxX = window.innerWidth - buttonRect.width - 8 - noButtonStart.left;
  const minY = 8 - noButtonStart.top;
  const maxY = window.innerHeight - buttonRect.height - 8 - noButtonStart.top;
  const rangeX = Math.max(0, maxX - minX);
  const rangeY = Math.max(0, maxY - minY);
  let bestPosition = { x: 0, y: 0 };
  let greatestDistance = -1;

  for (let attempt = 0; attempt < 10; attempt += 1) {
    const x = minX + Math.random() * rangeX;
    const y = minY + Math.random() * rangeY;
    const distance = Math.hypot(
      noButtonStart.left + x + buttonRect.width / 2 - event.clientX,
      noButtonStart.top + y + buttonRect.height / 2 - event.clientY,
    );

    if (distance > greatestDistance) {
      greatestDistance = distance;
      bestPosition = { x, y };
    }
  }

  noButton.style.transform = `translate(${bestPosition.x}px, ${bestPosition.y}px)`;
}

noButton.addEventListener("pointerenter", function (event) {
  if (event.pointerType === "mouse") {
    moveNoButton(event);
  }
});

noButton.addEventListener("pointerdown", function (event) {
  if (event.pointerType !== "mouse") {
    event.preventDefault();
    moveNoButton(event);
  }
});

noButton.addEventListener("click", function (event) {
  event.preventDefault();
  event.stopPropagation();
  moveNoButton(event);
});
