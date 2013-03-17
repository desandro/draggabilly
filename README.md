# Draggabilly

<p class="tagline">Make that shiz draggable</p>

[draggabilly.desandro.com](http://draggabilly.desandro.com)

## Install

Grab a packaged source file:

+ [http://draggabilly.desandro.com/draggabilly.pkgd.min.js](draggabilly.pkgd.min.js) for production
+ [http://draggabilly.desandro.com/draggabilly.pkgd.js](draggabilly.pkgd.js) for development

Or if you're cool with the command line, install with [Bower](http://twitter.github.com/bower).

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

## Events

Draggabilly is an Event Emitter. You can bind event listeners to events.

``` js
var draggie = new Packery( elem );

function onDragMove( event, pointer, instance ) {
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
.on( 'dragStart', function( event, pointer, draggieInstance ) { //...
```

+ `event` - **Type:** _Event_ - the original `mousedown` or `touchstart` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`
+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance

### dragMove

```js
.on( 'dragMove', function( event, pointer, draggieInstance ) { //...
```

+ `event` - **Type:** _Event_ - the original `mousemove` or `touchmove` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`
+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance

### dragEnd

```js
.on( 'dragEnd', function( event, pointer, draggieInstance ) { //...
```

+ `event` - **Type:** _Event_ - the original `mouseup` or `touchend` event
+ `pointer` - **Type:** _MouseEvent_ or _Touch_ - the event object that has `.pageX` and `.pageY`
+ `draggieInstance` - **Type:** _Draggabilly_ - the Draggabilly instance

## License

Draggabilly is released under the [MIT License](http://desandro.mit-license.org/). Have at it.
