
Ext.define('td.view.product.mProductMain', {
	extend: 'Ext.Panel',
	xtype : 'mProductMain',
	requires: [
		'Ext.form.FieldSet',
		'Ext.field.Radio',
		'Ext.field.Select',
		'td.view.product.mProductMainController',
		'td.view.grid.mGpInfoList',
		'td.view.grid.mProductList'

	],
	closable: false,
	layout: {
		type: 'vbox'
	},
	padding: '0 0 0 0',
	margin: '0 0 0 0',
	autoHeight: true,
	items: [
		{
			xtype: 'fieldset',
			controller : 'mProductMain',
			id: 'radio_timetype',
			title: '조회 유형',
			layout: 'hbox',
			platformConfig: {
				'!desktop': {
					defaults: {
						//bodyAlign: 'end'
					}
				}
			},
			defaults: {
				xtype: 'radiofield',
				name : 'timetype',
				labelWidth: '35%',
				labelAlign: 'right',
				style : 'float:left; margin:0px auto;',
				listeners: {
					//change: 'onSelectChange'
				}
			},
			items: [
				{
					name: 'timetype',
					label: '분',
					value: 'minute',
					width : 40,
					checked: true
				},
				{
					name: 'timetype',
					label: '시간',
					value: 'hour',
					width : 40
				},
				{
					name: 'timetype',
					label: '일',
					value: 'day',
					width : 40
				},
				{
					name: 'timetype',
					label: '월',
					value: 'month',
					width : 40
				}
			]
		},
		{
			xtype : 'mProductList',
			title : '상품목록',
			width : '100%',
			height: 300,
			margin : '0 0 10 0'
		},
		{
			xtype : 'mGpInfoList',
			title : '공구목록',
			width : '100%',
			height: 300,
			margin : '0 0 10 0'
		}
	]
});