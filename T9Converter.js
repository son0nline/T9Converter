// 
var B0 = " 0"
var B1 = ".,'?!1"
var B2 = "abc2"
var B3 = "def3"
var B4 = "ghi4"
var B5 = "jkl5"
var B6 = "mno6"
var B7 = "pqrs7"
var B8 = "tuv8"
var B9 = "wxyz9"

var ArrNum = [B0,B1,B2,B3,B4,B5,B6,B7,B8,B9]


function replaceZeroToSpace(srcStr){
    const regexZero = /0/ig;    
    return srcStr.replace(regexZero, " ");
}


/// string to T9 number
function ToT9Code(input){

    let len = input.length;
    if (len <=0 )
        return "";

    let rsString = "";
    let ch = ''
    let chk = -1;

    for (let charIdx = 0; charIdx < len; charIdx++)
    {
        ch = input.charAt(charIdx).toLowerCase();

        if(ch == " "){
            rsString += "0";
            continue;
        }

        for(let numberIndex = 0 ; numberIndex < ArrNum.length; numberIndex++){
            chk = ArrNum[numberIndex].indexOf(ch);
            if (chk>=0){
                let ar = new Array(chk+1).fill(numberIndex.toString());

                rsString += (ar.join('')+" ");

                chk = -1;
                break;
            }
        }
    }
    
    return replaceZeroToSpace(rsString);
};

function FromT9Code(input){
    input = input.trim();
    let len = input.length;
    if (len <=0 )
        return "";

    let charIdx = 0;
    
    let ch = input.charAt(charIdx).toLowerCase();
    let charCount = 0;
    let nextCh = "";

    let numberIndex = 0;
    let rsString = "";

    charIdx++;
    charCount++;
 
    while(charIdx<len){
        nextCh = input.charAt(charIdx).toLowerCase();

        if(ch != nextCh || charIdx==len-1){
            if(ch != " ") {
                numberIndex = parseInt(ch);
                if(charIdx==len-1){
                    charCount++;
                }
                rsString += ArrNum[numberIndex].charAt(charCount-1);
            }
            else {
                
                if(charCount>1){
                    rsString += " ";
                }

                if(charIdx==len-1) {
                    numberIndex = parseInt(nextCh);
                    rsString += ArrNum[numberIndex].charAt(charCount-1);
                }
            }
            ch = nextCh;
            charCount = 0;
        }

        charIdx++;
        charCount++;
    }

    return rsString;
};


function testFnc(input){
    console.log("\nInput: " + input);
    let test = ToT9Code(input);
    console.log("Endcode: " + test);

    test = FromT9Code(test);
    console.log("Decode: " + test);
    console.log("--------");
}

var inputTest = "if you can read this, you're too old"
testFnc(inputTest)

inputTest = "can"
testFnc(inputTest)

inputTest = "this"
testFnc(inputTest)

inputTest = "old"
testFnc(inputTest)

