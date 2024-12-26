// 추천 목록 API 요청
document.addEventListener("DOMContentLoaded", () => {
    fetch('http://localhost:8080/recommendation/list/user1')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Http error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(ranks => {
            const rankList = document.getElementById('recommendation-list');
            if (!rankList) {
                console.error("Element with id 'recommendation-list' not found.");
                return;
            }

            ranks.forEach(rank => {
                const listItem = document.createElement('li');

                // Left side: 닉네임, 나이, 점수
                const infoDiv = document.createElement('div');
                infoDiv.innerHTML = `
                    <span class="nickname">${rank.nickname}</span>
                    <span>${rank.age}살</span>
                    <span>${rank.score}점</span>
                `;

                // Right side: 채팅 버튼
                const button = document.createElement('button');
                button.textContent = "💬 채팅";
                button.classList.add('button');

                // Add items to list item
                listItem.appendChild(infoDiv);
                listItem.appendChild(button);

                rankList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching recommendation ranks:', error);
        });
});