Ext.define('td.view.util.OrderEditMainController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.OrderEditMainController',
	popup:{},

	//주문정보 조회
	searchOrderList: function(btn,e){
		var v_gpcode = Ext.JSON.encode(this.lookupReference('gpcode').getValue());
		var v_it_id = Ext.JSON.encode(this.lookupReference('it_id').getValue());
		var v_stats = Ext.JSON.encode(this.lookupReference('stats').getValue());

		var grid = Ext.getCmp("util_product").down("[name=OrderEditor]");
		grid.store.loadData([],false);

		//페이징초기화
		grid.store.currentPage = 1;

		var v_param = {
			tag_gpcode : v_gpcode,
			tag_it_id : v_it_id,
			tag_stats : v_stats
		}
		Ext.apply(grid.store.getProxy().extraParams, v_param);

		grid.store.load();
	},

	//키워드 검색
	keywordSearch: function(btn,e){
		if(e.keyCode == 13){

			var v_params = {
				searchtype : btn.up().query("[name=cb_searchtype]")[0].getValue(),
				keyword : btn.up().query("[name=keyword]")[0].getValue(),
				stats : btn.up().query("[name=cb_stats]")[0].getValue(),
				sdate : btn.up().query("[name=sdate]")[0].rawValue,
				edate : btn.up().query("[name=edate]")[0].rawValue
			}

			var grid = Ext.getCmp('od_odlist').down("[name=OrderList]");

			grid.store.loadData([],false);
			Ext.apply(grid.store.getProxy().extraParams, v_params);
			Ext.getCmp('ptb_orderlist').moveFirst();
		}
	}
});