<?php
define('_TD_',true);
header("Content-Type: text/html; charset=UTF-8");

function mms_path()
{

	$result['path'] = str_replace('\\', '/', dirname(__FILE__));
	$tilde_remove = preg_replace('/^\/\~[^\/]+(.*)$/', '$1', $_SERVER['SCRIPT_NAME']);
	$document_root = str_replace($tilde_remove, '', $_SERVER['SCRIPT_FILENAME']);
	$root = str_replace($document_root, '', $result['path']);
	$port = $_SERVER['SERVER_PORT'] != 80 ? ':'.$_SERVER['SERVER_PORT'] : '';
	$http = 'http' . ((isset($_SERVER['HTTPS']) && $_SERVER['HTTPS']=='on') ? 's' : '') . '://';
	$user = str_replace(str_replace($document_root, '', $_SERVER['SCRIPT_FILENAME']), '', $_SERVER['SCRIPT_NAME']);
	$result['url'] = $http.$_SERVER['HTTP_HOST'].$port.$user.$root;
	return $result;
}
$mms_path = mms_path();


// URL 은 브라우저상에서의 경로 (도메인으로 부터의)
if (DOMAIN) {
	define('URL', DOMAIN);
} else {
	if (isset($mms_path['url']))
		define('URL', $mms_path['url']);
	else
		define('URL', '');
}

if (isset($mms_path['path'])) {
	define('M_PATH', $mms_path['path']);
} else {
	define('M_PATH', '');
}
unset($mms_path);

define('SRC_PATH',M_PATH.'/resources');
define('BBS_PATH',M_PATH.'/resources/html');
define('LIB_PATH',M_PATH.'/resources/lib');
define('PLUGIN_PATH',M_PATH.'/resources/plugin');
define('PLUGIN_URL',M_PATH.'/resources/plugin');
define('EXT_PATH',M_PATH.'/resources/extend');
define('INC_PATH',M_PATH.'/resources/inc');
define('TEMP_PATH',SRC_PATH.'/temp');




//==============================================================================
// SESSION 설정
//------------------------------------------------------------------------------
@ini_set("session.use_trans_sid", 0);	// PHPSESSID를 자동으로 넘기지 않음
@ini_set("url_rewriter.tags",""); // 링크에 PHPSESSID가 따라다니는것을 무력화함

session_save_path(M_PATH.'/session');

if (isset($SESSION_CACHE_LIMITER))
	@session_cache_limiter($SESSION_CACHE_LIMITER);
else
	@session_cache_limiter("no-cache, must-revalidate");

ini_set("session.cache_expire", 180); // 세션 캐쉬 보관시간 (분)
ini_set("session.gc_maxlifetime", 10800); // session data의 garbage collection 존재 기간을 지정 (초)
ini_set("session.gc_probability", 1); // session.gc_probability는 session.gc_divisor와 연계하여 gc(쓰레기 수거) 루틴의 시작 확률을 관리합니다. 기본값은 1입니다. 자세한 내용은 session.gc_divisor를 참고하십시오.
ini_set("session.gc_divisor", 100); // session.gc_divisor는 session.gc_probability와 결합하여 각 세션 초기화 시에 gc(쓰레기 수거) 프로세스를 시작할 확률을 정의합니다. 확률은 gc_probability/gc_divisor를 사용하여 계산합니다. 즉, 1/100은 각 요청시에 GC 프로세스를 시작할 확률이 1%입니다. session.gc_divisor의 기본값은 100입니다.

session_set_cookie_params(0, '/');
ini_set("session.cookie_domain", '');

session_start();



include_once(SRC_PATH.'/dbconfig.php');
include_once(LIB_PATH.'/common.lib.php');
$connect_db = sql_connect(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD) or die('MySQL Connect Error!!!');
$select_db  = sql_select_db(MYSQL_DB, $connect_db) or die('MySQL DB Error!!!');
@mysql_query(" set names utf8 ");

$sqli = new mysqli(MYSQL_HOST, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB);
$sqli->query(" set names utf8 ");



//==============================================================================
// 공용 변수
//------------------------------------------------------------------------------
// 기본환경설정
// 기본적으로 사용하는 필드만 얻은 후 상황에 따라 필드를 추가로 얻음
$config = sql_fetch(" select * from g5_config ");

define('G5_HTTP_BBS_URL',  https_url(G5_BBS_DIR, false));
define('G5_HTTPS_BBS_URL', https_url(G5_BBS_DIR, true));
if ($config['cf_editor'])
	define('G5_EDITOR_LIB', EDITOR_PATH."/{$config['cf_editor']}/editor.lib.php");
else
	define('G5_EDITOR_LIB', LIB_PATH."/editor.lib.php");












// common.php 파일을 수정할 필요가 없도록 확장합니다.
$tmp = dir(EXT_PATH);
while ($entry = $tmp->read()) {
	// php 파일만 include 함
	if (preg_match("/(\.php)$/i", $entry))
		include_once(EXT_PATH.'/'.$entry);
}











$detect = new Mobile_Detect;
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