
function registrar(){

    var email = document.getElementById('email').value;

    var contrasena = document.getElementById('contrasena').value;



    firebase.auth().createUserWithEmailAndPassword(email, contrasena)

    .then(function(){

        verificar()

    })

    .catch(function(error) {

        // Handle Errors here.

        var errorCode = error.code;

        var errorMessage = error.message;

        console.log(errorCode);

        console.log(errorMessage);

        // ...



      });

}



function ingreso(){

    var email2 = document.getElementById('email2').value;

    var contrasena2 = document.getElementById('contrasena2').value;



    firebase.auth().signInWithEmailAndPassword(email2, contrasena2).catch(function(error) {

        // Handle Errors here.

        var errorCode = error.code;

        var errorMessage = error.message;

        console.log(errorCode);

        console.log(errorMessage);

        // ...

      });

      if(contrasena !== contrasena2, email !== email2){

        contenidoasociado.innerHTML=`
       
       <div class="container">
       <div class = "alert alert-danger" role="alert">

       <h4 class="alert-heading"> INCORRECT </h4>
       <p.</p>
       <br>
  <p class="mb-0">Username or Password Incorrect.</p>
      
       </div>
       </div>
       
       `;
  
      


      }



}

function observador(){

    firebase.auth().onAuthStateChanged(function(user) {

        if (user) {

            console.log('existe usuario activo')

            aparece(user);

          // User is signed in.

          var displayName = user.displayName;

          var email = user.email;



          console.log('******');

          console.log(user.emailVerified);

          console.log('*******');





          var emailVerified = user.emailVerified;

          var photoURL = user.photoURL;

          var isAnonymous = user.isAnonymous;

          var uid = user.uid;

          var providerData = user.providerData;

          // ...

        } else {

          // User is signed out.

          console.log('no existe usuario activo')

          // ...

          contenido.innerHTML = `

          <div class="alert alert-primary" role="alert">

        sesion inactiva..

</div>

          `;

        }

      });

}

observador();



function aparece(user)

{  

    var user = user;

    var contenido = document.getElementById('contenido');
 

    

    if(user.emailVerified){

        contenidoasociado.innerHTML = `

       <div class = "container mt-5">
        <ul class="nav nav-tabs">
        <li class="nav-item">
       <a class="nav-item nav-link active" href="index.html">Proyectos</a>
       </li>
       
       <ul class="nav nav-tabs">
  <li class="nav-item">
  <a class="nav-item nav-link active" href="cliente.html">Clientes</a>
  </li>
  <ul class="nav nav-tabs">
  <li class="nav-item">
  <a class="nav-item nav-link active" href="producto.html">Productos</a>
  </li>
  <ul class="nav nav-tabs">
  <li class="nav-item">
  <a class="nav-item nav-link active" href="asociado.html">Asociados</a>
  </li>

       
        </div> 


        <br>
        <div class="container">
        <div class = "alert alert-success" role="alert">

        <h4 class="alert-heading">Bienvenido! ${user.email} </h4>
       
        </div>
        </div>

       

        <div class="container">

        <h1>Agregar Asociados </h1>
    

        <input type="text" id="asociadoid" placeholder="asociadoID" class="form-control my-3">

        <input type="text" id="apellido" placeholder="Descripcion" class="form-control my-3">

      
 

    
        <button class="btn btn-info" id="boton" onclick="guardar()">Guardar</button>
        <hr>
        <div class="container">
       
        <i class="fas fa-search fa-sm">
        <input id="myInput"  onkeyup="myFunction()" class="form-control mr-sm-2" type="search" placeholder="Consulta" aria-label="Search">
        </i>
        </div>
     
    
        <table class="table my-3">
    
          <thead>
    
            <tr>
    
              
            <th scope="col">asociadoID</th>

            <th scope="col">Descripcion</th>
    
              <th scope="col">Eliminar</th>
    
              <th scope="col">Editar</th>
    
            </tr>
    
          </thead>
    
          <tbody id="tabla">
    
          
    
          </tbody>
    
        </table>
    
      </div>

        `;
  
    }
    

    var tabla = document.getElementById('tabla');

db.collection("users").onSnapshot((querySnapshot) => {

    tabla.innerHTML = '';

    querySnapshot.forEach((doc) => {

        console.log(`${doc.id} => ${doc.data().ProyectoID}`);

        tabla.innerHTML += `  

        <tr>
       
        <td> ${doc.data().asociadoID}</td>

        <td>${doc.data().Descripcion}</td>

     

      

        

        <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>

        <td> <button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().asociadoID}','${doc.data().Descripcion}')">Editar</button></td>

      </tr>`
      

  

    });

});


}



function cerrar(){

    firebase.auth().signOut()

    .then(function(){

        console.log('Saliendo...')

    })

    .catch(function(error){

        console.log(error)

    })

}



function verificar(){

    var user = firebase.auth().currentUser;



user.sendEmailVerification().then(function() {

    console.log('Enviando correo...');

  // Email sent.

}).catch(function(error) {

  // An error happened.

  console.log(error);

});

}

var db = firebase.firestore();


function guardar(){

   



    var apellido = document.getElementById('apellido').value;

    

    var asociadoid = document.getElementById('asociadoid').value;

  





    db.collection("users").add({

    

        Descripcion: apellido,

      

        asociadoID: asociadoid

    


    })

    .then(function(docRef) {

        console.log("Document written with ID: ", docRef.id);

      

        document.getElementById('apellido').value = '';


        document.getElementById('asociadoid').value = '';


    })

    .catch(function(error) {

        console.error("Error adding document: ", error);

    });

    

}







function eliminar(id){

    

    db.collection("users").doc(id).delete().then(function() {

        console.log("Document successfully deleted!");

    }).catch(function(error) {

        console.error("Error removing document: ", error);

    });

    



}

function myFunction(){

    var input,filter,tabla,tr,td,i;
    input = document.getElementById("myInput");
    filter = input.value.toUpperCase();
    tabla = document.getElementById("tabla");
    tr = tabla.getElementsByTagName("tr");

    for (i = 0; i < tr.length; i++){
        td = tr[i].getElementsByTagName("td")[0];
        if(td){
            if(td.innerHTML.toUpperCase().indexOf(filter) > -1){
                tr[i].style.display = "";

            } else {
                tr[i].style.display = "none";
            }
        }
    }
}



function editar(id,apellido,asociadoid){



document.getElementById('apellido').value = apellido;

document.getElementById('asociadoid').value = asociadoid;



var boton = document.getElementById('boton');

boton.innerHTML = 'Editar';



boton.onclick = function(){

    

var washingtonRef = db.collection("users").doc(id);





var apellido = document.getElementById('apellido').value;



var asociadoid = document.getElementById('asociadoid').value;






// Set the "capital" field of the city 'DC'

return washingtonRef.update({



    Descripcion: apellido,


    asociadoID: asociadoid




})

.then(function() {

    console.log("Document successfully updated!");

    boton.innerHTML = 'Guardar';

   

    document.getElementById('apellido').value = '';

   

    document.getElementById('asociadoid').value = '';



})

.catch(function(error) {

    // The document probably doesn't exist.

    console.error("Error updating document: ", error);

});

}

}