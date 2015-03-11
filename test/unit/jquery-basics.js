/*jshint jquery: true */

test( 'init', function( assert ) {
  'use strict';

  var transformProperty = getStyleProperty('transform');
  assert.expect( 29 + ( transformProperty ? 1 : 0 ) );
  var done = assert.async();

  var $test = $('.test--basics').addClass('running');
  var $h2 = $test.find('h2').text('Drag this element');

  var $draggie = $('.draggie').draggabilly();
  var draggieElem = $draggie[0];

  equal( draggieElem.style.position, 'relative', 'position: relative set' );

  var didPointerDown, didPointerMove, didPointerUp, didDragStart, didDragMove,
    didDragEnd;


  $draggie.one( 'pointerDown', function( event, pointer ) {
    didPointerDown = true;
    equal( typeof event, 'object', 'pointerDown event argument' );
    ok( pointer.pageX, 'pointerDown pageX' );
    ok( $draggie.hasClass('is-pointer-down'), 'is-pointer-down class added' );
  });

  $draggie.one( 'pointerMove', function( event, pointer, moveVector ) {
    didPointerMove = true;
    equal( typeof event, 'object', 'pointerMove event argument' );
    equal( typeof pointer.pageX, 'number', 'pointerMove pageX' );
    equal( typeof moveVector.x, 'number', 'pointerMove moveVector.x' );
    equal( typeof moveVector.y, 'number', 'pointerMove moveVector.y' );
  });

  $draggie.one( 'pointerUp', function( event, pointer ) {
    didPointerUp = true;
    equal( typeof event, 'object', 'pointerUp event argument' );
    ok( pointer.pageX, 'pointerUp pageX' );
    ok( !$draggie.hasClass('is-pointer-down'), 'is-pointer-down class removed' );
  });

  $draggie.one( 'dragStart', function( evnet, pointer ) {
    didDragStart = true;
    equal( typeof event, 'object', 'didDragStart event argument' );
    equal( typeof pointer.pageX, 'number', 'didDragStart pageX' );
    ok( $draggie.hasClass('is-dragging'), 'is-dragging class added' );
  });

  $draggie.one( 'dragMove', function( event, pointer, moveVector ) {
    didDragMove = true;
    equal( typeof event, 'object', 'dragMove event argument' );
    equal( typeof pointer.pageX, 'number', 'dragMove pageX' );
    equal( typeof moveVector.x, 'number', 'dragMove moveVector.x' );
    equal( typeof moveVector.y, 'number', 'dragMove moveVector.y' );
  });

  $draggie.one( 'dragEnd', function( event, pointer ) {
    didDragEnd = true;
    equal( typeof event, 'object', 'dragEnd event argument' );
    ok( pointer.pageX, 'dragEnd pageX' );
    ok( !$draggie.hasClass('is-dragging'), 'is-dragging class removed' );

    ok( didPointerDown, 'didPointerDown' );
    ok( didPointerMove, 'didPointerMove' );
    ok( didPointerUp, 'didPointerUp' );
    ok( didDragStart, 'didDragStart' );
    ok( didDragMove, 'didDragMove' );
    ok( didDragEnd, 'didDragEnd' );

    ok( draggieElem.style.left, 'drag elem style left' );
    ok( draggieElem.style.top, 'drag elem style left' );
    if ( transformProperty ) {
      ok( !draggieElem.style[ transformProperty ], 'transform style removed' );
    }
    // done
    $h2.text('basics: done');
    $test.removeClass('running');
    done();
  });

});
