sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    "emc/fin/ar/util/formatter",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"
], function(BaseController, Formatter, Filter, FilterOperator) {
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
        },
        onDelete: function(oEvent){
            //All event will have getParameter() athrough which we can pass the paramter name and gets its value and getParameter() which will return an object 
            //which will have values...Each event can have diff set of params,refer sdk for it
            var oItemToBeDeleted = oEvent.getParameter("listItem");
            //list object
            //var oList = this.getView().byId("idList");
            //Sometimes getSource will return parent element which we can use rather than accessing using line 24
            var oList = oEvent.getSource();

            //List has remove item in it
            oList.removeItem(oItemToBeDeleted);
        },
        onSearch: function(oEvent){
            //step 1: create a query parameter
            var whatWasSearched = oEvent.getParameter("query");

            //For live change the input value is present in newValue
            if(!whatWasSearched){
                whatWasSearched = oEvent.getParameter("newValue");
            }
            //step 2: use the query data to build a filter (condition)
            var oFilter = new Filter("name", FilterOperator.Contains, whatWasSearched);
            var oFilter2 = new Filter("type", FilterOperator.Contains, whatWasSearched);
            //By default for 2 filters its and to make it false
            var aFilter = [oFilter, oFilter2];
            var oNewFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("idList");
            //step 4: get the list Binding and inject our filter into the same

            //As filter is part of binding like formatter,sort we can use getBinding("prop") of ManagedObject to get the binding of the gn prop
            oList.getBinding("items").filter(oNewFilter);
        }
    });
});