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
	$('p, p a, blockquote, ul, ol, ul a, #RegisterForm, #RegisterForm input, #RegisterForm select, #main p a:not(.TagPost), .Nav a, #ComentAct h2, .MJXc-display').css('color', blanco2); 
	$('html').css('background-color', oscuro1);
	$('.CajaComent').css('background-color', comentarios);
	$('blockquote').css('border-left-color', blanco);
	$('code, .TagPost, #RegisterForm input, #RegisterForm select').css({
		'background-color': oscuro2,
		'border-color': oscuro3,
	});
	$('.HOficial, .HOficial section a').css({
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