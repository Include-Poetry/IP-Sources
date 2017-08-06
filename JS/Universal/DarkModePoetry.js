/* ----------------- Modo noche ----------------- */
function DarkModePoetry(){
	/* --- Configuración de colores --- */
	var blanco = '#fff',
		blanco2 = '#ccc',
		blanco3 = '#eee',
		oscuro1 = '#131313',
		comentarios = '#aaa',
		oscuro2 = '#333',
		oscuro3 = '#7d7c78',
		oscuro4 = '#555',
		oscuro5 = '#303030',
		picori = 'N.png',
		picsec = 'B.png';

	/* --- Cuerpo del texto --- */
	$('h1, h2, h3, h4, h5, h6, h2 a').css('color', blanco);
	$('html').css('background-color', oscuro1);
	$('p, p a, blockquote, ul, ol, ul a, .MJXc-display').css('color', blanco2);
	$('blockquote').css({
		'background-color': '#222',
		'border-left-color': '#666'
	});
	/* --- Cabecera, títulos y menú --- */
	$('.HOficial, .HOficial section a').css({
		'color': blanco,
		'background-color': '#131313'
	});
	$('.btn-multi .btn').css({
		'color': oscuro2,
		'background-color': blanco
	});
	$('.btn-multi a, .btn-multi label > .icon').css('color', oscuro2);

	/* --- Tags y code snippet --- */
	$('code, .TagPost').css({
		'background-color': oscuro2,
		'border-color': oscuro3,
	});

	/* --- Navegación inferior ---*/
	$('body section article nav a').css('color', blanco2);

	/* --- Tablas --- */
	$('table').css('background-color', oscuro5);
	$('table td').css('color', blanco2);
	$('table th').css('color', blanco3);

	/* --- Formulario de contacto --- */
	$('#ContactForm input, #ContactForm textarea').css({
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
	DarkModePoetry();
}

var end_counter = function() {
    if (running) {
        running = false;
        if (count >= 5 && sigue){
        	sigue = false;
        	DarkModePoetry();
        }
    }
};
$('#HPost').click(function() {
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