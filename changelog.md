# Changelog

#### v1.2.1

+ Fixed bug not removing `is-pointer-down` class
+ Fixed bug to ignore `dragMove` or `dragEnd` when disabled

### v1.2.0

+ Integrated [Unidragger](https://github.com/metafizzy/unidragger)
  - Changed `dragStart` to trigger when dragging starts, rather than on pointer down. Fixed [#13](https://github.com/desandro/draggabilly/issues/13).
  - Add `staticClick` event. Fixed [#19](https://github.com/desandro/draggabilly/issues/13).
+ Added jQuery plugin support. Fixed [#73](https://github.com/desandro/draggabilly/issues/73).
+ Removed `draggieInstance` first argument from event callbacks
+ Added `is-pointer-down` class
+ Added tests

#### v1.1.2

Add `destroy` method. Fixes [#72](https://github.com/desandro/draggabilly/issues/72)

#### v1.1.1

+ Add packaged files in `dist/`. Fixes [#55](https://github.com/desandro/draggabilly/issues/55)
+ Add CommonJS support for npm and Browserify

### v1.1.0

Add support for IE10, IE11, Microsoft Surface

#### v1.0.9

Add `axis` option. Fixes [#31](https://github.com/desandro/draggabilly/issues/31)

#### v1.0.8

Add `grid` option. Fixes [#20](https://github.com/desandro/draggabilly/issues/20)

#### v1.0.7

Dismiss right-button clicks. Fixes [#29](https://github.com/desandro/draggabilly/issues/29)

#### v1.0.6

Fix IE8 bug with double-bound events. Fixes [#38](https://github.com/desandro/draggabilly/issues/38)

#### v1.0.5

Fix AMD dependencies

#### v1.0.4

Bind `touchcancel` event. Fixes [#18](https://github.com/desandro/draggabilly/issues/18)

#### v1.0.3

Fix IE8 bug, dragging images. Fixes [#22](https://github.com/desandro/draggabilly/issues/22)

#### v1.0.2

Add AMD support. Fixes [#6](https://github.com/desandro/draggabilly/issues/6)

#### v1.0.1

Refactor isElement

## v1.0.0

Initial public release
