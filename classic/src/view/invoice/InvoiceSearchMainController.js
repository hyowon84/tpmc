Ext.define('td.view.invoice.InvoiceSearchMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.InvoiceSearchMainController',

	//발주서 검색
	searchKeywordInvoiceList : function(btn,e){

		if(e.keyCode == 13){
			var v_keyword = this.lookupReference('keyword').getValue();
			var grid = Ext.getCmp('InvoiceList').down("[name=InvoiceList]");

			var params = {
				keyword : v_keyword
			}

			Ext.apply(grid.store.getProxy().extraParams, params);
			grid.store.load();

		}
	},

	//발주서에 연결된 발주품목 로드
	selectLoadInvoiceItem : function(btn,e){
		var grid_invoice = Ext.getCmp('InvoiceList').down("[name=InvoiceList]");
		var grid_invoiceItem = Ext.getCmp('InvoiceItem').down("[name=InvoiceItemList]");
		var v_gpcode = '';
		var v_iv_id = '';

		grid_invoiceItem.store.loadData([],false);


		/* 공구목록 선택된 레코드 */
		var sm = grid_invoice.getSelectionModel().getSelection();

		if(sm[0]) {

			for(var i = 0; i < sm.length; i++) {	//sm[i].data

				//  ','단위로 분할한 공구코드 다시 합치기
				var v_arr = sm[i].data.gpcode.split(',');
				for(var a = 0; a < v_arr.length; a++) {
					v_gpcode += "'"+v_arr[a] + "',";
				}

				v_iv_id += "'"+sm[i].data.iv_id + "',";
			}

			v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);
			v_iv_id = v_iv_id.substr(0,v_iv_id.length-1);

			//v_keyword = Ext.getCmp('orderitems_keyword').getValue();
			var v_param = { 'gpcode' : v_gpcode,		'iv_id' : v_iv_id };

			//발주관련 품목 로딩
			Ext.apply(grid_invoiceItem.store.getProxy().extraParams, v_param);
			grid_invoiceItem.store.load();

		}
		else {
			//v_keyword = Ext.getCmp('orderitems_keyword').getValue();
			var v_param = { 'gpcode' : v_gpcode,		'iv_id' : v_iv_id };

			//발주관련 품목 로딩
			Ext.apply(grid_invoiceItem.store.getProxy().extraParams, v_param);
			grid_invoiceItem.store.load();
		}

	}
});