simple-observer
==================

[![Build Status](https://travis-ci.org/html5crew/simple-observer.svg?branch=master)](https://travis-ci.org/html5crew/simple-observer)

Simple Javascript Observer Pattern

__dependencies:__ https://github.com/html5crew/simple-inheritance

## usage

##### To implement observer pattern:
```javascript
var View = Observer.extend({
    init: function () {
    },
    render: function () {
        ...
        parentElement.appendChild(element);
        this.emit('didInsertElement', element);
    }
});

var view = new View();

view.on('didInsertElement', function (el) {
    el.classList.add('highlight');
});
```

##### As an event queue:

```javascript
// as a event queue
var queue = new Observer();

...

queue.on('custom-event', function (eventObject) {
    
});

...

queue.emit('custom-event', { foo: "bar" });
```


## API

- `on()` / `addListener()`
- `off()` / `removeListener()`
- `emit()`
- `once()`
