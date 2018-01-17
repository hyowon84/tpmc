
Ext.define('td.controller.TdController', {
	extend: 'Ext.app.Controller',
	config:{
			refs:{
					mainBar: 'main tabpanel[name=mainbar]'
			}
			/*
			routes:{
					'home': {
							action:'onHome',
							//before:'beforeHome'
					},
					'td.view.user.UserShow/:id/:password':{
							action:'onUserView',
							//before:'beforeUserView'               
					},
					'UserShow/:id':{
							action:'onUserShow'
					}
			}
			*/
	},
	/*
	onUserShow:function(param1, param2){
			console.log('onUserShow', param1, param2);
			var temp = {userId: param };
			this.movePage('td.view.user.UserShow','사용자조회',temp );       
	},
	onHome:function(){
			console.log('onHome--------------------------------------------', arguments);
	},
	beforeHome:function(id, action){
			console.log('beforeHome--------------------------------------------', arguments);
			console.log(">>>", id, action);
			action.resume();
			//action.stop();
			
	},
	onUserView:function(param){
			console.log('ㅁㅁㅁonUserView--------------------------------------------', arguments);
			
	
	},
	beforeUserView:function(id, action){
			console.log('beforeUserView--------------------------------------------', arguments);
			
			action.resume();
			//action.stop();            
	},  
	*/
	setMainBar:function(url, menuName){
		
		//console.log('setMainBar---------------------------- start');
		var qry = Ext.ComponentQuery.query('[title=메뉴]')[0];
		//console.log("ComponentQuery.query('[title=메뉴]')",qry);
		
		if(qry.selModel.selected.items.length > 0) {
			var v_menu = qry.selection.data;
			//console.log('setMainBar---------------------------- end');
		}
		else {
			var v_menu = new Object();
			v_menu.node_id = "";
			v_menu.cluster_id = "";
		}

		//윈도우형 메뉴
		if(v_menu.window == true) {
			var win = Ext.ComponentQuery.query(v_menu.reference);

			if(win.length == 0) {
				win = Ext.create(url, {
					title: v_menu.name,
					name: v_menu.node_id,
					autoShow: true,
					autoDestroy: true,
					listeners: {
						show: function (window) {
						}
					}
				});
				win.show();
			}
			else {
				win[0].show();
			}



		}
		else {

			// 라우트 테스트
			//this.redirectTo( url + "/1234");
			var v_menuName = menuName;
			var mainBar = this.getMainBar();
			var findTitle = false;
			//console.log(mainBar);
			for (i = 0; i < mainBar.getTabBar().items.items.length; i++) {
				//console.log('find!!!');
				//console.log(mainBar.getTabBar(i));
				if (menuName == mainBar.getTabBar(i).items.items[i].title) {
					mainBar.getLayout().setActiveItem(i);
					findTitle = true;
					break;
				}
			}


			if (findTitle == false) {
				/*
				 console.log('cant find!!!');
				 try{
				 panel.destroy();
				 }catch(e){
				 console.log(e);
				 }
				 */

				var panel = Ext.create(url, {
					title: v_menuName,
					name: v_menu.node_id,
					cluster_id: v_menu.cluster_id,
					node_id: v_menu.node_id,
					autoShow: true,
					autoDestroy: true,
					listeners: {
						show: function (window) {
							window.getEl().setOpacity(0);
							window.getEl().fadeIn({duration: 2000});
						}
					}
				});

				//var o_store = Ext.ComponentQuery.query('[title='+v_menuName+']')[0].query('[name=Chart]');
				var v_param = new Object();
				v_param.cluster_id = v_menu.cluster_id;
				v_param.node_id = v_menu.node_id;


				//for(var i = 0; i < o_store.length; i++) {
				//	var store = o_store[i].getStore();
				//	if(store.autoLoad == true) {
				//		Ext.apply(store.getProxy().extraParams, v_param);
				//	}
				//	//store.load();
				//}

				mainBar.add(panel);
				mainBar.getLayout().setActiveItem(panel);

			}

		}
	},
	movePage:function(url, menuName, params){
			var mainBar = this.getMainBar();
			var findTitle = false;
			var panel;
			for(i=0; i< mainBar.getTabBar().items.items.length; i++){
					if(menuName == mainBar.getTabBar(i).items.items[i].title){
							mainBar.getLayout().setActiveItem(i);
							panel = mainBar.getLayout().getActiveItem();
							findTitle = true;
							break;
					}
			}
			if(findTitle == false){
					panel = Ext.create(url,{
							autoShow:true
					});
					mainBar.add(panel);
					mainBar.getLayout().setActiveItem(panel);
			}
			panel.getController().calledByOther(params);
	},
	onShowFadeIn: function() {

	}
});