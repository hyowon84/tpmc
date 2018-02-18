Ext.Panel.prototype.buttonAlign = 'right';

Ext.define('td.view.invoice.winMakeInvoice', {
	extend: 'Ext.window.Window',
	xtype: 'winMakeInvoice',
	reference: 'winMakeInvoice',
	title: '공구상품목록 재정렬',
	width: 1400,
	minWidth: 350,
	height: 460,
	closable: true,
	closeAction: 'hide',
	maximizable: false,
	resizable : true,
	closeAction: 'hide',
	x: 200, y: 100,
	items: [
		{
			xtype : 'form',
			id : 'winMakeInvoiceForm',
			reference : 'winMakeInvoiceForm',
			url : '/resources/crud/invoice/invoice.insert.php',
			//url : '/adm/extjs/stock/crud/stock_update.php',
			layout: 'column',
			border : 0,
			autoHeight : true,
			split: false,
			collapsible: false,
			floatable: true,
			border: 0,
			items:[
				{
					labelAlign : 'top',
					columnWidth: 0.3,
					defaults: {
						anchor: '100%',
						collapsible: false,
						border : 0
					},
					items: [
						//{	xtype: 'label',	text: '- 발주시 입력정보 -',	style: 'margin:10px 0 0 10px; display:block;'	},
						{
							xtype: 'fieldset',
							title: '발주시 입력정보',
							labelAlign : 'top',
							defaultType: 'textfield',
							style : 'padding:10px',
							defaults: {
								labelWidth: 110,
								anchor: '100%',
								layout: 'hbox'
							},
							items: [
								{
									fieldLabel: '공구코드',
									name: 'gpcode',
									readOnly: true
								},
								{
									fieldLabel: '발주서 별칭',
									name: 'iv_name'
								},
								{
									xtype : 'cb_dealers',
									fieldLabel: '딜러',
									reference: 'dealers',
									name : 'iv_dealer',
									listConfig: {
										itemTpl: ['<div data-qtip="{ct_id}: {ct_name}">{ct_name} ({ct_id})</div>']
									}
								},
								{
									fieldLabel: '인보이스번호',
									emptyText: '인보이스번호',
									name: 'iv_order_no'
								},
								{
									xtype: 'datefield',
									format: 'Y-m-d',
									fieldLabel: '인보이스날짜',
									name: 'iv_date',
									allowBlank: false,
									maxValue: new Date(),
									value : new Date()
								},
								{
									xtype : 'cb_moneytype',
									reference: 'moneytype',
									name : 'money_type',
									fieldLabel: '통화유형',
									listConfig: {
										itemTpl: ['<div data-qtip="{value}">{value}</div>']
									}
								},
								{
									fieldLabel: '환율',
									emptyText: '0',
									name: 'od_exch_rate'
								},
								{
									fieldLabel: 'TAX',
									emptyText: '0',
									name: 'iv_tax'
								},
								{
									fieldLabel: 'SHIP.FEE',
									emptyText: '0',
									name: 'iv_shippingfee'
								},
								{
									fieldLabel: 'DISCOUNT.FEE',
									emptyText: '0',
									name: 'iv_discountfee'
								},
								{
									fieldLabel: '추출된 품목수',
									emptyText: '0',
									readOnly: true,
									reference : 'ItemCount'
								}
							]
						}
					]	//필드셋 items end
				},	//필드셋 엘리먼트 end
				{
					region: 'center',
					columnWidth: 0.7,
					xtype : 'MakeInvoiceList',
					height : 380
				}
			],	//items item end
			buttons: [
				{
					reference : 'InvoiceQty',
					fieldLabel: '수량',
					xtype: 'numberfield',
					minValue: 1
				},
				{
					text: '일괄수정',
					handler: 'updateInvoiceQty'
				},
				{
					text: '인쇄',
					handler: 'printWinMakeInvoice'
				},
				{
					text: '취소',
					handler: 'closeWinMakeInvoice'
				}, {
					text: '기록',
					reference : 'BtnSubmitInvoice',
					handler: 'submitWinMakeInvoice'
				}
			]
		}
	]
});


