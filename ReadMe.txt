20.FirstFioriApp
Component.js intro
Nav back and forth btw views using js code
Using Component Container and creating views in Component and placing it to app container.

21.List Control
Diff types of List


22.manifest
Basic structure of manifest
Best example of formatter
1)Dependencies to run app 
2)External Css 
3)Models 

23.List Modes
SingleSelect,SingleSelectMaster,MultiSelect
Delete item from List
Live search on List
Filter and Filter Options
getBinding
All event will have getParameter() athrough which we can pass the paramter name and gets its value and getParameter() which will return an object 
which will have values...Each event can have diff set of params,refer sdk for it
oList.getBinding("items").filter(oNewFilter);
Olist.removeItem(obj)

24.MasterDetail:
App-Fruits on left screen and onclick fruit details on right screen by passing the item path and binding it to view element of view2.
Toolbar to list..delete using selectMode and getSelectedItems
ObjectHeader
getBindingContextPath

25.Table
App-We created 3 icon tabs on the detail page 
IconTabBar and IconTabFilter
Mobile Table and ColumnListItem
Select, ComboBox,MultiComboBox
MessageBox

26.Router
manifest --routing  3 tags--config,routes,targets

27.routing
App- Left master page with fruit data view1 and on click of fruit will display view2 with icon Toolbar and 
More routes and target config with path var
FragmentDefintion files and Fragment
attachMatched to a Router
Back Nav Button imple for routing

28.Fragments
Create and Display Fragment on run time 
SelectDialog to display as popup. Using with Fragment to load data dynamically on click of supplier data and city input
function().bind(this)- To attach this to point to controller in promise/callback
Create Aggregation during run time.
For dialog box to access view model - (this.getView().addDependent(this.oSupplierPopup);
 

29.Fiori Arch
App-selecting city from popup and setting to city input..selecting supplier names from popup and filtering the table based on selected suppliernames.
Fragment- pass controller obj and id for the fragment to access controller methods and to avoid duplicate id.
On select of something from fragment how to manipulate the orginal view data.
Central Hub and Embedded Arch--Gateway Fnd--Both are onprem where we develop Fiori app
To build Fiori app using cloud BTP we will use cloud connector to establish network connection to either Central Hub/Embedded system 

approuter-https://blogs.sap.com/2020/04/03/sap-application-router/
series -https://blogs.sap.com/2019/02/19/sap-cloud-platform-backend-service-overview-of-blogs/


37. OnPremConAndODataCall
We will define odata model using datasource in manifest and define relative path of odata
We will define approuter which is entry point of our app and html repo runtime Dependencies to run our app in server
We will define routing in xs-app.json to route all odata path to destination and other paths to html repo
npm init- to generate package.json
npm install - to install node_module Dependencies defined in package.json
Get productset call
growing and growingThreshold to control pagination
Filter gets converted to odata call


38.crudFiori
app- we created add view and on click of button in view1 we show this and on submit we call odataModel.create
we are showing popup with all supplier data like help drodown on click of supplier id in add view.
showValueHelp and valueHelpRequest to show popup like to show all city
we can see all calls in network batch

Create-odatamodel.create("odata entityset endpoint",payload,callback funcs)
eg.oDataModel.create("/ProductSet", payload, {})
Get:
 oDataModel.read("/ProductSet('" + this.productId + "')",{})
Delete:
oDataModel.remove("/ProductSet('" + this.productId + "')",{})
Function call - also how to pass request paramters
oDataModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters: {
                    "I_CATEGORY": 'Notebooks'
                }) 

Expand: As we need to tell fiori to load associated entityset we need to specify expand parameter.
The associated entityset prop can be assessed via To_Supplier/name
    this.getView().bindElement({
                path: /ProductSet(''),
                parameters : { expand : 'To_Supplier,To_Orders' }
            });
http://stcfin.st.com:8021/sap/opu/odata/IWBEP/GWSAMPLE_BASIC/ProductSet('HT-1000')?$format=json&$expand=ToSupplier

Filter: when we add filter options to odata binding it will call the endpoint with filetr auto


40.
We create a catalog in which we can add a tile(will have info about our app like Id, s4 Hana deployment generated url).
Then add tile to a group. Group will display as tab in launchpad. 
Create role for the group and category. 
People with that role will access the app 
