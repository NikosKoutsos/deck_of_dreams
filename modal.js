 // Modal logic
 const modal = document.getElementById("imageModal");
 const modalImage = document.getElementById("modalImage");
 const caption = document.getElementById("caption");
 const closeModal = document.querySelector(".close");
 const thumbnail = document.querySelector(".thumbnail");

 // Show modal on image click
 thumbnail.addEventListener("click", () => {
     modal.style.display = "block";
     modalImage.src = thumbnail.src;
     caption.textContent = thumbnail.alt;
 });

 // Close modal when close button is clicked
 closeModal.addEventListener("click", () => {
     modal.style.display = "none";
 });

 // Close modal when clicking outside the image
 modal.addEventListener("click", (e) => {
     if (e.target === modal) {
         modal.style.display = "none";
     }
 });