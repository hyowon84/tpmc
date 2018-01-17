/**
 * Created by lucael on 2017-03-24.
 */

/* 상품 목록 */
Ext.define('td.view.grid.AucBidList',{
	extend: 'Ext.grid.Panel',
	xtype: 'AucBidList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'td.store.Local',
		'td.store.AucBidList',
		'td.view.combo.Product'
	],
	name : 'AucBidList',
	alias:'widget.AucBidList',
	controller:'ProductMainController',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 2
		});
		var store = Ext.create('td.store.AucBidList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {}
			},
			autoWidth : true,
			columns : [
				{ text: '경매코드',		 		width: 130,	dataIndex : 'ac_code',					sortable: false	},
				{ text: '상품코드',				width: 120,	dataIndex : 'it_id',						sortable: false	},
				{ text: '상품명',					width: 220,	dataIndex : 'it_name',					sortable: false,		hidden:true	},
				{ text: '입찰상태',				width: 120,	dataIndex : 'bid_stats_name',		sortable: false},
				{ text: '입찰수량',			 	width: 90,	dataIndex : 'bid_qty',					sortable: false,			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '입찰일시.밀리초',	width: 180,	dataIndex : 'bid_date'	},
				{ text: '현재입찰가',		 	width: 120,	dataIndex : 'bid_last_price',		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '희망입찰가',		 	width: 120,	dataIndex : 'bid_price',				style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '입찰회원계정',	 	width: 120,	dataIndex : 'mb_id'	},
				{ text: '이름',	 					width: 120,	dataIndex : 'mb_name'	},
				{ text: '닉네임',				 	width: 120,	dataIndex : 'mb_nick'	},
				{ text: '연락처',				 	width: 120,	dataIndex : 'mb_hp'	}
			],
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					//id : 'apl_keyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners: {
						keydown: 'searchKeyword'
					}
				},
				{
					text: '낙찰건 주문변환',
					iconCls: 'icon-bell',
					handler: 'OrderToBid'
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
		//selectionchange: ''
	}
});

