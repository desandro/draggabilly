QUnit.test( 'init', function( assert ) {

  assert.expect( 30 );
  var done = assert.async();

  var testElem = document.querySelector('.test--basics');
  var h2 = testElem.querySelector('h2');
  h2.textContent = 'Drag this element';
  testElem.classList.add('running');
  var draggieElem = testElem.querySelector('.draggie');
  var draggie = new Draggabilly( draggieElem );

  assert.equal( draggieElem.style.position, 'relative', 'position: relative set' );

  var didPointerDown, didPointerMove, didPointerUp, didDragStart, didDragMove,
          didDragEnd;

  draggie.once( 'pointerDown', function( event, pointer ) {
    didPointerDown = true;
    assert.equal( typeof event, 'object', 'pointerDown event argument' );
    assert.ok( pointer.pageX, 'pointerDown pageX' );
    assert.ok( draggieElem.classList.contains('is-pointer-down'),
        'is-pointer-down class added' );
  } );

  draggie.once( 'pointerMove', function( event, pointer, moveVector ) {
    didPointerMove = true;
    assert.equal( typeof event, 'object', 'pointerMove event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'pointerMove pageX' );
    assert.equal( typeof moveVector.x, 'number', 'pointerMove moveVector.x' );
    assert.equal( typeof moveVector.y, 'number', 'pointerMove moveVector.y' );
  } );

  draggie.once( 'pointerUp', function( event, pointer ) {
    didPointerUp = true;
    assert.equal( typeof event, 'object', 'pointerUp event argument' );
    assert.ok( pointer.pageX, 'pointerUp pageX' );
    assert.ok( !draggieElem.classList.contains('is-pointer-down'),
        'is-pointer-down class removed' );
  } );

  draggie.once( 'dragStart', function( event, pointer ) {
    didDragStart = true;
    assert.equal( typeof event, 'object', 'didDragStart event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'didDragStart pageX' );
    assert.ok( draggieElem.classList.contains('is-dragging'),
        'is-dragging class added' );
  } );

  draggie.once( 'dragMove', function( event, pointer, moveVector ) {
    didDragMove = true;
    assert.equal( typeof event, 'object', 'dragMove event argument' );
    assert.equal( typeof pointer.pageX, 'number', 'dragMove pageX' );
    assert.equal( typeof moveVector.x, 'number', 'dragMove moveVector.x' );
    assert.equal( typeof moveVector.y, 'number', 'dragMove moveVector.y' );
  } );

  draggie.once( 'dragEnd', function( event, pointer ) {
    didDragEnd = true;
    assert.equal( typeof event, 'object', 'dragEnd event argument' );
    assert.ok( pointer.pageX, 'dragEnd pageX' );
    assert.ok( !draggieElem.classList.contains('is-dragging'),
        'is-dragging class removed' );

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
    h2.textContent = 'basics: done';
    testElem.classList.remove('running');
    done();
  } );

} );
