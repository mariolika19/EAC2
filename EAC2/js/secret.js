//Funció que genera un array amb quatre números diferents del 0 al 9
function creaArray(){

	// Initial empty array
	let arr = [];
	  
	do {
	    // Generem un número aleatori entre 0 i 9
	    const randomNumber = Math.floor(Math.random() * 10);
	  
	    // L'afegim a l'array si no està repetit
	    if (!arr.includes(randomNumber)) {
	        arr.push(randomNumber);
	    }
	  
	} while (arr.length < 4);
	  
	// Retornem l'array
	return arr;
}

//Ens assegurem que s'han carregat tots els elements del document
//abans de començar a treballar amb ells
 window.onload = function () {
 	
 	//Creamos el número a adivinar
	let numAEncertar = creaArray();

 	//Añadimos los elementos donde insertaremos los números
	let primer = document.getElementById("primer");
	let segon = document.getElementById("segon");
	let tercer = document.getElementById("tercer");
	let quart = document.getElementById("quart");

	//Funciones para doble click
	primer.addEventListener('dblclick', seleccion);
	segon.addEventListener('dblclick', seleccion);
	tercer.addEventListener('dblclick', seleccion);
	quart.addEventListener('dblclick', seleccion);

	//Funciones de entrada y salida del ratón
	primer.addEventListener('mouseenter', entraRatoli);
	primer.addEventListener('mouseleave', surtRatoli);
	segon.addEventListener('mouseenter', entraRatoli);
	segon.addEventListener('mouseleave', surtRatoli);
	tercer.addEventListener('mouseenter', entraRatoli);
	tercer.addEventListener('mouseleave', surtRatoli);
	quart.addEventListener('mouseenter', entraRatoli);
	quart.addEventListener('mouseleave', surtRatoli);


	//Evento para cuando pulsamos una tecla
	document.body.addEventListener('keydown', pulsacionTecla);
	
	//Evento para reiniciar
	var reiniciar = document.getElementById("reinici");
	reiniciar.addEventListener('click', reset);
	
	//Evento para comprobar el código
	var comprobar = document.getElementById("comprovar");
	comprobar.addEventListener('click', comprueba);
		
	/********************/
	/****** EAC1 *******/
	/********************/
	//Función de doble click
	function seleccion(e) {
		//Cogemos la clase "seleccionat" y su posición. 
		let seleccionat = document.getElementsByClassName("seleccionat")[0];

		//Quitamos la clase, para que no nos aparezca la barra
		seleccionat.classList.remove("seleccionat");

		//Sobre el elemento que se ha hecho el dobleClick, le añadimos la clase
		let elem = e.target;
		elem.classList.add("seleccionat");

	}

	//Función qcuando el ratón entra en una caja
	function entraRatoli(e){
		//Sobre el elemento que pasamos el ratón por encima, le añadimos la clase "sobre"	
		let elem = e.target;
		elem.classList.add("sobre");
	}

	//Función qcuando el ratón sale de una caja
	function surtRatoli(e){
		//Sobre el elemento que no pasamos el ratón por encima, le quitamos la clase "sobre"
		let elem = e.target;
		elem.classList.remove("sobre");
	}

	//Función cuando pulsamos alguna tecla del teclado
	function pulsacionTecla(e){
		//Cogemos el valor de la tecla
		let tecla = e.key;

		//Lo añadimos a la celda seleccionada
		let seleccion = document.getElementsByClassName("seleccionat")[0]; 
		
		//Si la tecla corresponde a un número, lo pondrá
		if (tecla >= '0' && tecla <= '9') {
			seleccion.textContent = tecla;
		}
		//Detectem l'ENTER
		else if(tecla == "Enter"){
			//Evitem que al presionar Enter sigui com si es fes un clic al botó d'Enviar
			event.preventDefault();
			crearIntentJQ();
		}	
	}

	//Función para reiniciar todo
	function reset(){
		numAEncertar = creaArray();
		primer.textContent = "?";
		segon.textContent = "?";
		tercer.textContent = "?";
		quart.textContent = "?";

		let fills = barraIntents.children.length;

		for(let i=0; i<fills; i++){
			//Esborrem sempre el primer fill (ja que van disminuint a mesura que els esborrem)
			barraIntents.removeChild(barraIntents.children[0]);
		}

	}


	/********************/
	/** EAC2: Apartat1 **/
	/********************/
	//Quitamos la barra, que se encuentra dentro de "intents"
	//Seleccionamos el elemento "intents"
	let barraIntents = document.getElementById('inici').firstElementChild.children[3];
	let intent = barraIntents.firstElementChild;	//Seleccionamos el primer hijo de "intents"
	//Borramos el elemento "intent"
	intent.parentNode.removeChild(intent);

	/********************/
	/** EAC2: Apartat2 **/
	/********************/
	//Modificamos la función 'comprovar' donde llamamos a "crearIntent"


	//Función para comprobar los resultados
	function comprueba(){
		let aciertos = mirarAciertos();
		let posOK = aciertos[0];
		let posKO = aciertos[1];
		let numIntr = aciertos[2]; //Array con el número introducido
		
		// EAC2.Apartat2: Aquí cridem a la funció que mostrarà l'intent a la part inferior
		crearIntent(posOK,posKO,numIntr);

	}

	//Funció que crea una barra "intent" abajo
	//EAC2.Apartat2
	function crearIntent(OK,KO,num){
		//Creamos la estructura de "intent"
		let divExtern = document.createElement('div');
		divExtern.classList.add('intent');

		//Creamos el primer <div>
		let primerDiv = document.createElement('div');
		//Creamos los diferentes <span> que contienen
		for(let i=0; i<4;i++){
			let span = document.createElement('span');
			let text = document.createTextNode(num[i]);
			span.appendChild(text);
			primerDiv.appendChild(span);
		}

		//Creamos el segundo <div>
		let segonDiv = document.createElement('div');
		//Creamos los elementos <i> de acierto según la posición
		for(let i=0; i<OK; i++){
			let elem = document.createElement('i');
			elem.classList.add('fas','fa-check-square');
			segonDiv.appendChild(elem);
		}
		//Creamos los <i> de número correcto, pero no en su posición
		for(let i=0; i<KO; i++){
			let elem = document.createElement('i');
			elem.classList.add('fas','fa-recycle');
			segonDiv.appendChild(elem);
		}

		//Creamos el tercer <div> con las flechas		
		let tercerDiv = document.createElement('div');
		//Flecha arriba
		let flechaArriba = document.createElement('i');
		flechaArriba.classList.add('fas','fa-arrow-alt-circle-up');
		tercerDiv.appendChild(flechaArriba);
		//Flecha Abajo
		let flechaAbajo = document.createElement('i');
		flechaAbajo.classList.add('fas','fa-arrow-alt-circle-down');
		tercerDiv.appendChild(flechaAbajo);

		//Creamos el cuarto<div>
		let quartDiv = document.createElement('div');
		//Añadimos el signo menos
		let signoMenos = document.createElement('i');
		signoMenos.classList.add('fas','fa-minus-square');
		quartDiv.appendChild(signoMenos);
		//Añadimos la papelera
		let escombreria = document.createElement('i');
		escombreria.classList.add('fas','fa-trash');
		quartDiv.appendChild(escombreria);

		
		//EAC2.Apartat4
		//Como este elemento se consigue en JS y se necesita pasar a JQuery, cambiamos el tipo de objeto
		asignarBorrado($(escombreria));
		//EAC2.Apartat5.1 - Con JQuery
		asignarArriba($(flechaArriba));
		//EAC2.Apartat5.2 - No JQuery
		asignarAbajo(flechaAbajo);
		//EAC2.Apartat6.1 - Con JQuery
		asignarEsconder($(signoMenos));

		divExtern.appendChild(primerDiv);
		divExtern.appendChild(segonDiv);
		divExtern.appendChild(tercerDiv);
		divExtern.appendChild(quartDiv);

		//Añadimos "intent" a la barra principal
		barraIntents.appendChild(divExtern);

	}

	//Función que nos devuelve un array con los números en posición correcta e incorrecta
	//y el número introducido
	function mirarAciertos(){
		let numPosOK = 0;	//Posición correcta
		let numPosKO = 0;	//Posición incorrecta, pero número válido
		let resultat = [];	//Array que almacena el resultado introducido

		let numIntroduit=[];	//Array que almacena los números introducidos

		//Añadimos los valores de los números introducidos
		numIntroduit.push(parseInt(primer.textContent));
		numIntroduit.push(parseInt(segon.textContent));
		numIntroduit.push(parseInt(tercer.textContent));
		numIntroduit.push(parseInt(quart.textContent));

		//Comprobamos si hay números en la posicion correcta (numPosOK) o
		//que estén pero en una posición incorrecta (numPosKO)
		for(let i=0; i<4; i++){
			if (numAEncertar[i] == numIntroduit[i]) {
				numPosOK++;
			} else {
				if(numAEncertar.includes(numIntroduit[i])){
					numPosKO++;
				}
			}
		}

		//Si tots els numeros són correctes, el jugador ha guanyat
		if (numPosOK == 4) {
			alert("Has encertat el número secret!");
			reset();
		}

		resultat.push(numPosOK);
		resultat.push(numPosKO);
		resultat.push(numIntroduit);

		return resultat;
	}

	//Función que crea un "intent" - JQuery
	function crearIntentJQ(){
		let encerts = mirarAciertos();
		let posOK = encerts[0];
		let posKO = encerts[1];
		let numIntr = encerts[2]; //Array amb el número introducido
		
		//Creamos el intent sin los aciertos
		let $intent = $('<div class="intent">\
                    <div>\
                        <span>'+numIntr[0]+'</span>\
                        <span>'+numIntr[1]+'</span>\
                        <span>'+numIntr[2]+'</span>\
                        <span>'+numIntr[3]+'</span>\
                    </div>\
                    <div>\
                    </div>\
                    <div>\
                        <i class="fas fa-arrow-alt-circle-up"></i>\
                        <i class="fas fa-arrow-alt-circle-down"></i>\
                    </div>\
                    <div>\
                        <i class="fas fa-minus-square"></i>\
                        <i class="fas fa-trash"></i>\
                    </div>\
                </div>');
		//Le añadimos los aciertos
		for(let i=0; i<posOK;i++){
			$intent.children().first().next().append($('<i class="fas fa-check-square"></i>'));
		}
		for(let i=0; i<posKO;i++){
			$intent.children().first().next().append($('<i class="fas fa-recycle"></i>'));
		}

		//EAC2.Apartat4
		asignarBorrado($intent.find('.fa-trash'));
		//EAC2.Apartat5.1
		asignarArriba($intent.find('.fa-arrow-alt-circle-up'))
		//EAC2.Apartat5.2 - Cambio a JS
		asignarAbajo($intent.find('.fa-arrow-alt-circle-down')[0]);
		//EAC2.Apartat6.1
		asignarEsconder($intent.find('.fa-minus-square'))

		//Añadimos "intent" al documento
		$('#inici').find('.intents').append($intent);
	}

	/********************/
	/** EAC2: Apartat4 **/
	/********************/
	//Asignamos la función de borrar con el icono de trash  - JQuery
	function asignarBorrado(elem){
		elem.on('click',function(){
			$(this).parents('.intent').remove();
		});

		//Borrado en JS
		// elem.addEventListener("click", function(){
		// 	let barra = this.parentNode.parentNode;
		// 	barra.parentNode.remove(barra);
		// });
	}

	/**********************/
	/** EAC2: Apartat5.1 **/
	/**********************/
	//Asignamos el evento de subir la barra cuando se pulsa el botón - JQuery
	function asignarArriba(elem){
		elem.on('click',function(){
			let $aquestaBarra = $(this).parents('.intent');
			let $barraArriba = $aquestaBarra.prev();
			$aquestaBarra.insertBefore($barraArriba);
		});
	}

	/**********************/
	/** EAC2: Apartat5.2 **/
	/**********************/
	//Asignamos el evento de bajar la barra cuando se pulsa el botón - JS
	function asignarAbajo(elem){
		elem.addEventListener('click', function(){
			let aquestaBarra = this.parentNode.parentNode;
			//Si no és l'últim element
			if(aquestaBarra.nextElementSibling){
				let barraDeBaix = aquestaBarra.nextElementSibling;
				//Fixeu-vos que l'hem d'afegir abans de l'element que està sota la barra de baix
				aquestaBarra.parentNode.insertBefore(aquestaBarra,barraDeBaix.nextElementSibling);
			}
			
		});
	}

	/**********************/
	/** EAC2: Apartat6.1 **/
	/**********************/
	//Asignamos el evento de esconderse cuando pulsamos [-] - JQuery
	function asignarEsconder(elem){
		elem.on('click',esconder);
	}

	function esconder(){
		let $aquestaBarra = $(this).parents('.intent');
		//Escondemos los hijos de los div que contiene la barra
		$aquestaBarra.children().children().hide();
		//Cambiamos su clase y así nos cambia el dibujo a [+]
		$(this).attr('class','fas fa-plus-square');
		//Mostramos solamente ese elemento
		$(this).show();
		//Le traemos el evento anterior
		$(this).off('click',esconder);
		//Le añadimos el nuevo evento - JScript
		$(this).get(0).addEventListener('click',mostrar);

		// let aquestaBarra = this.parents;
		// let estaB = this.document.getElementsByClassName("intent")[0];
		// //Escondemos los hijos de los div que contiene la barra
		// //estaB.style.visibility = "hidden";
		// //Cambiamos su clase y así nos cambia el dibujo a [+]
		// this.className= 'fa-plus-square';
		// //$(this).attr('class','fas fa-plus-square');
		// //Mostramos solamente ese elemento
		// // this.show();
		// // //Le traemos el evento anterior
		// // this.off('click',esconder);
		// // //Le añadimos el nuevo evento - JScript
		// // this.get(0).addEventListener('click',mostrar);
	}

	/**********************/
	/** EAC2: Apartat6.2 **/
	/**********************/
	//Asignamos el evento en la función esconder() - JavaScript
	function mostrar(){
		let aquestaBarra = this.parentNode.parentNode;
		let hijos = aquestaBarra.children.length;

		//Para cada <div>, mostraremos sus hijos
		//Como hemos usado .hide() de jQuery, cambiamos la propiedat 'display = none' de ellos
		for(let i=0; i<hijos;i++){
			let hijosBarra = aquestaBarra.children[i].children.length;
				for(let j=0; j<hijosBarra;j++){
					aquestaBarra.children[i].children[j].style.display='inline';
				}
		}

		//Cambiamos el icono a [-]
		this.classList.remove('fa-plus-square');
		this.classList.add('fa-minus-square');
		//Traemos el evento anterior
		this.removeEventListener('click',mostrar);
		//Le añadimos el nuevo con JQuery
		$(this).on('click',esconder);
	}
}


