function crear_billetera() {
    //Password de usuario 
    password = document.getElementById("password").value;
    account = web3.eth.accounts.create();
    owner = account.address;
    //Archivo Json con las llaves cifradas
    jsonf = web3.eth.accounts.encrypt(account.privateKey, password);
    //-----Almacenar JSON en la base de datos, asociada al perfil del usuario
    // document.getElementById("json").innerHTML =jsonf.id;
    //Cuando el usuario requiera firmar una transacción, se preguntara por su password y se desbloqueara su llave privada
    //var account_to_sign=web3.eth.accounts.decrypt(json,"password");
    
    account1 = '0x9D493aF035F197d8d9307F76cEA444BC1b11672E';
    privateKey1 = 'a86ead419df17a2046900df7c098718abb79cc29097cfda312eca3471e63807c';
    // account1 = '0x186a991219b1ccC102e187446b27e3C70Fc696aB';
    // privateKey1 = '90E30661C3B65EA1DECDF51D55923E4A0069F596A678FFCFBEB965E1C769CF89';
       
   

    // web3.eth.getTransactionCount(account1,(err,txCount) => {
    //  //const data =contract.methods.newHash(nombre,cc,correo,fecha).encodeABI()
    //     //Build the transaction
    //     console.log(txCount)
    //     const txObject = {
    //         'nonce' : web3.utils.toHex(txCount), 
    //         'gasLimit': web3.utils.toHex(1000000) ,
    //         'gasPrice': web3.utils.toHex(web3.utils.toWei('10','gwei')),
    //         'to': owner,
    //         'value': web3.utils.toWei('0.1','ether'),
    //         'chainId': web3.utils.toHex(4),
   
    //    // 'nonce': txCount,
    //    //  'gasLimit': 1000000,
    //    //  'gasPrice': 10000,
    //    //  'to': contractAddress,
    //    //  'data': data,
    //    //  'chainId': 4,
    //     }
   
    // const signPromise = web3.eth.accounts.signTransaction(txObject, privateKey1);
   
    // signPromise.then((signedTx)=> {
    //    const sentTx = web3.eth.sendSignedTransaction(signedTx.rawTransaction);
   
    //    sentTx.on("receipt", receipt => {
    //        console.log(receipt)
    //        var hash1 = receipt.transactionHash
    //        document.getElementById("hash").innerHTML =receipt.transactionHash;  
    //    });
    //    sentTx.on("error",err => {
    //        console.log(err)
    //    });
    // }).catch((err)=>{
    //    console.log(err)
    // });
   
    // });


    console.log("nombre:"+institucion.value);
    console.log("nit:"+nit.value);
    console.log("email:"+email.value);
    console.log("pass:"+password);
    console.log("owner:"+owner);
   
    web3.eth.getTransactionCount(account1,(err,txCount) => {
     //const data =contract.methods.newHash(nombre,cc,correo,fecha).encodeABI()
     const data =contract.methods.nuevo_usuario(institucion.value, nit.value, email.value, owner).encodeABI();
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
       signPromise.onload=mensaje(jsonf) 
   
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
function mensaje(jsonf){
    swal({
        title: 'Bienvenido a la 4ta revolución Industrial',
        text: 'Ahora puedes firmar tus documentos digitalmente con la tecnología Blockchain',
        type: 'success',
        showCancelButton: false,
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Descargar Firma!',
        // cancelButtonText: false
      }).then((isConfirm) => {
        if (isConfirm) {
            swal("Atención!", "Recuerda que para firmar tus documentos debes usar el archivo que acabas de descargar y la contraseña con la que lo creaste ", "success"); 
            descargar_billetera(jsonf)
          // handle Confirm button click
        } else {
          // result.dismiss can be 'cancel', 'overlay', 'esc' or 'timer'
        }
      });

    function descargar_billetera(jsonf){
    var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(jsonf));
    $('<a id="descargar" target="_blank" href="data:' + data + '" download="Firma '+institucion.value+' CertiBits.json"></a>').appendTo('#container');
    var descarga = document.getElementById('descargar');
    descarga.click();
    }
}