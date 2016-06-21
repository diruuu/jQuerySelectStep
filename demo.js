jQuery(document).ready(function(){
  // Init syntax highleighter
  SyntaxHighlighter.all();

  jQuery(".select-step").each(function(){
    jQuery(this).selectStep({
      incrementLabel: "+",
      decrementLabel: "-",
      onChange: function(value) {
        console.log(value, "value");
      }
    });
  });
});
