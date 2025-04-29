// Function to show the "Home" section
function showHome() {
    document.getElementById('home-section').style.display = 'block';
    document.getElementById('about-us-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'none';
}

// Function to show the "About Us" section
function showAboutUs() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('about-us-section').style.display = 'block';
    document.getElementById('contact-section').style.display = 'none';
}

// Function to show the "Contact" section
function showContact() {
    document.getElementById('home-section').style.display = 'none';
    document.getElementById('about-us-section').style.display = 'none';
    document.getElementById('contact-section').style.display = 'block';
}

// Function to show the signup modal when clicking "Get Started"
function showSignup() {
    document.getElementById('signup-modal').style.display = 'block';
}

// Function to close a modal
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close the modal if clicked outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        closeModal('signup-modal');
    }
}

// Function to show the login modal when clicking "Login"
function showLogin() {
    document.getElementById('login-modal').style.display = 'block';
}
