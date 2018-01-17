Ext.define('td.view.dashboard.MainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.dashboardMain',
	
	/* 렌더링된 이후 스토어 패러미터 셋팅 */
	ReconfigureStore : function(obj, selObj) {
		var tab = obj;
		var o_store = tab.query('[name=Chart]');
		var v_param = new Object();
		var ttype = ['minute','hour','day','month'];
		
		v_param.node_id = tab.node_id;

		for(var i = 0; i < o_store.length; i++) {
			var store = o_store[i].getStore();
			v_param.timetype = ttype[i];
			Ext.apply(store.getProxy().extraParams, v_param);
			store.load();
		}
	},

	onSelectChange : function() {
		
	}
	
});