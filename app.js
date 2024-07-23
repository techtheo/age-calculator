// Get references to HTML elements
const button = document.getElementById('calculate-button'); // Get the button element for calculating age
const input = {
    day: document.getElementById('day-input'), // Get the input element for the day
    month: document.getElementById('month-input'), // Get the input element for the month
    year: document.getElementById('year-input'), // Get the input element for the year
    inputToString: function(){
        // Return a string in the format "day/month/year" from the input values
        return `${this.day.value}/${this.month.value}/${this.year.value}`;
    },
    day_label: document.getElementById('day-label'), // Get the label element for the day
    month_label: document.getElementById('month-label'), // Get the label element for the month
    year_label: document.getElementById('year-label') // Get the label element for the year
};
const result = {
    year: document.getElementById('year-value'), // Get the element to display the calculated year result
    month: document.getElementById('month-value'), // Get the element to display the calculated month result
    day: document.getElementById('day-value') // Get the element to display the calculated day result
};
const dataExemplo = {
    data: new Date(), // Get the current date and time
    day: new Date().getDate(), // Get the current day of the month
    month: new Date().getMonth() + 1, // Get the current month (JavaScript months are zero-based, so add 1)
    year: new Date().getFullYear() // Get the current year
};
const errorMessages = {
    day: document.getElementById('error-d'), // Get the element to display day error messages
    month: document.getElementById('error-m'), // Get the element to display month error messages
    year: document.getElementById('error-y'), // Get the element to display year error messages
    empty_message: "This field is required", // Error message for empty fields
    invalid_messages: {
        day_invalid: "Must be a valid day", // Error message for invalid day
        day_future: "Must be a day in the past", // Error message for future day
        month_invalid: "Must be a valid month", // Error message for invalid month
        month_future: "Must be a month in the past", // Error message for future month
        year_invalid: "Must be a valid year", // Error message for invalid year
        year_future: "Must be a year in the past" // Error message for future year
    }
};

// Function to check if the day value is valid
function checkDay(day){
    let month = parseInt(input.month.value);
    let year = parseInt(input.year.value);
    
    if(day < 1 || day > 31){ // Day must be between 1 and 31
        return false;
    }
    if(month === 2){ // February checks
        if(isLeapYear(year)){
            if(day > 29){ // Leap year check
                return false;
            }
        } else {
            if(day > 28){ // Non-leap year check
                return false;
            }
        }
    }
    // Check months with only 30 days
    if((month === 4 || month === 6 || month === 9 || month === 11) && day > 30){
        return false;
    }
    // Check if the day is in the future compared to today
    if(year === dataExemplo.year && month === dataExemplo.month && day > dataExemplo.day){
        return false;
    }
    return true;
}

// Function to check if the month value is valid
function checkMonth(month){
    if(month < 1 || month > 12){ // Month must be between 1 and 12
        return false;
    }
    // Check if the month is in the future compared to today
    if(parseInt(input.year.value) === dataExemplo.year && month > dataExemplo.month){
        return false;
    }
    return true;
}

// Function to check if the year value is valid
function checkYear(year){
    if(year < 100 || year > dataExemplo.year){ // Year must be at least 100 and not in the future
        return false;
    }
    return true;
}

// Function to validate all input values
function validateAllInput(inputString){
    let partesData = inputString.split('/'); // Split input string into parts (day, month, year)
    let dia = parseInt(partesData[0]); // Extract day
    let mes = parseInt(partesData[1]); // Extract month
    let ano = parseInt(partesData[2]); // Extract year
    let data = new Date(ano, mes - 1, dia); // Create a Date object with the input values
    // Check if the Date object matches the input values
    if(data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano){
        return false;
    }
    if(!checkDay(dia) || !checkMonth(mes) || !checkYear(ano)){
        return false;
    }
    return true;
}

// Function to validate individual input values and show appropriate error messages
function validateIndividualInputs(){
    let day = parseInt(input.day.value);
    let month = parseInt(input.month.value);
    let year = parseInt(input.year.value);
    
    // Validate day
    if(!checkDay(day)){
        if(year == dataExemplo.year && month == dataExemplo.month && day > dataExemplo.day){
            showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_future);
            inputError(input.day, input.day_label);
        }
        else{
            showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_invalid);
            inputError(input.day, input.day_label);
        }
    }
    
    // Validate month
    if(!checkMonth(month)){
        if(year == dataExemplo.year && month > dataExemplo.month){
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month_future);
            inputError(input.month, input.month_label);
        }
        else{
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month_invalid);
            inputError(input.month, input.month_label);
        }
    }
    
    // Validate year
    if(!checkYear(year)){
        if(year > dataExemplo.year){
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_future);
            inputError(input.year, input.year_label);
        }
        else{
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_invalid);
            inputError(input.year, input.year_label);
        }
    }
}

// Function to display an error message
function showErrorMessage(errorMessage, message){
    errorMessage.textContent = message; // Set the text content of the error message
    errorMessage.style.display = 'block'; // Show the error message
}

// Function to hide an error message
function hideErrorMessage(errorMessage){
    errorMessage.style.display = 'none'; // Hide the error message
}

// Function to hide all error messages
function hideAllErrorMessages(){
    hideErrorMessage(errorMessages.day);
    hideErrorMessage(errorMessages.month);
    hideErrorMessage(errorMessages.year);
}

// Function to reset input field styles to normal
function normalInput(){
    inputNormal(input.day, document.getElementById('day-label'));
    inputNormal(input.month, document.getElementById('month-label'));
    inputNormal(input.year, document.getElementById('year-label'));
}

// Function to clear the result fields
function clearResult(){
    result.year.textContent = '--'; // Set the year result to '--'
    result.month.textContent = '--'; // Set the month result to '--'
    result.day.textContent = '--'; // Set the day result to '--'
}

// Function to add error styles to an input field
function inputError(input, label){
    input.classList.add('empty-input'); // Add error class to input
    label.classList.add('empty-text'); // Add error class to label
}

// Function to remove error styles from an input field
function inputNormal(input, label){
    input.classList.remove('empty-input'); // Remove error class from input
    label.classList.remove('empty-text'); // Remove error class from label
}

// Function to show error message for empty inputs
function showEmptyInput(valueInput, errorMessage, label){
    if(valueInput.value === ''){ // Check if the input value is empty
        showErrorMessage(errorMessage, errorMessages.empty_message); // Show empty field error message
        inputError(valueInput, label); // Add error styles to the input
        return;
    }
    inputNormal(valueInput, label); // Reset input styles if not empty
}

// Function to check all inputs and validate them
function checkAllInput() {
    hideAllErrorMessages(); // Hide all error messages
    normalInput(); // Reset all input styles to normal
    // Check if any input is empty
    if(input.day.value === '' || input.month.value === '' || input.year.value === '') {
        showEmptyInput(input.day, errorMessages.day, input.day_label); // Show error for empty day
        showEmptyInput(input.month, errorMessages.month, input.month_label); // Show error for empty month
        showEmptyInput(input.year, errorMessages.year, input.year_label); // Show error for empty year
        return false; // Return false if any input is empty
    }
    // Validate all input values
    if(!validateAllInput(input.inputToString())){
        validateIndividualInputs(); // Validate individual inputs and show errors
        return false;
    }
    return true; // Return true if all inputs are valid
}

// Function to check if a year is a leap year
function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// Function to calculate the number of days in a given month
function getDaysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Function to calculate the age based on the input values
function calculateAge(){
    let birthYear = parseInt(input.year.value);
    let birthMonth = parseInt(input.month.value);
    let birthDay = parseInt(input.day.value);
    
    let currentYear = dataExemplo.year;
    let currentMonth = dataExemplo.month;
    let currentDay = dataExemplo.day;
    
    let years = currentYear - birthYear;
    let months = currentMonth - birthMonth;
    let days = currentDay - birthDay;

    if (days < 0) {
        months--;
        let previousMonth = currentMonth - 1;
        if (previousMonth <= 0) {
            previousMonth = 12;
            currentYear--;
        }
        days += getDaysInMonth(previousMonth, currentYear);
    }
    if (months < 0) {
        months += 12;
        years--;
    }

    // Display the calculated age
    result.year.textContent = years;
    result.month.textContent = months;
    result.day.textContent = days;
}

// Function to clear all input fields
function clearInputFields(){
    input.day.value = ''; // Clear the day input field
    input.month.value = ''; // Clear the month input field
    input.year.value = ''; // Clear the year input field
}

// Add click event listener to the button
button.addEventListener('click', () => {
    if(checkAllInput()) { // Check all inputs
        calculateAge(); // Calculate age if inputs are valid
        clearInputFields(); // Clear the input fields after displaying the result
    }
    else{
        clearResult(); // Clear result if inputs are invalid
    }
});
