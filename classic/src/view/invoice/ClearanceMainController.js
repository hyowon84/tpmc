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
	}

	////공구목록 선택해제
	//unselectGplist : function(btn,e){
	//	var grid = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]"),
	//			grid_orderitem = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceOrderItemList]"),
	//			sm = grid.getSelectionModel();
	//
	//	sm.deselectAll();
	//
	//	grid_orderitem.store.getProxy().extraParams = null;
	//	grid_orderitem.store.load();
	//},
	//
	////공구상품목록재설정 열기 닫기
	//closewinGpReset : function(btn,e) {
	//	this.lookupReference('winGpReset').hide();
	//	Ext.getCmp('winGpResetForm').getForm().reset();
	//},
	//
	////공구상품목록재설정 윈도우 열기
	//openWinGpReset : function () {
	//
	//	var win = this.lookupReference('winGpReset'),
	//			grid = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]"),
	//			sm = grid.getSelectionModel().getSelection();
	//
	//	if(!sm[0]) {
	//		Ext.Msg.alert('알림','공구를 선택해주세요');
	//		return false;
	//	}
	//
	//	if(sm[0]) {
	//
	//		if (!win) {
	//			win = new td.view.invoice.winGpReset();
	//
	//			//win.y = -450;
	//			this.getView().add(win);
	//		}
	//
	//		if (win.isVisible()) {
	//			win.hide(this, function() {
	//				Ext.getCmp('winGpResetForm').reset();
	//			});
	//		} else {
	//			win.show(this, function() {
	//				Ext.getCmp('winGpResetForm').reset();
	//
	//				var v_gpcode = '';
	//				var v_title = '';
	//
	//				for(var i = 0; i < sm.length; i++) {	//sm[i].data
	//					v_gpcode += "'"+sm[i].data.gpcode + "',";
	//					v_title += sm[i].data.gpcode_name + ', ';
	//				}
	//
	//				v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);
	//				v_title = v_title.substr(0,v_title.length-2);
	//
	//				var v = sm[0];
	//				v.data.gpcode_list = v_gpcode;
	//				v.data.gpcodename_list = v_title;
	//
	//				Ext.getCmp('winGpResetForm').loadRecord(v);
	//			});
	//		}
	//	}
	//},
	//
	////공구상품목록재설정 전송
	//submitWinGpReset : function(btn,e) {
	//	var win = this.lookupReference('winGpRefr'),
	//			form = Ext.getCmp('winGpRefrForm');
	//
	//	form.submit({
	//		params : {	mode : 'memo'	},
	//		success : function(form,action) {
	//			Ext.Msg.alert('수정완료', action.result.message);
	//			form.reset();
	//			win.hide();
	//		},
	//		failure : function (form, action) {
	//			Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
	//		}
	//	});
	//
	//},
	//
	////공구단체SMS/LMS
	//openWinGpSms : function(btn,e) {
	//	var win = this.lookupReference('winGpSms');
	//	var grid = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]");
	//	var sm = grid.getSelectionModel().getSelection();
	//
	//	if( !sm[0] ) {
	//		Ext.Msg.alert('알림','공구를 선택해주세요');
	//		return false;
	//	}
	//
	//	if(sm[0]) {
	//		if (win) {
	//			if(win.isVisible()) {
	//				win.hide(this, function () {
	//					Ext.getCmp('winGpSmsForm').reset();
	//				});
	//
	//				return;
	//			}
	//		}
	//		else {	//비활성 상태
	//			if (!win) {
	//				win = new td.view.invoice.winGpSms();
	//				this.getView().add(win);
	//			}
	//		}
	//
	//		win.show(this, function() {
	//			Ext.getCmp('winGpSmsForm').reset();
	//
	//			var v_gpcode = '';
	//			var v_title = '';
	//
	//			for(var i = 0; i < sm.length; i++) {	//sm[i].data
	//				v_gpcode += "'"+sm[i].data.gpcode + "',";
	//				v_title += sm[i].data.gpcode_name + ', ';
	//			}
	//
	//			v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);
	//			v_title = v_title.substr(0,v_title.length-2);
	//
	//			var v = sm[0];
	//			v.data.gpcode_list = v_gpcode;
	//			v.data.gpcodename_list = v_title;
	//			v.data.sms_text = v_title;
	//
	//			Ext.getCmp('winGpSmsForm').loadRecord(v);
	//		});
	//
	//	}
	//
	//},
	//
	////상태값 선택에 따른 문자메시지 예제 변경
	//changeStats : function() {
	//	var smsStats = this.lookupReference('cb_stats').getValue();
	//	this.lookupReference('sms_text').setValue(v_SmsMsg[smsStats]);
	//},
	//
	////문자내용 타이핑시 byte체크
	//keyupSizeCnt : function() {
	//	this.lookupReferencep('sizecnt').setValue(this.lookupReference('sms_text').getValue().length);
	//},
	//
	////단체문자 팝업 취소 버튼
	//closeWinGpSms : function(btn,e) {
	//	this.lookupReference('winGpSms').hide();
	//	Ext.getCmp('winGpSmsForm').getForm().reset();
	//},
	//
	////단체문자 팝업 전송 버튼
	//submitWinGpSms : function(btn,e) {
	//	var win = this.lookupReference('winGpSms');
	//	var form = Ext.getCmp('winGpSmsForm');
	//
	//	form.submit({
	//		params : {	mode : 'memo'	},
	//		success : function(form,action) {
	//			Ext.Msg.alert('수정완료', action.result.message);
	//			form.reset();
	//			win.hide();
	//		},
	//		failure : function (form, action) {
	//			Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
	//		}
	//	});
	//
	//},
	//
	////공구에 연결된 공구메모, 주문신청내역 로드
	//selectLoadGpMemoAndOrderItem : function(btn,e){
	//	var grid_gpinfo = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]"),
	//			grid_gpmemo = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceGpMemo]"),
	//			grid_orderitem = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceOrderItemList]");
	//
	//	var v_gpcode = '',
	//			v_keyword = '',
	//			v_title = '';
	//
	//	grid_orderitem.store.loadData([],false);
	//	grid_gpmemo.store.loadData([],false);
	//	grid_orderitem.store.currentPage = 1;
	//
	//
	//	/* 공구목록의 선택된 레코드 */
	//	var sm = grid_gpinfo.getSelectionModel().getSelection();
	//
	//
	//	/* 1개 이상 선택된게 있을경우 */
	//	if(sm[0]) {
	//		//storeTempInvoice.removeAll();	//발주서 작성 팝업의 스토어 초기화?
	//
	//		if( sm == '' ) {
	//			Ext.Msg.alert('알림','상품들을 선택해주세요');
	//			return false;
	//		}
	//
	//		for(var i = 0; i < sm.length; i++) {	//sm[i].data
	//			v_gpcode += "'"+sm[i].data.gpcode + "',";
	//			v_title += sm[i].data.gpcode_name + ',';
	//		}
	//
	//		v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);
	//		v_title = v_title.substr(0,v_title.length-1);
	//		v_keyword = Ext.getCmp('gporderitem_keyword').getValue();
	//	}
	//
	//	var v_param = {
	//		'gpcode' : v_gpcode,
	//		'keyword' : v_keyword
	//	};
	//
	//	/*공구별 참고사항 로딩*/
	//	Ext.apply(grid_gpmemo.store.getProxy().extraParams, v_param);
	//	Ext.apply(grid_orderitem.store.getProxy().extraParams, v_param);
	//
	//	//Ext.getCmp('ptb_orderitems').moveFirst();
	//	grid_orderitem.store.loadData([],false);
	//
	//	/* >>발주예상 품목 로딩, 패러미터는 오브젝트로 전달 */
	//	grid_gpmemo.store.load();
	//	grid_orderitem.store.load();
	//
	//},
	//
	////공구메모 수정 팝업창 열기
	//openWinGpMemo : function(grid, selRow, selHtml){
	//	var win = this.lookupReference('winGpMemo'),
	//			grid = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceGpMemo]");
	//
	//	if (!win) {
	//		win = new td.view.invoice.winGpMemo();
	//		win.x = -400;
	//		win.y = -100;
	//		this.getView().add(win);
	//	}
	//
	//	if (win.isVisible()) {
	//		win.hide(this, function() {
	//			//button.dom.disabled = false;
	//		});
	//	} else {
	//		win.show(this, function() {
	//			var form = Ext.getCmp('winGpMemoForm'),
	//					sm = grid.getSelectionModel().getSelection()[0];
	//
	//			win.setTitle(sm.data.gpcode+'|"'+sm.data.gpcode_name+'" 메모수정');
	//
	//			sm.data.invoice_memo = sm.data.invoice_memo.replace(/<br>/gi, "\r\n");	//개행문자를 <BR>로 변경한걸 다시 원상복구
	//			sm.data.memo = sm.data.memo.replace(/<br>/gi, "\r\n");
	//			form.loadRecord(sm);
	//		});
	//	}
	//
	//},
	//
	////공구메모 팝업 닫기
	//closeWinGpMemo : function(btn,e) {
	//	Ext.getCmp('winGpMemoForm').getForm().reset();
	//	this.lookupReference('winGpMemo').hide();
	//},
	//
	////공구메모 수정
	//submitWinGpMemo : function(btn,e) {
	//	var win = this.lookupReference('winGpMemo'),
	//		form = Ext.getCmp('winGpMemoForm'),
	//		grid = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceGpMemo]");
	//
	//	form.submit({
	//		params : {	mode : 'memo'	},
	//		success : function(form,action) {
	//			Ext.Msg.alert('수정완료', action.result.message);
	//			form.reset();
	//			grid.store.load();
	//			win.hide();
	//		},
	//		failure : function (form, action) {
	//			Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
	//		}
	//	});
	//},
	//
	////발주서 작성 팝업 열기
	//openWinMakeInvoice : function(btn,e){
	//	var storeTempInvoice = Ext.create('td.store.MakeInvoiceList');
	//	var grid_gpinfo = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]"),
	//			grid_orderitems = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceOrderItemList]");
	//
	//
	//	if( grid_gpinfo.getSelectionModel().getSelection() == '' ) {
	//		Ext.Msg.alert('알림','좌측 공동구매 항목을 선택하세요');
	//		return false;
	//	}
	//
	//	/*선택된 품목들 */
	//	var sm = grid_orderitems.getSelection();
	//	if( sm == '' ) {
	//		Ext.Msg.alert('알림','상품들을 선택해주세요');
	//		return false;
	//	}
	//
	//	var win = this.lookupReference('winMakeInvoice');
	//	if (!win) {
	//		win = new td.view.invoice.winMakeInvoice();
	//		win.x = -400;
	//		win.y = -100;
	//		this.getView().add(win);
	//	}
	//
	//	var grid_win = win.down("[name=MakeInvoiceList]");
	//	for(var i = 0; i < sm.length; i++) {
	//		var rec = Ext.create('td.model.InvoiceItem', {
	//			'gpcode'					: sm[i].data.gpcode,
	//			'iv_it_id'				: sm[i].data.it_id,
	//			'iv_it_name'			: sm[i].data.it_name,
	//			'iv_dealer_price'	: sm[i].data.it_org_price,
	//			'total_price'			: sm[i].data.total_price,
	//			'iv_qty'					: sm[i].data.NEED_IV_QTY
	//		});
	//		storeTempInvoice.add(rec);
	//	}
	//	this.lookupReference('ItemCount').setValue(i);
	//
	//	var v_gpcode = '';
	//	var v_gpcode_name = '';
	//	var sm = grid_gpinfo.getSelection();
	//
	//	for(var i = 0; i < sm.length; i++) {	//sm[i].data
	//		v_gpcode += sm[i].data.gpcode+',';
	//		v_gpcode_name += sm[i].data.gpcode_name+',';
	//	}
	//
	//	v_gpcode = v_gpcode.substr(0,v_gpcode.length-1)
	//	v_gpcode_name = v_gpcode_name.substr(0,v_gpcode_name.length-1);
	//
	//
	//	var gpinfo_sm = grid_gpinfo.getSelectionModel().getSelection()[0];
	//	gpinfo_sm.data.gpcode = v_gpcode;
	//	gpinfo_sm.data.iv_name = v_gpcode_name;
	//	Ext.getCmp('winMakeInvoiceForm').loadRecord(gpinfo_sm);
	//
	//	win.setTitle(v_gpcode_name+'"공구건에 대한 발주 입력폼');
	//
	//	var button = Ext.get('btn_invoice');
	//	button.dom.disabled = true;
	//	//this.container.dom.style.visibility=true
	//
	//
	//	if (win.isVisible()) {
	//		win.hide(this, function() {
	//			button.dom.disabled = false;
	//		});
	//	} else {
	//		win.show(this, function() {
	//			button.dom.disabled = false;
	//		});
	//	}
	//
	//	grid_win.reconfigure(storeTempInvoice);
	//
	//},
	//
	////발주서에 선택된것들 추가
	//addMakeInvoice : function() {
	//	var grid_gpinfo = Ext.getCmp('InvoiceGplist').down("[name=InvoiceGpList]"),
	//			grid_orderitems = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceOrderItemList]");
	//
	//	if( grid_gpinfo.getSelectionModel().getSelection() == '' ) {
	//		Ext.Msg.alert('알림','좌측 공동구매 항목을 선택하세요');
	//		return false;
	//	}
	//
	//	/*선택된 품목들 */
	//	var sm = grid_orderitems.getSelection();
	//	if( sm == '' ) {
	//		Ext.Msg.alert('알림','상품들을 선택해주세요');
	//		return false;
	//	}
	//
	//	var win = this.lookupReference('winMakeInvoice');
	//	if (!win) {
	//		win = new td.view.invoice.winMakeInvoice();
	//		win.x = -400;
	//		win.y = -100;
	//		this.getView().add(win);
	//	}
	//
	//	var grid_win = win.down("[name=MakeInvoiceList]"),
	//			store = grid_win.store,
	//			cnt = store.getCount();
	//
	//	for(var i = 0; i < sm.length; i++) {
	//		var rec = Ext.create('td.model.InvoiceItem', {
	//			'gpcode'					: sm[i].data.gpcode,
	//			'iv_it_id'				: sm[i].data.it_id,
	//			'iv_it_name'			: sm[i].data.it_name,
	//			'iv_dealer_price'	: sm[i].data.it_org_price,
	//			'total_price'			: sm[i].data.total_price,
	//			'iv_qty'					: sm[i].data.NEED_IV_QTY
	//		});
	//		store.add(rec);
	//	}
	//	grid_win.reconfigure(store);
	//	this.lookupReference('ItemCount').setValue(cnt+i);
	//},
	//
	////일괄수정
	//updateInvoiceQty : function() {
	//	var win = this.lookupReference('winMakeInvoice');
	//	var store = win.down("[name=MakeInvoiceList]").store;
	//	var cnt = store.getCount();
	//	var v_qty = this.lookupReference('InvoiceQty').getValue();
	//
	//	for(var i = 0; i < cnt; i++) {
	//		store.getData().getAt(i).set('iv_qty',v_qty);
	//	}
	//},
	//
	////인쇄
	//printWinMakeInvoice : function() {
	//	var win = this.lookupReference('winMakeInvoice');
	//	var grid_win = win.down("[name=MakeInvoiceList]");
	//	Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' INVOICE LIST';
	//	Ext.ux.grid.Printer.print(grid_win);
	//},
	//
	////취소
	//closeWinMakeInvoice : function() {
	//	var win = this.lookupReference('winMakeInvoice');
	//	Ext.getCmp('winMakeInvoiceForm').getForm().reset();
	//	win.hide();
	//},
	//
	////기록
	//submitWinMakeInvoice : function() {
	//	this.lookupReference('BtnSubmitInvoice').hide();
	//	var win = this.lookupReference('winMakeInvoice');
	//	var grid_win = win.down("[name=MakeInvoiceList]");
	//
	//	var jsonData = "[";
	//	var cnt = grid_win.getStore().data.items.length;
	//	var form = Ext.getCmp('winMakeInvoiceForm');
	//
	//	for(var i = 0; i < cnt; i++) {
	//		jsonData += Ext.encode(grid_win.getStore().data.items[i].data)+",";
	//	}
	//
	//	jsonData = jsonData.substring(0,jsonData.length-1) + "]";
	//
	//	form.submit({
	//		params : {	mode : 'new',
	//			grid : jsonData
	//		},
	//		success : function(form,action) {
	//			Ext.Msg.alert('기록완료', action.result.message);
	//			form.reset();
	//			grid_win.getStore().removeAll();
	//			//grid_orderitems.getStore().load();//발주대상 주문품목들 리로딩
	//			//grid_invoiceTodoClearance.getStore().load();//통관예정발주서 리로딩
	//			win.hide();
	//			Ext.getCmp('BtnSubmitInvoice').show();
	//		},
	//		failure : function (form, action) {
	//			Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
	//			Ext.getCmp('BtnSubmitInvoice').show();
	//		}
	//	});
	//}


});