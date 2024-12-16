document.addEventListener("DOMContentLoaded", () => {
  const rentalButton = document.querySelector(".btn"); // '대여하기' 버튼 선택
  const cartSection = document.querySelector("#cart"); // 장바구니 섹션
  const totalElement = document.querySelector(".total span"); // Total 가격 표시 요소

  rentalButton.addEventListener("click", async () => {
    const accessToken = localStorage.getItem("access_token"); // 로컬스토리지에서 토큰 가져오기
    const tokenType = localStorage.getItem("token_type");

    if (!accessToken || !tokenType) {
      alert("로그인이 필요합니다.");
      window.location.href = "./login.html"; // 로그인 페이지로 이동
      return;
    }

    try {
      // 장바구니 항목 가져오기
      const wishlistResponse = await fetch("http://43.203.22.130:8000/wishlist", {
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

      if (!wishlistResponse.ok) {
        throw new Error("장바구니 데이터를 가져오는데 실패했습니다.");
      }

      const wishlistData = await wishlistResponse.json();
      const wishlistItems = Object.values(wishlistData);

      if (wishlistItems.length === 0) {
        alert("장바구니가 비어 있습니다.");
        return;
      }

      // 각 항목을 rental로 옮기기
      for (const item of wishlistItems) {
        const rentalResponse = await fetch("http://43.203.22.130:8000/rental", {
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

        if (!rentalResponse.ok) {
          throw new Error(`"${item.title}" 대여에 실패했습니다.`);
        }

        // wish에서 항목 삭제
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
          throw new Error(`"${item.title}" 삭제에 실패했습니다.`);
        }
      }

      // 성공적으로 처리된 후 UI 업데이트
      cartSection.innerHTML = "<p>장바구니가 비어 있습니다.</p>";
      totalElement.textContent = "0 원";

      alert("모든 책이 대여되었습니다.");
    } catch (error) {
      console.error("오류 발생:", error);
      alert(`오류 발생: ${error.message}`);
    }
  });
});
