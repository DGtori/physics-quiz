const problemContainer = document.getElementById("problem-container");
const timeDisplay = document.getElementById("time");
const answerInput = document.getElementById("answer");
const checkBtn = document.getElementById("check-btn");
const resultDisplay = document.getElementById("result");
const nextBtn = document.getElementById("next-btn");

let currentProblem = null;
let timer = null;
let seconds = 0;
let isTiming = false;

// 문제 목록과 정답을 예시로 추가
const problems = [
  { image: "images/problem1.png", answer: "42" },
  { image: "images/problem2.png", answer: "30" },
  { image: "images/problem3.png", answer: "9" },
];

// 타이머 시작
function startTimer() {
  if (isTiming) return;

  isTiming = true;
  timer = setInterval(() => {
    seconds++;
    timeDisplay.textContent = seconds;
  }, 1000);
}

// 문제를 랜덤으로 불러오기
function getRandomProblem() {
  const remainingProblems = problems.filter(p => p !== currentProblem);
  const randomIndex = Math.floor(Math.random() * remainingProblems.length);
  return remainingProblems[randomIndex];
}

// 문제 표시
function displayProblem(problem) {
  currentProblem = problem;
  const img = document.getElementById("problem-image");
  img.src = problem.image;
  img.alt = "물리 문제 이미지";
  
  resultDisplay.textContent = '';  // 이전 결과 초기화
  answerInput.value = '';  // 입력값 초기화
  seconds = 0;  // 타이머 초기화
  timeDisplay.textContent = seconds;
  
  // 타이머 시작
  startTimer();
}

// 채점 함수
function checkAnswer() {
  const userAnswer = answerInput.value.trim();
  if (userAnswer === currentProblem.answer) {
    resultDisplay.textContent = "정답입니다!";
    resultDisplay.style.color = "green";
  } else {
    resultDisplay.textContent = "틀렸습니다.";
    resultDisplay.style.color = "red";
  }

  // 타이머 멈추기
  clearInterval(timer);
  isTiming = false;
}

// '다른 문제' 버튼 클릭 시 새로운 문제 표시
nextBtn.addEventListener("click", () => {
  const newProblem = getRandomProblem();
  displayProblem(newProblem);
});

// '채점' 버튼 클릭 시 채점 함수 실행
checkBtn.addEventListener("click", checkAnswer);

// 처음에 랜덤 문제 불러오기
window.onload = () => {
  const randomProblem = problems[Math.floor(Math.random() * problems.length)];
  displayProblem(randomProblem);
};