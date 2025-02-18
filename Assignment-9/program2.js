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
    let terms = form.terms.checked;

    let errors = [];

    // Full Name validation
    if (!fullName) {
        errors.push("Full Name is required.");
    }

    // Email validation (simple check)
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email || !emailPattern.test(email)) {
        errors.push("Please enter a valid email address.");
    }

    // Phone Number validation (must be 10 digits)
    if (!phone.match(/^\d{10}$/)) {
        errors.push("Phone number must be exactly 10 digits.");
    }

    // Terms and Conditions checkbox validation
    if (!terms) {
        errors.push("You must agree to the terms and conditions.");
    }

    // Show errors if any
    if (errors.length > 0) {
        alert(errors.join("\n"));
        return false; // Prevent form submission
    }

    // If no errors, submit form (for demo purpose we show success message)
    alert("Appointment booked successfully!");
    closeModal();
    form.reset();
    return true;
}
