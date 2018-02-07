
/* 송금예정발주서 */
Ext.define('td.view.grid.WireTodoInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WireTodoInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'WireTodoInvoiceList',
	alias:'widget.WireTodoInvoiceList',
	controller:'WireMainController',
	headerPosition: 'left',
	title : '송금예정발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.WireTodoInvoiceList');
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
				{ text : '날짜',							dataIndex : 'iv_date',					sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text : '공구코드',					dataIndex : 'gpcode',						width:230,			hidden:true	},
				{ text : '송금코드',					dataIndex : 'wr_id',						width:130,			hidden:true	},
				{ text : '발주코드',					dataIndex : 'iv_id',						width:120	},
				{ text : '발주서 별칭',			dataIndex : 'iv_name',					width:150	},
				{ text : '통화',							dataIndex : 'money_type',				width:70	},
				{ text : 'TOTAL',						dataIndex : 'TOTAL_PRICE',			width:150,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text : '인보이스번호',			dataIndex : 'iv_order_no',			width:120	},
				{ text : '메모',							dataIndex : 'iv_memo',					width:170,		editor: { allowBlank : false }	},
				{ text : 'DC.FEE',					dataIndex : 'iv_discountfee',		width:100,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : 'TAX',							dataIndex : 'iv_tax',						width:100,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : 'SHIP.FEE',				dataIndex : 'iv_shippingfee',		width:120,		style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text : '딜러',							dataIndex : 'iv_dealer',				width:120	},
				{ text : '인보이스날짜',			dataIndex : 'iv_date',					width:120	},
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
				{ text : '담당자',						dataIndex : 'admin_name',				width:120	},
				{ text : '입출금링크',				dataIndex : 'iv_receipt_link',	width:120	}
			],
			tbar: [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'WireTodo_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchWireTodoKeyword'
					}
				},
				{
					reference	: 'btn_wire',
					text	: '송금',
					iconCls	: 'icon-table_edit',
					handler : 'openWinMakeWireInfo'
				},
				{
					text	: '삭제(1개)',
					iconCls	: 'icon-delete',
					handler: 'deleteWireTodoInvoice'
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
		selectionchange: 'selectWireTodoInvoice'
	}
});



/* 송금완료 목록 */
Ext.define('td.view.grid.WireEndInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WireEndInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'WireEndInvoiceList',
	alias:'widget.WireEndInvoiceList',
	controller:'WireMainController',
	headerPosition: 'left',
	title : '송금완료 발주서',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.WireEndInvoiceList');
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
				{ text : '송금코드',						dataIndex : 'wr_id',						width:130,			hidden:true},
				{ text : '송금별칭',						dataIndex : 'wr_name',					width:120,			hidden:true},
				{ text : '송금수수료(해외)',		dataIndex : 'wr_out_fee',				width:120,			hidden:true},
				{ text : '송금수수료(국내)',		dataIndex : 'wr_in_fee',				width:120,			hidden:true},
				{ text : '송금메모',						dataIndex : 'wr_memo',					width:120,			hidden:true},
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
				{ text : '환율(송금)',					dataIndex : 'wr_exchrate',			width:100,		style:'text-align:center',		align:'right',		editor: { allowBlank : false }	},
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
					reference : 'WireEnd_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchWireEndKeyword'
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
		selectionchange: 'selectWireEndInvoice'
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





/* 송금완료 발주서의 품목 목록 */
Ext.define('td.view.grid.WireItemList',{
	extend: 'Ext.grid.Panel',
	xtype: 'WireItemList',
	name : 'WireItemList',
	alias:'widget.WireItemList',
	controller:'WireMainController',
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
		var store = Ext.create('td.store.WireItemList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text: 'number',			dataIndex : 'number',								hidden:true	},
				{ text: '발주코드',		dataIndex : 'iv_id',								width:120		},
				{	text: '현황',				dataIndex: 'iv_stats',							style:'text-align:center',			align:'center',			allowBlank: true,			editor: {xtype: 'cb_ivstats'},			value : '00',			renderer: rendererCombo	},
				{ text: '날짜',				dataIndex : 'reg_date',							sortable: true,									summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text: '공구코드',		dataIndex : 'gpcode',								hidden:true		},
				{ text: '공구명',			dataIndex : 'gpcode_name',					style:'text-align:center',		align:'left'	},
				{ text: 'IMG', 				dataIndex : 'iv_it_img',						width: 50,		renderer:rendererImage 		},
				{ text: '상품코드',		dataIndex : 'iv_it_id',							width:160			},
				{ text: '분류',				dataIndex : 'ca_id',								width:100,		style:'text-align:center'		},
				{ text: '재고값',			dataIndex : 'jaego',								width:100,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')			},
				{ text: '주문집계',		dataIndex : 'GPT_QTY',							width:100,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	summaryType : 'sum',	summaryRenderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '발주수량',		dataIndex : 'iv_qty',								width:100,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	summaryType : 'sum',	summaryRenderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '입고수량',		dataIndex : 'ip_qty',								width:100,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	summaryType : 'sum',	summaryRenderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '통화',				dataIndex : 'money_type',						width:70			},
				{ text: '발주가',			dataIndex : 'iv_dealer_worldprice',	width:120,		editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text: 'TOTAL',			dataIndex : 'total_price',					width:120,																			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text: '품목명',			dataIndex : 'iv_it_name',						width:450,			style:'text-align:center',		align:'left'	}
			],
			tbar : [
				{
					xtype : 'cb_ivstats',
					reference : 'wr_stats'
				},
				{
					text	: '변경',
					iconCls	: 'icon-table_edit',
					handler : 'updateWireInvoiceItem'
				},
				{
					text	: '인쇄',
					iconCls	: 'icon-table_print',
					handler: 'printWireInvoiceItem'
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






//송금내역 작성 팝업의 그리드
Ext.define('td.view.grid.MakeWireList',{
	extend: 'Ext.grid.Panel',
	xtype: 'MakeWireList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'MakeWireList',
	alias:'widget.MakeWireList',
	controller:'WireMainController',
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


