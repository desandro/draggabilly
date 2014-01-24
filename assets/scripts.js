/**
 * Draggabilly demo page
 */

docReady( function() {

  'use strict';

  // ----- setText helper ----- //

  var docElem = document.documentElement;
  var textSetter = docElem.textContent !== undefined ? 'textContent' : 'innerText';

  function setText( elem, value ) {
    elem[ textSetter ] = value;
  }

  // ----- getRandom ----- //

  function getRandom( ary ) {
    var index = Math.floor( Math.random() * ary.length );
    return ary[ index ];
  }

  // -----  ----- //

  var Draggabilly = window.Draggabilly;

  // ----- basic ----- //

  ( function() {

    var elem = document.querySelector('#basic');
    var draggie = new Draggabilly( '#basic' );
    var textElem = elem.querySelector('.total-centered');
    // set cute phrase on drag
    var movePhrases = [
      'Weeeeee!',
      'Yay!',
      'You’re doing it!',
      'Oh wow!'
    ];
    draggie.on( 'dragStart', function() {
      setText( textElem, getRandom( movePhrases ) );
    });
    draggie.on( 'dragEnd', function() {
      setText( textElem, 'Drag me' );
    });
  })();

  // ----- axised ----- //

  new Draggabilly( '#axised .draggie', {
    axis: 'x'
  });

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

  // ----- grid ----- //

  new Draggabilly( '#gridded .draggie', {
    grid: [ 20, 20 ]
  });

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
      setText( output, message );
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

