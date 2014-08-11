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
    // console.log('initialize');

    //the line belows starts a backbone app
    window.Educreations.init(this, this.el);

    //relay msg from player to gadget
    window.addEventListener('message', function(msg){
      if(!msg || !msg.data){
        return; //server provides no information
      }

      var msgData = msg.data;

      //return for string response
      if(typeof msgData === 'string') {
        console.log('Error. Server sends string instead of object.', msgData);
        return;
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

    this.appView.ventToServer.trigger('startListening');
  };

  Gadget.prototype.sendMessage = function (msg) {
    window.parent.postMessage(msg, '*');
    // console.log([
    //   'toPlayer', msg.event, msg.data
    // ]);
  };

  //starting point of the gadget
  //expose a global variable for testing purpose
  //probablly should have used AMD
  window.educreationsGadget = new Gadget({
    el: document.querySelector('.main-app')
  });

})(Backbone, $, _);
