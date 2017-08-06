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
		$("#IconosMenu,#main,footer").fadeIn();
	});
});