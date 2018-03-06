/**
 * Created by lucael on 2017-03-24.
 */

/* 상품 목록 */
Ext.define('td.view.grid.ProductList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ProductList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.ProductList',
		'td.view.combo.Product'
	],
	name : 'ProductList',
	alias:'widget.ProductList',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : false,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		
		var store = Ext.create('td.store.ProductList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: function(record, index) {},
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ viewSet1:'Y',																text : '노출',					dataIndex : 'gp_use',					width: 65,		align:'center', 	editor:  {xtype : 'cb_yesno'},			renderer: rendererCombo	},
				//{ viewSet1:'Y',		text: '회원전용',				dataIndex: 'only_member',			width: 80,		align:'center',		style:'text-align:center',		xtype: 'checkcolumn'	},
				{ viewSet1:'Y',																text: '최대구매수량',		dataIndex : 'gp_buy_max_qty',	width: 100,		editor:{allowBlank:true}	},
				{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: 'img',						dataIndex : 'gp_img',					width: 60,		renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';}			},
				{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: '상품코드',				dataIndex : 'gp_id',					width: 160		},
				{ viewSet1:'Y', viewSet3:'Y',									text: 'EBAY_IT_ID',			dataIndex : 'ebay_id',				width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'center',		hidden:true	},
				{ viewSet1:'Y',																text: '카테고리',				dataIndex : 'ca_id',					width: 100,		editor:{allowBlank:true},		align:'center',			style:'text-align:center'	},
				{ viewSet1:'Y',	viewSet2:'Y',									text: '재고위치',				dataIndex : 'location',				width: 100,		editor:{allowBlank:true},		align:'center',			style:'text-align:center'	},
				{ viewSet1:'Y',	viewSet2:'Y',									text: '재고메모',				dataIndex : 'jaego_memo',				width: 100,		editor:{allowBlank:true}	},
				{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: '품목명',					dataIndex : 'gp_name',				width: 350,		editor:{allowBlank:false},	align:'left',				style:'text-align:center'	},
				{ viewSet1:'Y', 															text: '카드가노출', 			dataIndex : 'gp_card',											editor:{xtype: 'cb_yesno'},	align:'center',			renderer: rendererCombo	},
				{	viewSet1:'Y',																text: '가격유형',				dataIndex : 'gp_price_type',		style:'text-align:center',		align:'center',		allowBlank: true,		editor: {xtype : 'cb_pricetype'},		renderer: rendererCombo	},
				{ viewSet1:'Y',																text: '판매가(￦)',			dataIndex : 'gp_price',				width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ viewSet1:'Y',																text: '달러가($)',				dataIndex : 'gp_usdprice',		width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00')	},
				{ viewSet1:'Y',																text: '스팟시세가(￦)',	dataIndex : 'gp_realprice',		width: 140,		style:'text-align:center',		align:'right',					renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ viewSet1:'Y',																text: '매입가($)',				dataIndex : 'gp_price_org',		width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00')	},
				{ viewSet1:'Y', 															text: '유형', 						dataIndex : 'gp_metal_type',								editor:{xtype: 'cb_metaltype'},	align:'center',			renderer: rendererCombo	},
				{ viewSet1:'Y',																text: 'Oz',							dataIndex : 'gp_metal_don',		width: 60,		style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00'),	editor:{allowBlank:false}	},
				{ viewSet1:'Y', 															text: '스팟유형', 				dataIndex : 'gp_spotprice_type',						editor:{xtype: 'cb_spottype'},	align:'center',			renderer: rendererCombo	},
				{ viewSet1:'Y',																text: '+스팟시세',				dataIndex : 'gp_spotprice',		width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00'),	editor:{allowBlank:false}	},
				{ viewSet1:'Y',	viewSet2:'Y',									text: '실재고(a-b+c)',		dataIndex : 'real_jaego',			width: 130,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
				{ viewSet1:'Y',	viewSet2:'Y',									text: 'a.재고설정',			dataIndex : 'jaego',					width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	editor:{allowBlank:false}	},
				{ viewSet1:'Y',	viewSet2:'Y',									text: 'b.주문',					dataIndex : 'CO_SUM',					width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
				{ viewSet1:'Y',	viewSet2:'Y',									text: 'c.통관',					dataIndex : 'CR_SUM',					width: 90,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
				{ viewSet1:'Y',	viewSet2:'Y',									text: 'd.발주',					dataIndex : 'IV_SUM',					width: 90,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
				{ viewSet1:'Y',																text: '가격옵션수',			dataIndex : 'OPT_CNT',				style :'text-align:center',				align:'right',			renderer: Ext.util.Format.numberRenderer('0,000') },
				{ viewSet1:'Y',																text: '정렬순서',				dataIndex : 'gp_order',				width: 80,			editor:{allowBlank:true},		style:'text-align:center',	align:'right'	},
				{ viewSet1:'Y',																text: '등록일',	 				dataIndex : 'gp_update_time',	width: 160,			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ viewSet1:'Y', 															text: '유형', 						dataIndex : 'ac_yn',					editor:{xtype: 'cb_yn'},		align:'center',			renderer: rendererCombo	},
				{ viewSet3:'Y',																text: '경매진행코드',		dataIndex : 'ac_code',				width: 140,			style:'text-align:center',	align:'center'	},
				{ viewSet3:'Y',																text: '경매마감일',	 		dataIndex : 'ac_enddate',	width: 160,			sortable: true,		field: { xtype: 'datefield',	format:'Y-m-d H:i:s' },		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
				{ viewSet3:'Y',																text: '경매수량',				dataIndex : 'ac_qty',					width: 120,			editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ viewSet3:'Y',																text: '경매시작가',			dataIndex : 'ac_startprice',	width: 140,			editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{	xtype: 'label',	text: '검색어 : ',		autoWidth:true,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					id : 'keyword',
					name: 'keyword',
					width: 140,
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchKeyword'
					}
				},
				
				{xtype: 'cb_yesno',			id:'combo_yesno',			value:'',	width:160,	fieldLabel:'노출',		LabelWidth:40 },
				{xtype: 'cb_pricetype',	id:'combo_pricetype',	value:'',	width:100},
				{xtype: 'cb_metaltype',	id:'combo_metaltype',	value:'',	width:70},
				{xtype: 'cb_spottype',	id:'combo_spottype',	value:'',	width:100},
				{
					id		: 'iv_stats_update',
					text	: '변경',
					iconCls	: 'icon-table_edit',
					handler : 'UpdPrd'
				},
				{
					text	: '인쇄',
					iconCls	: 'icon-table_print',
					handler: 'printPrdList'
				},
				{
					text	: '엑셀',
					iconCls	: 'icon-excel',
					handler: 'downloadExcel'
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
					text	: '상품PAGE',
					handler: 'gotoPrdPage'
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
		//this.getStore().load();
	},
	listeners : {
		//selectionchange: ''
	}
});

