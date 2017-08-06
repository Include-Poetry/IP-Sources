app({
  appId: 'QO0HGR5828',
  apiKey: 'eb04fe369bec3b6b078e4eb51ea48ae6', 
  indexName: 'MainIndexIPC',
});

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
        item: getTemplate('hit'),
        empty: getTemplate('no-results')
      },
      hitsPerPage: 5,
      showMoreLabel: 'Más resultados'
    })
  );

  search.addWidget(
    instantsearch.widgets.stats({
      container: '#stats',
      templates: {
        body: function(data){
          var tiempo = '<span class="ais-stats--time">en '+ data.processingTimeMS + 'ms</span>';
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

/* Arreglos para móvil */
$('#filtros-titulo').click(function(event) {
  $('#filtros-div').slideToggle('slow');
  if ($('#fflecha').hasClass('fa-sort-asc')) {
    $('#fflecha').removeClass('fa-sort-asc');
    $('#fflecha').addClass('fa-sort-desc');
  } else {
    $('#fflecha').removeClass('fa-sort-desc');
    $('#fflecha').addClass('fa-sort-asc');
  }
});
$(window).resize(function(event) {
  $('#filtros-div').slideDown('slow');
});
/* Fin de arreglos para móvil */