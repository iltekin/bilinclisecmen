const api = "https://count.bilinclisecmen.com:5001";

const quizLimit = 10; // default: 10
const answerTime = 15; //default: 15

// Evet cevaplar görünüyor çünkü ben görünmesini tercih ettim. Teşekkür ederim.

const quizData = [
    {
        question: "Demokratik bir hukuk devletinde ülke ekonomisinin idare ve sorumluluğu hangisindedir?",
        a: "Ana muhalefet partisi",
        b: "Hükümet",
        c: "Halk",
        d: "Belediye Başkanı",
        correct: "b",
    },
    {
        question: "Anayasamızın 101. maddesine göre bir kişi en fazla kaç defa Cumhurbaşkanı olabilir?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "b",
    },
    {
        question: "Türkiye Cumhuriyeti'nin ilk Cumhurbaşkanı kimdir?",
        a: "İsmet İnönü",
        b: "Celal Bayar",
        c: "Mustafa Kemal Atatürk",
        d: "Recep Tayyip Erdoğan",
        correct: "c",
    },
    {
        question: "1999 yılında geçici olarak çıkarılan fakat 2005 yılında kalıcı hale getirilen Özel İletişim Vergisi halktan hangi amaçla alınmaya başlanmıştır?",
        a: "Yol ve köprü yapmak",
        b: "Uçak satın almak",
        c: "Depremin yol açtığı ekonomik kayıpları gidermek",
        d: "Mülteciler için harcamak",
        correct: "c",
    },
    {
        question: "Dünya üzerindeki rezervlerin %73'üne sahip olduğumuz maden hangisidir?",
        a: "Kömür",
        b: "Altın",
        c: "Jelibon",
        d: "Bor",
        correct: "d",
    },
    {
        question: "Hangisi halk tarafından seçilir?",
        a: "Büyükşehir Belediye Başkanı",
        b: "İçişleri Bakanı",
        c: "Vali",
        d: "Kızılay Başkanı",
        correct: "a",
    },
    {
        question: "Aşağıdakilerden hangisi 2018’de çıkarılan imar affıyla yapı kayıt belgesi verilen kaçak yapıların bulunduğu illerden biridir?",
        a: "Gaziantep",
        b: "Hatay",
        c: "Adıyaman",
        d: "Hepsi",
        correct: "d",
    },
    {
        question: "Türkiye'den 400.000 ABD doları değerinde bir konut satın almış olan bir yabancıya Türk vatandaşlığı verilmesi için gereken ek şart aşağıdakilerden hangisidir?",
        a: "Türkiye'de 5 yıl ikamet etmiş olmak",
        b: "Türkçe bilmek",
        c: "Türkiye'nin tarihi ve kültürü hakkında bilgi sahibi olmak",
        d: "Hiçbiri",
        correct: "d",
    },
    {
        question: "Hangisi Türkiye'nin komşusu değildir?",
        a: "İran",
        b: "Gürcistan",
        c: "Katar",
        d: "Suriye",
        correct: "c",
    },
    {
        question: "Umuma mahsus pasaporta sahip bir Türk vatandaşı aşağıdaki ülkelerden hangisine vizesiz girebilmektedir?",
        a: "Gana",
        b: "Gine",
        c: "Zimbabve",
        d: "Hiçbiri",
        correct: "d",
    }
];