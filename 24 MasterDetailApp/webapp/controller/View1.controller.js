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
            var oItemToBeDeleted = oEvent.getParameter("listItem");
            //list object
            //var oList = this.getView().byId("idList");
            var oList = oEvent.getSource();
            oList.removeItem(oItemToBeDeleted);
        },
        getAllListItems: function(params) {
            var oList = this.getView().byId("idList");
            //As select mode is there we can getSelectedItem from list element directly
            var allItems = oList.getSelectedItems();
            return allItems;
        },
        onDeleteData:function(){
            var oList = this.getView().byId("idList");
            var allItems = this.getAllListItems();
            for (let index = 0; index < allItems.length; index++) {
                const element = allItems[index];
                oList.removeItem(element);
            }
        },
        onSelectionChange: function(oEvent) {
            //Whenever an item is selected, The selected Item object will be retreated from
            //the event object
            debugger;
            var selectedItem = oEvent.getParameter("listItem");
            //We will get the address of the element of selected item
            var sPath = selectedItem.getBindingContextPath(); //gives binding path of the item.
            //Go to mumma and get the second child (which is view 2) object from App Container
            var oView2 = this.getView().getParent().getParent().getDetailPages()[0]; //0 becoz there is only one detail page
            //As view is also an element it has binding..
            oView2.bindElement(sPath);
            this.onNext();
        },
        onNavToNext: function(){
            var allSelectedObjects = this.getAllListItems();
            var allItems = [];
            for (let index = 0; index < allSelectedObjects.length; index++) {
                const element = allSelectedObjects[index];
                var item = element.getModel().getProperty(element.getBindingContextPath());
                allItems.push(item);
            }
            this.getView().getModel().setProperty("/selectedFruits", allItems);
            this.onNext();
        },
        onSearch: function(oEvent){
            //step 1: create a query parameter
            var whatWasSearched = oEvent.getParameter("query");
            if(!whatWasSearched){
                whatWasSearched = oEvent.getParameter("newValue");
            }
            //step 2: use the query data to build a filter (condition)
            var oFilter = new Filter("name", FilterOperator.Contains, whatWasSearched);
            var oFilter2 = new Filter("type", FilterOperator.Contains, whatWasSearched);
            //step 3: get the list object
            var aFilter = [oFilter, oFilter2];
            var oNewFilter = new Filter({
                filters: aFilter,
                and: false
            });
            var oList = this.getView().byId("idList");
            //step 4: get the list Binding and inject our filter into the same
            oList.getBinding("items").filter(oNewFilter);
        }
    });
});