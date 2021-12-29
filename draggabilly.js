/*!
 * Draggabilly v3.0.0
 * Make that shiz draggable
 * https://draggabilly.desandro.com
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('get-size'),
        require('unidragger'),
    );
  } else {
    // browser global
    window.Draggabilly = factory(
        window,
        window.getSize,
        window.Unidragger,
    );
  }

}( typeof window != 'undefined' ? window : this,
    function factory( window, getSize, Unidragger ) {

// -------------------------- helpers & variables -------------------------- //

function noop() {}

let jQuery = window.jQuery;

// -------------------------- Draggabilly -------------------------- //

function Draggabilly( element, options ) {
  // querySelector if string
  this.element = typeof element == 'string' ?
    document.querySelector( element ) : element;

  if ( jQuery ) {
    this.$element = jQuery( this.element );
  }

  // options
  this.options = {};
  this.option( options );

  this._create();
}

// inherit Unidragger methods
let proto = Draggabilly.prototype = Object.create( Unidragger.prototype );

/**
 * set options
 * @param {Object} opts
 */
proto.option = function( opts ) {
  this.options = {
    ...this.options,
    ...opts,
  };
};

// css position values that don't need to be set
const positionValues = [ 'relative', 'absolute', 'fixed' ];

proto._create = function() {
  // properties
  this.position = {};
  this._getPosition();

  this.startPoint = { x: 0, y: 0 };
  this.dragPoint = { x: 0, y: 0 };

  this.startPosition = { ...this.position };

  // set relative positioning
  let style = getComputedStyle( this.element );
  if ( !positionValues.includes( style.position ) ) {
    this.element.style.position = 'relative';
  }

  // events
  this.on( 'pointerDown', this.handlePointerDown );
  this.on( 'pointerUp', this.handlePointerUp );
  this.on( 'dragStart', this.handleDragStart );
  this.on( 'dragMove', this.handleDragMove );
  this.on( 'dragEnd', this.handleDragEnd );

  this.setHandles();
  this.enable();
};

// set this.handles  and bind start events to 'em
proto.setHandles = function() {
  let { handle } = this.options;
  if ( typeof handle == 'string' ) {
    this.handles = this.element.querySelectorAll( handle );
  } else if ( typeof handle == 'object' && handle.length ) {
    this.handles = handle;
  } else if ( handle instanceof HTMLElement ) {
    this.handles = [ handle ];
  } else {
    this.handles = [ this.element ];
  }
};

const cancelableEvents = [ 'dragStart', 'dragMove', 'dragEnd' ];

// duck-punch emitEvent to dispatch jQuery events as well
let emitEvent = proto.emitEvent;
proto.emitEvent = function( eventName, args ) {
  // do not emit cancelable events if dragging is disabled
  let isCanceled = !this.isEnabled && cancelableEvents.includes( eventName );
  if ( isCanceled ) return;

  emitEvent.call( this, eventName, args );

  // trigger jQuery event
  let jquery = window.jQuery;
  if ( !jquery || !this.$element ) return;
  // create jQuery event
  let event;
  let jqArgs = args;
  let isFirstArgEvent = args && args[0] instanceof Event;
  if ( isFirstArgEvent ) [ event, ...jqArgs ] = args;
  /* eslint-disable-next-line new-cap */
  let $event = jquery.Event( event );
  $event.type = eventName;
  this.$element.trigger( $event, jqArgs );
};

// -------------------------- position -------------------------- //

// get x/y position from style
proto._getPosition = function() {
  let style = getComputedStyle( this.element );
  let x = this._getPositionCoord( style.left, 'width' );
  let y = this._getPositionCoord( style.top, 'height' );
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( x ) ? 0 : x;
  this.position.y = isNaN( y ) ? 0 : y;

  this._addTransformPosition( style );
};

proto._getPositionCoord = function( styleSide, measure ) {
  if ( styleSide.includes('%') ) {
    // convert percent into pixel for Safari, #75
    let parentSize = getSize( this.element.parentNode );
    // prevent not-in-DOM element throwing bug, #131
    return !parentSize ? 0 :
      ( parseFloat( styleSide ) / 100 ) * parentSize[ measure ];
  }
  return parseInt( styleSide, 10 );
};

// add transform: translate( x, y ) to position
proto._addTransformPosition = function( style ) {
  let transform = style.transform;
  // bail out if value is 'none'
  if ( !transform.startsWith('matrix') ) return;

  // split matrix(1, 0, 0, 1, x, y)
  let matrixValues = transform.split(',');
  // translate X value is in 12th or 4th position
  let xIndex = transform.startsWith('matrix3d') ? 12 : 4;
  let translateX = parseInt( matrixValues[ xIndex ], 10 );
  // translate Y value is in 13th or 5th position
  let translateY = parseInt( matrixValues[ xIndex + 1 ], 10 );
  this.position.x += translateX;
  this.position.y += translateY;
};

// -------------------------- events -------------------------- //

proto.handlePointerDown = function( event, pointer ) {
  if ( !this.isEnabled ) return;
  // track start event position
  // Safari 9 overrides pageX and pageY. These values needs to be copied. flickity#842
  this.pointerDownPointer = {
    pageX: pointer.pageX,
    pageY: pointer.pageY,
  };

  event.preventDefault();
  document.activeElement.blur();
  // bind move and end events
  this.bindActivePointerEvents( event );
  this.element.classList.add('is-pointer-down');
};

proto.handleDragStart = function() {
  if ( !this.isEnabled ) return;

  this._getPosition();
  this.measureContainment();
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;
  // reset left/top style
  this.setLeftTop();

  this.dragPoint.x = 0;
  this.dragPoint.y = 0;

  this.element.classList.add('is-dragging');
  // start animation
  this.animate();
};

proto.measureContainment = function() {
  let container = this.getContainer();
  if ( !container ) return;

  let elemSize = getSize( this.element );
  let containerSize = getSize( container );
  let {
    borderLeftWidth,
    borderRightWidth,
    borderTopWidth,
    borderBottomWidth,
  } = containerSize;
  let elemRect = this.element.getBoundingClientRect();
  let containerRect = container.getBoundingClientRect();

  let borderSizeX = borderLeftWidth + borderRightWidth;
  let borderSizeY = borderTopWidth + borderBottomWidth;

  let position = this.relativeStartPosition = {
    x: elemRect.left - ( containerRect.left + borderLeftWidth ),
    y: elemRect.top - ( containerRect.top + borderTopWidth ),
  };

  this.containSize = {
    width: ( containerSize.width - borderSizeX ) - position.x - elemSize.width,
    height: ( containerSize.height - borderSizeY ) - position.y - elemSize.height,
  };
};

proto.getContainer = function() {
  let containment = this.options.containment;
  if ( !containment ) return;

  let isElement = containment instanceof HTMLElement;
  // use as element
  if ( isElement ) return containment;

  // querySelector if string
  if ( typeof containment == 'string' ) {
    return document.querySelector( containment );
  }
  // fallback to parent element
  return this.element.parentNode;
};

// ----- move event ----- //

/**
 * drag move
 * @param {Event} event
 * @param {Event | Touch} pointer
 * @param {Object} moveVector - x and y coordinates
 */
proto.handleDragMove = function( event, pointer, moveVector ) {
  if ( !this.isEnabled ) return;

  let dragX = moveVector.x;
  let dragY = moveVector.y;

  let grid = this.options.grid;
  let gridX = grid && grid[0];
  let gridY = grid && grid[1];

  dragX = applyGrid( dragX, gridX );
  dragY = applyGrid( dragY, gridY );

  dragX = this.containDrag( 'x', dragX, gridX );
  dragY = this.containDrag( 'y', dragY, gridY );

  // constrain to axis
  dragX = this.options.axis == 'y' ? 0 : dragX;
  dragY = this.options.axis == 'x' ? 0 : dragY;

  this.position.x = this.startPosition.x + dragX;
  this.position.y = this.startPosition.y + dragY;
  // set dragPoint properties
  this.dragPoint.x = dragX;
  this.dragPoint.y = dragY;
};

function applyGrid( value, grid, method ) {
  if ( !grid ) return value;

  method = method || 'round';
  return Math[ method ]( value/grid ) * grid;
}

proto.containDrag = function( axis, drag, grid ) {
  if ( !this.options.containment ) return drag;

  let measure = axis == 'x' ? 'width' : 'height';

  let rel = this.relativeStartPosition[ axis ];
  let min = applyGrid( -rel, grid, 'ceil' );
  let max = this.containSize[ measure ];
  max = applyGrid( max, grid, 'floor' );
  return Math.max( min, Math.min( max, drag ) );
};

// ----- end event ----- //

proto.handlePointerUp = function() {
  this.element.classList.remove('is-pointer-down');
};

proto.handleDragEnd = function() {
  if ( !this.isEnabled ) return;

  // use top left position when complete
  this.element.style.transform = '';
  this.setLeftTop();
  this.element.classList.remove('is-dragging');
};

// -------------------------- animation -------------------------- //

proto.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) return;

  this.positionDrag();
  requestAnimationFrame( () => this.animate() );
};

// left/top positioning
proto.setLeftTop = function() {
  let { x, y } = this.position;
  this.element.style.left = `${x}px`;
  this.element.style.top = `${y}px`;
};

proto.positionDrag = function() {
  let { x, y } = this.dragPoint;
  this.element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
};

// ----- methods ----- //

/**
 * @param {Number} x
 * @param {Number} y
 */
proto.setPosition = function( x, y ) {
  this.position.x = x;
  this.position.y = y;
  this.setLeftTop();
};

proto.enable = function() {
  if ( this.isEnabled ) return;
  this.isEnabled = true;
  this.bindHandles();
};

proto.disable = function() {
  if ( !this.isEnabled ) return;
  this.isEnabled = false;
  if ( this.isDragging ) this.dragEnd();
  this.unbindHandles();
};

const resetCssProperties = [ 'transform', 'left', 'top', 'position' ];

proto.destroy = function() {
  this.disable();
  // reset styles
  resetCssProperties.forEach( ( prop ) => {
    this.element.style[ prop ] = '';
  } );
  // unbind handles
  this.unbindHandles();
  // remove jQuery data
  if ( this.$element ) this.$element.removeData('draggabilly');
};

// ----- jQuery bridget ----- //

// required for jQuery bridget
proto._init = noop;

if ( jQuery && jQuery.bridget ) {
  jQuery.bridget( 'draggabilly', Draggabilly );
}

// -----  ----- //

return Draggabilly;

} ) );
