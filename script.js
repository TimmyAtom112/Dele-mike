// ---------------------------
// Mobile Navigation Toggle
// ---------------------------
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
  });
}

// ---------------------------
// Booking Form Submission
// ---------------------------
const bookingForm = document.getElementById("bookingForm");

if (bookingForm) {
  bookingForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = bookingForm.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Gather form data
    const formData = {
      name: bookingForm.name.value,
      email: bookingForm.email.value,
      phone: bookingForm.phone.value,
      eventType: bookingForm.eventType.value,
      eventDate: bookingForm.eventDate.value,
      location: bookingForm.location.value,
      duration: bookingForm.duration.value,
      message: bookingForm.message.value || "No additional message"
    };

    // Send form via EmailJS
    emailjs.sendForm(
      "service_xk3eefi",     // Replace with your EmailJS Service ID
      "template_vqrh3kl",    // Replace with your EmailJS Template ID
      this                   // 'this' refers to the form
    )
    .then(() => {
      alert("Booking request sent successfully! We will contact you shortly.");
      
      // Reset form
      bookingForm.reset();
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Booking Request";

      // Prepare WhatsApp message
      const waNumber = "+234 810 814 1543"; // Replace with musician's number
      const waMessage = `Hello! I would like to book Gospel Artist.\n\n` +
                        `Name: ${formData.name}\n` +
                        `Email: ${formData.email}\n` +
                        `Phone: ${formData.phone}\n` +
                        `Event Type: ${formData.eventType}\n` +
                        `Event Date: ${formData.eventDate}\n` +
                        `Location: ${formData.location}\n` +
                        `Duration: ${formData.duration}\n` +
                        `Message: ${formData.message}`;

      // Open WhatsApp link
      const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
      window.open(waLink, "_blank");
      
    })
    .catch((error) => {
      console.error("EmailJS error:", error);
      alert("Oops! Something went wrong. Please try again later.");
      submitBtn.disabled = false;
      submitBtn.textContent = "Submit Booking Request";
    });
  });
}