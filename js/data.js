const api = "https://count.bilinclisecmen.com:5001";
const quizLimit = 1; // default: 10
const answerTime = 15; //default: 15

// Bu dosyayı keşfedip sosyal medyada paylaşan kişi aşağıdakilerden hangisidir?
// a: "HAckEr",
// b: "HAckEr",
// c: "HAckEr",
// d: "HAckEr",

const quizData = [
    {
        question: "Demokratik bir hukuk devletinde ülke ekonomisinin idare ve sorumluluğu hangisindedir?",
        a: "Ana muhalefet partisi",
        b: "Hükümet",
        c: "Halk",
        d: "Belediye Başkanı",
        correct: "b",
        sources: [
            "https://twitter.com/mustafabalbay/status/1106257423260618753",
        ],
    },
    {
        question: "Anayasamızın 101. maddesine göre bir kişi en fazla kaç defa Cumhurbaşkanı olabilir?",
        a: "1",
        b: "2",
        c: "3",
        d: "4",
        correct: "b",
        sources: [
            "https://www5.tbmm.gov.tr/anayasa/anayasa_2018.pdf",
        ],
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
        sources: [
            "https://tr.wikipedia.org/wiki/%C3%96zel_%C4%B0leti%C5%9Fim_Vergisi",
        ],
    },
    {
        question: "Dünya üzerindeki rezervlerin %73'üne sahip olduğumuz maden hangisidir?",
        a: "Kömür",
        b: "Altın",
        c: "Jelibon",
        d: "Bor",
        correct: "d",
        sources: [
            "https://interaktif.trthaber.com/2019/bor/",
        ],
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
        sources: [
            "https://www.sozcu.com.tr/2023/ekonomi/depremin-vurdugu-10-ildeki-imar-affi-bilancosu-ortaya-cikti-7588286/",
        ],
    },
    {
        question: "Türkiye'den 400.000 ABD doları değerinde bir konut satın almış olan bir yabancıya Türk vatandaşlığı verilmesi için gereken ek şart aşağıdakilerden hangisidir?",
        a: "Türkiye'de 5 yıl ikamet etmiş olmak",
        b: "Türkçe bilmek",
        c: "Türkiye'nin tarihi ve kültürü hakkında bilgi sahibi olmak",
        d: "Hiçbiri",
        correct: "d",
        sources: [
            "https://www.invest.gov.tr/en/investmentguide/pages/acquiring-property-and-citizenship.aspx",
        ],
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
        sources: [
            "https://www.mfa.gov.tr/gana-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa",
            "https://www.mfa.gov.tr/gine-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa",
            "https://www.mfa.gov.tr/zimbabve-seyahat-edecek-turk-vatandaslarinin-dikkatine.tr.mfa",
        ],
    }
];