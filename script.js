const star_signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
const controller = new AbortController();
let user_sign = "";

function createRandomMessage(starSign) {
    const messageOptions = {
        luckyNum: Math.floor(Math.random() * 100),
        getLuckyNumber() { return this.luckyNum; },
        day: ['fortuitous', 'unlucky', 'fruitful', 'chaotic', 'unpredictable', 'challenging', 'rewarding'],
        getDay() { return this.day[Math.floor(Math.random() * this.day.length)]; },
        improvement: ['improvements', 'no change', 'a decline'],
        getImprovement() { return this.improvement[Math.floor(Math.random() * this.improvement.length)]; },
        aspect: ['romantic life', 'financial status', 'family life', 'sexual health', 'mental health', 'occupational environment'],
        getAspect() { return this.aspect[Math.floor(Math.random() * this.aspect.length)]; }
    };

    const h2 = document.createElement('h2');
    h2.textContent = `${starSign}'s Daily Horoscope`;

    const ul = document.createElement('ul');
    const dailyMessage = document.createElement('li');
    dailyMessage.textContent = `Daily Message: You will have a ${messageOptions.getDay()} day today.`;

    const prospects = document.createElement('li');
    prospects.textContent = `Future Prospects: You will see ${messageOptions.getImprovement()} in your ${messageOptions.getAspect()}.`;

    const luckyNumber = document.createElement('li');
    luckyNumber.textContent = `Lucky Number: Your lucky number today is ${messageOptions.getLuckyNumber()}.`;

    ul.append(dailyMessage, prospects, luckyNumber);
    const horoscopeSection = document.getElementById('horoscope');
    horoscopeSection.innerHTML = ''; // Clear previous content
    horoscopeSection.append(h2, ul);
}

star_signs.forEach((sign) => {
    const elem = document.getElementById(sign.toLowerCase());
    elem.addEventListener('click', () => {
        user_sign = sign;
        document.getElementById('centered-content').style.display = 'none';
        document.getElementById('horoscope').style.display = 'block';
        createRandomMessage(sign);
        controller.abort();
    }, { signal: controller.signal });
});
