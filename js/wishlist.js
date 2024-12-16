// document.addEventListener("DOMContentLoaded", async () => {
//   const container = document.querySelector(".container"); // container 클래스 선택
//   const cartSection = document.createElement("section"); // cart 섹션 생성
//   cartSection.id = "cart";

//   const accessToken = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 가져오기
//   const tokenType = localStorage.getItem("token_type");

//   if (!accessToken || !tokenType) {
//     alert("로그인이 필요합니다.");
//     window.location.href = "./login.html"; // 로그인 페이지로 이동
//     return;
//   }

//   try {
//     // 서버로부터 장바구니 데이터 가져오기
//     const response = await fetch("http://43.203.22.130:8000/wishlist", {
//       method: "POST", // 요청 방식
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
//       throw new Error("장바구니 데이터를 가져오는데 실패했습니다.");
//     }

//     const wishlistData = await response.json(); // 서버에서 받은 데이터
//     const wishlistItems = Object.values(wishlistData); // 객체 값을 배열로 변환

//     if (wishlistItems.length === 0) {
//       cartSection.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
//     } else {
//       // 장바구니 항목 생성
//       wishlistItems.forEach((item) => {
//         const article = document.createElement("article");
//         article.className = "product";

//         article.innerHTML = `
//           <header>
//             <img src="${item.image}" alt="${item.title}" />
//           </header>
//           <div class="content">
//             <h1>${item.title}</h1>
//             <p>${item.author}</p>
//           </div>
//           <footer class="content">
//             <span class="qt">${item.isbn}</span>
//             <h2 class="full-price">${item.price.toLocaleString()} 원</h2>
//           </footer>
//         `;

//         cartSection.appendChild(article);
//       });
//     }
//   } catch (error) {
//     console.error("오류 발생:", error);
//     cartSection.innerHTML = `<p style="color: red;">${error.message}</p>`;
//   }

//   // 생성한 cart 섹션을 container에 추가
//   container.appendChild(cartSection);
// });



document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".container"); // container 클래스 선택
  const cartSection = document.createElement("section"); // cart 섹션 생성
  cartSection.id = "cart";
  const totalElement = document.querySelector(".total span"); // Total 가격 표시 요소

  const accessToken = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 가져오기
  const tokenType = localStorage.getItem("token_type");

  if (!accessToken || !tokenType) {
    alert("로그인이 필요합니다.");
    window.location.href = "./login.html"; // 로그인 페이지로 이동
    return;
  }

  try {
    // 서버로부터 장바구니 데이터 가져오기
    const response = await fetch("http://43.203.22.130:8000/wishlist", {
      method: "POST", // 요청 방식
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
      throw new Error("장바구니 데이터를 가져오는데 실패했습니다.");
    }

    const wishlistData = await response.json(); // 서버에서 받은 데이터
    const wishlistItems = Object.values(wishlistData); // 객체 값을 배열로 변환

    if (wishlistItems.length === 0) {
      cartSection.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
    } else {
      let totalPrice = 0;

      // 장바구니 항목 생성
      wishlistItems.forEach((item) => {
        const article = document.createElement("article");
        article.className = "product";
        article.dataset.bookId = item.book_id; // 삭제 요청에 사용할 book_id 저장

        article.innerHTML = `
          <header>
            <img src="${item.image}" alt="${item.title}" />
          </header>
          <div class="content">
            <h1>${item.title}</h1>
            <p>${item.author}</p>
          </div>
          <footer class="content">
            <span class="qt">ISBN:${item.isbn}</span>
            <h2 class="full-price">${item.price.toLocaleString()} 원</h2>
          </footer>
        `;

        // 클릭 이벤트로 삭제 기능 추가
        article.querySelector("header > img").addEventListener("click", async () => {
          try {
            const deleteResponse = await fetch("http://43.203.22.130:8000/wish", {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                access_token: accessToken,
                book_id: item.book_id,
              }),
            });

            if (!deleteResponse.ok) {
              throw new Error("해당 책을 삭제하는데 실패했습니다.");
            }

            // 삭제 성공 시 UI에서 항목 제거 및 Total 업데이트
            cartSection.removeChild(article);
            totalPrice -= item.price;
            totalElement.textContent = totalPrice.toLocaleString() + " 원";
          } catch (error) {
            console.error("삭제 중 오류 발생:", error);
          }
        });

        cartSection.appendChild(article);
        totalPrice += item.price;
      });

      // Total 가격 업데이트
      totalElement.textContent = totalPrice.toLocaleString() + " 원";
    }
  } catch (error) {
    console.error("오류 발생:", error);
    cartSection.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }

  // 생성한 cart 섹션을 container에 추가
  container.appendChild(cartSection);
});
