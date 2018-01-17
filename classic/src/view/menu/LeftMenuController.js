Ext.define('td.view.menu.LeftMenuController', {
	extend: 'Ext.app.ViewController',
	alias: 'controller.leftmenu',
	onMenuClick:function(obj, selObj){
		//this.setMainBar(selObj.data.url, selObj.data.name);
		var mmsController = td.app.getController('TdController');

		console.log('leftmenu-----------------------------');
		console.log(selObj);
		
		if(selObj.data.name == '대시보드') {
			mmsController.setMainBar(selObj.data.url, '대시보드');
			//mmsController.setMainBar(selObj.data.url, selObj.data.name);
		}
		else {
			mmsController.setMainBar(selObj.data.url, selObj.data.name);	
		}
	}

});