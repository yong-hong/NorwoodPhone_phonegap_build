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