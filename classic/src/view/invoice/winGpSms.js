Ext.define('td.view.invoice.winGpSms', {
	extend: 'Ext.window.Window',
	xtype: 'winGpSms',
	reference: 'winGpSms',
	title: '공구 단체문자',
	width: 540,
	minWidth: 540,
	height: 550,
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
			url : '/resources/crud/invoice/sendsms.php',
			width: '100%',
			height : 450,
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
					style : 'float:left; padding-top:0px; margin-top:0px;',
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
							xtype:'cb_sms_stats',
							fieldLabel: 'SMS템플릿',
							reference : 'cb_stats',
							margin: '0 0 10 6',
							style : 'float:left;',
							value : ''
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
							reference : 'sms_text_head',
							name: 'sms_text_head',
							fieldLabel: '머리말',
							labelAlign : 'top',
							width: '98%',
							height : 50,
							margin: '0 0 10 6',
							style:'float:left;',
							enableKeyEvents: true,
							listeners : {
								keyup: 'keyupSizeCnt'
							}
						},
						{
							xtype: 'textarea',
							reference : 'sms_text',
							name: 'sms_text',
							fieldLabel: '템플릿',
							labelAlign : 'top',
							width: '98%',
							height : 110,
							margin: '0 0 10 6',
							style:'float:left;',
							enableKeyEvents: true,
							listeners : {
								keyup: 'keyupSizeCnt'
							}
						},
						{
							xtype: 'textarea',
							reference : 'sms_text_tail',
							name: 'sms_text_tail',
							fieldLabel: '꼬리말',
							labelAlign : 'top',
							width: '98%',
							height : 50,
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
							reference : 'sizecnt',
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
			buttons: [
				{xtype: 'tbfill'},
				{
					text: '취소',
					tabCls: 'right-tab',
					handler: 'closeWinGpSms'
				}, {
					text: '전송',
					tabCls: 'right-tab',
					handler: 'submitWinGpSms'
				}
			]
		}
	]
});



