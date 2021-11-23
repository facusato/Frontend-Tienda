$(document).ready( ()=> {

    const list=()=>{
    
        $.ajax({
            url:'http://localhost:8093/pedido',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+=`
                    <tr pedidoId = ${element.idPedido}>
                    <td>${element.idPedido}</td>
                    <td>${element.codigoSeguim}</td>
                    <td>${element.estado}</td>
                    <td>${element.cliente.idCliente}</td>
                    <td>${element.cliente.domicilio}</td>
                    <td>${element.total}</td>
                    <td>
                        <button id="btn-details" class="btn btn-warning">Detalle</button>
                    </td>
                    <td>
                        <button id="btn-delete" class="btn btn-danger">Eliminar</button>
                    </td>
    
                   
                </tr>
                    `
                   
                
                });
        
                $('#tbody').html(data);
            }
    
        })
    }
    
        const save1 = ()=>{
            $('#agregar').on('click',function(){
                const datosReclamo ={
                    estado: $('#estado').val(),
                    descripcion: $('#descripcion').val(),
                    idPedido:$('#idPedido').val(),
                  }
    
                  $.ajax({
                      url:'http://localhost:8093/reclamo',
                      contentType: 'application/json',
                      type:'POST',
                      data: JSON.stringify(datosReclamo),
                      dataType: 'json',
                    success: (data) => {
                        $('#messages').html('Reclamo creado con exito').css('display','block')
                        list();
                        reset();
                        console.log('Reclamo registrado');
                        
                        }
    
            })
    
        })
    }


    const save2 = ()=>{
        $('#agregard').on('click',function(){
            const datosDenuncia ={
                estado2: $('#estado2').val(),
                categoria: $('#categoria').val(),
                descripcion2: $('#descripcion2').val(),
                idPedido:$('#idPedido').val(),
              }

              $.ajax({
                  url:'http://localhost:8093/denuncia',
                  contentType: 'application/json',
                  type:'POST',
                  data: JSON.stringify(datosDenuncia),
                  dataType: 'json',
                success: (data) => {
                    $('#messages').html('Denuncia creada con exito').css('display','block')
                    list();
                    reset();
                    console.log('Denuncia registrada');
                    
                    }

        })

    })
}
    
    
    const details = ()=> {
        $(document).on('click','#btn-details', function(){
            let btnDetails = $(this)[0].parentElement.parentElement;
            let id = $(btnDetails).attr('pedidoId');
    
            $.ajax({
                url:'http://localhost:8093/pedido/'+id,
                type: 'GET',
                dataType: 'json',
                 success: (res)=> {
                    let data= `
                    
                        <strong>CodigoSeguim</strong> ${res.codigoSeguim}<br>
                        <strong>Estado</strong> ${res.estado}<br>
                        <strong>Cliente</strong> ${res.cliente.idCliente}<br>
                        <strong>Domicilio</strong> ${res.cliente.domicilio}<br>
                        <button id="btn-limpiar" class="btn btn-warning">Limpiar</button>
                    `
                    let pedido = $('#pedido-details').html(data);
                    $('#btn-limpiar').on('click',() =>{
                        pedido.html('');
                    })
                  }
    
                })
        
        
        
        })
    
    
    }
    
    
    
    
    const deletePedido = () => {
        $(document).on('click','#btn-delete', function(){
    
            if(confirm('seguro de eliminar?')){
                let btnDelete = $(this)[0].parentElement.parentElement;
                 let id = $(btnDelete).attr('pedidoId');
    
                  $.ajax({
                     url:'http://localhost:8093/pedido/'+id,
                     type: 'DELETE',
                     dataType: 'json',
                      success: (res)=> {
                         $('#messages').html('Pedido eliminado').css('display','block')
                         list();
    
                       }
    
                     })
    
    
            }
        
        })
    }
    
    const rellenarPedido = () =>{
        $(document).on('click','#btn-edit', function(){
            let btnEdit = $(this)[0].parentElement.parentElement;
            let id = $(btnEdit).attr('pedidoId');
    
            $('#agregar').hide();
            $('#editar').show();
    
            $.ajax({
                     url:'http://localhost:8093/pedido/'+id,
                     type: 'GET',
                     dataType: 'json',
                      success: (res)=> {
                        $('#idPedido').val(res.idPedido);
                        $('#codigoSeguim').val(res.codigoSeguim);
                        $('#estado').val(res.estado);
    
                      }
            })
    
    
        })
    
    
    }
    
    
    const editarPedido = () =>{
    
        $('#editar').on('click',function(){
            let id= $('#idPedido').val();
            $('#agregar').css('block','none');
            $('#editar').css('display','block');
    
            const datosPedido ={
                codigoSeguim: $('#codigoSeguim').val(),
                estado: $('#pedido').val(),
            }
    
            $.ajax({
                url:'http://localhost:8093/pedido/'+id,
                contentType: 'application/json',
                type: 'PUT',
                data: JSON.stringify(datosPedido),
                dataType: 'json',
                 success: (res)=> {
                    $('#messages').html('Pedido modificado').css('display','block')
                    $('#editar').css('display','none');
                    $('#agregar').css('display','block');
    
                    reset();
                    list();
                 }
          })
    
    
        })
    
    }
    
        //metodo para limpiar el formulario
    const reset = ()=>{
        $('#codigoSeguim').val('');
        $('#estado').val('');
    
    }
    
    list();
    save1();
    save2();
    details();
    deletePedido();
    rellenarPedido();
    editarPedido();
    
    })