/* 주문목록 */
Ext.define('td.model.MemberList', {
	extend: 'Ext.data.Model',
	fields : [
		{ name : 'mb_type',				type : 'string' },
		{ name : 'cluster_id',		type : 'string' },
		{ name : 'mb_id',					type : 'string' },
		{ name : 'mb_password',		type : 'string' },
		{ name : 'mb_company',		type : 'string' },
		{ name : 'mb_name',				type : 'string' },
		{ name : 'mb_hp',					type : 'string' },
		{ name : 'mb_email',			type : 'string' },
		{ name : 'mb_level',			type : 'string' },
		{ name : 'reg_date',			type : 'date' }
	]
});


//Ext.define('model.dealers', {
//	extend: 'Ext.data.Model',
//	fields : [ 'number','ct_id','ct_name']
//});


Ext.define('td.model.comboDefault', {
	extend: 'Ext.data.Model',
	fields: ['name','value']
});


/*회원정보스토어*/
Ext.define('td.store.mbinfo', {
	extend: 'Ext.data.Store',
	requires : ['td.controller.TdController'],
	model : 'td.model.MemberList',
	alias: 'store.mbinfo',
	storeId: 'mbinfo',
	pageSize : 1,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/mbinfo.php'
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

var myInfo = Ext.create('Ext.data.Store',{
	requires : ['td.controller.TdController'],
	model : 'td.model.MemberList',
	alias: 'store.mbinfo',
	pageSize : 1,
	autoLoad : true,
	remoteSort: true,
	autoSync : true,
	sorters:[
		{
			property:'reg_date',
			direction:'DESC'
		}
	],
	proxy : {
		type : 'ajax',
		extraParams : {

		},
		api : {
			read : '/resources/crud/mbinfo.php'
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
	},
	listeners: {
		load: function(store, records, success, operation) {
			//var reader = store.getProxy().getReader()

			if(Ext.manifest.profile == 'classic') {
				
				response = operation.getResponse();
				var TdController = td.app.getController('TdController');
				var mbif = Ext.JSON.decode(response.responseText).data[0];
				var lm = Ext.ComponentQuery.query('[name=LeftMenu]')[0];
				lm.getSelectionModel().select(lm.store.getAt(0));

				if(mbif.mb_id == 'admin') {
					TdController.setMainBar('td.view.admin.Main', 'Main');
				}
				else {
					console.log('mbif.mb_id : ',mbif.mb_id);
					TdController.setMainBar('td.view.dashboard.Main', '대시보드');
				}

			}
			//console.log(reader.getResponseData(response).errmsg);
		}
	}
});



/*회원유형 */
Ext.define('td.store.mb_types', {
	extend: 'Ext.data.ArrayStore',
	//extend: 'Ext.data.Store',
	model: 'td.model.comboDefault',
	alias: 'store.mb_types',		
	data: [
		['마스터','M10'],
		['일반','M20']
	]
});
