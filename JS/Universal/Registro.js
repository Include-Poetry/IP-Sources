function LoadNewData(uid, name){
	var NuevaInfo = {
		Nombre: name,
		Apellidos: '',
		Nacionalidad: '',
		Estado: '',
		Nacimiento: '',
		Escolaridad: '',
		Grado: '',
		Sexo: ''
	};
	var NuevosIntereses = {
		Biología: false,
		Física: false,
		Geografía: false,
		Historia: false,
		Informática: false,	
		Matemáticas: false,	
		Química: false
	};
	var TipoUsuario = {
		Asesor: false,
		Competidor: false,
		Delegado: false,
		Desarrollador: false,
		Entrenador: false,		
		Estudiante: false,
		Investigador: false
	};
	var NuevoContacto = {
		Facebook: '',
		Celular: '',
		Correo: '',
		Website: '',
		Github: ''
	};
	var AccStats = {
		BasicData: false,
		Contacto: false,
		InteresA: false,
		InteresE: false,
		TipodeUsuario: false,
		UserGrls: false
	};
	var Descrip = {
		Descripcion: ''
	};
	var SiteUI = {
		DarkModeAuto: true,
		DarkMode: false
	};
	firebase.database().ref('/TipodeUsuario/' + uid).once('value').then(function(snapshot) {
		// Si verdadero entonces ya se ha añadido este usuario
		var Bandera = snapshot.hasChild('Competidor');
		if (!Bandera){
			var updates = {};
			updates['/BasicData/' + uid] 	= NuevaInfo;
			updates['/InteresA/' + uid] 	= NuevosIntereses;
			updates['/InteresE/' + uid] 	= NuevosIntereses;
			updates['/TipodeUsuario/' + uid] = TipoUsuario;
			updates['/Contacto/' + uid] 	= NuevoContacto;
			updates['/CuentaStat/' + uid] 	= AccStats;
			updates['/UserGrls/' + uid] 	= Descrip;
			updates['/SiteUI/' + uid] 		= SiteUI;
			firebase.auth().currentUser.updateProfile({ displayName: name }).then(function() {
				firebase.database().ref().update(updates).then(function() {
					window.location.replace("/Perfil/");
				}).catch(function(error) {
					console.error(error.code);
				});
			}).catch(function(error) {
				console.error(error.code);
			});
		} else {
			window.location.replace("/Perfil/");
		}
	});
}

$(document).ready(function() {
	var NoSignupProcess = false;
	// Result from Redirect auth flow.
	firebase.auth().getRedirectResult().then(function(result) {
		// The signed-in user info.
		var user = result.user;
		if (user != null){
			$('#LEnviar').val('Cargando tu perfil...');
			var name = user.displayName;
			var uid = user.uid;
			LoadNewData(uid, name);
		}
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		console.error(errorCode)
		if (errorCode === 'auth/account-exists-with-different-credential') {
			$('#LEnviar').val('El correo asociado ya ha sido usado');
			setTimeout(function () {
				$('#LEnviar').val('Registrarme');
			}, 8000);
		} else {
			if (errorMessage == "user is null"){
				NoSignupProcess = true;
			}
		}
	});

	firebase.auth().onAuthStateChanged(function(user) {
		// Tiene que estar autenticado y no en proceso de registro
		if (user && NoSignupProcess) {
			// User is signed in.
			window.location.replace("/Perfil/");
		}
	});

	$('#SUFacebook').click(function(event) {
		var provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('public_profile');
		provider.addScope('email');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#SUGoogle').click(function(event) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#SUGithub').click(function(event) {
		var provider = new firebase.auth.GithubAuthProvider();
		provider.addScope('user:email');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#RegisterForm').validate({
		rules:{
			SUMail: {
				required: true,
				email: true,
				minlength: 5,
				maxlength: 30
			},
			SUPassword: {
				required: true,
				minlength: 8,
				maxlength: 30
			},
			SUPasswordConf: {
				required: true,
				minlength: 8,
				equalTo: "#SUPass",
				maxlength: 30
			}
		},
		messages: {
			SUMail: {
				required: 'Campo obligatorio',
				email: 'Correo no válido',
				minlength: 'Mínimo 5 caracteres',
				maxlength: 'Máximo 30 caracteres'
			},
			SUPassword: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 8 caracteres',
				maxlength: 'Máximo 30 caracteres'
			},
			SUPasswordConf: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 8 caracteres',
				equalTo: 'Las contraseñas no coinciden',
				maxlength: 'Máximo 30 caracteres'
			}
		},
		errorElement: 'span',
		errorPlacement: function(event, element){
			event.insertAfter(element);
		},
		submitHandler: function(form){
			var correo = $("#SUCorreo").val();
			var pass = $("#SUPass").val();
			firebase.auth().createUserWithEmailAndPassword(correo, pass).then(function(user){
				$('#LEnviar').val('Cargando tu perfil...');
				// Enviamos correo de verificación
				user.sendEmailVerification();
				// Sacamos uid y cargamos info necesaria de nuevo ingreso
				var uid = user.uid;
				NoSignupProcess = false;	
				LoadNewData(uid, correo);
			}).catch(function(error) {
				// Manejamos errores
				var errorCode = error.code;
				switch(errorCode){
					case 'auth/email-already-in-use':
						$('#LEnviar').val('Correo ya en uso :c');
						setTimeout(function () {
							$('#LEnviar').val('Registrarme');
						}, 3000);
						break;
					case 'auth/invalid-email':
						$('#LEnviar').val('Correo no válido :c');
						setTimeout(function () {
							$('#LEnviar').val('Registrarme');
						}, 3000);
						break;
					case 'auth/operation-not-allowed':
						$('#LEnviar').val('Operación denegada :c');
						setTimeout(function () {
							$('#LEnviar').val('Registrarme');
						}, 3000);
						break;
					case 'auth/weak-password':
						$('#LEnviar').val('Contraseña débil :c');
						setTimeout(function () {
							$('#LEnviar').val('Registrarme');
						}, 3000);
						break;
				}
			});
		}
	});
});