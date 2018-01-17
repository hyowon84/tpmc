
Ext.define('td.view.grading.winMakeGrading', {
	extend: 'Ext.window.Window',
	xtype: 'winMakeGrading',
	reference: 'winMakeGrading',
	requires:[
		'td.view.grading.GradingMainController',
		'td.view.combo.Grading'
	],
	title: '그레이딩코드 작성',
	controller: 'GradingMainController',
	width: 480,
	height: 180,
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
			id : 'winMakeGradingForm',
			url : '/resources/crud/grading/gradingcode.insert.php',
			width: '100%',
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
					style : 'float:left;padding:10px;',
					items: [
						{
							xtype: 'textfield',
							fieldLabel: '그레이딩 타이틀',
							name : 'grcode_name',
							allowBlank: false,
							width : '98%',
							margin: '0 0 10 6'
						},
						{
							xtype: 'textfield',
							fieldLabel: '메모',
							name : 'gr_memo',
							width : '98%',
							margin: '0 0 10 6'
						}
					]
				}
			],	//items item end
			buttons: [
				{
					xtype: 'statusbar',
					dock: 'bottom',
					reference: 'sb_grading',
					defaultText: '대기..',
					plugins: {
						ptype: 'validationstatus',
						form: 'winMakeGradingForm'
					}
				},'->',
				{
					text: '입력',
					handler: 'submitWinMakeGrading'
				},
				{
					text: '취소',
					handler: 'closeWinMakeGrading'
				}
			]
		}
	]
});


