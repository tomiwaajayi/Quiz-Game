/***************************************************
||||||||||||||||||||GHOST CODER ||||||||||||||||||||
****************************************************/

const question = document.getElementById("question");
const nextButton = document.getElementById("next-btn");
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");
const options = Array.from(document.getElementsByClassName("options-text"));
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let quizOption1 = document.getElementById("option-1");
let quizOption2 = document.getElementById("option-2");
let quizOption3 = document.getElementById("option-3");
let quizOption4 = document.getElementById("option-4");

let questions = [
  {
    question:
      "Suppose we want to arrange five nos. of DIVs so that DIV4 is placed above DIV1. Now, which css property will we use to control the order of stack?",
    option1: "d-index",
    option2: "s-index",
    option3: "x-index",
    option4: "z-index",
    answer: 4,
  },
  {
    question: `The default value of the "position" attribute is _________`,
    option1: "fixed",
    option2: "static",
    option3: "inherit",
    option4: "absolute",
    answer: 2,
  },
  {
    question:
      "By default Hyperlinks are displayed with an underline. How do you remove the underline from all hyperlinks by using CSS code ?",
    option1: `a {text: no-underline;}`,
    option2: `a {text-style: no-underline;}`,
    option3: `a {text-decoration:none;}`,
    option4: `a {text-decoration: no-underline;}`,
    answer: 3,
  },
  {
    question:
      "An ADT is defined to be a mathematical model of a user-defined type along with the collection of all ____________ operations on that model",
    option1: "Primitive",
    option2: "Assignment",
    option3: "Cardinality",
    option4: "Structured",
    answer: 1,
  },
  {
    question:
      "Which of the following abstract data types can be used to represent a many to many relation ?",
    option1: "Tree",
    option2: "Plex",
    option3: "Graph",
    option4: "Both (b) and (c)",
    answer: 4,
  },
];

// Constants
const Correct_Point = 10;
const Max_Questions = 5;

startQuiz = () => {
  questionCounter = 0;
  sscore = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter >= Max_Questions) {
    localStorage.setItem("mostRecentScore", score);
    return window.location.assign("end.html");
  }

  questionCounter++;
  questionCounterText.innerText = `${questionCounter} of ${Max_Questions}`;

  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  options.forEach((option) => {
    const number = option.dataset["number"];
    option.innerText = currentQuestion["option" + number];
  });

  availableQuestions.splice(questionIndex, 1);

  acceptingAnswers = true;
};

options.forEach((option) => {
  option.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedOption = e.target;
    const selectedAnswer = selectedOption.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      increaseScore(Correct_Point);
      selectedOption.parentElement.classList.add(classToApply);
    } else {
      selectedOption.parentElement.classList.add(classToApply);

      if (currentQuestion.answer === 1) {
        quizOption1.classList.add("correct");
      } else if (currentQuestion.answer === 2) {
        quizOption2.classList.add("correct");
      } else if (currentQuestion.answer === 3) {
        quizOption3.classList.add("correct");
      } else if (currentQuestion.answer === 4) {
        quizOption4.classList.add("correct");
      }
    }

    setTimeout(() => {
      quizOption1.classList.remove("correct");
      quizOption2.classList.remove("correct");
      quizOption3.classList.remove("correct");
      quizOption4.classList.remove("correct");
      selectedOption.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 650);
  });
});

nextButton.addEventListener("click", (event) => {
  getNewQuestion();
});

increaseScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startQuiz();
