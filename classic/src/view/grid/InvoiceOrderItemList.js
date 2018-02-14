
/* 공구 목록 */
Ext.define('td.view.grid.InvoiceGpList',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceGpList',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'td.view.invoice.winGpReset'
	],
	name : 'InvoiceGpList',
	alias:'widget.InvoiceGpList',
	selType: 'checkboxmodel',
	controller:'InvoiceMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.InvoiceGpList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text: '공구명', 		width: 210,	dataIndex : 'gpcode_name',	sortable: false,		align:'left'		},
				{ text: '공구코드',	width: 120,	dataIndex : 'gpcode',				hidden:true	},
				{ text: '등록일',	 	width: 120,	dataIndex : 'reg_date',			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d')	},
				{ text: '시작일',	 	width: 120,	dataIndex : 'start_date',		sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
				{ text: '종료일',	 	width: 120,	dataIndex : 'end_date',			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
				{ text: '품목수',		width: 120,	dataIndex : 'ITEM_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			tbar: [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'gplist_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'keywordSearchGplist'
					}
				},
				{
					id: 'unselect',
					text: '선택해제',
					iconCls: '',
					handler: 'unselectGplist'
				},
				{
					id: 'refresh_gp',
					text: '공구상품목록재설정',
					iconCls: '',
					handler: 'openWinGpReset'
				},
				{
					text	: '단체SMS/LMS',
					id		: 'sendSMS',
					iconCls	: 'icon-sms',
					handler: 'openWinGpSms'
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
		selectionchange: 'selectLoadGpMemoAndOrderItem'
	}
});



//공구메모
Ext.define('td.view.grid.InvoiceGpMemo',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceGpMemo',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'InvoiceGpMemo',
	alias:'widget.InvoiceGpMemo',
	controller:'InvoiceMainController',
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
				{ text : '공구명', 			width : 210,	dataIndex : 'gpcode_name',		sortable: false,	align:'left'	},
				{ text : '공구코드',			width : 120,	dataIndex : 'gpcode',					hidden:true,			align:'left'	},
				{ text : '날짜',					width : 120,	dataIndex : 'reg_date',				hidden:true,			align:'left'	},
				{	text : '메모',					width : 620,	dataIndex : 'memo',						align:'left'					},
				{	text : '발주관련메모',	width : 620,	dataIndex : 'invoice_memo',		align:'left'	}
			]
		});
		this.callParent();
	},
	afterRender: function(){
		this.callParent(arguments);
		this.getStore().load();
	},
	listeners : {
		itemdblclick: {
			/**
			 * @grid        그리드 오브젝트
			 * @selRow      선택한 셀의 오브젝트
			 * @selHtml     선택한 셀의  html
			 *
			 * 기본적으로 Ext.define에서 idProperty로 선언한 field가 internalId로 설정된다.
			 *  그 외 데이터는 selRow.data.{field}로 접근할 수 있다.
			 */
			fn: 'openWinGpMemo'
		}
	}

});


//공구 주문목록
Ext.define('td.view.grid.InvoiceOrderItemList',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceOrderItemList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'InvoiceOrderItemList',
	alias:'widget.InvoiceOrderItemList',
	controller:'InvoiceMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.InvoiceOrderItemList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				getRowClass: function(record, index) {
					var c = record.get('NEED_IV_QTY');
					if (c == 0) {
						return 'cell_font_blue';
					}
				},
				stripeRows: true,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text : '날짜',							dataIndex : 'reg_date',							sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text : '공구코드',					dataIndex : 'gpcode',								hidden:true	},
				{ text : 'IMG', 						dataIndex : 'it_img',								width: 50,			renderer:rendererImage 	},
				{ text : '공구명',						dataIndex : 'gpcode_name',					width:160		},
				{ text : '상품코드',					dataIndex : 'it_id',								width:160		},
				{ text : '▼주문집계',				dataIndex : 'SUM_QTY',							width:120,			style:'text-align:center',	align:'right',	editor: { allowBlank : false },		renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '△발주필요',				dataIndex : 'NEED_IV_QTY',					width:120,			style:'text-align:center',	align:'right'		},
				{ text : '▲발주완료',				dataIndex : 'SUM_IV_QTY',						width:120,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '과발주',						dataIndex : 'OVER_IV_QTY',					style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '│',								dataIndex : 'NULL',									width : 20 },
				{ text : icn_e1+"공구재고설정",	dataIndex : 'gp_jaego',								width:140,			style:'text-align:center',	align:'right',	editor: { allowBlank : false },	cls: 'font_edit'	},
				{ text : '초기재고값',				dataIndex : 'jaego',								width:120,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '전체발주수량',			dataIndex : 'RIV_QTY',							width:120,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '전체주문수량',			dataIndex : 'ORDER_QTY',						width:120,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '예상재고수량',			dataIndex : 'real_jaego',						width:120,			style:'text-align:center',	align:'right'		},
				{ text : '발주총액',					dataIndex : 'SUM_IV_WORLDPRICE',		width:100,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text : '품목명',						dataIndex : 'it_name',							width:450 },
				{ text : '주문총액',					dataIndex : 'total_price',					style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	hidden:true },
				{ text : '주문가',						dataIndex : 'it_org_price',					style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	hidden:true },
				{ text : '관리자메모',				dataIndex : 'admin_memo',						width:150,			editor: { allowBlank : false }	}
			],
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					name : 'gporderitem_keyword',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchGpOrderItem'
					}
				},
				{	xtype: 'label',	text: '공구재고 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'orderitems_jaego',
					width : 50,
					style: 'padding:0px;',
					enableKeyEvents: true
				},
				{
					reference : 'btn_jaego_edit',
					text: '변경',
					iconCls: 'icon-table_edit2',
					handler: 'updateJaego'
				},
				{
					reference	: 'btn_invoice',
					text	: '발주작성',
					iconCls	: 'icon-table_edit',
					handler : 'openWinMakeInvoice'
				},
				{
					reference	: 'btn_invoice_add',
					text	: '발주추가',
					iconCls	: 'icon-add',
					handler : 'addMakeInvoice'
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				pageSize: 250,
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
		edit: listenerEditFunc,
		afterrender: listenerAfterRendererFunc
	}
});


//발주서 작성 팝업의 그리드
Ext.define('td.view.grid.MakeInvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'MakeInvoiceList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'MakeInvoiceList',
	alias:'widget.MakeInvoiceList',
	controller:'InvoiceMainController',
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
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text : '날짜',					dataIndex : 'reg_date',							sortable: true,		summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text : '공구코드',			dataIndex : 'gpcode',								hidden:true		},
				{ text : '상품코드',			dataIndex : 'iv_it_id',							width:160		},
				{ text : '품목명',				dataIndex : 'iv_it_name',						width:450		},
				{ text : '발주가(해외)',	dataIndex : 'iv_dealer_worldprice',	width:120,	editor: { allowBlank : true },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text : '발주가(￦)',		dataIndex : 'iv_dealer_price',			editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	hidden:true },
				{ text : '발주수량',			dataIndex : 'iv_qty',								editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '발주총액',			dataIndex : 'total_price',					editor: { allowBlank : false },		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00'),	hidden:true }
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


