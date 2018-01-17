//은행관련 콤보박스는 여기에, 대표콤보박스 banktype 
//td.view.combo.bank

Ext.define('td.view.combo.Bank', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_banktype',
	editable: false,
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'banktype',
	store: {type: 'banktype'}
});




Ext.define('td.view.combo.taxtype', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_taxtype',
	editable: false,
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'taxtype',
	store: {type: 'taxtype'}
});
