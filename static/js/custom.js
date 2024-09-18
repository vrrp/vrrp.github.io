// Array of image paths
const images = [
    'images/image1.png',
    'images/image2.png',
    'images/image3.png'
];

let currentIndex = 0;
let intervalId = null;

// Function to update the displayed image
function updateImage() {
    document.getElementById('slider-image').src = images[currentIndex];
}

// Function to go to the next image
function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
}

// Function to go to the previous image
function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
}

// Function to start the slideshow
function playSlideshow() {
    if (!intervalId) {
        intervalId = setInterval(nextImage, 500);// intervals in milisecons (3000)
    }
}

// Function to stop the slideshow
function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
}

// Attach event listeners to the buttons
document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('prevButton').addEventListener('click', prevImage);
document.getElementById('playButton').addEventListener('click', playSlideshow);
document.getElementById('stopButton').addEventListener('click', stopSlideshow);

