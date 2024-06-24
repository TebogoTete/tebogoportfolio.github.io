var tablinks = document.getElementsByClassName("tab-links");
var tabcontents = document.getElementsByClassName("tab-contents");

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-link");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
    event.currentTarget.classList.add("active-link");
    document.getElementById(tabname).classList.add("active-tab");
}
/*----------------Text Animation Effect for hero-----------------*/

const letterBoxes = document.querySelectorAll("[data-letter-effect]")

let activeLetterBoxIndex = 0;
let lastaActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setLetterEffect = function () {
    for (let i = 0; i < letterBoxes.length; i++){
        let letterAnimationDelay = 0;

        const letters = letterBoxes[i].textContent.trim();
        letterBoxes[i].textContent = "";

        for (let j = 0; j < letters.length; j++){
            const span = document.createElement("span");

            span.style.animationDelay = `${letterAnimationDelay}s`;

            if(i === activeLetterBoxIndex) {
                span.classList.add("in");
            } else {
                span.classList.add("out");
            }

            span.textContent = letters[j];
            if (letters[j] === "") span.classList.add("space")

            letterBoxes[i].appendChild(span);
            
            if (j >= letters.length - 1) break;
            letterAnimationDelay += 0.05;

        }
       if (i === activeLetterBoxIndex){
        totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
       }
       if(i === lastaActiveLetterBoxIndex) {
        letterBoxes[i].classList.add("active");
       } else {
        letterBoxes[i].classList.remove("active");
       }
    }

    setTimeout (function () {
        lastaActiveLetterBoxIndex = activeLetterBoxIndex;

        activeLetterBoxIndex >= letterBoxes.length - 1 ? activeLetterBoxIndex = 0 : 
        activeLetterBoxIndex++;

        setLetterEffect();
    }, (totalLetterBoxDelay * 1000) + 3000);
}

window.addEventListener("load", setLetterEffect); 



/*----------------For small screen-----------------*/

var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px";
}
/*---------------------Contact Form google sheet-----------------*/

  const scriptURL = 'https://script.google.com/macros/s/AKfycbx2DOCUNKYzAlrGwVkYYdcTiMmzz_yA0gFLJAguFECi8mSdeT5hIhVK-CBM3otWrhWP/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")

  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {msg.innerHTML = "Message sent successfully"
        setTimeout(function(){
            msg.innerHTML = ""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })
