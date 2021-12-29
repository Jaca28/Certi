function buscar_ID(){
    console.log("ID a consultar:"+ id_diploma.value);
    contract.methods.certificados(id_diploma.value).call().then(certificado => {
        certificado.onload=consultar_tipo(certificado);
    })  
}
function consultar_tipo(certificado){
    console.log("consultando tipo de certificado..............");
    if (certificado[5]=="calificacion"){
        contract.methods.IDd2nota(id_diploma.value).call().then(notabc => {
            nota.onload=imprimir_nota(notabc);
        })  
    }
    else {
        formulario_nota.style.display="none";
    }
    consultar_modalidad(certificado);
}
function consultar_modalidad(certificado){
    console.log("consultando modalidad del curso***************");
    if (certificado[6]=="presencial"){
        console.log("Modalidad presencial xxxxxxxxxxxxxx");
        formulario_link.style.display="none";
        formulario_lugar.style.display="block";
        contract.methods.IDd2Lugar(id_diploma.value).call().then(lugar => {
            link.onload=imprimir_lugar(lugar);
        })  
    }
    else if (certificado[6]=="virtual"){
        console.log("Modalidad Virtual ooooooooooooooooooooo");
        formulario_link.style.display="block";
        formulario_lugar.style.display="none";
        contract.methods.IDd2Link(id_diploma.value).call().then(link => {
            lugar.onload=imprimir_link(link);
        })  
    }
    else {
        console.log("Modalidad Semi-Presencial xoxoxoxoxoxoxoxox");
        formulario_link.style.display="block";
        formulario_lugar.style.display="block";
        contract.methods.IDd2Link(id_diploma.value).call().then(linkbc => {
            link.onload=imprimir_link(linkbc);
        })  
        contract.methods.IDd2Lugar(id_diploma.value).call().then(lugarbc => {
            lugar.onload=imprimir_lugar(lugarbc);
        })  
    }
    imprimir_diploma(certificado);
    consultar_emisor(certificado[7]);
}
function consultar_emisor(owner){
    contract.methods.pubkey2IDu(owner).call().then(IDu => {
        IDu.onload=info_emisor(IDu);
    }) 
}
function info_emisor(IDu){
    contract.methods.usuarios(IDu).call().then(institucion => {
        institucion.onload=imprimir_institucion(institucion);
    }) 
}
function imprimir_institucion(institucion){
    nombre_institucion.innerHTML=institucion[1];
    email_institucion.innerHTML=institucion[3];
    nit.innerHTML=institucion[2];
    firma_institucion.innerHTML=institucion[4];
}
function imprimir_diploma(certificado){
    curso.innerHTML=certificado[1];
    fecha.innerHTML=certificado[2];
    nombre.innerHTML=certificado[3];
    cedula.innerHTML=certificado[4];
    tipo_certificado.innerHTML=certificado[5];
    tipo_curso.innerHTML=certificado[6];
    display_diploma.style.display="block"
}
function imprimir_link(linkbc){
    link.innerHTML=linkbc;
}
function imprimir_lugar(lugarbc){
    lugar.innerHTML=lugarbc;
}
function imprimir_nota(notabc){
    nota.innerHTML=notabc;
}