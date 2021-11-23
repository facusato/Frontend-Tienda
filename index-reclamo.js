$(document).ready( ()=> {

    const list=()=>{
    
        $.ajax({
            url:'http://localhost:8093/reclamo',
            type: 'GET',
            dataType: 'json',
            success: function(res){
                let data = '';
                res.forEach(element => {
                    data+=`
                    <tr reclamoId = ${element.idReclamo}>
                    <td>${element.idReclamo}</td>
                    <td>${element.estado}</td>
                    <td>${element.descripcion}</td>
                    <td>${element.idPedido}</td>
                    <td>
                        <button id="btn-details" class="btn btn-warning">Devolver Dinero</button>
                    </td>
                    <td>
                        <button id="btn-delete" class="btn btn-danger">Rechazar Reclamo</button>
                    </td>
    
                   
                </tr>
                    `
                   
                
                });
        
                $('#tbody').html(data);
            }
    
        })
    }
    

    const deleteReclamo = () => {
        $(document).on('click','#btn-delete', function(){
    
            if(confirm('seguro de eliminar?')){
                let btnDelete = $(this)[0].parentElement.parentElement;
                 let id = $(btnDelete).attr('reclamoId');
    
                  $.ajax({
                     url:'http://localhost:8093/reclamo/'+id,
                     type: 'DELETE',
                     dataType: 'json',
                      success: (res)=> {
                         $('#messages').html('Reclamo rechazado').css('display','block')
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