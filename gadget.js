(function() {
  var player = new VersalPlayerAPI();

  player.addEventListener('attributesChanged', function(attributes) {
    // TODO: sanitization
    var iframe = $('<div>' + attributes.embedCode + '</div>').find('iframe').get(0);

    if(iframe) {
      $('body').html(iframe);
    } else {
      $('body').html('<div class="gadget-embed-not-valid">Please specify the embed code</div>');
    }
  });


  player.setPropertySheetAttributes({
    embedCode: {
      type: 'TextArea',
      title: 'Embed Code'
    }
  });
  player.startListening();
  player.watchBodyHeight();
})();
