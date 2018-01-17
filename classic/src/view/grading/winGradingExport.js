
Ext.define('td.view.grading.winGradingExport', {
	extend: 'Ext.window.Window',
	xtype: 'winGradingExport',
	reference: 'winGradingExport',
	title: '그레이딩예정 목록',
	width: 1400,
	minWidth: 350,
	maxWidth:1900,
	height: 600,
	scrollable: true,
	closable: true,
	closeAction: 'hide',
	x: -800, y: 50,
	//maximizable: true,
	layout : 'fit',
	items: [
		{
			xtype: 'form',
			alias:'widget.GradingExportForm',
			name: 'GradingExportForm',
			reference: 'GradingExportForm',
			frame:false,
			url : '/resources/crud/grading/gradingform.update.php',
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 120,
				msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
			},
			width: '100%',
			height:600,
			autoScroll:true,
			split: false,
			collapsible: false,
			floatable: false,
			layout : 'fit',
			items: [
				{//상태변경시 pk값으로 이용
					xtype: 'textfield',
					hidden : true,
					name: 'hphone'
				},
				{
					xtype : 'GradingExportList'
				}
			],

			listeners: {
				//afterrender: 'mbInfoLoading'
			},

			buttons: [
				{
					xtype: 'statusbar',
					dock: 'bottom',
					reference: 'sb_Grading',
					name : 'sb_Grading',
					defaultText: '대기..',
					//style : 'background:#e0ebf3',
					plugins: {
						ptype: 'validationstatus',
						form: 'GradingExportForm'
					}
				},'->',
				{
					xtype: 'toolbar',
					dock: 'bottom',
					ui: 'footer',
					items: [
						,
						{
							xtype: 'cb_grstats',
							reference: 'GradingStats',
							value: '25'
						},
						{
							text: '상태변경',
							iconCls: 'icon-table_edit',
							handler: 'updateGradingStats'
						},
						{
							xtype: 'textfield',
							reference: 'shipping_no',
							emptyText: '송장번호',
							name: 'shipping_no'
						},
						{
							text: '운송장갱신',
							iconCls: 'icon-table_edit',
							handler: 'updateShippingNo'
						},
						{
							text: '취소',
							handler: 'closeGradingExport'
						}
					]
				}
			]
		}
	]
});
