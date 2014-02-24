EC Spinner
==========

Javascript JQuery plugin to implement a spinner (input box + plus/minus icons).

Quick spin (on click) + fast spin (when holding the mouse down) with separate increase-by values.

Events attached using `Jquery.on`, therefore persisting regardless of internal DOM manipulations.

alpha version

![example](https://raw.github.com/elvisciotti/ecspinner/master/screenshot.png)    

Example
-------

 Script

    $('input.spinner').ecspinner({
        minVal: 0,
        maxVal: 9999,
        trigger: function() { 
           // do sth
        }
    });


HTML    
    
    <div data-role="ecspinner-wrapper">
       <!-- MINUS BUTTON, add class with icon -->
       <a data-ecspinner="button" data-ecspinner-click-increaseby="-1" data-ecspinner-hold-increaseby="-5" ><a>
          <!-- INPUT BOX -->
          <input type="text" value="" data-ecspinner="value"  />
       <!-- PLUS BUTTON, add class with icon -->
       <a data-ecspinner="button" data-ecspinner-click-increaseby="+1" data-ecspinner-hold-increaseby="+5" ><a>
    </td>
    


