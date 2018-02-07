

Ext.define('td.view.menu.LeftMenu', {
	extend: 'Ext.tree.TreePanel',
	alias:'widget.leftmenu',
	name : 'LeftMenu',
	requires:[
		'td.view.menu.LeftMenuController',
		'td.view.product.ProductMain',
		'td.view.product.AuctionMain',
		'td.view.bank.BankMain',
		'td.view.shipping.ShippingMain',
		'td.view.order.OrderMain',
		'td.view.invoice.InvoiceSearchMain',
		'td.view.invoice.InvoiceMain',
		'td.view.invoice.WireMain',
		'td.view.invoice.ClearanceMain',
		'td.view.grading.winImportExcelGrading',
		'td.view.grading.GradingMain',
		'td.view.util.OrderEditMain',
		'td.view.dashboard.Main'
	],
	controller:'leftmenu',
	width:200,
	title:'메뉴',
	rootVisible:false,
	displayField:'name',
	useArrows:true,
	//icon:'home',
	//icon:"background-image:url('./resources/img/select_confirm.png')",
	store: {
		type:'tree',
		fields:['name', 'url'],
		proxy:{
			type:'ajax',
			url:'/resources/data/LeftMenu.php',
			reader:{
				type:'json'
			}
		},
		autoload:true
	},
	listeners:{		
		itemclick:'onMenuClick'
	}
});