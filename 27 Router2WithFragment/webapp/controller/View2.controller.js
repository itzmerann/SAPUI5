sap.ui.define([
    'emc/fin/ar/controller/BaseController',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController, MessageBox, MessageToast) {
    'use strict';
    return BaseController.extend("emc.fin.ar.controller.View2",{
        onInit: function(){
            this.oRouter = this.getOwnerComponent().getRouter();

            //To achieve binding of path to View2 to fetch the elements
            //We need a method which is triggered EVERYTIME route changes so that we can get the index from path var and get the model and bind it to this view
            //Whenever the detail route changes the attachMatched method will be called with the event
            this.oRouter.getRoute("detail").attachMatched(this.herculis, this);
        },
        herculis: function(oEvent){
            //fruitId is the path var in the url
            var sPath = "/fruits/" + oEvent.getParameter("arguments").fruitId;
            MessageToast.show("Herculis is called Path is : " + sPath);
            this.getView().bindElement(sPath);
        },
        onBack: function(){
            this.getView().getParent().to("idView1");
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