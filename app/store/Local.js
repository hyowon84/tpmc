/*************************************************************************/

Ext.define('td.store.Local',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.Local',
	data:[
		['test', '']
	]
});


/*결제유형*/
Ext.define('td.store.paytype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.paytype',
	data:[
		['무통장', 'P01'],
		['카드결제', 'P02'],
		['외화달러', 'P03'],
		['귀금속결제',  'P04'],
		['현금결제',  'P05']
	]
});

/*배송유형*/
Ext.define('td.store.delivery_type',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.delivery_type',
	data:[
		['주문시 결제', 'D01'],
		['수령후 지불', 'D02'],
		['방문수령',	 'D03'],
		['통합배송요청',  'D04'],
		['배달',			 'D05'],
		['무료배송',	 'D00']
	]
});

/*현금영수증 신청유형*/
Ext.define('td.store.cashreceipt_type',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.cashreceipt_type',
	data:[
		['-선택안함-', ''		],
		['개인소득공제', 'C01'	],
		['사업자지출증빙',  'C02'	],
		['세금계산서', 'C03'	]
	]
});

/*스팟시세일 경우 계산공식*/
Ext.define('td.store.cashreceipt_yn',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.cashreceipt_yn',
	data:[
		['미신청',  'N'	],
		['신청',  'Y'	]
	]
});


/* 주문상태 */
Ext.define('td.store.stats',{
	extend: 'Ext.data.Store',
	model: 'td.model.comboDefault',
	alias: 'store.stats',
	autoLoad : true,
	fields:['name','value','filter'],
	sorters:[
		{
			property:'order',
			direction:'ASC'
		}
	],
	data: [
		['-전체보기-'],
		['주문신청','00'],
		['귀금속결제대기','05'],
		['입금요청','10'],
		['선배송예정,미결제','15'],
		['선배송완료,미결제','17'],
		['결제완료','20'],
		['통합배송요청','22'],
		['포장완료','23'],
		['배송대기중','25'],
		['직배대기중','30'],
		['픽업대기중','35'],
		['그레이딩대기','39'],
		['배송완료','40'],
		['직접배송완료','50'],
		['픽업완료','60'],
		['반품요청','70'],
		['반품완료','75'],
		['교환요청','80'],
		['교환완료','85'],
		['환불완료','90',''],
		['취소','99'],
		['코투재고','900','']
	]
});

/* SMS예제 */
Ext.define('td.store.smsex',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.smsex',
	data: [
		['입금요청','10'],
		['결제완료','20'],
		['배송예정','25'],
		['직배예정','30'],
		['픽업예정','35'],
		['배송완료','40'],
		['환불완료','90']
	]
});

/* 검색키워드 유형 */
Ext.define('td.store.searchtype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.searchtype',
	data: [
		['전체',''],
		['닉네임','nick'],
		['이름','name'],
		['공구명','gpcode_name'],
		['공구코드','gpcode'],
		['주문번호','od_id'],
		['연락처','hphone'],
		['주소','addr']
	]
});

Ext.define('td.store.shippingstats',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.shippingstats',
	data:[
		['선배송예정,미결제',	'15'],
		['선배송완료,미결제',	'17'],
		['통합배송요청',	'22'],
		['포장완료',	'23'],
		['배송대기',	'25'],
		['픽업대기',	'35'],
		['직배대기',	'30'],
		['배송완료',	'40'],
		['픽업완료',	'60'],
		['직배완료',	'50'],
		['반품요청',	'70'],
		['반품완료',	'75'],
		['교환요청',	'80'],
		['교환완료',	'85']
	]
});

Ext.define('td.store.ShippingExportList',{
	extend: 'Ext.data.ArrayStore',
	model: 'ShippingExport',
	alias: 'store.ShippingExportList',
	groupField: 'project',
	sorters:	{	property:'od_date',		direction:'DESC'}
});


//주문관리 관련 end
/*************************************************************************/


/*************************************************************************/
//입출금 관련 start

/*입출금 유형*/
Ext.define('td.store.banktype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.banktype',
	data:[
		['-전체선택-', 'ALL'	],
		['상품주문',	 'B01'	],
		['카드판매수금',  'B09'	],
		['해외주문',	 'B02'	],
		['통관비',		 'B03'	],
		['매장매입',	 'B04'	],
		['식대',			 'B05'	],
		['급여',			 'B10'	],
		['기타지출',	 'B06'	],
		['환불',			 'B07'	],
		['지출통장',	 'B08'	],
		['공란',			 'EMPTY']
	]
});

/*입출금 세금처리유형*/
Ext.define('td.store.taxtype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.taxtype',
	data:[
		['-선택안함-',	 ''	],
		['현금영수증',	 'T01'	],
		['사업자지출증빙',  'T02'	],
		['세금계산서',	 'T03'	],
		['현금판매',		 'T04'	]
	]
});
//입출금 관련 end
/***************************************************************************/



/*공동구매 상태값*/
Ext.define('td.store.gpstats',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.gpstats',
	data:[
		['공구접수',	 '00'	],
		['주문마감',	 '05'	],
		['미발주포함', '07'	],
		['발주신청',	 '10'	],
		['송금완료',	 '20'	],
		['통관완료',	 '30'	],
		['국내도착',	 '40'	],
		['공구종료',	 '99'	]
	]
});



/*그레이딩 상태값*/
Ext.define('td.store.grstats',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.grstats',
	data:[
		['신청접수',	 			'00'	],
		['그레이딩진행중', '25'	],
		['통관중',					'30'	],
		['입고완료',				'40'	],
		['배송대기중',			'50'	],
		['배송완료',				'60'	],
		['취소',						'99'	]
	]
});


/*발주서 상태값*/
Ext.define('td.store.ivstats',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.ivstats',
	data:[
		['재고세팅',	 '00'	],
		['발주완료',	 '05'	],
		['송금완료',	 '10'	],
		['통관완료',	 '20'	],
		['국내도착',	 '30'	],
		['입고완료',	 '40'	],
		['삭제(숨김)', '99'	]
	]
});


/*예 아니오*/
Ext.define('td.store.yesno',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.yesno',
	data:[
		['-선택-',	''],
		['Y',	 '1'	],
		['N',	 '0'	]
	]
});


/*예 아니오*/
Ext.define('td.store.yn',{
	extend: 'Ext.data.Store',
	model: 'td.model.comboDefault',
	alias: 'store.yn',
	data:[
		[	'-선택-',	''	],
		[	'Y',			'Y'	],
		[	'N',			'N'	]
	]
});




/*금속유형*/
Ext.define('td.store.metaltype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.metaltype',
	data:[
		['-금속-', ''	],
		['금',		 'GL'],
		['은',		 'SL'],
		['기타',	 'ETC']
	]
});

/*가격반영유형*/
Ext.define('td.store.pricetype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.pricetype',
	data:[
		['-유형-', ''	],
		['원화(￦)',  'W'	],
		['달러($)',  'N'	],
		['스팟시세',  'Y'	]
	]
});

/*스팟시세일 경우 계산공식*/
Ext.define('td.store.spottype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.spottype',
	data:[
		['-스팟옵션-',  ''	],
		['1oz이상($)',  'U$'],
		['1oz이하($)',  'D$'],
		['%',			 '%'	],
		['￦',			 '￦'	]
	]
});


/*화폐유형*/
Ext.define('td.store.moneytype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.comboDefault',
	alias: 'store.moneytype',
	data:[
		['USD', 'USD'	],
		['CNY', 'CNY'	],
		['EUR', 'EUR'	],
		['HKD', 'HKD'	],
		['AUD', 'AUD'	]
	]
});


//딜러
Ext.define('td.store.dealers', {
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.dealers',
	alias: 'store.dealers',
	storeId: 'dealers',
	data: [
		[0, 'AP', 'APMEX'],
		[1, 'GV', 'GAINSVILLE'],
		[2, 'MC', 'MCM'],
		[3, 'PA', 'PARADISE'],
		[4, 'BX', 'BULLION EXCHANGE'],
		[5, 'OD', 'OTHER DEALER'],
		[6, 'CT', '코인스투데이']
	]
});



/*화폐유형*/
Ext.define('td.store.wiretype',{
	extend: 'Ext.data.ArrayStore',
	model: 'td.model.combo',
	alias: 'store.wiretype',
	data:[
		[1,'01', '은행-투데이(주)'],
		[2,'10', '페이팔'],
		[3,'20', '마운틴']
	]
});


/*

 Ext.define('Ext.store.moneytype', {
 extend: 'Ext.data.ArrayStore',
 alias: 'store.moneytype',
 model: 'model.combo',
 storeId: 'moneytype',
 data: [//보이는거, 선택후값
 [0, 'USD', 'USD'],
 [1, 'CNY', 'CNY'],
 [2, 'EUR', 'EUR'],
 [3, 'HKD', 'HKD'],
 [4, 'AUD', 'AUD']
 ]
 });

 Ext.define('Ext.store.wrtype', {
 extend: 'Ext.data.ArrayStore',
 alias: 'store.wrtype',
 model: 'model.combo',
 storeId: 'wrtype',
 data: [
 [0, '00', '은행'],
 [1, '10', '페이팔'],
 [2, '20', '마운틴'],
 ]
 });

 */


