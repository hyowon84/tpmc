//주문관리에서 폼 하단 버튼 좌측 강제정렬 적용
Ext.Panel.prototype.buttonAlign = 'left';


Ext.define('td.view.order.OrderMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.OrderMain',
	requires:[
		'td.view.order.OrderMainController',
		'td.view.combo.Order',
		'td.store.mbinfo',
		'td.view.order.OrderForm',
		'td.view.grid.GpInfoList',
		'td.view.order.winSms',
		'td.view.grid.OrderList'		
	],
	controller:'OrderMainController',
	closable: true,
	frame : false,
	title: '주문관리',
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
			title: '<b>주문자정보</b>',
			region: 'north',
			floatable: false,
			autoScroll: false,
			width : '100%',
			height: 225,
			style : 'float:left; margin:0px; padding:0px;',
			items : [
				{
					xtype: 'OrderForm',
					id : 'od_form',
					border: 0
				}
			]
		},
		{
			id : 'od_logs',
			layout: 'fit',
			title : '의 로그',
			region:'west',
			floatable: false,
			width: '30%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					extend: 'Ext.panel.Panel',
					requires: [
						'Ext.layout.container.Border'
					],
					layout: 'auto',
					autoWidth: true,
					autoHeight: true,
					autoScroll: true,
					bodyBorder: false,
					defaults: {
						//collapsible: true,
						split: true,
						bodyPadding: 0
					},
					items: [
						{
							xtype: 'OrderLog',
							border: 0,
							title : '로그기록',
							height: 250
						},
						{
							xtype: 'SmsLog',
							border: 0,
							title : 'SMS전송',
							height: 200
						},
						{
							xtype: 'BankLog',
							border: 0,
							title : '입금내역',
							height: 250
						}
						
					]
				}
			] 
		},
		{
			id : 'od_odlist',
			layout: 'fit',
			region: 'center',
			title : '주문 목록',
			collapsible: false,
			scrollable: false,
			width : '70%',
			items : [
				{
					xtype: 'OrderList',
					name : 'OrderList',
					width : '800',
					height: 800
				}
			]
		}
	]
});