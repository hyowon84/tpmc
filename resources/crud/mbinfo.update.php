<?php
include_once('./_common.php');
$mb_id = 'test';

/*
 * JSON DECODE 관련 이슈
 * 1. 넘겨받은 JSON텍스트 ICONV로 변환필요 
 * 2. 상품명에 " OR ' 가 포함 되있는경우 디코딩 실패 str_replace로 변환필요
 * 3. STRIPSLASH 안하면 디코딩이 안됨
 * */



$mb_id = $_SESSION['mb_id'];
$cluster_id = $_POST['cluster_id'];
$mb_company = $_POST['mb_company'];
$mb_password = $_POST['mb_password'];
$mb_password2 = $_POST['mb_password2'];
$mb_password3 = $_POST['mb_password3'];
$mb_name = $_POST['mb_name'];
$mb_hp = $_POST['mb_hp'];
$mb_email = $_POST['mb_email'];
$mb_level = $_POST['mb_level'];


//패스워드 변경시 현재 비밀번호, 새 비밀번호, 새 비밀번호 확인 모두 입력이 되있어야함
if( $_POST['mb_password'] && $mb_password2 && $mb_password3 ) {
	
	if($mb_password2 != $mb_password3) {
		$json[success] = "false";
		$json[message] = '새비밀번호와 새비밀번호 확인 입력이 일치하지 않습니다';
		$json_data = json_encode_unicode($json);
		echo $json_data;
		exit;
	}

	$chk_sql = "SELECT	*
							FROM		mms_member
							WHERE		mb_id = '$mb_id'
							AND			mb_password = PASSWORD('$mb_password')
	";
	$re = $sqli->query($chk_sql);
	
	if($re->num_rows > 0) {
		$암호복호화 = ($mb_password) ? " mb_password = password('$mb_password2'),	/*암호*/ " : "";
	}
	else {
		$json[success] = "false";
		$json[message] = '입력하신 현재 비밀번호가 일치하지 않습니다';
		$json_data = json_encode_unicode($json);
		echo $json_data;
		exit;
	}
}


/* 통관 기본폼 입력 */
$common_sql = "	UPDATE	mms_member	SET
													cluster_id = '$cluster_id',		/*그룹ID(계열사가 사용할 그룹ID, 소속회사명 보고 클러스터id 연결해줘야함)*/
													mb_company = '$mb_company',		/*소속회사명(키값은 아님)*/
													mb_id = '$mb_id',							/*계정ID*/
													$암호복호화
													mb_name = '$mb_name',				/*회원명*/
													mb_hp = '$mb_hp',						/*회원 연락처*/
													mb_email = '$mb_email',			/*회원 이메일*/
													mb_level = '$mb_level'			/*1레벨 일반회원, 10레벨 관리자*/
								WHERE		mb_id		= '$mb_id'
";
$result = $sqli->query($common_sql);


if($result) {
	$json[success] = "true";
	$json[message] = '회원정보가 수정되었습니다';
}
else {
	$json[success] = "false";
	$json[message] = '회원정보 수정이 실패하였습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>