
/* 그레이딩 목록 */
Ext.define('td.view.grid.GradingInfoList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GradingInfoList',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'td.view.combo.Grading'
	],
	name : 'GradingInfoList',
	alias:'widget.GradingInfoList',
	//controller:'ProductMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.GradingInfoList');
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
				{ text: '그레이딩코드',		dataIndex: 'grcode',				width : 120,	hidden:true	},
				{ text: '그레이딩명',			dataIndex: 'grcode_name',		width : 150,	sortable: false,		style:'text-align:center',	align:'left'	},
				{ text: '진행상태', 				dataIndex: 'gr_stats',			width: 120,		editor:{xtype: 'cb_grstats'},		renderer: rendererCombo	},
				{ text: '날짜',						dataIndex: 'reg_date',			width : 120,	hidden:true	}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		width:70,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					reference : 'grading_keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchGradingKeyword'
					}
				},
				{
					text	: '추가',
					reference : 'addGradingCode',
					iconCls	: 'icon-add',
					handler : 'openWinMakeGrading'
				},
				{
					text	: '삭제',
					reference : 'deleteGradingCode',
					iconCls	: 'icon-delete',
					handler : 'deleteGrading'
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




