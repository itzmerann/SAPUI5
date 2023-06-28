sap.ui.define([
    "projectmodule/controller/BaseController",
    "sap/m/MessageBox",
    "projectmodule/model/models"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, MessageBox, modelutil) {
        "use strict";

        return Controller.extend("projectmodule.controller.View", {
            //Hook Methods
            onInit: function () {
                console.log("init method")
                this.ObjView = this.getView();
                Controller.prototype.onInit.apply(this);

                //The models will be set to controller with key if specified.
                this.getView().setModel(modelutil.createJSONModel("model/mockData/EmpMock1.json"))
                this.getView().setModel(modelutil.createJSONModel("model/mockData/EmpMock2.json"),"mock2")

                //Diff ways to bind
                this.getView().byId("mytextid2").bindValue("/empData/0/name")
                this.getView().byId("mytextid3").bindProperty("value","/empData/0/salary")

            },
            addresss:"",
            
            onBeforeRendering: function(){
               console.log("befor render")
               //this.ObjView.byId("mytextid2").setValue("Override Value")

            },
            onAfterRendering: function(){
               console.log("after render")
              //  $("container-projectmodule---View--myForm--Form").hide().fadeIn(5000)
              //  debugger;
               // $("myViewId--myForm")
                

            },
            onExit: function(){
                console.log("on exit method")
            },


            OnPress: function(){
                
                //sap.ui.getCore() -- for JS View to get Id
                //this.getView() - for xml view to get id
                var idd = sap.ui.getCore().getElementById(this.getView().byId("mytextid").getId()).getValue();
                //jQuery("#mytextid")
                //debugger;
                //this.byId("mytextid").setValue("AutoFill");
                //alert(this.byId("mytextid").getValue());


                MessageBox.confirm("The Text Entered " +this.byId("mytextid").getValue());

                var oText = this.ObjView.byId("mytextid2");
                var oText1 = this.ObjView.byId("mytextid3");
                var controller = this

                //callback func needs to be passed to custom func and we need define in custom func when we should c
                //call callback func...only to standard func like setTimeout they are already defined callback in that func arg
                var funcValue = this.getExtraText(oText.getValue(),function(){
                    setTimeout(()=>{
                        console.log("call back after 5s")
                        console.log(this) //undefined in ananon func
                       // debugger;
                        oText1.setValue("callbackvalueafter5")
                        
                    },5000)
                    //call func in base...
                    //During anon func call this key wont work
                    controller.dummyConsole(oText.getValue() + " fun value" +funcValue)
                });
                oText.setValue(funcValue);
            },

            disableDetails : function () {              
                this.getView().getModel().setProperty("/disabletag", !this.getView().getModel().getProperty("/disabletag"));
            },

            flipDetails: function(){
                var defaul = this.getView().getModel();
                var customModel = this.getView().getModel("mock2");

                this.getView().setModel(customModel);
                this.getView().setModel(defaul,"mock2")

            },

            rowSelectionChangeEvent: function(event){
                console.log(event.getParameters().rowContext.getProperty()) //fetch the selected row
                console.log(event.getParameters().rowContext.getPath()) //fetch the selected row    
                
                //Element Binding...looks for arg path in model and bind with gn element 
                this.getView().byId("elemyForm").bindElement(event.getParameters().rowContext.getPath())
                
            },
            comboChange: function(event){
                //this.getView().byId("oo").getSelectedKey()

                console.log(event.getParameters().selectedItem.getKey())

            }

        });
    });
