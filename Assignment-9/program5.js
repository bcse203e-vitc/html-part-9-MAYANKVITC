// Initialize the appointments array from localStorage or as an empty array
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// Open Modal
function openModal(serviceName) {
    document.getElementById("appointmentModal").style.display = "flex";
    document.getElementById("serviceName").textContent = serviceName;
}

//
