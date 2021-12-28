QUnit.test( 'destroy', function( assert ) {
  let done = assert.async();

  let draggieElem = document.querySelector('.test--destroy .draggie');
  let draggie = new Draggabilly( draggieElem );

  setTimeout( function() {
    draggie.destroy();
    assert.ok( true, 'draggie destroyed' );
    assert.ok( !draggieElem.style.left, 'no style left' );
    assert.ok( !draggieElem.style.top, 'no style top' );
    assert.ok( !draggieElem.style.position, 'no style position' );
    done();
  } );
} );
