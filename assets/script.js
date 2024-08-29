const categories = {
    category1: [
        '{{ "/assets/images/category1/img1.png" | relative_url }}',
        '{{ "/assets/images/category1/img2.png" | relative_url }}',
        '{{ "/assets/images/category1/img3.png" | relative_url }}'
    ],
    category2: [
        '{{ "/assets/images/category1/img1.png" | relative_url }}',
        '{{ "/assets/images/category1/img2.png" | relative_url }}',
        '{{ "/assets/images/category1/img3.png" | relative_url }}'
    ],
    category3: [
        '{{ "/assets/images/category1/img1.png" | relative_url }}',
        '{{ "/assets/images/category1/img2.png" | relative_url }}',
        '{{ "/assets/images/category1/img3.png" | relative_url }}'
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
        intervalId = setInterval(nextImage, 3000);
    }
}

function stopSlideshow() {
    clearInterval(intervalId);
    intervalId = null;
}

function changeCategory(event) {
    currentCategory = event.target.getAttribute('data-category');
    currentIndex = 0;
    updateImage();
}

document.querySelectorAll('.category-button').forEach(button => {
    button.addEventListener('click', changeCategory);
});

document.getElementById('nextButton').addEventListener('click', nextImage);
document.getElementById('prevButton').addEventListener('click', prevImage);
document.getElementById('playButton').addEventListener('click', playSlideshow);
document.getElementById('stopButton').addEventListener('click', stopSlideshow);

