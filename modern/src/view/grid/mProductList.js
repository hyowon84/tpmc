
Ext.define('td.view.grid.mProductList', {
	extend: 'Ext.grid.Grid',
	xtype: 'mProductList',
	requires: [
		'td.store.ProductList',
		'Ext.grid.plugin.Editable',
		'Ext.grid.plugin.ViewOptions',
		'Ext.grid.plugin.PagingToolbar',
		'Ext.grid.plugin.SummaryRow',
		'Ext.grid.plugin.ColumnResizing',
		'Ext.grid.plugin.MultiSelection'
	],
	plugins: [
		{type: 'grideditable'},
		{type: 'gridviewoptions'},
		{type: 'pagingtoolbar'},
		{type: 'summaryrow'},
		{type: 'columnresizing'}
	],
	title: '상품목록',
	store: {type: 'ProductList'},
	autoLoad: true,
	columns: [
		{
			text: 'Email',
			dataIndex: 'email',
			editable: true,
			editor: {
				xtype: 'combobox',
				queryMode: 'local',
				displayField: 'name',
				valueField: 'abbr',

				// For the dropdown list
				itemTpl: '<span role="option" class="x-boundlist-item">{abbr} - {name}</span>',

				// For the content of the text field
				displayTpl: '{abbr} - {name}',

				editable: false,  // disable typing in the text field

				store: [
					{ abbr: 'AL', name: 'Alabama' },
					{ abbr: 'AK', name: 'Alaska' },
					{ abbr: 'AZ', name: 'Arizona' }
				]
			},
			width: 250
		},

		{ viewSet1:'Y',																text : '노출',						dataIndex : 'gp_use',					width: 65,		align:'center', 	editor:  {xtype : 'cb_yesno'}	}
		//{ viewSet1:'Y',		text: '회원전용',				dataIndex: 'only_member',			width: 80,		align:'center',		style:'text-align:center',		xtype: 'checkcolumn'	},
		//{ viewSet1:'Y',																text: '최대구매수량',		dataIndex : 'gp_buy_max_qty',	width: 100,		editor:{allowBlank:true}	},
		//{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: 'img',						dataIndex : 'gp_img',					width: 60,		renderer: function(value){	return '<img src="' + value + '" width=40 height=40 />';}			},
		//{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: '상품코드',				dataIndex : 'gp_id',					width: 160		},
		//{ viewSet1:'Y', viewSet3:'Y',									text: 'EBAY_IT_ID',			dataIndex : 'ebay_id',				width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'center',		hidden:true	},
		//{ viewSet1:'Y',																text: '카테고리',				dataIndex : 'ca_id',					width: 100,		editor:{allowBlank:true},		align:'center',			style:'text-align:center'	},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: '재고위치',				dataIndex : 'location',				width: 100,		editor:{allowBlank:true},		align:'center',			style:'text-align:center'	},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: '재고메모',				dataIndex : 'jaego_memo',				width: 100,		editor:{allowBlank:true}	},
		//{ viewSet1:'Y', viewSet2:'Y', viewSet3:'Y',		text: '품목명',					dataIndex : 'gp_name',				width: 350,		editor:{allowBlank:false},	align:'left',				style:'text-align:center'	},
		//{ viewSet1:'Y', 															text: '카드가노출', 			dataIndex : 'gp_card',											editor:{xtype: 'cb_yesno'},	align:'center',			renderer: rendererCombo	},
		//{	viewSet1:'Y',																text: '가격유형',				dataIndex : 'gp_price_type',		style:'text-align:center',		align:'center',		allowBlank: true,		editor: {xtype : 'cb_pricetype'},		renderer: rendererCombo	},
		//{ viewSet1:'Y',																text: '판매가(￦)',			dataIndex : 'gp_price',				width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
		//{ viewSet1:'Y',																text: '달러가($)',				dataIndex : 'gp_usdprice',		width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00')	},
		//{ viewSet1:'Y',																text: '스팟시세가(￦)',	dataIndex : 'gp_realprice',		width: 140,		style:'text-align:center',		align:'right',					renderer: Ext.util.Format.numberRenderer('0,000')	},
		//{ viewSet1:'Y',																text: '매입가($)',				dataIndex : 'gp_price_org',		width: 140,		editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00')	},
		//{ viewSet1:'Y', 															text: '유형', 						dataIndex : 'gp_metal_type',								editor:{xtype: 'cb_metaltype'},	align:'center',			renderer: rendererCombo	},
		//{ viewSet1:'Y',																text: 'Oz',							dataIndex : 'gp_metal_don',		width: 60,		style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00'),	editor:{allowBlank:false}	},
		//{ viewSet1:'Y', 															text: '스팟유형', 				dataIndex : 'gp_spotprice_type',						editor:{xtype: 'cb_spottype'},	align:'center',			renderer: rendererCombo	},
		//{ viewSet1:'Y',																text: '+스팟시세',				dataIndex : 'gp_spotprice',		width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000.00'),	editor:{allowBlank:false}	},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: 'b.실재고(c-d+e)',	dataIndex : 'real_jaego',			width: 130,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: 'c.최초재고값',		dataIndex : 'jaego',					width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000'),	editor:{allowBlank:false}	},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: 'd.누적주문',			dataIndex : 'CO_SUM',					width: 120,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
		//{ viewSet1:'Y',	viewSet2:'Y',									text: 'e.누적발주',			dataIndex : 'IV_SUM',					width: 90,			style :'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')		},
		//{ viewSet1:'Y',																text: '가격옵션수',			dataIndex : 'OPT_CNT',				style :'text-align:center',				align:'right',			renderer: Ext.util.Format.numberRenderer('0,000') },
		//{ viewSet1:'Y',																text: '정렬순서',				dataIndex : 'gp_order',				width: 80,			editor:{allowBlank:true},		style:'text-align:center',	align:'right'	},
		//{ viewSet1:'Y',																text: '등록일',	 				dataIndex : 'gp_update_time',	width: 160,			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
		//{ viewSet1:'Y', 															text: '유형', 						dataIndex : 'ac_yn',					editor:{xtype: 'cb_yn'},		align:'center',			renderer: rendererCombo	},
		//{ viewSet3:'Y',																text: '경매진행코드',		dataIndex : 'ac_code',				width: 140,			style:'text-align:center',	align:'center'	},
		//{ viewSet3:'Y',																text: '경매마감일',	 		dataIndex : 'ac_enddate',	width: 160,			sortable: true,		field: { xtype: 'datefield',	format:'Y-m-d H:i:s' },		renderer: Ext.util.Format.dateRenderer('Y-m-d H:i:s')	},
		//{ viewSet3:'Y',																text: '경매수량',				dataIndex : 'ac_qty',					width: 120,			editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	},
		//{ viewSet3:'Y',																text: '경매시작가',			dataIndex : 'ac_startprice',	width: 140,			editor:{allowBlank:true},		style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000')	}

	],
	listeners: {
		//select: 'onItemSelected'
	}
});

