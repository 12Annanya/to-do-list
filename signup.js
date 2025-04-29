const signInBtnLink = document.querySelector('.signInBtn-link');
const signUpBtnLink = document.querySelector('.signUpBtn-link');
const signUpBtn = document.querySelector('.sign-up button');
const wrapper = document.querySelector('.wrapper');
const formWrapper = document.querySelector('.form-wrapper');
const container = document.querySelector('.container');

// Toggle between login and sign-up form
signUpBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});

signInBtnLink.addEventListener('click', () => {
    wrapper.classList.toggle('active');
});