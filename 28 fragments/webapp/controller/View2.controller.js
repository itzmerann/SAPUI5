sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast',
    "sap/ui/core/Fragment"
], function(BaseController, MessageBox, MessageToast, Fragment) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();
            //We need a method which is triggered EVERYTIME route changes
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            var sPath = "/fruits/" + oEvent.getParameter("arguments").fruitId;
            MessageToast.show("Herculis is called Path is : " + sPath);
            this.getView().bindElement(sPath);
        },
        onBack: function(){
            this.getView().getParent().to("idView1");
        },
        oSupplierPopup: null,
        oCityPopup: null,
        onFilter: function(){
            //MessageToast.show("This functionality is under construction....")
            if(!this.oSupplierPopup){
                Fragment.load({
                    name: "emc.fin.ar.fragments.popup"
                })
                //then is a promise, because UI5 Fragment module will be loading our 
                //fragment asynchronously
                .then(this.onCallBack.bind(this));
            }else{
                this.oSupplierPopup.open();
            }
        },
        onCallBack: function(oFragment){
            debugger;
            //setting the global variable to avoid creation of object again and again
            this.oSupplierPopup = oFragment;
            //Allow access to Immune system - Explicily allow resources (model) access to these fragments
            this.getView().addDependent(this.oSupplierPopup);
            //doing agg. binding to load all the data
            this.oSupplierPopup.bindAggregation("items",{
                path: '/suppliers',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://supplier',
                    title: '{name}',
                    description: '{city}'
                })
            });
            //this.oSupplierPopup is our remote control to fragment
            this.oSupplierPopup.setTitle("Suppliers");
            //open the popup
            this.oSupplierPopup.open();
        },
        inpField: null,
        onF4Help: function(oEvent){
            //MessageToast.show("This functionality is under construction....")
            this.inpField = oEvent.getSource();
            if(!this.oCityPopup){
                Fragment.load({
                    name: "emc.fin.ar.fragments.popup"
                })
                //then is a promise, because UI5 Fragment module will be loading our 
                //fragment asynchronously
                .then(this.onCallBackCity.bind(this));
            }else{
                this.oCityPopup.open();
            }
        },
        onConfirm: function(oEvent){
            //differentiate between whether this event triggered for city or supplier
            var oSelectedItem = oEvent.getParameter("selectedItem");
            var sCityName = oSelectedItem.getTitle();
            this.inpField.setValue(sCityName);
        },
        onCallBackCity: function(oFragment){
            debugger;
            //setting the global variable to avoid creation of object again and again
            this.oCityPopup = oFragment;
            //Allow access to Immune system - Explicily allow resources (model) access to these fragments
            this.getView().addDependent(this.oCityPopup);
            //doing agg. binding to load all the data
            this.oCityPopup.bindAggregation("items",{
                path: '/cities',
                template: new sap.m.StandardListItem({
                    icon: 'sap-icon://home',
                    title: '{name}',
                    description: '{otherName}'
                })
            });
            //this.oCityPopup is our remote control to fragment
            this.oCityPopup.setTitle("Cities");
            this.oCityPopup.setMultiSelect(false);
            //open the popup
            this.oCityPopup.open();
        },
        onSave: function(){
            MessageBox.confirm("Are you sure?", {
                title: "Confirm Me!",
                onClose: function(status){
                    if(status === "OK"){
                        MessageToast.show("Dude, I saved your order now!!");
                    }else{
                        MessageBox.error("OMG!! You cancelled it");
                    }
                }
            });
        },
        
        onItemPress: function(oEvent){

            var sPath = oEvent.getParameter("listItem").getBindingContextPath();
            var sIndex = sPath.split("/")[sPath.split("/").length - 1];
            this.oRouter.navTo("supplier",{
                suppId: sIndex
            });

            MessageToast.show("TODO: Next view navigation to be implemented here");
        }
    });
});