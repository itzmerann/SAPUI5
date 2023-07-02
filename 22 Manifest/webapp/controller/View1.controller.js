sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    "emc/fin/ar/util/formatter"
], function(BaseController, Formatter) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View1",{
        formatter: Formatter,
        onNext: function() {
            //Step 1: I need to go to Mom
            var oAppCon = this.getView().getParent();
            //Step 2: Ask mom to go to View 2
            oAppCon.to("idView2");
        },
        onOrder: function(){
            alert("order has been confirmed");
        }
    });
});