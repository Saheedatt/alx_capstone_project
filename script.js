//for calling multiple events
const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }
//for our mobile navbar
const primaryNav = document.querySelector('.primary-nav');
const navToggler = document.querySelector('.mobile-nav-toggle');

navToggler.addEventListener('click', ()=>{
    const visibility = primaryNav.getAttribute('data-visible')

    if (visibility === "false"){
        primaryNav.setAttribute("data-visible", true);
        navToggler.setAttribute('aria-expanded', true)
    }else if(visibility === "true"){
        primaryNav.setAttribute("data-visible", false);
        navToggler.setAttribute('aria-expanded', false);
    }
});

const header = document.querySelector("[data-header]");
const activeElementOnScroll = function () {
  if (window.scrollY > 50) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}
window.addEventListener("scroll", activeElementOnScroll);

/*Hero text animation*/
const letterBoxes = document.querySelectorAll("[data-animated-word]");

let activeLetterBoxIndex = 0;
let lastActiveLetterBoxIndex = 0;
let totalLetterBoxDelay = 0;

const setAnimationDelay = (element, delay) => {
  element.style.animationDelay = `${delay}s`;
};

const createLetterSpan = (letter, delay, isActive) => {
  const span = document.createElement("span");
  setAnimationDelay(span, delay);
  span.textContent = letter;
  span.classList.add(isActive ? "in" : "out");
  if (letter === " ") span.classList.add("space");
  return span;
};

const setLetterEffect = () => {
  for (let i = 0; i < letterBoxes.length; i++) {
    let letterAnimationDelay = 0;
    const letters = letterBoxes[i].textContent.trim();
    letterBoxes[i].textContent = "";

    for (let j = 0; j < letters.length; j++) {
      const isActiveLetterBox = i === activeLetterBoxIndex;
      const span = createLetterSpan(letters[j], letterAnimationDelay, isActiveLetterBox);
      letterBoxes[i].appendChild(span);
      if (j >= letters.length - 1) break;
      letterAnimationDelay += 0.05;
    }

    if (i === activeLetterBoxIndex) {
      totalLetterBoxDelay = Number(letterAnimationDelay.toFixed(2));
    }

    letterBoxes[i].classList.toggle("active", i === lastActiveLetterBoxIndex);
  }

  setTimeout(() => {
    lastActiveLetterBoxIndex = activeLetterBoxIndex;
    activeLetterBoxIndex = (activeLetterBoxIndex >= letterBoxes.length - 1) ? 0 : (activeLetterBoxIndex + 1);
    setLetterEffect();
  }, (totalLetterBoxDelay * 1000) + 3000);
};

window.addEventListener("load", setLetterEffect);

/*Scrolling*/
const revealElements = document.querySelectorAll("[data-reveal]");

const isElementInView = (element) => {
  const rect = element.getBoundingClientRect();
  return rect.top < window.innerHeight / 1.15;
};

const revealElement = (element, reveal) => {
  element.classList.toggle("revealed", reveal);
};

const handleScrollReveal = () => {
  revealElements.forEach((element) => {
    const isInViewport = isElementInView(element);
    revealElement(element, isInViewport);
  });
};

const scrollReveal = () => {
  window.addEventListener("scroll", handleScrollReveal);
  handleScrollReveal();
};

scrollReveal();


const cursor = document.querySelector("[data-cursor]");
const anchorElements = document.querySelectorAll("a");
const buttons = document.querySelectorAll("button");

const updateCursorPosition = (event) => {
  setTimeout(() => {
    cursor.style.top = `${event.clientY}px`;
    cursor.style.left = `${event.clientX}px`;
  }, 100);
};

const addHoverClass = () => {
  cursor.classList.add("hovered");
};

const removeHoverClass = () => {
  cursor.classList.remove("hovered");
};

const addEventListeners = (elements, eventType, eventHandler) => {
  elements.forEach((element) => {
    element.addEventListener(eventType, eventHandler);
  });
};

document.body.addEventListener("mousemove", updateCursorPosition);
addEventListeners(anchorElements, "mouseover", addHoverClass);
addEventListeners(anchorElements, "mouseout", removeHoverClass);
addEventListeners(buttons, "mouseover", addHoverClass);
addEventListeners(buttons, "mouseout", removeHoverClass);

document.body.addEventListener("mouseout", () => {
  cursor.classList.add("disabled");
});

document.body.addEventListener("mouseover", () => {
  cursor.classList.remove("disabled");
});


const backTopBtn = document.querySelector("[data-back-top-btn]");

const calculateScrollPercent = () => {
  const bodyHeight = document.body.scrollHeight;
  const windowHeight = window.innerHeight;
  const scrollEndPos = bodyHeight - windowHeight;
  return (window.scrollY / scrollEndPos) * 100;
};

const updateBackToTopButton = () => {
  const totalScrollPercent = calculateScrollPercent();
  backTopBtn.textContent = `${totalScrollPercent.toFixed(0)}%`;

  if (totalScrollPercent > 5) {
    backTopBtn.classList.add("show");
  } else {
    backTopBtn.classList.remove("show");
  }
};

const handleScroll = () => {
  updateBackToTopButton();
};

window.addEventListener("scroll", handleScroll);


function validateForm() {
  const emailInput = document.getElementById('email');
  const email = emailInput.value.trim();
  const emailError = document.getElementById('email-error');
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (email === '' || !emailRegex.test(email)) {
    emailError.textContent = 'Please enter a valid email address.';
    emailInput.focus();
    return false;
  }
  emailError.textContent = '';

  return true;
}


function sendEmail(){
  Email.send({
    secureToken: "c19165e2-c3d7-4fb7-a703-589ef2c3ca50",

    To : 'afolabisaheedat1@gmail.com',
    From : document.getElementById('email').value,
    Subject : "Contact Form Enquiry",
    Body : "Name: " + document.getElementById('name').value
          + "<br> Email: " + document.getElementById('email').value
          + "<br> Message: " + document.getElementById('message').value
}).then(
  message => alert("Message Sent Successfully")
);
}