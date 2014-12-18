# Draggabilly

<p class="tagline">Make that shiz draggable</p>

[draggabilly.desandro.com](http://draggabilly.desandro.com)

Rad because it supports IE8+ and multi-touch.


## About this Fork

This fork changes only one thing: how `dragStart` fires. In draggabilly main, [`dragStart` fires on mouse down, right away, and the actual mouse down event is canceled](https://github.com/desandro/draggabilly/issues/13).

Whenever you want an item to do one thing when you click it (say, select it), and a different thing when you drag it (say, move it), the existing event system will cause some issues.
The mousedown event is needed to fire checkboxes, select boxes, dismiss modals, select list items, and many other things you might do in an application.

I think `dragStart` should only fire when you begin to drag the element, not right when you click it, and that is what this fork does.

This new feature is only active if you set the `dragOnMove` option, so this is not a breaking change.

    var draggie = new Draggabilly( el, { dragOnMove: true } );


## Install

Grab a packaged source file:

+ [draggabilly.pkgd.min.js](http://draggabilly.desandro.com/draggabilly.pkgd.min.js) for production
+ [draggabilly.pkgd.js](http://draggabilly.desandro.com/draggabilly.pkgd.js) for development

Install with [Bower](http://bower.io): `bower install draggabilly`

Install with npm: `npm install draggabilly`

## Usage

``` js
var elem = document.querySelector('#draggable');
var draggie = new Draggabilly( elem, {
  // options...
});
```

When dragging, Draggabillly will add the class `.is-dragging` to the element.

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
containment: '#container'
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

**Type:** Selector _String_

``` js
handle: '.handle'
```

Specifies on what element the drag interaction starts.

`handle` is useful for when you do not want all inner elements to be used for dragging, like inputs and forms. See [back handle example on CodePen](http://codepen.io/desandro/pen/znAuH).

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
draggie.once( 'dragMove', function() {
  console.log('Draggabilly did move, just once');
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

### destroy

``` js
draggie.destroy()
```

### disable

``` js
draggie.disable()
```

### enable

``` js
draggie.enable()
```

## RequireJS

Draggabilly works with [RequireJS](http://requirejs.org).

You can require [draggabilly.pkgd.js](http://draggabilly.desandro.io/draggabilly.pkgd.js).

``` js
requirejs( [
  'path/to/draggabilly.pkgd.js',
], function( Draggabilly ) {
  new Draggabilly( ... );
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
  new Draggabilly( ... );
});
```

## License

Draggabilly is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
