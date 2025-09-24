document.addEventListener("DOMContentLoaded", function () {
  // 문제와 정답을 객체로 관리하는 배열 (문제는 동적으로 추가될 수 있음)
  const questions = [
    { image: "problem1.png", answer: "42" },
    { image: "problem2.png", answer: "30" },
    { image: "problem3.png", answer: "9" },
    // 새로운 문제를 여기에 추가할 수 있음
  ];

  let currentProblemIndex = 0; // 현재 문제의 인덱스
  let timerInterval;
  let startTime;
  let isTimerRunning = false;
  let incorrectTimeRecord = null; // 오답 제출 시간 기록

  // DOM 요소
  const timerElement = document.getElementById("timer");
  const resultElement = document.getElementById("result");
  const problemImageElement = document.getElementById("problemImage");
  const inputElement = document.getElementById("answerInput");

  // 문제 이미지 및 타이머 업데이트 함수
  function loadNewProblem() {
    // 문제는 동적으로 추가되므로, 배열에서 랜덤으로 문제를 선택
    currentProblemIndex = Math.floor(Math.random() * questions.length); 
    const currentProblem = questions[currentProblemIndex];
    problemImageElement.src = "images/" + currentProblem.image;

    // 타이머 리셋
    startTime = Date.now();
    timerElement.textContent = "0s";
    
    // 타이머 시작
    if (!isTimerRunning) {
      clearInterval(timerInterval);
      timerInterval = setInterval(updateTimer, 1000);
      isTimerRunning = true;
    }

    // 결과 초기화
    resultElement.textContent = "";
    resultElement.classList.remove("correct", "incorrect");
    if (incorrectTimeRecord) {
      incorrectTimeRecord.remove();
      incorrectTimeRecord = null;
    }
  }

  // 타이머 업데이트 함수
  function updateTimer() {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerElement.textContent = `${elapsedTime}s`;
  }

  // 채점 함수
  function checkAnswer() {
    const userAnswer = inputElement.value.trim();
    const correctAnswer = questions[currentProblemIndex].answer; // 현재 문제의 정답

    // 정답 비교
    if (userAnswer === correctAnswer) {
      resultElement.textContent = "정답입니다!";
      resultElement.classList.remove("incorrect");
      resultElement.classList.add("correct");

      // 정답 제출 시 타이머 멈춤
      clearInterval(timerInterval);
      isTimerRunning = false;
    } else {
      resultElement.textContent = "오답입니다.";
      resultElement.classList.remove("correct");
      resultElement.classList.add("incorrect");

      // 기존 오답 제출 시간이 있으면 제거
      if (incorrectTimeRecord) {
        incorrectTimeRecord.remove();
      }

      // 오답 제출 시간 기록
      const incorrectTime = timerElement.textContent;
      incorrectTimeRecord = document.createElement("div");
      incorrectTimeRecord.id = "incorrectTimeDisplay";
      incorrectTimeRecord.textContent = `오답 제출 시간: ${incorrectTime}`;
      document.getElementById("container").appendChild(incorrectTimeRecord);
    }
  }

  // '채점' 버튼 클릭 시 처리
  document.getElementById("checkButton").addEventListener("click", function () {
    checkAnswer();
  });

  // '다른 문제' 버튼 클릭 시 처리
  document.getElementById("nextButton").addEventListener("click", function () {
    loadNewProblem();
    inputElement.value = ""; // 입력 필드 초기화
  });

  // 처음에 첫 번째 문제 불러오기
  loadNewProblem();
});