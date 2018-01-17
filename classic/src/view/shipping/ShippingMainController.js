Ext.define('td.view.shipping.ShippingMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.ShippingMainController',
	popup:{},

	//공구선택 초기화
	resetGpInfo : function (btn,e) {
		var grid_gpinfo = Ext.getCmp("shipping_mbinfo").down("[name=ShippingGpInfoList]");
		grid_gpinfo.getSelectionModel().deselectAll();
	},

	searchGpinfo: function(btn,e){
		if(e.keyCode == 13){
			var grid_gpinfo = Ext.getCmp("shipping_mbinfo").down("[name=ShippingGpInfoList]");
			var v_keyword = this.lookupReference('gpKeyword').getValue();

			grid_gpinfo.store.loadData([],false);
			Ext.apply(grid_gpinfo.store.getProxy().extraParams, {keyword : v_keyword });
			grid_gpinfo.store.load();
		}
	},

	//공구목록 위 조회버튼 클릭
	selGpinfoMemberList : function(btn,e){
		var grid_gpinfo = Ext.getCmp("shipping_mbinfo").down("[name=ShippingGpInfoList]");
		var grid_mblist = Ext.getCmp("shipping_mbinfo").down("[name=ShippingMbList]");
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var grid_shipedlist = Ext.getCmp("shipping_orderlist").down("[name=ShipedOrderList]");


		grid_mblist.store.loadData([],false);
		grid_orderlist.store.loadData([],false);
		grid_shipedlist.store.loadData([],false);

		/* 공구목록 선택된 레코드 */
		var sm = grid_gpinfo.getSelectionModel().getSelection();

		if(sm) {
			var v_gpcode = '';
			var v_keyword = '';
			v_keyword = this.lookupReference('gpKeyword').getValue();

			for(var i = 0; i < sm.length; i++) {	//sm[i].data
				v_gpcode += "'"+sm[i].data.gpcode + "',";
			}
			v_gpcode = v_gpcode.substr(0,v_gpcode.length-1);

			var params = {
				gpcode : v_gpcode,
				keyword : v_keyword
			}

			/* >>회원정보 리프레시 */
			Ext.apply(grid_mblist.store.getProxy().extraParams, params);
			grid_mblist.store.load();
		}

	},

	//회원 키워드 검색
	searchMember: function(btn,e){
		if(e.keyCode == 13){
			var grid = Ext.getCmp("shipping_mbinfo").down("[name=ShippingMbList]");
			var v_keyword = this.lookupReference('mbKeyword').getValue();

			grid.store.loadData([],false);
			grid.store.currentPage = 1;

			Ext.apply(grid.store.getProxy().extraParams, {keyword : v_keyword });
			grid.store.load();
		}
	},

	//우체국 엑셀추출
	openWinExportShippingMember : function(btn,e) {
		var win = this.lookupReference('winExportShippingMember');
		if (!win) {
			win = new td.view.shipping.winExportShippingMember();
			//win.y = -450;
			this.getView().add(win);
		}

		if (win.isVisible()) {
			win.hide(this, function() {
				//btn.disabled = false;
			});
		} else {
			win.show(this, function() {
				//btn.disabled = true;
			});
		}
	},

	//우체국엑셀 추출
	submitWinExportShippingMember : function(btn,e){
		var win = this.lookupReference('winExportShippingMember'),
			sb = this.lookupReference('sb_shipping'),
			form = Ext.getCmp('winExportShippingMemberForm');

		sb.showBusy('- 추출 중... -');
		var list_od_id = this.lookupReference('list_od_id').getValue();
		var list_nick = this.lookupReference('list_nick').getValue();
		window.open("/resources/excel/shippingmember.php?list_od_id="+list_od_id+"&list_nick="+list_nick, "_blank", "height=230, width=450,toolbar=no,scrollbars=no,menubar=no");

		sb.setStatus({
			text: '- 추출완료 -',
			iconCls: '',
			clear: true
		});
	},

	//그레이딩코드 작성 팝업 닫기
	closeWinExportShippingMember : function(btn,e){
		var win = Ext.ComponentQuery.query('winExportShippingMember')[0];
		win.hide();
	},


	selMbLoadShippingList: function(view, records) {
		var grid_mblist = Ext.getCmp("shipping_mbinfo").down("[name=ShippingMbList]");
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var grid_shipedlist = Ext.getCmp("shipping_orderlist").down("[name=ShipedOrderList]");

		grid_orderlist.store.loadData([],false);
		grid_shipedlist.store.loadData([],false);


		/* 선택된 레코드 */
		var sm = grid_mblist.getSelectionModel().getSelection()[0];

		if(sm) {
			grid_orderlist.setTitle('> "'+sm.get('mb_nick')+'"님의 배송예정 목록');
			grid_shipedlist.setTitle('> "'+sm.get('mb_nick')+'"님의 배송완료 목록');
			//Ext.getCmp('hf_hphone').setValue(sm.get('hphone'));

			//페이징초기화
			grid_orderlist.store.currentPage = 1;
			grid_shipedlist.store.currentPage = 1;

			/* >>주문내역 리프레시 */
			Ext.apply(grid_orderlist.store.getProxy().extraParams, sm.data);
			Ext.apply(grid_shipedlist.store.getProxy().extraParams, sm.data);


			grid_orderlist.store.load();
			grid_shipedlist.store.load();
		}
		else {
			var v_param = {
				hphone : '',
				name : '',
				mb_nick : '',
				mb_name : ''
			}
			Ext.apply(grid_orderlist.store.getProxy().extraParams, v_param);
			Ext.apply(grid_shipedlist.store.getProxy().extraParams, v_param);
		}
	},

	//통계컬럼들 보기
	showStatistics: function(btn,e){
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");

		for(var i=0; i < grid_orderlist.columns.length; i++) {
			if(grid_orderlist.columns[i].groupIndex == 1) {
				grid_orderlist.columns[i].show();
			}
			if(grid_orderlist.columns[i].groupIndex == 2) {
				grid_orderlist.columns[i].hide();
			}
		}
	},
	//통계컬럼들 숨기기
	hideStatistics: function(btn,e){
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		for(var i=0; i < grid_orderlist.columns.length; i++) {
			if(grid_orderlist.columns[i].groupIndex == 1) {
				grid_orderlist.columns[i].hide();
			}
			if(grid_orderlist.columns[i].groupIndex == 2) {
				grid_orderlist.columns[i].show();
			}
		}
	},
	//품목별 메모 일괄 수정
	editItemMemo : function(btn,e){
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var sm = grid_orderlist.getSelectionModel().getSelection();

		if(sm.length) {
			for(var i = 0; i < sm.length; i++) {
				sm[i].set('it_memo',this.getValue());
			}
		}
		else {

		}
	},


	//배송예정 목록 추출
	exportShippinglist : function(btn,e){
		//var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var win = this.lookupReference('winShippingExport');
		if (!win) {
			win = new td.view.shipping.winShippingExport();
			this.getView().add(win);
		}
		var grid = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");



		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','상품들을 선택해주세요');
			return false;
		}


		var mblist_sm = grid.getSelectionModel().getSelection()[0];
		win.setTitle(mblist_sm.get('clay_id')+'('+mblist_sm.get('name')+')님의 배송예정 목록');

		var winGrid = win.down("[name=ShippingExportList]");
		var btn = this.lookupReference('BtnExportShipping');
		var store = Ext.create('td.store.ShippingExportList');

		store.loadData([],false);
		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('ShippingExport', {
				'taskId'				:	sm[i].data.taskId,
				'projectId'			:	sm[i].data.projectId,
				'project'				:	sm[i].data.project,
				'buyer'					: sm[i].data.buyer,
				'number'				:	sm[i].data.number,
				'gpcode'				:	sm[i].data.gpcode,
				'gpcode_name'		:	sm[i].data.gpcode_name,
				'gpstats'				:	sm[i].data.gpstats,
				'gpstats_name'	:	sm[i].data.gpstats_name,
				'od_id'					:	sm[i].data.od_id,
				'clay_id'				:	sm[i].data.clay_id,
				'location'			:	sm[i].data.location,
				'stats'					:	sm[i].data.stats,
				'stats_name'		:	sm[i].data.stats_name,
				'gp_img'				:	sm[i].data.gp_img,
				'it_id'					:	sm[i].data.it_id,
				'it_name'				:	sm[i].data.it_name,
				'it_org_price'	:	sm[i].data.it_org_price,
				'it_qty'				:	sm[i].data.it_qty,
				'total_price'		:	sm[i].data.total_price,
				'od_date'				:	sm[i].data.od_date
			});
			store.add(rec);
		}


		//var button = Ext.get('BtnExportShipping');
		btn.disabled = true;
		//this.container.dom.style.visibility=true

		if (win.isVisible()) {
			win.hide(this, function() {
				btn.disabled = false;
			});
		} else {
			win.show(this, function() {
				btn.disabled = false;
			});
		}

		winGrid.reconfigure(store);
	},

	//배송완료 추출
	exportShipedList : function(btn,e){
		//var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var win = this.lookupReference('winShippingExport');
		if (!win) {
			win = new td.view.shipping.winShippingExport();
			win.y = -450;
			this.getView().add(win);
		}
		var grid = Ext.getCmp("shipping_orderlist").down("[name=ShipedOrderList]");

		var sm = grid.getSelection();
		if( sm == '' ) {
			Ext.Msg.alert('알림','상품들을 선택해주세요');
			return false;
		}


		var mblist_sm = grid.getSelectionModel().getSelection()[0];
		win.setTitle(mblist_sm.get('clay_id')+'('+mblist_sm.get('name')+')님의 배송완료 목록');

		var winGrid = win.down("[name=ShippingExportList]");
		var btn = this.lookupReference('BtnExportShiped');
		var store = Ext.create('td.store.ShippingExportList');

		store.loadData([],false);
		for(var i = 0; i < sm.length; i++) {
			var rec = Ext.create('ShippingExport', {
				'taskId'				:	sm[i].data.taskId,
				'projectId'			:	sm[i].data.projectId,
				'project'				:	sm[i].data.project,
				'buyer'					: sm[i].data.buyer,
				'number'				:	sm[i].data.number,
				'gpcode'				:	sm[i].data.gpcode,
				'gpcode_name'		:	sm[i].data.gpcode_name,
				'gpstats'				:	sm[i].data.gpstats,
				'gpstats_name'	:	sm[i].data.gpstats_name,
				'od_id'					:	sm[i].data.od_id,
				'clay_id'				:	sm[i].data.clay_id,
				'stats'					:	sm[i].data.stats,
				'stats_name'		:	sm[i].data.stats_name,
				'gp_img'				:	sm[i].data.gp_img,
				'it_id'					:	sm[i].data.it_id,
				'it_name'				:	sm[i].data.it_name,
				'it_org_price'	:	sm[i].data.it_org_price,
				'it_qty'				:	sm[i].data.it_qty,
				'total_price'		:	sm[i].data.total_price,
				'od_date'				:	sm[i].data.od_date
			});
			store.add(rec);
		}


		if (win.isVisible()) {

			win.hide(this, function() {
				btn.disabled = false;
			});
		} else {
			win.show(this, function() {
				btn.disabled = true;
			});
		}

		winGrid.reconfigure(store);
	},

	//추출된 배송예정 목록 인쇄
	printShippingExport: function() {
		var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
		var grid = this.lookupReference('ShippingExportListForm').down("[name=ShippingExportList]");

		var smt = grid_orderlist.getSelectionModel().getSelection()[0];

		//Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d g:i:s') +' 발주목록';

		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d H:i:s ') + smt.get('clay_id')+'('+smt.get('name')+')님의 발송목록';

		var sm = grid_orderlist.getSelection();
		var tag_list = new Array();
		var text = '';

		for(var i = 0; i < sm.length; i++) {
			var memo = '';

			if(sm[i].data.memo) {
				memo += ' [*구매자메모: ' + sm[i].data.memo + ']';
			}
			if(sm[i].data.admin_memo) {
				memo += ' [*관리자메모: ' + sm[i].data.admin_memo+']';
			}

			tag_list[sm[i].data.od_id] = (sm[i].data.od_id + memo + '<br>');
		}

		for( var i in tag_list) {
			text += tag_list[i];
		}

		Ext.ux.grid.Printer.tag = text;
		Ext.ux.grid.Printer.print(grid);
	},

	cancelExportShipping : function() {
		var win = this.lookupReference('winShippingExport');
		var frm = this.lookupReference('ShippingExportListForm');
		frm.getForm().reset();
		win.hide();
	},

	toggleShippingSummaryText: function() {
		var grid = this.lookupReference('ShippingExportListForm').down("[name=ShippingExportList]");
		//grid.getView().getFeature('group').toggleSummaryRow();
		if(grid.getView().features[0].showSummaryRow == true) {
			grid.getView().features[0].showSummaryRow = false;
		}
		else {
			grid.getView().features[0].showSummaryRow = true;
		}

		var win = this.lookupReference('winShippingExport');
	},

	//상태변경
	updateOrderStats : function(btn,e){
		var grid = this.lookupReference('ShippingExportListForm').down("[name=ShippingExportList]");
		var v_stats = this.lookupReference('shippingstats').getValue();
		var win = this.lookupReference('winShippingExport'),
				sb = this.lookupReference('sb_shipping');

		/* 주문목록 일괄 상태값 변경 */
		var jsonData = "[";
		var cnt = grid.store.data.items.length;
		var form = this.lookupReference('ShippingExportListForm');


		for(var i = 0; i < cnt; i++) {
			jsonData += Ext.encode(grid.store.data.items[i].data)+",";
		}

		jsonData = jsonData.substring(0,jsonData.length-1) + "]";

		sb.showBusy('- 저장 중... -');
		form.submit({
			target : '',
			params : {
				mode  : 'statsUpdate',
				grid : jsonData,
				stats : v_stats
			},
			success : function(form,action) {
				sb.setStatus({
					text: '- 저장완료! -',
					iconCls: '',
					clear: true
				});

				var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
				var grid_shipedlist = Ext.getCmp("shipping_orderlist").down("[name=ShipedOrderList]");

				Ext.Msg.alert('변경완료', action.result.message);

				form.reset();
				grid.store.removeAll();
				grid_orderlist.store.load();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});

	},

	//운송장갱신
	updateDeliveryInvoice : function(btn,e) {
		var win = this.lookupReference('winShippingExport'),
			grid = this.lookupReference('ShippingExportListForm').down("[name=ShippingExportList]"),
			sb = this.lookupReference('sb_shipping');

		var v_no = this.lookupReference('delivery_invoice').getValue(),
			v_refund_money = this.lookupReference('refund_money').getValue();

		var jsonData = "[";
		var cnt = grid.store.data.items.length;
		var form = this.lookupReference('ShippingExportListForm');

		for(var i = 0; i < cnt; i++) {
			jsonData += Ext.encode(grid.store.data.items[i].data)+",";
		}

		jsonData = jsonData.substring(0,jsonData.length-1) + "]";

		sb.showBusy('- 저장 중... -');
		form.submit({
			target : '',
			params : {
				mode : 'deliveryUpdate',
				grid : jsonData,
				delivery_invoice : v_no,
				refund_money : v_refund_money
			},
			success : function(form,action) {
				sb.setStatus({
					text: '- 저장완료! -',
					iconCls: '',
					clear: true
				});

				var grid_orderlist = Ext.getCmp("shipping_orderlist").down("[name=ShippingOrderList]");
				var grid_shipedlist = Ext.getCmp("shipping_orderlist").down("[name=ShipedOrderList]");

				Ext.Msg.alert('변경완료', action.result.message);
				form.reset();
				grid.store.removeAll();
				grid_orderlist.store.load();
				grid_shipedlist.store.load();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	},

	//팝업창 취소
	cancelExportShipping : function(btn,e) {
		var win = this.lookupReference('winShippingExport');
		var form = this.lookupReference('ShippingExportListForm');

		form.reset();
		win.hide();
	}


});