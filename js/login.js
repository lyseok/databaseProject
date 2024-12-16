console.clear();

const loginBtn = document.getElementById('login');
const signupBtn = document.getElementById('signup');

loginBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode.parentNode;
	Array.from(e.target.parentNode.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			signupBtn.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});

signupBtn.addEventListener('click', (e) => {
	let parent = e.target.parentNode;
	Array.from(e.target.parentNode.classList).find((element) => {
		if(element !== "slide-up") {
			parent.classList.add('slide-up')
		}else{
			loginBtn.parentNode.parentNode.classList.add('slide-up')
			parent.classList.remove('slide-up')
		}
	});
});


// 회원가입 버튼 클릭 이벤트 리스너 등록
document.querySelector('.signup .submit-btn').addEventListener('click', async (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  // 입력값 가져오기
  const username = document.querySelector('.signup .form-holder input[placeholder="Name"]').value.trim();
  const email = document.querySelector('.signup .form-holder input[placeholder="Email"]').value.trim();
  const password = document.querySelector('.signup .form-holder input[placeholder="Password"]').value.trim();

  // 입력값 유효성 검사
  if (!username || !email || !password) {
    alert('모든 필드를 입력해주세요.');
    return;
  }

  try {
    // 서버에 POST 요청 보내기
    const response = await fetch('http://43.203.22.130:8000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    // 응답 처리
    if (response.ok) {
      const data = await response.json();
      alert('회원가입이 성공적으로 완료되었습니다!');
      console.log('응답 데이터:', data);
    } else {
      const errorData = await response.json();
      alert(`회원가입 실패: ${errorData.message || '서버 에러'}`);
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert('회원가입 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
});




// // 로그인 버튼 클릭 이벤트 리스너 등록
// document.querySelector('.login .submit-btn').addEventListener('click', async (event) => {
//   event.preventDefault(); // 기본 폼 제출 방지

//   // 입력값 가져오기
//   const email = document.querySelector('.login .form-holder input[placeholder="Email"]').value.trim();
//   const password = document.querySelector('.login .form-holder input[placeholder="Password"]').value.trim();

//   // 입력값 유효성 검사
//   if (!email || !password) {
//     alert('이메일과 비밀번호를 입력해주세요.');
//     return;
//   }

//   try {
//     // 서버에 POST 요청 보내기
//     const response = await fetch('http://43.203.22.130:8000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     // 응답 처리
//     if (response.ok) {
//       const data = await response.json();
//       alert('로그인 성공!');
//       console.log('로그인 데이터:', data);

//       // 사용자 이름 저장 (localStorage 사용)
//       localStorage.setItem('username', data.username);

//       // index.html로 이동
//       window.location.href = './index.html';
//     } else {
//       const errorData = await response.json();
//       alert(`로그인 실패: ${errorData.message || '잘못된 이메일 또는 비밀번호입니다.'}`);
//     }
//   } catch (error) {
//     console.error('오류 발생:', error);
//     alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
//   }
// });





// // 로그인 버튼 클릭 이벤트
// document.querySelector('.login .submit-btn').addEventListener('click', async (event) => {
//   event.preventDefault(); // 기본 폼 제출 방지

//   // 입력값 가져오기
//   const email = document.querySelector('.login .form-holder input[placeholder="Email"]').value.trim();
//   const password = document.querySelector('.login .form-holder input[placeholder="Password"]').value.trim();

//   // 입력값 확인
//   if (!email || !password) {
//     alert('이메일과 비밀번호를 입력해주세요.');
//     return;
//   }

//   try {
//     // 서버에 POST 요청 보내기
//     const response = await fetch('http://43.203.22.130:8000/login', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         email,
//         password,
//       }),
//     });

//     // 응답 처리
//     if (response.ok) {
//       const data = await response.json();
//       alert('로그인 성공!');
//       console.log('로그인 데이터:', data);

//       // access_token과 token_type을 localStorage에 저장
//       localStorage.setItem('access_token', data.access_token);
//       localStorage.setItem('token_type', data.token_type);

//       // 다음 페이지로 이동
//       window.location.href = './index.html';
//     } else {
//       const errorData = await response.json();
//       alert(`로그인 실패: ${errorData.message || '잘못된 이메일 또는 비밀번호입니다.'}`);
//     }
//   } catch (error) {
//     console.error('오류 발생:', error);
//     alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
//   }
// });


document.querySelector('.login .submit-btn').addEventListener('click', async (event) => {
  event.preventDefault(); // 기본 폼 제출 방지

  // 입력값 가져오기
  const email = document.querySelector('.login .form-holder input[placeholder="Email"]').value.trim();
  const password = document.querySelector('.login .form-holder input[placeholder="Password"]').value.trim();

  // 입력값 확인
  if (!email || !password) {
    alert('이메일과 비밀번호를 입력해주세요.');
    return;
  }

  try {
    // 서버에 로그인 요청
    const loginResponse = await fetch('http://43.203.22.130:8000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (loginResponse.ok) {
      const loginData = await loginResponse.json();
      alert('로그인 성공!');
      console.log('로그인 데이터:', loginData);

      // 토큰 저장
      localStorage.setItem('access_token', loginData.access_token);
      localStorage.setItem('token_type', loginData.token_type);

      // 마이페이지 데이터 요청
      const mypageResponse = await fetch('http://43.203.22.130:8000/mypage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_token: loginData.access_token,
          token_type: loginData.token_type,
        }),
      });

      if (mypageResponse.ok) {
        const mypageData = await mypageResponse.json();
        console.log('마이페이지 데이터:', mypageData);

        // 마이페이지 데이터 저장
        localStorage.setItem('user_data', JSON.stringify(mypageData));
      } else {
        console.error('마이페이지 데이터 요청 실패:', mypageResponse.statusText);
      }

      // 메인 페이지로 이동
      window.location.href = './index.html';
    } else {
      const errorData = await loginResponse.json();
      alert(`로그인 실패: ${errorData.message || '잘못된 이메일 또는 비밀번호입니다.'}`);
    }
  } catch (error) {
    console.error('오류 발생:', error);
    alert('로그인 중 오류가 발생했습니다. 다시 시도해주세요.');
  }
});
