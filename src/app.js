// DOM Elements

const lightBtn = document.getElementById('light');
const darkBtn = document.getElementById('dark');
const solarBtn = document.getElementById('solar');

// Cache the User's theme in local storage so if user refreshes the page, the theme stays

const userTheme = localStorage.getItem('theme'); 

if(userTheme) {
    document.body.className = userTheme;
} else {
    document.body.className = "light";
}
// Event Listeners

// .classLis.toggle only ADDS new class to existing class/classes
lightBtn.addEventListener('click', () => {
    document.body.className = "light";
    // save user's theme in local storage (key-value pairs)
    localStorage.setItem('theme', 'light');
});

darkBtn.addEventListener('click', () => {
    document.body.className = "dark";
    // save user's theme in local storage (key-value pairs)
    localStorage.setItem('theme', 'dark');
});

solarBtn.addEventListener('click', () => {
    document.body.className = "solar";
    // save user's theme in local storage (key-value pairs)
    localStorage.setItem('theme', 'solar');
});