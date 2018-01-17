/**
 * Created by lucael on 2017-03-24.
 */


/* 상품 목록 */
Ext.define('td.view.grid.AucPrdList',{
	extend: 'Ext.grid.Panel',
	xtype: 'AucPrdList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'td.store.Local',
		'td.store.ProductList',
		'td.view.combo.Product'
	],
	name : 'AucPrdList',
	alias:'widget.AucPrdList',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.AucPrdList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{	groupIndex:'1',		text: '경매',					dataIndex: 'ac_yn',								style:'text-align:center',		align:'center',		allowBlank: true,		editor: {xtype : 'cb_yn'},		renderer: rendererCombo	},				
				{ groupIndex:'2',		text: '경매진행코드',	dataIndex: 'ac_code',							width: 125,		style:'text-align:center',	align:'center'	},
				{ groupIndex:'2',		text: '경매마감일',		dataIndex: 'ac_enddate',					width: 160,		align:'left', 		style:"text-align:center;",		field:{ xtype: 'datefield',	format:'Y-m-d H:i:s' },		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ groupIndex:'2',		text: '현재입찰가',		dataIndex: 'MAX_BID_LAST_PRICE',	width: 130,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ groupIndex:'2',		text: '최고입찰가',		dataIndex: 'MAX_BID_PRICE',				width: 130,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ groupIndex:'2',		text: '경매시작가',		dataIndex: 'ac_startprice'	,			width: 130,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ groupIndex:'2',		text: '경매수량',			dataIndex: 'ac_qty',							width: 90,		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ groupIndex:'1',		text: 'img',					dataIndex: 'gp_img',							width: 60,		renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';}			},
				{ groupIndex:'1',		text: '상품코드',			dataIndex: 'gp_id',								width: 160		},
				{ groupIndex:'1',		text: '품목명',				dataIndex: 'gp_name',							width: 350,		editor:{allowBlank:false}	}				
			],
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					id : 'apl_keyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners: {
						keydown: 'searchKeyword'
					}
				},
				{
					text	: '경매시작',
					iconCls	: 'icon-bell',
					handler: 'auctionStart'
				},
				{
					text	: '경매종료',
					iconCls	: 'icon-cancel',
					handler: 'auctionEnd'
				},
				{
					text	: '상품수정PAGE',
					handler: 'gotoPrdEditPage'
				},
				{
					text	: '경매상품PAGE',
					handler: 'gotoAucPrdPage'
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
		selectionchange: 'selPrdLoadBidList'
	}
});

