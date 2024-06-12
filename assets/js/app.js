const questions = [
    { question: "What is the capital of France?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "What is the capital of Germany?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 2 },
    { question: "What is the capital of Spain?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 3 },
    { question: "What is the capital of Italy?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 0 },
    { question: "What is the capital of the United Kingdom?", answers: ["Paris", "London", "Berlin", "Madrid"], correct: 1 },
    { question: "What is the capital of the United States?", answers: ["Paris", "Washington D.C.", "Berlin", "Madrid"], correct: 1 },
    { question: "What is the capital of Canada?", answers: ["Paris", "London", "Berlin", "Ottawa"], correct: 3 },
    { question: "What is the capital of Australia?", answers: ["Sydney", "London", "Canberra", "Melbourne"], correct: 2 },
    { question: "What is the capital of Japan?", answers: ["Tokyo", "London", "Beijing", "Seoul"], correct: 0 },
    { question: "What is the capital of China?", answers: ["Tokyo", "London", "Beijing", "Seoul"], correct: 2 },
    { question: "What is the capital of South Korea?", answers: ["Tokyo", "London", "Beijing", "Seoul"], correct: 3 },
    { question: "What is the capital of Brazil?", answers: ["Tokyo", "London", "Brasilia", "Seoul"], correct: 2 },
    { question: "What is the capital of Russia?", answers: ["Moscow", "London", "Beijing", "Seoul"], correct: 0 },
    { question: "What is the capital of India?", answers: ["Tokyo", "New Delhi", "Beijing", "Seoul"], correct: 1 },
    { question: "What is the capital of Mexico?", answers: ["Tokyo", "London", "Mexico City", "Seoul"], correct: 2 },
    { question: "What is the capital of South Africa?", answers: ["Tokyo", "London", "Beijing", "Pretoria"], correct: 3 },
    { question: "What is the capital of Argentina?", answers: ["Tokyo", "London", "Buenos Aires", "Seoul"], correct: 2 },
    { question: "What is the capital of Egypt?", answers: ["Tokyo", "London", "Cairo", "Seoul"], correct: 2 },
    { question: "What is the capital of Nigeria?", answers: ["Tokyo", "London", "Beijing", "Abuja"], correct: 3 },
    { question: "What is the capital of Indonesia?", answers: ["Tokyo", "London", "Jakarta", "Seoul"], correct: 2 },
    { question: "What is the capital of Turkey?", answers: ["Tokyo", "London", "Ankara", "Seoul"], correct: 2 },
    { question: "What is the capital of Saudi Arabia?", answers: ["Tokyo", "London", "Riyadh", "Seoul"], correct: 2 },
    { question: "What is the capital of Iran?", answers: ["Tokyo", "London", "Tehran", "Seoul"], correct: 2 },
    { question: "What is the capital of Pakistan?", answers: ["Tokyo", "London", "Beijing", "Islamabad"], correct: 3 },
    { question: "What is the capital of Afghanistan?", answers: ["Tokyo", "London", "Kabul", "Seoul"], correct: 2 },
    { question: "What is the capital of Iraq?", answers: ["Tokyo", "London", "Baghdad", "Seoul"], correct: 2 },
  
    
];

let currentQuestionIndex = 0;
let score = 0;
let questionCounter = 0;
const maxQuestions = 8;
const scorePoints = 100;
const scorePenalty = 50;
let availableQuestions = [];
let timerInterval;

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
    resetTimer();
    startTimer();
}

function selectAnswer(selectedIndex, correctIndex) {
    clearInterval(timerInterval);
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
    timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            score -= scorePenalty;
            displayNextQuestion();
        } else {
            timerElement.innerText = `Time left: ${timeLeft}s`;
            timeLeft--;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
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
