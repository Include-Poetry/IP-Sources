var editor, salida, eKarel;
var fuenteSize = '1';
if ($(window).width() < 600) {
	fuenteSize = '0.8';
}

$('textarea.cpp').each(function( index ) {
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

$('textarea.output').each(function( index ) {
	editor = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(editor);
	editor.setTheme("ace/theme/monokai");
	editor.session.setMode("ace/mode/plain_text");
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
	editor.setReadOnly(true);
});

$('textarea.karelp').each(function( index ) {
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

$('textarea.plain-text').each(function(index) {
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

$('textarea.html').each(function(index) {
	salida = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(salida);
	salida.setTheme("ace/theme/monokai");
	salida.session.setMode("ace/mode/html");
	salida.session.setUseWorker(false);
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

$('textarea.markdown').each(function(index) {
	salida = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(salida);
	salida.setTheme("ace/theme/monokai");
	salida.session.setMode("ace/mode/markdown");
	salida.session.setUseWorker(false);
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

$('textarea.python').each(function(index) {
	salida = ace.edit(this);
	ace.require('ace/ext/settings_menu').init(salida);
	salida.setTheme("ace/theme/monokai");
	salida.session.setMode("ace/mode/python");
	salida.session.setUseWorker(false);
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