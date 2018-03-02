Ext.define('td.view.invoice.ClearanceMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ClearanceMainController',

	//통관예정 발주서 검색
	searchClearanceTodoKeyword : function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]"),
			v_param = {
				keyword : this.lookupReference('ClearanceTodo_keyword').getValue()
			}

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_param);
			grid.store.load();
		}
	},

	//통관내역 작성 팝업 열기
	openWinMakeClearanceInfo : function(btn,e){
		var grid = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]");
		//storeTempInvoice = Ext.create('td.store.MakeInvoiceList');
		var bk_store = grid.getStore();	//백업
		var store = Ext.create('td.store.MakeInvoiceList');


		//통관탭 발주서 목록
		var sm = grid.getSelection();

		if( sm == '' ) {
			Ext.Msg.alert('알림','통관진행품목을 선택해주세요');
			return false;
		}

		var win = this.lookupReference('winMakeClearance');
		if (!win) {
			win = new td.view.invoice.winMakeClearance();
			win.x = -400;
			win.y = -100;
			this.getView().add(win);
		}
		var grid_win = win.down("[name=MakeClearanceList]");

		var v_iv_id = '';
		var last_iv_id = '';

		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('td.model.Invoice', {
				'number'				: sm[i].data.number,
				'gpcode'				: sm[i].data.gpcode,
				'cr_id'					: sm[i].data.cr_id,
				'iv_id'					: sm[i].data.iv_id,
				'ip_id'					: sm[i].data.ip_id,
				'wr_id'					: sm[i].data.wr_id,
				'cr_it_id'			: sm[i].data.iv_it_id,
				'cr_it_name'		: sm[i].data.iv_it_name,
				'cr_qty'				: sm[i].data.iv_qty,
				'cr_cancel_qty'	: 0
			});
			store.add(rec);

			if(sm[i].data.iv_id != last_iv_id)
				v_iv_id += sm[i].data.iv_id+',';

			last_iv_id = sm[i].data.iv_id;
		}

		v_iv_id = v_iv_id.substr(0,v_iv_id.length-1);
		//v_iv_name = v_iv_name.substr(0,v_iv_name.length-1);


		/*통관내역 작성 기본폼 로딩*/
		var iv_sm = sm[0];
		iv_sm.data.iv_id = v_iv_id;

		//this.lookupReference('winMakeInvoiceForm').loadRecord(iv_sm);
		Ext.getCmp('winMakeClearanceForm').loadRecord(iv_sm);

		//winClearanceConfirm.setTitle(v_gpcode_name+'"통관내역작성');

		var button = Ext.get('btn_invoice');

		if (win.isVisible()) {
			win.hide(this, function() {
			});
		} else {
			win.show(this, function() {
			});
		}

		grid_win.reconfigure(store);
		grid.reconfigure(bk_store);
	},

	//통관예정 발주서 레코드 삭제
	deleteClearanceTodoInvoice : function(view, records) {
		var grid = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]");

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

	//통관예정발주서 선택시 우측 공구정보, 통관관련 목록 로딩
	selectClearanceTodoInvoice : function(view, records) {

		var grid = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]"),
				grid_end = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('ClearanceItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]"),
				sm = grid.getSelectionModel().getSelection();


		//통관관련 품목 초기화
		grid_item.store.loadData([], false);
		//좌측 하단 통관처리된 발주서 선택 초기화
		grid_end.getSelectionModel().deselectAll(true);
		//우측 상단 연결된 공구정보
		grid_gpinfo.getSelectionModel().deselectAll(true);
		//우측 하단 통관관련 품목
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
			var v_param = {
											'gpcode': v_gpcode,
											'iv_id': v_iv_id,
											'cr_id' : ''		};

			/*공구별 참고사항 로딩*/
			v_param.mode = 'gpinfo';
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, v_param);
			grid_gpinfo.store.load();

			//통관관련 품목 로딩
			//grid_item.store.removeAll();
			v_param.mode = 'ClearanceTodoItem';
			Ext.apply(grid_item.store.getProxy().extraParams, v_param);
			grid_item.store.load();
		}
	},

	//통관완료 발주서 검색
	searchClearanceEndKeyword : function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceEndInvoiceList]"),
			v_param = {
				keyword : this.lookupReference('ClearanceEnd_keyword').getValue()
			}

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_param);
			grid.store.load();
		}
	},

	//통관완료발주서 선택시 우측 공구정보, 통관관련 목록 로딩
	selectClearanceEndInvoice : function(view, records) {

		//ClearanceTodoInvoiceList
		//ClearanceEndInvoiceList
		//InvoiceGpMemo
		//ClearanceItemList

		var grid_todo = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]"),
			grid = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceEndInvoiceList]"),
			grid_gpinfo = Ext.getCmp('ClearanceItem').down("[name=InvoiceGpInfo]"),
			grid_item = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]"),
			sm = grid.getSelectionModel().getSelection();


		//통관관련 품목 초기화
		grid_item.store.loadData([], false);
		//좌측 하단 통관처리된 발주서 선택 초기화
		grid_todo.getSelectionModel().deselectAll(true);
		//우측 상단 연결된 공구정보
		grid_gpinfo.getSelectionModel().deselectAll(true);
		//우측 하단 통관관련 품목
		grid_item.getSelectionModel().deselectAll(true);

		var sm = grid.getSelectionModel().getSelection();
		if (sm[0]) {

			var v_gpcode = '';
			var v_cr_id = '';

			for (var i = 0; i < sm.length; i++) {	//sm[i].data

				//  ','단위로 분할한 공구코드 다시 합치기
				var v_arr = sm[i].data.gpcode.split(',');
				for (var a = 0; a < v_arr.length; a++) {
					v_gpcode += "'" + v_arr[a] + "',";
				}

				v_cr_id += "'"+sm[i].data.cr_id + "',";
			}

			v_gpcode = v_gpcode.substr(0, v_gpcode.length - 1);
			v_cr_id = v_cr_id.substr(0,v_cr_id.length-1);

			//v_keyword = Ext.getCmp('orderitems_keyword').getValue();
			var v_param = {
											'gpcode': '',
											'iv_id': '',
											'cr_id' : v_cr_id		};


			/*공구별 참고사항 로딩*/
			v_param.mode = 'gpinfo';
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, v_param);
			grid_gpinfo.store.load();

			//통관관련 품목 로딩
			//grid_item.store.removeAll();
			v_param.mode = 'ClearanceEndItem';
			Ext.apply(grid_item.store.getProxy().extraParams, v_param);
			grid_item.store.load();
		}
	},

	//일괄수정
	updateInvoiceQty : function() {
		var win = this.lookupReference('winMakeInvoice');
		var store = win.down("[name=MakeInvoiceList]").store;
		var cnt = store.getCount();
		var v_qty = this.lookupReference('InvoiceQty').getValue();

		for(var i = 0; i < cnt; i++) {
			store.getData().getAt(i).set('iv_qty',v_qty);
		}
	},

	//인쇄
	printWinMakeClearance : function() {
		var win = this.lookupReference('winMakeClearance');
		var grid_win = win.down("[name=MakeClearanceList]");
		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' Clearance LIST';
		Ext.ux.grid.Printer.print(grid_win);
	},

	//취소
	closeWinMakeClearance : function(btn, e) {
		var win = this.lookupReference('winMakeClearance'),
			grid = win.down("[name=MakeClearanceList]");

		win.hide();
		Ext.getCmp('winMakeClearanceForm').getForm().reset();
		grid.store.removeAll();
	},

	//기록
	submitWinMakeClearance : function() {
		var win = this.lookupReference('winMakeClearance'),
				grid_win = win.down("[name=MakeClearanceList]"),
				grid_todo = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]"),
				grid_end = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceEndInvoiceList]"),
				grid_gpinfo = Ext.getCmp('ClearanceItem').down("[name=InvoiceGpInfo]"),
				grid_item = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]"),
				form = Ext.getCmp('winMakeClearanceForm'),
				btn = this.lookup('BtnSubmitClearance');

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
				//grid_invoiceTodoClearance.getStore().load();//통관예정발주서 리로딩
				win.hide();
				btn.show();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
				btn.show();
			}
		});
	},

	//우측 통관완료 인보이스건 상태값 변경
	updateClearanceInvoiceItem : function() {
		var grid_item = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]"),
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
	printClearanceInvoiceItem : function() {
		var grid_item = Ext.getCmp('ClearanceItem').down("[name=ClearanceItemList]"),
				bk_store = grid_item.getStore(),	//백업
				store = Ext.create('td.store.MakeInvoiceList');

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
				'gpcode_name'		: sm[i].data.gpcode_name,
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

	//통관 품목 엑셀다운로드
	exportClearanceItem : function(btn,e) {
	var grid_todo = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceTodoInvoiceList]"),
			grid_end = Ext.getCmp('ClearanceInvoice').down("[name=ClearanceEndInvoiceList]"),
			sm1 = grid_todo.getSelectionModel().getSelection();
			sm2 = grid_end.getSelectionModel().getSelection();

	var v_iv_id = '',
			v_cr_id = '';

	for (var i = 0; i < sm1.length; i++) {	//sm[i].data
		v_iv_id += "'" + sm1[i].data.iv_id + "',";
		v_cr_id += "'" + sm1[i].data.cr_id + "',";
	}

	for (var i = 0; i < sm2.length; i++) {	//sm[i].data
		v_iv_id += "'" + sm2[i].data.iv_id + "',";
		v_cr_id += "'" + sm2[i].data.cr_id + "',";
	}

	v_iv_id = v_iv_id.substr(0, v_iv_id.length - 1);
	v_cr_id = v_cr_id.substr(0, v_cr_id.length - 1);

	window.open("/resources/excel/invoiceitem.php?cr_id="+v_cr_id+"&iv_id="+v_iv_id, "_blank", "height=230, width=450,toolbar=no,scrollbars=no,menubar=no");
}

});