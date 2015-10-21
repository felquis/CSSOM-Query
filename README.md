## CSSOM-Query

Dynamically find CSS Selector into style sheets and manipulate elements selector's styles without touching the DOM

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

To know more, search for CSS Object Model
