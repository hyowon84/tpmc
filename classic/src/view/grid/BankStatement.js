
/* 입출금내역 로그 */
Ext.define('td.view.grid.BankStatement',{
	extend: 'Ext.grid.Panel',
	xtype: 'BankStatement',
	//viewModel: { type: 'MemberList' },
	requires: [
		'Ext.selection.CellModel',
		'Ext.grid.*',
		'Ext.data.*',
		'Ext.util.*',
		'Ext.form.*'
	],
	name : 'BankStatement',
	alias:'widget.BankStatement',
	controller:'BankMainController',
	remoteSort: true,
	autoLoad : true,
	selType: 'checkboxmodel',
	dockedItems: [
		{
			xtype : 'toolbar',
			dock : 'top',
			items : [
				{	xtype: 'label',	text: '검색어 : ',		width:60,	style : 'font-weight:bold;'},
				{
					xtype: 'textfield',
					id : 'keyword_banklist',
					name: 'keyword_banklist',
					style: 'padding:0px;',
					enableKeyEvents: true,
					listeners:{
						keydown: 'searchBankData'
					}
				},
				{
					xtype: 'cb_banktype',
					name : 'cb_banktype',
					fieldLabel : '입출금유형',
					labelWidth : 80,
					width : 200
				},
				{
					fieldLabel : '시작일',
					labelWidth : 50,
					xtype: 'datetimefield',
					name : 'bank_sdate',
					format: "Y-m-d",
					submitFormat : "Y-m-d",
					width: 180
				},
				{
					fieldLabel : '종료일',
					labelWidth: 50,
					xtype : 'datetimefield',
					name : 'bank_edate',
					format: "Y-m-d",
					submitFormat : "Y-m-d",
					width: 180
				}
			]
		},
		{
			xtype : 'toolbar',
			dock : 'top',
			items : [
				{
					xtype: 'cb_banktype',
					reference : 'cb_banktype',
					name : 'cb_banktype',
					fieldLabel : '입출금유형',
					labelWidth : 80,
					width : 200
				},
				{
					xtype: 'cb_taxtype',
					reference : 'cb_taxtype',
					name : 'cb_taxtype',
					fieldLabel : '세금처리유형',
					labelWidth : 90,
					width : 230
				},
				{
					text	: '변경',
					reference	: 'BtnBankUpdate',
					iconCls	: 'icon-table_edit',
					handler : 'updateBankInfo'
				},
				{
					text	: '페이지 저장',
					iconCls	: 'icon-pagesave',
					handler: 'saveBankPage'
				},
				{
					text	: '인쇄',
					iconCls	: 'icon-table_print',
					handler: 'printBankPage'
				}
			]
		}
	],
	initComponent: function(){
		this.cellEditing = new Ext.grid.plugin.CellEditing({
			clicksToEdit: 1
		});
		var store = Ext.create('td.store.BankStatement');
		Ext.apply(this, {
			store: store,
			plugins: [this.cellEditing],
			viewConfig: {
				stripeRows: true,
				getRowClass: colorSettingBankStats,
				enableTextSelection: true
			},
			autoWidth : true,
			columns : [
				{ text : '통장',		 					width : 90,			dataIndex : 'account_name',		style:'text-align:center',				align:'center',	hidden:true	},
				{ text : '거래일시', 				width : 140,		dataIndex : 'tr_date',				style:'text-align:center',				align:'center',	renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s') },
				{ text : '거래수단',			 		width : 70,			dataIndex : 'tr_type',				style:'text-align:center',				hidden:true	},
				{ text : '출금액',						width : 100,		dataIndex : 'output_price',		style:'text-align:center',				align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '입금액',						width : 100,		dataIndex : 'input_price',		style:'text-align:center',				align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') },
				{ text : '거래자명',	 				width : 120,		dataIndex : 'trader_name',		style:'text-align:center'		},
				{ text : '입출금유형', 			width: 120,			dataIndex : 'bank_type',			editor:{xtype: 'cb_banktype'},		renderer: rendererCombo	},
				{ text : '연결된 주문',	 		width : 250,		dataIndex : 'admin_link',			editor: { allowBlank : true },		style:'text-align:center'		},
				{ text : '관리자 메모',	 		width : 200,		dataIndex : 'admin_memo',			editor: { allowBlank : true },		style:'text-align:center'		},
				{ text : '세금처리유형', 		width: 120,			dataIndex : 'tax_type',				editor:{xtype: 'cb_taxtype'},			renderer: rendererCombo	},
				{ text : '입력번호',	 				width : 120,		dataIndex : 'tax_no',					editor: { allowBlank : true },		style:'text-align:center'		},
				{ text : '후처리번호',				width : 120,		dataIndex : 'tax_refno',			editor: { allowBlank : true },		style:'text-align:center'		},
				{ text : '현금영수증 메모',	width : 200,		dataIndex : 'cash_memo',			editor: { allowBlank : true },		style:'text-align:center'		}				
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
	},
	listeners : {
		selectionchange: 'selectBankDataLoadOrders'
	}
});
