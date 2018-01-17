/**
 * Created by lucael on 2017-10-17.
 */




/*주문상태 통계*/
Ext.define('td.view.grid.DbStatsCnt',{
	extend: 'Ext.grid.Panel',
	xtype: 'DbStatsCnt',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'DbStatsCnt',
	alias:'widget.DbStatsCnt',
	remoteSort: true,
	autoLoad : true,
	height	: 260,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.DbStatsCnt');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: orderStatsColorSetting
			},
			autoWidth : true,
			columns : [
				{ text: '주문상태', 		dataIndex: 'stats',				width: 100,		style:'text-align:center',		align:'center',	hidden:true	},
				{ text: '주문상태', 		dataIndex: 'stats_nm',			width: 130,		style:'text-align:center',		align:'center'	},
				{ text: '건수',				dataIndex: 'STATS_CNT',			width: 60,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	},
				{ text: '물품수량',		dataIndex: 'TOTAL_QTY',			width: 85,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	},
				{ text: '총 합계금액',	dataIndex: 'TOTAL_PRICE',		width: 140,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	}
			]
		});
		this.callParent();
	}
});



/*발주건 미도착*/
Ext.define('td.view.grid.DbOldInvoice',{
	extend: 'Ext.grid.Panel',
	xtype: 'DbOldInvoice',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'DbOldInvoice',
	alias:'widget.DbOldInvoice',
	remoteSort: true,
	autoLoad : true,
	height	: 260,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.DbOldInvoice');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: orderStatsColorSetting
			},
			autoWidth : true,
			columns : [
				{ text: '공구코드', 		dataIndex: 'gpcode',				width: 130,		style:'text-align:center',		align:'center',	hidden:true	},
				{ text: '공구명', 		dataIndex: 'gpcode_name',		width: 130,		style:'text-align:center',		align:'center'	},
				{ text: 'IV_ID',			dataIndex: 'iv_id',				width: 120,		style:'text-align:center',		align:'center'	},
				{ text: '품목명',			dataIndex: 'iv_it_name',		width: 320,		style:'text-align:center',		align:'left'	},
				{ text: '발주량',			dataIndex: 'iv_qty',				width: 80,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	},
				{ text: '매입가(￦)',	dataIndex: 'iv_dealer_price',	width: 130,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	},
				{ text: '매입가($)',		dataIndex: 'iv_dealer_price',	width: 130,		style:'text-align:center',		align:'right',		renderer: rendererColumnFormat	},
				{ text: '딜러',			dataIndex: 'iv_dealer',			width: 80,		style:'text-align:center',		align:'left'	}
			]
		});
		this.callParent();
	}
});



/* 방문자 정보 */
Ext.define('td.view.grid.DbVisitor',{
	extend: 'Ext.grid.Panel',
	xtype: 'DbVisitor',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'DbVisitor',
	alias:'widget.DbVisitor',
	remoteSort: true,
	autoLoad : true,
	height	: 260,
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.DbVisitor');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: orderStatsColorSetting
			},
			autoWidth : true,
			columns : [
				{ text: '방문일', 				dataIndex: 'vi_date',			width: 100,		style:'text-align:center',		align:'center'	},
				{ text: '방문시간', 			dataIndex: 'vi_time',			width: 100,		style:'text-align:center',		align:'center'	},
				{ text: 'IP주소',				dataIndex: 'vi_ip',				width: 160,		style:'text-align:center',		align:'left'	},
				{ text: '이동경로출처',	dataIndex: 'vi_referer',	width: 600,		style:'text-align:center',		align:'left'	},
				{ text: '접속환경',			dataIndex: 'vi_agent',		width: 600,		style:'text-align:center',		align:'left'	}
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
	}
});