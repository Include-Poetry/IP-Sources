var $contactForm = $('#ContactForm');

$contactForm.submit(function(e) {
	e.preventDefault();
	var $submit = $('input:submit', $contactForm);
	var defaultSubmitText = $submit.val();

	$.ajax({
		method: "POST",
		url: "//formspree.io/includepoetry@gmail.com",
		type: 'POST',
		data: $(this).serialize(),
		dataType: "json",
		beforeSend: function() {
			$submit.attr('disabled', true).val('Enviando...');
		},
		success: function(data) {
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
		}
	});
});