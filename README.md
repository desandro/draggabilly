# Draggabilly

<p class="tagline">Make that shiz draggable</p>

[draggabilly.desandro.com](http://draggabilly.desandro.com)

Rad because it supports IE8+ and multi-touch.

## Install

Grab a packaged source file:

+ [draggabilly.pkgd.min.js](http://draggabilly.desandro.com/draggabilly.pkgd.min.js) for production
+ [draggabilly.pkgd.js](http://draggabilly.desandro.com/draggabilly.pkgd.js) for development

Or if you're cool with the command line, install with [Bower](http://bower.io).

``` bash
bower install draggabilly
```

## Usage

``` js
var elem = document.querySelector('#draggable');
var draggie = new Draggabilly( elem, {
  // options...
});
```

When dragging, Draggabillly will add the class `.is-dragging` to the element.

## Options

### containment

**Type:** _Element_, Selector _String_, or _Boolean_

``` js
containment: '#container'
```

Contains movement to the bounds of the element. If `true`, the container will be the parent element.

### handle

**Type:** Selector _String_

``` js
handle: '.handle'
```

Specifies on what element the drag interaction starts.

`handle` is useful for when you want not all inner elements to be used for dragging, like inputs and forms. See [back handle example on CodePen](http://codepen.io/desandro/pen/znAuH).

## Events

Draggabilly is an Event Emitter. You can bind event listeners to events.

``` js
var draggie = new Draggabilly( elem );

function onDragMove( instance, event, pointer ) {
  console.log( 'dragMove on ' + event.type +
    pointer.pageX + ', ' + pointer.pageY +
    ' position at ' + instance.position.x + ', ' + instance.position.y );
}
// bind event listener
draggie.on( 'dragMove', onDragMove );
// un-bind event listener
draggie.off( 'dragMove', onDragMove );
// return true to trigger an event listener just once
draggie.on( 'dragMove', function() {
  console.log('Draggabilly did move, just once');
  return true;
});
```

### dragStart

```js
.on( 'dragStart', function( draggieInstance, event, pointer ) { //...
```

+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance
+ `event` - **Type:** _Event_ - the original `mousedown` or `touchstart` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

### dragMove

```js
.on( 'dragMove', function( draggieInstance, event, pointer ) { //...
```

+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance
+ `event` - **Type:** _Event_ - the original `mousemove` or `touchmove` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

### dragEnd

```js
.on( 'dragEnd', function( draggieInstance, event, pointer ) { //...
```

+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance
+ `event` - **Type:** _Event_ - the original `mouseup` or `touchend` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`

## Methods

### disable

``` js
draggie.disable()
```

### enable

``` js
draggie.enable()
```

## License

Draggabilly is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
