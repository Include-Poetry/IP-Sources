var drkFlag = false;
var drkString = '';

function GetDarkClass(){
	var dateDrk = new Date();
	var nDrk = dateDrk.getHours();
	var user = firebase.auth().currentUser;
	if (user) {
		var uid = user.uid;
		firebase.database().ref('/SiteUI/' + uid).on('value', function(snapshot){
			var DarkAuto = snapshot.val().DarkModeAuto;
			var DarkForced = snapshot.val().DarkMode;
			if (DarkAuto){
				if (nDrk > 19 || nDrk < 7){
					drkString = 'DrkBgO1 DrkBordO3 DrkTextO5';
					drkFlag = true;
				} else {
					drkString = '';
					drkFlag = false;
				}
			} else {
				if (DarkForced){
					drkString = 'DrkBgO1 DrkBordO3 DrkTextO5';
					drkFlag = true;
				} else {
					drkString = '';
					drkFlag = false;
				}
			}
		});
	} else {
		if (nDrk > 19 || nDrk < 7){
			drkString = 'DrkBgO1 DrkBordO3 DrkTextO5';
			drkFlag = true;
		} else {
			drkString = '';
			drkFlag = false;
		}
	}
}
function UpdateAccountIconState(){
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var bandera = true;
	firebase.database().ref('/CuentaStat/' + uid).orderByValue().once("value", function(snapshot){
		snapshot.forEach(function(data){
			// Todo debe estar completo excepto los intereses en enseñar
			if (!data.val() && data.key != 'InteresE'){
				bandera = false;
			}
		});
		if (bandera){
			$('#AccStatIcon').removeClass('fa-clock');
			$('#AccStatIcon').addClass('fa-check-circle');
			$('#AccStatIcon').attr('title', 'Tu perfil está shido');
		} else {
			$('#AccStatIcon').removeClass('fa-check-circle');
			$('#AccStatIcon').addClass('fa-clock');
			$('#AccStatIcon').attr('title', 'Tu perfil está incompleto');
		}
	});
}
function UpdatePresentation(){
	var StatComplete = true;
	// Variables de firebase
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	// Si el usuario no ha verificado su cuenta se marca como no lista la cuenta
	var emailVerified = user.emailVerified;
	if (!emailVerified){
		StatComplete = false;
		var accStats = 'No has confirmado tu dirección de correo electrónico. '
				 +  '<span id="SendAgain">Volver a enviar correo de confirmación</span>. ';
		$('#AccountStatus').html(accStats);
	}
	var database = firebase.database();
	var storage = firebase.storage();
	// Actualizamos el nombre y ubicación
	database.ref('BasicData/' + uid).once("value", function(snapshot) {
		var Nombre = snapshot.val().Nombre,
			Apellidos = snapshot.val().Apellidos,
			Nacionalidad = snapshot.val().Nacionalidad,
			Estado = snapshot.val().Estado;
		$('#DPName').html(Nombre + ' ' + Apellidos);
		if (Nacionalidad == '' && Estado != ''){
			$('#DPNacio').html(Estado);
		} else if (Estado == '' && Nacionalidad != ''){
			$('#DPNacio').html(Nacionalidad);
		} else if (Estado == '' && Nacionalidad == ''){
			$('#DPNacio').html('Lugar de residencia');
		} else {
			$('#DPNacio').html(Nacionalidad + ', ' + Estado);
		}
	});
	// Actualizamos el tipo de usuario generando una cadena de texto simple
	database.ref('TipodeUsuario/' + uid).once("value", function(snapshot) {
		var cadenaesa = '';
		snapshot.forEach(function(data){
			if (data.val()){
				cadenaesa += data.key + ', ';
			}
		});
		if (cadenaesa == ''){
			// Si aún no hay tipo de usuario ponemos texto default
			$('#DPType').html("Tipo de usuario");
		} else {
			// Quitamos la última coma que se agregó, para que se vea bien
			$('#DPType').html(cadenaesa.slice(0, -2));
		}
	});
	// Actualizamos descripción y username
	database.ref('UserGrls/' + uid).once("value", function(snapshot) {
		var Descripcion = snapshot.val().Descripcion;
		if (Descripcion.length == 0){
			StatComplete = false;
			$('#DPMore').html('Aquí va tu descripción');
		} else {
			$('#DPMore').html(Descripcion);
			$('#DPMoreIn').val(Descripcion);
		}
		var username = snapshot.val().username;
		if (username == null){
			StatComplete = false;
		}
		$('#BIFUsername').html(username);
		$('#BIFUsernameIn').val(username);
		firebase.database().ref().child('/CuentaStat/' + uid ).update({UserGrls: StatComplete});
	});
	// Actualizamos imagen de perfil
	storage.ref().child('Imagenes/ProfilePics/' + uid).getDownloadURL().then(function(url) {
		$('#FotoPerfil').css('background-image', 'url("'+ url + '")');
	}).catch(function(error) {
		// Manejamos los errores sólo en la consola
		switch (error.code) {
			case 'storage/object-not-found':
				// Cargando foto del provedor
				var photoMail = firebase.auth().currentUser.photoURL;
				$('#FotoPerfil').css('background-image', 'url("'+ photoMail + '")');
			break;
			case 'storage/unauthorized':
				console.error(error.code);
			break;
			case 'storage/canceled':
				console.error(error.code);
			break;
			case 'storage/unknown':
				console.error(error.code);
			break;
		}
	});
}
function UpdateBasicData(){
	var StatComplete = false;
	// Obtenemos información básica de firebase
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('BasicData/' + uid).once("value", function(snapshot) {
		var Nombre 			= snapshot.val().Nombre,
			Apellidos 		= snapshot.val().Apellidos,
			Nacionalidad 	= snapshot.val().Nacionalidad,
			Estado 			= snapshot.val().Estado,
			Nacimiento 		= snapshot.val().Nacimiento,
			Escolaridad		= snapshot.val().Escolaridad,
			Grado 			= snapshot.val().Grado,
			Sexo 			= snapshot.val().Sexo;
		// Revisamos que este apartado esté completo y actualizamos
		if (Nombre.length > 0 && Apellidos.length > 0 && Nacionalidad.length > 0 && Nacimiento.length > 0){
			if (Estado.length > 0 && Escolaridad.length > 0 && Grado.length > 0 && Sexo.length > 0) {
				StatComplete = true;
			}
		}
		firebase.database().ref().child('/CuentaStat/' + uid ).update({BasicData: StatComplete});
		// Actualizamos lo que se muestra y lo que se rellena
		$('#BIFName').html(Nombre);
		$('#BIFNameIn').val(Nombre);
		$('#BILName').html(Apellidos);
		$('#BILNameIn').val(Apellidos);
		$('#BINaci').html(Nacionalidad);
		$('#BINaciIn').val(Nacionalidad);
		$('#BIState').html(Estado);
		$('#BIStateIn').val(Estado);
		$('#BIBirth').html(Nacimiento);
		$('#BIBirthIn').val(Nacimiento);
		$('#BISchool').html(Escolaridad);
		$('#BISchoolIn').val(Escolaridad);
		$('#BIGrade').html(Grado);
		$('#BIGradeIn').val(Grado);
		$('#BISex').html(Sexo);
		$('#BISexIn').val(Sexo);
	});
}
function UpdateContactMethods(){
	var StatComplete;
	// Consultamos firebase
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('Contacto/' + uid).once("value", function(snapshot) {
		var Facebook		= snapshot.val().Facebook,
			Website 		= snapshot.val().Website,
			Correo		 	= snapshot.val().Correo,
			Celular			= snapshot.val().Celular,
			Github	 		= snapshot.val().Github;
		// Con un método de contacto que exista se da por completo el apartado
		if (Facebook.length > 0 || Website.length > 0 || Correo.length > 0 || Celular.length > 0 || Github.length > 0){
			StatComplete = true;
		} else {
			StatComplete = false;
		}
		firebase.database().ref().child('/CuentaStat/' + uid ).update({Contacto: StatComplete});
		// Actualizamos lo que se muestra y lo que se rellena
		$('#CMCorreo').html('<a href="mailto:' + Correo + '">' + Correo + '</a>');
		$('#CMCorreoIn').val(Correo);
		$('#CMFacebook').html('<a href="https://www.facebook.com/' + Facebook + '" target="_blank">' + Facebook + '</a>');
		$('#CMFacebookIn').val(Facebook);
		$('#CMGithub').html('<a href="https://github.com/' + Github + '" target="_blank">' + Github + '</a>');
		$('#CMGithubIn').val(Github);
		$('#CMWebsite').html('<a href="' + Website + '" target="_blank">' + Website + '</a>');
		$('#CMWebsiteIn').val(Website);
		$('#CMCelular').html(Celular);
		$('#CMCelularIn').val(Celular);
	});
}
function UpdateUserType(){
	// Para DarkMode
	GetDarkClass();
	var StatComplete = true;
	// Contadores para no agregar o quitar de donde ya no hay
	var addIcon = 0, deleteIcon = 0;
	// Consultamos firebase
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('TipodeUsuario/' + uid).orderByValue().once("value", function(snapshot){
		snapshot.forEach(function(data){
			if (data.val()){
				addIcon++;
				// Metemos cada elemento que sea true en su estructura html y lo añadimos a la lista con append
				var Elemento = '<span class="UPCampo UPUno ' + drkString + '">'
							 	+ '<span class="UPUIco"><i class="fas fa-book"></i></span>'
							 	+ '<span class="UPUTex">' + data.key + '</span>'
							 	+ '<button class="UPUIco UPUDel"><i class="fas fa-times"></i></button>'
							 + '</span>';
				$('#UKCol1').append(Elemento);
			} else {deleteIcon++;}
		});
		// Evaluamos si se puede ser quitando o agregando, sino no ponemos el botón
		if (!addIcon){ 
			$('#Delete1').attr('disabled', 'true');
			// Si ya no se puede eliminar, es porque no hay nada y entonces marcamos como incompleto
			StatComplete = false;
		}
		if (!deleteIcon){ $('#Add1').attr('disabled', 'true');}
		firebase.database().ref().child('/CuentaStat/' + uid ).update({TipodeUsuario: StatComplete});
	});
}
function UpdateInterestsA(){
	// Para DarkMode
	GetDarkClass();
	var StatComplete = true;
	// Contadores para no agregar o quitar de donde ya no hay
	var addIcon = 0, deleteIcon = 0;
	// Consultamos firebase
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('InteresA/' + uid).orderByValue().once("value", function(snapshot){
		snapshot.forEach(function(data){
			if (data.val()){
				addIcon++;
				// Metemos sólo los que están marcados como true en su estructura html y hacemos append
				var Elemento = '<span class="UPCampo UPUno ' + drkString + '">'
							 	+ '<span class="UPUIco"><i class="fas fa-book"></i></span>'
							 	+ '<span class="UPUTex">' + data.key + '</span>'
							 	+ '<button class="UPUIco UPUDel"><i class="fas fa-times"></i></button>'
							 + '</span>';
				$('#OrgInterestA').append(Elemento);
			} else {deleteIcon++;}
		});
		// Evaluamos si se puede ser quitando o agregando, sino no ponemos el botón
		if (!addIcon){ 
			$('#Delete3').attr('disabled', 'true');
			// Si ya no se puede eliminar, es porque no hay nada y entonces marcamos como incompleto
			StatComplete = false;
		}
		if (!deleteIcon){ $('#Add3').attr('disabled', 'true');}
		firebase.database().ref().child('/CuentaStat/' + uid ).update({InteresA: StatComplete});
	});
}
function UpdateInterestsE(){
	// Para DarkMode
	GetDarkClass();
	var StatComplete = true;
	// Contadores para no agregar o quitar de donde ya no hay
	var addIcon = 0, deleteIcon = 0;
	// Consultamos firebase
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('InteresE/' + uid).orderByValue().once("value", function(snapshot){
		snapshot.forEach(function(data){
			if (data.val()){
				addIcon++;
				// Metemos sólo los que están marcados como true y los añadimos con su html haciendo append
				var Elemento = '<span class="UPCampo UPUno ' + drkString + '">'
								+ '<span class="UPUIco"><i class="fas fa-book"></i></span>'
							 	+ '<span class="UPUTex">' + data.key + '</span>'
							 	+ '<button class="UPUIco UPUDel"><i class="fas fa-times"></i></button>'
							 + '</span>';
				$('#OrgInterestE').append(Elemento);
			} else {deleteIcon++;}
		});
		// Evaluamos si se puede ser quitando o agregando, sino no ponemos el botón
		if (!addIcon){ 
			$('#Delete4').attr('disabled', 'true');
			// Si ya no se puede eliminar, es porque no hay nada y entonces marcamos como incompleto
			StatComplete = false;
		}
		if (!deleteIcon){ $('#Add4').attr('disabled', 'true');}
		firebase.database().ref().child('/CuentaStat/' + uid ).update({InteresE: StatComplete});
	});
}
function ValidUsername(username){
	// Devuelve una cadena indicando la evaluación del username
	if (username.indexOf(' ') >= 0){
		// Que no existan espacios
		return "spaces";
	} else if (username.length > 20){
		// Que no sea mayor a 20 caracteres
		return "size";
	} else return "fine" // Todo bien
}
function ShowErrorBox(box, others, msg){
	// Muestra un mensaje de error en donde están los botones
	// box = El id de la caja auxiliar ej. '#Aux1'
	// others = Los ids de los botones a esconder ej. '#Edit1, #Done1, #Cancel1'
	// msg = El mensaje que se deberá mostrar ej. 'La imagen mide más de 200kb'
	$(box).html(msg);
	$(others).slideUp("slow", function(){
		$(box).slideDown("slow", function(){
			setTimeout(function(){
				$(box).slideUp("slow", function(){
					$(others).slideDown("slow");
				});
			}, 3000);
		});
	});
}
function validCellnumber(num){
	if (num.length == 0){
		return 'fine';
	} else if (num.indexOf(' ') >= 0){
		return 'spaces';
	} else if (num.match(/[a-z]/i)){
		return 'letter';
	} else if (num[0] != '+'){
		return 'nomas';
	} else if (num.length > 13 || num.length < 13){
		return 'size';
	} else return 'fine';
}
function validExternalUser(user, site){
	// Indica si un usuario es válido para facebook o github según indique site
	if (user.length == 0){
		// Si no hay nada es que no contestó y lo dejó en blanco, eso se vale
		return true;
	}
	if (site == 'git'){
		if (!/^[a-zA-Z0-9-]*$/.test(user)){
			return false;
		} else if (user[0] == '-' || user[user.length - 1] == '-'){
			return false;
		} else if (user.indexOf('--') > -1 || user.indexOf('---') > -1){
			return false;
		} else return true;
	}
	if (!/^[a-zA-Z0-9]*$/.test(user)){
		return false;
	} else return true;
}

$(window).on('load', function() {
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
		} else {
			// User is signed out.
			window.location.replace("/Iniciar-sesion/");
		}
	});

	GetDarkClass();			// Precalculamos el Dark Mode
	UpdatePresentation();	// Datos de presentación
	UpdateBasicData();		// Información básica
	UpdateContactMethods();	// Datos de contacto
	UpdateUserType();		// Tipo de usuario
	UpdateInterestsA();		// Intereses en aprender
	UpdateInterestsE();		// Intereses en enseñar
	UpdateAccountIconState(); // Ícono de cuenta completa/incompleta

	/* --- Descripción de tipos de usuario --- */
	$('.UKLIcon').click(function(event) {
		// Formamos el ID a mostrar con el prefijo genérico y lo que indica el ícono
		var letrero = '#UKD';
		letrero += $(this).attr('DescFor');
		// Resaltamos el ícono actual y ocultamos el resto
		// Mostramos el letrero indicado y ocultamos el resto
		$(letrero).css('display', 'inline-block');
		if (drkFlag){
			$(this).addClass('UKLISelectDrk');
			$('.UKLIcon').not(this).removeClass('UKLISelectDrk');
		} else {
			$(this).addClass('UKLISelect');
			$('.UKLIcon').not(this).removeClass('UKLISelect');
		}
		$('.UKDesc').not(letrero).css('display', 'none');
	});
	/* --- Fin descripción de tipos de usuario --- */

	/* --- Volver a enviar correo de confirmación --- */
	$('#SendAgain').click(function(event) {
		var user = firebase.auth().currentUser;
		user.sendEmailVerification().then(function() {
		  $('#SendAgain').html('El mensaje ha sido enviado, revisa tu correo.');
		}).catch(function(error) {
		  $('#SendAgain').html('No ha sido posible enviar el mensaje, intenta más tarde');
		});
	});
	/* --- Fin volver a enviar correo de confirmación --- */

	/* --- Presentación --- */
	$('#Edit1').click(function(event) {
		// Reseteamos el input que puede disparar un falso archivo por subir
		$('#UploadPicButton').wrap('<form>').closest('form').get(0).reset();
		$('#UploadPicButton').unwrap();
		// Arreglamos todos los elementos con CSS
		$('#Done1, #Cancel1').removeAttr('disabled');
		$('#Edit1').attr('disabled', 'true');
		if (drkFlag){
			$('#Edit1, #Done1, #Cancel1, #UploadPic, #UploadPic').toggleClass('DrkBtnAct');
		}
		$('#Presentacion #DPMore, #Presentacion .UPDOut').css('display', 'none');
		$('#Presentacion #DPMoreIn, #UploadPic').css('display', 'inline-block');
		$('#Presentacion .UPDIn').css('display', 'inline-block');
	});
	$('#Done1').click(function(event) {
		// Variables de firebase
		var user = firebase.auth().currentUser;
		var uid = user.uid;
		// Guardamos los datos que llegan
		var Descripcion = $('#DPMoreIn').val();
		var NombreUsuario = $('#BIFUsernameIn').val();
		var AnteriorUsername = $('#BIFUsername').html();
		// Obtenemos imagen por cargar si es que la hay
		var file = $('#UploadPicButton').prop('files')[0];
		if (file){
			// Revisamos que cumpla con el tamaño
			if (file.size > 200000){
				ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'La foto no debe medir más de 200kb');
			} else {
				// El archivo es válido y se procede a subir
				var uploadTask = firebase.storage().ref().child('Imagenes/ProfilePics/' + uid).put(file);
				uploadTask.on('state_changed', function(snapshot){
					var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('Upload is ' + progress + '% done');
					switch (snapshot.state) {
						case firebase.storage.TaskState.PAUSED: // or 'paused'
						  	console.log('Upload is paused');
						  	break;
						case firebase.storage.TaskState.RUNNING: // or 'running'
						  	console.log('Upload is running');
						  	// Mostramos ícono de loading mientras tanto
						  	$('#UploadPic').html('<i class="fas fa-spinner fa-spin"></i>');
						  	$('#UploadPic').css('display', 'inline-block');
						  	break;
					}
				}, function(error) {
					// Se manejan los errores en la subida
				  	ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'Ocurrió un error al subir la foto :c');
				  	console.error(error.code);
				}, function() {
					// La subida finalizó con éxito, restauramos el íncono de subida y actualizamos
					$('#UploadPic').css('display', 'none');
					$('#UploadPic').html('<i class="fas fa-upload"></i>');
					UpdatePresentation();
					// Actualizamos el estatus de la cuenta en el ícono
					UpdateAccountIconState();
				});
			}
		}
		// Se revisa validez del username
		var UsrNmEval = ValidUsername(NombreUsuario);
		if (UsrNmEval == "fine"){
			// Intentamos actualizar username probando con el userMatch que guarda el usuario normalizado
			firebase.database().ref().child('/UserGrls/' + uid).update({usernameMatch: NombreUsuario.toLowerCase()}).then(function(){
				// Borramos el anterior username (que está guardado normalizado)
				firebase.database().ref().child('/usernames/' + AnteriorUsername.toLowerCase()).remove();
				// Actualizamos la lista de usernames tomados y normalizados
				firebase.database().ref().child('/usernames/').update({[NombreUsuario.toLowerCase()] : uid});
				// Actualizamos el username de display que no está normalizado pero es el que se muestra
				firebase.database().ref().child('/UserGrls/' + uid).update({username : NombreUsuario});
				user.updateProfile({
					displayName: NombreUsuario
				}).then(function() {
					// Update successful.
				}).catch(function(error) {
					// An error happened.
				});
			}).catch(function(error){
				// Se manejan errores, típicamente usuario ya tomado
				console.error(error.code);
				ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'Ya te han ganado ese usuario');
			});
		} else {
			// Errores con el username
			if (UsrNmEval == "size"){
				ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'No excedas 20 caracteres en nombre de usuario');
			} else if (UsrNmEval == 'spaces'){
				ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'No se aceptan espacios en usuario');
			}
		}
		if (Descripcion.length < 301){
			// Actualizamos la descripción
			firebase.database().ref().child('/UserGrls/' + uid).update({Descripcion: Descripcion});
		} else {
			ShowErrorBox('#Aux1', '#Edit1, #Done1, #Cancel1', 'No más de 300 caracteres en descripción');
		}
		// Todo bien y cerramos la división
		UpdatePresentation();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
		$('#Done1, #Cancel1').attr('disabled', 'true');
		$('#Edit1').removeAttr('disabled');
		if (drkFlag){
			$('#Edit1, #Done1, #Cancel1, #UploadPic').toggleClass('DrkBtnAct');
		}
		$('#Presentacion #DPMore, #Presentacion .UPDOut').css('display', 'inline-block');
		$('#Presentacion #DPMoreIn, #UploadPic, #Presentacion .UPDIn').css('display', 'none');
	});
	$('#Cancel1').click(function(event) {
		// Arreglamos con CSS y actualizamos
		$('#Done1, #Cancel1').attr('disabled', 'true');
		$('#Edit1').removeAttr('disabled');
		if (drkFlag){
			$('#Edit1, #Done1, #Cancel1, #UploadPic').toggleClass('DrkBtnAct');
		}
		$('#Presentacion #DPMore, #Presentacion .UPDOut').css('display', 'inline-block');
		$('#Presentacion #DPMoreIn, #UploadPic, #Presentacion .UPDIn').css('display', 'none');
		UpdatePresentation();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin presentación --- */

	/* --- Información básica --- */
	$('#Edit2').click(function(event) {
		// Arreglamos con CSS
		$('#Done2, #Cancel2').removeAttr('disabled');
		$('#Edit2').attr('disabled', 'true');
		if (drkFlag){
			$('#Edit2, #Done2, #Cancel2').toggleClass('DrkBtnAct');
		}
		$('#BasicInfo .UPDOut').css('display', 'none');
		$('#BasicInfo .UPDIn').css('display', 'inline-flex');
	});
	$('#Done2').click(function(event) {
		// Obtenemos datos nuevos
		var NName = 	$('#BIFNameIn').val(),
			NLName = 	$('#BILNameIn').val(),
			NNaci = 	$('#BINaciIn').val(),
			NState =	$('#BIStateIn').val(),
			NBirth =	$('#BIBirthIn').val(),
			NSchool =	$('#BISchoolIn').val(),
			NGrade =	$('#BIGradeIn').val(),
			NSex = 		$('#BISexIn').val();
		// Se maneja la excepción de si es de otro país
		if (NNaci != "México") NState = "Extranjero";
		// Acomodamos para subir
		var NuevaInfo = {
			Nombre: NName,
			Apellidos: NLName,
			Nacionalidad: NNaci,
			Estado: NState,
			Nacimiento: NBirth,
			Escolaridad: NSchool,
			Grado: NGrade,
			Sexo: NSex
		};
		// Variable de firebase y actualizamos
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref().child('/BasicData/' + uid).update(NuevaInfo);
		// Regresamos el formato con CSS y actualizamos
		$('#Done2, #Cancel2').attr('disabled', 'true');
		$('#Edit2').removeAttr('disabled');
		if (drkFlag){
			$('#Edit2, #Done2, #Cancel2').toggleClass('DrkBtnAct');
		}
		$('#BasicInfo .UPDOut').css('display', 'inline-block');
		$('#BasicInfo .UPDIn').css('display', 'none');
		UpdateBasicData();
		UpdatePresentation();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	$('#Cancel2').click(function(event) {
		// Arreglamos con CSS y actualizamos
		$('#Done2, #Cancel2').attr('disabled', 'true');
		$('#Edit2').removeAttr('disabled');
		if (drkFlag){
			$('#Edit2, #Done2, #Cancel2').toggleClass('DrkBtnAct');
		}
		$('#BasicInfo .UPDOut').css('display', 'inline-block');
		$('#BasicInfo .UPDIn').css('display', 'none');
		UpdateBasicData();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin información básica --- */

	/* --- Información de contacto --- */
	$('#Edit7').click(function(event) {
		// Arreglamos con CSS
		$('#Done7, #Cancel7').removeAttr('disabled');
		$('#Edit7').attr('disabled', 'true');
		if (drkFlag){
			$('#Edit7, #Done7, #Cancel7').toggleClass('DrkBtnAct');
		}
		$('#ContactMethods .UPDOut').css('display', 'none');
		$('#ContactMethods .UPDIn').css('display', 'inline-block');
	});
	$('#Done7').click(function(event) {
		// Recuperamos datos del usuario
		var Facebook = 	$('#CMFacebookIn').val(),
			Celular  = 	$('#CMCelularIn').val(),
			Correo   = 	$('#CMCorreoIn').val(),
			Website  =	$('#CMWebsiteIn').val(),
			Github 	 =	$('#CMGithubIn').val();
		// Hacemos las evaluaciones necesarias
		var evalCelular 	= validCellnumber(Celular),
			evalCorreo 		= $('#CMCorreoIn').is(':valid'),
			evalWebsite		= $('#CMWebsiteIn').is(':valid'),
			evalFacebook	= validExternalUser(Facebook, 'face'),
			evalGithub		= validExternalUser(Github, 'git');
		// Guardamos si todo es válido, sino mostramos errores
		if (evalCelular == 'fine' && evalCorreo && evalWebsite && evalFacebook && evalGithub){
			// Ordenamos para subir
			var NuevaInfo = {
				Facebook: Facebook,
				Celular: Celular,
				Correo: Correo,
				Website: Website,
				Github: Github
			};
			// Variable de firebase y actualizamos
			var uid = firebase.auth().currentUser.uid;
			firebase.database().ref().child('/Contacto/' + uid).update(NuevaInfo);
			// Regresamos el formato con CSS y actualizamos
			$('#Done7, #Cancel7').attr('disabled', 'true');
			$('#Edit7').removeAttr('disabled');
			if (drkFlag){
				$('#Edit7, #Done7, #Cancel7').toggleClass('DrkBtnAct');
			}
			$('#ContactMethods .UPDOut').css('display', 'inline-block');
			$('#ContactMethods .UPDIn').css('display', 'none');
			UpdateContactMethods();
			// Actualizamos el estatus de la cuenta en el ícono
			UpdateAccountIconState();
		} else {
			if (evalCelular == 'spaces'){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'El número no debe contener espacios');
			} else if (evalCelular == 'size'){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'Celular a 10 dígitos + 2 de lada');
			} else if (evalCelular == 'nomas'){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'Agrega un + antes de la lada');
			} else if (evalCelular == 'letter'){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'El número no debe contener letras');
			} else if (!evalCorreo){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'Ingresa un correo válido');
			} else if (!evalWebsite){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'La página web no es válida');
			} else if (!evalFacebook){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'Ese usuario de facebook no es válido');
			} else if (!evalGithub){
				ShowErrorBox('#Aux7', '#Edit7, #Done7, #Cancel7', 'Ese usuario de github no es válido');
			} 
		}
	});
	$('#Cancel7').click(function(event) {
		// Regresamos el formato con CSS
		$('#Done7, #Cancel7').attr('disabled', 'true');
		$('#Edit7').removeAttr('disabled');
		if (drkFlag){
			$('#Edit7, #Done7, #Cancel7').toggleClass('DrkBtnAct');
		}
		$('#ContactMethods .UPDOut').css('display', 'inline-block');
		$('#ContactMethods .UPDIn').css('display', 'none');
		UpdateContactMethods();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin información de contacto --- */

	/* --- Tipo de usuario --- */
	$('#Add1').click(function(event) {
		// Preveemos cambiando atributos de botones
		$('#Done3, #Cancel3').removeAttr('disabled');
		$('#Delete1, #Add1').attr('disabled', 'true');
		if (drkFlag){
			$('#Add1, #Delete1, #Done3, #Cancel3, #UserKind .UPUDel').toggleClass('DrkBtnAct');
		}
		// Para DarkMode
		var DarkClass = drkString;
		// Variables de control, firebase y estructura html
		var Existe;
		var uid = firebase.auth().currentUser.uid;
		var Elemento = '<span class="UPCampo UPUno '+ DarkClass + '">'
				 		+ '<span class="UPUIco">'
				 		   + '<i class="fas fa-book"></i>'
				 		+ '</span>'
				 		+ '<select class="UPUTex UPUIn" id="EntradaTempUT">'
				 		+ '</select>'
				 	 + '</span>';
		// Se añade el elemento a la lista
		$('#UKCol1').append(Elemento);
		// Consultamos en firebase
		firebase.database().ref('TipodeUsuario/' + uid).orderByValue().once("value", function(snapshot){
			// Para cada elemento disponible en tipo de usuario
			snapshot.forEach(function(data){
				Existe = data.val();
				// Si aún no lo ha tomado entonces se añade a la lista de posibles nuevos
				if (!Existe){
					$('#EntradaTempUT').append('<option class=" ' + DarkClass + '">' + data.key + '</option>');
				}
			});
		});
		// Formato de lista desplegable
		$('#UKCol1 .UPUno .UPUIn').css('display', 'inline-block');
	});
	$('#Done3').click(function(event) {
		// Aquí guardamos como cadena los tipos que sobrevivieron a agregar o borrar
		var CadenaFinal = '';
		$('#UKCol1 .UPUTex').not('#EntradaTempUT').each(function(index, el) {
			CadenaFinal += $(this).text() + ',';
		});
		CadenaFinal += $('#EntradaTempUT').val();
		// Aquí están los posibles tipos que pueden existir y se marcan como falsas
		var Areas = ["Competidor","Estudiante","Asesor","Delegado","Entrenador","Investigador","Desarrollador"];
		var Existencias = [false,false,false,false,false,false,false];
		// Se buscan todas en la cadena sobreviviente y las existentes se marcan como true
		for (var i = 0; i < Areas.length; i++) {
			if (CadenaFinal.search(Areas[i]) > -1){
				Existencias[i] = true;
			}
		}
		// El orden de los datos del arreglo debe coincidir con el de los objetos
		var NuevaInfo = {
			Competidor: Existencias[0],
			Estudiante: Existencias[1],
			Asesor: Existencias[2],
			Delegado: Existencias[3],
			Entrenador: Existencias[4],
			Investigador: Existencias[5],
			Desarrollador: Existencias[6]
		};
		// Actualizamos en firebase
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref().child('/TipodeUsuario/' + uid).update(NuevaInfo);
		// Quitamos el objeto de la lista desplegable
		$('#UKCol1 .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		// Restauramos botones y actualizamos
		$('#Done3, #Cancel3').attr('disabled', 'true');
		$('#Delete1, #Add1').removeAttr('disabled');
		if (drkFlag){
			$('#Add1, #Delete1, #Done3, #Cancel3, #UserKind .UPUDel').toggleClass('DrkBtnAct');
		}
		UpdateUserType();
		UpdatePresentation();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	$('#Delete1').click(function(event) {
		// Arreglamos con CSS
		$('#Done3, #Cancel3').removeAttr('disabled');
		$('#Delete1, #Add1').attr('disabled', 'true');
		if (drkFlag){
			$('#Add1, #Delete1, #Done3, #Cancel3, #UserKind .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#UserKind .UPUDel').css('display', 'inline-block');
	});
	$('#UKCol1').on('click', '.UPUDel', function(event){
		// Al presionar la cruz se borra el padre del objeto = el tipo a borrar
		$(this).parent().remove();
	});
	$('#Cancel3').click(function(event) {
		// Restauramos con CSS y actualizamos
		$('#Done3, #Cancel3').attr('disabled', 'true');
		$('#Delete1, #Add1').removeAttr('disabled');
		if (drkFlag){
			$('#Add1, #Delete1, #Done3, #Cancel3, #UserKind .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#UserKind .UPUDel').css('display', 'none');
		$('#UKCol1 .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		UpdateUserType();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin tipo de usuario --- */

	/* --- Áreas de interés aprender --- */
	$('#Add3').click(function(event) {
		// Preveemos configurando botones
		$('#Done5, #Cancel5').removeAttr('disabled');
		$('#Delete3, #Add3').attr('disabled', 'true');
		if (drkFlag){
			$('#Add3, #Delete3, #Done5, #Cancel5, #OrgInterestA .UPUDel').toggleClass('DrkBtnAct');
		}
		// Para DarkMode
		var DarkClass = drkString;
		// Varable de control, firebase, y estructural html
		var Existe;
		var uid = firebase.auth().currentUser.uid;
		var Elemento = '<span class="UPCampo UPUno ' + DarkClass + '">'
				 		+ '<span class="UPUIco">'
				 			+ '<i class="fas fa-book"></i>'
				 		+ '</span>'
				 		+ '<select class="UPUTex UPUIn" id="EntradaTemp">'
				 		+ '</select>'
				 	 + '</span>';
		// Se agrega la lista desplegable
		$('#OrgInterestA').append(Elemento);
		// Consultamos en firebase
		firebase.database().ref('InteresA/' + uid).orderByValue().once("value", function(snapshot){
			// Por cada posible
			snapshot.forEach(function(data){
				Existe = data.val();
				if (!Existe){
					// Añadimos sólo los que no tenemos ya
					$('#EntradaTemp').append('<option class=" ' + DarkClass + '">' + data.key + '</option>');
				}
			});
		});
		// Se organiza con CSS
		$('#OrgInterestA .UPUno .UPUIn').css('display', 'inline-block');
	});
	$('#Done5').click(function(event) {
		// Cadena con los sobrevivientes de agregar o borrar
		var CadenaFinal = '';
		$('#OrgInterestA .UPUTex').not('#EntradaTemp').each(function(index, el) {
			CadenaFinal += $(this).text() + ',';
		});
		CadenaFinal += $('#EntradaTemp').val();
		// Posibles áreas de interés inicializadas en falso
		var Areas = ["Matemáticas","Informática","Física","Biología","Química","Geografía","Historia"];
		var Existencias = [false,false,false,false,false,false,false];
		// Buscamos cada posible en la cadena de sobreviviente y marcamos como true las encontradas
		for (var i = 0; i < Areas.length; i++) {
			if (CadenaFinal.search(Areas[i]) > -1){
				Existencias[i] = true;
			}
		}
		// Ordenamos los datos empatando los arreglos
		var NuevaInfo = {
			Matemáticas: Existencias[0],
			Informática: Existencias[1],
			Física: Existencias[2],
			Biología: Existencias[3],
			Química: Existencias[4],
			Geografía: Existencias[5],
			Historia: Existencias[6]
		};
		// Actualizamos en firebase
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref().child('/InteresA/' + uid).update(NuevaInfo);
		// Se elimina la lista desplegable
		$('#OrgInterestA .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		// Restauramos botones y actualizamos
		$('#Done5, #Cancel5').attr('disabled', 'true');
		$('#Delete3, #Add3').removeAttr('disabled');
		if (drkFlag){
			$('#Add3, #Delete3, #Done5, #Cancel5, #OrgInterestA .UPUDel').toggleClass('DrkBtnAct');
		}
		UpdateInterestsA();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	$('#Delete3').click(function(event) {
		// Arreglamos con CSS
		$('#Done5, #Cancel5').removeAttr('disabled');
		$('#Delete3, #Add3').attr('disabled', 'true');
		if (drkFlag){
			$('#Add3, #Delete3, #Done5, #Cancel5, #OrgInterestA .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#InteresAprender .UPUDel').css('display', 'inline-block');
	});
	$('#OrgInterestA').on('click', '.UPUDel', function(event){
		// Al dar click en la cruz se elimina el objeto que lo contiene
		$(this).parent().remove();
	});
	$('#Cancel5').click(function(event) {
		// Se restaura con CSS y actualizando
		$('#Done5, #Cancel5').attr('disabled', 'true');
		$('#Delete3, #Add3').removeAttr('disabled');
		if (drkFlag){
			$('#Add3, #Delete3, #Done5, #Cancel5, #OrgInterestA .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#OrgInterestA .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		UpdateInterestsA();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin áreas de interés aprender --- */

	/* --- Áreas de interés enseñar --- */
	$('#Add4').click(function(event) {
		// Formateamos los botones
		$('#Done6, #Cancel6').removeAttr('disabled');
		$('#Delete4, #Add4').attr('disabled', 'true');
		if (drkFlag){
			$('#Add4, #Delete4, #Done6, #Cancel6, #OrgInterestE .UPUDel').toggleClass('DrkBtnAct');
		}
		// Para DarkMode
		var DarkClass = drkString;
		// Variable de control, firebase y estructura html
		var Existe;
		var uid = firebase.auth().currentUser.uid;
		var Elemento = '<span class="UPCampo UPUno ' + DarkClass + '">'
				 		+ '<span class="UPUIco">'
				 		   + '<i class="fas fa-book"></i>'
				 		+ '</span>'
				 		+ '<select class="UPUTex UPUIn" id="EntradaTempIE">'
				 		+ '</select>'
				 	 + '</span>';
		// Añadimos la lista desplegable dinámica
		$('#OrgInterestE').append(Elemento);
		// Consultamos en firebase
		firebase.database().ref('InteresE/' + uid).orderByValue().once("value", function(snapshot){
			snapshot.forEach(function(data){
				Existe = data.val();
				if (!Existe){
					// Sólo añadimos los que no tenemos ya
					$('#EntradaTempIE').append('<option class="' + DarkClass + '">' + data.key + '</option>');
				}
			});
		});
		// Formateamos con CSS
		$('#OrgInterestE .UPUno .UPUIn').css('display', 'inline-block');
	});
	$('#Done6').click(function(event) {
		// Cadena que almacena intereses sobrevivientes
		var CadenaFinal = '';
		$('#OrgInterestE .UPUTex').not('#EntradaTempIE').each(function(index, el) {
			CadenaFinal += $(this).text() + ',';
		});
		CadenaFinal += $('#EntradaTempIE').val();
		// Áreas posibles inicializadas en falso
		var Areas = ["Matemáticas","Informática","Física","Biología","Química","Geografía","Historia"];
		var Existencias = [false,false,false,false,false,false,false];
		// Buscamos los intereses que sobrevivieron y los ponemos a true
		for (var i = 0; i < Areas.length; i++) {
			if (CadenaFinal.search(Areas[i]) > -1){
				Existencias[i] = true;
			}
		}
		// Ordenamos y empatamos la nueva información
		var NuevaInfo = {
			Matemáticas: Existencias[0],
			Informática: Existencias[1],
			Física: Existencias[2],
			Biología: Existencias[3],
			Química: Existencias[4],
			Geografía: Existencias[5],
			Historia: Existencias[6]
		};
		// Actualizamos en firebase
		var uid = firebase.auth().currentUser.uid;
		firebase.database().ref().child('/InteresE/' + uid).update(NuevaInfo);
		// Eliminamos la lista desplegable
		$('#OrgInterestE .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		// Restauramos los botones y actualizamos
		$('#Done6, #Cancel6').attr('disabled', 'true');
		$('#Delete4, #Add4').removeAttr('disabled');
		if (drkFlag){
			$('#Add4, #Delete4, #Done6, #Cancel6, #OrgInterestE .UPUDel').toggleClass('DrkBtnAct');
		}
		UpdateInterestsE();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	$('#Delete4').click(function(event) {
		// Formateamos con CSS
		$('#Done6, #Cancel6').removeAttr('disabled');
		$('#Delete4, #Add4').attr('disabled', 'true');
		if (drkFlag){
			$('#Add4, #Delete4, #Done6, #Cancel6, #OrgInterestE .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#InteresEnsenar .UPUDel').css('display', 'inline-block');
	});
	$('#OrgInterestE').on('click', '.UPUDel', function(event){
		// Eliminamos el padre del sujeto que fue accionado
		$(this).parent().remove();
	});
	$('#Cancel6').click(function(event) {
		// Regresamos formateando CSS y actualizando
		$('#Done6, #Cancel6').attr('disabled', 'true');
		$('#Delete4, #Add4').removeAttr('disabled');
		if (drkFlag){
			$('#Add4, #Delete4, #Done6, #Cancel6, #OrgInterestE .UPUDel').toggleClass('DrkBtnAct');
		}
		$('#OrgInterestE .UPCampo').each(function(index, el) {
			$(this).remove();
		});
		UpdateInterestsE();
		// Actualizamos el estatus de la cuenta en el ícono
		UpdateAccountIconState();
	});
	/* --- Fin áreas de interés enseñar --- */
});