<?php
include_once('./_common.php');


//스트립슬래시를 안하면 json_decode가 안됨
$arr = json_decode(str_replace('\"','"',stripslashes( iconv('utf-8', 'cp949', $_POST['data'] ) )),true);
$mb_id = $_SESSION[admin_id];



function process($data) {
	global $config; 
	
	$sql = "SELECT	*
					FROM		clay_order CL
					WHERE		CL.od_id = '$data[ac_code]'
	";
	$cnt = mysql_num_rows(sql_query($sql));
		
	//같은 경매에 대해 낙찰주문을 넣을경우 패스 및 중복경고메시지
	if($cnt > 0) {
		return '90';
	}

	$상품명 = str_replace("'","\'",$data[it_name]);
	
	/* 낙찰정보 주문하기 */
	$ins_sql = "	INSERT	INTO 	clay_order		SET
																gpcode = 'AUCTION',
																od_id = '$data[ac_code]',
																it_id = '$data[it_id]',
																it_name = '$상품명',
																it_qty	=	'1',
																it_org_price = '$data[bid_last_price]',
																stats = '00',
																clay_id = '$data[mb_nick]',
																mb_id	= '$data[mb_id]',
																name = '$data[mb_name]',
																hphone = '$data[mb_hp]',
																od_date = NOW()
	";
	$result = sql_query($ins_sql);
	db_log($ins_sql,'clay_order','상품가격관리 > 경매탭 > 낙찰자 주문입력');

	/* 이전 구매정보 값이 있을경우 거기서 가져오기 */
	$mb_sql = "	SELECT	CI.*
							FROM		clay_order_info CI
							WHERE		CI.mb_id = '$data[mb_id]'
							ORDER BY CI.od_date DESC
							LIMIT 1
	";
	$mb = sql_fetch($mb_sql);
	
	
	$ins_sql = "	INSERT	INTO 	clay_order_info		SET
														gpcode = 'AUCTION',
														od_id = '$data[ac_code]',
														clay_id = '$data[mb_nick]',
														mb_id	= '$data[mb_id]',
														name = '$data[mb_name]',
														hphone = '$data[mb_hp]',
														receipt_name = '$mb[receipt_name]',
														zip = '$mb[zip]',
														addr1 = '$mb[addr1]',
														addr1_2 = '$mb[addr1_2]',
														addr2 = '$mb[addr2]',
														memo = '경매주문건 주소재확인 필요',
														cash_receipt_yn = '$mb[cash_receipt_yn]',
														cash_receipt_type = '$mb[cash_receipt_type]',
														cash_receipt_info = '$mb[cash_receipt_info]',
														delivery_type = '$mb[delivery_type]',
														delivery_price= '3500',
														delivery_direct= 'N',
														delivery_invoice = '',
														od_ip = '$방문자IP',
														od_browser = '$접속기기',
														od_date = NOW()
	";
	$result = sql_query($ins_sql);
	db_log($ins_sql,'clay_order_info','상품가격관리 > 경매탭 > 낙찰자 주문입력');


	/* SMS */
	$mh_reply = '0220886657';
	$SMS = new SMS5;
	$SMS->SMS_con($config['cf_icode_server_ip'], $config['cf_icode_id'], $config['cf_icode_pw'], $config['cf_icode_server_port']);
	$mh_hp[]['bk_hp'] = get_hp($mb[hphone],0);
	$주문금액 = $data[bid_last_price]+3500;
	$주문금액 = number_format($주문금액);

	
	$mh_send_message = "[{$data[ac_code]}] 경매낙찰! {$주문금액}원(배송비포함), 신한은행 110408552944 코인즈투데이";
	$result = $SMS->Add($mh_hp, $mh_reply, '', '', $mh_send_message, '', 1);
	
	$result = $SMS->Send();
	$SMS->Init(); // 보관하고 있던 결과값을 지웁니다.

	/* 로그기록 */
	$ins_sql = "INSERT	INTO 	sms5_write		SET
													wr_renum = '$wr_renum',
													od_id			=	'$data[ac_code]',			/* 관련 주문번호 */
													wr_reply = '$mh_reply',						/*보내는사람번호*/
													wr_target = '$mb[hphone]',						/*받는사람번호*/
													wr_message = '$mh_send_message',	/*메시지내용*/
													wr_datetime = now(),							/*보낸날짜*/
													wr_booking = '$wr_booking',				/* 예약전송날짜*/
													wr_total = '1',
													wr_re_total = '$wr_re_total',
													wr_success = '1',
													wr_failure = '$wr_failure',
													wr_memo = '$wr_memo'
	";
	sql_query($ins_sql);

	$upd_sql = "UPDATE 	auction_log		SET
												bid_stats = '10'
							WHERE		no = '$data[no]'
							AND			bid_stats IN ('00','01','05');
	";
	sql_query($upd_sql);		
	
	return '00';

}

/* 단일레코드일때 */
if( strlen($arr[0][ac_code]) > 3 ) {
	$result = process($arr[0]);
}


if($result == '00') {
	$json[success] = "true";
	$json[message] = '주문정보가 입력되었습니다';
} 
else if($result == '90') {
	$json[success] = "false";
	$json[message] = '낙찰자에 대해 입력한 주문정보가 이미 있습니다';
}
else {
	$json[success] = "false";
	$json[message] = '주문정보가 입력되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
exit;


?>