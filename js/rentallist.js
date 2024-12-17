// document.addEventListener("DOMContentLoaded", async () => {
//   const container = document.querySelector(".container"); // container 클래스 선택
//   const rentalSection = document.createElement("section"); // rental 섹션 생성
//   rentalSection.id = "rental"; // ID 설정

//   const accessToken = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 가져오기
//   const tokenType = localStorage.getItem("token_type");

//   if (!accessToken || !tokenType) {
//     alert("로그인이 필요합니다.");
//     window.location.href = "./login.html"; // 로그인 페이지로 이동
//     return;
//   }

//   try {
//     // 서버로부터 대여목록 데이터 가져오기
//     const response = await fetch("http://43.203.22.130:8000/rental-list", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       body: JSON.stringify({
//         access_token: accessToken,
//         token_type: tokenType,
//       }),
//     });

//     if (!response.ok) {
//       throw new Error("대여목록 데이터를 가져오는데 실패했습니다.");
//     }

//     const rentalData = await response.json(); // 서버에서 받은 데이터
//     const rentalItems = Object.values(rentalData); // 객체 값을 배열로 변환

//     if (rentalItems.length === 0) {
//       rentalSection.innerHTML = "<p>대여한 책이 없습니다.</p>";
//     } else {
//       // 대여목록 항목 생성
//       rentalItems.forEach((item) => {
//         const article = document.createElement("article");
//         article.className = "product";

//         article.innerHTML = `
//           <header>
//             <img src="${item.image}" alt="${item.title}" />
//           </header>
//           <div class="content">
//             <h1>${item.title}</h1>
//             <p>저자: ${item.author}</p>
//             <p>출판사: ${item.publisher}</p>
//             <p>ISBN: ${item.isbn}</p>
//           </div>
//           <footer class="content">
//             <h2 class="full-price">${item.price.toLocaleString()} 원</h2>
//           </footer>
//         `;
//         rentalSection.appendChild(article);
//       });
//     }
//   } catch (error) {
//     console.error("오류 발생:", error);
//     rentalSection.innerHTML = `<p style="color: red;">${error.message}</p>`;
//   }

//   // 생성한 rental 섹션을 container에 추가
//   container.appendChild(rentalSection);
// });

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container"); // container 클래스 선택
  const rentalSection = document.createElement("section"); // rental 섹션 생성
  rentalSection.id = "rental"; // ID 설정

  const accessToken = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 가져오기
  const tokenType = localStorage.getItem("token_type");

  if (!accessToken || !tokenType) {
    alert("로그인이 필요합니다.");
    window.location.href = "./login.html";
    return;
  }

  try {
    // 서버로부터 대여목록 데이터 가져오기
    const response = await fetch("http://43.203.22.130:8000/rental-list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_token: accessToken,
        token_type: tokenType,
      }),
    });

    if (!response.ok) {
      throw new Error("대여목록 데이터를 가져오는데 실패했습니다.");
    }

    const rentalData = await response.json(); // 서버에서 받은 데이터
    const rentalItems = Object.values(rentalData); // 객체 값을 배열로 변환

    if (rentalItems.length === 0) {
      rentalSection.innerHTML = "<p>대여한 책이 없습니다.</p>";
    } else {
      // 대여목록 항목 생성
      rentalItems.forEach((item) => {
        const article = document.createElement("article");
        article.className = "product";
        article.dataset.bookId = item.book_id; // book_id 저장

        article.innerHTML = `
          <header>
            <img src="${item.image}" alt="${item.title}" />
          </header>
          <div class="content">
            <h1>${item.title}</h1>
            <p>저자: ${item.author}</p>
            <p>출판사: ${item.publisher}</p>
            <p>ISBN: ${item.isbn}</p>
          </div>
          <footer class="content">
            <button class="return-btn">반납하기</button>
          </footer>
        `;

        // 반납 버튼 클릭 이벤트
        const returnButton = article.querySelector(".return-btn");
        returnButton.addEventListener("click", async () => {
          try {
            const returnResponse = await fetch("http://43.203.22.130:8000/return", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_token: accessToken,
                book_id: item.book_id,
              }),
            });

            if (!returnResponse.ok) {
              throw new Error(`"${item.title}" 반납에 실패했습니다.`);
            }

            // 성공 시 해당 항목 제거
            rentalSection.removeChild(article);
            alert(`"${item.title}" 책이 성공적으로 반납되었습니다.`);
          } catch (error) {
            console.error("반납 중 오류 발생:", error);
            alert(error.message);
          }
        });

        rentalSection.appendChild(article);
      });
    }
  } catch (error) {
    console.error("오류 발생:", error);
    rentalSection.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }

  // 생성한 rental 섹션을 container에 추가
  container.appendChild(rentalSection);
});
