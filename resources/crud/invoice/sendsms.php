<?php
include_once('./_common.php');


//스트립슬래시를 안하면 json_decode가 안됨
//$arr = json_decode(str_replace('\"','"',stripslashes( iconv('utf-8', 'cp949', $_POST[] ) )),true);
$admin_id = $_SESSION[admin_id];


if (strlen($gpcode_list) > 1) {
	$gpcode = str_replace("\'","'",$_POST[gpcode_list]);
	$sms_text = str_replace("\r\n","\n",$_POST[sms_text]);
	$stats = $_POST[sms_stats];
	
	$find_sql = "	SELECT	DISTINCT
												CL.hphone
								FROM		clay_order CL
								WHERE		CL.gpcode IN ($gpcode)
								AND			CL.hphone != ''
								AND			CL.hphone IS NOT NULL
								#AND			CL.stats < 20
								GROUP BY CL.hphone
	";
	$ob = $sqli->query($find_sql);

	//주문상태별 템플릿 선택시 주문자별 주문금액, 주문번호가 다 다르기 때문에
	//핸드폰번호로 다시 주문정보 조회후 내용정리해서 한명씩 전송해야함
	if($stats > 0 && $stats < 20) {

		//공구코드에 관련되있는 연락처들을 중복없이 조회한것을 하나씩
		while($row = $ob->fetch_array()) {

			if($row[hphone] && strlen($row[hphone]) > 5) {
			$연락처 = str_replace("-","",$row[hphone]).";";
//		$연락처 = "01044820607;";

				$calc_sql = "	SELECT	T.od_id,
															T.PRD_PRICE,
															CI.delivery_price,
															CI.delivery_invoice,
															(T.PRD_PRICE + CI.delivery_price) AS TOTAL_PRICE
											FROM		(
																SELECT	CL.od_id,
																				SUM(CL.it_org_price * CL.it_qty) AS PRD_PRICE
																FROM		clay_order CL
																WHERE		1=1
																#AND			CL.stats < 20
																AND			CL.gpcode IN ($gpcode)
																AND			CL.hphone = '$row[hphone]'
																GROUP BY	CL.od_id
															) T
															LEFT JOIN clay_order_info CI ON (CI.od_id = T.od_id)

				";
				$re = $sqli->query($calc_sql);

				$내용모음 = '';
				while ($od = $re->fetch_array()) {
					$mh_send_message = $sms_text;
					$mh_send_message = preg_replace("/{주문ID}/", $od['od_id'], $mh_send_message);
					$mh_send_message = preg_replace("/{주문금액}/", number_format($od['TOTAL_PRICE']), $mh_send_message);
					$mh_send_message = preg_replace("/{운송장번호}/", $od['delivery_invoice'], $mh_send_message);
					$내용모음.=$mh_send_message."\n";
				}

				if(strlen($내용모음) > 3) {

					//입금요청일때는 입금번호
					if($stats == 10) {
						$내용모음 = str_replace(", 우리은행 1005-503-165645 투데이주식회사","",$내용모음)."\n우리은행 1005-503-165645 투데이주식회사\n";
					}

					$머리말 = (strlen($sms_text_head) > 1) ? $sms_text_head."\n\n" : "";
					$꼬리말 = (strlen($sms_text_tail) > 1) ? "\n".$sms_text_tail."\n" : "";
					$본문 = $머리말.$내용모음.$꼬리말;

					db_log($calc_sql."템플릿 선택 : \r\n$연락처\r\n $본문",'ICODE_SMS',"공구 단체SMS/LMS");
					$msg .= sendSms($연락처,$본문);
				}

			}
			else {
				$msg .= "에러";
			}
		}//공구 while end

		$msg .= "종료";
	}

	//주문상태별 템플릿 선택없이 일괄 동일 문자내용 간편전송시에는 아래 루트
	else {
		while ($row = $ob->fetch_array()) {
			if ($row[hphone] && strlen($row[hphone]) > 5) $연락처 .= str_replace("-", "", $row[hphone]) . ";";
		}

//		echo "루트2 로그 내용 >>>> ";
		$머리말 = (strlen($sms_text_head) > 1) ? $sms_text_head."\n" : "";
		$꼬리말 = (strlen($sms_text_tail) > 1) ? $sms_text_tail."\n" : "";
		$본문 = $머리말.$sms_text.$꼬리말;

		db_log($calc_sql."템플릿 선택안함 : \r\n$연락처\r\n $본문",'ICODE_SMS',"공구 단체SMS/LMS");
		$msg .= sendSms($연락처,$본문);
	}
}


//echo " sendSms($연락처, $sms_text); ";
//print_r($_POST);
$json[success] = "true";
$json[message] = str_replace("\n","<br>","$본문")."<br>".$msg;


$json_data = json_encode_unicode($json);
echo $json_data;
?>