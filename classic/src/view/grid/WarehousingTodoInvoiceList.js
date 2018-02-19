
/* 입고예정발주서 */
Ext.define('td.view.grid.WarehousingTodoInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WarehousingTodoInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'WarehousingTodoInvoiceList',
	alias:'widget.WarehousingTodoInvoiceList',
	controller:'WarehousingMainController',
	headerPosition: 'left',
	title : '입고예정발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.WarehousingTodoInvoiceList');
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
				enableTextSelection: true,
				getRowClass: function(record, index) {
					var c = record.get('IP_COMPLETE');
					if (c == 'Y') {
						return 'cell_bg_skyblue';
					}
				}
			},
			autoWidth : true,
			columns : [
				{ text : '통관코드',						dataIndex : 'cr_id',						width:140,		hidden:true	},
				{ text : 'BL/NO',							dataIndex : 'cr_blno',					width:150	},
				{ text : '통관번호',						dataIndex : 'cr_refno',					width:150	},
				{ text : '통관CNT',						dataIndex : 'CR_EA',						width:90,					style:'text-align:center',		align:'right'	},
				{ text : '입고CNT',						dataIndex : 'IP_EA',						width:90,					style:'text-align:center',		align:'right'	},
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
					reference : 'WarehousingTodo_keyword',
					name: 'WarehousingTodo_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchWarehousingTodoKeyword'
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
		selectionchange: 'selectWarehousingTodoInvoice'
	}
});



/* 입고완료 목록 */
Ext.define('td.view.grid.WarehousingEndInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WarehousingEndInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'WarehousingEndInvoiceList',
	alias:'widget.WarehousingEndInvoiceList',
	controller:'WarehousingMainController',
	headerPosition: 'left',
	title : '입고완료 발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.WarehousingEndInvoiceList');
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
				{ text : '공구코드',						dataIndex : 'gpcode',						width:230,			hidden:true},
				{ text : '통관코드',						dataIndex : 'cr_id',						width:130,			hidden:true},
				{ text : '입고코드',						dataIndex : 'wr_id',						width:130,			hidden:true},
				{ text : '입고별칭',						dataIndex : 'wr_name',					width:120,			hidden:true},
				{ text : '입고수수료(해외)',		dataIndex : 'wr_out_fee',				width:120,			hidden:true},
				{ text : '입고수수료(국내)',		dataIndex : 'wr_in_fee',				width:120,			hidden:true},
				{ text : '입고메모',						dataIndex : 'wr_memo',					width:120,			hidden:true},
				{ text : '발주코드',						dataIndex : 'iv_id',						width:120	},
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
				{ text : 'TOTAL',							dataIndex : 'TOTAL_PRICE',			width:150,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'DC.FEE',						dataIndex : 'iv_discountfee',		width:100,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'TAX',								dataIndex : 'iv_tax',						width:100,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : 'SHIP.FEE',					dataIndex : 'iv_shippingfee',		width:120,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat },
				{ text : '환율(입고)',					dataIndex : 'wr_exchrate',			width:100,		style:'text-align:center',		align:'right',		editor: { allowBlank : false }	},
				{ text : '딜러',								dataIndex : 'iv_dealer',				width:120	},
				{ text : '인보이스번호',				dataIndex : 'iv_order_no',			width:120	},
				{ text : '인보이스날짜',				dataIndex : 'iv_date',					sortable: true,	summaryType: 'min',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' }	},
				{ text : '담당자',							dataIndex : 'admin_name',				width:120	},
				{ text : '메모',								dataIndex : 'iv_memo',					width:170,		editor: { allowBlank : false }	},
				{ text : '입출금링크',					dataIndex : 'iv_receipt_link',	width:120	}
			],
			tbar: [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'WarehousingEnd_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchWarehousingEndKeyword'
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
		selectionchange: 'selectWarehousingEndInvoice'
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





/* 입고완료 발주서의 품목 목록 */
Ext.define('td.view.grid.WarehousingItemList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WarehousingItemList',
	name : 'WarehousingItemList',
	alias:'widget.WarehousingItemList',
	controller:'WarehousingMainController',
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
		var store = Ext.create('td.store.WarehousingItemList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text : 'number',			dataIndex : 'number',						hidden:true	},
				{ text : '실제재고수량',	dataIndex : 'real_jaego',				hidden:true	},
				{ text : '통관코드',			dataIndex : 'cr_id',						width:130,		hidden:true		},
				{ text : 'BL/NO',				dataIndex : 'cr_blno',					width:150	},
				{ text : '통관번호',			dataIndex : 'cr_refno',					width:150	},
				{ text : '발주코드',			dataIndex : 'iv_id',						width:120		},
				{ text : '인보이스번호',	dataIndex : 'iv_order_no',			width:120		},
				{	text : '현황',				dataIndex: 'iv_stats',							style:'text-align:center',			align:'center',			allowBlank: true,			editor: {xtype: 'cb_ivstats'},			value : '00',			renderer: rendererCombo	},
				{ text : '날짜',					dataIndex : 'reg_date',							sortable: true,		summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text : '공구코드',			dataIndex : 'gpcode',								hidden:true		},
				{ text : 'IMG', 				dataIndex : 'iv_it_img',						width:50,					renderer:rendererImage 		},
				{ text : '상품코드',			dataIndex : 'iv_it_id',							width:160		},
				{ text : '품목명',				dataIndex : 'iv_it_name',						width:450		},
				{ text : '통화',					dataIndex : 'money_type',						width:70		},
				{ text : '발주가(해외)',	dataIndex : 'iv_dealer_worldprice',	width:120,				editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text : '발주가(￦)',		dataIndex : 'iv_dealer_price',			editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	hidden:true },
				{ text : '주문집계',			dataIndex : 'SUM_QTY',																								style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '발주수량',			dataIndex : 'iv_qty',								editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '통관수량',			dataIndex : 'cr_qty',								editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '취소수량',			dataIndex : 'cr_cancel_qty',				editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			tbar : [
				{
					reference		: 'stats_update_40',
					text	: '입고처리',
					iconCls	: 'icon-table_edit',
					handler : 'updateWarehousing'
				},
				{
					text: '인쇄(선택된것만)',
					iconCls: 'icon-table_print',
					handler: 'printWarehousing'
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



//입고내역 작성 팝업의 그리드
Ext.define('td.view.grid.MakeWarehousingList',{
	extend: 'Ext.grid.Panel',
	xtype: 'MakeWarehousingList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'MakeWarehousingList',
	alias:'widget.MakeWarehousingList',
	controller:'WarehousingMainController',
	remoteSort: true,
	autoLoad : false,
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
				{ text : '공구코드',			dataIndex : 'gpcode',						hidden:true	},
				{ text : '발주코드',			dataIndex : 'iv_id',						width:160		},
				{ text : '발주서 별칭',	dataIndex : 'iv_name',					width:160		},
				{ text : '발주총액',			dataIndex : 'TOTAL_PRICE',			width:140,		style:'text-align:center',	align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'), 	summaryType : 'sum',		summaryRenderer : rendererSummaryFormat }
			],
			listeners : {
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


