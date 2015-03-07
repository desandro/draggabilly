test( 'destroy', function( assert ) {
  'use strict';

  var done = assert.async();

  var draggieElem = document.querySelector('.test--destroy .draggie');
  var draggie = new Draggabilly( draggieElem );

  setTimeout( function() {
    draggie.destroy();
    ok( true, 'draggie destroyed' );
    ok( !draggieElem.style.left, 'no style left' );
    ok( !draggieElem.style.top, 'no style top' );
    ok( !draggieElem.style.position, 'no style position' );
    done();
  });
});
