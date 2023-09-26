const helpers = require("./helpers")

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
/*
function deploy(deployObject){
    let encodedSymbol = helpers.encodeSymbol(deployObject.symbol.toString());
    let encodedMaxSupply = helpers.encodeUint(deployObject.maxSupply.toString());
    let encodedMaxMint = helpers.encodeUint(deployObject.maxMint.toString());
    let encodedInitialSupply = helpers.encodeUint(deployObject.initialSupply.toString());
    let encodedOutput = helpers.encodeUint(deployObject.output.toString());
    let encodedMode = helpers.encodeUint(deployObject.mode.toString());
    let finalBuffer = Buffer.concat([encodedSymbol, encodedMaxSupply, encodedMaxMint, encodedInitialSupply, encodedOutput, encodedMode]);
    return finalBuffer;
}

function decodeDeply(deployBuffer){
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
*/


module.exports = {generateDeploy, decodeDeploy}
