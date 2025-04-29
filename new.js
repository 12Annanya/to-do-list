const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const loginBtn = document.querySelector('.sign-in button');
const signUpBtn = document.querySelector('.sign-up button');
const wrapper = document.querySelector('.wrapper');
const formWrapper = document.querySelector('.form-wrapper');
const container = document.querySelector('.container');
const forgotPasswordLink = document.querySelector('.forgotPasswordLink');  // Ensure this is defined

// Toggle between login and sign-up form
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

// Handle forgot password
forgotPasswordLink.addEventListener('click', (e) => {
    e.preventDefault();
    const email = prompt('Enter your email:');
    const storedEmail = localStorage.getItem('email');

    if (email === storedEmail) {
        const newPassword = prompt('Enter your new password:');
        if (newPassword) {
            const passwordValidation = /^(?=.*\d).{8,}$/; // Validate new password
            if (!passwordValidation.test(newPassword)) {
                alert('Password must be at least 8 characters long and contain at least one number.');
            } else {
                localStorage.setItem('password', newPassword);
                alert('Your password has been reset successfully!');
            }
        } else {
            alert('Password cannot be empty.');
        }
    } else {
        alert('Email not found.');
}
});
