// Utility function to get the fixed page dimensions
function getPageDimensions() {
    return { pageWidth: 221, pageHeight: 203 }; // Fixed width and height
}

// Generate random flowers for falling effect
function createFlower() {
    const flower = document.createElement('div');
    flower.classList.add('flower');
    flower.style.left = `${Math.random() * 100}vw`;
    flower.style.animationDuration = `${Math.random() * 3 + 2}s`;
    flower.style.animationDelay = `${Math.random() * 2}s`;
    flower.textContent = '🌸';

    document.querySelector('.falling-flowers').appendChild(flower);

    // Remove flower after animation
    flower.addEventListener('animationend', () => {
        flower.remove();
    });
}
setInterval(createFlower, 300);

// Button move on hover for 10 seconds
const button = document.getElementById('movingButton');
let isMovable = true;
let startTime;

// Function to move button to a random position within the fixed page's dimensions
function moveButton() {
    if (isMovable) {
        const { pageWidth, pageHeight } = getPageDimensions(); // Get fixed page dimensions

        // Get the button's dimensions to keep it fully within the page
        const buttonRect = button.getBoundingClientRect();
        
        // Calculate maximum X and Y values to keep the button inside the area
        const maxX = pageWidth - buttonRect.width;
        const maxY = pageHeight - buttonRect.height;

        // Generate random positions within the allowed range
        const randomX = Math.random() * maxX;
        const randomY = Math.random() * maxY;

        // Apply transform to move button to the new position
        button.style.transform = `translate(${randomX}px, ${randomY}px)`;
    }
}

// Start moving button on hover
button.addEventListener('mouseover', () => {
    if (!startTime) startTime = Date.now(); // Record start time
    if (isMovable) moveButton();

    // Stop moving after 10 seconds
    if (Date.now() - startTime > 10000) {
        isMovable = false;
        button.style.transform = 'translate(0, 0)'; // Reset position
        button.disabled = false; // Enable clicking
    }
});

// Scroll down on button click
button.addEventListener('click', () => {
    document.querySelector('.hidden-sections').scrollIntoView({ behavior: 'smooth' });
});

// Function to check if a div is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

// Function to reveal divs on scroll
function checkVisibility() {
    const recordBoxes = document.querySelectorAll('.record-box');
    recordBoxes.forEach((box) => {
        if (isInViewport(box)) {
            box.classList.add('visible'); // Add 'visible' class to the box when it enters the viewport
        }
    });
}

// Initial check for visibility
checkVisibility();

// Add event listener for scroll
window.addEventListener('scroll', () => {
    checkVisibility();
});
