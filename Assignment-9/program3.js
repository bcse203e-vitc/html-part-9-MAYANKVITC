// Open Modal
function openModal(serviceName) {
    document.getElementById("appointmentModal").style.display = "flex";
    document.getElementById("serviceName").textContent = serviceName;
}

// Close Modal
function closeModal() {
    document.getElementById("appointmentModal").style.display = "none";
}

// Validate Form
function validateForm(event) {
    event.preventDefault(); // Prevent form submission to allow validation

    let form = document.getElementById("appointmentForm");
    let fullName = form.fullName.value.trim();
    let email = form.email.value.trim();
    let phone = form.phone.value.trim();
    let dateTime = form.dateTime.value;
    let terms = form.terms.checked;

    let errors = false;

    // Clear previous error messages
    clearErrors();

    // Full Name validation
    if (!fullName) {
        displayError("fullNameError", "Full Name is required.");
        errors = true;
    }

    // Email validation (simple check)
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a
