/* -------- Volver arriba -------- */
var limite = 500;
$(window).scroll(function() {
	if ($(window).scrollTop() > limite) {
		$('.VolverA').fadeIn('slow');
	} else {
		$('.VolverA').fadeOut('slow');
	}

	$('.Aparece').each(function(i) {
		var FondoDeObjeto = $(this).offset().top + $(this).outerHeight();
		var FondoDeVentana = $(window).scrollTop() + $(window).height();

		/* Si es completamente visible entonces se muestra */
		if (FondoDeVentana > FondoDeObjeto) {
			$(this).animate({
				'opacity': '1'
			}, 500);
		}
	});
});	
$('.VolverA').click(function() {
	$('html, body').animate({
		scrollTop: 0
	}, 700);
	return false;
});
/* --------- Fin volver arriba ------- */

/* --------- Lista de contenido ------- */
$('#ListaContenido li').click(function(event) {
	var extra = 20;
	if ($('#HPost').height() > 0){ // True si se aplica desde Poetry
		extra += $('#HPost').height();
	} else {
		if($('#NavUl').css('display') == 'block'){ // Aplica en Article
			extra = $('#NavUl').height();
		}
	}
	// Normalizamos los id's, pasando a minúscula
	// Quitando caracteres especiales y poniendo guiones
	var GotoNormal = $(this).text();
	var GotoManual = $(this).attr('link');
	var Goto = '';
	if (GotoManual == null){
		// .replace(/[^a-z0-9-\s]/gi, '')
		Goto = GotoNormal.toLowerCase().replace(/[_\s]/g, '-');
	} else {
		Goto = GotoManual.replace(/[^a-z0-9-\s]/gi, '').replace(/[_\s]/g, '-');
	}
	
	$('html,body').animate({
		scrollTop: $('#' + Goto).offset().top - extra
	}, 2000);
});
/* --------- Fin lista de contenido ------- */

/* --------- Facebook comments ------- */
$("#ComentAct").click(function(event) {
	$(".CajaComent").slideToggle("slow");
});
/* --------- Fin Facebook comments ------- */

/* ----------------- Modo noche ----------------- */
function DarkMode(){
	var blanco = '#fff',
		blanco2 = '#ccc',
		oscuro1 = '#131313',
		comentarios = '#aaa',
		oscuro2 = '#333',
		oscuro3 = '#7d7c78',
		oscuro4 = '#555',
		picori = 'N.png',
		picsec = 'B.png';

	$('h1, h2, h3, h4, h5, h6, h2 a').css('color', blanco);
	$('p, p a, ul, ol, ul a, #RegisterForm, #RegisterForm input, #RegisterForm select, #main p a:not(.TagPost), .Nav a, #ComentAct h2, .MJXc-display').css('color', blanco2); 
	$('html').css('background-color', oscuro1);
	$('.CajaComent').css('background-color', comentarios);
	$('blockquote').css('border-left-color', blanco);
	$('code, .TagPost, #RegisterForm input, #RegisterForm select').css({
		'background-color': oscuro2,
		'border-color': oscuro3,
	});
	$('#HPost').css({
		'color': blanco,
		'background-color': '#131313'
	});
	$('.btn-multi .btn').css({
		'color': oscuro2,
		'background-color': blanco
	});
	$('.btn-multi a, .btn-multi label > .icon').css('color', oscuro2);
	$('body section article nav a').css('color', blanco2);
	if ($('blockquote').css('background-color') == 'rgb(249, 249, 249)'){
		$('blockquote').css({
			'background-color': '#222',
			'border-left-color': '#666'
		});
	}
	$('#RegisterForm span').css('color', '#F92672');
	$('table').css({
		'background-color': oscuro4,
		'color': blanco2,
	});
	$('#Captcha').attr({
		'data-theme': 'dark'
	});
	$('table tr:nth-child(even)').css('background-color', oscuro2);
	var src = $('#LogoMenuN').attr("src").replace(picori, picsec);
	$('#LogoMenuN').attr("src", src);
	var srcMin = $('#LMN').attr("src").replace(picori, picsec);
	$('#LMN').attr("src", srcMin);
	$('#MenuBars em').css('background', blanco);
}
var running = false,
    count = 0,
    sigue = true;

var d = new Date();
var n = d.getHours();

if (n > 18 || n < 7){
	sigue = false;
	if (! $('#TituloIP').is(':visible')){
		DarkMode();
	}
}

var end_counter = function() {
    if (running) {
        running = false;
        if (count >= 5 && sigue){
        	sigue = false;
        	DarkMode();
        }
    }
};
$('#main h1').click(function() {
	if (sigue){
		if (running) {
	        count++;
	    } else {
	        running = true;
	        count = 1;
	        setTimeout(end_counter, 1000);
	    }
	}
});
/* ----------------- Fin modo noche ----------------- */