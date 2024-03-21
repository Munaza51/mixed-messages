const star_signs = ['Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn','Aquarius','Pisces'];

const controller = new AbortController();

// Keeps track of the user's star sign
let user_sign = "";

function createRandomMessage(starSign){

    const messageOptions = {
        luckyNum : Math.floor(Math.random() * 100),
        getLuckyNumber(){
            return this.luckyNum;
        },
        day: ['fortuitous', 'unlucky', 'fruitful', 'chaotic', 'unpredictable', 'challenging', 'rewarding'],
        getDay(){
            return this.day[Math.floor(Math.random() * this.day.length)];
        },
        improvement: ['improvements', 'no change', 'a decline'],
        getImprovement(){
            return this.improvement[Math.floor(Math.random() * this.improvement.length)];
        },
        aspect: ['romantic life', 'financial status', 'family life', 'sexual health', 'mental health', 'occupational environment'],
        getAspect(){
            return this.aspect[Math.floor(Math.random() * this.aspect.length)];
        }
    };
    

    let h2 = document.createElement('h2');
    h2.append(`${starSign}'s Daily Horoscope`);
    let ul = document.createElement('ul');
    let dailyMessage = document.createElement('li');
    dailyMessage.append(`Daily Message:\t\tYou will have a ${messageOptions.getDay()} day today.`);
    let prospects = document.createElement('li');
    prospects.append(`Future Prospects:\t\tYou will see ${messageOptions.getImprovement()} in your ${messageOptions.getAspect()}`);
    let luckyNumber = document.createElement('li');
    luckyNumber.append(`Lucky Number:\t\tYour lucky number today is ${messageOptions.getLuckyNumber()}`);

    ul.append(dailyMessage, prospects, luckyNumber);

    document.getElementById('horoscope').append(h2, ul);
}

star_signs.forEach((Sign)=>{
    let sign = Sign.toLowerCase();
    let elem = document.getElementById(sign);
    elem.addEventListener("click", () => {
        user_sign = Sign;
        console.log(Sign);
        document.getElementById("centered-content").style.display = "none";
        document.getElementById("horoscope").style.display = "block";
        createRandomMessage(Sign);
        controller.abort();
    },
    {signal: controller.signal});
});