
function init(){
    const dayNode = document.querySelector(".input-container .day");
    const monthNode = document.querySelector(".input-container .month");
    const yearNode = document.querySelector(".input-container .year");
    
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            commit(dayNode, monthNode, yearNode);
            console.log("enter");
        }
    });
}


function commit(dayNode, monthNode, yearNode){
    //reset all inputs to valid
    validInput(dayNode);
    validInput(monthNode);
    validInput(yearNode);

    try {
        let dayInt = validateDay(dayNode);
        let monthInt = validateMonth(monthNode);
        let yearInt = validateYear(yearNode);
    } catch (error) {
        invalidInput(error.affectedNode, error.message);
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



function validateMonth(monthNode){
    validInput(monthNode);

    let monthString = monthNode.querySelector("input").value;

    if(!isInt(monthString)){
        throw new InputError("Must be a valid month", monthNode);
    }

    let monthInt = parseInt(monthString);

    if(monthInt < 1 || monthInt > 12){
        throw new InputError("Must be a valid month", monthNode);
    }

}

function validateYear(){
    validInput(year);

    let yearString = year.querySelector("input").value;

    if(!isInt(yearString)){
        throw new InputError("Must be a valid year", yearNode);
    }

    let yearInt = parseInt(yearString);

    if(year <0 ){
        throw new InputError("Must be a valid year", yearNode);
    }
}


function validateDay(){
    validInput(day);
    
    let dayString = day.querySelector("input").value;

    if(!isInt(dayString)){
        invalidInput(day, "Must be a valid day");
        return 0;
    }

    let dayInt = parseInt(dayString);

    if(dayInt < 1 || dayInt > 31){
        invalidInput(day, "Must be a valid day");
        return 0;
    }

}



function isValidDate(dayInt, monthInt, yearInt){
    
    let monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

    // Adjust for leap years https://www.timeanddate.com/date/leapyear.html#rules
    if(yearInt % 400 == 0 || (yearInt % 100 != 0 && yearInt % 4 == 0))
        monthLength[1] = 29;

    if(dayInt < 1 || dayInt > monthLength[monthInt - 1]){
        return false;
    }

    return true;
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
    //make h2 red
    node.querySelector("h2").style.color = "var(--light-red)";
    
    //give input red border
    node.querySelector("input").style.borderColor = "var(--light-red)";


    //make error message appear below input
    errorMsg = node.querySelector(".error-msg");
    errorMsg.style.display = "block";
    errorMsg.innerHTML = message;

}

class InputError extends Error{
    constructor(message, node){
        super(message);
        this.affectedNode = node;
    }
}

//first check string is comprised of only digits
//convert string to int
//check if int forms valid date

init();