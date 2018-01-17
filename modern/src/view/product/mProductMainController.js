
Ext.define('td.view.product.mProductMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.mProductMain',
	defaultVisibleRange: null,
	selectGpInfoLoadProduct : function(view, records) {

	}

	//onSelectChange : function(view, records) {
	//	var rdogroup = Ext.ComponentQuery.query('[xtype=radiofield][name=timetype]')
	//	var o_store = Ext.ComponentQuery.query('[name=Chart]');
	//	var timetype;
	//
	//
	//	for(var i = 0; i < rdogroup.length; i++){
	//		if(rdogroup[i]._checked) {
	//			timetype = rdogroup[i].getValue();
	//			break;
	//		}
	//	}
	//
	//	var grid = Ext.ComponentQuery.query('[name=DashboardNodeList]')[0];
	//
	//	if(grid.selected.length > 0) {
	//		var v_param = new Object();
	//		v_param.cluster_id = grid.selected.items[0].data.cluster_id;
	//		v_param.node_id = grid.selected.items[0].data.node_id;
	//		v_param.timetype = timetype;
	//	}
	//
	//
	//	for(var i = 0; i < o_store.length; i++) {
	//		var store = o_store[i].getStore();
	//		store.loadData([],false);
	//		Ext.apply(store.getProxy().extraParams, v_param);
	//		store.load();
	//	}
	//
	//	return true;
	//
	//
	//	if(view.xtype == 'radiofield') {
	//		var grid = Ext.ComponentQuery.query('[name=DashboardNodeList]')[0];
	//
	//		if(grid.selected.length > 0) {
	//			var v_param = new Object();
	//			v_param.cluster_id = grid.selected.items[0].data.cluster_id;
	//			v_param.node_id = grid.selected.items[0].data.node_id;
	//			v_param.timetype = timetype;
	//		}
	//
	//	}
	//	else if(view.selected.length > 0) {
	//		var v_param = new Object();
	//		v_param.cluster_id = view.selected.items[0].data.cluster_id;
	//		v_param.node_id = view.selected.items[0].data.node_id;
	//		v_param.timetype = timetype;
	//	}
	//
	//
	//
	//	for(var i = 0; i < o_store.length; i++) {
	//		var store = o_store[i].getStore();
	//		store.loadData([],false);
	//		Ext.apply(store.getProxy().extraParams, v_param);
	//		store.load();
	//	}
	//
	//}

});


