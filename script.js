'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const btnScrollTo =document.querySelector(".btn--scroll-to")
const section1= document.querySelector("#section--1")
const tabs = document.querySelectorAll(".operations__tab")    // tabs in which information is stored 
const tabsContainer = document.querySelector(".operations__tab-container") //container of all the tabs
const tabsContent = document.querySelectorAll(".operations__content") //content of the tab
const nav= document.querySelector(".nav")




// -------------Menu Fade animation on hover -------------

const handleHover = function(e, opacity)
{
  if (e.target.classList.contains("nav__link"))
  {
    const link = e.target;  // when user hover over the link
    const siblings = link.closest(".nav").querySelectorAll(".nav__link")  //selecting all the siblings on nav
    const logo = link.closest(".nav").querySelector("img"); //selecting logo 

    siblings.forEach (el => {                         //selecting from nav links
      if (el !== link)  el.style.opacity = opacity;   //selection is not equal to link change opacity
    
    });

    logo.style.opacity=opacity   //change logo opacity
   }
};

nav.addEventListener("mouseover", function(e){   //setting opacity of all others to 50% when mouseover 
  handleHover(e,0.5)
})
nav.addEventListener("mouseout",  function(e){  //setting opacity back to 100%
  handleHover(e,1)
})


// ---------------------Modal -------------
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//----------- Navigation sticky -------------------

const header=document.querySelector(".header")   //selecting header and nav height
const navHeight= nav.getBoundingClientRect().height  
console.log(navHeight)

const stickyNav = function(entries) {  
  const [entry]=entries;  
  console.log(entry)

  if(!entry.isIntersecting) nav.classList.add("sticky");  //if isintersecting false add sticky else remove
  else nav.classList.remove("sticky");
  
}
const headerObserver= new IntersectionObserver(stickyNav, {   
  root:null,
  threshold:0,
  rootMargin:`-${navHeight}px`  //taking height dynamically

})

headerObserver.observe(header)


// -------------------Button Scroll-------------------------------------


btnScrollTo.addEventListener("click", function (e) {


section1.scrollIntoView ({ behavior: "smooth" });

})


document.querySelector(".nav__links").addEventListener("click", function (e) {
  console.log(e.target)
  e.preventDefault()
  if (e.target.classList.contains("nav__link")){
    const id = e.target.getAttribute("href")
        console.log(id) 
        document.querySelector(id).scrollIntoView({behavior:"smooth"})
  }
})




//-----------We use cookies message


const h =document.querySelector(".header")
const allSections = document.querySelectorAll(".section")
console.log(allSections)

document.getElementById("section--1")
const allButtons = document.getElementsByTagName("button")
console.log(allButtons)


const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent="we use cookies to add functionality"

message.innerHTML =`We use cookies to improve functionality and analytics  <button class="btn btn--close-cookie" > Got it </button>  `
// h.prepend(message);
h.append(message);

// h.after(message)

document.querySelector(".btn--close-cookie").addEventListener("click",function(){
  message.remove();
})

message.style.backgroundColor="black"
message.style.fontSize="17px"
message.style.width="102%"
message.style.height="70px"


console.log(logo.getAttribute("designer"));
logo.setAttribute("company","Bankist")


// ----------------Reveal section annimation------------------


const revealSection = function (entries, observer) {  
  const [entry] = entries;  //destructuring entry from entries

  if (!entry.isIntersecting) return;   //entry intersection is false than return
 
  entry.target.classList.remove('section--hidden');  //if entry intersection is true remove class  
  observer.unobserve(entry.target);  // make things back
};

const sectionObserver = new IntersectionObserver(revealSection, {   
  root: null,  //root set to entire viewport
  threshold: 0.15, 
});

allSections.forEach(function (section) { 
  sectionObserver.observe(section);   //observing all sections
  // section.classList.add('section--hidden'); //add class 
});

// ------------------lazy Images load-------------------------

const imgTargets = document.querySelectorAll("img[data-src]");  //selecting all high resolution imgs

const loadImg = function (entries,observer) {
  const [entry] = entries; 
  console.log(entry)

  if(!entry.isIntersecting) return;

  // replace src with data-src 
entry.target.src= entry.target.dataset.src  //replace low resol. images with high resolution

entry.target.addEventListener("load", function(){
  entry.target.classList.remove("lazy-img"); //remove lazy-img (low resol)

})
observer.unobserve(entry.target)
}
const imgObserver = new IntersectionObserver(loadImg, {  
  root:null,
  threshold:0,

})
imgTargets.forEach(img => imgObserver.observe(img));  


// ------------tabbed button with content---------------------------


tabsContainer.addEventListener("click",function(e) {     
  const clicked= e.target.closest(".operations__tab");  //getting closest parent of clicked button
  console.log(clicked)

  if(!clicked) return    //if no button is clicked function is returned

  //remove active classes
tabs.forEach(t=> t.classList.remove("operations__tab--active")) //removing class from all the buttons 

tabsContent.forEach(c => c.classList.remove("operations__content--active"))//removing class from all the content box



clicked.classList.add("operations__tab--active")   //and adding  this class to clicked button

//activate area
console.log(clicked.dataset.tab)

//selecting operations tab and adding class 
document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active") 

})

// --------------------Image slider ----------------------------

const slides = document.querySelectorAll(".slide") //slides 
const btnLeft = document.querySelector(".slider__btn--left");  //selecting left  & right btns in slide
const btnRight = document.querySelector(".slider__btn--right");


const slider = document.querySelector(".slider")  //slides  container
slider.style.overflow="visible"

let currentSlide=0; 
let maxslide=slides.length 


const goToSlide= function (slide){
slides.forEach ( (s,i) => (s.style.transform =`translateX(${100 * (i-currentSlide)}%)`))
}
goToSlide(0)

// button right - going to next slide 
const nextSlide = function(){
if (currentSlide=== maxslide-1)   //whenver slider reaches last image it gets to the first
{
  currentSlide=0;
}
else{
  
  currentSlide++ ;
}
goToSlide(currentSlide)
}

const prevSlide = function() {
if (currentSlide ===0) {
  currentSlide=maxslide-1 ;
}
  else
  {
    currentSlide--;
    goToSlide(currentSlide)
  }
}

btnRight.addEventListener("click",nextSlide)
// currentslide -100 , 0, 100,200

btnLeft.addEventListener("click",prevSlide)


// -----------Using Arrow keys for slider ----------------

document.addEventListener("keydown",function(e){

  if(e.key ==="ArrowLeft") prevSlide();
  
   e.key ==="ArrowRight" && nextSlide();
     
})