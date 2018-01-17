Ext.define('td.view.order.OrderMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.OrderMainController',
	popup:{},

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
	}
});