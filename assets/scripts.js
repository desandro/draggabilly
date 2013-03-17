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

  // ----- events ----- //

  ( function() {
    var demo = document.querySelector('#evented');
    var elem = demo.querySelector('.draggie');
    var draggie = new Draggabilly( elem );
    var output = demo.querySelector('code');

    function notify( dragEvent, event, pointer, draggieInstance ) {
      var position = draggieInstance.position;
      var message = dragEvent + '\n' +
        event.type + ' at ' + pointer.pageX + ', ' + pointer.pageY + '\n' +
        'draggie position at ' + position.x + ', ' + position.y;
      output.innerText = message;
    }

    draggie.on( 'dragStart', function( event, pointer, draggieInstance ) {
      notify( 'DRAG START', event, pointer, draggieInstance );
    });

    draggie.on( 'dragMove', function( event, pointer, draggieInstance ) {
      notify( 'DRAG MOVE', event, pointer, draggieInstance );
    });

    draggie.on( 'dragEnd', function( event, pointer, draggieInstance ) {
      notify( 'DRAG END', event, pointer, draggieInstance );
    });

  })();

};

