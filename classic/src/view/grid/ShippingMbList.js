
/* 배송예정 구매자 목록 */
Ext.define('td.view.grid.ShippingMbList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ShippingMbList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'ShippingMbList',
	alias:'widget.ShippingMbList',
	controller:'ShippingMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ShippingMbList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{	text : '닉네임',				width : 140,		dataIndex : 'mb_nick'		},
				{	text : '이름',					width : 70,			dataIndex : 'mb_name'		},
				{ text : '연락처',				width : 120,		dataIndex : 'hphone'		},
				{ text : '발송예정',			width : 90,			dataIndex : 'S40_SUM_QTY',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '발송예정총액',	width : 120,		dataIndex : 'S40_SUM_TOTAL',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				/*{ text : '퀵주문',				width : 90,			dataIndex : 'QCK_SUM_QTY',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				 { text : '퀵주문총액',		width : 120,		dataIndex : 'QCK_SUM_TOTAL',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				 { text : '발송불가',			width : 90,			dataIndex : 'NS40_SUM_QTY',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				 { text : '발송불가총액',	width : 120,		dataIndex : 'NS40_SUM_TOTAL',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },*/
				{ text : '배송예정수량',	width : 120,		dataIndex : 'SUM_QTY',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '배송예정총액',	width : 120,		dataIndex : 'SUM_TOTAL',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'mbKeyword',
					name: 'keyword',
					width : 100,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchMember'
					}
				},
				{
					text	: '우체국 엑셀추출',
					iconCls	: 'icon-excel',
					handler: 'openWinExportShippingMember'
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
		selectionchange: 'selMbLoadShippingList'
	}
});

