// Disable right-click globally to protect content
document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevents the default right-click menu
});

// Disable right-click on images and Disable dragging images
const images = document.querySelectorAll(".gallery img");
images.forEach((image) => {
    image.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Prevents the default right-click menu
    });
    image.setAttribute("draggable", false); // Disable dragging
});

// Function to toggle the mobile menu
function toggleMenu() {
    const menu = document.querySelector('.navbar-menu');
    menu.classList.toggle('active');
}
