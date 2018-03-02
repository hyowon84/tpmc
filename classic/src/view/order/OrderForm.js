Ext.Panel.prototype.buttonAlign = 'center';

/* 주문자정보 패널에 사용되는 폼 */
Ext.define('td.view.order.OrderForm', {
	extend: 'Ext.form.Panel',
	alias: 'widget.OrderForm',
	xtype : 'OrderForm',
	name : 'frmOrderForm',
	url : '/resources/crud/order/orderinfo.update.php',
	width : '100%',
	height: 180,
	split: false,
	collapsible: false,
	floatable: true,
	border: 0,
	items:[
		{
			xtype: 'container',
			flex: 1,
			width: 640,
			height : 140,
			border: 0,
			style : 'float:left; margin-top:5px;',
			items: [
				{
					xtype: 'fieldset',
					defaultType: 'textfield',
					border: 0,
					defaults: {
						labelWidth: 75
					},
					style:'float:left;',
					items: [
						{
							xtype: 'fieldcontainer',
							fieldLabel: '주문자정보',
							width : 550,
							layout: 'hbox',
							combineErrors: true,
							defaultType: 'textfield',
							defaults: {
								hideLabel: true,
								style:'float:left;'
							},
							items: [
								{
									flex: 1,
									name: 'clay_id',
									itemId: 'clay_id',
									width: '150',
									fieldLabel: '닉네임',
									emptyText: '닉네임',
									allowBlank: false
								},
								{
									flex: 2,
									name: 'name',
									itemId: 'name',
									width: '150',
									fieldLabel: '주문자명',
									emptyText: '주문자명',
									margin: '0 0 0 10',
									allowBlank: false
								},
								{
									flex: 3,
									width: '150',
									name: 'hphone',
									fieldLabel: 'H.P',
									emptyText: 'H.P',
									margin: '0 0 0 10',
									allowBlank: false
								}
							] //items
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: '기본주소',
							width : 580,
							layout: 'hbox',
							combineErrors: true,
							defaultType: 'textfield',
							defaults: {
								hideLabel: true,
								style:'float:left;'
							},
							items: [
								{
									flex: 1,
									reference : 'addr1',
									name: 'addr1',
									itemId: 'addr1',
									width: '40%',
									afterLabeTextTpl: [
										'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
									],
									fieldLabel: '구주소',
									emptyText: '구주소',
									allowBlank: true
								},
								{
									reference : 'addr1_2',
									name: 'addr1_2',
									itemId: 'addr1_2',
									width: '45%',
									margin : '0 0 0 5px',
									fieldLabel: '신주소',
									emptyText: '신주소',
									allowBlank: true
								},

								{
									xtype: 'button',
									text: '주소찾기',
									width: '15%',
									margin : '0 0 0 5px',
									handler: 'searchPostcode'
								},

								{
									reference : 'guide',
									name: 'guide',
									hidden: true
								}

							] //items
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: '상세주소',
							width : 580,
							layout: 'hbox',
							combineErrors: true,
							defaultType: 'textfield',
							defaults: {
								hideLabel: true
							},
							items: [
								{
									flex: 1,
									name: 'addr2',
									afterLabelTextTpl: [
										'<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
									],
									fieldLabel: '상세주소',
									emptyText: '상세주소',
									allowBlank: true
								}, {
									width: 100,
									name: 'zip',
									fieldLabel: '우편번호',
									emptyText: '우편번호',
									margin: '0 0 0 5'
								}
							] //items
						},
						{
							xtype: 'fieldcontainer',
							fieldLabel: '배송',
							layout: 'hbox',
							combineErrors: true,
							defaultType: 'textfield',
							defaults: {
								hideLabel: false
							},
							items: [
								{	xtype : 'cb_delivery_type' },
								{
									xtype: 'textfield',
									name: 'delivery_price',
									fieldLabel: '배송비',
									emptyText: '배송비',
									labelWidth:50,
									width:110,
									allowBlank: true,
									maxLength: 6,
									enforceMaxLength: true,
									margin: '0 0 0 10',
									maskRe: /\d/
								},
								{
									name: 'delivery_invoice2',
									fieldLabel: '주문별 송장번호',
									emptyText: '송장번호',
									labelWidth:100,
									width: 220,
									margin: '0 0 0 10'
								}
							] //items
						}

					]//items
				}//fieldset end		
			]
		},
		{
			xtype: 'container',
			flex: 1,
			width: 580,
			height : 140,
			style : 'float:left; margin-top:5px;',
			defaults: {
				labelWidth: 75
			},
			items: [
				{
					xtype: 'fieldcontainer',
					fieldLabel: '결제방식',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: true
					},
					items: [
						{	xtype : 'cb_paytype' },
						{
							width: 140,
							name: 'receipt_name',
							fieldLabel: '입금자명',
							emptyText: '입금자명(무통장결제)',
							margin: '0 0 0 10'
						}
					] //items
				},
				{
					xtype: 'fieldcontainer',
					fieldLabel: '현금영수증',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: true
					},
					items: [
						{	xtype : 'cb_cashreceipt_yn' },
						{	xtype : 'cb_cashreceipt_type' },
						{
							width: 100,
							name: 'cash_receipt_info',
							fieldLabel: '신청자정보',
							emptyText: '신청자정보',
							margin: '0 0 0 10'
						}
					] //items
				},
				{
					xtype: 'fieldcontainer',
					fieldLabel: '환불금액',
					layout: 'hbox',
					combineErrors: true,
					defaultType: 'textfield',
					defaults: {
						hideLabel: true
					},
					items: [
						{
							width: 140,
							name: 'refund_money',
							fieldLabel: '환불금액',
							emptyText: '0',
							margin: '0 0 0 10'
						}
					] //items
				}
			]
		},
		{
			xtype: 'container',
			flex: 1,
			width: 620,
			height : 140,
			style : 'float:left; margin-top:5px;',
			items: [
				{
					xtype: 'textarea',
					fieldLabel: '관리자메모',
					labelAlign : 'top',
					width: 200,
					height: 100,
					margin: '0 0 10 10',
					style:'float:left;',
					name: 'admin_memo'
				},
				{
					xtype: 'textarea',
					fieldLabel: '구매자메모',
					labelAlign : 'top',
					width: 200,
					height: 100,
					margin: '0 0 10 6',
					style:'float:left;',
					name: 'memo'
				}
			]
		}
	],	//items item end
	buttons: [
		{
			text: '수정',
			style : 'float:left;',
			handler: function() {
				var grid = Ext.getCmp('od_odlist').down("[name=OrderList]");
				var sm = grid.getSelection()[0];

				if(!sm) {
					Ext.Msg.alert('알림','주문목록을 선택해주세요');
					return false;
				}

				var form = Ext.getCmp('od_form');

				form.submit({
					params : {	mode : 'form',
						gpcode : sm.get('gpcode'),
						od_id  : sm.get('od_id')
					},
					success : function(form,action) {
						Ext.Msg.alert('수정완료', action.result.message);
						form.reset();
						grid.store.load();
					},
					failure : function (form, action) {
						Ext.Msg.alert('수정실패', action.result ? action.result.message : '실패하였습니다');
					}
				});
			}
		}
	]
});

