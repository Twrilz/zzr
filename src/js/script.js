// Disable right-click globally to protect content
document.addEventListener("contextmenu", function (event) {
    event.preventDefault(); // Prevents the default right-click menu
});

// Alternatively, disable right-click only on images
const images = document.querySelectorAll(".gallery img");
images.forEach((image) => {
    image.addEventListener("contextmenu", function (event) {
        event.preventDefault(); // Protects image-specific content
    });
});
