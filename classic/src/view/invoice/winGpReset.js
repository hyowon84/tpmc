
Ext.define('td.view.invoice.winGpReset', {
	extend: 'Ext.window.Window',
	xtype: 'winGpReset',
	reference: 'winGpReset',
	title: '공구상품목록 재정렬',
	width: 500,
	minWidth: 450,
	height: 200,
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
			id : 'winGpResetForm',
			url : '/resources/crud/invoice/gpreset.update.php',
			width: '100%',
			height : 250,
			autoHeight : true,
			split: false,
			collapsible: false,
			floatable: true,
			border: 0,
			style: 'margin-top:10px;',
			items:[
				{
					xtype: 'container',
					flex: 1,
					width: '100%',
					style : 'float:left;',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: '공구코드',
							name : 'gpcode_list',
							width : '98%',
							readOnly : true,
							hidden : false
						},
						{
							xtype: 'textfield',
							fieldLabel: '공구명',
							name: 'gpcodename_list',
							width: '98%',
							margin: '0 0 10 6',
							readOnly: true
						}
					]
				}
			],	//items item end
			buttons: [{
				text: '취소',
				handler: 'closewinGpReset'
			}, {
				text: '전송',
				handler: 'submitwinGpReset'
			}]
		}
	]
});
