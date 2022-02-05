//---------------------------------------------------------------------------------//
//----Al hacer click en <enviar>, pasaremos a cumplir la función comprueba()-------//
//---------------------------------------------------------------------------------// 
function comprueba(){
    //Declaramos las variables 
    var code = document.getElementById("codi").value;
    var cognom = document.getElementById("cognoms").value;
    var error = document.getElementById("errades");
    
    //Dejamos el cuadro de texto "error" en blanco
    error.innerHTML = "";

    //Si la caja <apellidos> está vacía, da error
    if (cognom == ""){
        error.innerHTML = "[ERROR] Por favor, inserte unos apellidos correctos.";
        
    //Si el cuadro de texto <Password> aparece vacío, avisa del error
    }else if (code == ""){	
        error.innerHTML = "[ERROR] Por favor, inserte una contraseña correcta.";   	
        
    //Si el código no está vacío
    }else{				
        compruebaCodi(code);  
    }

}

function compruebaCodi (){
    var code = document.getElementById("codi").value;
    var codigo = /^[A-Z]{1,3}[?]?[0-9]{2,4}(GAT|GOS|PIN)[$]$/i;
    var error = document.getElementById("errades");
    
    //Comprobamos que el <código> sea correcto
    if(codigo.test(code)){
        alert("Aviso de redirección de página. ¿Desea continuar?"); 

        //Si todo está bien, nos redirige a la otra web
        window.location="secret.html"; 

    //Si la contraseña es errónea, nos avisa en el cuadro error
    }else{        
        error.innerHTML = "[ERROR] Su contraseña no es correcta"; 
    } 
} 

//---------------------------------------------------------------------------------//
//-------Al hacer click en <reset>, pasaremos a cumplir la función reset()---------//
//---------------------------------------------------------------------------------// 
function reset(){
    var nom = document.getElementById("nom");
    var cognoms = document.getElementById("cognoms");
    var edat = document.getElementById("edat");
    var dni = document.getElementById("dni");
    var email = document.getElementById("correu");
    var code = document.getElementById("codi");
    var error = document.getElementById("errades");

    error.innerHTML = "Se han borrado los datos insertados!";
    nom.value = "";
    cognoms.value = "";
    edat.value = "";
    dni.value = "";
    email.value = "";
    code.value = "";
    
}