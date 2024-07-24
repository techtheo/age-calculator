// ##  Getting references to HTML elements ## \\
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

// ##  Function to check if the day value is valid ## \\
function checkDay(day){
    let month = parseInt(input.month.value); // Get the month value from the input and convert it to an integer
    let year = parseInt(input.year.value);   // Get the year value from the input and convert it to an integer
    
    if(day < 1 || day > 31){ // Check if the day is between 1 and 31
        return false; // If not, return false
    }
    if(month === 2){ // Check if the month is February
        if(isLeapYear(year)){ // If the year is a leap year
            if(day > 29){ // Check if the day is greater than 29
                return false; // If yes, return false
            }
        } else { // If the year is not a leap year
            if(day > 28){ // Check if the day is greater than 28
                return false; // If yes, return false
            }
        }
    }
    // Check if the month has only 30 days
    if((month === 4 || month === 6 || month === 9 || month === 11) && day > 30){
        return false; // If the day is greater than 30 for these months, return false
    }
    // Check if the day is in the future compared to today
    if(year === dataExemplo.year && month === dataExemplo.month && day > dataExemplo.day){
        return false; // If the day is in the future, return false
    }
    return true; // If all checks pass, return true
}


// ## Function to check if the month value is valid ## \\
function checkMonth(month){
    // Check if the month is out of the valid range (1 to 12)
    if(month < 1 || month > 12){ // Month must be between 1 and 12
        return false; // Return false if the month is not valid
    }
    
    // Check if the year in the input field is the current year and if the month is in the future
    if(parseInt(input.year.value) === dataExemplo.year && month > dataExemplo.month){
        return false; // Return false if the month is in the future compared to today
    }
    
    return true; // Return true if the month is valid
}


// ## Function to check if the year value is valid ## \\
function checkYear(year){
    // Check if the year is less than 100 or greater than the current year
    if(year < 100 || year > dataExemplo.year){ // Year must be at least 100 and not in the future
        return false; // Return false if the year is not valid
    }
    return true; // Return true if the year is valid
}


// ## Function to validate all input values ## \\
function validateAllInput(inputString){
    // Splitting the input string into parts of (day, month, year)
    let partesData = inputString.split('/'); // Split the input string by '/' into an array of strings: [day, month, year]
    
    // Extract day, month, and year from the array and convert them to integers
    let dia = parseInt(partesData[0]); // Convert the first part (day) to an integer
    let mes = parseInt(partesData[1]); // Convert the second part (month) to an integer
    let ano = parseInt(partesData[2]); // Convert the third part (year) to an integer
    
    // Create a Date object with the input values
    let data = new Date(ano, mes - 1, dia); // Create a Date object with the year, month (0-based index, so subtract 1), and day
    
    // Check if the Date object matches the input values
    if(data.getDate() != dia || data.getMonth() != mes - 1 || data.getFullYear() != ano){
        return false; // Return false if the Date object does not match the input values (invalid date)
    }
    
    // Validate the individual input values
    if(!checkDay(dia) || !checkMonth(mes) || !checkYear(ano)){
        return false; // Return false if any of the individual validations fail
    }
    
    return true; // Return true if all validations pass
}




// ## Function to validate individual input values and show appropriate error messages ## \\
function validateIndividualInputs(){
    // Extract day, month, and year from the input fields and convert them to integers
    let day = parseInt(input.day.value); // Convert the day input value to an integer
    let month = parseInt(input.month.value); // Convert the month input value to an integer
    let year = parseInt(input.year.value); // Convert the year input value to an integer
    
    // Validate day
    if(!checkDay(day)){ // If the day is not valid
        if(year == dataExemplo.year && month == dataExemplo.month && day > dataExemplo.day){ // If the day is in the future
            showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_future); // Show future day error message
            inputError(input.day, input.day_label); // Add error styles to the day input and label
        }
        else{ // If the day is invalid but not in the future
            showErrorMessage(errorMessages.day, errorMessages.invalid_messages.day_invalid); // Show invalid day error message
            inputError(input.day, input.day_label); // Add error styles to the day input and label
        }
    }
    
    // Validate month
    if(!checkMonth(month)){ // If the month is not valid
        if(year == dataExemplo.year && month > dataExemplo.month){ // If the month is in the future
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month_future); // Show future month error message
            inputError(input.month, input.month_label); // Add error styles to the month input and label
        }
        else{ // If the month is invalid but not in the future
            showErrorMessage(errorMessages.month, errorMessages.invalid_messages.month_invalid); // Show invalid month error message
            inputError(input.month, input.month_label); // Add error styles to the month input and label
        }
    }
    
    // Validate year
    if(!checkYear(year)){ // If the year is not valid
        if(year > dataExemplo.year){ // If the year is in the future
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_future); // Show future year error message
            inputError(input.year, input.year_label); // Add error styles to the year input and label
        }
        else{ // If the year is invalid but not in the future
            showErrorMessage(errorMessages.year, errorMessages.invalid_messages.year_invalid); // Show invalid year error message
            inputError(input.year, input.year_label); // Add error styles to the year input and label
        }
    }
}



// ## Function to display an error message ## \\
function showErrorMessage(errorMessage, message){
    errorMessage.textContent = message; // Set the text content of the error message
    errorMessage.style.display = 'block'; // Show the error message
}

// ## Function to hide an error message ## \\
function hideErrorMessage(errorMessage){
    errorMessage.style.display = 'none'; // Hide the error message
}

// ## Function to hide all error messages ## \\
function hideAllErrorMessages(){
    // Call hideErrorMessage for each error message element to hide them
    hideErrorMessage(errorMessages.day); // Hide the error message for the day input
    hideErrorMessage(errorMessages.month); // Hide the error message for the month input
    hideErrorMessage(errorMessages.year); // Hide the error message for the year input
}

// ## Function to reset input field styles to normal ## \\
function normalInput(){
    // Call inputNormal for each input field and its corresponding label to remove error styles
    inputNormal(input.day, document.getElementById('day-label')); // Reset styles for the day input and label
    inputNormal(input.month, document.getElementById('month-label')); // Reset styles for the month input and label
    inputNormal(input.year, document.getElementById('year-label')); // Reset styles for the year input and label
}



// ## Function to clear the result fields ## \\
function clearResult(){
    // Set the text content of each result field to '--'
    result.year.textContent = '--'; // Set the year result to '--'
    result.month.textContent = '--'; // Set the month result to '--'
    result.day.textContent = '--'; // Set the day result to '--'
}

// ## Function to add error styles to an input field ## \\
function inputError(input, label){
    // Add CSS classes to the input field and its label to indicate an error
    input.classList.add('empty-input'); // Add error class to input to apply error styling
    label.classList.add('empty-text'); // Add error class to label to apply error styling
}

// ## Function to remove error styles from an input field ## \\
function inputNormal(input, label){
    // Remove CSS classes from the input field and its label to reset styling
    input.classList.remove('empty-input'); // Remove error class from input to reset styling
    label.classList.remove('empty-text'); // Remove error class from label to reset styling
}



// ## Function to show error message for empty inputs ## \\
function showEmptyInput(valueInput, errorMessage, label){
    // Check if the input field is empty
    if(valueInput.value === ''){ 
        // Display an error message indicating that the field is required
        showErrorMessage(errorMessage, errorMessages.empty_message); 
        // Apply error styling to the input field and its label
        inputError(valueInput, label); 
        return; // Exit the function if the input is empty
    }
    // Reset the input field and label styling if the field is not empty
    inputNormal(valueInput, label); 
}

// ## Function to check all inputs and validate them ## \\
function checkAllInput() {
    // Hide all existing error messages
    hideAllErrorMessages(); 
    // Reset all input field styles to their normal state
    normalInput(); 

    // Check if any of the input fields (day, month, year) are empty
    if(input.day.value === '' || input.month.value === '' || input.year.value === '') {
        // Show error messages for empty fields and apply error styling
        showEmptyInput(input.day, errorMessages.day, input.day_label); 
        showEmptyInput(input.month, errorMessages.month, input.month_label); 
        showEmptyInput(input.year, errorMessages.year, input.year_label); 
        return false; // Return false if any input is empty
    }

    // Validate the values of all inputs (day, month, year)
    if(!validateAllInput(input.inputToString())){
        // Validate individual inputs and display specific error messages if necessary
        validateIndividualInputs(); 
        return false; // Return false if any input value is invalid
    }
    
    return true; // Return true if all inputs are valid
}

// ## Function to check if a year is a leap year ## \\
function isLeapYear(year) {
    // Return true if the year is divisible by 4 but not by 100, or divisible by 400
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

// ## Function to calculate the number of days in a given month ## \\
function getDaysInMonth(month, year) {
    // Create a Date object for the last day of the given month and year
    // The month parameter is zero-based (0 for January, 1 for February, etc.)
    return new Date(year, month, 0).getDate();
}


// ## Function to calculate the age based on the input values ## \\
function calculateAge(){
    // Extract the birth year from the input field and convert it to an integer
    let birthYear = parseInt(input.year.value);
    // Extract the birth month from the input field and convert it to an integer
    let birthMonth = parseInt(input.month.value);
    // Extract the birth day from the input field and convert it to an integer
    let birthDay = parseInt(input.day.value);
    
    // Get the current year from the `dataExemplo` object
    let currentYear = dataExemplo.year;
    // Get the current month from the `dataExemplo` object
    let currentMonth = dataExemplo.month;
    // Get the current day from the `dataExemplo` object
    let currentDay = dataExemplo.day;
    
    // Calculate the initial difference in years
    let years = currentYear - birthYear;
    // Calculate the initial difference in months
    let months = currentMonth - birthMonth;
    // Calculate the initial difference in days
    let days = currentDay - birthDay;

    // If the days difference is negative, adjust the months and days
    if (days < 0) {
        // Subtract one month
        months--;
        // Get the previous month
        let previousMonth = currentMonth - 1;
        // If the previous month is less than or equal to 0, adjust to December of the previous year
        if (previousMonth <= 0) {
            previousMonth = 12;
            currentYear--;
        }
        // Add the number of days in the previous month to the days difference
        days += getDaysInMonth(previousMonth, currentYear);
    }
    // If the months difference is negative, adjust the years and months
    if (months < 0) {
        // Add 12 months
        months += 12;
        // Subtract one year
        years--;
    }

    // Display the calculated age in the respective result elements
    result.year.textContent = years;
    result.month.textContent = months;
    result.day.textContent = days;
}


// ## Function to calculate the number of days in a given month ## \\
function getDaysInMonth(month, year) {
    // Create a new Date object with the given year and month, and set the day to 0 to get the last day of the previous month
    // The month parameter should be 1-based (1 for January, 2 for February, etc.), so passing it as is to get the last day of that month
    // For example, if month = 2 (March) and year = 2024, it creates a Date object for February 29, 2024
    return new Date(year, month, 0).getDate(); // Return the number of days in the specified month
}

// ## Function to clear all input fields ## \\
function clearInputFields(){
    input.day.value = ''; // Set the value of the day input field to an empty string to clear it
    input.month.value = ''; // Set the value of the month input field to an empty string to clear it
    input.year.value = ''; // Set the value of the year input field to an empty string to clear it
}

// ## Add click event listener to the button ## \\
button.addEventListener('click', () => {
    // Check if all input values (day, month, year) are valid
    if(checkAllInput()) { 
        calculateAge(); // Call function to calculate the age if all inputs are valid
        clearInputFields(); // Clear the input fields after displaying the result
    }
    else{
        clearResult(); // Call function to clear the result fields if any input is invalid
    }
});

