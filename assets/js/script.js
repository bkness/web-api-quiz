
var startBtn = document.getElementById("start-game");
var time = 100;
var timer;
var timerCount = document.getElementById("time");
var introContainer = document.getElementById('intro');
var questionContainer = document.getElementById('questions');
var answerButtonsContainer = document.getElementById('answer-buttons');
var penaltyTime = 10;
var currentQuestionIndex = 0;
var gameOver = false;

var questions = [
    {
        question: "What is HTML short for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyper Text Machine Learning", correct: false },
            { text: "Heart of Machine Language", correct: false },
            { text: "How To Make Lasagna", correct: false },
        ]
    },
    {
        question: "What does CSS do?",
        answers: [
            { text: "Styles our HTML page", correct: true },
            { text: "Creates functionality", correct: false },
            { text: "Cooking recipe", correct: false },
            { text: "Creates elements within HTML", correct: false },
        ]
    },
    {
        question: "What does JavaScript do?",
        answers: [
            { text: "Creates functionality for a page", correct: true },
            { text: "Adds style to your page", correct: false },
            { text: "PDF Reader", correct: false },
            { text: "Language translator", correct: false },
        ]
    },
    {
        question: "What is API short for?",
        answers: [
            { text: "Application Programming Interface", correct: true },
            { text: "Accelerated Proton Ion", correct: false },
            { text: "Article Point Indentation", correct: false },
            { text: "Are Penguins Indestructible", correct: false },
        ]
    }
];

startBtn.addEventListener('click', startGame);

function startGame() {
    timerCount.textContent = time;
    timer = setInterval(function () {
        time--;
        timerCount.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            endQuiz();
        }
    }, 1000);

    introContainer.style.display = 'none';
    showQuestion();
}

function showQuestion() {
    var h2 = document.createElement("h2");
    h2.textContent = questions[currentQuestionIndex].question;
    questionContainer.innerHTML = '';
    answerButtonsContainer.innerHTML = ''
    questionContainer.appendChild(h2);

    var answerContainer = document.createElement('div');

    for (var i = 0; i < questions[currentQuestionIndex].answers.length; i++) {
        var button = document.createElement("button");
        button.textContent = questions[currentQuestionIndex].answers[i].text;
        button.dataset.correct = questions[currentQuestionIndex].answers[i].correct;
        button.addEventListener('click', selectAnswer);
        answerContainer.appendChild(button);
    }

    answerButtonsContainer.appendChild(answerContainer);
}

function setNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
}

function selectAnswer(event) {
    if (gameOver) return;

    var correctAnswer = event.target.dataset.correct;

    if (correctAnswer === "true") {
        setNextQuestion();
    } else {
        time -= penaltyTime;
        if (time < 0) time = 0;
    }
}

function endQuiz() {
    if (!gameOver) {
        clearInterval(timer);
        gameOver = true;
        if (time > 0) {
            var endMessage = document.createElement("h2");
            endMessage.textContent = "Congratulations, you won!";
            questionContainer.appendChild(endMessage);
        } else {
            var endMessage = document.createElement("h2");
            endMessage.textContent = "Time's up! Game Over!";
            questionContainer.appendChild(endMessage);
        }
    }
}