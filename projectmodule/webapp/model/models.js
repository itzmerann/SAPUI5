sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    /**
     * provide app-view type models (as in the first "V" in MVVC)
     * 
     * @param {typeof sap.ui.model.json.JSONModel} JSONModel
     * @param {typeof sap.ui.Device} Device
     * 
     * @returns {Function} createDeviceModel() for providing runtime info for the device the UI5 app is running on
     */
    function (JSONModel, Device) {
        "use strict";

        return {
            
        createDeviceModel: function () {
                var oModel = new JSONModel(Device);
                oModel.setDefaultBindingMode("OneWay"); //only Model->View will work ...View changes wont reflect in Model 
                return oModel;
        },

        createJSONModel : function(path) {
            var json = new JSONModel();
            
            // json.setData({
            //     "empData":[
            //         {
            //             "id":"1001",
            //             "name":"ran",
            //             "salary":"200 USD",
            //             "percent":87
            //         },
            //         {
            //             "id":"1001",
            //             "name":"ran",
            //             "salary":"200 USD",
            //             "percent":87

            //         },
            //         {
            //             "id":"1001",
            //             "name":"ran",
            //             "salary":"200 USD",
            //             "percent":87

            //         }
            //     ]
            // })

            json.loadData(path)

            return json;
        }




    };
});