var DrkTime = '';
var DrkMore = '';
var DrkHit, DrkEmpty;
var DrkReload = false;

function app(opts) {
  const search = instantsearch({
    appId: 'QC3QNXU3KT',
    apiKey: '003f676acec1b6c92cad56ea7dc12237', 
    indexName: 'MainIndexIPN',
    urlSync: false,
  });

  search.addWidget(
    instantsearch.widgets.searchBox({
      container: '#search-input',
      placeholder: 'Busca en todas las libretas de apuntes',
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
      showMoreLabel: 'Más resultados'
    })
  );

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
  var user = firebase.auth().currentUser;
  if (user) {   
    var uid = user.uid;
    firebase.database().ref('/SiteUI/' + uid).on('value', function(snapshot){
      if (DrkReload){
        location.reload();
      } else {
        DrkReload = true;
      }
      var DarkAuto = snapshot.val().DarkModeAuto;
      var DarkForced = snapshot.val().DarkMode;   
      if (DarkAuto){        
        var d = new Date();
        var n = d.getHours();
        if (n > 19 || n < 7){
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
      } else {        
        if (DarkForced){
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
      }
      app({
        appId: 'QC3QNXU3KT',
        apiKey: '003f676acec1b6c92cad56ea7dc12237', 
        indexName: 'MainIndexIPN',
      });
    });
  } else {
    var d = new Date();
    var n = d.getHours();
    if (n > 19 || n < 7){
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
      appId: 'QC3QNXU3KT',
      apiKey: '003f676acec1b6c92cad56ea7dc12237', 
      indexName: 'MainIndexIPN',
    });
  }

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