//var fondos = ['url("../Multimedia/Fondos/01.jpg")'];
var fondos = ['url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/01.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/02.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/03.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/04.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/05.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/06.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/07.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/08.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/09.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/10.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/11.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/12.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/13.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/14.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/15.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/16.jpg)'
];

var x = Math.floor((Math.random() * fondos.length) + 1);
$("#main").css({
	'background-image': fondos[ x - 1 ],
});