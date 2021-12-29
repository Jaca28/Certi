function consultar_saldo(){
    console.log("Dirección a consultar:"+ owner);
    contract.methods.saldo(owner).call().then(saldo => {
        saldo.onload=consultar_IDu(saldo);
    })  
}
function consultar_IDu(saldo){
console.log("Saldo de la cuenta:" + saldo);
contract.methods.pubkey2IDu(owner).call().then(IDu => {
    IDu.onload=consultar_datos(IDu, saldo);
})
}
function consultar_datos(IDu, saldo){
    console.log("ID de Usuario:"+ IDu);
    contract.methods.usuarios(IDu).call().then(user => {
        user.onload=imprimir_datos(user, saldo);
    })  
}
function imprimir_datos(user, saldo){
    console.log("saldo: "+saldo);
    if (saldo==0){
        $('#alert_sin_saldo').show();
        console.log("Mostrando Alert");   
    }
    else {
        document.getElementById("alert_recarga").innerHTML = "Esta firma se encuentra a nombre de "+ user[1] +" y cuenta con un saldo de "+saldo + " Firmas";
        $('#alert_recarga').show();
        console.log("Mostrando Alert");
    }
}