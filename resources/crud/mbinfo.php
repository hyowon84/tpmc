<?php
include "_common.php";
$json = array();
$data = array();


$admin_id = $_SESSION['admin_id'];

$SELECT_SQL = "	SELECT	MB.mb_no,
												MB.mb_from,
												MB.mb_id,
												MB.mb_password,
												MB.mb_type,
												MB.mb_level,
												MB.mb_name,
												MB.mb_nick,
												MB.mb_nick_date,
												MB.mb_email,
												MB.mb_homepage,
												MB.mb_password_q,
												MB.mb_password_a,
												MB.mb_jumin,
												MB.mb_sex,
												MB.mb_birth,
												MB.mb_tel,
												MB.mb_hp,
												MB.mb_certify,
												MB.mb_adult,
												MB.mb_zip1,
												MB.mb_zip2,
												MB.mb_addr1,
												MB.mb_addr2,
												MB.mb_addr3,
												MB.mb_addr_jibeon,
												MB.mb_signature,
												MB.mb_recommend,
												MB.mb_point,
												MB.mb_today_login,
												MB.mb_login_ip,
												MB.mb_datetime,
												MB.mb_ip,
												MB.mb_leave_date,
												MB.mb_intercept_date,
												MB.mb_email_certify,
												MB.mb_memo,
												MB.mb_lost_certify,
												MB.mb_mailling,
												MB.mb_sms,
												MB.mb_open,
												MB.mb_open_date,
												MB.mb_profile,
												MB.mb_memo_call,
												MB.mb_1,
												MB.mb_2,
												MB.mb_3,
												MB.mb_4,
												MB.mb_5,
												MB.mb_6,
												MB.mb_7,
												MB.mb_8,
												MB.mb_9,
												MB.mb_10,
												MB.mb_img,
												MB.admin_yn
								FROM		g5_member MB
								WHERE		1=1
								AND			MB.mb_id = '$admin_id'
";
$ob = $sqli->query($SELECT_SQL);


while($row = $ob->fetch_array()) {

	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
		if($key == 'gp_realprice') $row[$key] = CEIL($val / 100) * 100;
	}
	array_push($data, $row);
}


if($ob->num_rows > 0) {
	$json['total'] = "$total_count";
	$json['success'] = "true";
	$json['data'] = $data;
} else {
	$json['total'] = 0;
	$json['success'] = "false";
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>