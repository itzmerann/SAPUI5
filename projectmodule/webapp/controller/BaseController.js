sap.ui.define([
    "sap/ui/core/mvc/Controller"
], function(controller) {
    'use strict';
    return controller.extend("projectmodule.controller.BaseController", {
        onInit: function () {
            console.log("base init method")
           // debugger;

        },


         getExtraText: function (Text,callback) {
            callback
            //Promise.resolve().then(callback);//to call callback after return
            return Text +" mybaseControllLabel";
         
        },

        dummyConsole:function(text){
            console.log(text)

        }
    });
    
});