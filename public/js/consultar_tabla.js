//Consulta por Cedula
function buscar_cedula(cedula){
    console.log("Buscando diplomas por cedula:"+cedula);
    contract.methods.cedula2totalIDds(cedula).call().then(nd => {
        nd.onload=iterar_cedula(nd);
    })   
}
function iterar_cedula(nd){
    console.log("Total de diplomas encontrado:"+nd);
    for (i=0; i<nd; i++){
        console.log("iterando en i="+i);
        contract.methods.cedula2IDds(input_cedula.value,i).call().then(IDd => {
            IDd.onload=buscar_ID(IDd);
        })  
    }
}
//Consulta por Competencia
function buscar_IDc(competencia){
    console.log("Buscando diplomas por competencia:"+competencia);
    contract.methods.consultarIDc(competencia).call().then(IDc => {
        IDc.onload=buscar_competencia(IDc);
    })   
}
function buscar_competencia(IDc){
    console.log("Buscando diplomas por IDc:"+IDc);
    contract.methods.IDc2totalIDds(IDc).call().then(nd => {
        nd.onload=iterar_competencia(IDc,nd);
    })   
}
function iterar_competencia(IDc,nd){
    console.log("Total de diplomas encontrado:"+nd);
    for (i=0; i<nd; i++){
        console.log("iterando en i="+i);
        contract.methods.IDc2IDds(IDc,i).call().then(IDd => {
            IDd.onload=buscar_ID(IDd);
        })  
    }
}

//Consulta por Institucion
function buscar_IDu(institucion){
    console.log("Buscando diplomas por institucion:"+institucion);
    contract.methods.consultarIDu(institucion).call().then(IDu => {
        IDu.onload=buscar_institucion(IDu);
    })   
}
function buscar_institucion(IDu){
    console.log("Buscando diplomas por IDu:"+IDu);
    contract.methods.IDu2totalIDds(IDu).call().then(nd => {
        nd.onload=iterar_institucion(IDu,nd);
    })   
}
function iterar_institucion(IDu,nd){
    console.log("Total de diplomas encontrado:"+nd);
    for (i=0; i<nd; i++){
        console.log("iterando en i="+i);
        contract.methods.IDu2IDds(IDu,i).call().then(IDd => {
            IDd.onload=buscar_ID(IDd);
        })  
    }
}

//Luego se buscan los diplomas
function buscar_ID(IDd){
    console.log("ID a consultar:"+ IDd);
    contract.methods.certificados(IDd).call().then(certificado => {
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
    consultar_emisor(certificado);
}
function consultar_emisor(certificado){
    contract.methods.pubkey2IDu(certificado[7]).call().then(IDu => {
        IDu.onload=info_emisor(certificado, IDu);
    }) 
}
function info_emisor(certificado, IDu){
    contract.methods.usuarios(IDu).call().then(institucion => {
        institucion.onload=correo_cedula(certificado, institucion);
    }) 
}
function correo_cedula(certificado, institucion){
    contract.methods.cedula2email(certificado[4]).call().then(email => {
        email.onload=imprimir_diploma(certificado, institucion, email);
    })    
}
function imprimir_diploma(certificado, institucion, email){
    console.log("Imprimiendo+++++++++++++++++++++++++++++++++++");
    console.log("Tipo de Consulta: "+tipo_consulta);
    if (tipo_consulta==3){
        nombre_institucion.innerHTML=institucion[1];
        email_institucion.innerHTML="Email: "+institucion[3];
        nit.innerHTML="NIT: "+institucion[2];
        firma_institucion.innerHTML="Firma Blockchain: "+institucion[4];
        curso.innerHTML=certificado[1];
        fecha.innerHTML=certificado[2];
        nombre.innerHTML=certificado[3];
        cedula.innerHTML=certificado[4];
        tipo_certificado.innerHTML=certificado[5];
        tipo_curso.innerHTML=certificado[6];
        display_diploma.style.display="block"
    }
    if (tipo_consulta!=3){
        fila_tabla=document.getElementById("row_tabla_diplomas");
        fila_tabla.style.display="block"
        var tabla_diplomas = $('#tabla_diplomas').DataTable();
        tabla_diplomas.row.add( [
            certificado[0],
            certificado[1],
            certificado[2],
            certificado[3],
            email,
            institucion[1],
            ] ).draw( false );
    }
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