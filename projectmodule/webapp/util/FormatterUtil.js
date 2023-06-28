sap.ui.define([
    "sap/ui/core/format/NumberFormat"
], function(NumberFormat) {
    'use strict';
    return {
        formatCurreny: function(amount){
            var oCurrencyFormat = NumberFormat.getCurrencyInstance();
            var amount1 = (amount != null)? amount.split(' ')[0]: amount
            return oCurrencyFormat.format(amount1, "USD"); // output: EUR 12,345.68
        },
        concatValues: function(val1,val2){
            return val1+val2;
        }
    }
    
});