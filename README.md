# jQuery-Select-Step
Transform select element into an input step.

## Instalation
```javascript
jQuery(".select-element").selectStep({
  incrementLabel: "+",
  decrementLabel: "-",
  onChange: function(value) {
    console.log(value, "value");
  }
});
```
