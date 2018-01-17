/**
 * Created by lucael on 2017-03-24.
 */

/* 그레이딩 신청 목록 */
Ext.define('td.view.grid.GradingOrderList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GradingOrderList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.GradingOrderList',
		'td.view.combo.Grading'
	],
	name : 'GradingOrderList',
	alias:'widget.GradingOrderList',
	controller:'GradingMainController',
	headerPosition: 'left',
	title : '그레이딩 신청 목록',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.GradingOrderList');
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
				{ text: 'project',			dataIndex : 'project',			hidden:true,	 sortable: true	},
				{ text: 'pk_id',				dataIndex: 'no',						hidden:true,	 sortable: true	},
				{ text: '그레이딩명', 		dataIndex: 'grcode_name',		width: 120,		align:'left',			style:'text-align:center',	hidden:true	},
				{ text: '그레이딩코드', 	dataIndex: 'grcode',				width: 120,		align:'left',			style:'text-align:center',	hidden:true	},
				{ text: '묶음ID',				dataIndex: 'gr_id',					width: 140,		align:'left',			style:'text-align:center',	hidden:true	},
				{ text: '진행상태', 			dataIndex: 'gr_stats_name',	width: 120,		align:'left'	},

				{ text: '그레이딩번호',	dataIndex: 'gr_no',					width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '닉네임', 				dataIndex: 'gr_nickname',		width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '신청자', 				dataIndex: 'gr_name',				width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '상품명', 				dataIndex: 'gr_it_name',		width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '수량',					dataIndex: 'gr_qty',				width: 50,		align:'right',		style:'text-align:center',		sortable: true,	renderer: Ext.util.Format.numberRenderer('0,000'),		summaryType : 'sum',		summaryRenderer : rendererSummaryFormat	 },
				{ text: '메모1', 				dataIndex: 'gr_note1',			width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '메모2', 				dataIndex: 'gr_note2',			width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '원산지', 				dataIndex: 'gr_country',		width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '단위', 					dataIndex: 'gr_unit',				width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '무게', 					dataIndex: 'gr_weight',			width: 120,		style:'text-align:center'	},

				{ text: '금속', 					dataIndex: 'gr_metal',			width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '액면가', 				dataIndex: 'gr_parvalue',		width: 120,		style:'text-align:center'	},
				{ text: '년도', 					dataIndex: 'gr_year',				width: 120,		align:'center',		style:'text-align:center'	},

				{ text: '주문일',				dataIndex: 'reg_date',			width: 150,		align:'center',		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	}
			],
			tbar: [
				//{
				//	text	: '통계보기',
				//	iconCls	: 'icon-table_print_add',
				//	handler : 'showStatistics'
				//},
				//{
				//	text	: '통계숨김',
				//	iconCls	: 'icon-table_print_add',
				//	handler : 'hideStatistics'
				//},
				//{
				//	xtype : 'textfield',
				//	fieldLabel: '품목별 메모 변경',
				//	labelWidth : 140,
				//	name: 'message',
				//	width : 300,
				//	style : 'float:left',
				//	enableKeyEvents: true,
				//	listeners : {
				//		keyup: 'editItemMemo'
				//	}
				//},
				{
					text	: '추출',
					reference : 'BtnExportGrading',
					iconCls	: 'icon-table_print_add',
					handler : 'exportGradingList'
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
		//selectionchange: 'selOrderLoadLogs'
	}
});



/* 배송완료 목록 */
Ext.define('td.view.grid.GradedOrderList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GradedOrderList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.GradingOrderList',
		'td.view.combo.Grading'
	],
	name : 'GradedOrderList',
	alias:'widget.GradedOrderList',
	controller:'GradingMainController',
	headerPosition: 'left',
	title : '그레이딩 완료 목록',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.GradedOrderList');
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
				{ text: 'project',				dataIndex: 'project',			hidden:true,	 sortable: true	},
				{ text: '그레이딩코드', 		dataIndex: 'grcode',				width: 120,		align:'left',			style:'text-align:center',	hidden:true	},
				{ text: '그레이딩ID',			dataIndex: 'gr_id',					width: 140,		align:'left',			style:'text-align:center'	},
				{ text: '그레이딩번호',		dataIndex: 'gr_no',					width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '진행상태', 				dataIndex: 'gr_stats_name',	width: 120,		align:'left'	},
				{ text: '품목별 송장번호',	dataIndex: 'shipping_no',		width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '그레이딩명', 			dataIndex: 'grcode_name',		width: 120,		align:'left',			style:'text-align:center',	hidden:true	},
				{ text: '닉네임', 					dataIndex: 'gr_nickname',		width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '신청자', 					dataIndex: 'gr_name',				width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '원산지', 					dataIndex: 'gr_country',		width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '상품명', 					dataIndex: 'gr_it_name',		width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '수량',						dataIndex: 'gr_qty',				width: 80,		align:'right',		style:'text-align:center',		sortable: true,	renderer: Ext.util.Format.numberRenderer('0,000'),		summaryType : 'sum',		summaryRenderer : rendererSummaryFormat	 },
				{ text: '단위', 						dataIndex: 'gr_unit',				width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '무게', 						dataIndex: 'gr_weight',			width: 120,		style:'text-align:center'	},
				{ text: '금속', 						dataIndex: 'gr_metal',			width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '액면가', 					dataIndex: 'gr_parvalue',		width: 120,		style:'text-align:center'	},
				{ text: '년도', 						dataIndex: 'gr_year',				width: 120,		align:'center',		style:'text-align:center'	},
				{ text: '메모1', 					dataIndex: 'gr_note1',			width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '메모2', 					dataIndex: 'gr_note2',			width: 120,		align:'left',			style:'text-align:center'	},
				{ text: '주문일',					dataIndex: 'reg_date',			width: 150,		align:'center',		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	}
			],
			tbar: [
				{
					text	: '추출',
					reference : 'BtnExportGraded',
					iconCls	: 'icon-table_print_add',
					handler : 'exportGradedList'
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
		//selectionchange: 'selOrderLoadLogs'
	}
});


