
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

    let dmyInts = dmyStrToInt(dayMonthYear)

    //do not continue if any of inputs are not valid integers 
    if (dmyInts.includes(-1)){
        console.log(dmyInts, "Abort");
        return null;
    }

    //check individually if day month and year values are valid

    console.log(dmyInts)
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
        let title = node.querySelector("h2").innerHTML;
        let inputString = node.querySelector("input").value;
        if(isInt(inputString)){
            output.push(parseInt(inputString));
        } else {
            let message = `Must be a valid ${title.toLowerCase()}`;
            invalidInput(node, message);
            output.push(-1);
        }
    }
    return output;
}


function validateMonth(dmyInts){

    let monthInt = dmyInts[1];

    if(monthInt < 1 || monthInt > 12){
        invalidInput("Must be a valid month", monthNode);
    }

}

function validateYear(yearNode){

    let yearString = yearNode.querySelector("input").value;

    if(!isInt(yearString)){
        throw new InputError("Must be a valid year", yearNode);
    }

    let yearInt = parseInt(yearString);

    if(year <0 ){
        throw new InputError("Must be a valid year", yearNode);
    }
}


function validateDay(dayNode){
    
    let dayString = dayNode.querySelector("input").value;

    if(!isInt(dayString)){
        throw new InputError("Must be a valid day", dayNode);
    }

    let dayInt = parseInt(dayString);

    if(dayInt < 1 || dayInt > 31){
        throw new InputError("Must be a valid day", dayNode);
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