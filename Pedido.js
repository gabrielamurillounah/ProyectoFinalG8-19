var UrlGetPedidos = "http://127.0.0.1:80/G8_19/Controller/pedidos.php?op=GetPedidos";
var UrlPostPedidos = "http://127.0.0.1:80/G8_19/Controller/pedidos.php?op=InsertPedido";
var UrlGetUno = "http://127.0.0.1:80/G8_19/Controller/pedidos.php?op=GetUno";
var UrlPutPedidos = "http://127.0.0.1:80/G8_19/Controller/pedidos.php?op=ActualizarPedido";
var UrlDeletePedidos = "http://127.0.0.1:80/G8_19/Controller/pedidos.php?op=EliminarPedidos"; 

$(document).ready(function(){
    CargarPedidos();
});

function CargarPedidos(){
    $.ajax({
        url: UrlGetPedidos,
        type: 'GET',
        datatype: 'JSON',
        success: function(response){
            var MiItems = response;
            var Valores = '';

            for(i= 0; i < MiItems.length; i++){
                Valores += '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                '<td>'+ MiItems[i].DETALLE +'</td>'+
                '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                '<td>'+ MiItems[i].TOTAL +'</td>'+
                '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+
                '<button class="btn btn-warning" onclick="CargarPedido('+MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-danger" onclick="EliminarPedido('+MiItems[i].ID +')">Eliminar</button>'+
                '<td>'+
                '</tr>';
                $('.pedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedidos = {
        ID: $('#ID').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidosjson= JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPostPedidos,
        type:'POST',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    alert("Pedido Agregado");
}

function CargarPedido(idpedido){
    var datospedido = {
        ID: idpedido
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlGetUno,
        type: 'POST',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            var MiItems = response;
 
            $('#ID').val(MiItems[0].ID);
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO);
            $('#DETALLE').val(MiItems[0].DETALLE);
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL);
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV);
            $('#TOTAL').val(MiItems[0].TOTAL);
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA);
            $('#ESTADO').val(MiItems[0].ESTADO);

            var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarPedido(' + MiItems[0].ID + ')"' +
                'value="Actualizar Pedido" class="btn btn-primary"></input>';
            $('.button').html(btnactualizar);
            
        }

    });
}

function ActualizarPedido(idpedido){
    var datospedido = {
        ID: idpedido,
        ID: $('#ID').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_PEDIDO: $('#FECHA_PEDIDO').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_ENTREGA: $('#FECHA_ENTREGA').val(),
        ESTADO: $('#ESTADO').val()
    };
    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlPutPedidos,
        type:'PUT',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response);
        }
    });
    
    alert("Pedido Actualizado");
}

function EliminarPedido(idpedido) {
    var datospedido = {
        ID: idpedido
    };

    var datospedidojson= JSON.stringify(datospedido);

    $.ajax({
        url: UrlDeletePedidos,
        type: 'DELETE',
        data: datospedidojson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response) {
            console.log(response);
        }
    });
    alert("Pedido Eliminado");
}