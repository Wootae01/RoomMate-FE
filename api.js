//공지사항 api 요청
fetch('http://localhost:8080/home/notice') // API URL
    .then(response => response.json()) // JSON 데이터로 파싱
    .then(notices => {
        const noticeList = document.getElementById('notice-list');

        notices.forEach(notice => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.textContent = notice; // 공지 제목
            link.href = `noticeDetail.html?id=${notice}`; // URL에 공지 ID 전달
            listItem.appendChild(link);
            noticeList.appendChild(listItem);
        });
    })
    .catch(error => {
        console.error('Error fetching notices:', error);
    });

//날씨 api 요청
fetch('http://localhost:8080/home/weather')
    .then(response =>{
        if(!response.ok){
            throw new Error(`Http error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data=>{
        displayWeather(data);
    })

//추천 rank
fetch('http://localhost:8080/home/rank/user1')
    .then(response => {
        if (!response.ok) {
            throw new Error(`Http error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(ranks => {
        const rankList = document.getElementById('rank-list');
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


function displayWeather(weatherData){
    const weatherToday = document.getElementById('weather-today');

    const skyStatus = {
        1: "맑음",
        3: "구름많음",
        4: "흐림"
    };
    
    const ptyStatus = {
        0: "없음",
        1: "비",
        2: "비/눈",
        3: "눈",
        4: "소나기"
    };
    const weatherHTML = `
        <p><strong>기온:</strong> ${weatherData.tmp}°C</p>
        <p><strong>하늘 상태:</strong> ${skyStatus[weatherData.sky]}</p>
        <p><strong>강수 형태:</strong> ${ptyStatus[weatherData.pty]}</p>
    `;

    weatherToday.innerHTML = weatherHTML;
}

