/**
 * Created by lucael on 2017-03-24.
 */

/* 주문 목록 */
Ext.define('td.view.grid.OrderList',{
	extend: 'Ext.grid.Panel',
	xtype: 'OrderList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.OrderList',
		'td.view.combo.Product',
		'td.view.combo.Order'
	],
	name : 'OrderList',
	alias:'widget.OrderList',
	controller:'OrderMainController',
	selType: 'checkboxmodel',
	//selModel: Ext.create('Ext.selection.CheckboxModel'),
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.OrderList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			features: [
				{
					ftype : 'groupingsummary',
					groupHeaderTpl: '{name}',
					hideGroupedHeader: true,
					enableGroupingMenu: true,
					collapsible : false
				}
			],
			viewConfig: {
				stripeRows: true,
				getRowClass: orderStatsColorSetting,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text: '공구코드',			dataIndex: 'gpcode',								width: 100,		hidden:true	},
				{ text: 'number',				dataIndex: 'number',								width: 100,		hidden:true	},
				{ text: '공구명', 				dataIndex: 'gpcode_name',						width: 120,		style:'text-align:center'	},
				{ text: '주문번호', 			dataIndex: 'od_id',									width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '주문일시',			dataIndex: 'od_date',								width: 150,		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),	hidden:true	},
				{ text: '주문상태', 			dataIndex : 'stats',								editor:{xtype: 'cb_stats'},		align:'center',			renderer: rendererCombo	},
				{ text: '개별송장번호',	dataIndex: 'delivery_invoice',			width: 120,		style:'text-align:center'	},
				{ text: '총 합계금액',		dataIndex: 'TOTAL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ text: '품목판매금액',	dataIndex: 'SELL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000'), 	summaryType : 'sum',				summaryRenderer : rendererSummaryFormat	},
				{ text: '판매단가',			dataIndex: 'it_org_price',					width: 120,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '수량',					dataIndex: 'it_qty',								width: 70,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000'),		summaryType : 'sum',		summaryRenderer : rendererSummaryFormat	},
				{ text: '주문자',				dataIndex: 'name',									width: 70,		style:'text-align:center',		align:'center'	},
				{ text: '닉네임',				dataIndex: 'clay_id',	 							width: 120,		style:'text-align:center',		align:'center'	},
				{ text: 'IMG', 					dataIndex: 'gp_img',								width: 50,		renderer:rendererImage 		},
				{ text: '상품코드', 			dataIndex: 'it_id',									width: 120,		hidden:true	},
				{ text: '품목명', 				dataIndex: 'it_name',								width: 260		},
				{ text: '배송유형',			dataIndex: 'delivery_type_nm',			width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '배송비',				dataIndex: 'delivery_price',				width: 70,		style:'text-align:center',		align:'center',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: 'H.P',					dataIndex: 'hphone',	 							width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '결제방법', 			dataIndex: 'paytype_nm',						width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '입금자명',			dataIndex: 'receipt_name',					width: 80,		style:'text-align:left',			align:'left'	},
				{ text: '송장번호',			dataIndex: 'delivery_invoice',			width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '기본주소',			dataIndex: 'addr1',	 								width: 200,		style:'text-align:center'	},
				{ text: '기본주소(신)',	dataIndex: 'addr1_2',								width: 200,		style:'text-align:center'	},
				{ text: '상세주소',			dataIndex: 'addr2',	 								width: 200,		style:'text-align:center'	},
				{ text: 'ZIP',					dataIndex: 'zip',										width: 100,		style:'text-align:center',		align:'center'	},
				{ text: '현.영', 				dataIndex: 'cash_receipt_yn',				width: 80,		style:'text-align:left',			align:'left'	},
				{ text: '현.영 유형',		dataIndex: 'cash_receipt_type_nm',	width: 120,		style:'text-align:center',		align:'left'	},
				{ text: '현.영 정보',		dataIndex: 'cash_receipt_info',			width: 170,		style:'text-align:center',		align:'left'	}
			],
			dockedItems: [
				{
					xtype : 'toolbar',
					dock : 'top',
					items : [
						{
							xtype: 'cb_stats',
							name : 'cb_stats',
							fieldLabel : '주문상태',
							labelWidth : 80
						},
						{
							fieldLabel : '시작일',
							labelWidth : 50,
							xtype: 'datetimefield',
							name : 'sdate',
							format: "Y-m-d",
							submitFormat : "Y-m-d",
							width: 180
						},
						{
							fieldLabel : '종료일',
							labelWidth: 50,
							xtype : 'datetimefield',
							name : 'edate',
							format: "Y-m-d",
							submitFormat : "Y-m-d",
							width: 180
						},
						{
							xtype: 'button',
							text: '오늘',
							listeners : [{
								click : 'setDate'
							}]
						},
						{
							xtype: 'button',
							text: '일주일',
							listeners : [{
								click : 'setDate'
							}]
						},
						{
							xtype: 'button',
							text: '한달',
							listeners : [{
								click : 'setDate'
							}]
						},
						{
							xtype: 'button',
							text: '3개월',
							listeners : [{
								click : 'setDate'
							}]
						},

						{	xtype: 'label',	text: ' 검색 : ',		autoWidth:true,	style : 'font-weight:bold;'},
						{
							fieldLabel : '검색유형',
							labelWidth : 80,
							name : 'cb_searchtype',
							xtype: 'cb_searchtype'
						},
						{
							xtype: 'textfield',
							name: 'keyword',
							style: 'padding:0px;',
							enableKeyEvents: true,
							listeners:{
								keydown: 'keywordSearch'
							}
						}
					]
				},
				
				{
					xtype : 'toolbar',
					dock : 'top',
					items : [
						{
							fieldLabel : '변경',
							labelWidth : 60,
							reference : 'cb_editstats',
							xtype: 'cb_stats'
						},
						{
							reference		: 'ordStatsUpdBtn',
							text	: '변경',
							iconCls	: 'icon-table_edit',
							handler : 'updateOrderStats'
						},
						{
							text	: '인쇄',
							iconCls	: 'icon-table_print',
							handler: 'printOrders'
						}
						//{
						//	text	: 'SMS',
						//	id		: 'sendSMS',
						//	iconCls	: 'icon-sms',
						//	handler: function() {
						//		var sm = grid_orderlist.getSelection();
						//
						//		if( sm == '' ) {
						//			Ext.Msg.alert('알림','주문내역들을 선택해주세요');
						//			return false;
						//		}
						//
						//		store_winSms.removeAll();
						//		var v_prev_od_id;
						//
						//		for(var i = 0; i < sm.length; i++) {
						//			sm[i].data.message = v_SmsMsg[sm[i].data.stats];
						//
						//			/*중복주문번호에 대해서는 중복발송 방지위해 필터링*/
						//			if(sm[i].data.od_id == v_prev_od_id) continue;
						//
						//			var stats = sm[i].data.stats;
						//			if( (stats >= 10 && stats <= 40) || stats == 90)
						//				stats = stats;
						//			else
						//				stats = '';
						//
						//			var rec = Ext.create('model.SmsSendForm', {
						//				'stats'			: stats,
						//				'message'		: sm[i].data.message,
						//				'nickname'		: sm[i].data.nickname,
						//				'name'			: sm[i].data.name,
						//				'hphone'			: sm[i].data.hphone,
						//				'od_id'			: sm[i].data.od_id,
						//				'TOTAL_PRICE'	: sm[i].data.TOTAL_PRICE,
						//				'it_name'		: sm[i].data.it_name
						//			});
						//			store_winSms.add(rec);
						//
						//			v_prev_od_id = sm[i].data.od_id;
						//		}
						//
						//
						//		var button = Ext.get('sendSMS');
						//		button.dom.disabled = true;
						//		//this.container.dom.style.visibility=true
						//
						//		if (winSmsForm.isVisible()) {
						//			winSmsForm.hide(this, function() {
						//				button.dom.disabled = false;
						//			});
						//		} else {
						//			winSmsForm.show(this, function() {
						//				button.dom.disabled = false;
						//			});
						//		}
						//
						//		//grid_winSms.reconfigure(store_winSms);
						//
						//	}
						//}
					]
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}
			
		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	},
	listeners : {
		selectionchange: 'selOrderLoadLogs'
	}
});



/* SMS전송 로그 */
Ext.define('td.view.grid.SmsLog',{
	extend: 'Ext.grid.Panel',
	xtype: 'SmsLog',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'SmsLog',
	alias:'widget.SmsLog',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.SmsLog');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : 'no', 				dataIndex : 'wr_no',				width : 60,		sortable: true		},
				{ text : '메시지내용',	dataIndex : 'wr_message',		width : 450,	sortable: false		},
				{ text : '전송날짜',		dataIndex : 'wr_datetime',	width : 150,	renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ text : '받는사람',		dataIndex : 'wr_target',		width : 120	},
				{ text : '보낸사람',		dataIndex : 'wr_reply',			width : 120	}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}

		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
	}
});



/* 입금내역 로그 */
Ext.define('td.view.grid.BankLog',{
	extend: 'Ext.grid.Panel',
	xtype: 'BankLog',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'BankLog',
	alias:'widget.BankLog',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.BankLog');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '확인여부',		dataIndex : 'BANK_STAT',		width : 80,	style:'text-align:center'	},
				{ text : '거래일', 		dataIndex : 'tr_date',			width : 100,	sortable: true		},
				{ text : '거래시간',		dataIndex : 'tr_time',			width : 100,	sortable: false		},
				{ text : '입금액',			dataIndex : 'input_price',	width : 120,	style:'text-align:center',		align :'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ text : '입금자명',		dataIndex : 'trader_name',	width : 90,		style:'text-align:center',		align :'center'	},
				{ text : '연결주문ID',	dataIndex : 'admin_link',		width : 120,	style:'text-align:center',		editor:{allowBlank:false}	},
				{ text : '메모',				dataIndex : 'admin_memo',		width : 120,	style:'text-align:center',		editor:{allowBlank:false}	}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}

		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
	}
});



//주문내역 변경 로그
Ext.define('td.view.grid.OrderLog',{
	extend: 'Ext.grid.Panel',
	xtype: 'OrderLog',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'OrderLog',
	alias:'widget.OrderLog',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.OrderLog');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '변경유형', 	dataIndex : 'memo',					width : 90,		sortable: true		},
				{ text : '변경대상', 	dataIndex : 'key_id',				width : 90,		sortable: false		},
				{ text : '변경내용',		dataIndex : 'value',				width : 250	},
				{ text : '수정일자',		dataIndex : 'reg_date',			width : 150,	renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ text : '변경인',			dataIndex : 'mb_name',			width : 120	}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}

		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
	}
});


//입출금내역에서 사용하는 주문관리 그리드
Ext.define('td.view.grid.BankLinkOrder',{
	extend: 'Ext.grid.Panel',
	xtype: 'BankLinkOrder',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.OrderList',
		'td.view.combo.Product',
		'td.view.combo.Order',
		'td.view.bank.BankMainController'
	],
	name : 'BankLinkOrder',
	alias:'widget.BankLinkOrder',
	controller:'BankMainController',
	selType: 'checkboxmodel',
	//selModel: Ext.create('Ext.selection.CheckboxModel'),
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.BankLinkOrder');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			features: [
				{
					ftype : 'groupingsummary',
					groupHeaderTpl: '{name}',
					hideGroupedHeader: true,
					enableGroupingMenu: true,
					collapsible : false
				}
			],
			viewConfig: {
				stripeRows: true,
				getRowClass: orderStatsColorSetting,
				enableTextSelection: true
			},
			autoWidth : true,
			columns	: [
				{ text: '공구코드',			dataIndex: 'gpcode',								width: 100,		hidden:true	},
				{ text: 'number',				dataIndex: 'number',								width: 100,		hidden:true	},
				{ text: '공구명', 				dataIndex: 'gpcode_name',						width: 120,		style:'text-align:center'	},
				{ text: '주문번호', 			dataIndex: 'od_id',									width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '주문일시',			dataIndex: 'od_date',								width: 150,		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s'),	hidden:true	},
				{ text: '주문상태', 			dataIndex: 'stats',									width: 120,		editor:{xtype: 'cb_stats'},		renderer: rendererCombo	},
				{ text: '총 합계금액',		dataIndex: 'TOTAL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ text: '품목판매금액',	dataIndex: 'SELL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000'), 	summaryType : 'sum',				summaryRenderer : rendererSummaryFormat	},
				{ text: '판매단가',			dataIndex: 'it_org_price',					width: 120,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '수량',					dataIndex: 'it_qty',								width: 70,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000'),		summaryType : 'sum',		summaryRenderer : rendererSummaryFormat	},
				{ text: '주문자',				dataIndex: 'name',									width: 70,		style:'text-align:center',		align:'center'	},
				{ text: '닉네임',				dataIndex: 'clay_id',	 							width: 120,		style:'text-align:center',		align:'center'	},
				{ text: 'IMG', 					dataIndex: 'gp_img',								width: 50,		renderer:rendererImage 		},
				{ text: '상품코드', 			dataIndex: 'it_id',									width: 120,		hidden:true	},
				{ text: '품목명', 				dataIndex: 'it_name',								width: 260		},
				{ text: '배송유형',			dataIndex: 'delivery_type_nm',			width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '배송비',				dataIndex: 'delivery_price',				width: 70,		style:'text-align:center',		align:'center',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: 'H.P',					dataIndex: 'hphone',	 							width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '결제방법', 			dataIndex: 'paytype_nm',						width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '입금자명',			dataIndex: 'receipt_name',					width: 80,		style:'text-align:left',		align:'left'	},
				{ text: '송장번호',			dataIndex: 'delivery_invoice',			width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '기본주소',			dataIndex: 'addr1',	 								width: 200,		style:'text-align:center'	},
				{ text: '기본주소(신)',	dataIndex: 'addr1_2',								width: 200,		style:'text-align:center'	},
				{ text: '상세주소',			dataIndex: 'addr2',	 								width: 200,		style:'text-align:center'	},
				{ text: 'ZIP',					dataIndex: 'zip',										width: 100,		style:'text-align:center',		align:'center'	},
				{ text: '현.영', 				dataIndex: 'cash_receipt_yn',				width: 80,		style:'text-align:left',		align:'left'	},
				{ text: '현.영 유형',		dataIndex: 'cash_receipt_type_nm',	width: 120,		style:'text-align:center',		align:'left'	},
				{ text: '현.영 정보',		dataIndex: 'cash_receipt_info',			width: 170,		style:'text-align:center',		align:'left'	}
			],
			dockedItems: [
				{
					xtype : 'toolbar',
					dock : 'top',
					items : [
						{	xtype: 'label',	text: '확장 검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
						{
							xtype: 'textfield',
							reference : 'banklink_keyword',
							name: 'keyword',
							style: 'padding:0px;',
							enableKeyEvents: true,
							listeners:{
								keydown: 'searchBankLinkKeyword'
							}
						},
						{
							text: '입금처리',
							//: 'btn_link_B01',
							stats : 'B01',
							iconCls: 'icon-link',
							handler: 'updateLinkBankdata'
						},
						{
							text: '환불처리',
							//id: 'btn_link_B07',
							stats : 'B07',
							iconCls: 'icon-link',
							handler: 'updateLinkBankdata'
						},
						{
							text: '환불제외로딩',

							iconCls: 'icon-refresh',
							except_refund : '1',
							handler: 'loadingExceptRefund'
						},
						{
							text: '환불포함로딩',
							except_refund : '0',
							iconCls: 'icon-refresh',
							handler: 'loadingExceptRefund'
						}

						//{
						//	text	: 'SMS',
						//	reference		: 'bankSendSMS',
						//	iconCls	: 'icon-sms',
						//	handler: 'sendSms'
						//} //SMS버튼 END
					]
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 50,
				store: store,
				displayInfo: true,
				plugins: new Ext.ux.SlidingPager()
			}

		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	},
	listeners : {

	}
});