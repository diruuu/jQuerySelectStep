declare const jQuery: any;

(function($) {
    $.fn.selectStep = function(vars) {
        /*
         * Function to get all plugin's variables
         * and element options on array
         */
        function getData(element, callback) {
            // Define default variables
            const defaultVars = {
                onChange: null,
                incrementLabel: "+",
                decrementLabel: "-"
            }
            const {assign}: any = Object;
            // Get all plugin variables
            vars = assign({}, defaultVars, vars);
            let options = [];
            // Get select options
            const optElement = $(element).find("option");
            optElement.each(function(i, o) {
                const name = $(this).text();
                const value = $(this).attr("value");
                const selected = $(this).is(':selected');
                options = [...options, { name, value, selected }];

                if (i === optElement.length - 1) {
                    // Fire callback with select options and variables
                    callback(vars, options);
                }
            });
        }

        /*
         * Function to create fake element
         * to mock the select elements
         */
        function addFakeElements(element, callback) {
            getData(element, function(vars, options) {
                // Check if options is empty
                if (!options.length) {
                    return;
                }

                // Add class to select element
                jQuery(element).addClass("select-step");

                // Add fake elements
                const {incrementLabel, decrementLabel} = vars;

                // Find selected option on the select element
                let isSelected = [];
                options.map((opt, key) => {
                    if (opt.selected) {
                        isSelected = [...isSelected, { key, name: opt.name, value: opt.value }];
                    }
                    return false;
                });

                const selectedOptionName = isSelected.length ? isSelected[0].name : null;
                const selectedOptionKey = isSelected.length ? isSelected[0].key : null;
                const selectedOptionvalue = isSelected.length ? isSelected[0].value : null;

                // Create the fake element
                const fakeElement = `<div class="jquery-select-step-element">
                  <div class="decrementStep">${decrementLabel}</div>
                  <div class="selectStepValue" data-key="${selectedOptionKey}" data-value="${selectedOptionvalue}">
                    ${selectedOptionName}
                  </div>
                  <div class="incrementStep">${incrementLabel}</div>
                </div>`;

                // Wrap select to a div
                const parentElement = $(element)
                    .wrap(`<div class="jquery-select-step"></div>`)
                    .parent();

                // Append the fake element
                parentElement.append(fakeElement);

                // Fire callback when finished
                callback(vars, options, parentElement);
            });
        }

        /*
         * Function to check if variable is function
         */
        function isFunction(functionToCheck) {
            var getType = {};
            return functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
        }

        /*
         * Function to handle the increment and decrement of the plugins
         * it fire onChange event and change the select value
         */
        function handleChange(element, vars, options, type) {
            const selectStepValue = $(element).find(".selectStepValue"); // Get the element that show the value
            const key = parseInt($(selectStepValue).attr("data-key")); // Get current active key
            const {onChange} = vars; // Get user onChange event

            // Check if the key is not less than 0 or bigger than select options length
            if (type === "decrement" && key <= 0 || type === "increment" && key >= options.length - 1) {
                return;
            }

            // Get the new key
            const newKey = (type === "decrement" ? (key - 1) : (key + 1));
            const {name, value} = options[newKey]; // Get name and value of the new key

            // Change value
            selectStepValue.text(name);
            selectStepValue.attr("data-key", newKey);
            selectStepValue.attr("data-value", value);

            // Change select element selected options
            jQuery(element).find(`.select-step option`).removeAttr('selected');
            jQuery(element).find(`.select-step option:eq(${newKey})`).attr('selected', true);

            // Fire onChange event
            if (onChange !== null && isFunction(onChange)) {
                onChange({
                    key: newKey,
                    name,
                    value
                });
            }
        }

        /*
         * Function to initialize the plugins
         */
        function init(element) {
            addFakeElements(element, function(vars, options, parentElm) {
                // Listen to change event
                $(parentElm).on("click", ".decrementStep", function() {
                    handleChange(parentElm, vars, options, "decrement");
                });

                $(parentElm).on("click", ".incrementStep", function() {
                    handleChange(parentElm, vars, options, "increment");
                });
            });
        }
        init(this);
        return this;
    };
} (jQuery));
