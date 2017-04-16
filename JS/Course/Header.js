var bandera1 = true;
var pila = [];
var indice = 0;

$("#MenuBars").click(function() {
	var NavDis = $('#NavUl').css('display') == 'block';
	var FooDis = $('#foodiv').css('display') == 'block';

	if(NavDis && FooDis){
		$('#foodiv').fadeOut('fast');
		$('#main').removeClass('blur');
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
	$("#NavUl").fadeToggle('slow', function(){
		var ContState = $('#NavUl').css('display')
		var MainEstado = $('#MainUl').css('display');
		if (MainEstado == 'none' && ContState == 'none'){
			$('nav ul').not('#MainUl').fadeOut('fast', function(){
				setTimeout(function(){
					$('#MainUl').fadeIn('slow');
				},200);
			});
		}
	});
});


$("nav ul li").click(function() {
	var aparece = '#'
	aparece += $(this).data("son");
	var padre = $(this).parents('ul').attr('id');

	pila[indice] = padre;
	indice += 1;
	pila[indice] = $(this).data("son");

	if (aparece != '#undefined'){
		$("#" + padre).fadeOut('slow', function() {
			$(aparece).fadeIn();
		});
	}
	if ($('#foodiv').css('display') != 'block'){
		$('#foodiv').fadeIn('fast');
		$('#main').addClass('blur');
	}
});

$("#foodiv").click(function() {	
	var nuevo = pila[indice-1];
	var muere = pila[indice];
	indice -= 1;

	if (nuevo == 'MainUl'){
		$('#foodiv').fadeOut('fast');
		$('#main').removeClass('blur');
	}
	
	$('#' + muere).fadeOut('slow', function(){
		$('#' + nuevo).fadeIn('slow');
	});
});