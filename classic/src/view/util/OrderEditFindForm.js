
/*공구목록  에디터 유틸페이지*/
Ext.define('td.store.gpcode', {
	extend: 'Ext.data.Store',
	storeId : 'gpcode',
	alias: 'store.gpcode',
	fields: [
		'gpcode',
		'gpcode_value'
	],
	pageSize : 50,
	autoLoad : true,
	remoteSort: true,
	sorters:[
		{
			property:'GI.end_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/gpinfo/read.php?mode=editor'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		},
		writer : {
			type : 'json',
			writeAllFields : true,
			encode : true,
			rootProperty : 'data'
		}
	}
});


Ext.define('td.view.util.OrderEditFindForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.OrderEditFindForm',
	xtype : 'OrderEditFindForm',
	name : 'frmOrderEditFindForm',
	width : '100%',
	requires:[
		'td.store.GpInfoList',
		'td.store.ProductList'
	],
	split: false,
	collapsible: false,
	floatable: true,
	border: 0,
	items:[
		{
			xtype: 'container',
			flex: 1,
			border: 0,
			style : 'float:left; margin-top:5px;',
			items: [
				{
					xtype: 'fieldcontainer',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						labelWidth : 70,
						style:'float:left; margin-left:10px;'
					},
					items: [

						{
							xtype: 'tagfield',
							reference: 'gpcode',
							name : 'gpcode',
							width : 500,
							fieldLabel: '공구코드',
							store: {type: 'gpcode'},
							value: [''],
							displayField: 'gpcode_name',
							valueField: 'gpcode',
							createNewOnEnter: true,
							createNewOnBlur: true,
							filterPickList: true,
							publishes: 'value'
						},
						{
							xtype: 'tagfield',
							reference: 'it_id',
							name : 'it_id',
							width : 550,
							fieldLabel: '상품코드',
							store: {type: 'product'},
							value: [''],
							publishes: 'value',
							displayField: 'it_id',
							valueField: 'it_id',
							createNewOnEnter: true,
							createNewOnBlur: true,
							filterPickList: true,
							listConfig: {
								itemTpl: [
									'{it_name}'
								]
							}
						},
						{
							xtype: 'tagfield',
							reference: 'stats',
							name : 'stats',
							width : 350,
							fieldLabel: '주문상태',
							value: [''],
							publishes: 'value',
							displayField: 'name',
							valueField: 'value',
							name: 'stats',
							store: {type: 'stats'},
							createNewOnEnter: true,
							createNewOnBlur: true,
							filterPickList: true,
							listConfig: {
								itemTpl: [
									'{name}'
								]
							}
						}

					] //items
				}
			]
		}
	],
	buttons: [
		{
			text: '조회',
			handler: 'searchOrderList'
		}
	]
});
