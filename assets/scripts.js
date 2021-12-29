/**
 * Draggabilly demo page
 */

( function() {

  // ----- getRandom ----- //

  function getRandom( ary ) {
    let index = Math.floor( Math.random() * ary.length );
    return ary[ index ];
  }

  // -----  ----- //

  const Draggabilly = window.Draggabilly;

  // ----- basic ----- //

  ( function() {
    let demo = document.querySelector('.demo--basic');
    let draggie = new Draggabilly('.demo--basic .draggable');
    let textElem = demo.querySelector('.total-centered');
    // set cute phrase on drag
    let movePhrases = [
      'Weeeeee!',
      'Yay!',
      'You’re doing it!',
      'Oh wow!',
    ];
    draggie.on( 'dragStart', function() {
      textElem.textContent = getRandom( movePhrases );
    } );
    draggie.on( 'dragEnd', function() {
      textElem.textContent = 'Drag me';
    } );
  } )();

  // ----- axised ----- //

  new Draggabilly( '.demo--axis .draggable', {
    axis: 'x',
  } );

  // ----- containment ----- //

  ( function() {
    let container = document.querySelector('.demo--containment__container');
    let elems = container.querySelectorAll('.draggable');
    for ( let elem of elems ) {
      new Draggabilly( elem, {
        containment: true,
      } );
    }
  } )();

  // ----- grid ----- //

  new Draggabilly( '.demo--grid .draggable', {
    grid: [ 20, 20 ],
  } );

  // ----- handle ----- //

  ( function() {
    new Draggabilly( '.demo--handle .draggable', {
      handle: '.handle',
    } );
  } )();

  // ----- events ----- //

  ( function() {
    let demo = document.querySelector('.demo--events');
    let elem = demo.querySelector('.draggable');
    let draggie = new Draggabilly( elem );
    let output = demo.querySelector('code');

    function notify( dragEvent, draggieInstance, event, pointer ) {
      let position = draggieInstance.position;
      let message = dragEvent + '\n' +
        event.type + ' at ' + pointer.pageX + ', ' + pointer.pageY + '\n' +
        'draggie position at ' + position.x + ', ' + position.y;
      output.textContent = message;
    }

    draggie.on( 'pointerDown', function( event, pointer ) {
      notify( 'pointerDown', this, event, pointer );
    } );

    draggie.on( 'dragStart', function( event, pointer ) {
      notify( 'dragStart', this, event, pointer );
    } );

    draggie.on( 'dragMove', function( event, pointer ) {
      notify( 'dragMove', this, event, pointer );
    } );

    draggie.on( 'dragEnd', function( event, pointer ) {
      notify( 'dragEnd', this, event, pointer );
    } );

    draggie.on( 'staticClick', function( event, pointer ) {
      notify( 'staticClick', this, event, pointer );
    } );

  } )();

} )();
