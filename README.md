# jQuery-Select-Step
Transform select element into an input step.

## Instalation

Include `jquery-select-step.css` from folder `dist`.
```html
<link rel="stylesheet" href="./dist/jquery-select-step.css">
```

Include `jquery-select-step.js` from folder `dist`.
```html
<script src="./dist/jquery-select-step.js"></script>
```

Call the plugin on your script.
```javascript
jQuery(".select-element").selectStep({
  incrementLabel: "+",
  decrementLabel: "-",
  onChange: function(value) {
    console.log(value, "value");
  }
});
```
