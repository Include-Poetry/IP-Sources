var bandera1 = false;
if ($('#LMN').css('display') == 'block'){
	bandera1 = true;
}
var pila = [];
var indice = 0;

function ToggleMenuBar(){
	var NavDis = $('#NavUl').css('display') == 'block';
	var FooDis = $('#MenuBackArr').css('display') == 'block';

	if(NavDis && FooDis){
		$('#MenuBackArr').fadeOut(600);
	}

	var degree1, degree2, top1, top2, opx, bgc;

	var darkside = $('html').css('background-color') != 'rgb(252, 252, 252)';
	
	if(bandera1){
		degree1 = 45;
		degree2 = 135;
		top1 = top2 = '10.60660172px';
		opx = '0';
		bgc = '#fff'
		bandera1 = false;
	} else {
		degree1 = 0;
		degree2 = 0;
		top1 = '0px';
		top2 = '20px';
		opx = '1';
		bgc = '#000'; //373b37
		if (darkside) {bgc = '#fff';}
		bandera1 = true;
	}

	$("#MB1").css({
		'background': bgc,
		'top': top1,
		'-webkit-transform': 'rotate(' + degree1 + 'deg)',
		'-moz-transform': 'rotate(' + degree1 + 'deg)',
		'-ms-transform': 'rotate(' + degree1 + 'deg)',
		'-o-transform': 'rotate(' + degree1 + 'deg)',
		'transform': 'rotate(' + degree1 + 'deg)',
	});
	$("#MB2").css({
		'background': bgc,
		'opacity': opx,
	});
	$("#MB3").css({
		'background': bgc,
		'top': top2,
		'-webkit-transform': 'rotate(' + degree2 + 'deg)',
		'-moz-transform': 'rotate(' + degree2 + 'deg)',
		'-ms-transform': 'rotate(' + degree2 + 'deg)',
		'-o-transform': 'rotate(' + degree2 + 'deg)',
		'transform': 'rotate(' + degree2 + 'deg)',
	});
	$("#LogoMenuN, #LMN").css({
		'opacity': opx,
	});
	$("#NavUl").fadeToggle(600, function(){
		var ContState = $('#NavUl').css('display')
		var MainEstado = $('#MainUl').css('display');
		if (MainEstado == 'none' && ContState == 'none'){
			$('nav ul').not('#MainUl').fadeOut(600, function(){
				setTimeout(function(){
					$('#MainUl').fadeIn(600);
				},200);
			});
		}
	});
}

function MenuLevelPop(){
	var nuevo = pila[indice-1];
	var muere = pila[indice];
	indice -= 1;

	if (nuevo == 'MainUl'){
		$('#MenuBackArr').fadeOut(600);
	}
	
	$('#' + muere).fadeOut(600, function(){
		$('#' + nuevo).fadeIn(600);
	});
}

$("#MenuBars").click(function() {
	ToggleMenuBar();
});

$("nav ul li").click(function() {
	var aparece = '#'
	aparece += $(this).data("son");
	var padre = $(this).parents('ul').attr('id');

	pila[indice] = padre;
	indice += 1;
	pila[indice] = $(this).data("son");

	if (aparece != '#undefined'){
		$("#" + padre).fadeOut(600, function() {
			$(aparece).fadeIn(600);
		});
	}
	if ($('#MenuBackArr').css('display') != 'block'){
		$('#MenuBackArr').fadeIn(600);
	}
});

$("#MenuBackArr").click(function() {	
	MenuLevelPop();
});

/* -------- Support message -------- */
$(document).ready(function() {
	// find the first <h1> element on the page
	var h1Element = $('h1:first');
	
	// create the textbox element
	var textbox = $('<div class="aux-msg">¿Te gustaría apoyar a #iP? Usa el navegador <a href="https://brave.com/es/download/">Brave</a> o comparte con tus amistades <button class="close-button">Cerrar</button></div>');
	
	// insert the textbox element after the <h1> element
	h1Element.after(textbox);
	
	// add a click event handler to the close button
	$('.close-button').click(function() {
	  // remove the textbox element from the page
	  textbox.remove();
	});
  });
/* ----- End Support message ----- */