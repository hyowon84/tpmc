/**
 * Created by lucael on 2017-11-21.
 */


/* 팝업윈도우 > 발주입력폼에 쓰이는 에디터그리드 */
/* 공구 목록 */
Ext.define('td.view.grid.ShippingExportList',{
	extend: 'Ext.grid.Panel',
	xtype: 'ShippingExportList',
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'ShippingExportList',
	autoScroll : true,
	features: [{
		ftype: 'groupingsummary',
		groupHeaderTpl: '{name}',
		hideGroupedHeader: true,
		enableGroupingMenu: false
	}],
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.ShippingExportList');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			autoWidth : true,
			columns : [
				{ text : '주문자',			dataIndex : 'buyer',			width:120	},
				{ text : '재고위치',		dataIndex : 'location',				width:100,	hidden:true	},
				{	header : 'IMG',			dataIndex : 'gp_img',			width:60,			renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';},	align : 'center'	},
				{ text : '상품코드',		dataIndex : 'it_id',			width:120,		hidden:true	},
				{
					text: '품목',
					flex: 1,
					tdCls: 'task',
					sortable: true,
					dataIndex: 'it_name',
					hideable: false,
					align : 'left',			style : 'text-align:center',
					summaryType: 'count',
					summaryRenderer: function(value, summaryData, dataIndex) {
						return ( (value == 1 || !value ) ? '(1개의 품목)' : '(' + value + '개의 품목들)');
					}
				},
				{	header : 'Project',	dataIndex : 'project',		width:180,		sortable: true	},
				{	header : '주문상태',	dataIndex : 'stats_name',	style:'text-align:center',	align:'center',	sortable: true	},
				{
					header : '주문가',
					sortable: true,
					style:'text-align:center',
					align:'right',
					renderer: Ext.util.Format.numberRenderer('0,000'),
					summaryRenderer: Ext.util.Format.numberRenderer('0,000'),
					dataIndex : 'it_org_price'
				},
				{
					header : '주문수량',
					sortable: true,
					style:'text-align:center',
					align:'right',
					renderer: Ext.util.Format.numberRenderer('0,000'),
					dataIndex : 'it_qty',
					summaryType : 'sum',
					summaryRenderer: Ext.util.Format.numberRenderer('0,000'),
					field: {
						xtype: 'numberfield'
					}
				},
				{
					header : '주문총액',
					sortable: false,
					groupable: false,
					dataIndex : 'total_price',
					style:'text-align:center',
					align:'right',
					renderer: Ext.util.Format.numberRenderer('0,000'),
					summaryType: function(records, values) {
						var i = 0,
							length = records.length,
							total = 0,
							record;

						for (; i < length; ++i) {
							record = records[i];
							total += record.get('it_org_price') * record.get('it_qty');
						}
						return total;
					},
					summaryRenderer: Ext.util.Format.numberRenderer('0,000')
				}
			],
			//selModel	: {
			//	type: 'cellmodel'
			//},
			tbar : [
				{
					text	: '인쇄',
					iconCls	: 'icon-table_print',
					handler: 'printShippingExport'
				},
				/*{
					tooltip: '하단 통계 텍스트 숨김/활성',
					text: '주석 숨김/활성',
					enableToggle: true,
					pressed: true,
					handler: 'toggleShippingSummaryText'
				},*/
				{	xtype: 'label',		fieldLabel: 'alert',	autoWidth:true,		style : 'margin-left:20px; font-weight:bold; font-size:1.5em; color:red;',
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
		this.getStore().load();
	},
	listeners : {
		//selectionchange: 'selGpinfoLoadPrdList',
		edit: function (editor, e, eOpts) {
			if(globalData.temp == null) {
				globalData.temp = [];
			}
			globalData.temp.push([editor.context.rowIdx, editor.context.field, editor.context.originalValue]);
		},
		afterrender: function(obj, opt)	{
			new Ext.util.KeyMap({
				target: document,
				binding: [
					{
						key: "z",
						ctrl:true,
						fn: function(){
							if(globalData.temp != null && globalData.temp.length > 0) {
								var store = obj.getStore();
								var temp = globalData.temp;
								var length = temp.length-1;

								//rowIdx, field, value 순으로 temp의 값을 store에 입력
								store.getData().getAt(temp[length][0]).set(temp[length][1],temp[length][2]);
								globalData.temp.pop(length);
							} else {
								return;
							}
						}
					}
				],
				scope: this
			});
		}
	}

});