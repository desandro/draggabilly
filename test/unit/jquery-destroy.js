/* globals $ */

QUnit.test( 'destroy', function( assert ) {
  let done = assert.async();

  let $draggie = $('.test--destroy .draggie').draggabilly();
  let draggieElem = $draggie[0];

  setTimeout( function() {
    $draggie.draggabilly('destroy');
    assert.ok( true, 'draggie destroyed' );
    assert.ok( !draggieElem.style.left, 'no style left' );
    assert.ok( !draggieElem.style.top, 'no style top' );
    assert.ok( !draggieElem.style.position, 'no style position' );
    done();
  } );
} );
