const totPrice = location.search.substring(1); //query

const payBtns = document.querySelectorAll(".nav-li");
const payPage = document.querySelectorAll(".pays");



const requestCode = document.querySelector("#code-2ver");

const price = document.querySelector("#price");
const currency = document.querySelector("#currency");
const submit = document.querySelector("#pay");

const cardNumber = document.querySelector("#cardNumber");

const closeBtn = document.querySelector("#closeCardNumBtn");

const cardSaves = document.querySelector(".cardSaves");
const savedCards = document.querySelector("#savedCards");

const showSavedCard = document.querySelector("#showSaveCard");

const inputCardNumLogo = document.getElementById("inputCardNumLogo");

const asideCardLogo = document.querySelector("#banks");

const cvv2 = document.getElementById("cvv2");

const exMonth = document.getElementById("exMonth");
const exYear = document.getElementById("exYear");
const exError = document.querySelector(".ex-error");

const cardNumShow = document.querySelector("#cardNumShow");

const cardNumError = document.querySelector(".cardNumError");
const cvv2Error = document.querySelector(".cvv2-Error");

const captchaInput = document.querySelector("#captchaInput");

const phoneNumber = document.querySelector("#userPhone");

const saveCardCheck = document.querySelector(".saveCardCheck");

const secondPassInp = document.querySelector("#passwordInput");

const finalContinueBtn = document.querySelector("#doneContinue");

const forWether = document.getElementById("forWether");



const cancel = document.querySelector("#cancell");

const cardShowMonth = document.querySelector(".month-card-show");
const cardShowYear = document.querySelector(".year-card-show");


const crypToQrCode = document.querySelector("#crypToQrCode")
const walletAddressToShow = document.querySelector(".wallet-addres")


const mobileBankQr = document.querySelector(".mobile-qr")
const mobileBtn = document.querySelector(".mobile-bank-open-btn")

const webNameInAside = document.querySelector("#web-name")

const trNo = document.querySelector(".trNo")
const refNo = document.querySelector(".refNo")


addDotIn3Digits();

cryptoHandler()

// all document number convert to persian : jquery

$(document).ready(function () {
   ConvertNumberToPersion();
});

function ConvertNumberToPersion() {
   persian = {
      0: "۰",
      1: "۱",
      2: "۲",
      3: "۳",
      4: "۴",
      5: "۵",
      6: "۶",
      7: "۷",
      8: "۸",
      9: "۹",
   };
   function traverse(el) {
      if (el.nodeType == 3) {
         var list = el.data.match(/[0-9]/g);
         if (list != null && list.length != 0) {
            for (var i = 0; i < list.length; i++)
               el.data = el.data.replace(list[i], persian[list[i]]);
         }
      }
      for (var i = 0; i < el.childNodes.length; i++) {
         traverse(el.childNodes[i]);
      }
   }
   traverse(document.body);
}



// limit inputs to get just numbers : jquery

$("#cardNumber,#cvv2,#exMonth,#exYear,#passwordInput,#userPhone").keypress(
   function (e) {
      if (String.fromCharCode(e.keyCode).match(/[^0-9]/g)) return false;
   }
);







// to make a persian numbers in inputs , Except captcha and secondPass 
inputNumsToPersian(cardNumber, exMonth, exYear, phoneNumber);
function inputNumsToPersian(...i) {
   i.forEach((j) => {
      j.addEventListener("input", (e) => {
         e.target.value = PersianTools.digitsEnToFa(e.target.value);
      });
   });
}




const randNumForRefTrNo = ()=>{
   return Math.floor(Math.random() * 100000000)
}



function cryptoHandler(){
   const walletAddress = "19DKsTY7XMThaoo2kNnspXNRBERUk4iLHB"
   new QRCode(crypToQrCode , walletAddress)
   walletAddressToShow.innerText = walletAddress
   walletAddressToShow.addEventListener("click", copyText);
         

   // function for copying selected text in clipboard
   function copyText() {
      selectText();
      document.execCommand("copy");
   }


   // function for selecting the text of an element based on the event.target (supporting IE)
   function selectText() {
      var element = event.target;
      var range;
      if (document.selection) {
         // IE
         range = document.body.createTextRange();
         range.moveToElementText(element);
         range.select();
      } else if (window.getSelection) {
         range = document.createRange();
         range.selectNode(element);
         window.getSelection().removeAllRanges();
         window.getSelection().addRange(range);
      }
   }
}

mobileHandler()
function mobileHandler() {
   const address = "https://www.bki.ir/"
   new QRCode(mobileBankQr, address);
   mobileBtn.addEventListener("click" , ()=>{
      location.href = address
   })
}




function addDotIn3Digits() {
   price.innerText = totPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
savedCardsHandler();


function savedCardsHandler() {
   if (JSON.parse(localStorage.getItem("card")) == null){
      return
   }
   const inLocal = JSON.parse(localStorage.getItem("card"));

   inLocal.forEach((i) => {
      let divs = document.createElement("div");
      const cardnum = i.cardNum;
      const cardMonth = i.cardMonth;
      const cardYear = i.cardYear;
      const logoSrc = i.logoSrc;
      const fData = `<img src="${logoSrc}"/><span>${cardnum}</span><span>${cardYear}/${cardMonth}</span>`;
      divs.innerHTML = fData;
      savedCards.appendChild(divs);
   });
}

showSavedCardHandler();

function showSavedCardHandler() {
   savedCards.childNodes.forEach((i) => {
      i.addEventListener("click", (e) => {
         console.log(e.currentTarget.childNodes[2]);
         inputCardNumLogo.src = e.currentTarget.childNodes[0].src;

         inputCardNumLogo.src,
            (asideCardLogo.src = e.currentTarget.childNodes[0].src);
         inputCardNumLogo.style.position = "relative";
         inputCardNumLogo.style.visibility,
            (asideCardLogo.style.visibility = "visible");

         cardNumber.value = e.currentTarget.childNodes[1].innerText;
         cardNumShow.innerText = e.currentTarget.childNodes[1].innerText;

         exMonth.value = e.currentTarget.childNodes[2].innerText.split("/")[1];
         exYear.value = e.currentTarget.childNodes[2].innerText.split("/")[0];

         cardShowMonth.innerText =
            e.currentTarget.childNodes[2].innerText.split("/")[1];
         cardShowYear.innerText =
            e.currentTarget.childNodes[2].innerText.split("/")[0];
            showSavedCardBtnHandler()
      });
   });
}

console.log(typeof savedCards.children);
// getBtcPrice()      // 100request in month
function getBtcPrice() {
   const key = "freeLMrTTaNux2WcldNslnH0lksXx7F8";
   const url = `http://api.navasan.tech/latest/?api_key=${key}&item=btc`;

   fetch(url)
      .then((res) => res.json())
      .then((data) => {
         let btcPrice = data.btc.value;
         test(btcPrice);
         console.log(btcPrice);
      });
}
let btc;
function test(i) {
   btc = totPrice / i;
}

/////////////////////////////////////////////////////////

function saveCardInLocal() {
   const inLocal = JSON.parse(localStorage.getItem("card"));
   const cardNum = PersianTools.digitsFaToEn(cardNumber.value);
   const cardMonth = PersianTools.digitsFaToEn(exMonth.value);
   const cardYear = PersianTools.digitsFaToEn(exYear.value);
   const logoSrc = inputCardNumLogo.src;
   const a = {cardNum, cardMonth, cardYear, cardYear, logoSrc};
   if (localStorage.getItem("card") === null) {
      const b = [];
      b.push(a);
      localStorage.setItem("card", JSON.stringify(b));
   } else {
      inLocal.forEach((i)=>{
         if(i.cardNum == cardNum && i.cardMonth == cardMonth && i.cardYear == cardYear){
            return
         }
         inLocal.push(a);
         localStorage.setItem("card", JSON.stringify(inLocal));
      })
   }
}

////////////////////////////////////////////////////////////////////////
pageTimer();

function pageTimer() {
   const sec1 = document.querySelector(".sec-1");
   const sec2 = document.querySelector(".sec-2");
   const min1 = document.querySelector(".min-1");
   const min2 = document.querySelector(".min-2");
   const accTime = `${min1.innerHTML}${min2.innerHTML} : ${sec2.innerHTML}${sec1.innerHTML}`;
   let min = +accTime.split(":")[0];
   let sec = +accTime.split(":")[1];

   const timerPage = setInterval(() => {
      if (sec == 00) {
         if (min == 0 && sec == 0) {
            clearInterval(timerPage);
            timeUp();
            setTimeout(() => {
               location.href = "../index.html?304";
            }, 10000);
            return;
         }
         min = min - 1;
         sec = 60;
         min = min < 10 ? `0${min}` : min;
      }
      sec -= 1;
      sec = sec < 10 ? `0${sec}` : sec;
      sec1.innerHTML = PersianTools.digitsEnToFa(String(sec)[1]);
      sec2.innerHTML = PersianTools.digitsEnToFa(String(sec)[0]);
      min1.innerHTML = PersianTools.digitsEnToFa(String(min)[0]);
      min2.innerHTML = PersianTools.digitsEnToFa(String(min)[1]);
   }, 1000);
}

function back() {}
document.querySelector("#captchaRef").addEventListener("click", (e) => {
   e.target.style.transform == "rotate(180deg)"?e.target.style.transform = "rotate(360deg)":e.target.style.transform = "rotate(180deg)"
   makeCaptcha();
});

exYear.addEventListener("change", () => {
   const m = perNumToEn(exYear);
   if (m.length == 1) {
      exYear.value = `۰${exYear.value}`;
   } else if (m.length == 0) {
      exYear.value = `۰۰`;
   }
});

exYear.addEventListener("keyup", () => {
   cardShowYear.innerHTML = exYear.value;

   if (cardShowYear.innerHTML.length == 1) {
      cardShowYear.innerHTML = `۰${cardShowYear.innerHTML}`;
   } else if (cardShowYear.innerHTML.length == 0) {
      cardShowYear.innerHTML = `۰۰`;
   }
});

exMonth.addEventListener("change", (e) => {
   const m = perNumToEn(exMonth);
   if (m > 12) {
      exError.style.display = "inline-block";
      e.target.style.color = "red";
   } else {
      exError.style.display = "none";
      e.target.style.color = "black";
   }
   if (m.length == 1) {
      exMonth.value = `۰${exMonth.value}`;
   } else if (m.length == 0) {
      exMonth.value = `۰۰`;
   }
});

exMonth.addEventListener("keyup", () => {
   cardShowMonth.innerHTML = exMonth.value;

   if (cardShowMonth.innerHTML.length == 1) {
      cardShowMonth.innerHTML = `۰${cardShowMonth.innerHTML}`;
   } else if (cardShowMonth.innerHTML.length == 0) {
      cardShowMonth.innerHTML = `۰۰`;
   }
});

cvv2.addEventListener("change", () => {
   if (cvv2.value.length < 3) {
      cvv2Error.style.display = "inline-block";
      if (cvv2.value.length == 0) {
         cvv2Error.style.display = "none";
      }
   } else {
      cvv2Error.style.display = "none";
   }
});

showSavedCard.addEventListener("click", showSavedCardBtnHandler)

function showSavedCardBtnHandler(){
   if (showSavedCard.style.transform === "rotate(180deg)") {
      cardSaves.style.display = "none";
      showSavedCard.style.transform = "rotate(0deg)";
   } else {
      cardSaves.style.display = "block";
      showSavedCard.style.transform = "rotate(180deg)";
   }
}

const captchaImg = document.querySelector("#captcha-img");

document.querySelector("#closeCardNumBtn").addEventListener("click", () => {
   cardNumber.value = "";
   inputCardNumLogo.style.visibility = "hidden";
   cardNumError.style.display = "none";
   asideCardLogo.src = "img/banks/keshavarzi.png";
   cardNumShow.innerHTML = PersianTools.digitsEnToFa("0000 0000 0000 0000");
});



// add space in 4th index

const bankLogos = {
   610433: "mellat",
   589905: "melli",
   170019: "melli",
   603799: "melli",
   603769: "saderat",
   639217: "keshavarzi",
   603770: "keshavarzi",
   589210: "sepah",
   627353: "tejarat",
   585983: "tejarat",
   628023: "maskan",
   207177: "tose_saderat",
   627648: "tose_saderat",
   627961: "sanat_madan",
   627760: "postbank",
   621986: "saman",
   627412: "eghtesad_novin",
   639347: "pasargad",
   502229: "pasargad",
   639607: "sarmaye",
   627488: "karafarin",
   639194: "parsian",
   622106: "parsian",
   639346: "sina",
   589463: "refah",
   628157: "etebari_tose",
   504706: "shahr",
   502806: "shahr",
   502908: "tose_teavon",
   502938: "dey",
   606373: "gharzolhasane_mehr",
   639370: "etebari_mehr",
   627381: "ansar",
   636214: "ayandeh",
   636949: "hekmat_iranian",
   505785: "iran_zamin",
   505416: "gardeshgari",
   636795: "markazi",
   504172: "resalat",
   505801: "kosar",
   505809: "khavarmianeh",
   507677: "noor",
   606256: "melal",
   639599: "ghavamin",
};

cardNumber.addEventListener("input", (e) => {
   cardNumber.value = formatCardNumber(cardNumber.value.replaceAll(" ", ""));
   bankLogoHandeler();
   // cardNumShow.innerHTML=cardNumber.value
   cardNumShow.innerHTML == ""
      ? (cardNumShow.innerHTML = "0000 0000 0000 0000")
      : (cardNumShow.innerHTML = cardNumber.value);
});

function perNumToEn(i) {
   return PersianTools.digitsFaToEn(i.value.split(" ").join(""));
}

function bankLogoHandeler() {
   let convertedCardNum = perNumToEn(cardNumber);

   if (convertedCardNum.length >= 6) {
      const x = Object.keys(bankLogos).map((i) => (i = Number(i)));

      convertedCardNum = +convertedCardNum.substring(0, 6);
      if (x.indexOf(convertedCardNum) !== -1) {
         inputCardNumLogo.src = `img/banks/${bankLogos[convertedCardNum]}.png `;
         asideCardLogo.src = `img/banks/${bankLogos[convertedCardNum]}.png `;
         inputCardNumLogo.style.position = "relative";
         inputCardNumLogo.style.visibility = "visible";
         asideCardLogo.style.visibility = "visible";
         cardNumError.style.display = "none";
      } else {
         cardNumError.style.display = "block";
      }
   }
}


const formatCardNumber = (number) =>
   number.split("").reduce((seed, next, index) => {
      if (index !== 0 && !(index % 4)) seed += " ";
      return seed + next;
   }, "");

// to make captcha
let vC;
const makeCaptcha = () => {
   const captchaPicture = {
      "1.png": "36nx4",
      "2.png": "36wz5",
      "3.png": "37d52",
      "4.png": "37ep6",
      "5.png": "38n57",
      "6.png": "42dw4",
      "7.png": "42nxy",
      "8.png": "42xpy",
      "9.png": "43gey",
      "10.png": "43mn5",
   };
   const randomNum = Math.ceil(Math.random() * 10);
   vC = captchaPicture[`${randomNum}.png`];
   captchaImg.src = `img/captcha/${randomNum}.png`;
};
makeCaptcha();

let smsCode;
requestCode.addEventListener("click", (e) => {
   e.preventDefault();
   if (
      cardNumCheck() &&
      cvv2Check() &&
      monthAndYearCheck() &&
      cpatCheck(vC) &&
      phonCheck()
   ) {
      console.log("okookoko");
      requestBtnActiveTimerHandler();
      smsCode = sendSms();
   }
});

const disableBtn = (i) => {
   requestCode.disabled = i;
};

function requestBtnActiveTimerHandler() {
   requestCode.style.backgroundColor = "#DDDDDD";
   requestCode.style.color = "black";
   requestCode.style.direction = "ltr";
   requestCode.style.cursor = "not-allowed";
   requestCode.innerHTML = `
   ۰۲:۰۰
   `;
   console.log(requestCode.innerText);
   reversTimer(requestCode);
   console.log("in");
   disableBtn(true);
}
function disableTimerRequestBtn() {
   requestCode.style.backgroundColor = "#4C9E3A";
   requestCode.style.color = "#fff";
   requestCode.style.direction = "rtl";
   requestCode.style.cursor = "pointer";
   requestCode.innerHTML = `
   درخواست رمز
   `;
   console.log(requestCode.innerText);
   disableBtn(false);
   return;
}

function reversTimer(ele) {
   let time = PersianTools.digitsFaToEn(ele.innerText);
   let min = +time.split(":")[0];
   let sec = +time.split(":")[1];

   const timer = setInterval(() => {
      if (sec == 00) {
         if (min == 0 && sec == 0) {
            console.log("df");
            disableTimerRequestBtn();
            clearInterval(timer);
            return;
         }
         min = min - 1;
         sec = 60;
         console.log(min);
         min = min < 10 ? `0${min}` : min;
      }
      sec -= 1;
      sec = sec < 10 ? `0${sec}` : sec;
      ele.innerHTML = `${PersianTools.digitsEnToFa(
         min
      )} : ${PersianTools.digitsEnToFa(sec)}`;
   }, 1000);
}

function cardNumCheck() {
   if (cardNumber.value.length < 19 || cardNumError.style.display === "block") {
      cardNumError.style.display = "block";
      console.log("ok card");
      return false;
   } else {
      cardNumError.style.display = "none";

      return true;
   }
}

function cvv2Check() {
   if (cvv2Error.style.display === "inline-block" || cvv2.value.length === 0) {
      cvv2Error.style.display = "inline-block";
      console.log("cco");
      return false;
   } else {
      cvv2Error.style.display = "none";
      return true;
   }
}
function monthAndYearCheck() {
   if (
      exMonth.value.length === 0 ||
      exYear.value.length === 0 ||
      exError.style.display === "inline-block"
   ) {
      exError.style.display = "inline-block";
      return false;
   } else {
      exError.style.display = "none";
      return true;
   }
}

function cpatCheck(i) {
   if (i !== captchaInput.value) {
      document.querySelector(".capt-error").style.display = "inline-block";
      makeCaptcha();
      return false;
   } else {
      document.querySelector(".capt-error").style.display = "none";
      return true;
   }
}
function phonCheck() {
   const regex = new RegExp("^(\\+98|0)?9\\d{9}$");
   if (regex.test(Number(PersianTools.digitsFaToEn(phoneNumber.value)))) {
      document.querySelector(".phone-error").style.display = "none";
      return true;
   } else {
      document.querySelector(".phone-error").style.display = "inline-block";
      return false;
   }
}

//secondPassInp

function secPassCheck() {
   if (secondPassInp.value == smsCode) {
      document.querySelector(".passError").style.display = "none";
      return true;
   } else {
      document.querySelector(".passError").style.display = "inline-block";
      return false;
   }
}

function sendSms() {
   if (!phonCheck()) return;
   const phonNum = PersianTools.digitsFaToEn(phoneNumber.value);
   const userName = "9306565728";
   const apiKey =
      "KU6dFkAF6bQMBZYsY17PJfzhzuFs6bQSePMcq18BW9cU0Li7BiLKhBRSVOJvbkYM";
   const line = 30007732007385;
   const code = Math.floor(Math.random() * 100000000);
   console.log(code);
   const text = `رمز شما:  code:${code}`;

   const url = `https://api.sms.ir/v1/send?username=${userName}&password=${apiKey}&line=${line}&mobile=${phonNum}&text=${text}`;

   // fetch(url)
   //    .then((res) => res.json())
   //    .then((data) => console.log(data));

   return code;
}

const priceSave = price.innerText;
payBtns.forEach((i) => {
   i.addEventListener("click", (ev) => {
      ev.preventDefault();
      removeActiveBtns();
      i.classList.add("activebtns");
      currencyHandler(ev);
   });
});

function currencyHandler(ev) {
   const target = ev.target.id;
   payPage.forEach((i) => {
      if (target == i.id) {
         if (target === "payWithCrypto") {
            currency.innerHTML = "BTC";
            price.innerHTML = btc.toFixed(8);
         } else {
            currency.innerHTML = "ریال";
            price.innerText = priceSave;
         }
         removeActiveContainer();
         i.classList.add("active-container");
         console.log(i.id);
      }
   });
}


function removeActiveBtns() {
   payBtns.forEach((i) => {
      i.classList.remove("activebtns");
   });
}

function removeActiveContainer() {
   payPage.forEach((i) => {
      i.classList.remove("active-container");
   });
}

submit.addEventListener("click", () => {
   if (
      cardNumCheck() &&
      cvv2Check() &&
      monthAndYearCheck() &&
      cpatCheck(vC) &&
      phonCheck() &&
      secPassCheck()
   ) {
      if (saveCardCheck.checked) {
         saveCardInLocal();
      }

      finalHandeler();
      wether();
      finalBtn();
   }
});

const finalData = () => {
   return {
      cardNumber: cardNumber.value,
      cvv2: cvv2.value,
      exYear: exYear.value,
      exMonth: exMonth.value,
      phoneNumber: phoneNumber.value,
   };
};

function finalHandeler() {


   console.log(finalData(), "we can fetch this data");
   document.querySelector(".main-main").style.display = "none";
   document.querySelector(".done").style.display = "flex";
   document.querySelector(".footer-elements").style.display = "none";
   document.querySelector(".footer-continue").style.display = "flex";
   trNo.innerText = `شماره پیگیری :  ${randNumForRefTrNo()}`
   refNo.innerText = `شماره مرجع :  ${randNumForRefTrNo()}`
}
function finalBtn() {
   finalContinueBtn.addEventListener("click", backToShopOk);
}
function wether() {
   const key = "f2bbc52e18cabb66a5da6dacf22dda03";

   fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Tehran&appid=${key}&units=metric`
   )
      .then((res) => res.json())
      .then((data) => {
         const {main, name, sys, weather} = data; // for temp use main
         // const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`; // for get wether icon
         const temp = `${main.temp}c`;
         forWether.innerHTML = ` دمای هوای تهران :${temp}  `;
      });
}
function backToShopOk() {
   location.href = "../index.html?200";
}

function backToShopNotOk() {
   Swal.fire({
      title: "آیا مطمئن هستید؟",
      showDenyButton: true,
      confirmButtonText: "بله",
      confirmButtonColor: "#4C9E3A",

      denyButtonText: `خیر`,
   }).then((result) => {
      if (result.isConfirmed) {
         location.href = "../index.html?304";
      }
   });
}

function timeUp() {
   Swal.fire({
      title: "زمان شما به پایان رسید",
      confirmButtonText: "ادامه",
      confirmButtonColor: "#4C9E3A",
   }).then((result) => {
      if (result.isConfirmed) {
         location.href = "../index.html?304";
      }
   });
   return;
}
cancel.addEventListener("click", backToShopNotOk);
