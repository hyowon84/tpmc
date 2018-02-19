Ext.define('td.view.grading.GradingMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.GradingMainController',

	//그레이딩목록 키워드 검색
	searchGradingInfo : function(t,e){
		//
		//var win = this.lookupReference('winMakeInvoice'),
		//	grid_win = win.down("[name=MakeInvoiceList]"),
		//	grid_item = Ext.getCmp('InvoiceOrderItemList').down("[name=InvoiceOrderItemList]"),
		////grid_todo = Ext.getCmp('WireInvoice').down("[name=WireTodoInvoiceList]"),
		//	form = Ext.getCmp('winMakeInvoiceForm'),
		//	btn = this.lookupReference('BtnSubmitInvoice'),
		//	cnt = grid_win.getStore().data.items.length,
		//	jsonData = "[";

		if(e.keyCode == 13){
			var grid_grinfo = Ext.getCmp('grading_mbinfo').down("[name=GradingInfoList]");

			grid_grinfo.store.loadData([],false);
			Ext.apply(grid_grinfo.store.getProxy().extraParams, { keyword : this.lookupReference('grading_keyword').getValue() });
			grid_grinfo.store.load();
		}
	},

	//그레이딩목록 위 조회버튼 클릭
	searchGradingMember : function(btn,e){
		var grid_grinfo = Ext.getCmp('grading_mbinfo').down("[name=GradingInfoList]"),
		grid_grmb = Ext.getCmp('grading_mbinfo').down("[name=GradingMbList]"),
		grid_grod = Ext.getCmp('grading_orderlist').down("[name=GradingOrderList]");


		grid_grmb.store.loadData([],false);
		grid_grod.store.loadData([],false);

		/* 공구목록 선택된 레코드 */
		var sm = grid_grinfo.getSelectionModel().getSelection();

		if(sm) {
			var v_grcode = '';
			var v_keyword = '';
			v_keyword = this.lookupReference('grading_keyword').getValue();

			for(var i = 0; i < sm.length; i++) {	//sm[i].data
				v_grcode += "'"+sm[i].data.grcode + "',";
			}
			v_grcode = v_grcode.substr(0,v_grcode.length-1);

			var params = {
				grcode : v_grcode,
				keyword : v_keyword
			}

			/* >>회원정보 리프레시 */
			Ext.apply(grid_grmb.store.getProxy().extraParams, params);
			grid_grmb.store.load();
		}

	},

	//그레이딩 신청서 입력 팝업 열기
	openWinImportExcelGrading : function(btn,e){
		var win = this.lookupReference('winImportExcelGrading');
		if (!win) {
			win = new td.view.grading.winImportExcelGrading();
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

	//그레이딩코드 작성 팝업
	openWinMakeGrading : function(btn,e){

		var win = this.lookupReference('winMakeGrading');
		if (!win) {
			win = new td.view.grading.winMakeGrading();
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

	//그레이딩코드 작성 팝업 닫기
	closeWinMakeGrading : function(btn,e){
		var win = Ext.ComponentQuery.query('winMakeGrading')[0];
		win.hide();
	},


	//그레이딩코드 삭제
	deleteGrading : function(btn,e) {
		Ext.MessageBox.confirm('그레이딩정보 삭제', "현재 선택된 그레이딩 정보들을 삭제합니다.", function(btn, text) {
			if(btn == 'yes') {
				var grid = Ext.getCmp('grading_mbinfo').down("[name=GradingInfoList]");
				var sm = grid.getSelectionModel().getSelection();

				if(sm.length) {
					for(var i = 0; i < sm.length; i++) {
						grid.store.remove(sm[i]);
					}
					grid.store.sync();
				}
			}
		}, function(){

		});
	},

	//그레이딩 작성 정보 입력
	submitWinMakeGrading : function(btn,e){
		var win = this.lookupReference('winMakeGrading'),
			sb = this.lookupReference('sb_grading'),
			form = Ext.getCmp('winMakeGradingForm');
		grid = Ext.getCmp('grading_mbinfo').down("[name=GradingInfoList]");

		sb.showBusy('- 저장 중... -');
		form.submit({
			target : '',
			params : {
				mode : 'insert'
			},
			success : function(form,action) {
				sb.setStatus({
					text: '- 입력완료! -',
					iconCls: '',
					clear: true
				});

				Ext.Msg.alert('입력완료', action.result.message);
				form.reset();
				win.hide();
				grid.store.load();
			},
			failure : function (form, action) {
				Ext.Msg.alert('입력실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	},


	//그레이딩 회원 검색
	searchGradingMemberKeyword : function(t,e){
		if(e.keyCode == 13){

			grid_mbinfo.store.loadData([],false);
			Ext.apply(grid_mbinfo.store.getProxy().extraParams, {keyword : this.getValue()});
			grid_mbinfo.store.load();
		}
	},


	selMbLoadGradingList : function(btn,e){
		var grid_mblist = Ext.getCmp('grading_mbinfo').down("[name=GradingMbList]");
		var grid_grading = Ext.getCmp('grading_orderlist').down("[name=GradingOrderList]");
		var grid_graded = Ext.getCmp('grading_orderlist').down("[name=GradedOrderList]");

		grid_grading.store.loadData([],false);
		grid_graded.store.loadData([],false);


		/* 회원목록의 선택된 레코드 */
		var sm = grid_mblist.getSelectionModel().getSelection()[0];


		if(sm) {
			grid_grading.setTitle('> "'+sm.get('gr_nickname')+'"님의 진행중인 목록');
			grid_graded.setTitle('> "'+sm.get('gr_nickname')+'"님의 완료 목록');
			//Ext.getCmp('hf_hphone').setValue(sm.get('hphone'));

			/* >>주문내역 리프레시 */
			Ext.apply(grid_grading.store.getProxy().extraParams, sm.data);
			Ext.apply(grid_graded.store.getProxy().extraParams, sm.data);

			grid_grading.store.load();
			grid_graded.store.load();
		}
		else {
			var v_param = {
				hphone : '',
				name : '',
				mb_nick : '',
				mb_name : ''
			}

			Ext.apply(grid_grading.store.getProxy().extraParams, v_param);
			Ext.apply(grid_graded.store.getProxy().extraParams, v_param);
		}

	},

	//그레이딩 신청서 입력 팝업 등록버튼
	submitImportGrading : function(f,e){
		var win = this.lookupReference('winImportExcelGrading'),
				sb = this.lookupReference('sb_grading'),
				form = this.lookupReference('ImportExcelGradingForm');

		sb.showBusy('- 저장 중... -');
		form.submit({
			target : '',
			params : {
				mode : 'import'
			},
			success : function(form,action) {
				sb.setStatus({
					text: '- 저장완료! -',
					iconCls: '',
					clear: true
				});

				Ext.Msg.alert('변경완료', action.result.message);
				form.reset();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	},

	//그레이딩 신청서 입력 팝업 취소버튼
	closeImportGrading : function(f,e) {
		var win = Ext.ComponentQuery.query('winImportExcelGrading')[0];
				form = this.lookupReference('ImportExcelGradingForm');

		form.reset();
		win.hide();
	},

	//그레이딩예정목록 선택레코드 추출
	exportGradingList : function(btn,e){

		var win = this.lookupReference('winGradingExport');
		if (!win) {
			win = new td.view.grading.winGradingExport();
			//win.y = -450;
			this.getView().add(win);
		}

		if (win.isVisible()) {
			win.hide(this, function() {
			});
		} else {
			win.show(this, function() {
				var grid = Ext.getCmp("grading_orderlist").down("[name=GradingOrderList]");

				var sm = grid.getSelection();
				if( sm == '' ) {
					Ext.Msg.alert('알림','그레이딩 목록을 선택해주세요');
					return false;
				}

				var mblist_sm = grid.getSelectionModel().getSelection()[0];
				win.setTitle(mblist_sm.get('gr_nickname')+'('+mblist_sm.get('gr_name')+')님의 그레이딩 예정 목록');

				var winGrid = win.down("[name=GradingExportList]");
				var store = Ext.create('td.store.GradingExportList');

				store.loadData([],false);
				for(var i = 0; i < sm.length; i++) {
					var rec = Ext.create('ShippingExport', {
						'project'				: sm[i].data.project,
						'no'      			: sm[i].data.no,
						'grcode'    	  : sm[i].data.grcode,
						'gr_id'     	  : sm[i].data.gr_id,
						'gr_stats_name' : sm[i].data.gr_stats_name,
						'gr_no'     	  : sm[i].data.gr_no,
						'gr_name'   	  : sm[i].data.gr_name,
						'gr_nickname'		: sm[i].data.gr_nickname,
						'gr_country' 		: sm[i].data.gr_country,
						'gr_it_name' 		: sm[i].data.gr_it_name,
						'gr_qty'      	: sm[i].data.gr_qty,
						'gr_unit'    		: sm[i].data.gr_unit,
						'gr_weight'   	: sm[i].data.gr_weight,
						'gr_metal'    	: sm[i].data.gr_metal,
						'gr_parvalue' 	: sm[i].data.gr_parvalue,
						'gr_year'     	: sm[i].data.gr_year,
						'gr_note1'    	: sm[i].data.gr_note1,
						'gr_note2'    	: sm[i].data.gr_note2,
						'reg_date'    	: sm[i].data.reg_date
					});
					store.add(rec);
				}

				winGrid.reconfigure(store);
			});
		}
	},

	//배송완료된 그레이딩목록 추출
	exportGradedList : function(btn,e){

		var win = this.lookupReference('winGradingExport');
		if (!win) {
			win = new td.view.grading.winGradingExport();
			win.y = -450;
			this.getView().add(win);
		}

		if (win.isVisible()) {
			win.hide(this, function() {
			});
		} else {
			win.show(this, function() {
				var grid = Ext.getCmp("grading_orderlist").down("[name=GradedOrderList]");

				var sm = grid.getSelection();
				if( sm == '' ) {
					Ext.Msg.alert('알림','그레이딩 목록을 선택해주세요');
					return false;
				}

				var mblist_sm = grid.getSelectionModel().getSelection()[0];
				win.setTitle(mblist_sm.get('gr_nickname')+'('+mblist_sm.get('gr_name')+')님의 그레이딩 예정 목록');

				var winGrid = win.down("[name=GradingExportList]");
				var store = Ext.create('td.store.GradingExportList');

				store.loadData([],false);
				for(var i = 0; i < sm.length; i++) {
					var rec = Ext.create('ShippingExport', {
						'project'				: sm[i].data.project,
						'no'      			: sm[i].data.no,
						'grcode'    	  : sm[i].data.grcode,
						'gr_id'     	  : sm[i].data.gr_id,
						'gr_stats_name' : sm[i].data.gr_stats_name,
						'gr_no'     	  : sm[i].data.gr_no,
						'gr_name'   	  : sm[i].data.gr_name,
						'gr_nickname'		: sm[i].data.gr_nickname,
						'gr_country' 		: sm[i].data.gr_country,
						'gr_it_name' 		: sm[i].data.gr_it_name,
						'gr_qty'      	: sm[i].data.gr_qty,
						'gr_unit'    		: sm[i].data.gr_unit,
						'gr_weight'   	: sm[i].data.gr_weight,
						'gr_metal'    	: sm[i].data.gr_metal,
						'gr_parvalue' 	: sm[i].data.gr_parvalue,
						'gr_year'     	: sm[i].data.gr_year,
						'gr_note1'    	: sm[i].data.gr_note1,
						'gr_note2'    	: sm[i].data.gr_note2,
						'reg_date'    	: sm[i].data.reg_date
					});
					store.add(rec);
				}

				winGrid.reconfigure(store);
			});
		}
	},



	//그레이딩 목록 추출 윈도우 닫기
	closeGradingExport : function(f,e) {
		var win = this.lookupReference('winGradingExport'),
				form = this.lookupReference('GradingExportForm');

		form.reset();
		win.hide();
	},

	//그레이딩 목록 인쇄
	printGradingExport: function() {
		var grid_mb = Ext.ComponentQuery.query('GradingMbList')[0];
		var sm = grid_mb.getSelectionModel().getSelection()[0];
		Ext.ux.grid.Printer.mainTitle = Ext.util.Format.date(new Date(),'Y-m-d H:i:s ') + sm.get('gr_nickname')+'('+sm.get('gr_name')+')님의 그레이딩 목록';
		var grid = Ext.ComponentQuery.query('GradingExportList')[0];

		Ext.ux.grid.Printer.tag = 'test';
		Ext.ux.grid.Printer.print(grid);
	},

	//상태변경
	updateGradingStats : function(btn,e) {
		var grid = this.lookupReference('GradingExportForm').down("[name=GradingExportList]");
		var v_stats = this.lookupReference('GradingStats').getValue();
		var win = this.lookupReference('winGradingExport'),
				sb = this.lookupReference('sb_Grading');

		/* 주문목록 일괄 상태값 변경 */
		var jsonData = "[";
		var cnt = grid.store.data.items.length;
		var form = this.lookupReference('GradingExportForm');

		var grid_orderlist = Ext.getCmp("grading_orderlist").down("[name=GradingOrderList]");
		var grid_orderedlist = Ext.getCmp("grading_orderlist").down("[name=GradedOrderList]");


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

				Ext.Msg.alert('변경완료', action.result.message);

				form.reset();
				grid.store.removeAll();
				grid_orderlist.store.load();
				grid_orderedlist.store.load();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});

	},

	//운송장갱신
	updateShippingNo : function(btn,e) {
		var win = this.lookupReference('winGradingExport'),
				grid = this.lookupReference('GradingExportForm').down("[name=GradingExportList]"),
				sb = this.lookupReference('sb_Grading');

		var v_no = this.lookupReference('shipping_no').getValue();		//v_refund_money = this.lookupReference('refund_money').getValue()


		/* 주문목록 일괄 상태값 변경 */
		var jsonData = "[";
		var cnt = grid.store.data.items.length;
		var form = this.lookupReference('GradingExportForm');

		var grid_orderlist = Ext.getCmp("grading_orderlist").down("[name=GradingOrderList]");
		var grid_orderedlist = Ext.getCmp("grading_orderlist").down("[name=GradedOrderList]");


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
				delivery_invoice : v_no
			},
			success : function(form,action) {
				sb.setStatus({
					text: '- 저장완료! -',
					iconCls: '',
					clear: true
				});


				Ext.Msg.alert('변경완료', action.result.message);
				form.reset();
				grid.store.removeAll();
				grid_orderlist.store.load();
				grid_orderedlist.store.load();
				win.hide();
			},
			failure : function (form, action) {
				Ext.Msg.alert('기록실패', action.result ? action.result.message : '실패하였습니다');
			}
		});
	}


});