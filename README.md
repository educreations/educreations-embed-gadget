# Educreations Embed Gadget [![Build Status](https://travis-ci.org/Versal/educreations-embed-gadget.svg?branch=master)](https://travis-ci.org/Versal/educreations-embed-gadget)

Authors embed [educreations](http://www.educreations.com/) videos inside the course. They paste the iframe embed code, and we just grab the lesson id from it.

### Usage

    git clone https://github.com/Versal/educreations-embed-gadget.git
    cd educreations-embed-gadget
    versal preview

Then got to [localhost:3000](http://localhost:3000/)

### To test

    npm install -g bower
    bower install
    npm install
    npm test

### Changelog

- **0.0.5** Allow private creations
- **0.0.4** Added `index.html`
- **0.0.3** Skipped version (testing)
- **0.0.2** Code cleanup
- **0.0.1** Embed educreations videos with iFrame code
