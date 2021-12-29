function emitir_diploma(privateKeyUser,publicKeyUser) {
    contract.methods.saldo(publicKeyUser).call().then(saldo => {
        saldo.onload=verificar_saldo(saldo,privateKeyUser,publicKeyUser);
    })
}

function verificar_saldo(saldo,privateKeyUser,publicKeyUser){
    if (saldo>0){
        emision(privateKeyUser,publicKeyUser);
    }
    else {
        sin_saldo();
    }
}

function emision(privateKeyUser,publicKeyUser){
    web3.eth.getTransactionCount(publicKeyUser,(err,txCount) => {
     //const data =contract.methods.newHash(nombre,cc,correo,fecha).encodeABI()
     const data =contract.methods.Certify(document.getElementById("file_hash").innerHTML).encodeABI();
     debugger
        //Build the transaction
        console.log(txCount)
        const txObject = {
            'nonce' : web3.utils.toHex(txCount), 
            'gasLimit': web3.utils.toHex(1000000) ,
            'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei')),
            'to': contractAddress,
            'data': data,
            'chainId': web3.utils.toHex(4),
   
       // 'nonce': txCount,
       //  'gasLimit': 1000000,
       //  'gasPrice': 10000,
       //  'to': contractAddress,
       //  'data': data,
       //  'chainId': 4,
        }
   
    const signPromise = web3.eth.accounts.signTransaction(txObject, privateKeyUser);
   
    signPromise.then((signedTx)=> {
       const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
       console.log("Diploma Emitido********************");
        exito();
   
       sentTx.on("receipt", receipt => {
           console.log(receipt)
           var hash1 = receipt.transactionHash
           document.getElementById("hash").innerHTML =receipt.transactionHash;
       });
       sentTx.on("error",err => {
           console.log(err)
       });
    }).catch((err)=>{
       console.log(err)
    });
  
 
    });  
}
function exito(){
    swal({
        title: 'Nueva Firma Registrada',
        text: 'Tu archivo ha sido firmado en la Blockchain',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Verificar Archivos',
        // cancelButtonText: false
      })
}
function sin_saldo(){
    swal({
        title: 'Sin saldo',
        text: 'Debes recargar tu firma para emitir nuevos diplomas',
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Recargar',
        // cancelButtonText: false
      }).then((isConfirm) => {
        window.location.replace("https://bitsingenieria.com/edubits/recargar_firma.html");
      });
}