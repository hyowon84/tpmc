Ext.define('td.view.invoice.WireMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.WireMainController',

	//송금예정 발주서 검색
	searchWireTodoKeyword : function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
			v_param = {
				keyword : this.lookupReference('WireTodo_keyword').getValue()
			}

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_param);
			grid.store.load();
		}
	},

	//송금내역 작성 팝업 열기
	openWinMakeWireInfo : function(btn,e){
		var store = Ext.create('td.store.MakeInvoiceList');
		var grid_todo = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]");
				//storeTempInvoice = Ext.create('td.store.MakeInvoiceList');


		//송금탭 발주서 목록
		var sm = grid_todo.getSelection();

		if( sm == '' ) {
			Ext.Msg.alert('알림','발주내역을 선택해주세요');
			return false;
		}


		var win = this.lookupReference('winMakeWire');
		if (!win) {
			win = new td.view.invoice.winMakeWire();
			//win.x = -400;
			//win.y = -100;
			this.getView().add(win);
		}
		var grid_win = win.down("[name=MakeWireList]");

		//		store = grid_win.store,
		//		cnt = store.getCount();
		//store.removeAll();

		var v_iv_id = '';
		var v_iv_name = '';
		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('td.model.WireEndInvoice', {
				'iv_id'						: sm[i].data.iv_id,
				'wr_id'						: sm[i].data.wr_id,
				'iv_name'					: sm[i].data.iv_name,
				'gpcode'					: sm[i].data.gpcode,
				'iv_dealer'				: sm[i].data.iv_dealer,
				'iv_order_no'			: sm[i].data.iv_order_no,
				'iv_receipt_link'	: sm[i].data.iv_receipt_link,
				'iv_date'					: sm[i].data.iv_date,
				'money_type'			: sm[i].data.money_type,
				'iv_memo'					: sm[i].data.iv_memo,
				'reg_date'				: sm[i].data.reg_date,
				'admin_id'				: sm[i].data.admin_id,
				'TOTAL_PRICE'			: parseFloat(sm[i].data.TOTAL_PRICE),
				'iv_discountfee'	: parseFloat(sm[i].data.iv_discountfee),
				'iv_shippingfee'	: parseFloat(sm[i].data.iv_shippingfee),
				'iv_tax'					: parseFloat(sm[i].data.iv_tax),
				'od_exch_rate'		: sm[i].data.od_exch_rate,
				'arv_exch_rate'		: sm[i].data.arv_exch_rate
			});
			store.add(rec);

			v_iv_id += sm[i].data.iv_id+',';
			v_iv_name += sm[i].data.iv_name+',';
		}

		v_iv_id = v_iv_id.substr(0,v_iv_id.length-1);
		v_iv_name = v_iv_name.substr(0,v_iv_name.length-1);


		/*송금내역 작성 기본폼 로딩*/
		var iv_sm = sm[0];
		iv_sm.data.iv_id = v_iv_id;

		//this.lookupReference('winMakeInvoiceForm').loadRecord(iv_sm);
		Ext.getCmp('winMakeWireForm').loadRecord(iv_sm);

		//winWireConfirm.setTitle(v_gpcode_name+'"송금내역작성');

		var button = Ext.get('btn_invoice');

		if (win.isVisible()) {
			win.hide(this, function() {
			});
		} else {
			win.show(this, function() {
			});
		}

		grid_win.reconfigure(store);

	},

	//송금예정 발주서 레코드 삭제
	deleteWireTodoInvoice : function(view, records) {
		var grid = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]");

		var sm = grid.getSelectionModel().getSelection();


		if(sm.length == 1) {
			Ext.MessageBox.confirm('확인', '정말 삭제하시겠습니까?',
				function(button) {
					if (button == 'yes') {
						grid.store.remove(sm[0]);
					}
					else {

					}
				});
		} else {
			Ext.Msg.alert('위험','발주서가 '+sm.length+'개 이상 선택되어있습니다 1개씩 꼼꼼히 삭제바랍니다');
			return false;
		}
	},

	//송금예정발주서 선택시 우측 공구정보, 송금관련 목록 로딩
	selectWireTodoInvoice : function(view, records) {

		var grid = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
				grid_end = Ext.getCmp('WireInvoice').down("[name=WireEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('WireItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('WireItem').down("[name=WireItemList]"),
				sm = grid.getSelectionModel().getSelection();


		//송금관련 품목 초기화
		grid_item.store.loadData([], false);
		//좌측 하단 송금처리된 발주서 선택 초기화
		grid_end.getSelectionModel().deselectAll(true);
		//우측 상단 연결된 공구정보
		grid_gpinfo.getSelectionModel().deselectAll(true);
		//우측 하단 송금관련 품목
		grid_item.getSelectionModel().deselectAll(true);

		var sm = grid.getSelectionModel().getSelection();
		if (sm[0]) {

			var v_gpcode = '';
			var v_iv_id = '';

			for (var i = 0; i < sm.length; i++) {	//sm[i].data

				//  ','단위로 분할한 공구코드 다시 합치기
				var v_arr = sm[i].data.gpcode.split(',');
				for (var a = 0; a < v_arr.length; a++) {
					v_gpcode += "'" + v_arr[a] + "',";
				}

				v_iv_id += "'" + sm[i].data.iv_id + "',";
			}

			v_gpcode = v_gpcode.substr(0, v_gpcode.length - 1);
			v_iv_id = v_iv_id.substr(0, v_iv_id.length - 1);

			//v_keyword = Ext.getCmp('orderitems_keyword').getValue();
			var v_param = {'gpcode': v_gpcode, 'iv_id': v_iv_id};

			/*공구별 참고사항 로딩*/
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, v_param);
			grid_gpinfo.store.load();

			//송금관련 품목 로딩
			//grid_item.store.removeAll();
			Ext.apply(grid_item.store.getProxy().extraParams, v_param);
			grid_item.store.load();
		}
	},

	//송금완료 발주서 검색
	searchWireEndKeyword : function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp('WireInvoice').down("[name=WireEndInvoiceList]"),
			v_param = {
				keyword : this.lookupReference('WireEnd_keyword').getValue()
			}

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_param);
			grid.store.load();
		}
	},

	//송금완료발주서 선택시 우측 공구정보, 송금관련 목록 로딩
	selectWireEndInvoice : function(view, records) {

		//WireTodoInvoiceList
		//WireEndInvoiceList
		//InvoiceGpMemo
		//WireItemList

		var grid_todo = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
				grid = Ext.getCmp('WireInvoice').down("[name=WireEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('WireItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('WireItem').down("[name=WireItemList]"),
				sm = grid.getSelectionModel().getSelection();


		//송금관련 품목 초기화
		grid_item.store.loadData([], false);
		//좌측 하단 송금처리된 발주서 선택 초기화
		grid_todo.getSelectionModel().deselectAll(true);
		//우측 상단 연결된 공구정보
		grid_gpinfo.getSelectionModel().deselectAll(true);
		//우측 하단 송금관련 품목
		grid_item.getSelectionModel().deselectAll(true);

		var sm = grid.getSelectionModel().getSelection();
		if (sm[0]) {

			var v_gpcode = '';
			var v_iv_id = '';

			for (var i = 0; i < sm.length; i++) {	//sm[i].data

				//  ','단위로 분할한 공구코드 다시 합치기
				var v_arr = sm[i].data.gpcode.split(',');
				for (var a = 0; a < v_arr.length; a++) {
					v_gpcode += "'" + v_arr[a] + "',";
				}

				v_iv_id += "'" + sm[i].data.iv_id + "',";
			}

			v_gpcode = v_gpcode.substr(0, v_gpcode.length - 1);
			v_iv_id = v_iv_id.substr(0, v_iv_id.length - 1);

			//v_keyword = Ext.getCmp('orderitems_keyword').getValue();
			var v_param = {'gpcode': v_gpcode, 'iv_id': v_iv_id};

			/*공구별 참고사항 로딩*/
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, v_param);
			grid_gpinfo.store.load();

			//송금관련 품목 로딩
			//grid_item.store.removeAll();
			Ext.apply(grid_item.store.getProxy().extraParams, v_param);
			grid_item.store.load();
		}
	},

	//일괄수정
	updateInvoiceQty : function(btn,e){
		var win = this.lookupReference('winMakeInvoice');
		var store = win.down("[name=MakeInvoiceList]").store;
		var cnt = store.getCount();
		var v_qty = this.lookupReference('InvoiceQty').getValue();

		for(var i = 0; i < cnt; i++) {
			store.getData().getAt(i).set('iv_qty',v_qty);
		}
	},

	//인쇄
	printWinMakeWire : function(btn,e){
		var win = this.lookupReference('winMakeWire');
		var grid_win = win.down("[name=MakeWireList]");
		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' WIRE LIST';
		Ext.ux.grid.Printer.print(grid_win);
	},

	//취소
	closeWinMakeWire : function(btn, e) {
		var win = this.lookupReference('winMakeWire'),
			grid = win.down("[name=MakeWireList]");

		win.hide();
		Ext.getCmp('winMakeWireForm').getForm().reset();
		grid.store.removeAll();
	},

	//기록
	submitWinMakeWire : function(btn,e){
		var win = this.lookupReference('winMakeWire'),
				grid_win = win.down("[name=MakeWireList]"),
				grid_todo = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
				grid_end = Ext.getCmp('WireInvoice').down("[name=WireEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('WireItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('WireItem').down("[name=WireItemList]"),
				form = Ext.getCmp('winMakeWireForm'),
				btn = this.lookup('BtnSubmitWire');

		var jsonData = "[",
				cnt = grid_win.getStore().data.items.length;


		for(var i = 0; i < cnt; i++) {
			jsonData += Ext.encode(grid_win.getStore().data.items[i].data)+",";
		}

		jsonData = jsonData.substring(0,jsonData.length-1) + "]";

		btn.hide();
		form.submit({
			params : {	mode : 'new',
				grid : jsonData
			},
			success : function(form,action) {
				Ext.Msg.alert('기록완료', action.result.message);
				form.reset();
				grid_win.getStore().removeAll();

				grid_todo.store.load();
				grid_end.store.load();
				grid_gpinfo.store.load();
				grid_item.store.load();

				//grid_orderitems.getStore().load();//발주대상 주문품목들 리로딩
				//grid_invoiceTodoWire.getStore().load();//송금예정발주서 리로딩
				win.hide();
				btn.show();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
				btn.show();
			}
		});
	},

	//우측 송금완료 인보이스건 상태값 변경
	updateWireInvoiceItem : function(btn,e){
		var grid_item = Ext.getCmp('WireItem').down("[name=WireItemList]"),
				sm = grid_item.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		var iv_stats = this.lookupReference('wr_stats').getValue();
		for(var i = 0; i < sm.length; i++) {
			sm[i].set('iv_stats',iv_stats);
		}

		grid_item.store.update();
	},

	//선택된 발주품목들만 인쇄
	printWireInvoiceItem : function(btn,e){
		var grid_item = Ext.getCmp('WireItem').down("[name=WireItemList]");
		var bk_store = grid_item.getStore();	//백업
		var store = Ext.create('td.store.MakeInvoiceList');

		var sm = grid_item.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		//선택된 레코드 임시 스토어에 저장해두기
		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('td.model.InvoiceItem', {
				'number'				: sm[i].data.number,
				'real_jaego'		: sm[i].data.real_jaego,
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

		grid_item.reconfigure(store);
		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' 발주목록';
		Ext.ux.grid.Printer.print(grid_item);
		grid_item.reconfigure(bk_store);
	},

	//송금관련 품목 엑셀다운로드
	exportWireInvoiceItem : function(btn,e) {
		var grid_todo = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
				grid_end = Ext.getCmp('WireInvoice').down("[name=WireEndInvoiceList]"),
				sm1 = grid_todo.getSelectionModel().getSelection();
				sm2 = grid_end.getSelectionModel().getSelection();

		var v_iv_id = '';

		for (var i = 0; i < sm1.length; i++) {	//sm[i].data
			v_iv_id += "'" + sm1[i].data.iv_id + "',";
		}

		for (var i = 0; i < sm2.length; i++) {	//sm[i].data
			v_iv_id += "'" + sm2[i].data.iv_id + "',";
		}

		v_iv_id = v_iv_id.substr(0, v_iv_id.length - 1);



		//sb.showBusy('- 추출 중... -');
		//sb.setStatus({
		//	text: '- 추출완료 -',
		//	iconCls: '',
		//	clear: true
		//});

		window.open("/resources/excel/invoiceitem.php?iv_id="+v_iv_id, "_blank", "height=230, width=450,toolbar=no,scrollbars=no,menubar=no");
	}


});