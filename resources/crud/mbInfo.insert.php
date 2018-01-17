<?php
include_once('./_common.php');


function process($_POST) {
	global $sqli;

	$cluster_id = $_POST['cluster_id'];
	$mb_company = $_POST['mb_company'];
	$mb_id = $_POST['mb_id'];
	$mb_password = $_POST['mb_password'];
	$mb_password2 = $_POST['mb_password2'];
	$mb_name = $_POST['mb_name'];
	$mb_hp = $_POST['mb_hp'];
	$mb_email = $_POST['mb_email'];
	$mb_level = $_POST['mb_level'];

	if($mb_password != $mb_password2) {
		$json[success] = "false";
		$json[message] = '비밀번호와 비밀번호 확인 입력이 일치하지 않습니다';
		$json_data = json_encode_unicode($json);
		echo $json_data;
		exit;
	}	
	
	/* 회원 정보 입력 */
	$common_sql = "	INSERT	mms_member	SET
													cluster_id = '$cluster_id',		/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
													mb_company = '$mb_company',		/*소속회사명(키값은 아님)*/
													mb_id = '$mb_id',							/*계정ID*/
													mb_password = PASSWORD('$mb_password'),
													mb_name = '$mb_name',				/*회원명*/
													mb_hp = '$mb_hp',						/*회원 연락처*/
													mb_email = '$mb_email',			/*회원 이메일*/
													mb_level = '$mb_level',			/*1레벨 일반회원, 10레벨 관리자*/
													reg_date = NOW()
	";
	$result = $sqli->query($common_sql);
	return $result;
}

if(process($_POST)) {
	$json[success] = "true";
	$json[message] = '회원정보가 입력되었습니다';
}
else {
	$json[success] = "false";
	$json[message] = '회원정보가 입력되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>