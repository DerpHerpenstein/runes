const helpers = require("../src/helpers")
const runes = require("../src/runes")

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


function testMint(mintObject){
    let mintBuffer = runes.generateMint(mintObject);
    let returnedObject = (runes.decodeMint(mintBuffer));
    if(JSON.stringify(mintObject) !== JSON.stringify(returnedObject))
        throw new Error("Mint Object not properly encoded/decoded");
    else
        console.log("TEST: Mint Object Encode/decode - GOOD")
}

function testTransfer(transferArray){
    let transferBuffer = runes.generateTransfer(transferArray);
    let returnedObject = (runes.decodeTransfer(transferBuffer));
    if(JSON.stringify(transferArray) !== JSON.stringify(returnedObject))
        throw new Error("transfer Object not properly encoded/decoded");
    else
        console.log("TEST: transfer Object Encode/decode - GOOD")
}





testSymbolEncodeDecode("test");
testUintEncodeDecode("123");


let deployObject = {
    symbol: 'derp',
    maxSupply: '69000',
    maxMint: '10000000',
    initialSupply: '42000',
    output: '1',
    mode: '2'
  }
testDeploy(deployObject);



let mintObject = {
    symbolIndex: '1',
    output: '1',
    amount: '1234'
}
testMint(mintObject);



let transferArray = [
    {
        symbolIndex: '1',
        output: '1',
        amount: '1234'
    },
    {
        symbolIndex: '1',
        output: '2',
        amount: '321'
    }
]
testTransfer(transferArray);

tmpTransfer = runes.generateOp("transfer", transferArray);
tmpMint = runes.generateOp("mint", mintObject);
tmpDeploy = runes.generateOp("deploy", deployObject);

console.log(tmpTransfer);
console.log( runes.decodeOp(tmpTransfer) );

console.log(tmpMint);
console.log( runes.decodeOp(tmpMint) );

console.log(tmpDeploy);
console.log( runes.decodeOp(tmpDeploy) );


