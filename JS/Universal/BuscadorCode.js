var DrkTime = '';
var DrkMore = '';
var DrkHit, DrkEmpty;
var DrkReload = false;

function app(opts) {
  const search = instantsearch({
    appId: 'QO0HGR5828',
    apiKey: 'eb04fe369bec3b6b078e4eb51ea48ae6', 
    indexName: 'MainIndexIPC',
    urlSync: false,
  }); 

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Busca en Include Code',
    })
  );

  search.addWidget(
    instantsearch.widgets.infiniteHits({
      container: '#infinite-hits-container',
      templates: {
        item: DrkHit,
        empty: DrkEmpty
      },
      hitsPerPage: 5,
      cssClasses: {
        showmore: DrkMore
      },
      loadMoreLabel: 'Más resultados'
    })
  );
/*
  search.addWidget(
    instantsearch.widgets.hitsPerPage({
      container: '#items-per-page',
      items: [
        { label: '8 resultados por página', value: 8, default: true },
        { label: '16 resultados por página', value: 16 },
      ],
    })
  );
*/
  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
      templates: {
        body: function(data){
          var tiempo = '<span class="ais-stats--time ' + DrkTime + '">en '+ data.processingTimeMS + 'ms</span>';
          if (data.hasManyResults){
            return data.nbHits + ' resultados ' + tiempo;
          }
          if (data.hasOneResult){
            return data.nbHits + ' resultado ' + tiempo;
          }
          else return data.nbHits;
        }
      }
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#etiquetas',
      attributeName: 'tags',
      templates: {
        header: getHeader('Etiquetas'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#olimpiada',
      attributeName: 'olimpiada',
      templates: {
        header: getHeader('Olimpiada'),
      },
    })
  );

  search.addWidget(
    instantsearch.widgets.refinementList({
      container: '#autor',
      attributeName: 'author',
      templates: {
        header: getHeader('Autor'),
      },
    })
  );

  search.start();
}

function getTemplate(templateName) {
  return document.querySelector(`#${templateName}-template`).innerHTML;
}

function getHeader(title) {
  return `<h5>${title}</h5>`;
}

$(document).ready(function() {
  var d = new Date();
  var n = d.getHours();
  if (n > 17 || n < 7){
    DrkHit = getTemplate('hit-drk');
    DrkEmpty = getTemplate('no-results-drk');
    DrkTime = 'DrkTextO3';
    DrkMore = 'SearchShowMoreBtn';
  } else {
    DrkHit = getTemplate('hit');
    DrkEmpty = getTemplate('no-results');
    DrkTime = '';
    DrkMore = '';
  }
  app({
    appId: 'QO0HGR5828',
    apiKey: 'eb04fe369bec3b6b078e4eb51ea48ae6', 
    indexName: 'MainIndexIPC',
  });

  /* Arreglos para móvil */
  $('#filtros-titulo').click(function(event) {
    $('#filtros-div').slideToggle('slow');
    if ($('#fflecha').hasClass('fa-sort-up')) {
      $('#fflecha').removeClass('fa-sort-up');
      $('#fflecha').addClass('fa-sort-down');
    } else {
      $('#fflecha').removeClass('fa-sort-down');
      $('#fflecha').addClass('fa-sort-up');
    }
  });
  $(window).resize(function(event) {
    $('#filtros-div').slideDown('slow');
  });
  /* Fin de arreglos para móvil */
});