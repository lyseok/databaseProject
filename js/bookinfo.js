function displayBookDetail() {
  try {
    // 로컬 스토리지에서 저장된 책 정보를 불러옴
    const bookDetail = JSON.parse(localStorage.getItem('bookDetail'));

    if (!bookDetail) {
      throw new Error('No book detail found.');
    }

    const bookDetailsContainer = document.getElementById('book-details');
    bookDetailsContainer.innerHTML = /* html */`
      <!-- <img src="${bookDetail.image}" alt="${bookDetail.title}">
      <h3>${bookDetail.title}</h3>
      <p><strong>Author:</strong> ${bookDetail.author}</p>
      <p><strong>Publisher:</strong> ${bookDetail.publisher}</p>
      <p><strong>ISBN:</strong> ${bookDetail.isbn}</p>
      <p><strong>Price:</strong> ${bookDetail.price}원</p>
      <p><strong>Genre:</strong> ${bookDetail.genre}</p>
      <h4>Summary:</h4>
      <p>${bookDetail.summary}</p> -->

      <main class="detail-page">
        <div class="detail-container">
          <div class="detail-goods-photo">
            <img src="${bookDetail.image}" alt="${bookDetail.title}" class="detail-photo" />
          </div>
          <div class="detail-info-box">
            <div class="detail-goods">
              <dl class="detail-info">
                <dt class="detail-name">${bookDetail.title}</dt>
                <dt class="detail-writer">${bookDetail.author}</dt>
                <dd class="detail-price">${bookDetail.price}원</dd>
                <dd class="detail-price">ISBN : ${bookDetail.isbn}</dd>
              </dl>
              <p class="detail-summary"></p>
            </div>
            <div class="detail-info-control">
              <button type="button" class="control-btn detail-wish">장바구니</button>
              <button type="button" class="control-btn detail-cart">대여하기</button>
            </div>
          </div>
        </div>
      </main>
    `;


  } catch (error) {
    document.getElementById('book-details').innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  displayBookDetail();

  // 이벤트 리스너 추가
  document.getElementById("book-details").addEventListener("click", async (event) => {
    const target = event.target;

    // 로컬 스토리지에서 책 정보 가져오기
    const bookDetail = JSON.parse(localStorage.getItem("bookDetail"));
    const accessToken = localStorage.getItem("access_token");
    const tokenType = localStorage.getItem("token_type");

    if (!accessToken || !tokenType) {
      alert("로그인이 필요합니다.");
      window.location.href = "./login.html";
      return;
    }

    // 장바구니 버튼 클릭
    if (target.classList.contains("detail-wish")) {
      try {
        const response = await fetch("http://43.203.22.130:8000/wish", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_token: accessToken,
            book_id: bookDetail.book_id,
          }),
        });

        if (!response.ok) {
          throw new Error("장바구니에 추가하지 못했습니다.");
        }

        alert(`"${bookDetail.title}" 책이 장바구니에 추가되었습니다.`);
      } catch (error) {
        console.error("장바구니 추가 중 오류:", error);
        alert(error.message);
      }
    }

    // 대여하기 버튼 클릭
    if (target.classList.contains("detail-cart")) {
      try {
        const response = await fetch("http://43.203.22.130:8000/rental", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_token: accessToken,
            book_id: bookDetail.book_id,
          }),
        });

        if (!response.ok) {
          throw new Error("대여 요청에 실패했습니다.");
        }

        alert(`"${bookDetail.title}" 책을 성공적으로 대여했습니다.`);
      } catch (error) {
        console.error("대여 중 오류 발생:", error);
        alert(error.message);
      }
    }
  });
});
