Ext.define('td.view.invoice.winGpMemo', {
	extend: 'Ext.window.Window',
	xtype: 'winGpMemo',
	reference: 'winGpMemo',
	title: '공구 메모수정',
	width: 600,
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
			id : 'winGpMemoForm',
			url : '/resources/crud/invoice/gpinfo.update.php?mode=memo',
			layout: 'column',
			border : 0,
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
					style : 'float:left;',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: '공구코드',
							name : 'gpcode',
							readOnly : true,
							hidden : true
						},
						{
							xtype: 'textarea',
							fieldLabel: '메모',
							labelAlign : 'top',
							width: '98%',
							height : 180,
							margin: '0 0 10 6',
							style:'float:left;',
							name: 'memo'
						},
						{
							xtype: 'textarea',
							fieldLabel: '발주관련메모',
							labelAlign : 'top',
							width: '98%',
							height : 180,
							margin: '0 0 10 10',
							style:'float:left;',
							name: 'invoice_memo'
						}
					]
				}
			],	//items item end
			buttons: [
				{xtype: 'tbfill'},
				{
					text: '취소',
					handler: 'closeWinGpMemo'
				},
				{
					text: '수정',
					handler: 'submitWinGpMemo'
				}
			]
		}
	]
});

