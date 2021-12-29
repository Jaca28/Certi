function recargar_cuenta(owner, valor_recarga) {
    console.log("Cuenta a Recagar: "+ owner);
    console.log("Valor a Recargar: "+valor_recarga);
    
    account1 = '0x9D493aF035F197d8d9307F76cEA444BC1b11672E';
    privateKey1 = 'a86ead419df17a2046900df7c098718abb79cc29097cfda312eca3471e63807c';
    // account1 = '0x186a991219b1ccC102e187446b27e3C70Fc696aB';
    // privateKey1 = '90E30661C3B65EA1DECDF51D55923E4A0069F596A678FFCFBEB965E1C769CF89';
       
   
    //https://ethereum.stackexchange.com/questions/41877/is-there-a-way-to-get-public-key-using-web3-js
    web3.eth.getTransactionCount(account1,(err,txCount) => {
        if (err){
            console.log(err);
            console.log("Error al recargar cuenta con ETH, reintentando........");
            recargar_cuenta(owner, valor_recarga);
        }
     //const data =contract.methods.newHash(nombre,cc,correo,fecha).encodeABI()
        //Build the transaction
        console.log(txCount)
        const txObject = {
            'nonce' : web3.utils.toHex(txCount), 
            'gasLimit': web3.utils.toHex(1000000) ,
            'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei')),
            'to': owner,
            'value': web3.utils.toWei('0.1','ether'),
            'chainId': web3.utils.toHex(4),
   
       // 'nonce': txCount,
       //  'gasLimit': 1000000,
       //  'gasPrice': 10000,
       //  'to': contractAddress,
       //  'data': data,
       //  'chainId': 4,
        }
   
    const signPromise = web3.eth.accounts.signTransaction(txObject, privateKey1);
   
    signPromise.then((signedTx)=> {
       const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        recargar_saldo(owner, valor_recarga, account1, privateKey1);
   
       sentTx.on("receipt", receipt => {
            receipt.onload=imprimir_hash(receipt);
            var hash1 = receipt.transactionHash
            document.getElementById("hash").innerHTML =receipt.transactionHash;  
       });
       sentTx.on("error",err => {
           console.log(err)
           console.log("Error Enviar transaccion de recargar ETH, reintentando........");
           recargar_cuenta(owner, valor_recarga);
       });
    }).catch((err)=>{
       console.log(err)
       console.log("Error Enviar transaccion de recargar ETH, reintentando........");
       recargar_cuenta(owner, valor_recarga);
    });
   
    });
    
}
function recargar_saldo(owner, valor_recarga, account1, privateKey1){
    web3.eth.getTransactionCount(account1,(err,txCount) => {
        if (err){
            console.log(err);
            console.log("Error, reintentando recargar saldo.........");
            recargar_saldo(owner, valor_recarga, account1, privateKey1);
        }
        //const data =contract.methods.newHash(nombre,cc,correo,fecha).encodeABI()
        const data =contract.methods.recargar(owner, valor_recarga).encodeABI();
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
      
       const signPromise = web3.eth.accounts.signTransaction(txObject, privateKey1);
      
       signPromise.then((signedTx)=> {
          const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
          $('#alert_recarga').show(); 
      
          sentTx.on("receipt", receipt => {
              receipt.onload=imprimir_hash(receipt);
              var hash1 = receipt.transactionHash
              document.getElementById("hash").innerHTML =receipt.transactionHash;
          });
          sentTx.on("error",err => {
              console.log(err)
              console.log("Error, firmando la transaccion, reintentando recargar saldo.........");
              recargar_saldo(owner, valor_recarga, account1, privateKey1);
          });
       }).catch((err)=>{
          console.log(err);
          console.log("Error, firmando la transaccion, reintentando recargar saldo.........");
          recargar_saldo(owner, valor_recarga, account1, privateKey1);
       });
     
    
       });  
}
function imprimir_hash(receipt){
    console.log(receipt)
}