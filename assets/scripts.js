/**
 * Draggabilly demo page
 */

docReady( function() {

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

    function notify( dragEvent, draggieInstance, event, pointer ) {
      var position = draggieInstance.position;
      var message = dragEvent + '\n' +
        event.type + ' at ' + pointer.pageX + ', ' + pointer.pageY + '\n' +
        'draggie position at ' + position.x + ', ' + position.y;
      output.innerText = message;
    }

    draggie.on( 'dragStart', function( draggieInstance, event, pointer ) {
      notify( 'DRAG START', draggieInstance, event, pointer );
    });

    draggie.on( 'dragMove', function( draggieInstance, event, pointer ) {
      notify( 'DRAG MOVE', draggieInstance, event, pointer );
    });

    draggie.on( 'dragEnd', function( draggieInstance, event, pointer ) {
      notify( 'DRAG END', draggieInstance, event, pointer  );
    });

  })();

});

