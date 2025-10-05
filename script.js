const quizData = [
  {
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b"
  },
  {
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hyperloop Machine Language",
    c: "Hyperlink Markdown Language",
    d: "Home Tool Markup Language",
    correct: "a"
  },
  {
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "None of the above",
    correct: "b"
  }
];

// Elements
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");

const questionEl = document.getElementById("question");
const answerBtns = document.querySelectorAll(".answer-btn");
const nextBtn = document.getElementById("next-btn");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("timer");
const resultText = document.getElementById("result-text");

const startBtn = document.getElementById("start-btn");
const restartBtn = document.getElementById("restart-btn");

let currentQuiz = 0;
let score = 0;
let timer;
let timeLeft = 15;

// Start Quiz
startBtn.addEventListener("click", () => {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuiz();
});

// Load a question
function loadQuiz() {
  resetState();
  const currentQuizData = quizData[currentQuiz];
  questionEl.textContent = currentQuizData.question;

  answerBtns.forEach(btn => {
    const opt = btn.id;
    btn.textContent = currentQuizData[opt];
  });

  updateProgress();
  startTimer();
}

// Reset buttons and timer
function resetState() {
  nextBtn.classList.add("hidden");
  answerBtns.forEach(btn => {
    btn.disabled = false;
    btn.style.backgroundColor = "#f0f0f0";
  });
  clearInterval(timer);
  timeLeft = 15;
  timerEl.textContent = `${timeLeft}s`;
}

// Start countdown
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerEl.textContent = `${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      disableAnswers();
      nextBtn.classList.remove("hidden");
    }
  }, 1000);
}

// Handle answer click
answerBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    clearInterval(timer);
    const answer = btn.id;
    if (answer === quizData[currentQuiz].correct) {
      btn.style.backgroundColor = "#9bff9b";
      score++;
    } else {
      btn.style.backgroundColor = "#ff9b9b";
    }
    disableAnswers();
    nextBtn.classList.remove("hidden");
  });
});

function disableAnswers() {
  answerBtns.forEach(b => (b.disabled = true));
}

// Progress Bar
function updateProgress() {
  const progress = ((currentQuiz) / quizData.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Next Question
nextBtn.addEventListener("click", () => {
  currentQuiz++;
  if (currentQuiz < quizData.length) {
    loadQuiz();
  } else {
    showResult();
  }
});

// Show result screen
function showResult() {
  quizScreen.classList.add("hidden");
  resultScreen.classList.remove("hidden");
  progressBar.style.width = "100%";
  resultText.textContent = `🎉 You scored ${score} out of ${quizData.length}!`;
}

// Restart Quiz
restartBtn.addEventListener("click", () => {
  currentQuiz = 0;
  score = 0;
  resultScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
});
