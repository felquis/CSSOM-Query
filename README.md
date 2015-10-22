# CSSOM-Query

Dynamically find CSS Selector into style sheets and manipulate elements selector's styles without touching the DOM

## Examples
 * [Basic Demo](http://felquis.github.io/CSSOM-Query/example/)
 * Header Natural Scroll - [codepen](http://codepen.io/felquis/pen/GpybaX) - [full screen mode](http://s.codepen.io/felquis/debug/GpybaX)
   > The header is fixed positioned and it only show and hide cause if
     change it's top property in the scroll events

clone this repository and run the commands bellow to launch the examples
```shell
npm install -d

npm start
```

## Explanation

Image you only have this  your style sheet contains
/example/demo.css
```css
h1 {
  color: red;
}

.box {
  height: 100px
}
```

And this is the only one style sheet linked into your HTML
checkout `/example.index.html#L07`

Once elements is renderized with this styles, you can manipulate then by doing
```js
document.styleSheets[0].cssRules[1].style.height = '200px'
```

What this functions helps me, is to find out the styleSheets[0] index and cssRules[1].

So I can focus only on the rule I want to manipulate

# Basic Usage

```js

// It does not select elements into the DOM
var box = new CSSOMQuery('.box')
```

## Change a property's value
```js
box.set('height', '200px')
```

## Get a property value
```js
box.style.height // returns 200px
```

## transition end event

It will use vendor prefixes automatically

```js
box.on('transitionend', showMessage)

function showMessage(e) {
  console.log('transition end: ', e.propertyName)
}
```

To know more, search for CSS Object Model

## Browser Support
Basic Demo was tested on:
- iPod/Ipad Touch Safari iOS 9.0.2
- Moto X 2013 Chrome 43
- Firefox 41.0.1 OSX
- Safari Version 9.0 (10601.1.56.2) OSX
- Chrome Version 46.0.2490.71 (64-bit) OSX
- Internet Explorer 10 - Windows 8 Virtual Box
