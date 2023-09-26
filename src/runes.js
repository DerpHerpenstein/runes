const helpers = require("./helpers")

const bufferPrefix = Buffer.from("R");
const opCodeBuffers = {
    "transfer": helpers.encodeUint(3),
    "mint": helpers.encodeUint(2),
    "deploy": helpers.encodeUint(1)
}

/////////////////////////
//
/////////////////////////

function generateDeploy(deployObject){
    let encodedSymbol = helpers.encodeSymbol(deployObject.symbol.toString());
    let encodedMaxSupply = helpers.encodeUint(deployObject.maxSupply.toString());
    let encodedMaxMint = helpers.encodeUint(deployObject.maxMint.toString());
    let encodedInitialSupply = helpers.encodeUint(deployObject.initialSupply.toString());
    let encodedOutput = helpers.encodeUint(deployObject.output.toString());
    let encodedMode = helpers.encodeUint(deployObject.mode.toString());
    let finalBuffer = Buffer.concat([encodedSymbol, encodedMaxSupply, encodedMaxMint, encodedInitialSupply, encodedOutput, encodedMode]);
    return finalBuffer;
}

function decodeDeploy(deployBuffer){
    let params = helpers.decodeBuffer(deployBuffer);
    return {
        symbol: helpers.decodeSymbol(params[0]),
        maxSupply: helpers.decodeUint(params[1]),
        maxMint: helpers.decodeUint(params[2]),
        initialSupply: helpers.decodeUint(params[3]),
        output: helpers.decodeUint(params[4]),
        mode: helpers.decodeUint(params[5])
    }
}

/////////////////////////
//
/////////////////////////

function generateMint(mintObject){
    let encodedSymbolIndex = helpers.encodeUint(mintObject.symbolIndex.toString());
    let encodedOutput = helpers.encodeUint(mintObject.output.toString());
    let encodedAmount = helpers.encodeUint(mintObject.amount.toString());
    let finalBuffer = Buffer.concat([encodedSymbolIndex, encodedOutput, encodedAmount])
    return finalBuffer;
}

function decodeMint(mintBuffer){
    let params = helpers.decodeBuffer(mintBuffer);
    return {
        symbolIndex: helpers.decodeUint(params[0]),
        output: helpers.decodeUint(params[1]),
        amount: helpers.decodeUint(params[2])
    }
}


function generateTransfer(transferArray){
    let finalBuffer = Buffer.from("");
    transferArray.forEach((transferObject) => {
        let encodedSymbolIndex = helpers.encodeUint(transferObject.symbolIndex.toString());
        let encodedOutput = helpers.encodeUint(transferObject.output.toString());
        let encodedAmount = helpers.encodeUint(transferObject.amount.toString());
        finalBuffer = Buffer.concat([finalBuffer, encodedSymbolIndex, encodedOutput, encodedAmount])
    })

    return finalBuffer;
}



function decodeTransfer(transferBuffer){
    let params = helpers.decodeBuffer(transferBuffer);
    let outputArray = []
    for(let i=0; i< params.length;){
        outputArray.push({
            symbolIndex: helpers.decodeUint(params[i]),
            output: helpers.decodeUint(params[i+1]),
            amount: helpers.decodeUint(params[i+2])
        });
        i+=3;
    }
    return outputArray;
}


function generateOp(name, data){
    let tmpBuffer = Buffer.from("");
    let zeroBuffer = Buffer([0x00]);
    if(name === "transfer"){
        tmpBuffer = generateTransfer(data);
    }
    else if(name === "mint"){
        tmpBuffer = generateMint(data);
    }
    else if(name === "deploy"){
        tmpBuffer = generateDeploy(data);
    }
    tmpBuffer = Buffer.concat([bufferPrefix, opCodeBuffers[name], tmpBuffer])
    
    while(tmpBuffer.length < 80)
        tmpBuffer = Buffer.concat([tmpBuffer, zeroBuffer])
    
    return tmpBuffer
}

function decodeOp(opBuffer){
    if(opBuffer[0] == bufferPrefix[0]){
        // remove the trailing zeros
        let lastZero = opBuffer.length-1;
        while(opBuffer[lastZero] == 0)
            lastZero -=1;
        opBuffer = opBuffer.slice(0,lastZero+1);
        let op = "error";
        let data;

        if(opBuffer[1]  == opCodeBuffers["transfer"][0]){
            op = "transfer";
            data = decodeTransfer(opBuffer.slice(2))
        }
        
        else if(opBuffer[1]  == opCodeBuffers["mint"][0]){
            op = "mint";
            data = decodeMint(opBuffer.slice(2))
        }

        else if(opBuffer[1]  == opCodeBuffers["deploy"][0]){
            op = "deploy";
            data = decodeDeploy(opBuffer.slice(2))
        }
        return {
            op: op,
            data: data
        }
    }
}


module.exports = {generateDeploy, decodeDeploy, generateMint, decodeMint,  generateTransfer, decodeTransfer, generateOp, decodeOp}

