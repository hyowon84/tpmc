<?php
include_once('./_common.php');


$mb_id = $_SESSION[admin_id];


$gr_name = $_POST[gr_name];
$gr_memo  = $_POST[gr_name];



//그레이딩 코드
$seq_sql = "	SELECT	CONCAT(	'G',
																DATE_FORMAT(now(),'%Y%m'),
																'_',

																LPAD(COALESCE(	(	SELECT	SUBSTR(MAX(grcode),9,2)
																									FROM		grading_code
																									WHERE		grcode LIKE CONCAT('G%',DATE_FORMAT(now(),'%Y%m'),'%')
																								)
																						,'00')+1,2,'0')
														)	AS grcode
								FROM		DUAL
";
$ob = $sqli->query($seq_sql);
list($grcode) = $ob->fetch_array();

$ins_sql = "INSERT INTO 	grading_code	SET
														grcode = '$grcode',	/*그레이딩 관리코드*/
														grcode_name = '$grcode_name',	/*그레이딩 타이틀*/
														gr_stats = '00',	/*그레이딩 진행상태*/
														gr_memo = '$gr_memo',	/*메모*/
														reg_date = NOW()	/*생성일*/
";
$sqli->query($ins_sql);



if($result) {
	$json[success] = "true";
	$json[message] = '그레이딩 정보가 생성되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '그레이딩 정보가 생성에 실패하였습니다. 관리자에게 문의바랍니다.';
}


$json_data = json_encode_unicode($json);
echo $json_data;
?>