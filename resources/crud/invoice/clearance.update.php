<?php
include_once('./_common.php');

//스트립슬래시를 안하면 json_decode가 안됨
$arr = jsonDecode($_POST['data']);
$admin_id = $_SESSION[admin_id];



/* 단일레코드일때 */
if( strlen($arr[cr_id]) > 1 ) {

	$cr_id = $arr[cr_id];
	$cr_name = $arr[cr_name];
	$cr_refno = $arr[cr_refno];
	$cr_blno = $arr[cr_blno];
	$iv_id = $arr[iv_id];
	$admin_id = $arr[admin_id];
	$cr_dutyfee = $arr[cr_dutyfee];
	$cr_taxfee = $arr[cr_taxfee];
	$cr_shipfee = $arr[cr_shipfee];
	$cr_file = $arr[cr_file];
	$cr_memo = $arr[cr_memo];
	$cr_date = $arr[cr_date];
	$reg_date = $arr[reg_date];
	$ip_complete = $arr[ip_complete];


	/* 상품정보 수정 */
	$common_sql = "	UPDATE	clearance_info	SET
															cr_name = '$cr_name',	/*통관내역 별칭*/
															cr_refno = '$cr_refno',	/*통관번호*/
															cr_blno = '$cr_blno',	/*통관번호*/
															cr_taxfee = '$cr_taxfee',		/*통관비용 총액*/
															cr_shipfee = '$cr_shipfee',					/*통관수수료*/
															cr_file = '$cr_file',	/*통관내역서 파일첨부*/
															cr_memo = '$cr_memo',	/*메모*/
															cr_date = '$cr_date'	/*통관일*/
									WHERE		cr_id = '$cr_id'
	";
	sql_query($common_sql);
	db_log($common_sql,'invoice_info','발주서 수정 ');
}
else {	/* 복수레코드일때 */

	for($i = 0; $i < count($arr); $i++) {
		$grid = $arr[$i];

		$iv_id = $grid[iv_id];
		$gpcode = $grid[gpcode];
		$iv_name = $grid[iv_name];
		$iv_dealer = $grid[iv_dealer];
		$iv_order_no = $grid[iv_order_no];
		$iv_receipt_link = $grid[iv_receipt_link];
		$iv_date = $grid[iv_date];
		$money_type = $grid[money_type];
		$od_exch_rate = $grid[od_exch_rate];
		$iv_tax = $grid[iv_tax];
		$iv_shippingfee = $grid[iv_shippingfee];
		$iv_discountfee = $grid[iv_discountfee];
		$iv_memo = $grid[iv_memo];
		$arv_exch_rate = $grid[arv_exch_rate];
		$reg_date = $grid[reg_date];
		$admin_id = $grid[admin_id];


		/* 상품정보 수정 */
		$common_sql = "	UPDATE	invoice_info	SET
															iv_name = '$iv_name',
															iv_dealer = '$iv_dealer',						/*USD, CNY, ...*/
															money_type = '$money_type',						/*USD, CNY, ...*/
															od_exch_rate = '$od_exch_rate',				/*주문기준 환율*/
															iv_order_no = '$iv_order_no',				/*인보이스 번호*/
															iv_tax = '$iv_tax',
															iv_discountfee = '$iv_discountfee',
															iv_shippingfee = '$iv_shippingfee',
															iv_memo = '$iv_memo'									/*내용*/
										WHERE		gpcode = '$gpcode'
										AND			iv_id = '$iv_id'
		";
		sql_query($common_sql);
		db_log($common_sql,'invoice_info','발주서 수정 ');
	}
}


if($result) {
	$json[success] = "true";
	$json[message] = '수정되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '수정되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>