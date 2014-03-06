//
// JQuery plugin to make plus/minus button that work as a spinner for an input box values
// Uses HTML "data-*" parameters for custom increase ranges (including negatives) when clicking and holding
// e.g.
//  $('input.spinner').ecspinner({
//      minVal: 0,
//      maxVal: 9999,
//      interval: 100,
//      timeout: 250
//      trigger: function() { 
//         // do sth
//      }
//  });
// <div data-role="ecspinner-wrapper">
//   <!-- MINUS BUTTON -->
//   <a class="icon-minus-sign" data-ecspinner="button" data-ecspinner-click-increaseby="-1" data-ecspinner-hold-increaseby="-5" ><a>
//      <!-- INPUT BOX -->
//      <input type="text" value="" data-ecspinner="value"  />
//   <!-- PLUS BUTTON -->
//   <a data-ecspinner="button" data-ecspinner-click-increaseby="+1" data-ecspinner-hold-increaseby="+5" ><a>
// </td>


$.fn.ecspinner = function(options) {
    // add default options when missing
    options = $.extend(true, {
        minVal: 0,
        maxVal: 9999,
        trigger: function(){},
        interval: 100,
        timeout: 250
    }, options);
    
    this.on('change keydown keyup click', '[data-role="capped-fee-text"]', function(e) {
        options.trigger();
    })
    .on('change keyup', '[data-role="ecspinner-wrapper"] [data-ecspinner="value"]', function(e) {
        options.trigger();
    })
    .on('click mousedown mouseup mouseleave', '[data-role="ecspinner-wrapper"] [data-ecspinner="button"]', function(e) {
        e.preventDefault();
        var el = $(e.target);
        var rateEl = el.closest('[data-role="ecspinner-wrapper"]').find('[data-ecspinner="value"]');

        var increaseValueAndTrigger = function(increaseBy) {
            var newVal = parseInt(rateEl.val()) + increaseBy;
            if (newVal < options.minVal) {
                newVal = options.minVal;
            }
            if (newVal > options.maxVal) {
                newVal = options.maxVal;
            }
            rateEl.val(  newVal );
            options.trigger();
        };

        var increaseByClick = parseFloat(el.attr('data-ecspinner-click-increaseby'));
        var increaseByMouseDown = parseFloat(el.attr('data-ecspinner-hold-increaseby'));
        var fastIncreaseTimeoutStart = null;
        var fastIncreaseTimeoutContinued = null;
                
        switch (e.type) {
            case 'mousedown':
                el.data('enableSpinner', 1);
                el.data('elapsedTime', 0);
                // start delayed repetition cycle
                fastIncreaseTimeoutStart = setTimeout(function(){
                    el.data('elapsedTime', options.timeout);
                    // repeated cycle
                    fastIncreaseTimeoutContinued = setInterval(function() {
                        el.data('elapsedTime', el.data('elapsedTime') + options.interval);
                        increaseValueAndTrigger(increaseByMouseDown);
                     }, options.interval);
                     el.data('fastIncreaseTimeoutContinued', fastIncreaseTimeoutContinued);
                }, options.timeout);
                el.data('fastIncreaseTimeoutStart', fastIncreaseTimeoutStart);
                break;

            case 'mouseup':
            case 'mouseleave':
                // clear all the timeouts
                clearInterval(el.data('fastIncreaseTimeoutStart'));
                clearInterval(el.data('fastIncreaseTimeoutContinued'));
                // increase by click if the mouse has not held for more than the `options.timeout`
                if (el.data('enableSpinner')==1 && el.data('elapsedTime') == 0) {
                    increaseValueAndTrigger(increaseByClick);
                }
                el.data('enableSpinner', 0); //avoid increase on just mouseleave
                break;
        }
    });
};
