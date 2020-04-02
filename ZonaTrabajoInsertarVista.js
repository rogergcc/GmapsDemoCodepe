$(document).ready(function () { 

    const basePath = 'http://192.168.0.23';
    //navigator.geolocation.getCurrentPosition(successFunction); 
    successFunction();
    $('.btnListar').on('click', function (e) {
        var usuId = $("#usuarioId").val();
        //indow.location.replace(basePath + "ZonaTrabajo/ZonaTrabajoListarVista?id=" + usuId);
    });  
    $('.btnGuardar').on('click', function (e) {        
        var validar = $("#frmNuevo");

        
         
        if (validar.valid()) {                        
            if ($("#cboEstado").val() == 1) {
                $("#txtEstado").val(true);
            } else {
                $("#txtEstado").val(false);
            }
            console.log( $("#txtLatitud").val());
            // var url = basePath + "ZonaTrabajo/ZonaTrabajoInsertarJson";

            var url = basePath + "/api_restaurantes/restaurante";

            var dataForm = $('#frmNuevo').serializeFormJSON();

            console.log( "data :" + dataForm);
            console.log( "data 2 :" +  JSON.stringify(dataForm));
           
            $.ajax({
                url: url,
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(dataForm),
                beforeSend: function () {
                    //$.LoadingOverlay("show");
                },
                complete: function () {
                    //$.LoadingOverlay("hide");
                },
                success: function (response) {
                    console.log(response);
                     var obj = JSON.parse(response);
                    var respuesta = obj.respuesta;
                   
                    var mensaje = obj.mensaje+"";
                    if (respuesta == true) {
                        toastr.success("Se Registro Correctamente", "Mensaje Servidor");
                        $("#txtDescripcion").val("");
                        $("#txtDireccion").val("");
                        $("#txtLatitud").val("");
                        $("#txtLongitud").val("");
                        $("#txtEstado").val("");
                    } else {
                        // toastr.error(mensaje, "Mensaje Servidor");
                        toastr.success(obj.mensaje,"Sistema Web");
                    }
                },
                error: function (jqXHR, textStatus, errorThrown) {
                }
            });
        }        
    });   
});

$.fn.serializeFormJSON = function () {

    var o = {};
    var a = this.serializeArray();
    $.each(a, function () {
        if (o[this.name]) {
            if (!o[this.name].push) {
                o[this.name] = [o[this.name]];
            }
            o[this.name].push(this.value || '');
        } else {
            o[this.name] = this.value || '';
        }
    });
    return o;
}

function successFunction() {
    //   lat1 = -12.0857061;
    // long1 = -76.9751669;    
    lat1 = -18.0131095;
    long1 = -70.2508508;      
    //-70.2508508, -18.0131095

    $('#map-canvas').locationpicker({
        location: {
            latitude: lat1,
            longitude: long1
            // latitude: latitude,
            // longitude: longitude
        },
        radius: 300,
        inputBinding: {
            latitudeInput: $('#txtLatitud'),
            longitudeInput: $('#txtLongitud'),
            //radiusInput: $('#us3-radius'),
            locationNameInput: $('#pac-input')
        },
        enableAutocomplete: true,
        onchanged: function (currentLocation, radius, isMarkerDropped) {
            // Uncomment line below to show alert on each Location Changed event
            // alert("Location changed. New location (" + currentLocation.latitude + ", " + currentLocation.longitude + ")");
        }
    });
}
$("#frmNuevo")
    .validate({
        rules: {
             RestauranteLogo:
                {
                    required: true,

                },
            RestauranteDescripcion:
                {
                    required: true,

                },
            RestauranteNombre:
                {
                    required: true,

                },
            Latitud:
                {
                    required: true,

                },
            Longitud:
                {
                    required: true,

                },
            Estado:
                {
                    required: true,

                },
        },
        messages: {
            RestauranteLogo: {
                required: 'Logo Requerida',

            },
            RestauranteDescripcion: {
                required: 'Descripción Requerida',

            },
            RestauranteNombre: {
                required: 'nombre',

            },
            Latitud: {
                required: '',

            },
            Longitud: {
                required: '',

            },
            Estado: {
                required: 'estad',

            },

        },
        errorPlacement: function (error, element) {
            if (element.is(":radio") || element.is(":checkbox")) {
                element.closest('.option-group').after(error);
            }
            else {
                error.insertAfter(element);
            }
        }
    });