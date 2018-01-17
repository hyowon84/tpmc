/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('td.view.main.Main', {
	extend: 'Ext.tab.Panel',
	xtype: 'app-main',
	requires: [
		'Ext.MessageBox',
		'td.view.main.MainController',
		'td.view.product.mProductMain'

		//'td.view.grid.DashboardNodeList',
		//'td.view.grid.NodeAlertList'
	],
	controller: 'main',
	defaults: {
		tab: {
			iconAlign: 'top'
		},
		styleHtmlContent: true
	},
	tabBarPosition: 'top',

	shadow: true,
	activeTab: 0,
	tabBar: {
		layout: {
			pack : 'center',
			align: 'center'
		},
		docked: 'top',
		defaults: {
			iconAlign: 'top'
		}
	},
	defaults: {
		scrollable: true
	},
	items: [
		//{
		//	title: '대시보드',
		//	iconCls: 'x-fa fa-home',
		//	items: [
		//		{
		//			xtype : 'Dashboard',
		//			scrollable: true
		//		}
		//	]
		//},
		{
			title: '상품',
			iconCls: 'x-fa fa-user',
			layout: 'fit',
			items: [{
				xtype: 'mProductMain'
			}]
		}
		//{
		//	title: '보고서',
		//	iconCls: 'x-fa fa-star',
		//	layout: 'fit',
		//	items: [{
		//		xtype: 'DashboardNodeList'
		//	}]
		//},
		//{
		//	title: '노드&알람',
		//	iconCls: 'x-fa fa-gear',
		//	layout: 'fit',
		//	items: [{
		//		xtype: 'NodeAlertList'
		//	}]
		//}
	]
});
