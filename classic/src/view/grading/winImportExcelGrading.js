
Ext.define('td.view.grading.winImportExcelGrading', {
	extend: 'Ext.window.Window',
	xtype: 'winImportExcelGrading',
	reference: 'winImportExcelGrading',
	requires:[
		'td.view.grading.GradingMainController',
		'td.view.combo.Grading'
	],
	title: '그레이딩 신청서 엑셀파일 입력',
	controller: 'GradingMainController',
	width: 480,
	autoScroll:false,
	closable: true,
	closeAction: 'hide',
	//x: 0, y: 50,
	//maximizable: true,
	layout : 'fit',
	items: [
		{
			xtype: 'form',
			alias:'widget.ImportExcelGradingForm',
			reference: 'ImportExcelGradingForm',
			frame:false,
			url : '/resources/crud/grading/importGrading.insert.php',
			fieldDefaults: {
				labelAlign: 'right',
				labelWidth: 120,
				msgTarget: Ext.supports.Touch ? 'side' : 'qtip'
			},
			width: '100%',
			autoScroll:false,
			split: false,
			frame : false,
			collapsible: false,
			floatable: false,
			layout : 'fit',
			items: [
				{
					xtype: 'fieldset',
					defaultType: 'textfield',
					layout: 'anchor',
					margin : 0,
					padding: 0,
					defaults: {
						anchor: '100%',
						border : 0,
						padding: 5
					},
					items: [
						{
							xtype: 'fieldcontainer',
							layout: 'anchor',
							border : 0,
							defaultType: 'textfield',
							items: [
								{
									xtype : 'cb_grcode',
									reference : 'grcode',
									name : 'grcode',
									fieldLabel: '그레이딩 차수',
									allowBlank: false,
									width: 330
								},
								{
									xtype: 'filefield',
									name : 'importfile',
									reference: 'ImportFile',
									fieldLabel: '그레이딩 엑셀파일',
									allowBlank: false,
									hideLabel: false
								}
							]
						}
					]
				}
			],
			listeners: {
				//afterrender: 'mbInfoLoading'
			},
			buttons: [
				{
					xtype: 'statusbar',
					dock: 'bottom',
					reference: 'sb_grading',
					defaultText: '대기..',
					plugins: {
						ptype: 'validationstatus',
						form: 'ImportExcelGradingForm'
					}
				},'->',
				{
					text	: '등록',
					handler : 'submitImportGrading'
				},
				{
					text: '취소',
					handler: 'closeImportGrading'
				}
			]
		}
	]
});