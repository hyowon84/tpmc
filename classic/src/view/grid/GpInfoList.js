
/* 공구 목록 */
Ext.define('td.view.grid.GpInfoList',{
	extend: 'Ext.grid.Panel',
	xtype: 'GpInfoList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'GpInfoList',
	alias:'widget.GpInfoList',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.GpInfoList');
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
				{ text: '등록일',	 	width: 120,	dataIndex : 'reg_date',			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
				{ text: '시작일',		dataIndex : 'start_date',								sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' }	},
				{ text: '종료일',		dataIndex : 'end_date',									sortable: true,	summaryType: 'max',		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	summaryRenderer: Ext.util.Format.dateRenderer('Y-m-d'),		field: { xtype: 'datefield' }	},
				//{ text: '시작일',	width: 120,	dataIndex : 'start_date',		sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
				//{ text: '종료일',	width: 120,	dataIndex : 'end_date',			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
				{ text: '품목수',		width: 120,	dataIndex : 'ITEM_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }
			],
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					//id : 'gpkeyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown:function(t,e){
							var grid_gpinfo = Ext.getCmp('prd_gpinfo').items.items[0];
							
							if(e.keyCode == 13){
								grid_gpinfo.store.loadData([],false);
								Ext.apply(grid_gpinfo.store.getProxy().extraParams, {keyword : this.getValue()});
								grid_gpinfo.store.load();
							}
						}
					}
				},
				{
					text	: '상품관리모드',
					iconCls	: 'icon-eye',
					handler : function() {
						var grid = Ext.getCmp('prd_product').items.items[0];
						
						//grid_orderlist;
						for(var i=0; i < grid.columns.length; i++) {
							if(grid.columns[i].viewSet1 == 'Y') {
								grid.columns[i].show();
							}
							else {
								grid.columns[i].hide();
							}
						}
					}
				},
				{
					text	: '재고관리모드',
					iconCls	: 'icon-eye',
					handler : function() {
						var grid = Ext.getCmp('prd_product').items.items[0];

						//grid_orderlist;
						for(var i=0; i < grid.columns.length; i++) {
							if(grid.columns[i].viewSet2 == 'Y') {
								grid.columns[i].show();
							}
							else {
								grid.columns[i].hide();
							}
						}
					}
				},
				{
					text	: '경매등록모드',
					iconCls	: 'icon-eye',
					handler : function() {
						var grid = Ext.getCmp('prd_product').items.items[0];

						//grid_orderlist;
						for(var i=0; i < grid.columns.length; i++) {
							if(grid.columns[i].viewSet3 == 'Y') {
								grid.columns[i].show();
							}
							else {
								grid.columns[i].hide();
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
		selectionchange: 'selGpinfoLoadPrdList'
	}
});




