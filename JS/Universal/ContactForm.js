var $contactForm = $('#ContactForm');

function fnv32a( str ){
	var FNV1_32A_INIT = 0x811c9dc5;
	var hval = FNV1_32A_INIT;
	for ( var i = 0; i < str.length; ++i ){
		hval ^= str.charCodeAt(i);
		hval += (hval << 1) + (hval << 4) + (hval << 7) + (hval << 8) + (hval << 24);
	}
	return hval >>> 0;
}

$contactForm.submit(function(e) {
	e.preventDefault();
	var $submit = $('input:submit', $contactForm);
	var defaultSubmitText = $submit.val();

	var msg = $('#Mensaje').val();
	var codigoFinal = fnv32a(msg);
	$('#CFCodeRec').val(codigoFinal);

	if ($('#CFAC').prop('checked') == true){		
		$.ajax({
			method: "POST",
			url: "https://formspree.io/includepoetry@gmail.com",
			type: 'POST',
			data: $(this).serialize(),
			dataType: "json",
			beforeSend: function() {
				$submit.attr('disabled', true).val('Enviando...');
			},
			success: function(data) {
				$('#CFGraP').append(' ' + codigoFinal);
				$submit.val('Mensaje enviado');
				setTimeout(function() {
					$submit.attr('disabled', false).val(defaultSubmitText);
					$("#ContactForm, #CFDefT, #CFDefP").fadeOut('slow', function() {
						$("#CFGraT, #CFGraP, #CFOtro").fadeIn('slow');
					});
				}, 3000);
			},
			error: function(err) {
				$submit.val('Hubo un error :C');
				setTimeout(function() {
					$submit.attr('disabled', false).val(defaultSubmitText);
					$("#ContactForm, #CFDefT, #CFDefP").fadeOut('slow', function() {
						$("#CFErrT, #CFErrP, #CFOtroSad").fadeIn('slow');
					});
				}, 3000);
				console.log(err);
			}
		});
	} else {
		$submit.attr('disabled', true).val('Por favor marca la casilla de verificación');
		setTimeout(function() {
			$submit.attr('disabled', false).val(defaultSubmitText);
		}, 3000);
	}
});