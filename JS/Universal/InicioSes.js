$(document).ready(function() {
	firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			// var token = result.credential.accessToken;
		}
		// The signed-in user info.
		var user = result.user;
	}).catch(function(error) {
		// Handle Errors here.
		var errorCode = error.code;
		var errorMessage = error.message;
		if (errorCode === 'auth/account-exists-with-different-credential') {
			$('#LEnviar').val('El correo asociado ya ha sido usado');
			setTimeout(function () {
				$('#LEnviar').val('Registrarme');
			}, 8000);
		} else {
			console.error(errorCode);
			console.error(errorMessage);
		}
	});

	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			// User is signed in.
			window.location.replace("/Perfil/");
		}
	});

	$('#LIFacebook').click(function(event) {
		var provider = new firebase.auth.FacebookAuthProvider();
		provider.addScope('public_profile');
		provider.addScope('email');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#LIGoogle').click(function(event) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('https://www.googleapis.com/auth/plus.login');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#LIGithub').click(function(event) {
		var provider = new firebase.auth.GithubAuthProvider();
		provider.addScope('user:email');
		firebase.auth().signInWithRedirect(provider);
	});
	$('#FEmailSend').click(function(event) {
		var emailAddress = $("#LICorreo").val();
		if ($('#FEmailSend').html() != 'El correo ha sido enviado'){
			if (emailAddress.length > 0 && $('#LICorreo').is(':valid')){
				firebase.auth().sendPasswordResetEmail(emailAddress).then(function() {
					$('#FEmailSend').html('El correo ha sido enviado');
					$('#FEmailSend').removeClass('FalseBtn');
				}).catch(function(error) {
					$('#FEmailSend').html('Ocurrió un error al enviar el correo');
				});
			} else {
				$('#FEmailSend').html('Ingresa un correo válido');
				setTimeout(function () {
					$('#FEmailSend').html('Enviar correo de recuperación');
				}, 3000);
			}
		}
	});

	$('#LoginForm').validate({
		rules: {
			LEmail: {
				required: true,
				email: true
			},
			LPass: {
				required: true
			}
		},
		messages: {
			LEmail: {
				required: 'Campo obligatorio',
				email: 'Correo no válido'
			},
			LPass: {
				required: 'Campo obligatorio'
			}
		},
		errorElement: 'span',
		errorPlacement: function(event, element){
			event.insertAfter(element);
		},
		submitHandler: function(form){
			firebase.auth().signInWithEmailAndPassword($("#LICorreo").val(),$("#LIPass").val()).then(function(user){
				window.location.replace("/Perfil/");
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;
				switch(errorCode){
					case 'auth/account-exists-with-different-credential':
						$('#LEnviar').val('Credenciales incorrectas');
						setTimeout(function () {
							$('#LEnviar').val('Iniciar sesión');
						}, 3000);
						break;
					default:
						$('#ForgotEmail').css('display', 'inline-block');
						$('#LEnviar').val('Datos incorrectos :c');
						setTimeout(function () {
							$('#LEnviar').val('Iniciar sesión');
						}, 3000);
						break;
				}
			});
		}
	});
});