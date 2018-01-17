Ext.define('td.view.product.ProductMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ProductMainController',
	popup:{},


	//공구목록 선택시 상품목록 로딩
	selGpinfoLoadPrdList: function(view, records) {
		var grid_gplist = Ext.getCmp('prd_gpinfo').items.items[0];
		var grid_prdlist = Ext.getCmp('prd_product').items.items[0];

		grid_prdlist.store.loadData([],false);

		/* 공구목록의 선택된 레코드 */
		var sm = grid_gplist.getSelectionModel().getSelection()[0];

		if(sm) {
			Ext.getCmp('prd_product').setTitle('> "'+sm.get('gpcode_name')+'"의 품목들');

			/* >>주문내역 리프레시 */
			Ext.apply(grid_prdlist.store.getProxy().extraParams, sm.data);
			grid_prdlist.store.load();

		} else {
			Ext.getCmp('prd_product').setTitle('> ');
		}
	},

	//경매상품목록 선택시 입찰정보 목록 로딩
	selPrdLoadBidList: function(view, records) {
		var grid_aucPrdList = Ext.getCmp('auc_auction').items.items[0];
		var grid_aucBidList = Ext.getCmp('auc_bidlist').items.items[0];

		grid_aucBidList.store.loadData([],false);

		/* 경매상품목록의 선택된 레코드 */
		var sm = grid_aucPrdList.getSelectionModel().getSelection()[0];

		if(sm) {
			Ext.getCmp('auc_bidlist').setTitle('> "'+sm.get('gp_name')+'"의 입찰내역');

			/* >>주문내역 리프레시 */
			Ext.apply(grid_aucBidList.store.getProxy().extraParams, sm.data);
			grid_aucBidList.store.load();

		} else {
			Ext.getCmp('auc_bidlist').setTitle('> ');
		}
	},

	//상품목록 수정
	UpdPrd: function(btn, e) {
		var grid = btn.up().up();
		var sm = grid.getSelection();
		//var sm = grid_itemlist.getSelection();
		
		
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}
	
		var yesno = Ext.getCmp('combo_yesno').getValue();
		var pricetype = Ext.getCmp('combo_pricetype').getValue();
		var metaltype = Ext.getCmp('combo_metaltype').getValue();
		var spottype = Ext.getCmp('combo_spottype').getValue();
	
		
		for(var i = 0; i < sm.length; i++) {
			if(yesno) sm[i].set('gp_use',yesno);
			if(pricetype) sm[i].set('gp_price_type',pricetype);
			if(metaltype) sm[i].set('gp_metal_type',metaltype);
			if(spottype) sm[i].set('gp_spotprice_type',spottype);
		}
	
		//값이 있을경우 업데이트
		if(pricetype || metaltype || spottype) {
			grid.store.sync();
		}
	},

	OrderToBid: function(btn, e) {
		var grid = btn.up().up();
		var sm = grid.getSelection()[0];
		//var sm = grid_aucBidList.getSelection()[0];

		if (sm == '') {
			Ext.Msg.alert('알림', '입찰기록을 선택해주세요');
			return false;
		}

		var jsonData = "[" + Ext.encode(sm.data) + "]";


		Ext.MessageBox.confirm('알림',sm.data.mb_name+'님의 입찰건('+sm.data.bid_last_price+')을 주문입력합니다' , function(btn, text) {
			if(btn == 'yes') {

				Ext.Ajax.request({
					url: "/resources/crud/auction/bid_order.insert.php",
					params: { data : jsonData},
					success: function (result, request) {
						var result = Ext.util.JSON.decode(result.responseText);
						Ext.MessageBox.alert('알림', result.message);
					},
					failure: function (result, request) {
						var result = Ext.util.JSON.decode(result.responseText);
						Ext.MessageBox.alert('알림', result.message);
					}
				});

			}
		}, function(){

		});
	},
	
	//경매상품 그리드 키워드 검색
	searchKeyword: function(t,e) {
		if(e.keyCode == 13){
			var grid = t.up().up();
			grid.store.loadData([],false);
			grid.store.currentPage = 1;//페이징초기화
			Ext.apply(grid.store.getProxy().extraParams, {keyword : t.getValue()});
			grid.store.load();
		}
	},


	//경매시작
	auctionStart: function(btn, e) {
		var grid = btn.up().up();

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		for(var i = 0; i < sm.length; i++) {
			sm[i].set('ac_yn','Y');
		}
		grid.store.load();
	},

	//경매종료
	auctionEnd: function(btn, e) {
		var grid = btn.up().up();

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		for(var i = 0; i < sm.length; i++) {
			sm[i].set('ac_yn','N');
		}
		grid.store.load();
	},

	//상품PAGE
	gotoPrdPage: function(btn, e) {
		var grid = btn.up().up();
		var sm = grid.getSelectionModel().getSelection();
		//var gp = btn.up().up().up().up().items.items[0].items.items[0].getSelectionModel().getSelection();
		
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목을 선택해주세요');
			return false;
		}

		for(var i=0; i < sm.length; i++) {
			openPopup('http://coinstoday.co.kr/shop/grouppurchase.php?gpcode=QUICK&gp_id='+sm[i].get('gp_id'));
		}
		
	},
	
	//상품수정PAGE
	gotoPrdEditPage: function(btn, e) {
		var grid = btn.up().up();
		var sm = grid.getSelectionModel().getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목을 선택해주세요');
			return false;
		}

		for(var i=0; i < sm.length; i++) {
			openPopup('http://coinstoday.co.kr/adm/shop_admin/grouppurchaseform.php?w=u&gp_id='+sm[i].get('gp_id'));
		}
	},

	//경매상품PAGE
	gotoAucPrdPage: function(btn, e) {
		var grid = btn.up().up();
		var sm = grid.getSelectionModel().getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목을 선택해주세요');
			return false;
		}

		for(var i=0; i < sm.length; i++) {
			openPopup('http://coinstoday.co.kr/shop/auction.php?gp_id='+sm[i].get('gp_id'));
		}
	},
	
	//상품목록 인쇄
	printPrdList: function(btn, e) {
		var grid_gpinfo = btn.up().up().up().up().items.items[0].items.items[0]
		var grid_itemlist = btn.up().up();

		if(grid_gpinfo.getSelection().length == 0) {
			Ext.Msg.alert('알림','좌측 목록을 선택해주세요');
			return false;
		}
		
		var sm = grid_gpinfo.getSelectionModel().getSelection()[0];
		Ext.ux.grid.Printer.mainTitle = sm.get('gpcode_name')+' 상품목록';
		Ext.ux.grid.Printer.print(grid_itemlist);
	},

	//상품목록 엑셀다운로드
	downloadExcel : function (btn, e) {

		var tab = btn.up('[ariaRole=tabpanel]');
		var grid = tab.query('[name=GpInfoList]')[0];
		//var v_param = new Object();
		var v_node_list = '';
		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','엑셀데이터로 추출할 분류를 선택해주세요');
			return false;
		}


		window.open('/resources/excel/prdlist.php?gpcode='+sm[0].data.gpcode);
	}
	
});