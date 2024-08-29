// Write your Javascript here
//-----------------------------------------------------------------------------------------

// image slides
//-----------------------------------------------------------------------------------------
const images = {
    categoria1: [
        '{{ "/images/categoria1/img1.png" | relative_url }}',
        '{{ "/images/categoria1/img2.png" | relative_url }}',
        '{{ "/images/categoria1/img3.png" | relative_url }}'
    ],
    categoria2: [
        '{{ "/images/categoria2/img1.png" | relative_url }}',
        '{{ "/images/categoria2/img2.png" | relative_url }}',
        '{{ "/images/categoria2/img3.png" | relative_url }}'
    ],
    categoria3: [
        '{{ "/images/categoria3/img1.png" | relative_url }}',
        '{{ "/images/categoria3/img2.png" | relative_url }}',
        '{{ "/images/categoria3/img3.png" | relative_url }}'
    ]
};

let currentCategory = 'categoria1';
let currentIndex = 0;
let intervalId = null;

function updateImage() {
    document.getElementById('slider-image').src = images[currentCategory][currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images[currentCategory].length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images[currentCategory].length) % images[currentCategory].length;
    updateImage();
}

function playSlideshow() {
    if (!intervalId) {
        intervalId = setInterval(nextImage, 500);
    }
}

function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
}

function changeCategory(category) {
    currentCategory = category;
    currentIndex = 0;
    updateImage();
    stopSlideshow();
}

document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('prevButton').addEventListener('click', prevImage);
document.getElementById('playButton').addEventListener('click', playSlideshow);
document.getElementById('stopButton').addEventListener('click', stopSlideshow);

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', () => {
        changeCategory(button.dataset.category);
    });
});


