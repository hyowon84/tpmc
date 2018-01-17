/**
 * Created by lucael on 2017-03-24.
 */

/* 배송예정 목록 */
Ext.define('td.view.grid.ShippingOrderList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ShippingOrderList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.ShippingOrderList',
		'td.view.shipping.winShippingExport',
		'td.view.combo.Product',
		'td.view.combo.Order'
	],
	name : 'ShippingOrderList',
	alias:'widget.ShippingOrderList',
	controller:'ShippingMainController',
	headerPosition: 'left',
	title : '배송예정 목록',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ShippingOrderList');
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
				{ text : 'project',			dataIndex : 'project',				hidden:true,	 sortable: true	},
				{ text : 'projectId',		dataIndex : 'projectId',			hidden:true	},
				{ text : 'taskId',			dataIndex : 'taskId',					hidden:true	},
				{ text : '주소비교',			dataIndex : 'addr_result',		width:100	},
				{ text : '회원정보 뒷주소',		dataIndex : 'mb_addr2',				width:120,	hidden:true	},
				{ text : '주문정보 뒷주소',		dataIndex : 'addr2',					width:120,	hidden:true	},
				{ text : '주문자',				dataIndex : 'buyer',					width:120	},
				{ text : '주문일시',			dataIndex : 'od_date',				groupIndex : '2' },
				{ text : '공구코드',			dataIndex : 'gpcode',					hidden:true	},
				{ text : '공구명',				dataIndex : 'gpcode_name',		style:'text-align:center',	width:140	},
				{ text : '상태코드',			dataIndex : 'IV_STATS',				width:70,	hidden:true	},
				{ text : '+입고',				dataIndex : 'ip_qty',					width:70,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),		groupIndex : '1',		hidden:true	},
				{ text : '+재고',				dataIndex : 'jaego',					width:70,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),		groupIndex : '1',		hidden:true	},
				{ text : '-집계',				dataIndex : 'od_qty',					width:70,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),		groupIndex : '1',		hidden:true	},
				{ text : '=차수',				dataIndex : 'cal_qty',				width:70,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),		groupIndex : '1',		hidden:true	},
				{ text : '입고상태',			dataIndex : 'IV_STATS_NAME',	width:120	},
				{ text : '주문ID',				dataIndex : 'od_id',					width:140	},
				{ text : '주문상태',			dataIndex : 'stats_name',			width:100	},
				{ text : '재고위치',			dataIndex : 'location',				width:100,	hidden:true	},
				{ text : 'img',					dataIndex : 'gp_img',					width:60,			renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';}			},
				{ text : '상품코드',			dataIndex : 'it_id',					width:160	},
				{ text : '품목명',				dataIndex : 'it_name',				width:450	},
				{ text : '품목별 메모',	dataIndex : 'it_memo',				width: 160,		style:'text-align:center',			editor:{allowBlank:false},		groupIndex : '1',		hidden:true },
				{ text : '주문가',				dataIndex : 'it_org_price',		sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문수량',			dataIndex : 'it_qty',					sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문총액',			dataIndex : 'total_price',		sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '관리자메모',		dataIndex : 'admin_memo',			width:120,	hidden:true	},
				{ text : '구매자메모',		dataIndex : 'memo',						width:120,	hidden:true	}
			],
			tbar: [
				{
					text	: '통계보기',
					iconCls	: 'icon-table_print_add',
					handler : 'showStatistics'
				},
				{
					text	: '통계숨김',
					iconCls	: 'icon-table_print_add',
					handler : 'hideStatistics'
				},
				{
					xtype : 'textfield',
					fieldLabel: '품목별 메모 변경',
					labelWidth : 140,
					name: 'message',
					width : 300,
					style : 'float:left',
					enableKeyEvents: true,
					listeners : {
						keyup: 'editItemMemo'
					}
				},
				{
					text	: '추출',
					reference : 'BtnExportShipping',
					iconCls	: 'icon-table_print_add',
					handler : 'exportShippinglist'
				},
				{	xtype: 'label',		fieldLabel: 'alert',		style : 'margin-left:20px; font-weight:bold; font-size:1.5em; color:red;',
					text: '묶음대기중인것은 미리 포장하지 마시오, 배송나갈때 한번에 포장하시오!!!'
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
Ext.define('td.view.grid.ShipedOrderList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ShipedOrderList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.ShippingOrderList',
		'td.view.combo.Product',
		'td.view.combo.Order'
	],
	name : 'ShipedOrderList',
	alias:'widget.ShipedOrderList',
	controller:'ShippingMainController',
	headerPosition: 'left',
	title : '배송완료 목록',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ShipedOrderList');
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
				{ text : 'projectId',				dataIndex : 'projectId',				hidden:true	},
				{ text : 'taskId',					dataIndex : 'taskId',						hidden:true	},
				{ text : 'project',					dataIndex : 'project',					hidden:true,	 	sortable: true },
				{ text : '주문일시',					dataIndex : 'od_date',					sortable: true	},
				{ text : '공구코드',					dataIndex : 'gpcode',						hidden:true	},
				{ text : '주문자',						dataIndex : 'buyer',						width:120	},
				{ text : '공구명',						dataIndex : 'gpcode_name',			style:'text-align:center',	width:220	},
				{ text : '주문ID',						dataIndex : 'od_id',						width:120	},
				{ text : '주문상태',					dataIndex : 'stats_name',				width:100	},
				{ text : '재고위치',					dataIndex : 'location',					width:100,	hidden:true	},
				{ text : '품목별 송장번호',	dataIndex : 'delivery_invoice',	width:130	},
				{ text : '최근 송장번호',		dataIndex : 'delivery_invoice2',width:130	},
				{ text : 'img',							dataIndex : 'gp_img',						width:60,			renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';}			},
				{ text : '상품코드',					dataIndex : 'it_id',						width:160	},
				{ text : '품목별 메모',			dataIndex : 'it_memo',					width: 160,		style:'text-align:center' },
				{ text : '품목명',						dataIndex : 'it_name',					width:450	},
				{ text : '주문가',						dataIndex : 'it_org_price',			sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문수량',					dataIndex : 'it_qty',						sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '주문총액',					dataIndex : 'total_price',			sortable: true,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			tbar: [
				{
					text: '추출',
					reference: 'BtnExportShiped',
					iconCls: 'icon-table_print_add',
					handler: 'exportShipedList'
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


