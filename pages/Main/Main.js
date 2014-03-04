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