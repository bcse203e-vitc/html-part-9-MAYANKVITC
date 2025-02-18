// Initialize the appointments array from localStorage or as an empty array
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Open Modal for Appointment Booking
function openModal(serviceName) {
    document.getElementById("appointmentModal").style.display = "flex";
    document.getElementById("serviceName").textContent = serviceName;
}

// Close Modal
function closeModal() {
    document.getElementById("appointmentModal").style.display = "none";
}

// Close Confirmation Modal
function closeConfirmationModal() {
    document.getElementById("confirmationModal").style.display = "none";
}

// Validate Form and Submit Appointment
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
    let emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
        displayError("emailError", "Please enter a valid email address.");
        errors = true;
    }

    // Phone Number validation (10 digits)
    if (!/^\d{10}$/.test(phone)) {
        displayError("phoneError", "Phone number must be 10 digits.");
        errors = true;
    }

    // Date & Time validation (must be in the future)
    let selectedDate = new Date(dateTime);
    let currentDate = new Date();
    if (selectedDate <= currentDate) {
        displayError("dateTimeError", "Preferred Date & Time must be in the future.");
        errors = true;
    }

    // Terms Checkbox validation
    if (!terms) {
        displayError("termsError", "You must agree to the terms and conditions.");
        errors = true;
    }

    // If no errors, submit the form and add the appointment
    if (!errors) {
        let appointment = {
            fullName,
            service: form.service.value,
            dateTime: selectedDate,
            status: "Pending"
        };

        // Add the appointment to the appointments array
        appointments.push(appointment);

        // Save the appointments array to localStorage
        localStorage.setItem("appointments", JSON.stringify(appointments));

        // Display Confirmation Popup
        displayConfirmation(appointment);

        // Close the modal after successful submission
        closeModal();
    }
}

// Display Error Messages
function displayError(elementId, message) {
    document.getElementById(elementId).textContent = message;
}

// Clear Error Messages
function clearErrors() {
    let errorElements = document.querySelectorAll(".error");
    errorElements.forEach(function (element) {
        element.textContent = '';
    });
}

// Display Booked Appointments in the Table
function displayAppointments() {
    let tableBody = document.getElementById("appointmentsTable").getElementsByTagName("tbody")[0];

    // Clear the table before updating
    tableBody.innerHTML = '';

    // Append each appointment as a new row in the table
    appointments.forEach(function (appointment) {
        let row = tableBody.insertRow();

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);

        cell1.textContent = appointment.fullName;
        cell2.textContent = appointment.service;
        cell3.textContent = formatDateTime(appointment.dateTime);
        cell4.textContent = appointment.status;
    });
}

// Format Date and Time for Display
function formatDateTime(date) {
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
    return new Date(date).toLocaleString('en-US', options);
}

// Display Appointment Confirmation
function displayConfirmation(appointment) {
    const confirmationMessage = `Thank you, ${appointment.fullName}! Your appointment for ${appointment.service} on ${formatDateTime(appointment.dateTime)} is confirmed.`;
    document.getElementById("confirmationMessage").textContent = confirmationMessage;
    document.getElementById("confirmationModal").style.display = "flex";
}

// Display Appointments on Page Load
window.onload = function () {
    displayAppointments();  // Display the appointments stored in localStorage when the page loads
};
