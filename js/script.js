const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const screenWidth = screen.width;
let testerName = "";
let start = "";
let totalTime = "";
let tried = localStorage.getItem('tried') || 1;
const today = formatDate(new Date());
const downloadBtn = document.getElementById('download-btn');

const image = new Image();
image.src = 'image/certificate.png?v=25';

if(CSS.registerProperty !== undefined){
    CSS.registerProperty({
        name: "--p",
        syntax: "<integer>",
        initialValue: 0,
        inherits: true,
    });
    document.getElementById("certPercent").style.display = "block";
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        padTo2Digits(date.getDate()),
        padTo2Digits(date.getMonth() + 1),
        date.getFullYear(),
    ].join('.');
}

function toNameCase(str) {

    try {
        return str.split(' ')
            .map(w => w[0].toLocaleUpperCase('tr-TR') + w.substring(1).toLocaleLowerCase('tr-TR'))
            .join(' ');
    } catch (e) {
        return str
    }

}

window.addEventListener('load', function() {

    WebFont.load({
        google: {
            families: ['Parisienne:400:latin-ext', 'Roboto Mono', 'Recursive']
        }
    });

    const certificateContainer = document.getElementById('certificateContainer');
    if(screenWidth < 720){
        certificateContainer.style.zoom = screenWidth / 1920 / 1.13;
    } else {
        certificateContainer.style.zoom = screenWidth / 1920 / 2;
    }
    document.getElementById("timeLeft").innerText = totalAnswerTime;
    document.getElementById("qLimit").innerText = quizLimit.toString();

    getHitNumber();
})

function createDots() {
    let dots = "";
    for(i=0; i<tried; i++) {
        dots += "."
    }
    return dots;
}

function increaseTried() {
    tried++;
    localStorage.setItem('tried', tried);
}

function drawImage(name, date, certificateNumber, totalTime) {

    theName = toNameCase(name);

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    let countChars = theName.length;
    if(countChars <= 15){
        ctx.font = '150px Parisienne';
    } else {
        actualFontSize = 150 - (countChars - 15) * 7;
        ctx.font = actualFontSize + 'px Parisienne';
    }

    ctx.fillStyle = '#B4252E';
    ctx.textAlign = "center";
    ctx.fillText(theName, 950, 720);

    ctx.font = '40px Roboto Mono';
    ctx.fillText(date, 505, 1050);
    ctx.fillText(certificateNumber, 1440, 1050);
    
    ctx.font = '80px Recursive';
    ctx.fillStyle = '#FFFFFF';
    ctx.fillText(createDots(), 960, 25);

    ctx.fillStyle = '#B4252E';
    ctx.font = '31px Recursive';
    ctx.fillText(totalTime, 725, 564);

    document.getElementById("qc").style.display = "none";
    document.getElementById("loader").style.display = "block";

    let keyboard = new Audio("sound/keyboard.mp3");
    keyboard.play();

    // Tek sertifika ise...
    document.getElementById("creating-certificates-message").textContent = "SERTİFİKA OLUŞTURULUYOR...";
    const mainContainer = document.getElementById('main_container');
    if(screenWidth > 720){
        mainContainer.style.paddingTop = "5vw";
    }

    setTimeout(function() {

        document.getElementById("sertifika_img").src = canvas.toDataURL('image/png');
        document.getElementById("certificate-1").style.display = "block";

        document.getElementById("loader").style.display = "none";
        document.getElementById("certificateImageContainer").style.display = "flex";
        let created = new Audio("sound/created.mp3");
        created.play();
    }, 9500);
}

downloadBtn.addEventListener('click', function () {
    downloadBtn.href = canvas.toDataURL('image/png');
    downloadBtn.download = "sertifika-" + testerName + ".png";
});

function clearLiHighlights(){
    document.querySelectorAll('.selectedAnswer').forEach(item => {
        item.classList.remove("selectedAnswer");
    });
}

document.querySelectorAll('li').forEach(item => {
    item.onclick =  function() {
        playNow("select");
        clearLiHighlights();
        item.classList.add("selectedAnswer");
        item.children[0].checked = true;
    }
});


function createProgressbar(id, duration, callback) {
    // We select the div that we want to turn into a progressbar
    let progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';

    // We create the div that changes width to show progress
    let progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';

    // Now we set the animation parameters
    progressbarinner.style.animationDuration = duration;

    // Eventually couple a callback
    if (typeof(callback) === 'function') {
        progressbarinner.addEventListener('animationend', callback);
    }

    // Append the progressbar to the main progressbardiv
    progressbar.appendChild(progressbarinner);

    // When everything is set up we start the animation
    progressbarinner.style.animationPlayState = 'running';
}

const welcomeMessage = document.getElementById("welcome-message");
const quizElement = document.getElementById("quiz");
const startButton = document.getElementById("start");
const timeLeft = document.getElementById("timeLeft");
const questionInfo = {};
let counter;

questionInfo.parent = document.getElementById("questionInfo");
questionInfo.qNumber = document.getElementById("qNumber");
questionInfo.qLimit = document.getElementById("qLimit");

const afterTime = function() {
    increaseTried();
    playNow("failed");
    quiz.innerHTML = `
                <div id="result">
                <h2>Maalesef...</h2>
                <div class="result-inner">
                    Belirlenen süre içinde soruyu cevaplayamadınız. Bu yüzden test sona erdi.
                </div>
                </div><button class="red-gradient" onclick="location.reload()">Yeniden Dene</button>
           `
};

function startTime(){
    stopTime();
    createProgressbar('time-progressbar', totalAnswerTime + 's', afterTime);
}

function stopTime(){
    let bar = document.getElementById("time-progressbar");
    bar.removeEventListener("animationend", afterTime, true);
    bar.innerHTML = "";
}

document.getElementById("info").addEventListener('click', function () {
    this.classList.toggle("open");
    document.getElementById("menuContents").classList.toggle("hideThis");
    document.getElementById("questionMark").classList.toggle("hideThis");
    document.getElementById("closeIcon").classList.toggle("hideThis");
})

startButton.addEventListener('click', function () {
    welcomeMessage.style.display = "none";
    quizElement.style.display = "block";

    loadQuiz();
    startTime();
    counter = setInterval(timer, 1000);
    start = new Date();

    getHitNumber(true);

})

function getHitNumber(add = false) {
    let xhr = new XMLHttpRequest();
    if(add){
        xhr.open("GET", api + "/incr/start");
    } else {
        xhr.open("GET", api + "/get/start");
    }
    xhr.responseType = "json";
    xhr.onload = function() {
        document.getElementById("hits").innerText = String(numberWithCommas(this.response.value));
        appendTotalCertificateNumber(this.response.value);
    }
    xhr.send();
}

function getHitNumberDev(add = false) {
    document.getElementById("hits").innerText = String(numberWithCommas(356));
    appendTotalCertificateNumber(356);
}

function appendTotalCertificateNumberDev(hitNumber) {
    document.getElementById("certificates").innerText = String(numberWithCommas(356));
    let percentage = (100 * 356) / hitNumber;
    document.getElementById("success_percent").innerText = "%" + String(Math.floor(percentage));
    document.getElementById("success_rate").style.display = "block";
}

function getCertificateNumberDev(name) {
    let certificateNumber = String(356).padStart(8, "0");
    drawImage(name, today, certificateNumber, totalTime);
    getHitNumber();
}

function appendTotalCertificateNumber(hitNumber) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api + "/get/success");
    xhr.responseType = "json";
    xhr.onload = function() {
        document.getElementById("certificates").innerText = String(numberWithCommas(this.response.value));

        let percentage = (100 * this.response.value) / hitNumber;
        document.getElementById("success_percent").innerText = "%" + String(Math.floor(percentage));
        document.getElementById("success_rate").style.display = "block";
    }
    xhr.send();
}

function getCertificateNumber(name) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", api + "/incr/success");
    xhr.responseType = "json";
    xhr.onload = function() {
        let certificateNumber = String(this.response.value).padStart(8, "0");
        drawImage(name, today, certificateNumber, totalTime);
        getHitNumber();
    }
    xhr.send();
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex !== 0) {

        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }

    return array;
}

shuffle(quizData);

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const prefix = document.getElementById('prefix')
const sender = document.getElementById('sender')
const sources = document.getElementById('sources')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0
let totalAnswerTime = quizLimit * answerTime;

function createSourceLink(URL, number) {
    var a = document.createElement('a');
    var linkText = document.createTextNode("[" + number + "]");
    a.appendChild(linkText);
    a.target = "_blank";
    a.href = URL;
    return a;
}

function loadQuiz() {
    deselectAnswers()

    const currentQuizData = quizData[currentQuiz]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d

    if(currentQuizData.sender){
        sender.innerText = "Gönderen: " + currentQuizData.sender;
    } else {
        sender.innerText = "";
    }

    if(currentQuizData.sources){

        if(currentQuizData.sources.length > 1){
            sources.innerText = "Kaynaklar: ";
        } else {
            sources.innerText = "Kaynak: ";
        }

        for (let i = 0; i < currentQuizData.sources.length; i++) {
            if(i !== currentQuizData.sources.length - 1){
                sources.appendChild(createSourceLink(currentQuizData.sources[i], i + 1));
                sources.appendChild(document.createTextNode(", "));
            } else {
                sources.appendChild(createSourceLink(currentQuizData.sources[i], i + 1));
            }
        }
    } else {
        sources.innerText = "";
    }

    if(currentQuizData.prefix){
        prefix.innerText = currentQuizData.prefix;
    } else {
        prefix.innerText = "";
    }

    questionInfo.qNumber.innerText = (currentQuiz + +1).toString();
    questionInfo.qLimit.innerText = quizLimit.toString();
}

function timer(){
    totalAnswerTime = totalAnswerTime-1;
    if (totalAnswerTime < 0){
        clearInterval(counter);
        return;
    }
    timeLeft.innerText = totalAnswerTime;
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
    let answer

    answerEls.forEach(answerEl => {
        if(answerEl.checked) {
            answer = answerEl.id
        }
    })

    return answer
}

function playNow(sound) {
    let audio = document.getElementById(sound);
    audio.play();
}

function getName() {
    let nameInput = document.getElementById("name");
    let nameValue = nameInput.value;
    testerName = nameInput.value;

    if(nameValue === "" || nameValue === undefined){
        nameInput.placeholder = "Buraya adınızı yazmalısınız";
        playNow("invalid");
    } else {
      getCertificateNumber(nameValue, false)
    }
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected()
    if(answer) {
        let widthInPercent = currentQuiz * (100/quizLimit) + (100/quizLimit);
        document.getElementById("progress-bar").style.width = widthInPercent + "%";
        if(answer === quizData[currentQuiz].correct) {
            score++
        }

        currentQuiz++

        if(currentQuiz < quizLimit) {
            loadQuiz();
            clearLiHighlights();
            playNow("next");
        } else {

            clearInterval(counter);
            let endDate = new Date();
            totalTime = Math.floor((endDate.getTime() - start.getTime()) / 1000);

            stopTime();
            if(score < quizLimit){
                increaseTried();
                playNow("failed");
                quiz.innerHTML = `
                <div id="result">
                <h2>Maalesef...</h2>
                <div class="result-inner">
                    ${quizLimit} sorunun ${score} tanesini doğru cevapladınız.</br></br> Yeniden denemek ister misiniz?
                </div>
                </div>
                <div class="failed-buttons-container">
                <button class="try-again-button_IPTAL red-gradient failed-screen-double-button_IPTAL" onclick="location.reload()">Yeniden Dene</button><button class="green-gradient failed-screen-double-button" style="display: none" onclick="getName(true)">Anıt Zeytin Ağacı Farkındalık Sertifikamı Oluştur</button>
                </div>
           `
            } else {
                let tada = new Audio("sound/tada.mp3");
                tada.play();
                quiz.innerHTML = `
                <div id="result">
                <h2>Tebrikler!</h2>
                <div class="result-inner">
                    <p>
                    ${quizLimit} sorunun tamamını doğru cevaplayarak Bilinçli Seçmen Sertifikası kazandınız. 
                    </p>
                    <input type="text" id="name" name="name" placeholder="Ad Soyad">
                </div>
                </div>
                <button class="red-gradient" onclick="getName()">Sertifikamı Oluştur</button>
            `
            }
        }
    } else {
        playNow("invalid");
    }
})