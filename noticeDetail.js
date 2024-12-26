// noticeDetail.js
// URL의 공지사항 ID 추출
const urlParams = new URLSearchParams(window.location.search);
const noticeId = urlParams.get('id');

// 공지사항 세부 정보를 로드
fetch(`http://localhost:8080/home/notice/${noticeId}`)
    .then(response => response.json())
    .then(detail => {
        const noticeDetailContainer = document.getElementById('notice-detail');
        // HTML 태그를 그대로 출력
        noticeDetailContainer.innerHTML = detail.content; // 응답의 HTML 구조가 파싱되어 렌더링됨
    })
    .catch(error => {
        console.error('Error fetching notice detail:', error);
    });

