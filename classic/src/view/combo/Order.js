

/*주문상태*/
Ext.define('td.view.combo.Order', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_stats',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'stats',
	store: {type: 'stats'}
});


/*통합배송관리에서 사용하는 주문상태*/
Ext.define('td.view.combo.shippingstats', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_shippingstats',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'stats',
	store: {type: 'shippingstats'}
});


/*데이트필드*/
Ext.define('Ext.dateField.common',{
	extend: 'Ext.form.DateField',
	labelWidth : 45,		width : 160,
	format: "Y-m-d",		submitFormat : "Y-m-d"
});


/*SMS예제콤보*/
Ext.define('td.view.combo.smsex', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_smsex',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'smsex',
	store: {type: 'smsex'}
});


/* 검색유형 */
Ext.define('td.view.combo.searchtype', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_searchtype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'searchtype',
	store: {type: 'searchtype'}
});


/*결제유형*/
Ext.define('td.view.combo.paytype', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_paytype',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'paytype',
	value : 'P01',
	store: {type: 'paytype'}
});


/*배송유형*/
Ext.define('td.view.combo.delivery_type', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_delivery_type',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'delivery_type',
	value : 'D01',
	store: {type: 'delivery_type'}
});


/* 현금영수증 신청여부 */
Ext.define('td.view.combo.cashreceipt_yn', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_cashreceipt_yn',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'cashreceipt_yn',
	value : 'N',
	margin: '0 0 0 10',
	store: {type: 'cashreceipt_yn'}
});


/*현금영수증 신청유형*/
Ext.define('td.view.combo.cashreceipt_type', {
	extend: 'Ext.form.ComboBox',
	alias: 'widget.cb_cashreceipt_type',
	queryMode: 'local',
	editable: false,
	displayField: 'name',
	valueField: 'value',
	name: 'cashreceipt_type',
	value : '',
	margin: '0 0 0 10',
	store: {type: 'cashreceipt_type'}
});






/* 재활용 콤보박스 선언, 그리드에도 사용하려면 필드레이블을 정의하면 안됨.  */





/************* ----------------  모델 END -------------- ******************/