/**
 * Draggabilly demo page
 */

/*jshint browser: true, unused: true, undef: true */

( function() {

  'use strict';

  // ----- getRandom ----- //

  function getRandom( ary ) {
    var index = Math.floor( Math.random() * ary.length );
    return ary[ index ];
  }

  // -----  ----- //

  var Draggabilly = window.Draggabilly;

  // ----- basic ----- //

  ( function() {
    var demo = document.querySelector('.demo--basic');
    var draggie = new Draggabilly( '.demo--basic .draggable' );
    var textElem = demo.querySelector('.total-centered');
    // set cute phrase on drag
    var movePhrases = [
      'Weeeeee!',
      'Yay!',
      'You’re doing it!',
      'Oh wow!'
    ];
    draggie.on( 'dragStart', function() {
      textElem.textContent = getRandom( movePhrases );
    });
    draggie.on( 'dragEnd', function() {
      textElem.textContent = 'Drag me';
    });
  })();

  // ----- axised ----- //

  new Draggabilly( '.demo--axis .draggable', {
    axis: 'x'
  });

  // ----- containment ----- //

  ( function() {
    var container = document.querySelector('.demo--containment__container');
    var elems = container.querySelectorAll('.draggable');
    for ( var i=0, len = elems.length; i < len; i++ ) {
      var elem = elems[i];
      new Draggabilly( elem, {
        containment: true
      });
    }
  })();

  // ----- grid ----- //

  new Draggabilly( '.demo--grid .draggable', {
    grid: [ 20, 20 ]
  });

  // ----- handle ----- //

  ( function() {
    new Draggabilly( '.demo--handle .draggable', {
      handle: '.handle'
    });
  })();

  // ----- events ----- //

  ( function() {
    var demo = document.querySelector('.demo--events');
    var elem = demo.querySelector('.draggable');
    var draggie = new Draggabilly( elem );
    var output = demo.querySelector('code');

    function notify( dragEvent, draggieInstance, event, pointer ) {
      var position = draggieInstance.position;
      var message = dragEvent + '\n' +
        event.type + ' at ' + pointer.pageX + ', ' + pointer.pageY + '\n' +
        'draggie position at ' + position.x + ', ' + position.y;
      output.textContent = message;
    }

    draggie.on( 'pointerDown', function( event, pointer ) {
      notify( 'pointerDown', this, event, pointer );
    });

    draggie.on( 'dragStart', function( event, pointer ) {
      notify( 'dragStart', this, event, pointer );
    });

    draggie.on( 'dragMove', function( event, pointer ) {
      notify( 'dragMove', this, event, pointer );
    });

    draggie.on( 'dragEnd', function( event, pointer ) {
      notify( 'dragEnd', this, event, pointer  );
    });

    draggie.on( 'staticClick', function( event, pointer ) {
      notify( 'staticClick', this, event, pointer  );
    });

  })();

})();
