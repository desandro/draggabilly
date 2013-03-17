/**
 * Draggabilly demo page
 */


window.onload = function() {

  'use strict';

  var Draggabilly = window.Draggabilly;

  // ----- basic ----- //

  ( function() {
    var elem = document.querySelector('#basic');
    new Draggabilly( elem );
  })();

  // ----- containment ----- //

  ( function() {
    var container = document.querySelector('#container');
    var elems = container.querySelectorAll('.draggie');
    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      new Draggabilly( elem, {
        containment: true
      });
    }
  })();

  // ----- handle ----- //

  ( function() {
    var elem = document.querySelector('#has-handle');
    new Draggabilly( elem, {
      handle: '.handle'
    });
  })();

};

