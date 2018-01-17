
Ext.define('td.model.Product', {
	extend: 'Ext.data.Model',
	fields : [
		{name: 'ac_code',						type: 'string'},
		{name: 'ac_yn',							type: 'string'},
		{name: 'ac_enddate',				type: 'date'},
		{name: 'ac_qty',						type: 'string'},
		{name: 'ac_startprice',			type: 'string'},
		{name: 'ac_buyprice',				type: 'string'},
		{name: 'gp_id',							type: 'string'},
		{name: 'location',					type: 'string'},
		{name: 'gp_name',						type: 'string'},
		{name: 'gp_price',					type: 'int'},
		{name: 'gp_usdprice',				type: 'float'},
		{name: 'gp_realprice',			type: 'float'},
		{name: 'gp_price_org',			type: 'float'},
		{name: 'jaego',							type: 'int'},
		{name: 'gp_price_type',			type: 'string'},
		{name: 'gp_spotprice',			type: 'float'},
		{name: 'gp_spotprice_type',	type: 'string'},
		{name: 'gp_metal_type',			type: 'string'},
		{name: 'gp_metal_don',			type: 'float'},
		{name: 'gp_card',						type: 'string'},
		{name: 'gp_use',						type: 'string'},
		{name: 'gp_order',					type: 'int'},
		{name: 'iv_qty',						type: 'int'},
		{name: 'CO_SUM',						type: 'int'},
		{name: 'real_jaego',				type: 'int'},
		{name: 'OPT_CNT',						type: 'int'},
		{name: 'gp_update_time',		type: 'date'}
	]
});
