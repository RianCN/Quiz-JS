const questions = [
  {
    question: "O que é JavaScript?",
    answers: [
      {
        text: "Uma linguagem de marcação para criar páginas web",
        correct: false,
      },
      {
        text: "Uma linguagem de programação usada para tornar páginas web interativas",
        correct: true,
      },
      {
        text: "Um sistema operacional para navegadores de internet",
        correct: false,
      },
      { text: "Um tipo de servidor web", correct: false },
    ],
  },
  {
    question: "Como você declara uma variável em JavaScript?",
    answers: [
      { text: "var myVariable;", correct: true },
      { text: "variable myVariable;", correct: false },
      { text: "let myVariable;", correct: false },
      { text: "const myVariable;", correct: false },
    ],
  },
  {
    question: "Qual é o operador de igualdade estrita em JavaScript?",
    answers: [
      { text: "==", correct: false },
      { text: "!=", correct: false },
      { text: "=", correct: false },
      { text: "===", correct: true },
    ],
  },
  {
    question: "O que o método toFixed() faz em JavaScript?",
    answers: [
      { text: "Arredonda um número para o inteiro mais próximo", correct: false },
      { text: "Retorna o número de casas decimais especificado como uma string", correct: false },
      { text: "Remove as casas decimais de um número", correct: false },
      { text: " Retorna o número com uma quantidade fixa de casas decimais", correct: true },
    ],
  },
  {
    question:
      "Qual é o método em JavaScript usado para remover o último elemento de um array?",
    answers: [
      { text: "splice()", correct: false },
      { text: "removeLast()", correct: false },
      { text: "pop()", correct: true },
      { text: "shift()", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Próximo";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    const isCorrect = button.dataset.correct === "true";
    if (isCorrect) {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `Sua Pontuação ${score} de ${questions.length}!`;
  nextButton.innerHTML = "Jogar Novamente";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();

