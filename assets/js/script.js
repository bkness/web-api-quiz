// here we have created variables that we can call on later down in our code, especially the important ones such as time and penalty time. we have to keep these in our global scope in order to reduce code and make it more accessible

var startBtn = document.getElementById("start-game");
var time = 100;
var timer;
var timerCount = document.getElementById("time");
var introContainer = document.getElementById('intro');
var questionContainer = document.getElementById('questions');
var answerButtonsContainer = document.getElementById('answer-buttons');
var endMessage = document.getElementById('end-message')
var penaltyTime = 10;
var currentQuestionIndex = 0;
var highscoreButton = document.getElementById('highscore-button');
var initialsSubmit = document.getElementById('initialsForm');
var gameOver = false;
var highscoreButton = document.getElementById('highscore-button');

highscoreButton.addEventListener('click', displayHighScores);

function saveHighScore() {
    var initials = document.getElementById('initials').value;
    var score = time;
    // getting existing high score from local storage 
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    // adds a new high score 
    highScores.push({ initials: initials, score: score });
    // sort high scores in decending order 
    highScores.sort(function (a, b) {
        return b.score - a.score;
    });
    // keeps only 5 scores 
    highScores = highScores.slice(0, 5);
    // saves updated highscore back to local storage 
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // displays the high score 
    displayHighScores();
}

function resetQuiz() {
    // Reset variables
    time = 100;
    currentQuestionIndex = 0;
    gameOver = false;

    // Reset timer display
    timerCount.textContent = time;

    // Hide end message and initials form
    endMessage.textContent = "";
    initialsSubmit.style.display = "none";

    // Show start button and hide highscore container (if it's visible)
    startBtn.style.display = "block";
    highscoreContainer.style.display = "none";

    // Clear any previous high score display
    highscoreList.innerHTML = '';

    // Show intro container and hide question container
    introContainer.style.display = "block";
    questionContainer.style.display = "none";

    // Clear any previous question and answer buttons
    questionContainer.innerHTML = '';
    answerButtonsContainer.innerHTML = '';

    initialsSubmit.addEventListener('submit', function(event) {
        saveHighScore();
        resetQuiz();
    })
}

function displayHighScores() {
    var highscoreContainer = document.getElementById('highscore-container');
    var highscoreList = document.getElementById('highscore-list');
    var highscores = JSON.parse(localStorage.getItem('highScores')) || [];

    highscoreList.innerHTML = ''

    highscores.forEach(function (score) {
        var li = document.createElement('li');
        li.textContent = score.initials + ': ' + score.score;
        highscoreList.appendChild(li);
    })
    highscoreContainer.style.display = 'block'

}

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

    startBtn.style.display = 'none'
    introContainer.style.display = 'none';

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

        // here i am clearing the timer and giving the user a response varrying on if they won or not
        //    need to add ways to check score if won change time > o 
        // add spot for user to add their credentials 
        clearInterval(timer);
        gameOver = true;

        if (time > 0) {
            endMessage.textContent = "Crongatulations, you won!";
            localStorage.setItem('win', 'true');
            initialsSubmit.style.display = 'block';
        } else {
            endMessage.textContent = "Times Up! Game Over!";
        }

        questionContainer.appendChild(endMessage);
    }
}