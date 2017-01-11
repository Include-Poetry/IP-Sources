var fondos = [
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/01.jpg)',
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
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/16.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/17.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/18.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/19.jpg)',
	'url(https://www.include-poetry.com/IP-Sources/Multimedia/Fondos/20.jpg)'
];

var x = Math.floor((Math.random() * fondos.length));
var posbg = '';

// Con esto ajustamos para que se vea bien el centro en móviles
if (x+1 == 4 || x+1 == 7 ||  x+1 == 14){
	posbg = 'left';
} else if ( x+1 == 8 ||  x+1 == 9 ||  x+1 == 15 ||  x+1 == 17) {
	posbg = 'right';
} else posbg = 'center';

$("#main").css({
	'background-image': fondos[ x ],
	'background-position-x': posbg,
});