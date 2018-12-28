var drkFlag = false;
var drkString = '';
var usingEmail = false;
var RecentLogIn = false;

///*function GetDarkClass(){
	// La función sólo actualiza el estado de drkFlag y drkString 
	// pues el promise de la función no nos permite hacer return
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
}*/
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
function ShowErrorBoxAndLeave(box, msg){
	// Muestra un mensaje de error en donde están los botones
	// box = El id de la caja auxiliar ej. '#Aux1'
	// msg = El mensaje que se deberá mostrar ej. 'La imagen mide más de 200kb'
	$(box).html(msg);
	$(box).slideDown("slow", function(){
		setTimeout(function(){
			$(box).slideUp("slow");
		}, 3000);
	});
}
function UpdateProviders(){
	var user = firebase.auth().currentUser;
	// Primero reseteamos como si todo estuviera desactivado
	// Así no lidiamos con casos especiales de si estaba o no
	$('#PCPfacebook').removeClass('fa-toggle-on');
	$('#PCPfacebook').addClass('fa-toggle-off');
	$('#PCPgithub').removeClass('fa-toggle-on');
	$('#PCPgithub').addClass('fa-toggle-off');
	$('#PCPgoogle').removeClass('fa-toggle-on');
	$('#PCPgoogle').addClass('fa-toggle-off');
	// Revisamos los proveedores que ya existen y esos ponemos como activos
	// El resto ya qeudó como inactivo por las líneas de arriba
	user.providerData.forEach(function (profile) {
		var provider = profile.providerId;
		if (provider == 'facebook.com'){
			$('#PCPfacebook').removeClass('fa-toggle-off');
			$('#PCPfacebook').addClass('fa-toggle-on');
		} else if (provider == 'github.com'){
			$('#PCPgithub').removeClass('fa-toggle-off');
			$('#PCPgithub').addClass('fa-toggle-on');
		} else if (provider == 'google.com'){
			$('#PCPgoogle').removeClass('fa-toggle-off');
			$('#PCPgoogle').addClass('fa-toggle-on');
		} else if (provider == 'password'){
			usingEmail = true;
			$('#PCPcorreo').removeClass('fa-toggle-off');
			$('#PCPcorreo').addClass('fa-toggle-on');
		}
	});
	if (!usingEmail){
		$('#PassSettings').css('display', 'none');
		$('#MailSettings').css('display', 'none');
		$('#PCPassTitle').css('display', 'none');
		$('#PCEmailTitle').css('display', 'none');
	}
}
function UpdateCustomSiteUI(){
	var uid = firebase.auth().currentUser.uid;
	firebase.database().ref('/SiteUI/' + uid).on('value', function(snapshot){
		// Reseteamos todo a desactivado para no usar casos especiales
		$('#PCDrkAuto').removeClass('fa-toggle-on');
		$('#PCDrkAuto').addClass('fa-toggle-off');
		$('#PCDrkForced').removeClass('fa-toggle-on');
		$('#PCDrkForced').addClass('fa-toggle-off');
		// Revisamos el valor de la configuración
		var DarkAuto = snapshot.val().DarkModeAuto;
		var DarkForced = snapshot.val().DarkMode;
		if (DarkAuto){	
			$('#PCDrkAuto').removeClass('fa-toggle-off');
			$('#PCDrkAuto').addClass('fa-toggle-on');
			// Con esto quitamos el puntero del cursor al default
			$('#PCDrkForced').addClass('BtnDis');
		} else {
			$('#PCDrkForced').removeClass('BtnDis');
		}
		if (DarkForced){
			$('#PCDrkForced').removeClass('fa-toggle-off');
			$('#PCDrkForced').addClass('fa-toggle-on');
		}
	});
}
function ChangePass(){
	var user = firebase.auth().currentUser;
	// Recuperamos las entradas
	var oldPassword = $('#PCPassOld').val();
	var newPassword = $('#PCPassNew').val();
	var newPasswordConf = $('#PCPassNew2').val();
	// Manejamos errores de formato sencillos
	if (oldPassword.length < 1 || newPassword.length < 1 || newPasswordConf.length < 1){
		return 'size';
	} else if (newPassword != newPasswordConf){
		return 'no-match';
	} else if (newPassword.length < 8){
		return 'short';
	} else if (newPassword.length > 30){
		return 'big';
	}
	// Reautenticamos para hacer el cambio
	var email = user.email;
	var credential = firebase.auth.EmailAuthProvider.credential(email, oldPassword);
	user.reauthenticateWithCredential(credential).then(function() {
		// Si se reautentica con éxito se procede a hacer el cambio
		user.updatePassword(newPassword).then(function() {
			ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'Contraseña actualizada');
		}).catch(function(error) {
			console.error(error.code);
			ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'Error al actualizar');
		});
	}).catch(function(error) {
		console.error(error.code);
		ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'La contraseña vieja no es correcta');
	});
}
function ChangeMail(){
	var user = firebase.auth().currentUser;
	// Recuperamos las entradas
	var newMail = $('#PCMailNew').val();
	var newMailConf = $('#PCMailNew2').val();
	var passMail = $('#PCMailPass').val();
	// Evaluamos la validez del correo y manejamos errores simples
	var evalCorreo = $('#PCMailNew').is(':valid');
	if (!evalCorreo){
		return 'invalid';
	} else if (newMail != newMailConf){
		return 'no-match';
	}
	// Reautenticamos para hacer el cambio
	var oldMail = user.email;
	var credential = firebase.auth.EmailAuthProvider.credential(oldMail, passMail);
	user.reauthenticateWithCredential(credential).then(function() {
		// Si se reautentica con éxito se procede a hacer el cambio
		user.updateEmail(newMail).then(function() {
			user.sendEmailVerification();
			ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'Listo, enviamos un correo de confirmación');
		}).catch(function(error) {
			ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'Error al actualizar');
			console.error(error.code);
		});
	}).catch(function(error) {
		ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'La contraseña no es correcta');
		console.error(error.code);
	});	
}
function ChangeDarkSettings(opc, type){
	var user = firebase.auth().currentUser;
	var uid = user.uid;
	var NuevoSet;
	if (type == 'auto'){
		if (opc == 0){
			NuevoSet = { DarkModeAuto: false };
		} else {
			NuevoSet = { DarkModeAuto: true };
		}
	} else if (type == 'forced'){
		if (opc == 0){
			NuevoSet = { DarkMode: false };
		} else {
			NuevoSet = { DarkMode: true };
		}
	}
	firebase.database().ref().child('/SiteUI/' + uid).update(NuevoSet);
}
function LinkAccounts(prov){
	// Handler de vinculaciones para reciclar código
	var provider;
	switch (prov){
		case 1:
			provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/plus.login');
			break;
		case 2:
			provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('public_profile');
			provider.addScope('email');
			break;
		case 3:
			provider = new firebase.auth.GithubAuthProvider();
			provider.addScope('user:email');
			break;
	}
	firebase.auth().currentUser.linkWithRedirect(provider);
}
function UnlinkAccount(prov){
	var user = firebase.auth().currentUser;
	// Se revisa la desvinculación y se actualiza
	user.unlink(prov).then(function() {
		ShowErrorBoxAndLeave('#AuxPC10', 'Desvinculado correctamente')
		UpdateProviders();
	}).catch(function(error) {
		ShowErrorBoxAndLeave('#AuxPC10', 'Error al desvincular')
		console.error(error.code);
		UpdateProviders();
	});
}
function ReauthExternal(prov){
	// Handler de vinculaciones para reciclar código
	var provider;
	switch (prov){
		case 'google.com':
			provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('https://www.googleapis.com/auth/plus.login');
			break;
		case 'facebook.com':
			provider = new firebase.auth.FacebookAuthProvider();
			provider.addScope('public_profile');
			provider.addScope('email');
			break;
		case 'github.com':
			provider = new firebase.auth.GithubAuthProvider();
			provider.addScope('user:email');
			break;
	}
	firebase.auth().currentUser.reauthenticateWithRedirect(provider);
}

$(window).ready(function(event) {
	firebase.auth().getRedirectResult().then(function(result) {
		if (result.credential) {
			RecentLogIn = true;
		}
	}).catch(function(error) {
		console.error(error.code);
	});
	firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			UpdateProviders();
			UpdateCustomSiteUI();
		} else {
			window.location.replace("/Iniciar-sesion/");
		}
	});

	//GetDarkClass();	// Pre cargamos el DarkMode

	/* --- Cambio de contraseña --- */
	$('#EditPC8').click(function(event) {
		// Reseteo de valores
		$('#PCPassOld').val('');
		$('#PCPassNew').val('');
		$('#PCPassNew2').val('');
		// Arreglamos con CSS
		$('#DonePC8, #CancelPC8').removeAttr('disabled');
		$('#EditPC8').attr('disabled', 'true');
		if (drkFlag){
			$('#EditPC8, #DonePC8, #CancelPC8').toggleClass('DrkBtnAct');
		}
		$('#PassSettings .UPDOut').css('display', 'none');
		$('#PassSettings .UPDIn').css('display', 'inline-block');
	});
	$('#DonePC8').click(function(event) {
		var Stat = ChangePass();
		if (Stat == 'fine'){
			// Se maneja en la función
		} else {
			if (Stat == 'size'){
				ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'Debes rellenar todos los campos');
			} else if (Stat == 'no-match'){
				ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'Las contraseñas no coinciden');
			} else if (Stat == 'short'){
				ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'Mínimo 8 caracteres');
			} else if (Stat == 'big'){
				ShowErrorBox('#AuxPC8', '#EditPC8, #DonePC8, #CancelPC8', 'Máximo 30 caracteres');
			} else if (Stat == 'new-pass'){
				// Se maneja en la función
			} else if (Stat == 're-auth'){
				// Se maneja en la función
			}
		}
		// Regresamos el formato con CSS y actualizamos
		$('#DonePC8, #CancelPC8').attr('disabled', 'true');
		$('#EditPC8').removeAttr('disabled');
		if (drkFlag){
			$('#EditPC8, #DonePC8, #CancelPC8').toggleClass('DrkBtnAct');
		}
		$('#PassSettings .UPDOut').css('display', 'inline-block');
		$('#PassSettings .UPDIn').css('display', 'none');
	});
	$('#CancelPC8').click(function(event) {
		// Regresamos el formato con CSS
		$('#DonePC8, #CancelPC8').attr('disabled', 'true');
		$('#EditPC8').removeAttr('disabled');
		if (drkFlag){
			$('#EditPC8, #DonePC8, #CancelPC8').toggleClass('DrkBtnAct');
		}
		$('#PassSettings .UPDOut').css('display', 'inline-block');
		$('#PassSettings .UPDIn').css('display', 'none');
	});
	/* --- Fin cambio de contraseña --- */

	/* --- Cambio de correo --- */
	$('#EditPC9').click(function(event) {
		// Reseteo de valores
		$('#PCMailNew').val('');
		$('#PCMailNew2').val('');
		$('#PCMailPass').val('');
		// Arreglamos con CSS
		$('#DonePC9, #CancelPC9').removeAttr('disabled');
		$('#EditPC9').attr('disabled', 'true');
		if (drkFlag){
			$('#EditPC9, #DonePC9, #CancelPC9').toggleClass('DrkBtnAct');
		}
		$('#MailSettings .UPDOut').css('display', 'none');
		$('#MailSettings .UPDIn').css('display', 'inline-block');
	});
	$('#DonePC9').click(function(event) {
		var Stat = ChangeMail();
		if (Stat == 'fine'){
			// Se maneja en la función
		} else {
			if (Stat == 'no-match'){
				ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'Los correos no coinciden');
			} else if (Stat == 'invalid'){
				ShowErrorBox('#AuxPC9', '#EditPC9, #DonePC9, #CancelPC9', 'Ese correo no es válido');
			} else if (Stat == 'new-mail'){
				// Se maneja en la función
			} else if (Stat == 're-auth'){
				// Se maneja en la función
			}
		}
		// Regresamos el formato con CSS
		$('#DonePC9, #CancelPC9').attr('disabled', 'true');
		$('#EditPC9').removeAttr('disabled');
		if (drkFlag){
			$('#EditPC9, #DonePC9, #CancelPC9').toggleClass('DrkBtnAct');
		}
		$('#MailSettings .UPDOut').css('display', 'inline-block');
		$('#MailSettings .UPDIn').css('display', 'none');
	});
	$('#CancelPC9').click(function(event) {
		// Regresamos el formato con CSS
		$('#DonePC9, #CancelPC9').attr('disabled', 'true');
		$('#EditPC9').removeAttr('disabled');
		if (drkFlag){
			$('#EditPC9, #DonePC9, #CancelPC9').toggleClass('DrkBtnAct');
		}
		$('#MailSettings .UPDOut').css('display', 'inline-block');
		$('#MailSettings .UPDIn').css('display', 'none');
	});
	/* --- Fin cambio de correo --- */

	/* --- Vinculación de cuentas --- */
	$('#PCPgoogle').click(function(event) {
		var alredyUsed = $('#PCPgoogle').hasClass('fa-toggle-on');
		if (alredyUsed){
			UnlinkAccount('google.com');
		} else {
			LinkAccounts(1);
		}
	});
	$('#PCPfacebook').click(function(event) {
		var alredyUsed = $('#PCPfacebook').hasClass('fa-toggle-on');
		if (alredyUsed){
			UnlinkAccount('facebook.com');
		} else {
			LinkAccounts(2);	
		}
	});
	$('#PCPgithub').click(function(event) {
		var alredyUsed = $('#PCPgithub').hasClass('fa-toggle-on');
		if (alredyUsed){
			UnlinkAccount('github.com');
		} else {
			LinkAccounts(3);	
		}
	});
	$('#PCPcorreo').click(function(event) {
		var alredyUsed = $('#PCPcorreo').hasClass('fa-toggle-on');
		if (!alredyUsed){
			$('#AccountsLink > span').removeClass('PCEmailProv');
			$('#PCPcorreo').removeClass('fa-toggle-off');
			$('#PCPcorreo').addClass('fa-cog fa-spin');
			$('#PCEmailProv').slideToggle('fast');
			$('#SaveEmailProv').slideToggle('fast');
			$('#SaveEmailProv').removeAttr('disabled');
			if (drkFlag){
				$('#SaveEmailProv').toggleClass('DrkBtnAct');
			}
		}
	});
	$('#SaveEmailProv').click(function(event) {
		var evalCorreo = $('#CPEmailIn').is(':valid');
		var newMail = $('#CPEmailIn').val();
		var newPass = $('#CPPassIn').val();
		var newPassConf = $('#CPPassConfIn').val();

		if (!evalCorreo) {
			ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'El correo no es válido');
		} else if (newPass != newPassConf){
			ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'Las contraseñas no coinciden');
		} if (newPass.length < 1){
			ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'Debes especificar una contraseña');
		} else if (newPass.length < 8){
			ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'Al menos 8 caracteres de contraseña');
		} else if (newPass.length > 30){
			ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'Máximo 30 caracteres de contraseña');
		} else {	
			if (!RecentLogIn){
				ShowErrorBox('#AuxPC10', '#SaveEmailProv', 'Reautenticando...');
				setTimeout(function(){
					var user = firebase.auth().currentUser;
					user.providerData.forEach(function (profile) {
					    ReauthExternal(profile.providerId);
					});
				}, 2000);
			} else {
				var credential = firebase.auth.EmailAuthProvider.credential(newMail, newPass);
				firebase.auth().currentUser.linkWithCredential(credential).then(function(user) {
					location.reload(); 
				}, function(error) {
					console.error(error.code);
				});
			}
		}
	});
	/* --- Fin vinculación de cuentas --- */

	/* --- Vista del sitio --- */
	$('#PCDrkAuto').click(function(event) {
		var alredyUsed = $('#PCDrkAuto').hasClass('fa-toggle-on');
		if (alredyUsed){
			ChangeDarkSettings(0, 'auto');
		} else {
			ChangeDarkSettings(1, 'auto');
		}
	});
	$('#PCDrkForced').click(function(event) {
		var alredyForced = $('#PCDrkForced').hasClass('fa-toggle-on');
		var alredyAuto = $('#PCDrkAuto').hasClass('fa-toggle-on');
		// Si auto ya está activada entonces no se puede cambiar el forzado
		if (!alredyAuto){
			if (alredyForced){
				ChangeDarkSettings(0, 'forced');
			} else {
				ChangeDarkSettings(1, 'forced');
			}
		}
	});
	/* --- Fin vista del sitio --- */
});