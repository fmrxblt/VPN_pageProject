$(document).ready(function() {

    $('.btn').removeClass('bg-red2 color-white box-shadow-btn')
    $('.btnRed2').removeClass('bg-red color-white box-shadow-btn')
    $('.btnMain').removeClass('box-shadow-btn')



    function choosingPlan (btnName, planName) {
      $('.plan').removeClass('b-2-red2 b-2-red2-sm  b-2-grey4 b-2-grey4-sm').addClass('b-2-grey4 b-2-grey4-sm');
      $('.btn').removeClass('bg-red2 color-white box-shadow-btn').addClass(' color-red2');
      $(planName).removeClass('b-2-grey4 b-2-grey4-sm').addClass('b-2-red2 b-2-red2-sm');
      $(btnName).removeClass('color-red2').addClass('bg-red2 color-white box-shadow-btn');
    }

    $('.btn1').click(function (e) { 
      e.preventDefault();
      choosingPlan('.btn1', '.freePlans')
    });

    $('.btn2').click(function (e) { 
      e.preventDefault();
      choosingPlan('.btn2', '.standartPlan')
    });

    $('.btn3').click(function (e) { 
      e.preventDefault();
      choosingPlan('.btn3', '.premiumPlan')
    });

    $('.btnRed2').hover(
        function() {
            $(this).removeClass('color-red').addClass('bg-red color-white box-shadow-btn');
          },
          function() {
            $(this).removeClass('bg-red color-white box-shadow-btn').addClass('color-red');
          }
        
    )

    $('.btnMain').hover(
        function() {
            $(this).addClass('box-shadow-btn');
          },
          function() {
            $(this).removeClass('box-shadow-btn')
          }
        
    )

    $('.menuBtn').hover(
      function() {
          $(this).addClass('fs-3-sm fw-2-sm');
        },
        function() {
          $(this).removeClass('fs-3-sm fw-2-sm')
        }
      
  )
    
})



let sliders = document.querySelectorAll(".slide");
let slidesContent = document.querySelectorAll(".slider-content");

let points_div = document.querySelector(".points");
let points = document.querySelectorAll(".point");
let arrowLeft = document.querySelector("#arrow-left");
let arrowRight = document.querySelector("#arrow-right");

//----------------------------------------
let arrowRedLeft = document.querySelector(".arrow-red-left");
let arrowWhiteLeft = document.querySelector(".arrow-white-left");
let arrowRedRight = document.querySelector(".arrow-red-right");
let arrowWhiteRight = document.querySelector(".arrow-white-right");
//--------------------------------------

let orderArray = Array.from(sliders);
let last = orderArray.length - 1;
let current = 0,
  order = 0;

function redoOrder(a) {
  for (let i = 0; i <= last; i++) {
    sliders[i].style.order = orderArray.indexOf(sliders[i]);
  }
}

function highlightCurrent() {
  slidesContent[current].classList.remove("b-2-grey4", "b-2-grey4-sm");
  slidesContent[current].classList.add("active-slide");
  points[current].classList.remove("bg-white2");
  points[current].classList.remove("w-px0-15-sm");
  points[current].classList.add("active-point");
}

function goRight() {
  reset();
  let previous = orderArray.shift();
  orderArray.push(previous);
  redoOrder(orderArray);
  if (current === last) {
    current = 0;
    highlightCurrent();
    return;
  }
  current++;
  highlightCurrent();
}

function goLeft() {
  reset();
  let previous = orderArray.pop();
  orderArray.unshift(previous);
  redoOrder(orderArray);
  if (current === 0) {
    current = last;
    highlightCurrent();
    return;
  }
  current--;
  highlightCurrent();
}

function reset() {
  for (let i = 0; i < sliders.length; i++) {
    points[i].classList.remove("active-point");
    points[current].classList.add("w-px0-15-sm");
    slidesContent[i].classList.remove("active-slide");
    slidesContent[current].classList.add("b-2-grey4", "b-2-grey4-sm");
  }
}

function initSlider() {
  reset();
  points[current].classList.remove("bg-white2");
  points[current].classList.remove("w-px0-15-sm");
  points[current].classList.add("active-point");
  slidesContent[current].classList.remove("b-2-grey4", "b-2-grey4-sm");
  slidesContent[current].classList.add("active-slide");
}

initSlider();

//--------------------- Arrows control----------------

arrowRight.addEventListener("mouseover", overRightArrow);
arrowRight.addEventListener("mouseout", outRightArrow);
arrowLeft.addEventListener("mouseover", overLeftArrow);
arrowLeft.addEventListener("mouseout", outLeftArrow);

function hideToggle(arrowRed, arrowWhite) {
  arrowWhite.classList.toggle("hide");
  arrowRed.classList.toggle("hide");
}

function overRightArrow(e) {
  if ((e.target.tagName = "img")) {
    arrowRight.style.background = "#f53838";
    hideToggle(arrowRedRight, arrowWhiteRight);
  }
}

function overLeftArrow(e) {
  if ((e.target.tagName = "img")) {
    arrowLeft.style.background = "#f53838";
    hideToggle(arrowRedLeft, arrowWhiteLeft);
  }
}

function outRightArrow(e) {
  if ((e.target.tagName = "img")) {
    arrowRight.style.background = "#fff";
    hideToggle(arrowRedRight, arrowWhiteRight);
  }
}

function outLeftArrow(e) {
  if ((e.target.tagName = "img")) {
    arrowLeft.style.background = "#fff";
    hideToggle(arrowRedLeft, arrowWhiteLeft);
  }
}

arrowLeft.addEventListener("click", goLeft);
arrowRight.addEventListener("click", goRight);


points_div.addEventListener("click", pointSlide);

function pointSlide(e) {
  let index = Array.from(points).indexOf(e.target);
  console.log(index);
  if (index == -1) {
    return;
  }
  reset();

  let tmp_slides = Array.from(sliders);
  if (index !== 0) {
    let tail = tmp_slides.splice(0, index);
    orderArray = [...tmp_slides, ...tail];
    console.log(orderArray);
  } else {
    orderArray = tmp_slides;
  }

  current = index;
  highlightCurrent();
  redoOrder(orderArray);
}