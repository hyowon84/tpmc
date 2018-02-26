
Ext.define('td.view.invoice.winGpSms', {
	extend: 'Ext.window.Window',
	xtype: 'winGpSms',
	reference: 'winGpSms',
	title: '공구 단체문자',
	width: 500,
	minWidth: 450,
	height: 450,
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
			id : 'winGpSmsForm',
			url : '/resources/crud/invoice/gpsms.php',
			width: '100%',
			height : 350,
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
							margin: '0 0 10 6',
							hidden : false
						},
						{
							xtype: 'textfield',
							fieldLabel: '공구명',
							name : 'gpcodename_list',
							width : '98%',
							margin: '0 0 10 6',
							readOnly : true
						},
						{
							xtype:'cb_stats',
							reference : 'cb_stats',
							style : 'float:left;'
						},
						{
							xtype : 'button',
							text	: '변경',
							iconCls	: 'icon-table_edit',
							width : 60,
							style : 'margin-left:10px; float:left;',
							handler : 'changeStats'
						},

						{
							xtype: 'textarea',
							reference : 'sms_text',
							name: 'sms_text',
							fieldLabel: '문자내용',
							labelAlign : 'top',
							width: '98%',
							height : 180,
							margin: '0 0 10 6',
							style:'float:left;',
							enableKeyEvents: true,
							listeners : {
								keyup: 'keyupSizeCnt'
							}
						},

						{
							xtype: 'textfield',
							readOnly: true,
							id : 'sizecnt',
							border: 0,
							style : 'margin-left:10px; float:left; font-weight:bold;',
							width : 40
						},
						{	xtype: 'label',
							fieldLabel: 'alert',
							style : 'float:left; font-weight:bold; font:1.0em color:red;',
							text: 'byte(max : 80byte )'
						}
					]
				}
			],	//items item end
			buttons: [{
				text: '취소',
				handler: 'closeWinGpSms'
			}, {
				text: '전송',
				handler: 'submitWinGpSms'
			}]
		}
	]
});


