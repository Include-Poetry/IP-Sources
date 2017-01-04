//var fondos = ['url("../Multimedia/Fondos/01.jpg")'];
var fondos = ['url(../Recursos/Multimedia/Fondos/01.jpg)',
	'url(../Recursos/Multimedia/Fondos/02.jpg)',
	'url(../Recursos/Multimedia/Fondos/03.jpg)',
	'url(../Recursos/Multimedia/Fondos/04.jpg)',
	'url(../Recursos/Multimedia/Fondos/05.jpg)',
	'url(../Recursos/Multimedia/Fondos/06.jpg)',
	'url(../Recursos/Multimedia/Fondos/07.jpg)',
	'url(../Recursos/Multimedia/Fondos/08.jpg)',
	'url(../Recursos/Multimedia/Fondos/09.jpg)',
	'url(../Recursos/Multimedia/Fondos/10.jpg)',
	'url(../Recursos/Multimedia/Fondos/11.jpg)',
	'url(../Recursos/Multimedia/Fondos/12.jpg)',
	'url(../Recursos/Multimedia/Fondos/13.jpg)',
	'url(../Recursos/Multimedia/Fondos/14.jpg)',
	'url(../Recursos/Multimedia/Fondos/15.jpg)',
	'url(../Recursos/Multimedia/Fondos/16.jpg)'
];

var x = Math.floor((Math.random() * fondos.length) + 1);
$("#main").css({
	'background-image': fondos[ x - 1 ],
});