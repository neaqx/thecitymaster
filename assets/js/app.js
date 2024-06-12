const questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "What is the capital of Germany?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 2 },
    { question: "What is the capital of Spain?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 3 },
    // Add 12 more questions
];

let currentQuestionIndex = 0;
let score = 0;
let questionCounter = 0;
const maxQuestions = 8;
const scorePoints = 100;
const scorePenalty = 50;
let availableQuestions = [];

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.endsWith('game.html')) {
        startGame();
    } else if (window.location.pathname.endsWith('end.html')) {
        document.getElementById('final-score').innerText = localStorage.getItem('recentScore');
        document.getElementById('submit-score').addEventListener('click', saveScore);
    } else if (window.location.pathname.endsWith('scoreboard.html')) {
        displayScoreboard();
    }
});

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    questionCounter = 0;
    availableQuestions = [...questions];
    displayNextQuestion();
    startTimer();
}

function displayNextQuestion() {
    if (questionCounter >= maxQuestions || availableQuestions.length === 0) {
        localStorage.setItem('recentScore', score);
        return window.location.assign('end.html');
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    const currentQuestion = availableQuestions[questionIndex];
    document.getElementById('question-container').innerText = currentQuestion.question;
    document.getElementById('question-counter').innerText = `Question: ${questionCounter}/${maxQuestions}`;
    document.getElementById('score').innerText = `Score: ${score}`;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(index, currentQuestion.correct));
        answerButtons.appendChild(button);
    });
    availableQuestions.splice(questionIndex, 1);
}

function selectAnswer(selectedIndex, correctIndex) {
    if (selectedIndex === correctIndex) {
        score += scorePoints;
    } else {
        score -= scorePenalty;
    }
    displayNextQuestion();
}

function startTimer() {
    let timeLeft = 15;
    const timerElement = document.getElementById('timer');
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            displayNextQuestion();
        } else {
            timerElement.innerText = `Time left: ${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

function saveScore() {
    const username = document.getElementById('username').value;
    const score = localStorage.getItem('recentScore');
    const scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];
    scoreboard.push({ name: username, score: score });
    localStorage.setItem('scoreboard', JSON.stringify(scoreboard));
    window.location.assign('scoreboard.html');
}

function displayScoreboard() {
    const scoreboard = JSON.parse(localStorage.getItem('scoreboard')) || [];
    const scoreboardElement = document.getElementById('scoreboard');
    scoreboardElement.innerHTML = scoreboard.map(entry => `<li>${entry.name} - ${entry.score}</li>`).join('');
}
