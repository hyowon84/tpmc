
/* 주문 목록 */
Ext.define('td.view.grid.OrderEditor',{
	extend: 'Ext.grid.Panel',
	xtype: 'OrderEditor',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*',
		'Ext.ux.grid.Printer',
		'td.store.Local',
		'td.store.OrderList',
		'td.view.combo.Product',
		'td.view.combo.Order'
	],
	name : 'OrderEditor',
	alias:'widget.OrderEditor',
	controller:'OrderEditMainController',
	selType: 'checkboxmodel',
	remoteSort: true,
	autoLoad : true,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.OrderList');
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
				{ text: '공구코드',			dataIndex: 'gpcode',								width: 100	},
				{ text: 'number',				dataIndex: 'number',								width: 100,		hidden:true	},
				{ text: '공구명', 				dataIndex: 'gpcode_name',						width: 120,		style:'text-align:center',		align:'left'	},
				{ text: '주문번호', 			dataIndex: 'od_id',									width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '주문상태', 			dataIndex: 'stats',									editor:{xtype: 'cb_stats'},		align:'center',			renderer: rendererCombo	},
				{ text: '총 합계금액',		dataIndex: 'TOTAL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000')	},
				{ text: '품목판매금액',	dataIndex: 'SELL_PRICE',						width: 120,		style:'text-align:center',		align:'right',			renderer: Ext.util.Format.numberRenderer('0,000'), 	summaryType : 'sum',				summaryRenderer : rendererSummaryFormat	},
				{ text: '판매단가',			dataIndex: 'it_org_price',					width: 120,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text: '수량',					dataIndex: 'it_qty',								width: 70,		style:'text-align:center',		align:'right',			editor:{allowBlank:false},		renderer: Ext.util.Format.numberRenderer('0,000'),		summaryType : 'sum',		summaryRenderer : rendererSummaryFormat	},
				{ text: '주문자',				dataIndex: 'name',									width: 70,		style:'text-align:center',		align:'center'	},
				{ text: '닉네임',				dataIndex: 'clay_id',	 							width: 120,		style:'text-align:center',		align:'center'	},
				{ text: 'IMG', 					dataIndex: 'gp_img',								width: 50,		renderer:rendererImage 		},
				{ text: '상품코드', 			dataIndex: 'it_id',									width: 260,		style:'text-align:center',		align:'left',		hidden:true	},
				{ text: '품목명', 				dataIndex: 'it_name',								width: 550,		style:'text-align:center',		align:'left'		}
			],
			dockedItems: [
				{
					xtype : 'toolbar',
					dock : 'top',
					items : [

					]
				}
			],
			bbar: {
				xtype: 'pagingtoolbar',
				id : 'ptb_orderlist',
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
		selectionchange: 'selOrderLoadLogs'
	}
});