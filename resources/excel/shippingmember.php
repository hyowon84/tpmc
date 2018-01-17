<?php
/**
 * Created by PhpStorm.
 * User: lucae
 * Date: 2017-12-14
 * Time: 오후 3:12
 */


include_once('./_common.php');

/*================================================================================
php_writeexcel http://www.bettina-attack.de/jonny/view.php/projects/php_writeexcel/
=================================================================================*/

require_once(LIB_PATH.'/Excel/php_writeexcel/class.writeexcel_workbook.inc.php');
require_once(LIB_PATH.'/Excel/php_writeexcel/class.writeexcel_worksheet.inc.php');

global $v_delivery_type;


$fname = tempnam(G5_DATA_PATH, "tmp-memberlist.xls");
$workbook = new writeexcel_workbook($fname);
$worksheet = $workbook->addworksheet();

// Put Excel data
$data = array('주문번호','수취인명', '배송메세지', '수취인우편번호', '주소.1', '수취인 e-mail 주소(현영)', '수취인이동통신', '상품명', '수량', '요금구분코드');
$data = array_map('iconv_euckr', $data);

$col = 0;
foreach($data as $cell) {
	$worksheet->write(0, $col++, $cell);
}

//화면에서 입력한 회원ID 목록을 구함
$arr_od_id = explode(',', $_GET['list_od_id']);	//주문번호
$arr_nick = explode(',', $_GET['list_nick']);	//닉네임
$신청자목록 = array_merge($arr_od_id,$arr_nick);

$iCount=1;

for ($i=0; $i < count($신청자목록); $i++)
{
	// 실제 번호를 넘김
	$od_id = trim($신청자목록[$i]);
	if (!$od_id) continue;

	$sql = "	SELECT		CI.*
						FROM		clay_order_info CI
										LEFT JOIN clay_order CL ON (CL.od_id = CI.od_id)
						WHERE		(CI.od_id	LIKE	'%$od_id%'
						OR			CI.clay_id	= '$od_id')
						AND			CL.stats IN (20,22,23,25,30,35)	/* 결제완료, 통합배송요청, 포장완료, 배송대기중, 직배대기중, 픽업대기중 상태일경우에만 기표지 출력 가능 */
	";
	$result = sql_query($sql);
	$row = mysql_fetch_array($result);
// 	if (!$row) continue;
// 	$row = array_map('iconv_euckr', $tmp);

	$it_name = iconv("utf-8","euc-kr","기념품");
	$it_state = ($v_delivery_type[$row['delivery_type']] == "선불") ? "즉납" : "착불";
	$it_state = iconv("utf-8","euc-kr",$it_state);


	/* 둘다 있을경우 신주소 */
	if( ($row['addr1'] && $row['addr1_2']) || ($row['addr1_2'] != '') ) {
		$기본주소 = $row['addr1_2'];
	}
	else if( ($row['addr1'] != '') ) {
		$기본주소 = $row['addr1'];
	}


	$기본주소 .= ' '.$row['addr2'];

	$worksheet->write($iCount, 0, iconv('utf-8','euc-kr',$row['od_id']));	/* 주문번호 */
	$worksheet->write($iCount, 1, iconv('utf-8','euc-kr',$row['name']));	/* 수취인명 */
	$worksheet->write($iCount, 2, iconv('utf-8','euc-kr',$v_delivery_type[$row['delivery_type']]."(".$row['clay_id'].")"));	/* 클레이닉네임, 택배 선불/착불 */
	$worksheet->write($iCount, 3, iconv('utf-8','euc-kr',' '.$row['zip']));
	$worksheet->write($iCount, 4, iconv('utf-8','euc-kr',$기본주소));
	$worksheet->write($iCount, 5, iconv('utf-8','euc-kr',' '.$row['hphone']));
	$worksheet->write($iCount, 6, iconv('utf-8','euc-kr',' '.$row['hphone']));
	$worksheet->write($iCount, 7, $it_name);
	$worksheet->write($iCount, 8, 3);
	$worksheet->write($iCount, 9, $it_state);

	$iCount++;
}


$workbook->close();

if($iCount==1)alert("자료가 존재하지 않습니다.");
else{

	header("Content-Type: application/x-msexcel; name=\"memberlist-".date("ymd", time()).".xls\"");
	header("Content-Disposition: inline; filename=\"memberlist-".date("ymd", time()).".xls\"");
	$fh=fopen($fname, "rb");
	fpassthru($fh);
	unlink($fname);

	exit;
}

?>