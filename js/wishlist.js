var check = false;

// 상품의 수량(qt) 또는 가격(price)이 변경되었을 때, 이를 반영하여 총 가격(full-price)을 계산하는 함수
function changeVal(el) {
  var qt = parseFloat(el.parent().children(".qt").html()); // 상품의 수량을 가져옴
  var price = parseFloat(el.parent().children(".price").html()); // 상품의 가격을 가져옴
  var eq = Math.round(price * qt * 100) / 100; // 가격 * 수량 계산 후 소수점 두 자리까지 반올림
  
  el.parent().children(".full-price").html(eq + "€"); // 계산된 총 가격을 표시
  
  changeTotal(); // 전체 금액을 업데이트
}

// 전체 금액, 세금, 배송비를 합산하여 총합(total)을 업데이트하는 함수
function changeTotal() {
  var price = 0;
  
  // 각 상품의 full-price를 합산하여 전체 가격을 계산
  $(".full-price").each(function(index) {
    price += parseFloat($(".full-price").eq(index).html());
  });
  
  price = Math.round(price * 100) / 100; // 소수점 두 자리까지 반올림
  var tax = Math.round(price * 0.05 * 100) / 100; // 세금(5%) 계산
  var shipping = parseFloat($(".shipping span").html()); // 배송비 가져오기
  var fullPrice = Math.round((price + tax + shipping) * 100) / 100; // 최종 금액 계산
  
  if (price == 0) { // 상품 가격이 0이면 총합도 0으로 설정
    fullPrice = 0;
  }
  
  $(".subtotal span").html(price); // 소계 표시
  $(".tax span").html(tax); // 세금 표시
  $(".total span").html(fullPrice); // 최종 금액 표시
}

// 문서가 준비되면 실행
$(document).ready(function() {
  
  // "삭제" 버튼 클릭 시 상품을 제거하는 기능
  $(".remove").click(function() {
    var el = $(this); // 클릭한 삭제 버튼을 참조
    el.parent().parent().addClass("removed"); // 삭제 애니메이션 효과를 위한 클래스 추가
    window.setTimeout(
      function() {
        el.parent().parent().slideUp('fast', function() { // 애니메이션 완료 후 상품 제거
          el.parent().parent().remove(); 
          if ($(".product").length == 0) { // 남은 상품이 없으면 메시지 표시
            if (check) {
              $("#cart").html("<h1>The shop does not function, yet!</h1><p>If you liked my shopping cart, please take a second and heart this Pen on <a href='https://codepen.io/ziga-miklic/pen/xhpob'>CodePen</a>. Thank you!</p>");
            } else {
              $("#cart").html("<h1>No products!</h1>");
            }
          }
          changeTotal(); // 전체 금액 업데이트
        });
      }, 200);
  });
  
  // "수량 증가" 버튼 클릭 시 수량을 1 증가시키는 기능
  $(".qt-plus").click(function() {
    $(this).parent().children(".qt").html(parseInt($(this).parent().children(".qt").html()) + 1); // 수량 증가
    
    $(this).parent().children(".full-price").addClass("added"); // 추가 애니메이션 효과
    
    var el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("added"); // 애니메이션 효과 제거
      changeVal(el); // 새로운 수량에 따라 총 가격 업데이트
    }, 150);
  });
  
  // "수량 감소" 버튼 클릭 시 수량을 1 감소시키는 기능
  $(".qt-minus").click(function() {
    var child = $(this).parent().children(".qt"); // 수량 요소 참조
    
    if (parseInt(child.html()) > 1) { // 수량이 1 이상인 경우에만 감소
      child.html(parseInt(child.html()) - 1);
    }
    
    $(this).parent().children(".full-price").addClass("minused"); // 감소 애니메이션 효과
    
    var el = $(this);
    window.setTimeout(function() {
      el.parent().children(".full-price").removeClass("minused"); // 애니메이션 효과 제거
      changeVal(el); // 새로운 수량에 따라 총 가격 업데이트
    }, 150);
  });
  
  // 페이지 로드 후 1.2초 후에 is-open 클래스를 제거
  window.setTimeout(function() {
    $(".is-open").removeClass("is-open");
  }, 1200);
  
  // "구매 완료" 버튼 클릭 시 모든 상품을 제거하는 기능
  $(".btn").click(function() {
    check = true; // 체크 상태를 true로 설정
    $(".remove").click(); // 모든 상품의 "삭제" 버튼을 클릭
  });
});


