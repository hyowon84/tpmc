/**
 * Created by lucael on 2017-11-22.
 */


/*그레이딩 진행상태*/
Ext.define('td.view.combo.Grading', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_grstats',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'gr_stats',
	store: {type: 'grstats'}
});



/*그레이딩 차수목록*/
Ext.define('td.view.combo.cb_grcode', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_grcode',
	editable: false,
	displayField: 'grcode_name',
	valueField: 'grcode',
	name: 'grcode',
	store: {type: 'GradingInfoList'}
});

