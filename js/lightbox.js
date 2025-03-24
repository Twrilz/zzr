// Open the modal with the clicked image or video and set the caption text
function openModal(mediaSrc, captionText) {
    console.log("Media Source:", mediaSrc); // Debugging line
    console.log("Caption Text:", captionText); // Debugging line

    var modal = document.getElementById("lightbox-modal");
    var modalImg = document.getElementById("modal-image");
    var modalVideo = document.getElementById("modal-video");
    var modalCaption = document.getElementById("modal-caption");

    modal.style.display = "block";
    modalCaption.innerText = captionText; // Set the caption text here

    if (mediaSrc.endsWith(".mp4")) {
        modalImg.style.display = "none";
        modalVideo.style.display = "block";
        modalVideo.src = mediaSrc;
        modalVideo.setAttribute("controls", "controls"); // Add controls attribute
    } else {
        modalVideo.style.display = "none";
        modalImg.style.display = "block";
        modalImg.src = mediaSrc;
    }
}

// Close the modal
function closeModal() {
    var modal = document.getElementById("lightbox-modal");
    modal.style.display = "none";
}

// Add event listener to close the modal when clicked outside of the image
window.addEventListener("click", function (e) {
    var modal = document.getElementById("lightbox-modal");
    if (e.target == modal) {
        closeModal();
    }
});