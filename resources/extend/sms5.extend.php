<?php
if (!defined('_TD_')) exit; // 개별 페이지 접근 불가

//------------------------------------------------------------------------------
// SMS 상수 모음 시작
//------------------------------------------------------------------------------

define('SMS5_DIR',             'sms5');
define('SMS5_PATH',            PLUGIN_PATH.'/'.SMS5_DIR);
define('SMS5_URL',             PLUGIN_URL.'/'.SMS5_DIR);

define('SMS5_ADMIN_DIR',        'sms_admin');
define('SMS5_ADMIN_PATH',       ADMIN_PATH.'/'.SMS5_ADMIN_DIR);
define('SMS5_ADMIN_URL',        ADMIN_URL.'/'.SMS5_ADMIN_DIR);

// SMS 테이블명
$g5['sms5_prefix']                = 'sms5_';
$g5['sms5_config_table']          = $g5['sms5_prefix'] . 'config';
$g5['sms5_write_table']           = $g5['sms5_prefix'] . 'write';
$g5['sms5_history_table']         = $g5['sms5_prefix'] . 'history';
$g5['sms5_book_table']            = $g5['sms5_prefix'] . 'book';
$g5['sms5_book_group_table']      = $g5['sms5_prefix'] . 'book_group';
$g5['sms5_form_table']            = $g5['sms5_prefix'] . 'form';
$g5['sms5_form_group_table']      = $g5['sms5_prefix'] . 'form_group';
$g5['sms5_member_history_table']  = $g5['sms5_prefix'] . 'member_history';



if (!empty($config['cf_sms_use'])) {


	$sms5 = sql_fetch("select * from {$g5['sms5_config_table']} ", false);
	if( $sms5['cf_member'] && trim($member['mb_hp']) ) {
		$g5['sms5_use_sideview'] = true; //회원 사이드뷰 레이어에 추가
	} else {
		$g5['sms5_use_sideview'] = false;
	}

	//==============================================================================
	// 스킨경로
	//------------------------------------------------------------------------------

	$sms5_skin_path = SMS5_PATH.'/skin/'.$sms5['cf_skin']; //sms5 스킨 path
	$sms5_skin_url = SMS5_URL .'/skin/'.$sms5['cf_skin']; //sms5 스킨 url

	// Demo 설정
	if (file_exists(PATH.'/DEMO'))
	{
		// 받는 번호를 010-000-0000 으로 만듭니다.
		$g5['sms5_demo'] = true;

		// 아이코드에 실제로 보내지 않고 가상(Random)으로 전송결과를 저장합니다.
		$g5['sms5_demo_send'] = true;
	}


	include_once(LIB_PATH.'/icode.sms.lib.php');
	include_once(SMS5_PATH.'/sms5.lib.php');

}


/**
 * 아이코드 발송서버 정보
 *
 * 문자를 발송하기 위한 서버정보입니다.
 * IP는 아이코드의 고정서버이니 변경하지 않으셔도 됩니다.
 * 아이코드의 고정서버 IP는 '211.172.232.124' 입니다.
 * Port번호는 상황에 따라 달라질 수 있습니다. 형태는 다음과 같습니다.
 */
$socket_host	= "211.172.232.124";
$socket_port	= 9201;

/**
 * 아이코드 발송전용 토큰키
 *
 * 아이코드 접속을 위한 토큰키입니다.
 * 발송 전용 토큰키를 넣어주시기 바랍니다.
 * 토큰키는 아이코드 사이트인 'http://www.icodekorea.com/'의
 * 기업고객페이지의 모듈다운로드의 '토큰키 관리' 화면에서 생성가능합니다.
 */
$icode_key	= "a274fd7208b128a35590ac33ce8f625b";


function sendSms($strTelList,$strData) {
	global $socket_host,$socket_port,$icode_key;

	/**
	 * 발신번호 사전등록제 (전기통신사업법 제84조)
	 *  거짓으로 표시된 전화번호를 인한 이용자 피해 예방을 위하여 문자 전송시
	 *  사전 인증된 발신번호로만 사용할 수 있도록 등록하는 제도입니다.
	 *  발신번호등록은 아이코드 사이트 로그인 후 상단 발신번호 등록를 참고 하시기 바랍니다.
	 */

	$SMS = new SMSN;		/* SMS 모듈 클래스 생성 */
	$SMS->SMS_con($socket_host,$socket_port,$icode_key);		/* 아이코드 서버 접속 */

	/**
	 * 문자발송 Form을 사용하지 않고 자동 발송의 경우 수신번호가 1개일 경우 번호 마지막에 ";"를 붙인다
	 * ex) $strTelList = "0100000001;";
	 */
//	$strTelList     = '01044820607;';		/* 수신번호 : 01000000001;0100000002; */
	$strCallBack    = '0220886657';	/* 발신번호 : 0317281281 */
//	$strData        = "내용";        /* 메세지 : 발송하실 문자 메세지 */
	$chkSendFlag    = '0';	/* 예약 구분자 : 0 즉시전송, 1 예약발송 */
	$R_YEAR         = $_POST["R_YEAR"];         /* 예약 : 년(4자리) 2016 */
	$R_MONTH        = $_POST["R_MONTH"];        /* 예약 : 월(2자리) 01 */
	$R_DAY          = $_POST["R_DAY"];          /* 예약 : 일(2자리) 31 */
	$R_HOUR         = $_POST["R_HOUR"];         /* 예약 : 시(2자리) 02 */
	$R_MIN          = $_POST["R_MIN"];          /* 예약 : 분(2자리) 59 */

	$strDest	= explode(";",$strTelList);
	$nCount		= count($strDest)-1;		// 문자 수신번호 갯수

	// 예약설정을 합니다.
	if ($chkSendFlag) $strDate = $R_YEAR.$R_MONTH.$R_DAY.$R_HOUR.$R_MIN;
	else $strDate = "";

	// 문자 발송에 필요한 항목을 배열에 추가
	$result = $SMS->Add($strDest, $strCallBack, $strCaller, $strSubject, $strURL, $strData, $strDate, $nCount);
	$msg = '';
	// 패킷 정의의 결과에 따라 발송여부를 결정합니다.
	if ($result) {
		$msg.="일반메시지 입력 성공<BR>";

		// 패킷이 정상적이라면 발송에 시도합니다.
		$result = $SMS->Send();

		if ($result) {
			$msg.="서버에 접속했습니다.<br>";
			$success = $fail = 0;
			$isStop = 0;
			foreach($SMS->Result as $result) {

				list($phone,$code)=explode(":",$result);

				if (substr($code,0,5)=="Error") {
					$msg.=$phone.' 발송에러('.substr($code,6,2).'): ';
					switch (substr($code,6,2)) {
						case '17':	 // "07: 발송대기 처리. 지연해소시 발송됨."
							$msg.="일시적인 지연으로 인해 발송대기 처리되었습니다.<br>";
							break;
						case '23':	 // "23:데이터오류, 전송날짜오류, 발신번호미등록"
							$msg.="데이터를 다시 확인해 주시기바랍니다.<br>";
							break;

						// 아래의 사유들은 발송진행이 중단됨.
						case '85':	 // "85:발송번호 미등록"
							$msg.="등록되지 않는 발송번호 입니다.<br>";
							break;
						case '87':	 // "87:인증실패"
							$msg.="(정액제-계약확인)인증 받지 못하였습니다.<br>";
							break;
						case '88':	 // "88:연동모듈 발송불가"
							$msg.="연동모듈 사용이 불가능합니다. 아이코드로 문의하세요.<br>";
							break;

						case '96':	 // "96:토큰 검사 실패"
							$msg.="사용할 수 없는 토큰키입니다.<br>";
							break;
						case '97':	 // "97:잔여코인부족"
							$msg.="잔여코인이 부족합니다.<br>";
							break;
						case '98':	 // "98:사용기간만료"
							$msg.="사용기간이 만료되었습니다.<br>";
							break;
						case '99':	 // "99:인증실패"
							$msg.="서비스 사용이 불가능합니다. 아이코드로 문의하세요.<br>";
							break;
						default:	 // "미 확인 오류"
							$msg.="알 수 없는 오류로 전송이 실패하었습니다.<br>";
							break;
					}
					$fail++;
				} else {
					$msg.=$phone."로 전송했습니다. (msg seq : ".$code.")<br>";
					$success++;
				}
			}
			$msg.='<br>'.$success."건을 전송했으며 ".$fail."건을 보내지 못했습니다.<br>";
			$SMS->Init(); // 보관하고 있던 결과값을 지웁니다.
		}
		else $msg.="에러: SMS 서버와 통신이 불안정합니다.<br>";
	}

	return $msg;
}

?>