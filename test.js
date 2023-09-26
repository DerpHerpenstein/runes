const helpers = require("./src/helpers")
const runes = require("./src/runes")

function testSymbolEncodeDecode(symbol){
    if(symbol !== helpers.decodeSymbol(helpers.encodeSymbol(symbol)))
        throw new Error("Symbol not properly encoded/decoded");
    else
        console.log("TEST: Symbole Encode/decode - GOOD")
}


function testUintEncodeDecode(number){
    if(number !== helpers.decodeUint(helpers.encodeUint(number)))
        throw new Error("Uint not properly encoded/decoded");
    else
        console.log("TEST: Uint Encode/decode - GOOD")
}


function testDeploy(deployObject){
    let deployBuffer = runes.generateDeploy(deployObject);
    let returnedObject = (runes.decodeDeploy(deployBuffer));
    if(JSON.stringify(deployObject) !== JSON.stringify(returnedObject))
        throw new Error("Deploy Object not properly encoded/decoded");
    else
        console.log("TEST: Deploy Object Encode/decode - GOOD")
}








testSymbolEncodeDecode("test");
testUintEncodeDecode("123");

let deployObject= {
    symbol: 'derp',
    maxSupply: '69000000000000',
    maxMint: '10000000',
    initialSupply: '42000000000000',
    output: '1',
    mode: '0'
  }
testDeploy(deployObject);