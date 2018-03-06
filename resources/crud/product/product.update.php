<?php
include_once('./_common.php');

//스트립슬래시를 안하면 json_decode가 안됨
$arr = jsonDecode($_POST['data']);
$admin_id = $_SESSION[admin_id];


function process($data) {
	global $sqli;
	
	$ac_yn = $data[ac_yn];										/**/
	$ac_qty = $data[ac_qty];									/**/
	$ac_enddate = $data[ac_enddate];					/*경매종료일*/
	$ac_startprice = $data[ac_startprice];		/*시작가*/
	$ac_buyprice = $data[ac_buyprice];				/*즉시구매가*/

	$ca_id = $data[ca_id];
	$gp_id = $data[gp_id];
	$jaego = $data[jaego];
	$jaego_memo = $data[jaego_memo];
	$location = $data[location];
	$gp_name = $data[gp_name];
	$gp_card = $data[gp_card];
	$gp_price = $data[gp_price];
	$gp_usdprice = $data[gp_usdprice];
	$gp_price_org = $data[gp_price_org];
	$gp_price_type = $data[gp_price_type];
	$gp_spotprice_type = $data[gp_spotprice_type];
	$gp_spotprice = $data[gp_spotprice];
	$gp_metal_type = $data[gp_metal_type];
	$gp_metal_don = $data[gp_metal_don];
	$gp_buy_max_qty = $data[gp_buy_max_qty];
	$only_member = $data[only_member];
	$gp_order = $data[gp_order];
	$gp_use = $data[gp_use];
	$ebay_id = trim($data[ebay_id]);


	$prev_sql = "	SELECT	*	FROM	g5_shop_group_purchase WHERE	gp_id = '$gp_id'";
	$prev = $sqli->query($prev_sql)->fetch_array();
	
	//경매시작일때
	if($ac_yn == 'Y' && $prev[ac_yn] != 'Y') {
		/* 경매 고유ID 생성 SQL  by. JHW */
		$seq_sql = "	SELECT	CONCAT(	'AC',
																DATE_FORMAT(now(),'%Y%m%d'),
																LPAD(COALESCE(	(	SELECT	MAX(SUBSTR(ac_code,11,4))
																									FROM		g5_shop_group_purchase
																									WHERE		ac_code LIKE CONCAT('%',DATE_FORMAT(now(),'%Y%m%d'),'%')
																									ORDER BY ac_code DESC
																								)
																,'0000') +1,4,'0')
												)	AS ac_code
									FROM		DUAL
		";
		list($ac_code) = $sqli->query($seq_sql)->fetch_array();
		
	}else {
		$ac_code = $prev[ac_code];
	}

	$이전데이터 = getDataGpJaego($gp_id);
	$경매종료일 = date("Y-m-d H:i:s",$ac_enddate);


	/* 상품정보 수정 */
	$common_sql = "	UPDATE	g5_shop_group_purchase	SET
														ca_id = '$ca_id',
														location = '$location',
														gp_name = \"$gp_name\",
														gp_use = '$gp_use',
														gp_card = '$gp_card',
														gp_price = '$gp_price',
														gp_usdprice = '$gp_usdprice',
														gp_price_org = '$gp_price_org',
														jaego = '$jaego',
														jaego_memo = '$jaego_memo',
														only_member = '$only_member',
														gp_buy_max_qty = '$gp_buy_max_qty',
														gp_price_type = '$gp_price_type',
														gp_metal_type = '$gp_metal_type',
														gp_metal_don = '$gp_metal_don',
														gp_spotprice = '$gp_spotprice',
														gp_spotprice_type = '$gp_spotprice_type',
														gp_order = '$gp_order',
														ac_yn = '$ac_yn',										/*경매진행여부*/
														ac_code = '$ac_code',								/*경매진행코드*/
														ac_qty = '$ac_qty',									/*경매진행수량*/
														ac_enddate = '$경매종료일',					/*경매종료일자*/
														ac_startprice = '$ac_startprice',		/*경매 시작가*/
														ac_buyprice = '$ac_buyprice',				/*경매 즉시구매가*/
														ebay_id = '$ebay_id',
														gp_update_time = now()
									WHERE		gp_id = '$gp_id'
	";
	$sqli->query($common_sql);
//	echo $common_sql;

	$현재데이터 = getDataGpJaego($gp_id);
	db_log($common_sql,'g5_shop_group_purchase','상품가격관리',$이전데이터,$현재데이터);
}

/* 단일레코드일때 */
if( strlen($arr[gp_id]) > 3 ) {
	$data = $arr;
	process($data);
}
else {	/* 복수레코드일때 */
	for($i = 0; $i < count($arr); $i++) {
		$data = $arr[$i];
		process($data);
	}
}



if($result) {
	$json[success] = "true";
	$json[message] = '상품이 수정되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '상품이 수정되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>