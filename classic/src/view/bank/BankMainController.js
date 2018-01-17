Ext.define('td.view.bank.BankMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.BankMainController',
	popup:{},

	//레코드 정보 변경
	updateBankInfo: function(btn,e) {
		var sm = Ext.getCmp('bank_list').down("[name=BankStatement]").getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','입출금 내역을 선택해주세요');
			return false;
		}

		var banktype = this.lookupReference('cb_banktype').getValue();
		var taxtype = this.lookupReference('cb_taxtype').getValue();

		for(var i = 0; i < sm.length; i++) {
			if(banktype) sm[i].set('bank_type',banktype);
			if(taxtype) sm[i].set('tax_type',taxtype);
		}

	},

	//페이지 저장
	saveBankPage : function(btn,e) {
		Ext.MessageBox.confirm('현재 페이지 저장', "현재 입출금내역 페이지를 DB에 저장합니다.", function(btn, text) {
			if(btn == 'yes') {
				Ext.getCmp('bank_list').down("[name=BankStatement]").store.sync();
			}
		}, function(){

		});
	},

	//입출금내역 인쇄
	printBankPage : function(btn,e) {
		Ext.ux.grid.Printer.mainTitle = '입출금 내역';
		Ext.ux.grid.Printer.print(Ext.getCmp('bank_list').down("[name=BankStatement]"));
	},

	//입출금내역 검색
	searchBankData: function(btn,e) {
		if(e.keyCode == 13){
			var tb = btn.up().items;
			var store = btn.up().up().getStore();
			
			store.loadData([], false);
			Ext.apply(store.getProxy().extraParams, {
				keyword: tb.items[1].getValue(),
				bank_type: tb.items[2].getValue(),
				sdate: tb.items[3].rawValue,
				edate: tb.items[4].rawValue
			});
			store.load();
		}
	},

	//입출금내역 선택시 연결된 주문정보 로딩
	selBankDataLoadOrders : function(view, records) {
			
		var grid = Ext.getCmp('bank_list').items.items[0];
		var sm = grid.getSelectionModel().getSelection()[0];

		var store_banklinklist = Ext.getCmp('bank_order').items.items[0].getStore();
		store_banklinklist.loadData([],false);
		
		
		if(sm) {
			var sm = grid.getSelection();

			if( sm == '' ) {
				Ext.Msg.alert('알림','상품들을 선택해주세요');
				return false;
			}

			var v_number = '';
			for(var i = 0; i < sm.length; i++) {	//sm[i].data
				v_number += sm[i].data.number + ",";
			}

			v_number = v_number.substr(0,v_number.length-1);

			v_keyword = Ext.getCmp('keyword_banklist').getValue();
			var v_param = { 'number' : v_number,
				'keyword' : v_keyword
			};

			Ext.apply(store_banklinklist.getProxy().extraParams, v_param);
			store_banklinklist.load();
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