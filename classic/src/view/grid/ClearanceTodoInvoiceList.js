
/* 통관예정발주서 */
Ext.define('td.view.grid.ClearanceTodoInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ClearanceTodoInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'ClearanceTodoInvoiceList',
	alias:'widget.ClearanceTodoInvoiceList',
	controller:'ClearanceMainController',
	headerPosition: 'left',
	title : '통관예정발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ClearanceTodoInvoiceList');
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
				{ text : '그룹코드',						dataIndex : 'Group',						width:230,			hidden:true	},
				{ text : '날짜',								dataIndex : 'iv_date',					sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text : '공구코드',						dataIndex : 'gpcode',						width:230,			hidden:true	},
				{ text : '통관ID',							dataIndex : 'cr_id',						width:120,			hidden:true	},
				{ text : '송금코드',						dataIndex : 'wr_id',						width:130,			hidden:true	},
				{ text : '%',									dataIndex : 'complete_per',			width:60	},
				{ text : '발주서메모',					dataIndex : 'iv_memo',					width:170,		editor: { allowBlank : false }	},
				{ text : '발주코드',						dataIndex : 'iv_id',						width:120	},
				{ text : '딜러',								dataIndex : 'iv_dealer',				width:80	},
				{ text : '인보이스번호',				dataIndex : 'iv_order_no',			width:120	},
				{ text : '발주서 별칭',				dataIndex : 'iv_name',					width:150	},
				{
					dataIndex: 'money_type',
					text: '통화유형',
					style:'text-align:center',
					align:'center',
					allowBlank: true,
					editor: {xtype: 'cb_moneytype'},
					value : 'USD',
					renderer: rendererCombo
				},
				{ text : 'TOTAL',							dataIndex : 'TOTAL_PRICE',			width:150,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'DC.FEE',						dataIndex : 'iv_discountfee',		width:100,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'TAX',								dataIndex : 'iv_tax',						width:100,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'SHIP.FEE',					dataIndex : 'iv_shippingfee',		width:120,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : '환율(송금)',					dataIndex : 'wr_exch_rate',			width:100,			style:'text-align:center',		align:'right',		editor: { allowBlank : false }	},
				{ text : '인보이스날짜',				dataIndex : 'iv_date',					sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' }	},
				{ text : '담당자',							dataIndex : 'admin_name',				width:120	},
				{ text : '입출금링크',					dataIndex : 'iv_receipt_link',	width:120	}
			],
			tbar: [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'ClearanceTodo_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchClearanceTodoKeyword'
					}
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
		//this.getStore().load();
	},
	listeners : {
		selectionchange: 'selectClearanceTodoInvoice'
	}
});



/* 통관완료 목록 */
Ext.define('td.view.grid.ClearanceEndInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ClearanceEndInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'ClearanceEndInvoiceList',
	alias:'widget.ClearanceEndInvoiceList',
	controller:'ClearanceMainController',
	headerPosition: 'left',
	title : '통관완료 발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ClearanceEndInvoiceList');
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
				{ text : '통관코드',						dataIndex : 'cr_id',						width:140,		hidden:true	},
				{ text : 'BL/NO',							dataIndex : 'cr_blno',					width:150	},
				{ text : '통관번호',						dataIndex : 'cr_refno',					width:150	},
				{ text : '통관별칭',						dataIndex : 'cr_name',					width:150	},
				{ text : '통관일',							dataIndex : 'cr_date',					sortable: true,		summaryType: 'max',						renderer: Ext.util.Format.dateRenderer('Y-m-d')	},
				{ text : '관세',								dataIndex : 'cr_dutyfee',				width:100,				style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : '부가세',							dataIndex : 'cr_taxfee',				width:100,				style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : '배송비',							dataIndex : 'cr_shipfee',				width:120,				style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : '담당자',							dataIndex : 'admin_id',					width:120	}
			],
			tbar: [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'ClearanceEnd_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchClearanceEndKeyword'
					}
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
		//this.getStore().load();
	},
	listeners : {
		selectionchange: 'selectClearanceEndInvoice'
	}
});


//인보이스 관련 공구정보
Ext.define('td.view.grid.InvoiceGpInfo',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceGpInfo',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'InvoiceGpInfo',
	alias:'widget.InvoiceGpInfo',
	//controller:'InvoiceMainController',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.InvoiceGpMemo');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '공구명', 			width : 380,	dataIndex : 'gpcode_name',	sortable: false	},
				{ text : '공구코드',		width : 120,	dataIndex : 'gpcode',				hidden:true	},
				{ text : '날짜',				width : 120,	dataIndex : 'reg_date',			hidden:true	},
				{ text : '주문',				width : 70,		dataIndex : 'SUM_QTY',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '미발주',			width : 80,		dataIndex : 'NEED_IV_QTY',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '발주',				width : 70,		dataIndex : 'SUM_IV_QTY',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문총액',		width : 120,	dataIndex : 'SUM_PAY',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문량',			width : 90,		dataIndex : 'ITC_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '발주량',			width : 90,		dataIndex : 'IVC_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			]
		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	}
});


/* 통관완료 발주서의 품목 목록 */
Ext.define('td.view.grid.ClearanceItemList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ClearanceItemList',
	name : 'ClearanceItemList',
	alias:'widget.ClearanceItemList',
	controller:'ClearanceMainController',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ClearanceItemList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				enableTextSelection: true,
				getRowClass: ivStatsColorSetting
			},
			autoWidth : true,
			columns : [
				{ text: 'number',				dataIndex : 'number',								hidden:true	},
				{ text: '통관코드',			dataIndex : 'cr_id',								width:130		},
				{ text: '발주코드',			dataIndex : 'iv_id',								width:120		},
				{ text: '인보이스번호',	dataIndex : 'iv_order_no',					width:120		},
				{	text: '현황',					dataIndex: 'iv_stats',							style:'text-align:center',			align:'center',			allowBlank: true,			editor: {xtype: 'cb_ivstats'},			value : '00',			renderer: rendererCombo	},
				{ text: '공구코드',			dataIndex : 'gpcode',								width:120,		hidden:true		},
				{ text: '공구명',				dataIndex : 'gpcode_name',					width:120		},
				{ text: '날짜',					dataIndex : 'reg_date',							sortable: true,		summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text: 'IMG', 					dataIndex : 'iv_it_img',						width:50,					renderer:rendererImage 		},
				{ text: '상품코드',			dataIndex : 'iv_it_id',							width:160		},
				{ text: '통화',					dataIndex : 'money_type',						width:70		},
				{ text: '발주가',				dataIndex : 'iv_dealer_worldprice',	width:80,		editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text: '발주가(￦)',		dataIndex : 'iv_dealer_price',			width:120,	editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	hidden:true },
				{ text: '발주수량',			dataIndex : 'iv_qty',								width:100,	editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '통관수량',			dataIndex : 'cr_qty',								width:100,	editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '취소수량',			dataIndex : 'cr_cancel_qty',				width:100,	editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '품목명',				dataIndex : 'iv_it_name',						width:450		}
			],
			tbar : [
				{
					reference	: 'btn_Clearance',
					text	: '통관',
					iconCls	: 'icon-table_edit',
					handler : 'openWinMakeClearanceInfo'
				},
				{
					xtype : 'cb_ivstats',
					reference : 'wr_stats'
				},
				{
					text	: '변경',
					iconCls	: 'icon-table_edit',
					handler : 'updateClearanceInvoiceItem'
				},
				{
					text	: '인쇄',
					iconCls	: 'icon-table_print',
					handler: 'printClearanceInvoiceItem'
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
		//selectionchange: 'selectLoadInvoiceItem'
	}
});


//통관내역 작성 팝업의 그리드
Ext.define('td.view.grid.MakeClearanceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'MakeClearanceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'MakeClearanceList',
	alias:'widget.MakeClearanceList',
	controller:'ClearanceMainController',
	remoteSort: true,
	autoLoad : false,
	height : 410,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.MakeInvoiceList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			features: [
				{
					ftype : 'summary',
					groupHeaderTpl: '{name}',
					hideGroupedHeader: true,
					enableGroupingMenu: true,
					collapsible : false
				}
			],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : 'PKNO',					dataIndex : 'number',					width:120,	hidden:true		},
				{ text : '공구코드',				dataIndex : 'gpcode',					width:120		},
				{ text : '발주코드',				dataIndex : 'iv_id',					width:120		},
				{ text : '통관 상품코드',	dataIndex : 'cr_it_id',				width:160		},
				{ text : '통관 상품명',		dataIndex : 'cr_it_name',			width:260		},
				{ text : '통관수량',				dataIndex : 'cr_qty',					width:90,		editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '취소수량',				dataIndex : 'cr_cancel_qty',	width:90,		editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			listeners : {
				edit: listenerEditFunc,
				afterrender: listenerAfterRendererFunc
			}

		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	},
	listeners : {
		//selectionchange: 'selGpinfoLoadPrdList'
	}
});
