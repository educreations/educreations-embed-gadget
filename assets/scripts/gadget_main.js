(function (Backbone, $, _) {

  /**
   * main file for Versal gadget
   * @param {el: DOM node} options
   */
  var Gadget = function(options) {
    this.el = options.el;

    this.initialize();

    //todo
    //getter and setter for both config and learnerState
  };

  Gadget.prototype.initialize = function () {
    console.log('initialize');

    //the line belows starts a backbone app
    window.Educreations.init(this, this.el);

    //relay msg from player to gadget
    window.addEventListener('message', function(msg){
      if(!msg || !msg.data){
        return; //server provides no information
      }

      var msgData = msg.data;

      //parse for string response
      if(typeof msgData === 'string') {
        try {
          msgData = JSON.parse(msgData);
        }
        catch (e) {
          console.log('Unable to parse the server response', e);
          return;
          //todo
          //make sure no name collision with errorParsing event
          //handle exceptions
        }
      }

      //relay events to appView
      if(msgData.event){
        this.appView.ventFromServer.trigger(msgData.event, msgData.data);
      } else {
        console.log('Server send an response with no event name');
      }
    }.bind(this));

    //relay msg from gadget to player
    this.appView.ventToServer.on('all', function(messageName, messageData){
      this.sendMessage({
        event: messageName,
        data: messageData
      });
    }, this);
  };

  Gadget.prototype.sendMessage = function (msg) {
    var message = JSON.stringify(msg);
    window.parent.postMessage(message, '*');

    console.log([
      'toPlayer', msg.event, msg.data
    ]);
  };

  //starting point of the gadget
  new Gadget({
    el: document.querySelector('.main-app')
  });

})(Backbone, $, _);
