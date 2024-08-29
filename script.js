// Array of image paths
const images = [
    'images/image1.png',
    'images/image2.png',
    'images/image3.png'
];

let currentIndex = 0;

// Function to change the image
function changeImage() {
    currentIndex = (currentIndex + 1) % images.length;
    document.getElementById('slider-image').src = images[currentIndex];
}

// Set an interval to change the image every 3 seconds
setInterval(changeImage, 1000);

