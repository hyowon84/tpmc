<?php
include_once('./_common.php');


//스트립슬래시를 안하면 json_decode가 안됨
$arr = json_decode(str_replace('\"','"',stripslashes( iconv('utf-8', 'cp949', $_POST['data'] ) )),true);
$mb_id = $member[mb_id];


/* 단일레코드일때 */
if( strlen($arr[id]) > 3 || strlen($arr[number]) > 3 ) {
	$ex_id = $arr[id];
	$no = $arr[no];

	/* 상품정보 수정 */
	$common_sql = "	UPDATE 		grading_code	SET
															gr_stats = 99
									WHERE			no = '$no'
	";
	sql_query($common_sql);

}
else {	/* 복수레코드일때 */

	//신규시세작성시 전체레코드가 삭제요청 들어오므로 패스

	/*
	for($i = 0; $i < count($arr); $i++) {
		$grid = $arr[$i];

		$ex_id = $grid[id];
		$number = $grid[number];

		//상품정보 수정
		$common_sql = "	DELETE FROM	flowprice_data
										WHERE		number = '$number'
		";
		sql_query($common_sql);

	}
	*/
}

if($result) {
	$json[success] = "true";
	$json[message] = '삭제 되었습니다';
} else {
	$json[success] = "false";
	$json[message] = '삭제되지 않았습니다. 관리자에게 문의바랍니다.';
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>