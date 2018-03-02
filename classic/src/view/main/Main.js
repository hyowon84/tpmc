
Ext.Panel.prototype.buttonAlign = 'left';

Ext.define('td.view.main.Main', {
	extend: 'Ext.container.Container',
	requires:[
		'td.controller.TdController',
		'td.store.mbinfo',
		'td.view.menu.LeftMenu'
	],
	xtype: 'main',
	controller:'main',
	viewModel:{
		type: 'main'
	},
	layout:{
		type: 'border'
	},
	items:[
		{
			region:'north',
			width : '100%',
			items : [
				{
					width: '100%',
					//bodyStyle:'background-color:gray',
					loader: {
						url: '/resources/html/top.html',
						renderer: 'html',
						autoLoad: true,
						scripts: true
					}
				}
				
			]
		},
		
		{
			region: 'west',
			xtype: 'leftmenu',
			width:200,
			collapsible:true
		},
		{
			region: 'center',
			extend : 'Ext.tab.Panel',
			xtype: 'tabpanel',
			name: 'mainbar',
			items:[
			]
		}/*,
		{
			region: 'south',
			height:30,
			html:'도움말'
		}*/		
	],

	listeners : {
		afterrender: function(config) {
			config = config || {};

			var updateSoftlayerData = function () {
				//
				//Ext.Ajax.request({
				//	url:"/resources/api/sl.update.php?mode=eventlog'",
				//	method:"GET",
				//	success:function( result, request ){
				//		console.log("eventlog Update Success");
				//	},
				//	failure: function( result, request ){
				//		console.log("eventlog Update Failed");
				//	}
				//});
				//
				//Ext.Ajax.request({
				//	url:"/resources/api/sl.update.php?mode=notilog'",
				//	method:"GET",
				//	success:function( result, request ){
				//		console.log("notilog Update Success");
				//	},
				//	failure: function( result, request ){
				//		console.log("notilog Update Failed");
				//	}
				//});
			};

			var runner = new Ext.util.TaskRunner();
			var task = runner.start({
				run: updateSoftlayerData,
				fireOnStart: true,
				interval: 180000
			});
			
		}
	}
	
});
