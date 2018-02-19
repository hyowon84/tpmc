Ext.Panel.prototype.buttonAlign = 'right';

Ext.define('td.view.invoice.winMakeWire', {
	extend: 'Ext.window.Window',
	xtype: 'winMakeWire',
	reference: 'winMakeWire',
	title: '송금내역 작성',
	width: 862,
	height: 487,
	closable: true,
	closeAction: 'hide',
	maximizable: false,
	resizable : true,
	closeAction: 'hide',
	x: 200, y: 100,
	items: [
		{
			xtype : 'form',
			id : 'winMakeWireForm',
			url : '/resources/crud/invoice/wire.create.php',
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
					columnWidth: 0.45,
					defaults: {
						anchor: '100%',
						collapsible: false,
						border : 0
					},
					items: [
						//{	xtype: 'label',	text: '- 발주시 입력정보 -',	style: 'margin:10px 0 0 10px; display:block;'	},
						{
							xtype: 'fieldset',
							title: '송금내역 기본정보',
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
									fieldLabel: '발주ID',
									name: 'iv_id',
									readOnly: true
								},
								{
									fieldLabel: '송금번호/R,NO',
									name: 'wr_name'
								},
								{
									xtype: 'datefield',
									format: 'Y-m-d',
									fieldLabel: '송금일',
									name: 'wr_date',
									allowBlank: false,
									maxValue: new Date(),
									value : new Date()
								},
								{
									xtype: 'cb_wiretype',
									reference: 'wiretype',
									fieldLabel: '송금유형',
									name: 'wr_type',
									listConfig: {
										itemTpl: ['<div data-qtip="{value}">{title}</div>']
									}
								},
								{
									xtype : 'cb_moneytype',
									reference: 'moneytype',
									name: 'wr_currency',
									fieldLabel: '통화유형',
									listConfig: {
										itemTpl: ['<div data-qtip="{value}">{value}</div>']
									}
								},
								{
									fieldLabel: '송금기준환율',
									id: 'wr_exchrate',
									name: 'wr_exchrate',
									allowBlank: false
								},
								{
									xtype: 'numberfield',
									reference : 'wr_totalprice',
									name: 'wr_totalprice',
									fieldLabel: '송금 총액',
									labelWidth:150,
									allowBlank: false,
									enforceMaxLength: true,
									maskRe: /\d/
								},
								{
									fieldLabel: '송금수수료(국외)',
									name: 'wr_out_fee',
									allowBlank: false
								},
								{
									fieldLabel: '송금수수료(국내)',
									name: 'wr_in_fee',
									allowBlank: false
								},
								{
									xtype: 'textarea',
									fieldLabel: '메모',
									labelAlign : 'top',
									width: '98%',
									height : 60,
									margin: '0 0 10 6',
									style:'float:left;',
									name: 'wr_memo'
								}
							]
						}
					]	//필드셋 items end
				},	//필드셋 엘리먼트 end
				{
					region: 'center',
					columnWidth: 0.55,
					xtype : 'MakeWireList',
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
					handler: 'printWinMakeWire'
				},
				{
					text: '취소',
					handler: 'closeWinMakeWire'
				}, {
					text: '기록',
					reference : 'BtnSubmitWire',
					handler: 'submitWinMakeWire'
				}
			]
		}
	]
});


