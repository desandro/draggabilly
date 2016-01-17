# Draggabilly

<div class="demo demo--basic">
  <div class="demo__positioner">
    <div class="draggable">
      <div class="total-centered">Drag me</div>
    </div>
    <p class="demo__edit-link">
      <a href="http://codepen.io/desandro/pen/yyRapr">Edit this demo on CodePen</a> or
      <a href="http://codepen.io/desandro/pen/EadgXx">vanilla JS demo</a>
    </p>
  </div>
</div>

<p class="tagline">Make that shiz draggable</p>

[github.com/desandro/draggabilly](http://github.com/desandro/draggabilly)

Rad because it supports IE10+ and multi-touch.

## Install

Grab a packaged source file:

+ [draggabilly.pkgd.min.js](http://draggabilly.desandro.com/draggabilly.pkgd.min.js) minified
+ [draggabilly.pkgd.js](http://draggabilly.desandro.com/draggabilly.pkgd.js) un-minified

### Package managers

Install with [npm](https://www.npmjs.com/package/draggabilly): `npm install draggabilly`

Install with [Bower](http://bower.io): `bower install draggabilly`

### CDN

Link directly to Draggabilly files on [npmcdn.com](https://npmcdn.com).

``` html
<script src="https://npmcdn.com/draggabilly@2.1/dist/draggabilly.pkgd.min.js"></script>
<!-- or -->
<script src="https://npmcdn.com/draggabilly@2.1/dist/draggabilly.pkgd.js"></script>
```

## Usage

Initialize Draggabilly as a jQuery plugin

``` js
var $draggable = $('.draggable').draggabilly({
  // options...
})
```

Initialize Draggabilly with vanilla JS

``` js
var elem = document.querySelector('.draggable');
var draggie = new Draggabilly( elem, {
  // options...
});

// or pass in selector string as first argument
var draggie = new Draggabilly( '.draggable', {
  // options...
});

// if you have multiple .draggable elements
// get all draggie elements
var draggableElems = document.querySelectorAll('.draggable');
// array of Draggabillies
var draggies = []
// init Draggabillies
for ( var i=0, len = draggableElems.length; i < len; i++ ) {
  var draggableElem = draggableElems[i];
  var draggie = new Draggabilly( draggableElem, {
    // options...
  });
  draggies.push( draggie );
}
```

### Classes

+ `.is-pointer-down` added when the user's pointer (mouse, touch, pointer) first presses down.
+ `.is-dragging` added when elements starts to drag.

## Options

### axis

<div class="demo demo--axis">
  <div class="demo__positioner">
    <div class="draggable draggable--squat">
      <div class="total-centered">axis: 'x'</div>
    </div>
    <p class="demo__edit-link">
      <a href="http://codepen.io/desandro/pen/WbaGMa">Edit this demo on CodePen</a> or
      <a href="http://codepen.io/desandro/pen/myzrXB">vanilla JS demo</a>
    </p>
  </div>
</div>

**Type:** _String_

**Values:** `'x'` or `'y'`

``` js
axis: 'x'
```

Constrains movement to horizontal or vertical axis.

### containment

<div class="demo demo--containment">
  <div class="demo__positioner">
    <div class="demo--containment__container">
      <div class="draggable"></div>
      <div class="draggable"></div>
      <div class="draggable"></div>
    </div>
    <p class="demo__edit-link">
      <a href="http://codepen.io/desandro/pen/azRmYv">Edit this demo on CodePen</a> or
      <a href="http://codepen.io/desandro/pen/dPgpev">vanilla JS demo</a>
    </p>
  </div>
</div>

**Type:** _Element_, Selector _String_, or _Boolean_

``` js
containment: '.container'
```

Contains movement to the bounds of the element. If `true`, the container will be the parent element.

### grid

<div class="demo demo--grid">
  <div class="demo__positioner">
    <div class="draggable draggable--squat">
      <div class="total-centered">grid: [ 20, 20 ]</div>
    </div>
    <p class="demo__edit-link">
      <a href="http://codepen.io/desandro/pen/ZYqpRg">Edit this demo on CodePen</a> or
      <a href="http://codepen.io/desandro/pen/XJxjBJ">vanilla JS demo</a>
    </p>
  </div>
</div>

**Type:** _Array_

**Values:** `[ x, y ]`

``` js
grid: [ 20, 20 ]
```

Snaps the element to a grid, every x and y pixels.

### handle

<div class="demo demo--handle">
  <div class="demo__positioner">
    <div class="draggable">
      <div class="handle"></div>
    </div>
    <p class="demo__edit-link">
      <a href="http://codepen.io/desandro/pen/xbyEyO">Edit this demo on CodePen</a> or
      <a href="http://codepen.io/desandro/pen/NPOROE">vanilla JS demo</a>
    </p>
  </div>
</div>

**Type:** Selector _String_

``` js
handle: '.handle'
```

Specifies on what element the drag interaction starts.

`handle` is useful for when you do not want all inner elements to be used for dragging, like inputs and forms. See [back handle example on CodePen](http://codepen.io/desandro/pen/znAuH).

## Events

Bind events with jQuery with standard jQuery event methods `.on()`, `.off()`, and `.one()`. Inside jQuery event listeners `this` refers to the Draggabilly element.

<div class="demo demo--events">
  <div class="demo__positioner">
    <pre><code>


</code></pre>
    <div class="draggable"></div>
  </div>
</div>

``` js
// jQuery
function listener(/* parameters */) {
  // get Draggabilly instance
  var draggie = $(this).data('draggabilly');
  console.log( 'eventName happened', draggie.position.x, draggie.position.y );
}
// bind event listener
$draggable.on( 'eventName', listener );
// unbind event listener
$draggable.off( 'eventName', listener );
// bind event listener to trigger once. note ONE not ON
$draggable.one( 'eventName', function() {
  console.log('eventName happened just once');
});
```

Bind events with vanilla JS with `.on()`, `.off()`, and `.once()` methods. Inside vanilla JS event listeners `this` refers to the Draggabilly instance.

``` js
// vanilla JS
function listener(/* parameters */) {
  console.log( 'eventName happened', this.position.x, this.position.y );
}
// bind event listener
draggie.on( 'eventName', listener );
// unbind event listener
draggie.off( 'eventName', listener );
// bind event listener to trigger once. note ONCE not ONE or ON
draggie.once( 'eventName', function() {
  console.log('eventName happened just once');
});
```

### dragStart

Triggered when dragging starts and the element starts moving. Dragging starts after the user's pointer has moved a couple pixels to allow for clicks.

```js
// jQuery
$draggable.on( 'dragStart', function( event, pointer ) {...})
// vanilla JS
draggie.on( 'dragStart', function( event, pointer ) {...})
```

+ `event` - **Type:** _Event_ - the original `mousedown` or `touchstart` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

[Edit demo on CodePen](http://codepen.io/desandro/pen/KwGgGY) or [vanilla JS demo](http://codepen.io/desandro/pen/qEJaQq).

### dragMove

Triggered when dragging moves.

```js
// jQuery
$draggable.on( 'dragMove', function( event, pointer, moveVector ) {...})
// vanilla JS
draggie.on( 'dragMove', function( event, pointer, moveVector ) {...})
```

+ `event` - **Type:** _Event_ - the original `mousemove` or `touchmove` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`
+ `moveVector` **Type:** _Object_ - How far the pointer has moved from its start position `{ x: 20, y: -30 }`

[Edit demo on CodePen](http://codepen.io/desandro/pen/gbBwQe) or [vanilla JS demo](http://codepen.io/desandro/pen/QwZKJY).

### dragEnd

Triggered when dragging ends.

```js
// jQuery
$draggable.on( 'dragEnd', function( event, pointer ) {...})
// vanilla JS
draggie.on( 'dragEnd', function( event, pointer ) {...})
```

+ `event` - **Type:** _Event_ - the original `mouseup` or `touchend` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

[Edit demo on CodePen](http://codepen.io/desandro/pen/RNeGOQ) or [vanilla JS demo](http://codepen.io/desandro/pen/ByqLEq).

### pointerDown

Triggered when the user's pointer (mouse, touch, pointer) presses down.

```js
// jQuery
$draggable.on( 'pointerDown', function( event, pointer ) {...})
// vanilla JS
draggie.on( 'pointerDown', function( event, pointer ) {...})
```

+ `event` - **Type:** _Event_ - the original `mousedown` or `touchstart` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

[Edit demo on CodePen](http://codepen.io/desandro/pen/QwZKYo) or [vanilla JS demo](http://codepen.io/desandro/pen/NPORJe).

### pointerMove

Triggered when the user's pointer moves.

```js
// jQuery
$draggable.on( 'pointerMove', function( event, pointer, moveVector ) {...})
// vanilla JS
draggie.on( 'pointerMove', function( event, pointer, moveVector ) {...})
```

+ `event` - **Type:** _Event_ - the original `mousemove` or `touchmove` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`
+ `moveVector` **Type:** _Object_ - How far the pointer has moved from its start position `{ x: 20, y: -30 }`

[Edit demo on CodePen](http://codepen.io/desandro/pen/dPgpaR) or [vanilla JS demo](http://codepen.io/desandro/pen/ZYqpwE).

### pointerUp

Triggered when the user's pointer unpresses.

```js
// jQuery
$draggable.on( 'pointerUp', function( event, pointer ) {...})
// vanilla JS
draggie.on( 'pointerUp', function( event, pointer ) {...})
```

+ `event` - **Type:** _Event_ - the original `mouseup` or `touchend` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

[Edit demo on CodePen](http://codepen.io/desandro/pen/zxmKQq) or [vanilla JS demo](http://codepen.io/desandro/pen/QwZKPP).

### staticClick

Triggered when the user's pointer is pressed and unpressed and has not moved enough to start dragging.

`click` events are hard to detect with draggable UI, as they are triggered whenever a user drags. Draggabilly's staticClick event resolves this, as it is triggered when the user has not dragged.

```js
// jQuery
$draggable.on( 'staticClick', function( event, pointer ) {...})
// vanilla JS
draggie.on( 'staticClick', function( event, pointer ) {...})
```

+ `event` - **Type:** _Event_ - the original `mouseup` or `touchend` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

[Edit demo on CodePen](http://codepen.io/desandro/pen/YPJGbE) or [vanilla JS demo](http://codepen.io/desandro/pen/OPBRYo).

## Methods

### disable

``` js
// jQuery
$draggable.draggabilly('disable')
// vanilla JS
draggie.disable()
```

### enable

``` js
// jQuery
$draggable.draggabilly('enable')
// vanilla JS
draggie.enable()
```

### destroy

``` js
// jQuery
$draggable.draggabilly('destroy')
// vanilla JS
draggie.destroy()
```

### jQuery.fn.data('draggabilly')

Get the Draggabilly instance from a jQuery object. Draggabilly instances are useful to access Draggabilly properties.

``` js
var draggie = $('.draggable').data('draggabilly')
// access Draggabilly properties
console.log( 'draggie at ' + draggie.position.x + ', ' + draggie.position.y )
```

## Properties

### position

`{ x: 20, y: -30 }`

+ `x` _Integer_
+ `y` _Integer_

## RequireJS

Draggabilly works with [RequireJS](http://requirejs.org).

You can require `draggabilly.pkgd.js`..

``` js
requirejs( [
  'path/to/draggabilly.pkgd.js',
], function( Draggabilly ) {
  new Draggabilly( ... );
});
```

To use Draggabilly as a jQuery plugin with RequireJS and draggabilly.pkgd.js, you need to call jQuery Bridget.

``` js
// require the require function
requirejs( [ 'require', 'jquery', 'path/to/draggabilly.pkgd.js' ],
  function( require, $, Draggabilly ) {
    // require jquery-bridget, it's included in draggabilly.pkgd.js
    require( [ 'jquery-bridget/jquery-bridget' ],
    function() {
      // make Draggabilly a jQuery plugin
      $.bridget( 'draggabilly', Draggabilly );
      // now you can use $().draggabilly()
      $('.draggable').draggabilly({...})
    }
  );
});
```

Or, you can manage dependencies with [Bower](http://bower.io). Set `baseUrl` to `bower_components` and set a path config for all your application code.

``` js
requirejs.config({
  baseUrl: 'bower_components/',
  paths: { // path your your app
    app: '../'
  }
});

requirejs( [
  'draggabilly/draggabilly',
  'app/my-component.js'
], function( Draggabilly, myComp ) {
  new Draggabilly( '.draggable', {...});
});
```

You can require Bower dependencies and use Isotope as a jQuery plugin with jQuery Bridget.

``` js
requirejs.config({
  baseUrl: '../bower_components',
  paths: {
    jquery: 'jquery/jquery'
  }
});

requirejs( [
    'jquery',
    'draggabilly/draggabilly',
    'jquery-bridget/jquery.bridget'
  ],
  function( $, Draggabilly ) {
    // make Draggabilly a jQuery plugin
    $.bridget( 'draggabilly', Draggabilly );
    // now you can use $().draggabilly()
    $('.draggable').draggabilly({...})
});
```

## Browserify

Draggabilly works with [Browserify](http://browserify.org/). Install [Draggabilly with npm](https://www.npmjs.com/package/draggabilly).

```
npm install draggabilly
```

``` js
var Draggabilly = require('draggabilly');

var draggie = new Draggabilly( '.draggable', {
  // options
});
```

To use Draggabilly as a jQuery plugin with Browserify, you need to call jQuery Bridget.

```
npm install jquery-bridget
```

``` js
var $ = require('jquery');
require('jquery-bridget');
var Draggabilly = require('draggabilly');

// make Draggabilly a jQuery plugin
$.bridget( 'draggabilly', Draggabilly );
// now you can use $().draggabilly()
$('.draggable').draggabilly({...})
```

## Browser support

IE10+, Android 4+, iOS 6+, and all modern browsers

Use [Draggabilly v1 for IE8 & 9, and Android 2.3+ support](http://draggabilly.desandro.com/v1)

## License

Draggabilly is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
