// here we have created variables that we can call on later down in our code, especially the important ones such as time and penalty time. we have to keep these in our global scope in order to reduce code and make it more accessible
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

// here i am creatng an array with questions and answers that i can call back on
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

// added an event listener so when you click start game the javascript application starts
startBtn.addEventListener('click', startGame);

// here is my start game function. Ive given it a name that i can refer back to and be able to comprehend. 
function startGame() {
    //    this displays the time with the .textContent feature
    timerCount.textContent = time;
    //    sets up a timer to count down the time
    timer = setInterval(function () {
        time--;
        timerCount.textContent = time;

        if (time <= 0) {
            clearInterval(timer);
            //    ends the quiz if time runs out
            endQuiz();
        }
    }, 1000);
    // hides the into container after start-game has initialized 
    // introContainer.style.display = 'none';
    // shows our first question
    showQuestion();
}

function showQuestion() {
    // here we are creating and appending new elements to display the question text
    var h2 = document.createElement("h2");
    h2.textContent = questions[currentQuestionIndex].question;
    questionContainer.innerHTML = '';
    answerButtonsContainer.innerHTML = ''
    questionContainer.appendChild(h2);

    var answerContainer = document.createElement('div');

    // here ive created a loop to cycle through the answers for the current question
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
        //    shows the next question if the first was answered properly 
        showQuestion();
    } else {
        // ends quiz if there are no more questions
        endQuiz();
    }
}

function selectAnswer(event) {
    if (gameOver) return;

    var correctAnswer = event.target.dataset.correct;
    // here i state that is the correct answerf chosen does not equal true the we skip to the penalty time
    if (correctAnswer === "true") {
        //    moves to the next question if the answer if correct
        setNextQuestion();
        // here i have created a penalty timer for the user for 10 seconads if the answer doesnt return true
    } else {
        time -= penaltyTime;
        if (time < 0) time = 0;
    }
}

function endQuiz() {
    if (!gameOver) {
        // here i am clearing the timer and giving the user a response varrying on whethere or not they won
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