
Ext.define('td.view.shipping.winExportShippingMember', {
	extend: 'Ext.window.Window',
	xtype: 'winExportShippingMember',
	reference: 'winExportShippingMember',
	requires:[
		'td.view.shipping.ShippingMainController',
		'td.view.combo.Order'
	],
	title: '배송예정회원 추출',
	controller: 'ShippingMainController',
	width: 480,
	height: 300,
	closable: true,
	closeAction: 'hide',
	maximizable: false,
	resizable : true,
	closeAction: 'hide',
	x: 200, y: 100,
	layout : 'fit',
	items: [
		{
			xtype : 'form',
			id : 'winExportShippingMemberForm',
			url : '/resources/excel/shippingmember.php',
			width: '100%',
			autoHeight : true,
			split: false,
			collapsible: false,
			floatable: true,
			border: 0,
			items:[
				{
					xtype: 'container',
					flex: 1,
					width: '100%',
					style : 'float:left;padding:10px;',
					items: [
						{
							xtype: 'textarea',
							fieldLabel: '주문번호',
							reference : 'list_od_id',
							name : 'list_od_id',
							width : '98%',
							margin: '0 0 10 6'
						},
						{
							xtype: 'textarea',
							fieldLabel: '닉네임',
							reference : 'list_nick',
							name : 'list_nick',
							width : '98%',
							margin: '0 0 10 6'
						}
					]
				}
			],	//items item end
			buttons: [
				{
					xtype: 'statusbar',
					dock: 'bottom',
					reference: 'sb_shipping',
					defaultText: '대기..',
					plugins: {
						ptype: 'validationstatus',
						form: 'winExportShippingMemberForm'
					}
				},'->',
				{
					text: '추출',
					handler: 'submitWinExportShippingMember'
				},
				{
					text: '취소',
					handler: 'closeWinExportShippingMember'
				}
			]
		}
	]
});


