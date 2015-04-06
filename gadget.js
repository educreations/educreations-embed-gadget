(function() {
  var player = new VersalPlayerAPI();

  player.addEventListener('attributesChanged', function(attributes) {
    var embedCodeMatches = (attributes.embedCode || '').match(/educreations.com\/lesson\/embed\/([0-9]+)\/(\?(.*&)?s=([A-Za-z0-9]+))?"/);

    if(embedCodeMatches) {
      var secret = embedCodeMatches[4] || '';
      $('body').html('<iframe width="480" height="300" src="https://www.educreations.com/lesson/embed/' + embedCodeMatches[1] + '/' + (secret ? '?s=' + secret : '') + '" frameborder="0" webkitAllowFullScreen mozallowfullscreen allowfullscreen></iframe>');
    } else {
      $('body').html('<div class="gadget-embed-not-valid">Please specify the embed code</div>');
    }
  });

  player.setPropertySheetAttributes({
    embedCode: {
      type: 'TextArea',
      title: 'Embed code'
    }
  });
  player.startListening();
  player.watchBodyHeight();
})();
