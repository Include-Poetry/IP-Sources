$(document).ready(function() {
	$('#RegisterForm').validate({
		rules:{
			RNombre: {
				required: true,
				minlength: 3,
				maxlength: 30
			},
			RApellidos: {
				required: true,
				minlength: 5,
				maxlength: 60
			},
			RUsuario: {
				alphanumeric: true,
				required: true,
				minlength: 5,
				maxlength: 20,
			},
			REmail: {
				required: true,
				email: true,
				minlength: 5,
				maxlength: 30
			},
			RPass: {
				required: true,
				minlength: 8,
				maxlength: 30
			},
			RPassc: {
				required: true,
				minlength: 8,
				equalTo: "#RPass",
				maxlength: 30
			}
		},
		messages: {
			RNombre: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 3 caracteres',
				maxlength: 'Máximo 30 caracteres'
			},
			RApellidos: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 5 caracteres',
				maxlength: 'Máximo 60 caracteres'
			},
			RUsuario: {
				alphanumeric: 'Sólo letras, números y guiones bajos',
				required: 'Campo obligatorio',
				minlength: 'Mínimo 5 caracteres',
				maxlength: 'Máximo 20 caracteres',
			},
			REmail: {
				required: 'Campo obligatorio',
				email: 'Correo no válido',
				minlength: 'Mínimo 5 caracteres',
				maxlength: 'Máximo 30 caracteres'
			},
			RPass: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 8 caracteres',
				maxlength: 'Máximo 30 caracteres'
			},
			RPassc: {
				required: 'Campo obligatorio',
				minlength: 'Mínimo 8 caracteres',
				equalTo: 'Las contraseñas no coinciden',
				maxlength: 'Máximo 30 caracteres'
			}
		},
		errorElement: 'span',
		errorPlacement: function(event, element){
			var placement = $(element).data('error');
			if (placement) {
				$(placement).append(event)
			} else {
				event.insertBefore(element);
			}
		},
		submitHandler: function(form){
			firebase.auth().createUserWithEmailAndPassword($("#REmail").val(),$("#RPass").val()).then(function(user){
				$("#RegisterForm, #RFDefP").fadeOut('slow', function() {
					$('#RFGraT').fadeIn('slow', function(){
						$('#RFGraP').fadeIn('slow');
					});
				});
				user.sendEmailVerification();
				var s_user = user.uid;

				var nombre = $('#RNombre').val(),
					apellido = $('#RApellidos').val(),
					usuario = $('#RUsuario').val(),
					tipoUsuario = $('#RTipo option:selected').text();

				firebase.database().ref('users/' + s_user).set({
					f_name: nombre,
					l_name: apellido,
					user_iP: usuario,
					user_t: tipoUsuario
				});
				console.log('Creación exitosa de usuario');

				setTimeout(function () {
					console.log('Redirigiendo...');
					window.location.href = "https://www.include-poetry.com";
				}, 9000);
			}).catch(function(error) {
				var errorCode = error.code;
				var errorMessage = error.message;

				if (errorCode){
					$("#RegisterForm, #RFDefP").fadeOut('slow', function() {
						$('#RFErrT').fadeIn('slow', function(){
							$('#RFErrP, #RFErrD').fadeIn('slow');
						});
					});
				}
					
				switch(errorCode){
					case 'auth/email-already-in-use':
						$('#RFErrD').html('El correo ingresado ya está registrado');
						break;
					case 'auth/invalid-email':
						$('#RFErrD').html('El correo no es válido');
						break;
					case 'auth/operation-not-allowed':
						$('#RFErrD').html('Operación inválida');
						break;
					case 'auth/weak-password':
						$('#RFErrD').html('Contraseña muy débil');
						break;
				}
			});
		}
	});
});