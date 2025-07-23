//Background img slide show
// array of bg images
let backgroundImages = [
    'images/bgimg1.jpg',
    'images/bgimg2.jpg',
    'images/bgimg3.jpg',
];
let bgIndex = 0; // set initial image to 0

//function to change bg
function changeBackground() {

    const imgElement = document.querySelector('.bg-img'); //select bg image element
    //loop loop through array
    bgIndex = (bgIndex + 1) % backgroundImages.length;
    const nextImage = backgroundImages[bgIndex];

    // Fade out current image
    imgElement.style.opacity = '0';

    // Change src and fade in next image after a short delay
    setTimeout(function() {
        imgElement.src = nextImage;
        imgElement.style.opacity = '1.0';
    }, 600);
}
setInterval(changeBackground, 4000);

const page1btn=document.querySelector("#page1btn");
const page2btn=document.querySelector("#page2btn");
const page3btn=document.querySelector("#page3btn");
var allpages=document.querySelectorAll(".page");
//select all subtopic pages
function hideall(){ //function to hide all pages
for(let onepage of allpages){ //go through all subtopic pages
onepage.style.display="none"; //hide it
}
}
function show(pgno){ //function to show selected page no
hideall();
//select the page based on the parameter passed in
let onepage=document.querySelector("#page"+pgno);
onepage.style.display="block"; //show the page
}
/*Listen for clicks on the buttons, assign anonymous
eventhandler functions to call show function*/
page1btn.addEventListener("click", function () {
show(1);
});
page2btn.addEventListener("click", function () {
show(2);
});
page3btn.addEventListener("click", function () {
show(3);
});
hideall();