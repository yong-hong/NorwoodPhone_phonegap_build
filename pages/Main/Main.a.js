dojo.declare("Main", wm.Page, {
start: function() {
var applicationurl= window.location.href;
//console.log(applicationurl);
var results2 = new Array();
// Split url - bookmark starts with the # character
results2 = applicationurl.split('#');
// results[1] holds the parameter passed into the url
if( results2[0] != null ) {
app.appUrl=results2[0];
//console.log(app.appUrl);
}
app.appUrl="http://116.48.130.228:8400/";
},
"preferredDevice": "tablet",
productDojoGridLongClick: function(inSender, inItem) {
app.toastSuccess("已加入購物車！");
},
imgClick:function(inSender){
console.log(inSender.name);
var i=inSender.name.substr(5,inSender.name.length-5);
if(i==="")
i=0;
//console.log(i+":"+this.imgVar.getItem(i));
this.productIndex.setValue("dataValue",i);
//console.log(this.productIndex);
var e=this.imgVar.getItem(i).data;
this.picture1.setSource(e.image);
this.nameLabel.setCaption(e.name);
this.priceLabel.setCaption(e.stringPrice);
this.originalPriceLabel.setCaption(e.stringPrice2);
this.highlight1Label.setCaption(e.highlight1);
this.discEndLabel.setCaption(e.discEnd);
this.productDesc.setCaption(e.description);
this.stateLabel1.setCaption(e.state);
this.layers1.setLayer(this.Edit_Product);
//this.productLayers.setLayer(this.Edit_Product);
//app.alert("hello,"+e.name);
},
categoryImgClick:function(inSender){
this.gridLayers.setLayer(this.productGridLayer);
this.loadingDialog1.setShowing(true);
// console.log(inSender.name);
var i=inSender.name.substr(13,inSender.name.length-13);
if(i==="")
i=0;
//console.log(i+":"+this.imgVar.getItem(i));
var e=this.categoryVar.getItem(i).data;
//console.log(e.pgCode);
this.productService.input.setValue("category", e.pgCode);
this.productService.input.setValue("url", app.appUrl);
this.productService.update();
},
productServiceSuccess: function(inSender, inDeprecated) {
try {
this.imgVar.clearData();
this.galleryPanel.removeAllControls();
var n=Math.floor(window.innerWidth/210);
var imgId;var lableId;var panelRow;var buttonId;var dataVarId;
var numRows = inSender.getCount();
if (numRows > 0) {
for(var i=0; i<numRows; i++){
var thisRow = inSender.getItem(i);
this.imgVar.addItem(thisRow.data);
//imgId=i;
labelId="label"+i;
if(i%n===0){
panelRow=new wm.Panel({owner: this,
parent: this.galleryPanel,
name: "panel"+i,
verticalAlign: "top",
horizontalAlign: "left",
width: "100%",
height: "240px",
layoutKind: "left-to-right"});
//console.log(panelRow+":i="+i);
panelRow.createComponent("custom"+i,"wm.Panel",{height:"100%",width:"200px",layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:"1",margin:"5",backgroundColor:"#e5e2f5"},{},
{
imgId:["wm.Picture",{height:"200px",width:"200px",aspect:"h",source:thisRow.data.image},{onclick:"imgClick"},{}],
labelId:["wm.Label",{height:"15px",width:"200px",align:"center",caption:thisRow.data.name},{onclick:"labelClick"}]
});
}
else{
panelRow.createComponent("custom"+i,"wm.Panel",{height:"100%",width:"200px",layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:"1",margin:"5",backgroundColor:"#e5e2f5"},{},
{
imgId:["wm.Picture",{height:"200px",width:"200px",aspect:"h",source:thisRow.data.image},{onclick:"imgClick"},{}],
labelId:["wm.Label",{height:"15px",width:"200px",align:"center",caption:thisRow.data.name},{onclick:"labelClick"}]
});
}
}
this.galleryPanel.reflow();
this.loadingDialog1.setShowing(false);
}
} catch(e) {
console.error('ERROR IN productServiceSuccess: ' + e);
}
},
productcategoryLiveVariable1Success: function(inSender, inDeprecated) {
try {
this.categoryVar.clearData();
this.categoryPanel.removeAllControls();
var n=Math.floor(window.innerWidth/210);
//console.log("n="+n);
var categoryImgId;var lableId;var panelRow;var buttonId;var dataVarId;
var numRows = inSender.getCount();
if (numRows > 0) {
for(var i=0; i<numRows; i++){
var thisRow = inSender.getItem(i);
//console.log(thisRow);
this.categoryVar.addItem(thisRow.data);
categoryImgId=thisRow.data.pgCode;
labelId="label"+i;
if(i%n===0){
panelRow=new wm.Panel({owner: this,
parent: this.categoryPanel,
name: "panel"+i,
verticalAlign: "top",
horizontalAlign: "left",
width: "100%",
height: "240px",
layoutKind: "left-to-right"});
//console.log(panelRow+":i="+i);
panelRow.createComponent("custom"+i,"wm.Panel",{height:"100%",width:"200px",layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:"1",margin:"5",backgroundColor:"#e5e2f5"},{},
{
categoryImgId:["wm.Picture",{height:"200px",width:"200px",aspect:"h",source:app.appUrl+"pic/nophoto.png"},{onclick:"categoryImgClick"},{}],
labelId:["wm.Label",{height:"20px",width:"200px",align:"center",caption:thisRow.data.pgDesc}]
});
}
else{
panelRow.createComponent("custom"+i,"wm.Panel",{height:"100%",width:"200px",layoutKind:"top-to-bottom",horizontalAlign:"left",verticalAlign:"top",border:"1",margin:"5",backgroundColor:"#e5e2f5"},{},
{
categoryImgId:["wm.Picture",{height:"200px",width:"200px",aspect:"h",source:app.appUrl+"pic/nophoto.png"},{onclick:"categoryImgClick"},{}],
labelId:["wm.Label",{height:"20px",width:"200px",align:"center",caption:thisRow.data.pgDesc}]
});
}
}
this.categoryPanel.reflow();
}
} catch(e) {
console.error('ERROR IN productServiceSuccess: ' + e);
}
},
addProductToCartPictureClick: function(inSender) {
var e=this.imgVar.getItem(this.productIndex.getValue("dataValue")).data;
this.shoppingCartVar.addItem(e)
app.toastSuccess("已加入購物車！");
this.countMount();
},
countMount:function(){
var count = this.shoppingCartVar.getCount();
var totalPrice=0;
for (var i = 0; i < count; i++) {
totalPrice += this.shoppingCartVar.getItem(i).data.price;
console.log(this.shoppingCartVar.getItem(i));
}
this.totalPriceLabel.setCaption(totalPrice);
},
phoneGapCall1Result: function(inSender, inDeprecated) {
app.alert('test');
},
loginServiceResult: function(inSender, inDeprecated) {
app.uservo=inSender.getData();
console.log('test');
console.log(app.uservo);
this.mainLayers.setLayer(this.layer1);
this.productcategoryLiveVariable1.update();
},
searchQuotBtn1Click: function(inSender) {
this.quotHeadVar.custCode=this.custSearchSelect.selectedItem.data.custCode;
this.quotHeadVar.custName=this.telSearchText.getDataValue();
this.findQuotService.setValue("vo",this.quotHeadVar);
this.findQuotService.setValue("user",app.uservo.userId);
this.findQuotService.setValue("role",app.uservo.roleId);
},
_end: 0
});

Main.widgets = {
productcategoryLiveVariable1: ["wm.LiveVariable", {"autoUpdate":false,"maxResults":50,"startUpdate":false,"type":"com.xedb.data.ProductCategory"}, {"onSuccess":"productcategoryLiveVariable1Success"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"\"N\"","targetProperty":"filter.invalidFlag"}, {}]
}],
liveView: ["wm.LiveView", {"dataType":"com.xedb.data.ProductCategory","view":[{"caption":"PgCode","sortable":true,"dataIndex":"pgCode","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},{"caption":"PgDesc","sortable":true,"dataIndex":"pgDesc","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},{"caption":"PgCdesc","sortable":true,"dataIndex":"pgCdesc","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},{"caption":"CreateUser","sortable":true,"dataIndex":"createUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},{"caption":"CreateDate","sortable":true,"dataIndex":"createDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},{"caption":"LastUpdateUser","sortable":true,"dataIndex":"lastUpdateUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},{"caption":"LastUpdateDate","sortable":true,"dataIndex":"lastUpdateDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},{"caption":"ApproveUser","sortable":true,"dataIndex":"approveUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},{"caption":"ApproveDate","sortable":true,"dataIndex":"approveDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},{"caption":"CateDisplaySeq","sortable":true,"dataIndex":"cateDisplaySeq","type":"java.math.BigDecimal","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null},{"caption":"InvalidFlag","sortable":true,"dataIndex":"invalidFlag","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":10,"subType":null}]}, {}]
}],
imgVar: ["wm.Variable", {"isList":true,"type":"com.norwood.ProductService.ProductViewVO"}, {}],
productService: ["wm.ServiceVariable", {"inFlightBehavior":"executeLast","operation":"findProductByCategory","service":"norwood"}, {"onResult":"productServiceResult","onSuccess":"productServiceSuccess"}, {
input: ["wm.ServiceInput", {"type":"findProductByCategoryInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"categoryList.selectedItem.pgCode","targetProperty":"category"}, {}]
}]
}]
}],
categoryVar: ["wm.Variable", {"isList":true,"type":"com.xedb.data.ProductCategory"}, {}],
currentLayer: ["wm.Variable", {"type":"StringData"}, {}],
phoneGapCall1: ["wm.PhoneGapCall", {"autoUpdate":true,"inFlightBehavior":"executeLast","startUpdate":true}, {"onResult":"phoneGapCall1Result"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"quotList","targetProperty":"loadingDialog"}, {}]
}],
input: ["wm.ServiceInput", {"type":"contacts_readInputs"}, {}]
}],
productIndex: ["wm.Variable", {"type":"NumberData"}, {}],
shoppingCartVar: ["wm.Variable", {"isList":true,"type":"com.norwood.ProductService.ProductViewVO"}, {}],
custLiveVar: ["wm.LiveVariable", {"inFlightBehavior":"executeLast","type":"com.xedb.data.Customer"}, {}, {
liveView: ["wm.LiveView", {"dataType":"com.xedb.data.Customer","related":["id"],"view":[{"caption":"CustName","sortable":true,"dataIndex":"custName","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1001,"subType":null,"widthUnits":"px"},{"caption":"CustCurr","sortable":true,"dataIndex":"custCurr","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1002,"subType":null,"widthUnits":"px"},{"caption":"ContactPerson1","sortable":true,"dataIndex":"contactPerson1","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1003,"subType":null,"widthUnits":"px"},{"caption":"ContactEmail","sortable":true,"dataIndex":"contactEmail","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1004,"subType":null,"widthUnits":"px"},{"caption":"Tel1","sortable":true,"dataIndex":"tel1","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1005,"subType":null,"widthUnits":"px"},{"caption":"Tel2","sortable":true,"dataIndex":"tel2","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1006,"subType":null,"widthUnits":"px"},{"caption":"Fax1","sortable":true,"dataIndex":"fax1","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1007,"subType":null,"widthUnits":"px"},{"caption":"Fax2","sortable":true,"dataIndex":"fax2","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1008,"subType":null,"widthUnits":"px"},{"caption":"PaymentTerm","sortable":true,"dataIndex":"paymentTerm","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1009,"subType":null,"widthUnits":"px"},{"caption":"TradeTerm","sortable":true,"dataIndex":"tradeTerm","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1010,"subType":null,"widthUnits":"px"},{"caption":"CustRemark","sortable":true,"dataIndex":"custRemark","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1011,"subType":null,"widthUnits":"px"},{"caption":"CreateUser","sortable":true,"dataIndex":"createUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1012,"subType":null,"widthUnits":"px"},{"caption":"CreateDate","sortable":true,"dataIndex":"createDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1013,"subType":null,"widthUnits":"px"},{"caption":"LastUpdateUser","sortable":true,"dataIndex":"lastUpdateUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1014,"subType":null,"widthUnits":"px"},{"caption":"LastUpdateDate","sortable":true,"dataIndex":"lastUpdateDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1015,"subType":null,"widthUnits":"px"},{"caption":"ApproveUser","sortable":true,"dataIndex":"approveUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1016,"subType":null,"widthUnits":"px"},{"caption":"ApproveDate","sortable":true,"dataIndex":"approveDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1017,"subType":null,"widthUnits":"px"},{"caption":"CustAddress","sortable":true,"dataIndex":"custAddress","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1018,"subType":null,"widthUnits":"px"},{"caption":"ContactPerson2","sortable":true,"dataIndex":"contactPerson2","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1019,"subType":null,"widthUnits":"px"},{"caption":"Tel","sortable":true,"dataIndex":"tel","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1020,"subType":null,"widthUnits":"px"},{"caption":"Fax","sortable":true,"dataIndex":"fax","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1021,"subType":null,"widthUnits":"px"},{"caption":"Contact1Sex","sortable":true,"dataIndex":"contact1Sex","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1022,"subType":null,"widthUnits":"px"},{"caption":"Contact2Sex","sortable":true,"dataIndex":"contact2Sex","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1023,"subType":null,"widthUnits":"px"},{"caption":"Contact3Sex","sortable":true,"dataIndex":"contact3Sex","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1024,"subType":null,"widthUnits":"px"},{"caption":"HouseName","sortable":true,"dataIndex":"houseName","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1025,"subType":null,"widthUnits":"px"},{"caption":"ContactEmail2","sortable":true,"dataIndex":"contactEmail2","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1026,"subType":null,"widthUnits":"px"},{"caption":"CompanyCode","sortable":true,"dataIndex":"id.companyCode","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":2000,"subType":null,"widthUnits":"px"},{"caption":"CustCode","sortable":true,"dataIndex":"id.custCode","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":2001,"subType":null,"widthUnits":"px"}]}, {}]
}],
findQuotService: ["wm.ServiceVariable", {"inFlightBehavior":"executeLast","operation":"findQuotationByCondition","service":"norwood"}, {}, {
input: ["wm.ServiceInput", {"type":"findQuotationByConditionInputs"}, {}]
}],
quotHeadVar: ["wm.Variable", {"type":"com.norwood.ProductService.QuotHeadVO"}, {}],
loginService: ["wm.ServiceVariable", {"inFlightBehavior":"executeLast","operation":"login","service":"userService"}, {"onResult":"loginServiceResult"}, {
input: ["wm.ServiceInput", {"type":"loginInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"userIdText.dataValue","targetProperty":"name"}, {}],
wire1: ["wm.Wire", {"expression":undefined,"source":"passwordText.dataValue","targetProperty":"pass"}, {}],
wire2: ["wm.Wire", {"expression":undefined,"source":"roleSelect.dataValue","targetProperty":"role"}, {}]
}]
}]
}],
getRoleService: ["wm.ServiceVariable", {"inFlightBehavior":"executeLast","operation":"findRolesByUser","service":"userService"}, {}, {
input: ["wm.ServiceInput", {"type":"findRolesByUserInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"userIdText.dataValue","targetProperty":"userId"}, {}]
}]
}]
}],
loadingDialog1: ["wm.LoadingDialog", {"styles":{"backgroundColor":"#dae1ee"}}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"layers1","targetProperty":"widgetToCover"}, {}]
}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
mainLayers: ["wm.Layers", {"defaultLayer":1}, {}, {
layer1: ["wm.Layer", {"borderColor":"","caption":"layer1","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
toggleButtonPanel1Panel: ["wm.Panel", {"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
toggleButtonPanel1: ["wm.ToggleButtonPanel", {"horizontalAlign":"left","manageHistory":true,"manageURL":true,"margin":"0,1,0,0","verticalAlign":"top"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"navButton1","targetProperty":"currentButton"}, {}]
}],
button1: ["wm.Button", {"border":"0,1,0,0","caption":"Product ","height":"100%","margin":"0","width":"200px"}, {"onclick":"gridLayer"}],
navButton2: ["wm.Button", {"border":"0,1,0,0","caption":"Quotation","height":"100%","margin":"0","width":"200px"}, {"onclick":"layer3"}],
button2: ["wm.Button", {"border":"0,1,0,0","caption":"Signout","height":"100%","margin":"0","width":"200px"}, {"onclick":"layer2"}],
shopinfoLabel: ["wm.Label", {"height":"100%","padding":"4","styles":{"color":"#1144c4"},"width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"app.uservo.showRoomDesc","targetProperty":"caption"}, {}]
}]
}]
}]
}],
layers1: ["wm.Layers", {"margin":"3,0,0,0","transition":"slide"}, {}, {
gridLayer: ["wm.Layer", {"borderColor":"","caption":undefined,"horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
gridLayers: ["wm.Layers", {}, {}, {
categoryGridLayer: ["wm.Layer", {"borderColor":"","caption":"layer4","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
categoryPanel: ["wm.Panel", {"autoScroll":true,"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}]
}],
productGridLayer: ["wm.Layer", {"borderColor":"","caption":"layer4","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
mobileIconButton2Panel: ["wm.Panel", {"desktopHeight":"30px","enableTouchHeight":true,"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","mobileHeight":"40px","verticalAlign":"top","width":"100%"}, {}, {
mobileIconButton2: ["wm.MobileIconButton", {"border":"0","desktopHeight":"30px","direction":"back","height":"30px","mobileHeight":"30px","width":"75px"}, {"onclick":"app._onBack"}]
}],
galleryPanel: ["wm.Panel", {"autoScroll":true,"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}]
}]
}]
}],
layer3: ["wm.Layer", {"borderColor":"","caption":undefined,"horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
quotLayers: ["wm.Layers", {}, {}, {
shoppingCartLayer: ["wm.Layer", {"borderColor":"","caption":"layer4","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
mobileIconButton3Panel: ["wm.Panel", {"desktopHeight":"30px","enableTouchHeight":true,"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","mobileHeight":"40px","verticalAlign":"top","width":"100%"}, {}, {
mobileIconButton3: ["wm.MobileIconButton", {"border":"0","direction":"back","imageIndex":7,"imageList":undefined,"width":"70px"}, {"onclick":"app._onBack"}],
saveQuotBtn: ["wm.Button", {"caption":"Save","height":"40px","imageIndex":41,"imageList":"app.silkIconList","margin":"4"}, {}],
searchQuotBtn: ["wm.Button", {"caption":"Search","height":"40px","imageIndex":66,"imageList":"app.silkIconList","margin":"4","width":"100px"}, {"onclick":"searchQuotLayer"}]
}],
shoppingCartListPanel: ["wm.Panel", {"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}, {
customerPanel: ["wm.Panel", {"desktopHeight":"191px","enableTouchHeight":true,"height":"215px","horizontalAlign":"left","mobileHeight":"215px","verticalAlign":"top","width":"100%"}, {}, {
custSelect: ["wm.SelectMenu", {"caption":"Customer","captionAlign":"left","captionSize":"80px","dataType":"com.xedb.data.Customer","dataValue":undefined,"desktopHeight":"35px","displayExpression":"${custName}+\",\"+${tel}+\",\"+${custAddress}","displayField":"tradeTerm","displayValue":"","height":"35px","required":true,"width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custLiveVar","targetProperty":"dataSet"}, {}]
}]
}],
label2Panel: ["wm.Panel", {"height":"24px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label2: ["wm.Label", {"caption":"Estate:","padding":"4","width":"80px"}, {}],
custHouseNameLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.houseName","targetProperty":"caption"}, {}]
}]
}]
}],
addressLabelPanel: ["wm.Panel", {"height":"24px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label3: ["wm.Label", {"caption":"Address:","padding":"4","width":"80px"}, {}],
addressLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.custAddress","targetProperty":"caption"}, {}]
}]
}]
}],
panel5: ["wm.Panel", {"height":"26px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label4: ["wm.Label", {"caption":"Contact：","padding":"4","width":"80px"}, {}],
contactPersonLabel: ["wm.Label", {"padding":"4","width":"80px"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.contactPerson1","targetProperty":"caption"}, {}]
}]
}],
label5: ["wm.Label", {"caption":"Tel:","padding":"4","width":"40px"}, {}],
telNoLabel: ["wm.Label", {"padding":"4","width":"100px"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.tel","targetProperty":"caption"}, {}]
}]
}],
telNo2Label: ["wm.Label", {"padding":"4","width":"100px"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.tel1","targetProperty":"caption"}, {}]
}]
}]
}],
label6Panel: ["wm.Panel", {"height":"24px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label6: ["wm.Label", {"caption":"Email：","padding":"4","width":"100px"}, {}],
emailLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custSelect.selectedItem.contactEmail","targetProperty":"caption"}, {}]
}]
}]
}],
quotRmkText: ["wm.LargeTextArea", {"caption":"Quotation Remark:","dataValue":undefined,"desktopHeight":"80px","displayValue":"","height":"80px","mobileHeight":"80px","width":"100%"}, {}]
}],
shoppingCartList: ["wm.List", {"_classes":{"domNode":["MobileListStyle"]},"border":"0","columns":[{"show":false,"field":"ttlPrice","title":"TtlPrice","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"exchangeRate","title":"ExchangeRate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardD","title":"StandardD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countWidth","title":"CountWidth","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardH","title":"StandardH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productIdpk","title":"ProductIdpk","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"height","title":"Height","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"highlight2","title":"Highlight2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countDeep","title":"CountDeep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"image","title":"Image","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"expression":"\"<img src='\"+${image}+\"' height='100' width='100'/>\"","mobileColumn":false},{"show":true,"field":"name","title":"Name","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"deliveryStep","title":"DeliveryStep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"description","title":"Description","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"highlight1","title":"Highlight1","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"displayDimension","title":"DisplayDimension","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"discEnd","title":"DiscEnd","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"netPriceItem","title":"NetPriceItem","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"expression":"${netPriceItem}?\"不折不扣\":\"\"","mobileColumn":false},{"show":false,"field":"standardW","title":"StandardW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"deep","title":"Deep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"video","title":"Video","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"triband","title":"Triband","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"relateUnit","title":"RelateUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"width","title":"Width","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countSize","title":"CountSize","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionDiscountedPrice","title":"OptionDiscountedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"qty","title":"Qty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tempUnit","title":"TempUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"isInit","title":"IsInit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitW","title":"CountUnitW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"size","title":"Size","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"price","title":"Price","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"pgCode","title":"PgCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"showUnitCode","title":"ShowUnitCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custCode","title":"CustCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"stringPrice","title":"StringPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"stringPrice2","title":"StringPrice2","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"series","title":"Series","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"specialDiscount","title":"SpecialDiscount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"state","title":"State","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"unitPriceType","title":"UnitPriceType","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnit","title":"CountUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitH","title":"CountUnitH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitD","title":"CountUnitD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productCost","title":"ProductCost","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"specialDiscountType","title":"SpecialDiscountType","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countQty","title":"CountQty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"hvDisc","title":"HvDisc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productSeq","title":"ProductSeq","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardUnit","title":"StandardUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"isOption","title":"IsOption","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"expression":"${isOption}?\"配件\":\"\"","mobileColumn":false},{"show":false,"field":"camera","title":"Camera","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNetPrice","title":"OptionNetPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"discStart","title":"DiscStart","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productId","title":"ProductId","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionTotal","title":"OptionTotal","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"exchangedPrice","title":"ExchangedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countHeight","title":"CountHeight","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"suppCode","title":"SuppCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productAmount","title":"ProductAmount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNormalPrice","title":"OptionNormalPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","editorProps":{"restrictValues":true},"expression":"\n\"<img src='\"+${image}+\"' height='100' width='100'/><br/>\"+\n\"<div class='MobileRowTitle'>Name: \" + ${name} + \"</div>\"\n+ \"<div class='MobileRow'>Highlight1: \" + ${highlight1} + \"</div>\"\n+ \"<div class='MobileRow'>DiscEnd: \" + ${discEnd} + \"</div>\"\n+ \"<div class='MobileRow'>StringPrice: \" + ${stringPrice} + \"</div>\"\n+ \"<div class='MobileRow'>State: \" + ${state} + \"</div>\"","isCustomField":true,"mobileColumn":true}],"headerVisible":false,"height":"100%","margin":"0","minDesktopHeight":60,"styleAsGrid":false}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"shoppingCartVar","targetProperty":"dataSet"}, {}]
}]
}],
panel3: ["wm.Panel", {"height":"80px","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}, {
panel4: ["wm.Panel", {"height":"27px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
label1: ["wm.Label", {"caption":"Total Price：","height":"25px","padding":"4","width":"134px"}, {}],
totalPriceLabel: ["wm.Label", {"caption":"","display":"Currency","padding":"4"}, {}, {
format: ["wm.CurrencyFormatter", {"currency":"$","round":true}, {}]
}]
}]
}]
}]
}],
searchQuotLayer: ["wm.Layer", {"borderColor":"","caption":"layer1","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
mobileIconButton4: ["wm.Panel", {"desktopHeight":"30px","enableTouchHeight":true,"height":"42px","horizontalAlign":"left","layoutKind":"left-to-right","mobileHeight":"42px","verticalAlign":"top","width":"100%"}, {}, {
mobileIconButton5: ["wm.MobileIconButton", {"border":"0","direction":"back"}, {"onclick":"app._onBack"}],
searchQuotBtn1: ["wm.Button", {"caption":"Search","height":"40px","imageIndex":66,"imageList":"app.silkIconList","margin":"4","width":"100%"}, {"onclick":"searchQuotBtn1Click"}]
}],
customerPanel1: ["wm.Panel", {"desktopHeight":"191px","enableTouchHeight":true,"height":"145px","horizontalAlign":"left","mobileHeight":"145px","verticalAlign":"top","width":"100%"}, {}, {
custSearchSelect: ["wm.SelectMenu", {"caption":"Customer","captionSize":"140px","dataType":"com.xedb.data.Customer","dataValue":undefined,"desktopHeight":"35px","displayExpression":"${custName}+\",\"+${tel}+\",\"+${custAddress}","displayField":"tradeTerm","displayValue":"","height":"35px","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"custLiveVar","targetProperty":"dataSet"}, {}]
}]
}],
estateSearchText: ["wm.Text", {"caption":"Estate","captionSize":"140px","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","width":"100%"}, {}],
telSearchText: ["wm.Text", {"caption":"Tel","captionSize":"140px","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","width":"100%"}, {}],
quotNoSearchText: ["wm.Text", {"caption":"Quotation No.","captionSize":"140px","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","width":"100%"}, {}]
}],
quotList: ["wm.List", {"_classes":{"domNode":["MobileListStyle"]},"border":"0","columns":[{"show":false,"field":"scDate","title":"ScDate","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"scComplete","title":"ScComplete","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custAddress","title":"CustAddress","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"salesName","title":"SalesName","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"contactPerson2","title":"ContactPerson2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tel","title":"Tel","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"contactPerson1","title":"ContactPerson1","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"lastUpdateUser","title":"LastUpdateUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"scAmount","title":"ScAmount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"contact1Sex","title":"Contact1Sex","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tempData","title":"TempData","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tel1","title":"Tel1","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"showRoomIp","title":"ShowRoomIp","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tel2","title":"Tel2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"showRoom","title":"ShowRoom","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custHouseName","title":"CustHouseName","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"quotRmk","title":"QuotRmk","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"custHouseNameDesc","title":"CustHouseNameDesc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custEmail","title":"CustEmail","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"quotOverFlag","title":"QuotOverFlag","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"approveDate","title":"ApproveDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"fax2","title":"Fax2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"quotValidDate","title":"QuotValidDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"fax1","title":"Fax1","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"createDate","title":"CreateDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"approveUser","title":"ApproveUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"relatedMeasure","title":"RelatedMeasure","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"fax","title":"Fax","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"contact3Sex","title":"Contact3Sex","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"quotNo","title":"QuotNo","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"fileUploadFlag","title":"FileUploadFlag","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"companyCode","title":"CompanyCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"lastUpdateDate","title":"LastUpdateDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"stringQuotDate","title":"StringQuotDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"createUser","title":"CreateUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custCode","title":"CustCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"contact2Sex","title":"Contact2Sex","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"quotDate","title":"QuotDate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"relatedScno","title":"RelatedScno","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"custName","title":"CustName","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","expression":"\"<div class='MobileRowTitle'>SalesName: \" + ${salesName} + \"</div>\"\n+ \"<div class='MobileRow'>CustHouseNameDesc: \" + ${custHouseNameDesc} + \"</div>\"\n+ \"<div class='MobileRow'>QuotNo: \" + ${quotNo} + \"</div>\"\n+ \"<div class='MobileRow'>QuotDate: \" + ${quotDate} + \"</div>\"\n+ \"<div class='MobileRow'>CustName: \" + ${custName} + \"</div>\"\n","mobileColumn":true},{"show":true,"controller":"rightarrow","width":"20px","title":"-","field":"_rightArrow","mobileColumn":true}],"headerVisible":false,"height":"100%","margin":"0","minDesktopHeight":60,"rightNavArrow":true,"styleAsGrid":false}, {"onclick":"shoppingCartLayer"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"findQuotService","targetProperty":"dataSet"}, {}]
}]
}]
}]
}]
}],
Edit_Product: ["wm.Layer", {"autoScroll":true,"borderColor":"","caption":undefined,"horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
panel2: ["wm.Panel", {"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"middle","width":"100%"}, {}, {
mobileIconButton1: ["wm.MobileIconButton", {"border":"0","direction":"back","height":"100%","imageIndex":6,"imageList":undefined}, {"onclick":"app._onBack"}],
addProductToCartPicture: ["wm.Picture", {"height":"20px","imageIndex":22,"imageList":"app.silkIconList","width":"40px"}, {"onclick":"addProductToCartPictureClick"}]
}],
productLiveForm1: ["wm.LiveForm", {"alwaysPopulateEditors":true,"enableTouchHeight":true,"height":"100%","horizontalAlign":"left","layoutKind":"left-to-right","liveEditing":false,"verticalAlign":"top"}, {"onSuccess":"productLivePanel1.popupLiveFormSuccess"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem","targetProperty":"dataSet"}, {}],
wire1: ["wm.Wire", {"expression":undefined,"source":"idRelatedEditor1.dataOutput","targetProperty":"dataOutput.id"}, {}]
}],
panel1: ["wm.Panel", {"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"50%"}, {}, {
picture1: ["wm.Picture", {"aspect":"h","enableTouchHeight":true,"height":"100%","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"${app.appUrl}+${this.productDojoGrid.selectedItem.data.image}","targetProperty":"source"}, {}]
}]
}]
}],
detailInfoPanel: ["wm.Panel", {"height":"300px","horizontalAlign":"left","verticalAlign":"middle","width":"50%"}, {}, {
nameLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.name","targetProperty":"caption"}, {}]
}]
}],
highlight1Label: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.highlight1","targetProperty":"caption"}, {}]
}]
}],
priceLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.stringPrice","targetProperty":"caption"}, {}]
}]
}],
stateLabel1: ["wm.Label", {"padding":"4","styles":{"color":"#f20232"},"width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.state","targetProperty":"caption"}, {}]
}]
}],
originalPriceLabel: ["wm.Label", {"padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.stringPrice2","targetProperty":"caption"}, {}]
}]
}],
discEndLabel: ["wm.Label", {"align":"left","padding":"4","width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.discEnd","targetProperty":"caption"}, {}]
}]
}],
productDesc: ["wm.LargeTextArea", {"caption":"largeTextArea1","captionAlign":"right","captionPosition":"left","captionSize":"0px","desktopHeight":"132px","displayValue":"","emptyValue":"emptyString","height":"132px","mobileHeight":"132px","readonly":true,"width":"100%"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productDojoGrid.selectedItem.description","targetProperty":"dataValue"}, {}]
}]
}]
}]
}]
}]
}]
}],
layer2: ["wm.Layer", {"borderColor":"","caption":"layer2","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
panel6: ["wm.Panel", {"height":"100%","horizontalAlign":"center","verticalAlign":"middle","width":"100%"}, {}, {
userIdText: ["wm.Text", {"caption":"User ID","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px"}, {"onchange":"getRoleService"}],
passwordText: ["wm.Text", {"caption":"Password","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","password":true}, {}],
roleSelect: ["wm.SelectMenu", {"caption":"Role","dataField":"role","dataType":"com.norwood.UserService.RoleVO","dataValue":undefined,"desktopHeight":"35px","displayField":"roleDesc","displayValue":"","height":"35px"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"getRoleService","targetProperty":"dataSet"}, {}]
}]
}],
loginBtn: ["wm.Button", {"caption":"Login","height":"40px","margin":"4","width":"105px"}, {"onclick":"loginService"}]
}]
}]
}]
}]
};

Main.prototype._cssText = '';
Main.prototype._htmlText = '';