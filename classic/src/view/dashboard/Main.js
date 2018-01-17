
Ext.define('td.view.dashboard.Main', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.dashboardMain',
	requires:[
		'Ext.layout.container.Absolute',
		'td.view.dashboard.MainController',
		'td.store.DbStatsCnt',
		'td.view.grid.DbStatsCnt'
	],
	controller:'dashboardMain',
	layout: 'auto',
	closable: false,
	title: 'Main',
	width: '100%',
	frame : false,
	bodyPadding:'5 0 5 0',
	defaults: {
		style: 'float:left;'
	},
	scrollable: true,
	items: [
		{
			xtype : 'panel',
			width : 1350,
			padding:10,
			defaults: {
				style: 'float:left; margin-right:5px; margin-bottom:10px;'				
			},
			items : [
				{
					xtype : 'DbStatsCnt',
					title : '금일까지 주문내역 통계',
					width : 424,
					height: 300
					
				},
				{
					xtype : 'DbOldInvoice',
					title : '미도착 발주내역',
					width : 850,
					height: 300					
				},
				{
					xtype : 'DbVisitor',
					title : '방문자 접속정보',
					width : 1280,
					height: 300					
				}
			]
		}		
	]

});
