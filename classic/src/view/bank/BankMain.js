
Ext.define('td.view.bank.BankMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.BankMain',
	requires:[
		'Ext.ux.*',
		'Ext.layout.container.Border',
		'td.view.bank.BankMainController',
		'td.store.mbinfo',
		'td.view.grid.BankStatement',
		'td.view.grid.OrderList'
	],
	controller:'BankMainController',
	closable: true,
	frame : false,
	viewModel:{
		//type:'infoMain'
	},
	title: '입출금내역',
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
			id : 'BankList',
			layout: 'fit',
			title : '입출금내역',
			region:'west',
			floatable: false,
			width: '70%',
			scrollable: false,
			items : [
				{
					xtype: 'BankStatement',
					height : 800
				}
			]
		},
		{
			id : 'BankOrder',
			layout: 'fit',
			title : '연결된 주문내역',
			collapsible: false,
			region: 'center',
			scrollable: false,
			width : '30%',
			items : [
				{
					xtype: 'BankLinkOrder',
					height: 800
				}
			]
		}
	]
});