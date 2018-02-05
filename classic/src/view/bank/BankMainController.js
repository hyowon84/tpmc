Ext.define('td.view.bank.BankMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.BankMainController',
	popup:{},

	//레코드 정보 변경
	updateBankInfo: function(btn,e) {
		var sm = Ext.getCmp('BankList').down("[name=BankStatement]").getSelection();
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
				Ext.getCmp('BankList').down("[name=BankStatement]").store.sync();
			}
		}, function(){

		});
	},

	//입출금내역 인쇄
	printBankPage : function(btn,e) {
		Ext.ux.grid.Printer.mainTitle = '입출금 내역';
		Ext.ux.grid.Printer.print(Ext.getCmp('BankList').down("[name=BankStatement]"));
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
	selectBankDataLoadOrders : function(view, records) {
		var grid = Ext.getCmp('BankList').down("[name=BankStatement]");
		var sm = grid.getSelectionModel().getSelection()[0];

		var store_banklinklist = Ext.getCmp('BankOrder').down("[name=BankLinkOrder]").getStore();
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
				'mode'		:	'banklinklist',
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
	},

	//연결된 주문내역 키워드 검색
	searchBankLinkKeyword : function(t,e) {
		if(e.keyCode == 13){
			var v_param = {
				keyword : this.lookupReference('banklink_keyword').getValue()
			}

			var grid_banklinklist = Ext.getCmp('BankOrder').down("[name=BankLinkOrder]");
			Ext.apply(grid_banklinklist.store.getProxy().extraParams, v_param);
			//Ext.getCmp('ptb_banklinklist').moveFirst();
			grid_banklinklist.store.currentPage = 1;
			grid_banklinklist.store.load();
		}
	},

	//버튼의 stats 값에 따라 상태값 변경
	updateLinkBankdata : function(btn, e) {
		var grid_banklist = Ext.getCmp('BankList').down("[name=BankStatement]"),
				grid_banklinklist = Ext.getCmp('BankOrder').down("[name=BankLinkOrder]"),
				v_title = '';

		switch(btn.stats) {
			case 'B01':
				v_title = "입금처리";
				v_odstats = '20';
				break;
			case 'B07':
				v_title = "환불처리";
				v_odstats = '90';
				break;
			default:
				break;
		}

		var sm_bank = grid_banklist.getSelectionModel().getSelection()[0],
				sm_od = grid_banklinklist.getSelectionModel().getSelection()[0];


			if( sm_od == '' || sm_bank == '') {
			Ext.Msg.alert('알림','입출금내역과 주문내역을 선택해주세요');
			return false;
		}

		if(sm_od && sm_bank) {
			var sm_bank = grid_banklist.getSelection();
			var sm_od = grid_banklinklist.getSelection();

			var v_odid_list = '';
			var v_BankList = '';
			var v_prev_od_id = '';
			var msg_odid_list = '';

			for(var i = 0; i < sm_od.length; i++) {	//sm[i].data
				/*중복주문번호에 대해서는 중복발송 방지위해 필터링*/
				if(sm_od[i].data.od_id == v_prev_od_id) continue;

				v_odid_list += sm_od[i].data.od_id + ",";
				msg_odid_list += sm_od[i].data.od_id + "<br>";
				v_prev_od_id = sm_od[i].data.od_id;
			}
			v_odid_list = v_odid_list.substr(0,v_odid_list.length-1);

			for(var i = 0; i < sm_bank.length; i++) {	//sm[i].data
				v_BankList += '"'+sm_bank[i].data.trader_name + "의 입금("+Ext.util.Format.number(sm_bank[i].data.input_price, "0,000")+"원), 출금("+Ext.util.Format.number(sm_bank[i].data.output_price, "0,000")+"원)\", <br>";
			}



			var msg = v_BankList + "<br>위 내역에 대한 연결될 주문번호는 아래와 같습니다<br>"+ msg_odid_list;

			Ext.MessageBox.confirm(v_title, msg, function(btn, text) {
				if(btn == 'yes') {
					for(var i = 0; i < sm_bank.length; i++) {	//sm[i].data
						sm_bank[i].set('bank_type', btn.stats);	//상품주문
						sm_bank[i].set('admin_link', v_odid_list);
					}
					grid_banklist.store.sync();

					for(var i = 0; i < sm_od.length; i++) {	//sm[i].data
						sm_od[i].set('stats',v_odstats);
					}

				}
			}, function(){

			});
		}
	},

	//환불제외 로딩 버튼의 내부 값에 따라 분기
	loadingExceptRefund : function (btn, e) {
		var grid = Ext.getCmp('BankOrder').down("[name=BankLinkOrder]");

		var v_param = {
			except_refund : btn.except_refund
		}
		Ext.apply(grid.getStore().getProxy().extraParams, v_param);
		grid.getStore().load();
	},


	//SMS 전송
	sendSms : function() {
		var grid_banklinklist = Ext.getCmp('BankOrder').down("[name=BankLinkOrder]");

		var sm = grid_banklinklist.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','주문내역들을 선택해주세요');
			return false;
		}

		store_winSms.removeAll();
		var v_prev_od_id;

		for(var i = 0; i < sm.length; i++) {
			sm[i].data.message = v_SmsMsg[sm[i].data.stats];

			//중복주문번호에 대해서는 중복발송 방지위해 필터링
			if(sm[i].data.od_id == v_prev_od_id) continue;

			var stats = sm[i].data.stats;
			if( (stats >= 10 && stats <= 40) || stats == 90)
				stats = stats;
			else
				stats = '';

			var rec = Ext.create('model.SmsSendForm', {
				'stats'			: stats,
				'message'		: sm[i].data.message,
				'nickname'		: sm[i].data.nickname,
				'name'			: sm[i].data.name,
				'hphone'			: sm[i].data.hphone,
				'od_id'			: sm[i].data.od_id,
				'TOTAL_PRICE'	: sm[i].data.TOTAL_PRICE,
				'it_name'		: sm[i].data.it_name
			});
			store_winSms.add(rec);

			v_prev_od_id = sm[i].data.od_id;
		}


		var button = Ext.get('sendSMS');
		button.dom.disabled = true;
		//this.container.dom.style.visibility=true

		if (winSmsForm.isVisible()) {
			winSmsForm.hide(this, function() {
				button.dom.disabled = false;
			});
		} else {
			winSmsForm.show(this, function() {
				button.dom.disabled = false;
			});
		}

		//grid_winSms.reconfigure(store_winSms);

	}

	
});