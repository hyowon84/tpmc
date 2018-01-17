<?php
include_once('./_common.php');


$mb_id = $_SESSION[admin_id];


$gr_name = $_POST[gr_name];
$gr_memo  = $_POST[gr_name];


$ins_sql = "UPDATE 	grading_code	SET
												gr_stats = '00',			/*그레이딩 진행상태*/
												gr_memo = '$gr_memo'	/*메모*/
						WHERE		grcode = '$grcode'				/*그레이딩 관리코드*/
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