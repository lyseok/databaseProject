// (async () => {
//   const accessToken = localStorage.getItem('access_token') || "유효한_토큰_여부_검증";
//   const tokenType = localStorage.getItem('token_type') || "bearer";

//   try {
//     const response = await fetch('http://43.203.22.130:8000/mypage', {
//       method: 'POST',
//       headers: {
//         'accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${accessToken}` // 헤더로 토큰 전달
//       },
//       body: JSON.stringify({
//         access_token: accessToken, // 필요 없을 수도 있음
//         token_type: tokenType,   // 필요 없을 수도 있음
//       }),
//     });

//     if (response.ok) {
//       const data = await response.json();
//       console.log('응답 데이터:', data);
//     } else {
//       console.error('요청 실패:', response.status, response.statusText);
//     }
//   } catch (error) {
//     console.error('오류 발생:', error);
//   }
// })();
