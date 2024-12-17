document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("access_token");
  const tokenType = localStorage.getItem("token_type");

  if (!accessToken || !tokenType) {
    alert("로그인이 필요합니다.");
    window.location.href = "./login.html";
    return;
  }

  try {
    // 사용자 정보 가져오기
    const profileResponse = await fetch("http://43.203.22.130:8000/mypage", {
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

    if (!profileResponse.ok) {
      throw new Error("사용자 정보를 가져오는데 실패했습니다.");
    }

    const profileData = await profileResponse.json();

    // 사용자 정보 표시
    document.getElementById("profile-username").textContent = profileData.name || "이름 없음";
    document.getElementById("profile-email").textContent = profileData.email || "이메일 없음";

    // 장바구니 데이터 가져오기
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

    const wishListElement = document.getElementById("wish-list");

    if (wishlistItems.length === 0) {
      wishListElement.innerHTML = "<li>장바구니가 비어 있습니다.</li>";
    } else {
      wishlistItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.title; // 책 제목 추가
        wishListElement.appendChild(listItem);
      });
    }

    // 대여목록 데이터 가져오기
    const rentallistResponse = await fetch("http://43.203.22.130:8000/rental-list", {
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
      throw new Error("대여목록 데이터를 가져오는데 실패했습니다.");
    }

    const rentallistData = await rentallistResponse.json();
    const rentallistItems = Object.values(rentallistData);

    const rentalListElement = document.getElementById("rental-list");

    if (rentallistItems.length === 0) {
      rentalListElement.innerHTML = "<li>대여목록이 비어 있습니다.</li>";
    } else {
      rentallistItems.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item.title; // 책 제목 추가
        rentalListElement.appendChild(listItem);
      });
    }
  } catch (error) {
    console.error("오류 발생:", error);
    alert(`오류 발생: ${error.message}`);
  }
});
