
Ext.define('td.view.util.OrderEditMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.OrderEditMain',
	requires:[
		'Ext.ux.*',
		'Ext.layout.container.Border',
		'td.view.util.OrderEditMainController',
		'td.store.mbinfo',
		'td.store.Local',
		'td.view.combo.Order',
		'td.view.util.OrderEditFindForm',
		'td.view.grid.OrderEditor'
	],
	controller:'OrderEditMainController',
	closable: true,
	frame : false,
	title: '주문정보 에디터',
	bodyPadding:'5 5 5 5',
	width: '100%',
	layout: 'border',
	defaults: {
		collapsible: true,
		split: true,
		frame: false,
		style: 'float:left; margin:0px; padding:0px;',
		scrollable: true
	},
	items: [
		{
			id : 'util_terms',
			title : '검색 조건',
			region:'north',
			floatable: false,
			width: '100%',
			autoHeight : true,
			items : [
				{
					xtype: 'OrderEditFindForm'
				}
			]
		},
		{
			id : 'util_product',
			layout: 'fit',
			region: 'center',
			title : '변경할 주문목록',
			collapsible: false,
			scrollable: false,
			width : '100%',
			items : [
				{
					xtype: 'OrderEditor',
					height: 800
				}
			]
		}
	]
});


