/* globals $ */

QUnit.test( 'init', function( assert ) {
  assert.expect( 30 );
  let done = assert.async();

  let $test = $('.test--basics').addClass('running');
  let $h2 = $test.find('h2').text('Drag this element');

  let $draggie = $('.draggie').draggabilly();
  let draggieElem = $draggie[0];

  assert.equal( draggieElem.style.position, 'relative', 'position: relative set' );

  let didPointerDown, didPointerMove, didPointerUp, didDragStart, didDragMove,
          didDragEnd;

  $draggie.one( 'pointerDown', function( event, pointer ) {
    didPointerDown = true;
    assert.equal( typeof event, 'object', 'pointerDown event argument' );
    assert.ok( pointer.pageX, 'pointerDown pageX' );
    assert.ok( $draggie.hasClass('is-pointer-down'), 'is-pointer-down class added' );
  } );

  $draggie.one( 'pointerMove', function( event, pointer, moveVector ) {
    didPointerMove = true;
    assert.equal( typeof event, 'object', 'pointerMove event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'pointerMove pageX' );
    assert.equal( typeof moveVector.x, 'number', 'pointerMove moveVector.x' );
    assert.equal( typeof moveVector.y, 'number', 'pointerMove moveVector.y' );
  } );

  $draggie.one( 'pointerUp', function( event, pointer ) {
    didPointerUp = true;
    assert.equal( typeof event, 'object', 'pointerUp event argument' );
    assert.ok( pointer.pageX, 'pointerUp pageX' );
    assert.ok( !$draggie.hasClass('is-pointer-down'), 'is-pointer-down class removed' );
  } );

  $draggie.one( 'dragStart', function( event, pointer ) {
    didDragStart = true;
    assert.equal( typeof event, 'object', 'didDragStart event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'didDragStart pageX' );
    assert.ok( $draggie.hasClass('is-dragging'), 'is-dragging class added' );
  } );

  $draggie.one( 'dragMove', function( event, pointer, moveVector ) {
    didDragMove = true;
    assert.equal( typeof event, 'object', 'dragMove event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'dragMove pageX' );
    assert.equal( typeof moveVector.x, 'number', 'dragMove moveVector.x' );
    assert.equal( typeof moveVector.y, 'number', 'dragMove moveVector.y' );
  } );

  $draggie.one( 'dragEnd', function( event, pointer ) {
    didDragEnd = true;
    assert.equal( typeof event, 'object', 'dragEnd event argument' );
    assert.ok( pointer.pageX, 'dragEnd pageX' );
    assert.ok( !$draggie.hasClass('is-dragging'), 'is-dragging class removed' );

    assert.ok( didPointerDown, 'didPointerDown' );
    assert.ok( didPointerMove, 'didPointerMove' );
    assert.ok( didPointerUp, 'didPointerUp' );
    assert.ok( didDragStart, 'didDragStart' );
    assert.ok( didDragMove, 'didDragMove' );
    assert.ok( didDragEnd, 'didDragEnd' );

    assert.ok( draggieElem.style.left, 'drag elem style left' );
    assert.ok( draggieElem.style.top, 'drag elem style left' );
    assert.ok( !draggieElem.style.transform, 'transform style removed' );
    // done
    $h2.text('basics: done');
    $test.removeClass('running');
    done();
  } );

} );
