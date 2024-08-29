const categories = {
    category1: [
        'images/category1/img1.png',
        'images/category1/img2.png',
        'images/category1/img3.png'
    ],
    category2: [
        'images/category2/img1.png',
        'images/category2/img2.png',
        'images/category2/img3.png'
    ],
    category3: [
        'images/category3/img1.png',
        'images/category3/img2.png',
        'images/category3/img3.png'
    ]
};

let currentCategory = 'category1';
let currentIndex = 0;
let intervalId = null;

function updateImage() {
    document.getElementById('slider-image').src = categories[currentCategory][currentIndex];
}

function nextImage() {
    currentIndex = (currentIndex + 1) % categories[currentCategory].length;
    updateImage();
}

function prevImage() {
    currentIndex = (currentIndex - 1 + categories[currentCategory].length) % categories[currentCategory].length;
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

function selectCategory(category) {
    currentCategory = category;
    currentIndex = 0;
    updateImage();
    stopSlideshow();
}

document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('prevButton').addEventListener('click', prevImage);
document.getElementById('playButton').addEventListener('click', playSlideshow);
document.getElementById('stopButton').addEventListener('click', stopSlideshow);

document.querySelectorAll('.category-selector button').forEach(button => {
    button.addEventListener('click', () => {
        selectCategory(button.getAttribute('data-category'));
    });
});

