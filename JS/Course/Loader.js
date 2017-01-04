// Función recursiva para animación tipewriter
function typeWriter(target, text, n) {
	// target = elemento donde se escribirá
	// text = texto a escribir
	// n = letra por la cual empezar
	if (n < (text.length)) {
		$(target).html(text.substring(0, n+1));
		n++;
		setTimeout(function() {
			typeWriter(target, text, n)
		}, 100); // Retardo entre letra y letra
	}
}

// Función de loader, usa el archivo jpreloader.min_.js
$(document).ready(function(e) {
	$("#IconosMenu,#main,footer").css("display", "none");
	$('body').jpreLoader({
		splashID: "#jSplash",
		autoClose: true,
		loaderVPos: '56%',
		showPercentage: false
	}, function() {
		$(".LoaderGif").fadeOut(400, function(){
			$(".LoadingFondo").fadeOut(); // Gif loading
		}); // Fondo negro
		
		if ($("#TituloIP").length > 0){
			$("#IconosMenu,#main,footer").fadeIn(400, function(){
				var VarInc = $('cur').attr('include');
				var RetInc = VarInc.length * 100;
				setTimeout(function(){ // Animación typewriter
					typeWriter('#Gato', '#', 0);
					setTimeout(function(){
						typeWriter('n', 'include', 0);
						setTimeout(function(){
							document.getElementById("s1").innerHTML = "<";
							setTimeout(function(){
								document.getElementById("s2").innerHTML = ">";
								setTimeout(function(){
									typeWriter('cur', VarInc, 0);
									setTimeout(function(){
										$('#IntroGrl').fadeIn('slow');
									}, RetInc);
								}, 500);
							}, 300);
						}, 900);
					}, 200);
				}, 500);
			});
		} else {
			$("#IconosMenu,#main,footer").fadeIn();
		}	
	});
});

