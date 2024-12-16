document.addEventListener("DOMContentLoaded", () => {
    const header = document.querySelector('header[data-include-path]');
    const path = header.getAttribute('data-include-path');
  
    if (path) {
      fetch(path)
        .then(response => response.text())
        .then(data => {
          header.innerHTML = data; // 외부 파일 내용을 삽입
  
          // 로그인 상태 확인 및 헤더 업데이트
          const loginBtn = document.getElementById('login-btn');
          const welcomeMessage = document.getElementById('welcome-message'); // 환영 메시지 요소
          const userData = JSON.parse(localStorage.getItem('user_data')); // 로컬스토리지에서 user_data 가져오기
  
          if (userData && userData.name) {
            // 로그인 상태: 버튼을 '로그아웃'으로 변경, 환영 메시지 표시
            loginBtn.textContent = '로그아웃';
            if (welcomeMessage) {
              welcomeMessage.textContent = `${userData.name}님 환영합니다!`;
            }
  
            loginBtn.addEventListener('click', () => {
              // 로그아웃 로직
              localStorage.removeItem('user_data'); // 사용자 데이터 삭제
              localStorage.removeItem('access_token'); // 액세스 토큰 삭제
              localStorage.removeItem('token_type'); // 토큰 타입 삭제
              alert(`${userData.name}님, 로그아웃되었습니다.`);
              window.location.reload(); // 페이지 새로고침
            });
          } else {
            // 비로그인 상태: 버튼을 '로그인'으로 변경
            loginBtn.textContent = '로그인';
            if (welcomeMessage) {
              welcomeMessage.textContent = ''; // 환영 메시지 초기화
            }
  
            loginBtn.addEventListener('click', () => {
              window.location.href = './login.html'; // 로그인 페이지로 이동
            });
          }
        })
        .catch(err => console.error('Error loading header:', err));
    }
  });
  