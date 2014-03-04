dojo.declare("PhoneMain", wm.Page, {
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
productDojoGridSelect1: function(inSender, inItem) {
this.picture1.setSource(this.productDojoGrid.selectedItem.data.image);
//app.alert(this.picture1.source);
},
addProductToCartPictureClick: function(inSender) {
if(this.currentLayer==="ProductList"){
console.log(this.productDojoGrid.selectedItem.data);
this.shoppingCartVar.addItem(this.productDojoGrid.selectedItem.data)
app.toastSuccess("已加入購物車！");
}
},
categoryListClick: function(inSender, inEvent, inItem) {
this.productLayers.setLayer(this.Product_List);
this.loadingDialog1.setShowing(true);
this.currentLayer="ProductList";
this.productDojoGrid.clear();
this.productService.input.setValue("category", this.categoryList.selectedItem.data.pgCode);
this.productService.input.setValue("url", app.appUrl);
this.productService.update();
},
phoneGapCall1Result: function(inSender, inDeprecated) {
app.alert('test');
},
_end: 0
});

PhoneMain.widgets = {
productcategoryLiveVariable1: ["wm.LiveVariable", {"maxResults":50,"type":"com.xedb.data.ProductCategory"}, {"onSuccess":"productcategoryLiveVariable1Success"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":"\"N\"","targetProperty":"filter.invalidFlag"}, {}]
}],
liveView: ["wm.LiveView", {"dataType":"com.xedb.data.ProductCategory","view":[{"caption":"PgCode","sortable":true,"dataIndex":"pgCode","type":"java.lang.String","displayType":"Text","required":true,"readonly":true,"includeLists":true,"includeForms":true,"order":0,"subType":null},{"caption":"PgDesc","sortable":true,"dataIndex":"pgDesc","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":1,"subType":null},{"caption":"PgCdesc","sortable":true,"dataIndex":"pgCdesc","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":2,"subType":null},{"caption":"CreateUser","sortable":true,"dataIndex":"createUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":3,"subType":null},{"caption":"CreateDate","sortable":true,"dataIndex":"createDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":4,"subType":null},{"caption":"LastUpdateUser","sortable":true,"dataIndex":"lastUpdateUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":5,"subType":null},{"caption":"LastUpdateDate","sortable":true,"dataIndex":"lastUpdateDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":6,"subType":null},{"caption":"ApproveUser","sortable":true,"dataIndex":"approveUser","type":"java.lang.String","displayType":"Text","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":7,"subType":null},{"caption":"ApproveDate","sortable":true,"dataIndex":"approveDate","type":"java.util.Date","displayType":"Date","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":8,"subType":null},{"caption":"CateDisplaySeq","sortable":true,"dataIndex":"cateDisplaySeq","type":"java.math.BigDecimal","displayType":"Number","required":false,"readonly":false,"includeLists":true,"includeForms":true,"order":9,"subType":null},{"caption":"InvalidFlag","sortable":true,"dataIndex":"invalidFlag","type":"java.lang.String","displayType":"Text","required":true,"readonly":false,"includeLists":true,"includeForms":true,"order":10,"subType":null}]}, {}]
}],
imgVar: ["wm.Variable", {"isList":true,"type":"com.norwood.ProductService.ProductViewVO"}, {}],
productService: ["wm.ServiceVariable", {"inFlightBehavior":"executeLast","operation":"findProductByCategory","service":"norwood"}, {"onSuccess":"loadingDialog1.hide"}, {
input: ["wm.ServiceInput", {"type":"findProductByCategoryInputs"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"categoryList.selectedItem.pgCode","targetProperty":"category"}, {}]
}]
}]
}],
categoryVar: ["wm.Variable", {"isList":true,"type":"com.xedb.data.ProductCategory"}, {}],
currentLayer: ["wm.Variable", {"type":"StringData"}, {}],
shoppingCartVar: ["wm.Variable", {"isList":true,"type":"com.norwood.ProductService.ProductViewVO"}, {}],
phoneGapCall1: ["wm.PhoneGapCall", {"autoUpdate":true,"inFlightBehavior":"executeLast","startUpdate":true}, {"onResult":"phoneGapCall1Result"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"list1","targetProperty":"loadingDialog"}, {}]
}],
input: ["wm.ServiceInput", {"type":"contacts_readInputs"}, {}]
}],
loadingDialog1: ["wm.LoadingDialog", {"styles":{"backgroundColor":"#dae1ee"}}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"layers1","targetProperty":"widgetToCover"}, {}]
}]
}],
layoutBox1: ["wm.Layout", {"horizontalAlign":"left","verticalAlign":"top"}, {}, {
toggleButtonPanel1: ["wm.ToggleButtonPanel", {"horizontalAlign":"left","manageHistory":true,"manageURL":true,"margin":"0,1,0,0","verticalAlign":"top"}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"navButton1","targetProperty":"currentButton"}, {}]
}],
navButton1: ["wm.Button", {"border":"0,1,0,0","caption":"Product List","height":"100%","margin":"0","width":"100%"}, {"onclick":"layer2"}],
navButton2: ["wm.Button", {"border":"0,1,0,0","caption":"Quotation","height":"100%","margin":"0","width":"100%"}, {"onclick":"layer3"}]
}],
layers1: ["wm.Layers", {"clientBorderColor":"#ffffff","defaultLayer":0,"margin":"3,0,0,0","transition":"slide"}, {}, {
layer2: ["wm.Layer", {"borderColor":"#ffffff","caption":undefined,"horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
productLayers: ["wm.Layers", {}, {}, {
layer1: ["wm.Layer", {"borderColor":"","caption":"Category","horizontalAlign":"left","layoutKind":"left-to-right","themeStyleType":"","verticalAlign":"top"}, {}, {
categoryList: ["wm.List", {"_classes":{"domNode":["MobileListStyle"]},"border":"0","columns":[{"show":false,"field":"pgCode","title":"PgCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"pgDesc","title":"PgDesc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"pgCdesc","title":"PgCdesc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"createUser","title":"CreateUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"createDate","title":"CreateDate","width":"80px","align":"left","formatFunc":"wm_date_formatter","mobileColumn":false},{"show":false,"field":"lastUpdateUser","title":"LastUpdateUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"lastUpdateDate","title":"LastUpdateDate","width":"80px","align":"left","formatFunc":"wm_date_formatter","mobileColumn":false},{"show":false,"field":"approveUser","title":"ApproveUser","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"approveDate","title":"ApproveDate","width":"80px","align":"left","formatFunc":"wm_date_formatter","mobileColumn":false},{"show":false,"field":"cateDisplaySeq","title":"CateDisplaySeq","width":"80px","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"invalidFlag","title":"InvalidFlag","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","editorProps":{"restrictValues":true},"expression":"\"<div class='MobileRowTitle'>PgDesc: \" + ${pgDesc} + \"</div>\"\n+ \"<div class='MobileRow'>PgCdesc: \" + ${pgCdesc} + \"</div>\"\n","mobileColumn":true}],"headerVisible":false,"height":"100%","margin":"0","minDesktopHeight":60,"styleAsGrid":false}, {"onclick":"categoryListClick"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productcategoryLiveVariable1","targetProperty":"dataSet"}, {}]
}]
}]
}],
Product_List: ["wm.Layer", {"borderColor":"","caption":"Product List","horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {"onShow":"productDojoGrid.deselectAll"}, {
mobileIconButton3Panel: ["wm.Panel", {"height":"40px","horizontalAlign":"right","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
mobileIconButton3: ["wm.MobileIconButton", {"border":"0","direction":"back"}, {"onclick":"app._onBack"}]
}],
productDojoGrid: ["wm.List", {"_classes":{"domNode":["MobileListStyle"]},"border":"0","columns":[{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","editorProps":{"restrictValues":true},"expression":"\n\"<img src='\"+${image}+\"' height='100' width='100'/><br/>\"+\n\"<div class='MobileRowTitle'> \" + ${name} + \"</div>\"\n\n+ \"<div class='MobileRow'>UnitCode: \" + ${unitPriceType} + \"</div>\"\n+ \"<div class='MobileRow'> \" + ${stringPrice} + \"</div>\"","isCustomField":true,"mobileColumn":true},{"show":false,"field":"ttlPrice","title":"TtlPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"exchangeRate","title":"ExchangeRate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardD","title":"StandardD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countWidth","title":"CountWidth","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardH","title":"StandardH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"netPriceItem","title":"NetPriceItem","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productIdpk","title":"ProductIdpk","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"height","title":"Height","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"highlight2","title":"Highlight2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countDeep","title":"CountDeep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"deliveryStep","title":"DeliveryStep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"description","title":"Description","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"displayDimension","title":"DisplayDimension","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"discEnd","title":"DiscEnd","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardW","title":"StandardW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"deep","title":"Deep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"video","title":"Video","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"triband","title":"Triband","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"relateUnit","title":"RelateUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"width","title":"Width","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countSize","title":"CountSize","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"image","title":"Image","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"expression":"\"<img src='\"+${image}+\"' height='100' width='100'/><br/>\"","mobileColumn":false},{"show":false,"field":"optionDiscountedPrice","title":"OptionDiscountedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"qty","title":"Qty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tempUnit","title":"TempUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"isInit","title":"IsInit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitW","title":"CountUnitW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"size","title":"Size","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"price","title":"Price","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"pgCode","title":"PgCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"showUnitCode","title":"ShowUnitCode","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"custCode","title":"CustCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"name","title":"Name","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":true,"field":"highlight1","title":"Highlight1","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":true,"field":"stringPrice","title":"StringPrice","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"series","title":"Series","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"specialDiscount","title":"SpecialDiscount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"state","title":"State","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"unitPriceType","title":"UnitPriceType","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"countUnit","title":"CountUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitH","title":"CountUnitH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitD","title":"CountUnitD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productCost","title":"ProductCost","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"specialDiscountType","title":"SpecialDiscountType","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countQty","title":"CountQty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"hvDisc","title":"HvDisc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productSeq","title":"ProductSeq","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardUnit","title":"StandardUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"isOption","title":"IsOption","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"camera","title":"Camera","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNetPrice","title":"OptionNetPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"discStart","title":"DiscStart","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productId","title":"ProductId","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionTotal","title":"OptionTotal","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"exchangedPrice","title":"ExchangedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countHeight","title":"CountHeight","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"stringPrice2","title":"StringPrice2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"suppCode","title":"SuppCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productAmount","title":"ProductAmount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNormalPrice","title":"OptionNormalPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false}],"headerVisible":false,"height":"100%","margin":"0","styleAsGrid":false}, {"onLongClick":"productDojoGridLongClick","onSelect":"Edit_Product","onSelect1":"productDojoGridSelect1"}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"productService","targetProperty":"dataSet"}, {}]
}]
}]
}]
}]
}],
layer3: ["wm.Layer", {"borderColor":"#ffffff","caption":undefined,"horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
label3Panel: ["wm.Panel", {"desktopHeight":"24px","enableTouchHeight":true,"height":"40px","horizontalAlign":"left","layoutKind":"left-to-right","mobileHeight":"40px","verticalAlign":"top","width":"100%"}, {}, {
mobileIconButton2: ["wm.MobileIconButton", {"border":"0","direction":"back"}, {"onclick":"app._onBack"}],
searchBtn: ["wm.Button", {"caption":"Search Quotation","height":"40px","margin":"4","width":"200px"}, {}],
saveBtn: ["wm.Button", {"caption":"Save","height":"40px","margin":"4"}, {}]
}],
quotLayers: ["wm.Layers", {}, {}, {
shoppingCartLayer: ["wm.Layer", {"borderColor":"","caption":"layer4","horizontalAlign":"left","themeStyleType":"","verticalAlign":"top"}, {}, {
panel3: ["wm.Panel", {"height":"194px","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}, {
panel4: ["wm.Panel", {"height":"36px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}, {
selectMenu1: ["wm.SelectMenu", {"caption":"Customer","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","width":"227px"}, {}],
text1: ["wm.Text", {"caption":"Telephone","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px","width":"228px"}, {}],
text2: ["wm.Text", {"caption":"Estate","captionSize":"80px","dataValue":undefined,"desktopHeight":"35px","displayValue":"","height":"35px"}, {}]
}],
panel5: ["wm.Panel", {"height":"48px","horizontalAlign":"left","layoutKind":"left-to-right","verticalAlign":"top","width":"100%"}, {}]
}],
shoppingCartListPanel: ["wm.Panel", {"height":"100%","horizontalAlign":"left","verticalAlign":"top","width":"100%"}, {}, {
shoppingCartList: ["wm.List", {"_classes":{"domNode":["MobileListStyle"]},"border":"0","columns":[{"show":false,"field":"ttlPrice","title":"TtlPrice","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"exchangeRate","title":"ExchangeRate","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardD","title":"StandardD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countWidth","title":"CountWidth","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardH","title":"StandardH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"netPriceItem","title":"NetPriceItem","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productIdpk","title":"ProductIdpk","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"height","title":"Height","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"highlight2","title":"Highlight2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countDeep","title":"CountDeep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"image","title":"Image","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"expression":"\"<img src='\"+${image}+\"' height='100' width='100'/>\"","mobileColumn":false},{"show":true,"field":"name","title":"Name","width":"100%","align":"left","formatFunc":"","editorProps":{"restrictValues":true},"mobileColumn":false},{"show":false,"field":"deliveryStep","title":"DeliveryStep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"description","title":"Description","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"highlight1","title":"Highlight1","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"displayDimension","title":"DisplayDimension","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"discEnd","title":"DiscEnd","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardW","title":"StandardW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"deep","title":"Deep","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"video","title":"Video","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"triband","title":"Triband","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"relateUnit","title":"RelateUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"width","title":"Width","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countSize","title":"CountSize","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionDiscountedPrice","title":"OptionDiscountedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"qty","title":"Qty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"tempUnit","title":"TempUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"isInit","title":"IsInit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitW","title":"CountUnitW","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"size","title":"Size","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"price","title":"Price","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"pgCode","title":"PgCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"showUnitCode","title":"ShowUnitCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"custCode","title":"CustCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"stringPrice","title":"StringPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"series","title":"Series","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"specialDiscount","title":"SpecialDiscount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":true,"field":"state","title":"State","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"unitPriceType","title":"UnitPriceType","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnit","title":"CountUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitH","title":"CountUnitH","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countUnitD","title":"CountUnitD","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productCost","title":"ProductCost","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"specialDiscountType","title":"SpecialDiscountType","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countQty","title":"CountQty","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"hvDisc","title":"HvDisc","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productSeq","title":"ProductSeq","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"standardUnit","title":"StandardUnit","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"isOption","title":"IsOption","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"camera","title":"Camera","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNetPrice","title":"OptionNetPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"discStart","title":"DiscStart","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productId","title":"ProductId","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionTotal","title":"OptionTotal","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"exchangedPrice","title":"ExchangedPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"countHeight","title":"CountHeight","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"stringPrice2","title":"StringPrice2","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"suppCode","title":"SuppCode","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"productAmount","title":"ProductAmount","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"optionNormalPrice","title":"OptionNormalPrice","width":"100%","align":"left","formatFunc":"","mobileColumn":false},{"show":false,"field":"PHONE COLUMN","title":"-","width":"100%","align":"left","editorProps":{"restrictValues":true},"expression":"\n\"<img src='\"+${image}+\"' height='100' width='100'/><br/>\"+\n\"<div class='MobileRowTitle'>Name: \" + ${name} + \"</div>\"\n+ \"<div class='MobileRow'>Highlight1: \" + ${highlight1} + \"</div>\"\n+ \"<div class='MobileRow'>DiscEnd: \" + ${discEnd} + \"</div>\"\n+ \"<div class='MobileRow'>StringPrice: \" + ${stringPrice} + \"</div>\"\n+ \"<div class='MobileRow'>State: \" + ${state} + \"</div>\"","isCustomField":true,"mobileColumn":true}],"headerVisible":false,"height":"100%","margin":"0","minDesktopHeight":60,"styleAsGrid":false}, {}, {
binding: ["wm.Binding", {}, {}, {
wire: ["wm.Wire", {"expression":undefined,"source":"shoppingCartVar","targetProperty":"dataSet"}, {}]
}]
}]
}]
}]
}]
}],
Edit_Product: ["wm.Layer", {"autoScroll":true,"borderColor":"#ffffff","caption":undefined,"horizontalAlign":"left","themeStyleType":"ContentPanel","verticalAlign":"top"}, {}, {
panel2: ["wm.Panel", {"height":"40px","horizontalAlign":"right","layoutKind":"left-to-right","verticalAlign":"middle","width":"100%"}, {}, {
addProductToCartPicture: ["wm.Picture", {"height":"20px","imageIndex":22,"imageList":"app.silkIconList","width":"40px"}, {"onclick":"addProductToCartPictureClick"}],
mobileIconButton1: ["wm.MobileIconButton", {"border":"0","direction":"back","height":"100%","imageIndex":6,"imageList":undefined}, {"onclick":"app._onBack"}]
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
}]
};

PhoneMain.prototype._cssText = '';
PhoneMain.prototype._htmlText = '';