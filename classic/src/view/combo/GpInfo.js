
/* 대표콤보박스 공구상태값 */
Ext.define('td.view.combo.GpInfo', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_gpinfo_stats',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'stats',
	value : '00',
	store: {type: 'gpinfo_stats'},
	width : 250
});

/*발주탭, 통합배송에서 사용*/
Ext.define('td.view.combo.gpstats', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_gpstats',
	editable: false,
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'gpstats',
	store: {type: 'gpstats'}
});


/*발주탭, 통합배송에서 사용*/
Ext.define('td.view.combo.gpcode', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_gpcode',
	editable: false,
	displayField: 'gpcode_name',
	valueField: 'gpcode',
	name: 'gpcode',
	width: 300,
	store: {type: 'gpcode'}
});
