function validar_formulario() {
    $('#alert_form').hide();
    if (document.getElementById("file_hash").innerHTML != "CertiBits - Hash:") {
        // $('#staticModal').modal('show');

    } else {
        $('#alert_form').show();
    }
}