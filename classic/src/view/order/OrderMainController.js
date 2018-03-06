Ext.define('td.view.order.OrderMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.OrderMainController',

	//주문목록 레코드 선택시 상단 주문정보, 좌측 로그정보 로딩
	selOrderLoadLogs: function(btn,e) {
		var sm = Ext.getCmp('od_odlist').down("[name=OrderList]").getSelection()[0];

		if(sm) {
			Ext.getCmp('od_odlist').setTitle('> "'+sm.get('gpcode_name')+"("+sm.get('od_id')+")"+'"의 주문정보');
			Ext.getCmp('od_logs').setTitle('> "'+sm.get('gpcode_name')+"("+sm.get('od_id')+")"+'"의 로그');

			sm.data.admin_memo = sm.data.admin_memo.replace(/<br>/gi, "\r\n");	//개행문자를 <BR>로 변경한걸 다시 원상복구
			sm.data.memo = sm.data.memo.replace(/<br>/gi, "\r\n");



			Ext.getCmp('od_form').loadRecord(sm);


			var v_param = {od_id : sm.data.od_id}
			var smslog = Ext.getCmp('od_logs').down("[name=SmsLog]").getStore();
			var banklog = Ext.getCmp('od_logs').down("[name=BankLog]").getStore();
			var odlog = Ext.getCmp('od_logs').down("[name=OrderLog]").getStore();

			smslog.loadData([],false);
			banklog.loadData([],false);
			odlog.loadData([],false);

			Ext.apply(smslog.getProxy().extraParams, v_param);
			Ext.apply(banklog.getProxy().extraParams, v_param);
			Ext.apply(odlog.getProxy().extraParams, v_param);

			smslog.load();
			banklog.load();
			odlog.load();

		} else {
			Ext.getCmp('od_odlist').setTitle('> 주문내역을 선택하세요~');
			Ext.getCmp('od_form').getForm().reset();
		}
		
	},
	
	/*날짜 단위에 해당하는 시작일,종료일 설정*/
	setDate: function(btn, e) {
		var sdate, edate;
		edate = new Date();


		switch(btn.text) {
			case '오늘':
				sdate = new Date();
				break;
			case '일주일':
				sdate = Ext.Date.add(new Date(), Ext.Date.DAY, -7);
				break;
			case '한달':
				sdate = Ext.Date.add(new Date(), Ext.Date.MONTH, -1);
				break;
			case '3개월':
				sdate = Ext.Date.add(new Date(), Ext.Date.MONTH, -3);
				break;
			default:
				sdate = new Date();
				break;
		}

		btn.up().query("[name=sdate]")[0].setValue(sdate);
		btn.up().query("[name=edate]")[0].setValue(edate);
	},

	//키워드 검색
	keywordSearch: function(btn,e){
		if(e.keyCode == 13){

			var v_params = {
				searchtype : btn.up().query("[name=cb_searchtype]")[0].getValue(),
				keyword : btn.up().query("[name=keyword]")[0].getValue(),
				stats : btn.up().query("[name=cb_stats]")[0].getValue(),
				sdate : btn.up().query("[name=sdate]")[0].rawValue,
				edate : btn.up().query("[name=edate]")[0].rawValue
			}

			var grid = Ext.getCmp('od_odlist').down("[name=OrderList]");
			grid.store.currentPage = 1;//페이징초기화
			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_params);
			grid.store.load();
		}
	},
	//우편번호찾기
	searchPostcode: function(btn,e) {

		daum.postcode.load(function(){
			new daum.Postcode({
				oncomplete: function(data) {
					// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

					// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
					// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
					var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
					var extraRoadAddr = ''; // 도로명 조합형 주소 변수

					// 법정동명이 있을 경우 추가한다.
					if(data.bname !== ''){
						extraRoadAddr += data.bname;
					}
					// 건물명이 있을 경우 추가한다.
					if(data.buildingName !== ''){
						extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
					}
					// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
					if(extraRoadAddr !== ''){
						extraRoadAddr = ' (' + extraRoadAddr + ')';
					}
					// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
					if(fullRoadAddr !== ''){
						fullRoadAddr += extraRoadAddr;
					}

					// 우편번호와 주소 정보를 해당 필드에 넣는다.
					//document.getElementById("zip").value = data.postcode1+data.postcode2;
					document.getElementsByName("zip")[0].value = data.zonecode;
					document.getElementsByName("addr1_2")[0].value = fullRoadAddr;
					document.getElementsByName("addr1")[0].value = data.jibunAddress;

					// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
					if(data.autoRoadAddress) {
						//예상되는 도로명 주소에 조합형 주소를 추가한다.
						var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
					} else if(data.autoJibunAddress) {
						var expJibunAddr = data.autoJibunAddress;
					} else {

					}
				}
			}).open();
		})
	},

	//주문관리 그리드 두번째 툴바 변경버튼
	updateOrderStats : function(btn,e) {
		var grid = Ext.getCmp('od_odlist').down("[name=OrderList]");

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		var editStats = this.lookupReference('cb_editstats').getValue();
		//var deliverytype = combo_deliverytype.getValue();
		//var cashreceipt_yn = combo_cashreceipt_yn.getValue();
		//var cashreceipt_type = combo_cashreceipt_type.getValue();
		//
		for(var i = 0; i < sm.length; i++) {
			if(editStats) sm[i].set('stats',editStats);
		//	if(deliverytype) sm[i].set('delivery_type',deliverytype);
		//	if(cashreceipt_yn) sm[i].set('cash_receipt_yn',cashreceipt_yn);
		//	if(cashreceipt_type) sm[i].set('cash_receipt_type',cashreceipt_type);
		}

	},

	printOrders :	function(btn,e) {
		var grid = Ext.getCmp('od_odlist').down("[name=OrderList]");
		var bk_store = grid.getStore();	//백업
		var store = Ext.create('td.store.OrderList');

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		sm = grid.getSelectionModel().getSelection();

		//선택된 레코드 임시 스토어에 저장해두기
		for(var i = 0; i < sm.length; i++) {
			//var rec = Ext.create('td.model.InvoiceItem', {
			//
			//});
			record = sm[i];
			rec = bk_store.getById(record.getId());
			store.add(rec);
		}

		grid.reconfigure(store);
		Ext.ux.grid.Printer.mainTitle = '선택된 주문목록';
		Ext.ux.grid.Printer.print(grid);
		grid.reconfigure(bk_store);
	},

	//단체문자 팝업 취소 버튼
	//closeWinGpSms : function(btn,e) {
	//	this.lookupReference('winGpSms').hide();
	//	Ext.getCmp('winGpSmsForm').getForm().reset();
	//},

	openWinSms : function(btn,e) {
		var win = this.lookupReference('winSms');
		var grid_odlist = Ext.getCmp('od_odlist').down("[name=OrderList]"),
				sm = grid_odlist.getSelectionModel().getSelection();

		if( !sm[0] ) {
			Ext.Msg.alert('알림','주문내역들을 선택해주세요');
			return false;
		}

		if(sm[0]) {
			if (win) {
				if(win.isVisible()) {
					win.hide(this, function () {
						//form.reset();
						this.lookupReference('winSmsForm').reset();
					});

					return;
				}
			}
			else {	//비활성 상태
				if (!win) {
					win = new td.view.order.winSms();
					//win.x = -400;
					win.y = -100;
					this.getView().add(win);
				}
			}
			this.lookupReference('winSmsForm').reset();
			var grid = this.lookupReference('SmsTemplate');


			win.show(this, function() {
				var v_prev_od_id;

				grid.store.removeAll();

				for(var i = 0; i < sm.length; i++) {
					sm[i].data.message = v_SmsMsg[sm[i].data.stats];

					/*중복주문번호에 대해서는 중복발송 방지위해 필터링*/
					if(sm[i].data.od_id == v_prev_od_id) continue;

					var stats = sm[i].data.stats;
					if( (stats >= 10 && stats <= 40) || stats == 90)
						stats = stats;
					else
						stats = '';

					var rec = Ext.create('td.model.SmsSendForm', {
						'stats'			: stats,
						'message'		: sm[i].data.message,
						'nickname'		: sm[i].data.nickname,
						'name'			: sm[i].data.name,
						'hphone'			: sm[i].data.hphone,
						'od_id'			: sm[i].data.od_id,
						'TOTAL_PRICE'	: sm[i].data.TOTAL_PRICE,
						'it_name'		: sm[i].data.it_name
					});
					grid.store.add(rec);

					v_prev_od_id = sm[i].data.od_id;
				}

			});

		}
	},

	//상태값 선택에 따른 문자메시지 예제 변경
	changeStats : function(btn,e) {
		var sm = this.lookupReference('SmsTemplate').getSelection();

		if( sm == '' ) {
			Ext.Msg.alert('알림','품목들을 선택해주세요');
			return false;
		}

		var smsStats = this.lookupReference('cb_smsex').getValue();

		for(var i = 0; i < sm.length; i++) {
			if(smsStats) sm[i].set('stats',smsStats);

			sm[i].set('message', v_SmsMsg[sm[i].data.stats]);
		}

	},

	changeMsg : function(btn,e){
		var sm = this.lookupReference('SmsTemplate').getSelection();
		var msg = this.lookupReference('msg');

		this.lookupReference('sizecnt').setValue(msg.getValue().length);

		if(sm.length) {
			for(var i = 0; i < sm.length; i++) {
				sm[i].set('message',msg.getValue());
			}
		}
		else {
		}
	},


	//function() {
	//	var smsStats = this.lookupReference('cb_stats').getValue();
	//	this.lookupReference('sms_text').setValue(v_SmsMsg[smsStats]);
	//},

	//문자내용 타이핑시 byte체크
	keyupSizeCnt : function(btn,e) {
		var sizecnt = this.lookupReference('sms_text_head').getValue().length + this.lookupReference('sms_text').getValue().length + this.lookupReference('sms_text_tail').getValue().length;
		this.lookupReference('sizecnt').setValue(sizecnt);
	},

	closeWinSms : function(btn,e) {
		this.lookupReference('winSms').hide();
		this.lookupReference('winSmsForm').reset();
	},

	submitWinSms : function(btn,e) {
		var	win =  this.lookupReference('winSms'),
				store = this.lookupReference('SmsTemplate').store,
				form = this.lookupReference('winSmsForm'),
				cnt = store.data.items.length,
				jsonData = "[";

		for(var i = 0; i < cnt; i++) {
			jsonData += Ext.encode(store.data.items[i].data)+",";
		}

		jsonData = jsonData.substring(0,jsonData.length-1) + "]";

		form.submit({
			target : '',
			params : {	mode  : 'sendSms',
				grid : jsonData
			},
			success : function(form,action) {
				Ext.Msg.alert('변경완료', action.result.message);
				form.reset();
				store.removeAll();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	}

});