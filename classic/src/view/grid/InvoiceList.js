/**
 * Created by lucael on 2017-03-24.
 */

/* 발주서 조회 페이지 목록 */
Ext.define('td.view.grid.InvoiceList',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceList',
	name : 'InvoiceList',
	alias:'widget.InvoiceList',
	controller:'InvoiceSearchMainController',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.InvoiceList'
	],
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.InvoiceList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text: '날짜',						dataIndex : 'iv_date',					sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' },		hidden:true	},
				{ text: '공구코드',				dataIndex : 'gpcode',						width:230,			hidden:true	},
				{ text: '송금코드',				dataIndex : 'wr_id',						width:130,			hidden:true	},
				{ text: '발주코드',				dataIndex : 'iv_id',						width:120,			style:'text-align:center',		align:'left'	},
				{ text: '발주서 별칭',			dataIndex : 'iv_name',					width:150,			style:'text-align:center',		align:'left'	},
				{ text: '인보이스번호',		dataIndex : 'iv_order_no',			width:120,			style:'text-align:center',		align:'left'	},
				{ text: '송금내역CNT',			dataIndex : 'CNT_WIRE',					width:120,			style:'text-align:center',		align:'right'	},
				{ text: '통관내역CNT',			dataIndex : 'CNT_CLR',					width:120,			style:'text-align:center',		align:'right'	},
				{ text: '입고품목CNT',			dataIndex : 'CNT_INP',					width:120,			style:'text-align:center',		align:'right'	},
				{ text: '메모',						dataIndex : 'iv_memo',					width:170,			editor: { allowBlank : false }	},
				{ text: 'TOTAL',					dataIndex : 'TOTAL_PRICE',			width:150,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00') },
				{ text: 'DC.FEE',					dataIndex : 'iv_discountfee',		width:100,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text: 'TAX',						dataIndex : 'iv_tax',						width:100,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text: 'SHIP.FEE',				dataIndex : 'iv_shippingfee',		width:120,			style:'text-align:center',		align:'right',		renderer: Ext.util.Format.numberRenderer('0,000.00'),		editor: { allowBlank : false } },
				{ text: '딜러',						dataIndex : 'iv_dealer',				width:120,			style:'text-align:center',		align:'left'	},
				{ text: '인보이스날짜',		dataIndex : 'iv_date',					width:120,			style:'text-align:center',		align:'center'	},
				{	text: '통화',						dataIndex: 'money_type',				editor:{xtype: 'cb_moneytype'},		style:'text-align:center',				align:'center',			allowBlank: true,			value : 'USD',			renderer: rendererCombo		},
				{ text: '환율(주문)',			dataIndex : 'wr_exch_rate',			width:90,				editor: { allowBlank : false }	},
				{ text: '담당자',					dataIndex : 'admin_name',				width:120,			style:'text-align:center',		align:'center'	},
				{ text: '입출금링크',			dataIndex : 'iv_receipt_link',	width:120	}
			],
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'keyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchKeywordInvoiceList'
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
		this.getStore().load();
	},
	listeners : {
		selectionchange: 'selectLoadInvoiceItem'
	}
});



/* 발주서 품목 목록 */
Ext.define('td.view.grid.InvoiceItemList',{
	extend: 'Ext.grid.Panel',
	xtype: 'InvoiceItemList',
	name : 'InvoiceItemList',
	alias:'widget.InvoiceItemList',
	controller:'InvoiceSearchMainController',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.InvoiceList'
	],
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.InvoiceItemList');
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
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'keyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown:function(t,e){

							if(e.keyCode == 13){

							}
						}
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
		this.getStore().load();
	},
	listeners : {
		selectionchange: 'selectLoadInvoiceItem'
	}
});
