var sign_table;
jQuery(document).ready(function() {
  sign_table=jQuery('#buy_table').DataTable( {
    responsive: true,
    "scrollX": true,
        "columnDefs": [
        { "orderDataType": "date-time", "targets": [2] }
    ]
} );
} );