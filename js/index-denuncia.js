$(document).ready( ()=> {

    const list=()=>{
    
        $.ajax({
            url:'http://localhost:8093/denuncia',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+=`
                    <tr reclamoId = ${element.idDenuncia}>
                    <td>${element.idDenuncia}</td>
                    <td>${element.estado}</td>
                    <td>${element.categoria}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.idPedido}</td>
                    <td>
                        <button id="btn-details" class="btn btn-warning">Devolver Dinero</button>
                    </td>
                    <td>
                        <button id="btn-delete" class="btn btn-danger">Rechazar Denuncia</button>
                    </td>
    
                   
                </tr>
                    `
                   
                
                });
        
                $('#tbody').html(data);
            }
    
        })
    }
    

    const deleteDenuncia = () => {
        $(document).on('click','#btn-delete', function(){
    
            if(confirm('seguro de eliminar?')){
                let btnDelete = $(this)[0].parentElement.parentElement;
                 let id = $(btnDelete).attr('denunciaId');
    
                  $.ajax({
                     url:'http://localhost:8093/denuncia/'+id,
                     type: 'DELETE',
                     dataType: 'json',
                      success: (res)=> {
                         $('#messages').html('Denuncia rechazada').css('display','block')
                         list();
    
                       }
    
                     })
    
    
            }
        
        })
    }
       
   const devolverDinero = () =>{
    $(document).on('click','#btn-details', function(){
      
        $('#messages').html('Dinero en camino').css('display','block')
     
    })
}
   
    
    
    
    
    list();
    deleteReclamo();
    
    })