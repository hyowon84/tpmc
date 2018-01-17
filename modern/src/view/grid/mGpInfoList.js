
Ext.define('td.view.grid.mGpInfoList', {
	extend: 'Ext.grid.Grid',
	xtype: 'mGpInfoList',
	alias : 'widget.mGpInfoList',
	requires: [
		'td.store.GpInfoList',
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
	title: '공구목록',
	store: {
		type: 'GpInfoList'
	},
	columns: [
		{ text: '공구코드',	width: 120,	dataIndex : 'gpcode',				hidden:true	},
		{ text: '1.공구명',	width: 210,	dataIndex : 'gpcode_name',	sortable: false,		align:'left'		},
		{ text: '등록일',	 	width: 120,	dataIndex : 'reg_date',			sortable: true,		renderer: Ext.util.Format.dateRenderer('Y-m-d'),	field: { xtype: 'datefield' }},
		{
			text: '2.시작일',
			dataIndex: 'start_date',
			editable: true,
			xtype: 'datecolumn',
			format: 'Y-m-d',
			exportStyle: {
				format: 'Medium Date',
				alignment: {
					horizontal: 'Right'
				}
			}
		},
		{
			text: '3.종료일',
			dataIndex: 'end_date',
			editable: true,
			xtype: 'datecolumn',
			format: 'Y-m-d',
			exportStyle: {
				format: 'Medium Date',
				alignment: {
					horizontal: 'Right'
				}
			}
		},
		{ text: '품목수',		width: 120,	dataIndex : 'ITEM_CNT',			style:'text-align:center',	align:'right',	renderer: Ext.util.Format.numberRenderer('0,000') }

	],
	listeners: {
		select: 'selectGpInfoLoadProduct'
	}
});

