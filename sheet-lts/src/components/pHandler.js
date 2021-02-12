

/** char is capitol letter */
const isCapLetter = (charCode) => Boolean( charCode >= 65 && charCode <= 90 );

/** char is a number in form of a string */
// const isNumberStr = (charCode) => Boolean( charCode >= 48 && charCode <= 57 ) ? true : false;

const isNumberStr = (charCode) => {
   
    if(charCode === undefined){
        return false;
    }
    else {
        if(typeof(charCode) === "number"){
            if( Boolean( charCode >= 48 && charCode <= 57 ) )
                return true;
            else 
                return false;
        }


        else if(charCode !== 'number'){
            if( Boolean( charCode.charCodeAt() >= 48 && charCode.charCodeAt() <= 57 ) )
                return true;
            else 
                return false;
        }
        
    }
   
   
    
    
}

/** determine if particular char is included as possible char  */
/*
* '*'=42 ,'+'=43,'-'=45,'/'=47 <- operators
* from '0'=48 to '9'=57
* from 'A'=65  to 'Z'=90 
*/
function isIncluded(c){
    // if c is empty || not provided return false
    if ( Boolean(c.length === 0 || c.length === undefined) )
        return false;

    // check if c is a single char
    // if not, return false
    if (c.length > 1)
        return false;

    // char code of an argument char
    const charCode = c.charCodeAt();
    // digits 
    if( Boolean( isNumberStr(charCode) ))
        return true;
    else{
        // capital letters
        if( isCapLetter(charCode) )
            return true;
        // if( Boolean(charCode >= 65 && charCode <= 90) )
        // return true;
        
        // operators || other single chars not in other ranges
        
        switch(charCode){
            case 37: // '%'
            case 40: // '('
            case 41: // ')'
            case 42: // '*'
            case 43: // '+'
            case 45: // '-'
            case 46: // '.'
            case 47: // '/'
            return true;
            
            default:

        
        }
    }
    
    // // if no other condition is meet, return false
    return false;
}
/** 
 * @description calculate and return sum in a form of an id string,
 * used by mHandler to calculate nums
 * @param start start of search
 * @param end end of search 
 * 
  */
export function getSum(start, end){
    // holds id's 
    let idHolder = '';

    // Sum(C1,C2)

   
    // start[1] (e.g: 1) -> end[1] (e.g: 4,11)
    for(let y=parseInt(start[1]); y<=parseInt(end.substr(1)); y++){
        
        // start[1] (e.g: A) -> end[1] (e.g: E)
        for(let x=start[0].charCodeAt()-65; x<=end[0].charCodeAt()-65; x++){
           
            // 1.use 65 (char code of 'A'), add x to it and then convert that to char
            // 2. convert y to string and add it
            idHolder += String.fromCharCode(65 + x)
            + y.toString();
         
            // if both loops are at the end of iteration do nothing    
            if( Boolean( x === (end[0].charCodeAt()-65) && y ===parseInt(end.substr(1)) ) );
            // otherwise:
            else 
                // append idHolder with '+' sign
                idHolder += '+';

            
         
        }
    }

    // idHolder.split('').

    return idHolder;
}
/** return sum of ids with division */
export function getAvg(start,end){
    // assign sum of ids to avg 
    let avg = getSum(start,end);
    // add division
    avg =  `(${avg})/${ avg.split('+').length }`;
    
    return avg;

}

/** handles mathematical operations */
export function mHandler(input){


    // if input is empty (undefined), return false
    if( Boolean(input === undefined) )
        return false;
  
    // make sure input is a string
    input = input.toString();


    // check if the math functions have been used
    
    switch(input.substr(0,4)){
        case 'Sum(':
        
            input = getSum(input.substr(4,2), input.substr(7,input.indexOf(')')-7) );
            // console.log(input);
        break;
        case 'Avg(':
            input = getAvg(input.substr(4,2), input.substr(7,input.indexOf(')')-7) );
            // console.log(input);
        break;
        // // in case no math function has been choosen 
        // default:
        //     console.log('something else');
        // break;
    }

    // create inputArr
    // filter-out whitespaces
    const inputArr = input.split('').filter(e => e !== ' ');

    

    // if inputArr has something besides digit AND closed parentheses at the end  
    // return false 
    if( Boolean( !isNumberStr(inputArr[inputArr.length-1]) 
    &&  inputArr[inputArr.length-1] !== ')' ) )
        return false;


    // stores id and after conversion - value at id
    let buffer = '';

    

    for( const e in inputArr ){
        // if e isn't included return false
        if( !isIncluded( inputArr[e]) ) 
        return false; 

        
        // if e is capitol letter (possible begining of id)
        // assign it to buffer  
        if(  isCapLetter( inputArr[e].charCodeAt() )  ){
            buffer = inputArr[e];
            


            // looks for number to complete the id and find assigned value
            // otherwise return false
            if(  Boolean( isCapLetter(buffer.charCodeAt()) && isNumberStr(inputArr[ parseInt(e) +1 ].charCodeAt()) )  ){
                // debugger;
                // while loop index 
                let i = parseInt(parseInt(e)+1);
                // while inputArr[i] is a number string: 
                while( isNumberStr( inputArr[i]) ){
                    // debugger;
                    // add new data to a buffer
                    buffer += inputArr[i];
                    // increment index  
                    i++;
                }
                // if buffer is containing something beside letter
                // used to prevent single letters from getting into eval()
                if(buffer.length > 1){
                    // dom object being source of id
                    buffer = document.getElementById(buffer);
                    debugger;
                    // replace point begining with e to a value of buffer
                    // being of appropriate length
                    inputArr.splice( parseInt(e), 
                    buffer.value.length, 
                    buffer.value.toString() );
                    debugger;
                }
                
            }
            else 
                return false;
            
        }
    }
       

   

    // !!! WARNING !!!
    // use eval with caution unless some horrible things may happen
    // input has been filtered out for the sake of safety 
    // nevertheless, handle with care
    // return true;

    // try to return
    try{
        return eval( inputArr.reduce( (prev,cur) => prev+=cur ) );
    }
    // if cannot return (e.g: input is broken) return false 
    catch{
        return false;
    }
   





}

/** handles all kinds of input inside of panels
 *  basically a wrapper around mHandler used to
 *  deal with wider range of inputs, e.g:
 *  non-mathematic strings
 */
export function inputHandler(input){

    // if input is undefined:
    if(input === undefined)
        // return message
        return 'wrong input';

    // mHandler output 
    const result = mHandler(input);
    // if the input isn't false, return result
    return (result !== false) ? result : 
    // else check if result.toString() isn't equal to empty string
        // if true return 'bad input' 
        // if false return  empty string 
        ( input.toString() !== '' ? 'wrong input' : '' );
}