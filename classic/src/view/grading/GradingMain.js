
Ext.define('td.view.grading.GradingMain', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.GradingMain',
	requires:[
		'Ext.layout.container.Border',
		'td.view.grading.GradingMainController',
		'td.view.combo.Order',
		'td.store.mbinfo',
		'td.view.grid.GradingInfoList',
		'td.view.grid.GradingMbList',
		'td.view.grading.winMakeGrading',
		'td.view.grading.winImportExcelGrading',
		'td.view.grading.winGradingExport',
		'td.view.grid.GradingExportList',
		'td.view.grid.GradingOrderList'
	],
	controller:'GradingMainController',
	closable: true,
	frame : false,
	title: '그레이딩관리',
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
			title : '그레이딩 신청회원 목록',
			layout: 'fit',
			region:'west',
			floatable: false,
			width: '45%',
			minWidth: 100,
			scrollable: false,
			items : [
				{
					id : 'grading_mbinfo',
					layout: {
						type: 'hbox',
						pack: 'start',
						align: 'stretch'
					},
					collapsible: false,
					scrollable: false,
					bodyBorder: false,
					split : true,
					defaults: {
						bodyPadding: 0
					},
					items: [
						{
							layout: 'fit',
							flex: 1.4,
							items : [
								{
									name : 'GradingInfoList',
									xtype: 'GradingInfoList',
									border: 0
								}
							]
						},
						{
							layout: 'fit',
							flex: 1.6,
							items : [
								{
									name : 'GradingMbList',
									xtype: 'GradingMbList',
									border: 0
								}
							]
						}
					]
				}
			]
		},
		{
			layout: 'fit',
			collapsible: false,
			region: 'center',
			scrollable: false,
			width : '55%',
			items : [
				{
					id : 'grading_orderlist',
					layout: {
						type: 'vbox',
						pack: 'start',
						align: 'stretch'
					},
					collapsible: false,
					scrollable: false,
					bodyBorder: false,
					defaults: {
						bodyPadding: 0
					},
					items: [
						{
							layout: 'fit',
							flex: 2,
							items : [
								{
									name : 'GradingOrderList',
									xtype: 'GradingOrderList',
									border: 0,
									autoLoad : false
								}
							]
						},
						{
							layout: 'fit',
							flex: 1.5,
							items : [
								{
									name : 'GradedOrderList',
									xtype: 'GradedOrderList',
									border: 0
								}
							]
						}
					]
				}
			]
		}
	]
});