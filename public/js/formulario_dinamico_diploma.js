function formulario_inicial(){
    document.getElementById("formulario_lugar").style.display = "none";
    document.getElementById("formulario_link").style.display = "block";
}
function formulario_dinamico_certificado(){
  var certificado=document.getElementById("tipo_certificado");
  if (certificado.value=="calificacion"){
    document.getElementById("formulario_nota").style.display = "block";
  }
  else {
    document.getElementById("formulario_nota").style.display = "none";
  }
}
function formulario_dinamico_curso(){
  var curso=document.getElementById("tipo_curso");
  if (curso.value=="presencial"){
    document.getElementById("formulario_lugar").style.display = "block";
    document.getElementById("formulario_link").style.display = "none";
  }
  else if (curso.value=="virtual") {
    document.getElementById("formulario_link").style.display = "block";
    document.getElementById("formulario_lugar").style.display = "none";
  }
  else if (curso.value=="semi-presencial"){
    document.getElementById("formulario_lugar").style.display = "block";
    document.getElementById("formulario_link").style.display = "block";
  }
}