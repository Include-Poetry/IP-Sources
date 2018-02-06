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

/* --------- Disqus comments ------- */
$("#ComentAct").click(function(event) {
	$(".CajaComent").slideToggle("slow");
});
/* --------- Fin Disqus comments ------- */