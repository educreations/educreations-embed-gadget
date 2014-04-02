/* global describe, it, expect, educreationsGadget */

(function() {
  describe('Test educreationsGadget', function() {

    describe('Gadget level functions', function(){
      it('should have initialize()', function() {
        expect(educreationsGadget.initialize).to.be.a('function');
      });
      it('should have sendMessage()', function() {
        expect(educreationsGadget.sendMessage).to.be.a('function');
      });
    });

    describe('AppView level functions', function(){
      it('should have render()', function() {
        expect(educreationsGadget.appView.render).to.be.a('function');
      });

      it('should have renderEmbedCode()', function() {
        expect(educreationsGadget.appView.renderEmbedCode).to.be.a('function');
      });
    });

    /**
     * todo
     * make it more sophisticated
     */
    describe('Fake events', function(){
      it('should receive attached events', function(done){
        var errTimeout = setTimeout(function () {
          expect(false, 'Event never fired').to.equal(true);
          done();
          //the following line will work better in the cutting edge version of mocha
          //needs to wait for mocha to update itself
          //mocha.throwError('Event never fired');
        }, 1000); //timeout with an error in one second

        educreationsGadget.appView.ventFromServer.on('attached', function(){
          clearTimeout(errTimeout); //cancel error timeout
          expect(true, 'Event fired').to.equal(true);
          done();
        });

        educreationsGadget.appView.ventFromServer.trigger('attached');
      });
    });

  });
})();
