
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

// 검색 결과를 화면에 렌더링
data.forEach(book => {
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

} catch (error) {
resultsContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
}
}

window.onload = function() {
// 로컬 스토리지에서 검색어와 결과를 가져옴
const savedResults = JSON.parse(localStorage.getItem('searchResults'));
const query = localStorage.getItem('searchQuery');

if (savedResults && query) {
  document.getElementById('query').value = query; // 검색어 복원
  const resultsContainer = document.getElementById('results');

  savedResults.forEach(book => {
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