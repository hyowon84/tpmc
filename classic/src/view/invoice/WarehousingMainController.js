Ext.define('td.view.invoice.WarehousingMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.WarehousingMainController',

	//입고예정 발주서 검색
	searchWarehousingTodoKeyword : function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp('WarehousingInvoice').down("[name=WarehousingTodoInvoiceList]"),
			v_param = {
				keyword : this.lookupReference('WarehousingTodo_keyword').getValue()
			}

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_param);
			grid.store.load();
		}
	},

	//입고예정발주서 선택시 우측 공구정보, 입고관련 목록 로딩
	selectWarehousingTodoInvoice : function(view, records) {

		var grid = Ext.getCmp('WarehousingInvoice').down("[name=WarehousingTodoInvoiceList]"),
				//grid_end = Ext.getCmp('WarehousingInvoice').down("[name=WarehousingEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('WarehousingItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('WarehousingItem').down("[name=WarehousingItemList]"),
				sm = grid.getSelectionModel().getSelection();


		//입고관련 품목 초기화
		grid_item.store.loadData([], false);
		//우측 상단 연결된 공구정보
		grid_gpinfo.getSelectionModel().deselectAll(true);
		//우측 하단 입고관련 품목
		grid_item.getSelectionModel().deselectAll(true);

		var sm = grid.getSelectionModel().getSelection();
		if (sm[0]) {
			var v_gpcode = '';
			var v_cr_id = '';

			for(var i = 0; i < sm.length; i++) {	//sm[i].data

				//  ','단위로 분할한 공구코드 다시 합치기
				var v_arr = sm[i].data.gpcode.split(',');
				for(var a = 0; a < v_arr.length; a++) {
					v_gpcode += "'"+v_arr[a] + "',";
				}

				v_cr_id += "'"+sm[i].data.cr_id + "',";
			}

			v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);
			v_cr_id = v_cr_id.substr(0,v_cr_id.length-1);

			var v_param = { 'gpcode' : '',
				'iv_id'	:	'',
				'cr_id' : v_cr_id
			};


			/*공구별 참고사항 로딩*/
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, v_param);
			grid_gpinfo.store.load();

			//입고관련 품목 로딩
			//grid_item.store.removeAll();
			Ext.apply(grid_item.store.getProxy().extraParams, v_param);
			grid_item.store.load();
		}
	},

	//선택레코드 입고처리
	updateWarehousing : function() {
		var grid = Ext.getCmp('WarehousingItem').down("[name=WarehousingItemList]"),
				sm = grid.getSelection();

		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		for(var i = 0; i < sm.length; i++) {
			if(sm[i].data.iv_stats != '40') {
				sm[i].set('iv_stats','40');
			}
		}

		grid.store.sync();
	},

	printWarehousing : function() {
		var grid = Ext.getCmp('WarehousingItem').down("[name=WarehousingItemList]"),
				bk_store = grid.getStore(),	//백업
				store = Ext.create('td.store.MakeInvoiceList');

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		//선택된 레코드 임시 스토어에 저장해두기
		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('td.model.InvoiceItem', {
				'number'				: sm[i].data.number,
				'real_jaego'		: sm[i].data.real_jaego,
				'cr_blno'					: sm[i].data.cr_blno,
				'cr_refno'					: sm[i].data.cr_refno,
				'cr_id'					: sm[i].data.cr_id,
				'iv_id'					: sm[i].data.iv_id,
				'iv_order_no'		: sm[i].data.iv_order_no,
				'iv_stats'			: sm[i].data.iv_stats,
				'reg_date'			: sm[i].data.reg_date,
				'gpcode'				: sm[i].data.gpcode,
				'iv_it_img'			: sm[i].data.iv_it_img,
				'iv_it_id'			: sm[i].data.iv_it_id,
				'iv_it_name' 		: sm[i].data.iv_it_name,
				'money_type'  	: sm[i].data.money_type,
				'iv_dealer_worldprice'  : sm[i].data.iv_dealer_worldprice,
				'iv_dealer_price'       : sm[i].data.iv_dealer_price,
				'SUM_QTY'       : sm[i].data.SUM_QTY,
				'iv_qty'				: sm[i].data.iv_qty,
				'cr_qty'				: sm[i].data.cr_qty,
				'cr_cancel_qty'	: sm[i].data.cr_cancel_qty
			});
			store.add(rec);
		}

		grid.reconfigure(store);
		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' 입고목록';
		Ext.ux.grid.Printer.print(grid);
		grid.reconfigure(bk_store);
	}


});