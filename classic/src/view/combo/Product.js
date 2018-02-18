//가격유형
Ext.define('td.view.combo.Product', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_pricetype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'pricetype',
	store: {type: 'pricetype'}
});

Ext.define('td.view.combo.yesno', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_yesno',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'yesno',
	store: {type: 'yesno'}
});



Ext.define('td.view.combo.yn', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_yn',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'yn',
	store: {type: 'yn'}
});


Ext.define('td.view.combo.metaltype', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_metaltype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'metaltype',
	store: {type: 'metaltype'}
});


Ext.define('td.view.combo.spottype', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_spottype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'spottype',
	store: {type: 'spottype'}
});


//
//Ext.define('td.view.combo.moneytype', {
//	extend: 'Ext.form.ComboBox',
//	alias: 'widget.cb_moneytype',
//	editable: false,
//	queryMode: 'local',
//	editable: false,
//	displayField: 'name',
//	valueField: 'value',
//	store: {type: 'moneytype'}
//});
//
