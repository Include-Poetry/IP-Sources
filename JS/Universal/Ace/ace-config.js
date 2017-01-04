var editor, salida;
var fuenteSize = '1';
if ($(window).width() < 600) {
	fuenteSize = '0.8';
}

$('.editor').each(function( index ) {
	editor = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(editor);
	editor.setTheme("ace/theme/monokai");
	editor.session.setMode("ace/mode/c_cpp");
	editor.setShowPrintMargin(false);
	editor.setOptions({
	    maxLines: 20,
	    fontSize: fuenteSize + 'em'
	});
	editor.commands.addCommands([{
		name: "showSettingsMenu",
		bindKey: {win: "Ctrl-q", mac: "Command-q"},
		exec: function(editor) {
			editor.showSettingsMenu();
		},
		readOnly: true
	}]);
});

$('.eKarel').each(function( index ) {
	eKarel = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(eKarel);
	eKarel.setTheme("ace/theme/karel");
	eKarel.session.setMode("ace/mode/Karel");
	eKarel.setShowPrintMargin(false);
	eKarel.setOptions({
	    maxLines: 20,
	    fontSize: fuenteSize + 'em'
	});
	eKarel.commands.addCommands([{
		name: "showSettingsMenu",
		bindKey: {win: "Ctrl-q", mac: "Command-q"},
		exec: function(eKarel) {
			eKarel.showSettingsMenu();
		},
		readOnly: true
	}]);
});

$('.output').each(function(index) {
	salida = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(salida);
	salida.setTheme("ace/theme/monokai");
	salida.session.setMode("ace/mode/plain_text");
	salida.setShowPrintMargin(false);
	salida.setOptions({
	    maxLines: 10,
	    fontSize: fuenteSize + 'em'
	});
	salida.commands.addCommands([{
		name: "showSettingsMenu",
		bindKey: {win: "Ctrl-q", mac: "Command-q"},
		exec: function(salida) {
			salida.showSettingsMenu();
		},
		readOnly: true
	}]);
});