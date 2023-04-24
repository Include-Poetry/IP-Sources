/* ----------------- Modo noche ----------------- */
var MenuBars = '#fff',
	picori = 'N.png',
	picsec = 'B.png';
var DarkActive = false;

function DarkMode(){
	if (DarkActive){
		DarkActive = false;
	} else {
		DarkActive = true;
	}
	$('h1, h2, h3, h4, h5, h6, h2 a').toggleClass('DrkTextB1');

	$('#main p, #main dl, #main p a, #main blockquote, #main ul, #main ol, #main ul a, #main p a:not(.TagPost)').toggleClass('DrkTextB2'); 
	$('.Nav a, #ComentAct h2, .MJXc-display, #omegaList li, #omegaList span').toggleClass('DrkTextB2');
	$('html, #navLeft').toggleClass('DrkBgO1');
	$('#omegaDiv').toggleClass('DrkBgO3');
	$('#omegaDiv').toggleClass('DrkSdwO1');
	$('#omegaList li').toggleClass('DrkBordO2');
	$('#omegaList .omegaBtn, #navRight').toggleClass('DrkBordO1');
	$('#navLeft').toggleClass('DrkBordO3');
	$('blockquote').toggleClass('DrkBordB1');
	$('code, .TagPost').toggleClass('DrkBgO2 DrkBordO3');
	$('.aux-msg, .aux-msg a, .aux-msg .close-button').toggleClass('DrkTextB1');

	$('table').toggleClass('DrkTextB2 DrkBgO4');
	$('table tr:nth-child(even), #omegaList .omegaBtn, #navRight').toggleClass('DrkBgO2');

	// Perfil
	$('.UPCampo, .UPDIco, .UPUIco, .UPButtons, #UKDescs, #UKList, .UPDIn, .UPUIn, #UPUIcoDesc, #UploadPic, .UPCampo .UPDNom').toggleClass('DrkBgO1 DrkBordO3 DrkTextO5');
	// Iniciar sesión y registro
	$('.LIOpt, .UPUTex:not(#DPMoreIn), .SUOpt').toggleClass('DrkBgO1 DrkBordO3 DrkTextO5 DrkBtnHov');
	// De los botones ya se encaga Perfil.js
	$('.UPButtons button').toggleClass('DrkBtnAct');
	$('.UPButtons button:disabled').toggleClass('DrkBtnAct');

	// Para bucador
	$('#search-input input').toggleClass('DrkBgO2 DrkTextB1 DrkBordO3 DrkInFocus');
	$('#algolia-logo a').toggleClass('DrkTextO5');
	$('#stats').toggleClass('DrkTextB2');
	$('#filtros-div').toggleClass('DrkFiltersHover');

	// Barra de menú con sus objetos
	var src = $('#LogoMenuN').attr("src").replace(picori, picsec);
	$('#LogoMenuN').attr("src", src);
	var srcMin = $('#LMN').attr("src").replace(picori, picsec);
	$('#LMN').attr("src", srcMin);
	var temp = picori;
	picori = picsec;
	picsec = temp;
	$('#MenuBars em').css('background', MenuBars);
	if (MenuBars == '#fff'){
		MenuBars = '#000';
	} else {
		MenuBars = '#fff';
	}

	/* --- Formulario de contacto --- */
	$('#ContactForm input, #ContactForm select, #ContactForm textarea').toggleClass('DrkBgO2 DrkBordO3 DrkTextB2');
	$('#CFTerms, #CFTerms label a').toggleClass('DrkTextB2'); 
	$("#ContactForm #Enviar").toggleClass('DrkBgO2Cf DrkBordO3Cf');
}

$(document).ready(function() {
	var date = new Date();
	var hour = date.getHours();
	if (hour > 17 || hour < 7){
		DarkMode();
	} else if (DarkActive){
		DarkMode();
	}
});
/* ----------------- Fin modo noche ----------------- */