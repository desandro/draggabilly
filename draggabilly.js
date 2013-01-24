( function( window ) {

'use strict';

var document = window.document;

// -------------------------- helpers -------------------------- //

// extend objects
function extend( a, b ) {
  for ( var prop in b ) {
    a[ prop ] = b[ prop ];
  }
  return a;
}

// ----- get style ----- //

var defView = document.defaultView;

var getStyle = defView && defView.getComputedStyle ?
  function( elem ) {
    return defView.getComputedStyle( elem, null );
  } :
  function( elem ) {
    return elem.currentStyle;
  };

// -------------------------- requestAnimationFrame -------------------------- //

// https://gist.github.com/1866474

var lastTime = 0;
var prefixes = 'webkit moz ms o'.split(' ');
// get unprefixed rAF and cAF, if present
var requestAnimationFrame = window.requestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame;
// loop through vendor prefixes and get prefixed rAF and cAF
var prefix;
for( var i = 0; i < prefixes.length; i++ ) {
  if ( requestAnimationFrame && cancelAnimationFrame ) {
    break;
  }
  prefix = prefixes[i];
  requestAnimationFrame = requestAnimationFrame || window[ prefix + 'RequestAnimationFrame' ];
  cancelAnimationFrame  = cancelAnimationFrame  || window[ prefix + 'CancelAnimationFrame' ] ||
                            window[ prefix + 'CancelRequestAnimationFrame' ];
}

// fallback to setTimeout and clearTimeout if either request/cancel is not supported
if ( !requestAnimationFrame || !cancelAnimationFrame ) {
  requestAnimationFrame = function( callback, element ) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max( 0, 16 - ( currTime - lastTime ) );
    var id = window.setTimeout( function() {
      callback( currTime + timeToCall );
    }, timeToCall );
    lastTime = currTime + timeToCall;
    return id;
  };

  cancelAnimationFrame = function( id ) {
    window.clearTimeout( id );
  };
}

// -------------------------- addEvent / removeEvent -------------------------- //

// by John Resig - http://ejohn.org/projects/flexible-javascript-events/

function addEvent( obj, type, fn ) {
  if ( obj.addEventListener ) {
    obj.addEventListener( type, fn, false );
  } else if ( obj.attachEvent ) {
    obj[ 'e' + type + fn ] = fn;
    obj[ type + fn ] = function() {
      obj[ 'e' + type + fn ]( window.event );
    };
    obj.attachEvent( "on" + type, obj[ type + fn ] );
  }
}

function removeEvent( obj, type, fn ) {
  if ( obj.removeEventListener ) {
    obj.removeEventListener( type, fn, false );
  } else if ( obj.detachEvent ) {
    obj.detachEvent( "on" + type, obj[ type + fn ] );
    delete obj[ type + fn ];
    delete obj[ 'e' + type + fn ];
  }
}

// -------------------------- getStyleProperty by kangax -------------------------- //
// http://perfectionkills.com/feature-testing-css-properties/

function capitalize( str ) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

prefixes = 'Moz Webkit Ms O'.split(' ');

function getStyleProperty( propName ) {
  var style = document.documentElement.style,
      prefixed;

  // test standard property first
  if ( typeof style[propName] === 'string' ) {
    return propName;
  }

  // capitalize
  propName = capitalize( propName );

  // test vendor specific properties
  for ( var i=0, len = prefixes.length; i < len; i++ ) {
    prefixed = prefixes[i] + propName;
    if ( typeof style[ prefixed ] === 'string' ) {
      return prefixed;
    }
  }
}

// -------------------------- support -------------------------- //

var isTouch = 'createTouch' in document;
// events
var pointerStartEvent = isTouch ? 'touchstart' : 'mousedown';
var pointerMoveEvent = isTouch ? 'touchmove' : 'mousemove';
var pointerEndEvent = isTouch ? 'touchend' : 'mouseup';

var transformProperty = getStyleProperty('transform');

// --------------------------  -------------------------- //

function Draggabilly( element, options ) {
  this.element = element;

  extend( this.options, options );

  this._create();

}

Draggabilly.prototype.options = {
};

Draggabilly.prototype._create = function() {

  // properties
  var style = getStyle( this.element );

  this.position = {
    x: parseInt( style.left, 10 ),
    y: parseInt( style.top, 10 )
  };
  // clean up 'auto' or other non-integer values
  this.position.x = isNaN( this.position.x ) ? 0 : this.position.x;
  this.position.y = isNaN( this.position.y ) ? 0 : this.position.y;

  this.startPoint = { x: 0, y: 0 };

  this.startPosition = extend( {}, this.position );

  // set relative positioning
  if ( style.position !== 'relative' && style.position !== 'absolute' ) {
    this.element.style.position = 'relative';
  }

  // bind mousedown/touchstart event
  addEvent( this.element, pointerStartEvent, this );

};

// -------------------------- events -------------------------- //

// trigger handler methods for events
Draggabilly.prototype.handleEvent = function( event ) {
  var method = 'on' + event.type;
  if ( this[ method ] ) {
    this[ method ]( event );
  }
};

// returns the touch that we're keeping track of
Draggabilly.prototype.getTouch = function( touches ) {
  for ( var i=0, len = touches.length; i < len; i++ ) {
    var touch = touches[i];
    if ( touch.identifier === this.pointerIdentifier ) {
      return touch;
    }
  }
};

// ----- start event ----- //

Draggabilly.prototype.onmousedown = function( event ) {
  this.pointerStart( event, event );
};

Draggabilly.prototype.ontouchstart = function( event ) {
  // disregard additional touches
  if ( this.pointerIdentifier ) {
    return;
  }

  this.pointerStart( event, event.changedTouches[0] );
};

var pointerGUID = 0;

/**
 * @param {Event} event
 * @param {Event or Touch} pointer
 */
Draggabilly.prototype.pointerStart = function( event, pointer ) {
  event.preventDefault();

  this.pointerIdentifier = pointer.identifier || 1;

  // point where drag began
  this.startPoint.x = pointer.pageX;
  this.startPoint.y = pointer.pageY;
  // position _when_ drag began
  this.startPosition.x = this.position.x;
  this.startPosition.y = this.position.y;

  this.dragX = 0;
  this.dragY = 0;

  // add events
  addEvent( window, pointerMoveEvent, this );
  addEvent( window, pointerEndEvent, this );

  // reset isDragging flag
  this.isDragging = true;
  // start animation
  this.animate();

};


// ----- move event ----- //

Draggabilly.prototype.onmousemove = function( event ) {
  this.pointerMove( event, event );
};

Draggabilly.prototype.ontouchmove = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.pointerMove( event, touch );
  }
};

Draggabilly.prototype.pointerMove = function( event, pointer ) {
  this.dragX = pointer.pageX - this.startPoint.x;
  this.dragY = pointer.pageY - this.startPoint.y;

  this.position.x = this.startPosition.x + this.dragX;
  this.position.y = this.startPosition.y + this.dragY;
};


// ----- end event ----- //

Draggabilly.prototype.onmouseup = function( event ) {
  this.pointerEnd( event, event );
};

Draggabilly.prototype.ontouchend = function( event ) {
  var touch = this.getTouch( event.changedTouches );
  if ( touch ) {
    this.pointerEnd( event, touch );
  }
};

Draggabilly.prototype.pointerEnd = function( event, pointer ) {
  this.isDragging = false;

  delete this.pointerIdentifier;

  // use top left position when complete
  this.element.style.webkitTransform = '';
  this.element.style.left = this.position.x + 'px';
  this.element.style.top =  this.position.y + 'px';

  // remove events
  removeEvent( window, pointerMoveEvent, this );
  removeEvent( window, pointerEndEvent, this );

};

// -------------------------- animation -------------------------- //

Draggabilly.prototype.animate = function() {
  // only render and animate if dragging
  if ( !this.isDragging ) {
    return;
  }

  this.positionDrag();

  var _this = this;
  requestAnimationFrame( function animateFrame() {
    _this.animate();
  });

};

Draggabilly.prototype.positionDrag = transformProperty ?
  function() {
    // position with transform
    this.element.style[ transformProperty ] = 'translate(' + this.dragX +
      'px, ' + this.dragY + 'px )';
  } : function() {
    // left/top positioning
    this.element.style.left = this.position.x + 'px';
    this.element.style.top  = this.position.y + 'px';
  };

// --------------------------  -------------------------- //


// publicize
window.Draggabilly = Draggabilly;

})( window );
