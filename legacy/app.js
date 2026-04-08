// Global Meeting Calculator Logic

const cityGrid = document.getElementById('city-grid');
const timeSlider = document.getElementById('time-slider');
const refTimeDisplay = document.getElementById('current-reference-time');
const resetBtn = document.getElementById('reset-time-btn');
const citySearchInput = document.getElementById('city-search');
const addCityBtn = document.getElementById('add-city-btn');

// Default cities to show
let cities = [
    { name: 'Seoul', timezone: 'Asia/Seoul', country: 'South Korea' },
    { name: 'London', timezone: 'Europe/London', country: 'United Kingdom' },
    { name: 'New York', timezone: 'America/New_York', country: 'United States' },
    { name: 'Singapore', timezone: 'Asia/Singapore', country: 'Singapore' }
];

let baseDate = new Date(); // Today's date

// Initialize
function init() {
    // Set slider to current time (minutes since midnight)
    const currentMinutes = baseDate.getHours() * 60 + baseDate.getMinutes();
    timeSlider.value = currentMinutes;
    
    updateAllTimes();
    renderCities();
    
    // Event Listeners
    timeSlider.addEventListener('input', () => {
        updateAllTimes();
        renderCities();
    });
    
    resetBtn.addEventListener('click', () => {
        baseDate = new Date();
        const nowMinutes = baseDate.getHours() * 60 + baseDate.getMinutes();
        timeSlider.value = nowMinutes;
        updateAllTimes();
        renderCities();
    });

    addCityBtn.addEventListener('click', () => {
        const cityName = citySearchInput.value.trim();
        if (cityName) {
            // In a real app, we'd fetch timezone info. For now, we'll try to find it or default.
            // Simplified for demo:
            addCity(cityName);
            citySearchInput.value = '';
        }
    });

    // Tag buttons
    document.querySelectorAll('.tag').forEach(tag => {
        tag.addEventListener('click', () => {
            const cityName = tag.getAttribute('data-city');
            addCity(cityName);
        });
    });
}

function updateAllTimes() {
    const minutes = parseInt(timeSlider.value);
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    
    baseDate.setHours(h);
    baseDate.setMinutes(m);
    
    const options = { 
        year: 'numeric', month: '2-digit', day: '2-digit', 
        hour: '2-digit', minute: '2-digit', hour12: true,
        timeZoneName: 'short'
    };
    refTimeDisplay.textContent = baseDate.toLocaleString('ko-KR', options);
}

function renderCities() {
    cityGrid.innerHTML = '';
    cities.forEach((city, index) => {
        const card = createCityCard(city, index);
        cityGrid.appendChild(card);
    });
}

function createCityCard(city, index) {
    const timeString = baseDate.toLocaleTimeString('en-US', {
        timeZone: city.timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
    
    const dateString = baseDate.toLocaleDateString('ko-KR', {
        timeZone: city.timezone,
        month: 'long',
        day: 'numeric',
        weekday: 'short'
    });

    const [time, ampm] = timeString.split(' ');
    
    // Determine status
    const hour24 = parseInt(new Intl.DateTimeFormat('en-GB', {
        timeZone: city.timezone,
        hour: 'numeric',
        hour12: false
    }).format(baseDate));

    let status = 'Working';
    let statusClass = 'working';
    
    if (hour24 >= 9 && hour24 < 18) {
        status = '온계 근무 중';
        statusClass = 'working';
    } else if (hour24 >= 0 && hour24 < 7) {
        status = '취침 중';
        statusClass = 'sleeping';
    } else if (hour24 >= 18 && hour24 < 22) {
        status = '개인 시간';
        statusClass = 'sleeping';
    } else {
        status = '준비 중';
        statusClass = 'sleeping';
    }

    const div = document.createElement('div');
    div.className = 'city-card';
    div.style.animationDelay = `${index * 0.1}s`;
    
    div.innerHTML = `
        <button class="remove-btn" onclick="removeCity(${index})">×</button>
        <div class="card-header">
            <div class="city-info">
                <h2>${city.name}</h2>
                <p class="country-name">${city.country}</p>
            </div>
            <span class="status-badge ${statusClass}">${status}</span>
        </div>
        <div class="time-display">
            <span class="current-time">${time}</span>
            <span class="ampm">${ampm}</span>
        </div>
        <div class="date-display">${dateString}</div>
        <div class="footer-info">
            <span>${city.timezone}</span>
            <span>${hour24}:00</span>
        </div>
    `;
    return div;
}

window.removeCity = function(index) {
    cities.splice(index, 1);
    renderCities();
};

function addCity(name) {
    // Map demo names to timezones
    const map = {
        'Seoul': { name: '서울 (Seoul)', timezone: 'Asia/Seoul', country: 'KR' },
        'London': { name: '런던 (London)', timezone: 'Europe/London', country: 'UK' },
        'New York': { name: '뉴욕 (New York)', timezone: 'America/New_York', country: 'USA' },
        'Singapore': { name: '싱가포르 (Singapore)', timezone: 'Asia/Singapore', country: 'SG' },
        'Tokyo': { name: '도쿄 (Tokyo)', timezone: 'Asia/Tokyo', country: 'JP' },
        'Paris': { name: '파리 (Paris)', timezone: 'Europe/Paris', country: 'FR' },
        'Sydney': { name: '시드니 (Sydney)', timezone: 'Australia/Sydney', country: 'AU' }
    };

    const found = map[name] || { name: name, timezone: 'UTC', country: 'Global' };
    
    // Check if already exists
    if (!cities.find(c => c.timezone === found.timezone)) {
        cities.push(found);
        renderCities();
    }
}

init();
