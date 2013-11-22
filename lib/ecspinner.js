//
// JQuery plugin to make plus/minus button that work as a spinner for an input box values
// Uses HTML "data-*" parameters for custom increase ranges (including negatives) when clicking and holding
// e.g.
//  $('input.spinner').ecspinner({
//      minVal: 0,
//      maxVal: 9999,
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
    // read options
    if (options.minVal === undefined) {
        throw "ecspinner: minVal not defined";
    }
    if (options.maxVal === undefined) {
        throw "ecspinner: maxVal not defined";
    }
    if (options.trigger === undefined) {
        throw "ecspinner: trigger not defined";
    }
    
    this.on('change keydown keyup click', '[data-role="capped-fee-text"]', function(e) {
        options.trigger();
    })
    .on('change keyup', '[data-role="ecspinner-wrapper"] [data-ecspinner="value"]', function(e) {
        options.trigger();
    })
    .on('click mousedown mouseup mouseleave', '[data-role="ecspinner-wrapper"] [data-ecspinner="button"]', function(e) {
        var el = $(e.target);
        var rateEl = el.closest('[data-role="ecspinner-wrapper"]').find('[data-ecspinner="value"]');

        var increaseValue = function(increaseBy) {
            var newVal = parseInt(rateEl.val()) + increaseBy;
            if (newVal < options.minVal) {
                newVal = options.minVal;
            }
            if (newVal > options.maxVal) {
                newVal = options.maxVal;
            }
            rateEl.val(  newVal );
        };

        switch (e.type) {
            case 'click':
                var increaseBy = parseFloat(el.attr('data-ecspinner-click-increaseby'));
                increaseValue(increaseBy);
                options.trigger();
                break;

            case 'mousedown':
                clearTimeout(el.data('timeout'));
                var increaseBy = parseFloat(el.attr('data-ecspinner-hold-increaseby'));
                timeout = setInterval(function() {
                    increaseValue(increaseBy);
                 }, 100);
                 el.data('timeout', timeout);
                break;

            case 'mouseup':
            case 'mouseleave':
                clearTimeout(el.data('timeout'));
                break;
        }
    });
};
