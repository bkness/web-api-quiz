# Timed Quiz

## Description

This project is a timed quiz created using JavaScript, CSS, and HTML. It meets all acceptance criteria and is fully functional. The quiz tests the user's knowledge by presenting multiple-choice questions with a countdown timer.

## Table of Contents 📝

- [Features](#features)
- [How It Works](#how-it-works)
- [Screenshot](#screenshot)
- [Deployment](#deployment)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [Questions](#questions)

## Features

- **Start Quiz:** Initiates a countdown timer from 100 seconds.
- **Answer Questions:** Users answer multiple-choice questions.
  - If the user selects a wrong answer, 10 seconds are deducted from the timer.
  - If the user answers all questions correctly or the timer reaches 0, the "End Quiz" functionality is triggered.
- **End Quiz:** Prompts the user to enter their initials for a high score, which is then saved to local storage.

Detailed comments within the code explain the functionality.

## How It Works

1. **Start Quiz:** 
    - The user clicks the "Start Quiz" button to begin.
    - A timer starts counting down from 100 seconds.

2. **Answering Questions:**
    - The user selects answers to multiple-choice questions.
    - Incorrect answers result in a 10-second penalty.

3. **End Quiz:**
    - The quiz ends when the user answers all questions or the timer reaches 0.
    - The user is prompted to enter their initials.
    - The score is saved to local storage for high score tracking.

## Screenshot

![Timed Quiz Screenshot](/assets/images/web_quiz.png)

## Deployment

You can access the deployed project [here](https://bkness.github.io/web-api-quiz/).


## Installation

To set up the project locally, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/bkness/web-api-quiz.git
    ```
2. Navigate to the project directory:
    ```bash
    cd web-api-quiz
    ```
3. Open `index.html` in your browser to start the quiz.

## Usage

Run the project by opening `index.html` in a web browser. Click the "Start Quiz" button to begin the timed quiz.

## Contributing

If you would like to contribute, please fork the project and open a pull request with your new code.

## Questions

If you have any questions, feel free to email me at kbrandon863@gmail.com. You can also see more of my work on my GitHub profile [bkness](https://github.com/bkness).
