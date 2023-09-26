const base26 = require('base26')
const leb = require('leb128')

/////////////////////////
//
/////////////////////////

function encodeSymbol(symbol){
    let symbolBase26 = base26.from(symbol);
    return leb.unsigned.encode(symbolBase26);
}

function decodeSymbol(symbolBuffer){
    let symbolNumber= leb.unsigned.decode(symbolBuffer);
    return base26.to(symbolNumber);
}

/////////////////////////
//
/////////////////////////

function encodeUint(number){
    return leb.unsigned.encode(number);
}

function decodeUint(number){
    return leb.unsigned.decode(number);
}


/////////////////////////
//
/////////////////////////


function decodeBuffer(hexBuffer){
    let params = [];
    let lastStart = 0;
    for(let i=0; i< hexBuffer.length; i++){
        if(hexBuffer[i] < 128){
            params.push(hexBuffer.slice(lastStart,i+1))
            lastStart = i+1;
        }
    }
    return params;
}


module.exports = { encodeSymbol, decodeSymbol, encodeUint, decodeUint, decodeBuffer}