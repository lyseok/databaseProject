// =====================
// 슬라이더 초기화
// =====================

// 공지사항 슬라이더
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', // 세로 방향 슬라이더
  autoplay: true, // 자동 재생
  loop: true // 무한 반복
});

// 프로모션 슬라이더
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, // 한 번에 3개 슬라이드 표시
  spaceBetween: 10, // 슬라이드 간격
  centeredSlides: true, // 현재 슬라이드 가운데 정렬
  autoplay: {
    delay: 5000 // 5초마다 슬라이드 변경
  },
  loop: true, // 무한 반복
  pagination: { // 페이지 네비게이션
    el: '.promotion .swiper-pagination', // 페이지 버튼 위치
    clickable: true // 버튼 클릭 가능
  },
  navigation: { // 좌우 네비게이션 버튼
    prevEl: '.promotion .swiper-prev', // 이전 버튼
    nextEl: '.promotion .swiper-next' // 다음 버튼
  }
});

// 수상 내역 슬라이더
new Swiper('.awards .swiper-container', {
  autoplay: true, // 자동 재생
  loop: true, // 무한 반복
  spaceBetween: 30, // 슬라이드 간격
  slidesPerView: 5, // 한 번에 5개 슬라이드 표시
  navigation: { // 좌우 네비게이션 버튼
    prevEl: '.awards .swiper-prev', // 이전 버튼
    nextEl: '.awards .swiper-next' // 다음 버튼
  }
});

// =====================
// 프로모션 토글 버튼
// =====================

// 프로모션 영역 선택
const promotionEl = document.querySelector('.promotion');
// 프로모션 토글 버튼 선택
const promotionToggleBtn = document.querySelector('.toggle-promotion');
// 프로모션 상태 저장 변수
let isHidePromotion = false;

// 프로모션 토글 버튼 클릭 시 동작
promotionToggleBtn.addEventListener('click', function() {
  isHidePromotion = !isHidePromotion; // 상태 반전
  if (isHidePromotion) { // 숨김 상태
    promotionEl.classList.add('hide'); // 'hide' 클래스 추가
  } else { // 표시 상태
    promotionEl.classList.remove('hide'); // 'hide' 클래스 제거
  }
});


// =====================
// Products
// =====================


async function searchBooks() {
  const query = document.getElementById('query').value; // 사용자가 입력한 검색어 가져오기
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = ''; // 기존 결과 초기화

  try {
    const response = await fetch('http://43.203.22.130:8000/search', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    // **검색 결과를 로컬 스토리지에 저장**
    localStorage.setItem('searchResults', JSON.stringify(data)); // 검색 결과 저장
    localStorage.setItem('searchQuery', query); // 검색어 저장

    // **검색 결과에서 랜덤으로 6개의 항목을 선택**
    const randomBooks = data.sort(() => 0.5 - Math.random()).slice(0, 6);

    // 검색 결과를 화면에 렌더링
    randomBooks.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.className = 'book';
      bookElement.onclick = async () => {
        try {
          const detailResponse = await fetch('http://43.203.22.130:8000/bookinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_id: book.book_id }),
          });

          if (!detailResponse.ok) {
            throw new Error('Failed to fetch book details');
          }

          const bookDetail = await detailResponse.json();
          localStorage.setItem('bookDetail', JSON.stringify(bookDetail)); // 상세 정보 저장
          window.location.href = 'bookinfo.html'; // 상세 페이지로 이동
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      };

      const truncatedTitle = truncateText(book.title, 18); // 제목 제한
      const truncatedAuthor = truncateText(book.author, 18); // 저자 이름 제한


      bookElement.innerHTML = /* html */`
      <a href="#" class="product">
        <img src="${book.image}" width="200">
        <div class="product-name">${truncatedTitle}</div>
        <div class="product-name">${truncatedAuthor}</div>
        <div class="product-price">${book.price}원</div>
      </a>
      `;


      resultsContainer.appendChild(bookElement);
    });
  } catch (error) {
    resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
  }
}

window.onload = function () {
  // 로컬 스토리지에서 검색어와 결과를 가져옴
  const savedResults = JSON.parse(localStorage.getItem('searchResults'));
  const query = localStorage.getItem('searchQuery');

  if (savedResults && query) {
    document.getElementById('query').value = query; // 검색어 복원
    const resultsContainer = document.getElementById('results');

    // **로컬 스토리지에 저장된 결과에서 랜덤 6개만 선택**
    const randomBooks = savedResults.sort(() => 0.5 - Math.random()).slice(0, 6);

    randomBooks.forEach(book => {
      const bookElement = document.createElement('div');
      bookElement.className = 'book';
      bookElement.onclick = async () => {
        try {
          const detailResponse = await fetch('http://43.203.22.130:8000/bookinfo', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ book_id: book.book_id }),
          });

          if (!detailResponse.ok) {
            throw new Error('Failed to fetch book details');
          }

          const bookDetail = await detailResponse.json();
          localStorage.setItem('bookDetail', JSON.stringify(bookDetail));
          window.location.href = 'bookinfo.html';
        } catch (error) {
          alert(`Error: ${error.message}`);
        }
      };

      bookElement.innerHTML = `
        <img src="${book.image}" alt="${book.title}">
        <div class="book-details">
          <h3>${book.title}</h3>
          <p><strong>Author:</strong> ${book.author}</p>
          <p><strong>Publisher:</strong> ${book.publisher}</p>
          <p><strong>Price:</strong> ${book.price}원</p>
          <p><strong>Genre:</strong> ${book.genre}</p>
          <p><strong>ISBN:</strong> ${book.isbn}</p>
        </div>
      `;

      resultsContainer.appendChild(bookElement);
    });
  }
};

// 페이지 로드시 자동 호출
document.addEventListener('DOMContentLoaded', () => {
  searchBooks(); // 초기 검색 함수 호출
});

// 텍스트 길이를 제한하는 함수
const truncateText = (text, maxLength) => {
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
};

