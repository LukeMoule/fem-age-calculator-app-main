// Problem: JS relies on the structure of the HTML


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
        var exit = true;
    }
    if (exit) return null;



    //if we reach here dmyInts contains a valid date
    //creating Date object using constructor new Date(year, monthIndex, day) where 0 = Jan

    const birthDate = new Date(dmyInts[2], dmyInts[1] - 1, dmyInts[0]);

    //check if date is in the future
    const now = new Date();

    if(!(birthDate < now)){
        invalidInput(dayMonthYear[0], "")
        invalidInput(dayMonthYear[1], "")
        invalidInput(dayMonthYear[2], "Must be in the past")
    }
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
        const str = node.querySelector("input").value;
        isInt(str) ? output.push(parseInt(str)) : output.push(-1)
    }
    return output;
}

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