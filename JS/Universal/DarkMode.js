/* ----------------- Modo noche ----------------- */
function DarkMode(){
	var blanco = '#fff',
		blanco2 = '#ccc',
		blanco3 = '#eee',
		oscuro1 = '#131313',
		comentarios = '#aaa',
		oscuro2 = '#333',
		oscuro3 = '#7d7c78',
		oscuro4 = '#555',
		picori = 'N.png',
		picsec = 'B.png';

	$('h1, h2, h3, h4, h5, h6, h2 a').css('color', blanco);
	$('#main p, #main dl, #main p a, #main blockquote, #main ul, #main ol, #main ul a, #main p a:not(.TagPost)').css('color', blanco2); 
	$('.Nav a, #ComentAct h2, .MJXc-display').css('color', blanco2);
	$('html').css('background-color', oscuro1);
	$('.CajaComent').css('background-color', comentarios);
	$('blockquote').css('border-left-color', blanco);
	$('code, .TagPost').css({
		'background-color': oscuro2,
		'border-color': oscuro3,
	});
	$('table').css({
		'background-color': oscuro4,
		'color': blanco2,
	});
	$('table tr:nth-child(even)').css('background-color', oscuro2);

	var src = $('#LogoMenuN').attr("src").replace(picori, picsec);
	$('#LogoMenuN').attr("src", src);
	var srcMin = $('#LMN').attr("src").replace(picori, picsec);
	$('#LMN').attr("src", srcMin);
	$('#MenuBars em').css('background', blanco);

	/* --- Formulario de contacto --- */
	$('#ContactForm input, #ContactForm select, #ContactForm textarea').css({
		'background-color': oscuro2,
		'border-color': oscuro3,
		'color': blanco2,
	});
	$("#ContactForm #Enviar").css('color', blanco3);
}

var running = false,
    count = 0,
    sigue = true;

var d = new Date();
var n = d.getHours();

if (n > 19 || n < 7){
	sigue = false;
	DarkMode();
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