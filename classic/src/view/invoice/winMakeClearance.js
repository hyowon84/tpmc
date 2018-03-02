Ext.define('td.view.invoice.winMakeClearance', {
	extend: 'Ext.window.Window',
	xtype: 'winMakeClearance',
	reference: 'winMakeClearance',
	title: '통관내역 작성',
	width: 1350,
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
			id : 'winMakeClearanceForm',
			url : '/resources/crud/invoice/clearance.create.php',
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
					columnWidth: 0.35,
					defaults: {
						anchor: '100%',
						collapsible: false,
						border : 0
					},
					items: [
						//{	xtype: 'label',	text: '- 발주시 입력정보 -',	style: 'margin:10px 0 0 10px; display:block;'	},
						{
							xtype: 'fieldset',
							title: '통관내역 기본정보',
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
									fieldLabel: '별칭',
									name: 'cr_name'
								},
								{
									fieldLabel: '수입신고번호',
									name: 'cr_refno'
								},
								{
									fieldLabel: 'B/L 번호',
									name: 'cr_blno'
								},
								{
									xtype: 'numberfield',
									name: 'cr_taxfee',
									fieldLabel: '관/부가세',
									emptyText: '0',
									labelWidth:150,
									allowBlank: false,
									enforceMaxLength: true,
									maskRe: /\d/
								},
								{
									fieldLabel: '배송비',
									emptyText: '0',
									name: 'cr_shipfee'
								},
								{
									xtype: 'datefield',
									format: 'Y-m-d',
									fieldLabel: '통관일',
									name: 'cr_date',
									allowBlank: false,
									maxValue: new Date(),
									value : new Date()
								},
								{
									xtype: 'textarea',
									fieldLabel: '메모',
									labelAlign : 'top',
									width: '98%',
									height : 150,
									margin: '0 0 10 6',
									style:'float:left;',
									name: 'cr_memo'
								}
							]
						}
					]	//필드셋 items end
				},	//필드셋 엘리먼트 end
				{
					region: 'center',
					columnWidth: 0.65,
					xtype : 'MakeClearanceList'
				}
			],	//items item end
			buttons: [
				//{
				//	reference : 'InvoiceQty',
				//	fieldLabel: '수량',
				//	xtype: 'numberfield',
				//	minValue: 1
				//},
				//{
				//	text: '일괄수정',
				//	handler: 'updateInvoiceQty'
				//},
				{xtype: 'tbfill'},
				{
					text: '인쇄',
					handler: 'printWinMakeClearance'
				},
				{
					text: '취소',
					handler: 'closeWinMakeClearance'
				}, {
					text: '통관처리',
					reference : 'BtnSubmitClearance',
					handler: 'submitWinMakeClearance'
				}
			]
		}
	]
});


