
/* 배송예정 구매자 목록 */
Ext.define('td.view.grid.GradingMbList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GradingMbList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'GradingMbList',
	alias:'widget.GradingMbList',
	controller:'GradingMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.GradingMbList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{	text : '닉네임',				width : 140,		dataIndex : 'gr_nickname'		},
				{	text : '이름',					width : 70,			dataIndex : 'gr_name'		},
				{ text : '신청수량',			width : 120,		dataIndex : 'SUM_QTY',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		width:70,		style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					name: 'keyword',
					width : 100,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchGradingMemberKeyword'
					}
				},
				{
					text	: '신청서 입력',
					iconCls	: 'icon-excel',
					handler: 'openWinImportExcelGrading'
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
		selectionchange: 'selMbLoadGradingList'
	}
});

