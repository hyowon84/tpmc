//은행관련 콤보박스는 여기에, 대표콤보박스 ivstats 
//td.view.combo.Invoice

Ext.define('td.view.combo.Invoice', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_ivstats',
	editable: false,
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'ivstats',
	store: {type: 'ivstats'}
});


Ext.define('td.view.combo.Dealers', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_dealers',
	reference: 'dealers',
	store: {type: 'dealers'},
	editable: false,
	queryMode: 'local',
	emptyText: '선택 또는 입력',
	displayField: 'ct_name',
	publishes: 'value',
	anchor: '0',
	queryMode: 'local',
	listConfig: {
		itemTpl: ['<div data-qtip="{ct_id}: {ct_name}">{ct_name} ({ct_id})</div>']
	}
});


Ext.define('td.view.combo.MoneyType', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_moneytype',
	reference: 'moneytype',
	store: {type: 'moneytype'},
	editable: false,
	queryMode: 'local',
	emptyText: '선택 또는 입력',
	displayField: 'name',
	publishes: 'value',
	anchor: '0',
	queryMode: 'local',
	listConfig: {
		itemTpl: ['<div data-qtip="{value}">{value}</div>']
	}
});


Ext.define('td.view.combo.WireType', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_wiretype',
	reference: 'wiretype',
	store: {type: 'wiretype'},
	editable: false,
	queryMode: 'local',
	editable: false,
	emptyText: '선택 또는 입력',
	displayField: 'title',
	valueField: 'value',
	publishes: 'value',
	anchor: '0',
	queryMode: 'local',
	listConfig: {
		itemTpl: ['<div data-qtip="{value}">{title}</div>']
	}
});

