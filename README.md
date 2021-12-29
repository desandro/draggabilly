# Draggabilly

<p class="tagline">Make that shiz draggable</p>

[draggabilly.desandro.com](https://draggabilly.desandro.com)

Rad because it supports IE10+ and touch devices.

Draggabilly v3.0.0

## Install

### Download

+ [draggabilly.pkgd.min.js](https://unpkg.com/draggabilly@3/dist/draggabilly.pkgd.min.js) minified
+ [draggabilly.pkgd.js](https://unpkg.com/draggabilly@3/dist/draggabilly.pkgd.js) un-minified

### Package managers

Install with npm: `npm install draggabilly`

Install with Yarn: `yarn add draggabilly`

### CDN

Link directly to `draggabilly.pkgd.min.js` on [unpkg.com](https://unpkg.com).

``` html
<script src="https://unpkg.com/draggabilly@3/dist/draggabilly.pkgd.min.js"></script>
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
for ( var i=0; i < draggableElems.length; i++ ) {
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

**Type:** _String_

**Values:** `'x'` or `'y'`

``` js
axis: 'x'
```

Constrains movement to horizontal or vertical axis.

### containment

**Type:** _Element_, Selector _String_, or _Boolean_

``` js
containment: '.container'
```

Contains movement to the bounds of the element. If `true`, the container will be the parent element.

### grid

**Type:** _Array_

**Values:** `[ x, y ]`

``` js
grid: [ 20, 20 ]
```

Snaps the element to a grid, every x and y pixels.

### handle

**Type:** Selector _String_, _Array_, _HTMLElement_

``` js
// select all .handle children with selector string
handle: '.handle'

// set as element
handle: element.querySelector('.handle')

// set as array or NodeList
handle: [ element.querySelector('.handle1'), element.querySelector('.handle2') ]
```

Specifies on what element the drag interaction starts.

`handle` is useful for when you do not want all inner elements to be used for dragging, like inputs and forms. See [back handle example on CodePen](https://codepen.io/desandro/pen/znAuH).

## Events

Bind events with jQuery with standard jQuery event methods `.on()`, `.off()`, and `.one()`. Inside jQuery event listeners `this` refers to the Draggabilly element.

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

### setPosition

``` js
// jQuery
$draggable.draggabilly( 'setPosition', x, y )
// vanilla JS
draggie.setPosition( x, y )
```

+ `x` - **Type:** _Number_ - horizontal position
+ `y` - **Type:** _Number_ - vertical position

### dragEnd

Stop dragging.

``` js
// jQuery
$draggable.draggabilly('dragEnd')
// vanilla JS
draggie.dragEnd()
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

``` js
draggie.position
// => { x: 20, y: -30 }
```

+ `position` - **Type:** _Object_
+ `x` - **Type:** _Number_
+ `y` - **Type:** _Number_

## Module loaders

### Webpack & Browserify

Install [Draggabilly with npm](https://www.npmjs.com/package/draggabilly).

```
npm install draggabilly
```

``` js
var Draggabilly = require('draggabilly');

var draggie = new Draggabilly( '.draggable', {
  // options
});
```

To use Draggabilly as a jQuery plugin, you need to install and call [jQuery Bridget](https://github.com/desandro/jquery-bridget).

```
npm install jquery-bridget
```

``` js
var $ = require('jquery');
var jQueryBridget = require('jquery-bridget');
var Draggabilly = require('draggabilly');

// make Draggabilly a jQuery plugin
jQueryBridget( 'draggabilly', Draggabilly, $ );
// now you can use $().draggabilly()
$('.draggable').draggabilly({...})
```

## Browser support

Draggabilly v3 supports Chrome 49+, Firefox 41+, Safari 14+ (mobile & desktop), and Edge 12+.

- Use [Draggabilly v2](https://github.com/desandro/draggabilly/releases/tag/v2.3.0) for IE10 support and Safari 8 support.
- Use [Draggabilly v2.1](https://github.com/desandro/draggabilly/releases/tag/v2.1.1) for Android 4+ and Safari 6+ support.
- Use [Draggabilly v1](https://draggabilly.desandro.com/v1) for IE8 & 9, and Android 2.3+ support.

## License

Draggabilly is released under the [MIT License](https://desandro.mit-license.org/). Have at it.

---

Made by [David DeSandro](https://desandro.com) 😻
