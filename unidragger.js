/*!
 * Unidragger v2.4.0
 * Draggable base class
 * MIT license
 */

( function( window, factory ) {
  // universal module definition
  if ( typeof module == 'object' && module.exports ) {
    // CommonJS
    module.exports = factory(
        window,
        require('ev-emitter'),
    );
  } else {
    // browser global
    window.Unidragger = factory(
        window,
        window.EvEmitter,
    );
  }

}( window, function factory( window, EvEmitter ) {

function Unidragger() {}

// inherit EvEmitter
let proto = Unidragger.prototype = Object.create( EvEmitter.prototype );

// ----- bind start ----- //

// trigger handler methods for events
proto.handleEvent = function( event ) {
  let method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

let startEvent, activeEvents;
if ( 'ontouchstart' in window ) {
  // HACK prefer Touch Events as you can preventDefault on touchstart to
  // disable scroll in iOS & mobile Chrome metafizzy/flickity#1177
  startEvent = 'touchstart';
  activeEvents = [ 'touchmove', 'touchend', 'touchcancel' ];
} else if ( window.PointerEvent ) {
  // Pointer Events
  startEvent = 'pointerdown';
  activeEvents = [ 'pointermove', 'pointerup', 'pointercancel' ];
} else {
  // mouse events
  startEvent = 'mousedown';
  activeEvents = [ 'mousemove', 'mouseup' ];
}

// prototype so it can be overwriteable by Flickity
proto.touchActionValue = 'none';

proto.bindHandles = function() {
  this._bindHandles( 'addEventListener', this.touchActionValue );
};

proto.unbindHandles = function() {
  this._bindHandles( 'removeEventListener', '' );
};

/**
 * Add or remove start event
 * @param {String} bindMethod - addEventListener or removeEventListener
 * @param {String} touchAction - value for touch-action CSS property
 */
proto._bindHandles = function( bindMethod, touchAction ) {
  this.handles.forEach( ( handle ) => {
    handle[ bindMethod ]( startEvent, this );
    handle[ bindMethod ]( 'click', this );
    // touch-action: none to override browser touch gestures. metafizzy/flickity#540
    if ( window.PointerEvent ) handle.style.touchAction = touchAction;
  } );
};

proto.bindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.addEventListener( eventName, this );
  } );
};

proto.unbindActivePointerEvents = function() {
  activeEvents.forEach( ( eventName ) => {
    window.removeEventListener( eventName, this );
  } );
};

// ----- event handler helpers ----- //

// trigger method with matching pointer
proto.withPointer = function( methodName, event ) {
  if ( event.pointerId == this.pointerIdentifier ) {
    this[ methodName ]( event, event );
  }
};

// trigger method with matching touch
proto.withTouch = function( methodName, event ) {
  let touches = event.changedTouches.filter( function( touch ) {
    return touch.identifier == this.pointerIdentifier;
  }, this );
  let touch = touches[0];
  if ( touch ) {
    this[ methodName ]( event, touch );
  }
};

// ----- start event ----- //

proto.onmousedown = function( event ) {
  this.pointerDown( event, event );
};

proto.ontouchstart = function( event ) {
  this.pointerDown( event, event.changedTouches[0] );
};

proto.onpointerdown = function( event ) {
  this.pointerDown( event, event );
};

// nodes that have text fields
const cursorNodes = [ 'TEXTAREA', 'INPUT', 'SELECT', 'OPTION' ];
// input types that do not have text fields
const clickTypes = [ 'radio', 'checkbox', 'button', 'submit', 'image', 'file' ];

/**
 * any time you set `event, pointer` it refers to:
 * @param {Event} event
 * @param {Event | Touch} pointer
 */
proto.pointerDown = function( event, pointer ) {
  // dismiss multi-touch taps, right clicks, and clicks on text fields
  let isCursorNode = cursorNodes.includes( event.target.nodeName );
  let isClickType = clickTypes.includes( event.target.type );
  let isOkayElement = !isCursorNode || isClickType;
  let isOkay = !this.isPointerDown && !event.button && isOkayElement;
  if ( !isOkay ) return;

  this.isPointerDown = true;
  // save pointer identifier to match up touch events
  this.pointerIdentifier = pointer.pointerId !== undefined ?
    // pointerId for pointer events, touch.indentifier for touch events
    pointer.pointerId : pointer.identifier;

  this.pointerDown( event, pointer );
  this.bindActivePointerEvents();
  this.emitEvent( 'pointerDown', [ event, pointer ] );
};

// ----- move ----- //

proto.onmousemove = function( event ) {
  this.pointerMove( event, event );
};

proto.onpointermove = function( event ) {
  this.withPointer( 'pointerMove', event );
};

proto.ontouchmove = function( event ) {
  this.withTouch( 'pointerMove', event );
};

proto.pointerMove = function( event, pointer ) {
  let moveVector = {
    x: pointer.pageX - this.pointerDownPointer.pageX,
    y: pointer.pageY - this.pointerDownPointer.pageY,
  };
  this.emitEvent( 'pointerMove', [ event, pointer, moveVector ] );
  // start drag if pointer has moved far enough to start drag
  let isDragStarting = !this.isDragging && this.hasDragStarted( moveVector );
  if ( isDragStarting ) this.dragStart( event, pointer );
  if ( this.isDragging ) this.dragMove( event, pointer, moveVector );
};

// condition if pointer has moved far enough to start drag
proto.hasDragStarted = function( moveVector ) {
  return Math.abs( moveVector.x ) > 3 || Math.abs( moveVector.y ) > 3;
};

// ----- drag ----- //

proto.dragStart = function( event, pointer ) {
  this.isDragging = true;
  this.isPreventingClicks = true; // set flag to prevent clicks
  this.emitEvent( 'dragStart', [ event, pointer ] );
};

proto.dragMove = function( event, pointer, moveVector ) {
  this.emitEvent( 'dragMove', [ event, pointer, moveVector ] );
};

// ----- end ----- //

proto.onmouseup = function( event ) {
  this.pointerUp( event, event );
};

proto.onpointerup = function( event ) {
  this.withPointer( 'pointerUp', event );
};

proto.ontouchend = function( event ) {
  this.withTouch( 'pointerUp', event );
};

proto.pointerUp = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerUp', [ event, pointer ] );

  if ( this.isDragging ) {
    this.dragEnd( event, pointer );
  } else {
    // pointer didn't move enough for drag to start
    this.staticClick( event, pointer );
  }
};

proto.dragEnd = function( event, pointer ) {
  this.isDragging = false; // reset flag
  // re-enable clicking async
  setTimeout( () => delete this.isPreventingClicks );

  this.emitEvent( 'dragEnd', [ event, pointer ] );
};

// triggered on pointer up & pointer cancel
proto.pointerDone = function() {
  this.isPointerDown = false;
  delete this.pointerIdentifier;
  this.unbindActivePointerEvents();
  this.emitEvent('pointerDone');
};

// ----- cancel ----- //

proto.onpointercancel = function( event ) {
  this.withPointer( 'pointerCancel', event );
};

proto.ontouchcancel = function( event ) {
  this.withTouch( 'pointerCancel', event );
};

proto.pointerCancel = function( event, pointer ) {
  this.pointerDone();
  this.emitEvent( 'pointerCancel', [ event, pointer ] );
};

// ----- click ----- //

// handle all clicks and prevent clicks when dragging
proto.onclick = function( event ) {
  if ( this.isPreventingClicks ) event.preventDefault();
};

// triggered after pointer down & up with no/tiny movement
proto.staticClick = function( event, pointer ) {
  // ignore emulated mouse up clicks
  let isMouseup = event.type == 'mouseup';
  if ( isMouseup && this.isIgnoringMouseUp ) return;

  this.emitEvent( 'staticClick', [ event, pointer ] );

  // set flag for emulated clicks 300ms after touchend
  if ( isMouseup ) {
    this.isIgnoringMouseUp = true;
    // reset flag after 400ms
    setTimeout( () => {
      delete this.isIgnoringMouseUp;
    }, 400 );
  }
};

// -----  ----- //

return Unidragger;

} ) );
