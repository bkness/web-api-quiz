var startBtn = document.getElementById("start-game")
var time = 100;
var timer;
var timerCount = document.getElementById("time")
var introContainer = document.getElementById('intro')
var questionContainer = document.getElementById('questions')

var questions = [
    {
        question: "what is html short for?",
        answers: [
            { text: "Hyper Text Tarkup Language", correct: true },
            { text: "Hyper Text Machine Learning", correct: false },
            { text: "Heart of Machine Language", correct: false },
            { text: "How To Make Lasagna", correct: false },
        ]
    }
]

function startGame() {
    // starts timer 
    timerCount.textContent = time
    timer = setInterval(function () {
        // time = time - 1
        time--;
        timerCount.textContent = time

        if (time <= 0) {
            clearInterval(timer)
        }
    }, 1000)

    // hide intro container
    introContainer.style.display = 'none'
    // display question
    showQuestion()
}

function showQuestion() {
    // create an h2
    var h2 = document.createElement("h2")
    // add the content to the h2
    h2.textContent = "sample question"
    // append the h2 to the questions container

    var answerContainer = document.createElement('div')

    for (var i = 0; i < 4; i++) {
        // create a button
        var button = document.createElement("button")
        // add content to the button
        button.textContent = i
        // append the button to the answerContainer
        answerContainer.append(button)

    }

    questionContainer.append(h2, answerContainer)
}


startBtn.addEventListener('click', startGame)