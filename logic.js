// Problem: JS relies on the structure of the HTML

// TODO: refactor with a datetime library

//bug: year 20 becomes 1920 


function init(){
    const dayMonthYear = document.querySelectorAll(".input-container div");
    
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            commit(dayMonthYear);
            console.log("enter");
        }
    });
}


function commit(dayMonthYear){
    //reset all inputs to valid
    dayMonthYear.forEach(node => {validInput(node)});

    //convert inputs to ints
    let dmyInts = dmyStrToInt(dayMonthYear);

    //check if month and day are in valid range
    dmyInts = dmyInRange(dmyInts);

    console.log(dmyInts)

    //highlight error and do not continue if any of inputs are not valid  
    for (let i=0; i<dayMonthYear.length; i++){
        if (dmyInts[i] === -1){
            let node = dayMonthYear[i];
            let title = node.querySelector("h2").innerHTML;
            let message = `Must be a valid ${title.toLowerCase()}`;
            invalidInput(node, message);
            var exit = true;
        }
    }
    if (exit) return null;

    //check if ints form a valid date
    if(isInvalidDate(dmyInts)){
        invalidInput(dayMonthYear[0], "Must be a valid date");
        invalidInput(dayMonthYear[1], "");
        invalidInput(dayMonthYear[2], "");
        return null;
    }

    //if we reach here dmyInts contains a valid date
    //creating Date object using constructor new Date(year, monthIndex, day) where 0 = Jan
    const birthDate = new Date(dmyInts[2], dmyInts[1] - 1, dmyInts[0]);

    //check if date is in the future
    const now = new Date();
    if(birthDate > now){
        invalidInput(dayMonthYear[0], "")
        invalidInput(dayMonthYear[1], "")
        invalidInput(dayMonthYear[2], "Must be in the past")
        return null;
    }

    //we now have a valid birthDate in the past, time to calculate.
    let age = calculateAge(birthDate);

    displayAge(age);

    console.log(age)

    console.log(dmyInts)
}

//wait, how to calculate age in years, months and days?
//code nabbed from https://stackoverflow.com/questions/17732897/difference-between-two-dates-in-years-months-days-in-javascript/49201872#49201872
function calculateAge(birthDate){
    const now = new Date();

    const startYear = birthDate.getFullYear();
    const february = (startYear % 4 === 0 && startYear % 100 !== 0) || startYear % 400 === 0 ? 29 : 28;
    const daysInMonth = [31, february, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    let yearDiff = now.getFullYear() - startYear;
    let monthDiff = now.getMonth() - birthDate.getMonth();
    if (monthDiff < 0) {
        yearDiff--;
        monthDiff += 12;
    }
    let dayDiff = now.getDate() - birthDate.getDate();
    if (dayDiff < 0) {
        if (monthDiff > 0) {
        monthDiff--;
        } else {
        yearDiff--;
        monthDiff = 11;
        }
        dayDiff += daysInMonth[birthDate.getMonth()];
    }

    //return yearDiff + 'Y ' + monthDiff + 'M ' + dayDiff + 'D';

    return [yearDiff, monthDiff, dayDiff];

}

function displayAge(age){
    const ageSpans = document.querySelectorAll(".output span");

    for(let i=0; i< age.length; i++){
        ageSpans[i].innerHTML = age[i];
    }


}

//regex to validate whether string contains only digits
function isInt(str){
    return /^\d+$/.test(str);
}

// so hard to correctly parse string to date 
// look into npm to use some library


//must be valid day / month / year
//must be in the past 

//Manually validating the date as JS inbuilt methods are NOT HELPFUL -- see below.
/* const invalidDate = new Date('2000-02-31');
console.log(invalidDate.toString()) //Thu Mar 02 2000 ???? */
//Could use Moment.js (being phased out)


//converts day month and year inputs to integer or -1 if not possible
function dmyStrToInt(dayMonthYear){

    //array containing input strings converted to int for day month year
    // -1 if input string not an int
    output = [];

    for (const node of dayMonthYear){
        const str = node.querySelector("input").value;
        isInt(str) ? output.push(parseInt(str)) : output.push(-1)
    }
    return output;
}

//checks if day is in the range 1-31 and month in the range 1-12
function dmyInRange(dmyInts){
    let output = [...dmyInts];
    
    const dayInt = dmyInts[0];
    const monthInt = dmyInts[1];

    if(dayInt < 1 || dayInt > 31){
        output[0] = -1;
    }
    
    if(monthInt < 1 || monthInt > 12){
        output[1] = -1;
    }
    return output;
}


//returns true for invalid dates such as 31-02-2000
function isInvalidDate(dmyInts){

    const dayInt = dmyInts[0];
    const monthInt = dmyInts[1];
    const yearInt = dmyInts[2];

    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years https://www.timeanddate.com/date/leapyear.html#rules
    if(yearInt % 400 == 0 || (yearInt % 100 != 0 && yearInt % 4 == 0))
        monthLength[1] = 29;

    return(dayInt > monthLength[Math.abs(monthInt) - 1]);

}


function validInput(node){
    //reset h2 color
    node.querySelector("h2").style.color = "";

    //reset input border color
    node.querySelector("input").style.borderColor = "";

    //remove error message
    errorMsg = node.querySelector(".error-msg");
    errorMsg.style.display = "none"

}

function invalidInput(node, message){
    //reset age
    const ageSpans = document.querySelectorAll(".output span");
    ageSpans.forEach(s => {s.innerHTML = "--"});

    //make h2 red
    node.querySelector("h2").style.color = "var(--light-red)";
    
    //give input red border
    node.querySelector("input").style.borderColor = "var(--light-red)";


    //make error message appear below input
    errorMsg = node.querySelector(".error-msg");
    errorMsg.style.display = "block";
    errorMsg.innerHTML = message;
}

//first check string is comprised of only digits
//convert string to int
//check if int forms valid date

init();