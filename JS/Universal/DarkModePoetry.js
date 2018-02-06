/* ----------------- Modo noche ----------------- */
var DarkActive = false;

function DarkModePoetry(){
	if (DarkActive){
		DarkActive = false;
	} else {
		DarkActive = true;
	}

	/* --- Cuerpo del texto --- */
	$('h1, h2, h3, h4, h5, h6, h2 a').toggleClass('DrkTextB1');
	$('html').toggleClass('DrkBgO1');
	$('p, p a, blockquote, ul, ol, dl, ul a, .MJXc-display').toggleClass('DrkTextB2');
	$('blockquote').toggleClass('DrkBgO6 DrkBordO4');
	
	/* --- Cabecera, títulos y menú --- */
	$('.HOficial, .HOficial section a').toggleClass('DrkTextB1 DrkBgO1');
	$('.btn-multi .btn').toggleClass('DrkTextO2 DrkBgB1');
	$('.btn-multi a, .btn-multi label > .icon').toggleClass('DrkTextO2');

	/* --- Tags y code snippet --- */
	$('code, .TagPost').toggleClass('DrkBgO2 DrkBordO3');
	$('.TagPost').toggleClass('DrkTagPost');

	/* --- Navegación inferior ---*/
	$('body section article nav a').toggleClass('DrkTextB2');

	/* --- Tablas --- */
	$('table').toggleClass('DrkBgO5');
	$('table td').toggleClass('DrkTextB2');
	$('table th').toggleClass('DrkTextB3');

	/* --- Formulario de contacto --- */
	$('#ContactForm input, #ContactForm textarea').toggleClass('DrkBgO2 DrkBordO3 DrkTextB2');
	$("#ContactForm #Enviar").toggleClass('DrkTextB3');

	/* --- Formulario de contacto --- */
	$('#search-input input').toggleClass('DrkBgO2 DrkTextB1 DrkBordO3 DrkInFocus');
	$('#algolia-logo a').toggleClass('DrkTextO5');
	$('#stats').toggleClass('DrkTextB2');
	$('#filtros-div').toggleClass('DrkFiltersHover');
}

$(document).ready(function() {
	var user = firebase.auth().currentUser;
	var date = new Date();
	var hour = date.getHours();
	if (user) {
		var uid = user.uid;
		firebase.database().ref('/SiteUI/' + uid).on('value', function(snapshot){
			var DarkAuto = snapshot.val().DarkModeAuto;
			var DarkForced = snapshot.val().DarkMode;
			if (DarkAuto){
				if (hour > 19 || hour < 7){
					if (!DarkActive){
						DarkModePoetry();
					}
				} else if (DarkActive){
					DarkModePoetry();
				}
			} else {
				if (DarkForced){
					if (!DarkActive){
						DarkModePoetry();
					}
				} else if (DarkActive){
					DarkModePoetry();
				}
			}
		});
	} else {
		if (hour > 19 || hour < 7){
			DarkModePoetry();
		} else if (DarkActive){
			DarkModePoetry();
		}
	}
});
/* ----------------- Fin modo noche ----------------- */