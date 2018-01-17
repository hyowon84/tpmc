
/*회원정보스토어*/
Ext.define('td.store.GradingMbList', {
	extend: 'Ext.data.Store',
	requires : ['td.controller.TdController'],
	fields : [
		{	name : 'gr_nickname'	},
		{	name : 'gr_name'	},
		{	name : 'SUM_QTY',					sortDir: 'DESC', sortType: 'asInt', mapping: 'SUM_QTY',					type: 'int'}
	],
	sorters:[
		{
			property:'SUM_QTY',
			direction:'DESC'
		}
	],
	alias: 'store.GradingMbList',
	pageSize : 500,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/grading/grading.read.php?mode=mblist'
		},
		reader : {
			rootProperty : 'data',
			totalProperty : 'total'
		}		
	}
});

