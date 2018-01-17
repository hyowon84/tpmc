
/* 공구 목록 */
Ext.define('td.view.grid.ShippingGpInfoList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ShippingGpInfoList',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'ShippingGpInfoList',
	alias:'widget.ShippingGpInfoList',
	controller:'ShippingMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ShippingGpInfoList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: gpinfoStatsColorSetting,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text: '공구코드',		width: 120,	dataIndex: 'gpcode',				hidden:true	},
				{ text: '날짜',				width: 120,	dataIndex: 'reg_date',			hidden:true	},
				{ text: '공구명', 			width: 200,	dataIndex: 'gpcode_name',	sortable: false,		style:'text-align:center',	align:'left'	},
				{	text: '현황',				width: 160,	dataIndex: 'stats',					style:'text-align:center',			align:'center',			allowBlank: true,		value : '00',			renderer: rendererCombo		},
				{ text: '발주',				width: 70,		dataIndex: 'SUM_IV_QTY',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '주문',				width: 70,		dataIndex: 'SUM_QTY',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '미발주',			width: 80,		dataIndex: 'NEED_IV_QTY',	style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '주문총액',		width: 120,	dataIndex: 'SUM_PAY',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '메모',				width: 120,	dataIndex: 'memo'	},
				{ text: '품목(GP)',		width: 90,		dataIndex: 'ITC_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '품목(IV)',		width: 90,		dataIndex: 'IVC_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			tbar : [
				{
					text: '초기화',
					handler : 'resetGpInfo'
				},
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'gpKeyword',
					name: 'keyword',
					width: 70,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchGpinfo'
					}
				},
				{
					text: '조회',
					handler : 'selGpinfoMemberList'
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
		//selectionchange: 'selGpinfoLoadPrdList'
	}
});




