<?php
include_once('./_common.php');


include_once(EXT_PATH.'/Excel/reader.php');


// 상품이 많을 경우 대비 설정변경
function only_number($n)
{
	return preg_replace('/\-*[^0-9]/', '', $n);
}


if($_FILES['importfile']['tmp_name']) {
	$file = $_FILES['importfile']['tmp_name'];

	error_reporting(E_ALL ^ E_NOTICE ^ E_DEPRECATED ^ E_USER_DEPRECATED);
	//E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_DEPRECATED
	ini_set("display_errors", 0);


	@$data = new Spreadsheet_Excel_Reader();
	// Set output Encoding.
	@$data->setOutputEncoding('UTF-8');
	@$data->read($file);


	$total_count = 0;
	$fail_count = 0;
	$succ_count = 0;


	for ($i = 2; $i <= $data->sheets[0]['numRows']; $i++) {
		$total_count++;

		$gr_name = addslashes($data->sheets[0]['cells'][$i][1]);
		$gr_nickname = addslashes($data->sheets[0]['cells'][$i][2]);
		$gr_country = addslashes($data->sheets[0]['cells'][$i][3]);
		$gr_no	= addslashes($data->sheets[0]['cells'][$i][4]);	//입금자명or출금내용
		$gr_it_name	= addslashes($data->sheets[0]['cells'][$i][5]);	//출금액
		$gr_qty	= addslashes($data->sheets[0]['cells'][$i][7]);	//입금액
		$gr_unit = addslashes($data->sheets[0]['cells'][$i][8]);	//남은잔액
		$gr_weight = addslashes($data->sheets[0]['cells'][$i][9]);
		$gr_metal = addslashes($data->sheets[0]['cells'][$i][10]);
		$gr_parvalue = addslashes($data->sheets[0]['cells'][$i][12]);
		$gr_year = addslashes($data->sheets[0]['cells'][$i][13]);
		$gr_note1 = addslashes($data->sheets[0]['cells'][$i][14]);
		$gr_note2 = addslashes($data->sheets[0]['cells'][$i][15]);

		if(!$gr_name || !$gr_qty) {	// || ( !$input_price && !$output_price )
			$fail_count++;
			continue;
		}

		//그레이딩 주문ID 생성
		if($이전name != $gr_name && $이전nick != $gr_nickname) {
			/* 옵션 고유ID 생성 SQL    by. JHW */
			$seq_sql = "	SELECT	CONCAT(	'GR',
																DATE_FORMAT(now(),'%Y%m%d'),
																LPAD(COALESCE(	(	SELECT	MAX(SUBSTR(gr_id,11,4))
																									FROM		grading_item
																									WHERE		gr_id LIKE CONCAT('%',DATE_FORMAT(now(),'%Y%m%d'),'%')
																									ORDER BY gr_id DESC
																								)
																,'0000') +1,4,'0')
												)	AS grid
											FROM		DUAL
			";
			list($gr_id) = mysql_fetch_array(sql_query($seq_sql));
		}


		//중복입력 방지
		$sql = "	SELECT	*
							FROM		grading_item GI
							WHERE		GI.gr_no = '$gr_no'
							AND			GI.gr_name = '$gr_name'
							AND			GI.gr_nickname = '$gr_nickname'
		";
		$dup = $sqli->query($sql)->fetch_array();
		if(strlen($dup[gr_id]) > 2) continue;


		$sql = " INSERT INTO 	grading_item	SET
															grcode = '$grcode',	/*그레이딩 관리코드*/
															gr_id = '$gr_id',	/*그레이딩 주문ID*/
															gr_no = '$gr_no',	/*그레이딩 주문ID*/
															gr_stats = '00',	/*그레이딩 신청정보 진행상태*/
															gr_name = '$gr_name',	/*그레이딩 주문자 이름*/
															gr_nickname = '$gr_nickname',	/*그레이딩 주문자 닉네임*/
															gr_country = '$gr_country',	/*원산지*/
															gr_it_name = '$gr_it_name',	/*상품명*/
															gr_qty = '$gr_qty',	/*수량*/
															gr_unit = '$gr_unit',	/*단위*/
															gr_weight = '$gr_weight',	/*무게 OZ or GRAM*/
															gr_metal = '$gr_metal',	/*금속유형*/
															gr_parvalue = '$gr_parvalue',	/*액면가*/
															gr_year = '$gr_year',	/*년도*/
															gr_note1 = '$gr_note1',	/*메모1*/
															gr_note2 = '$gr_note2'	/*메모2*/

		";
		$sqli->query($sql);
		$succ_count++;

		$이전name = $gr_name;
		$이전nick = $gr_nickname;

	}
}


if($succ_count > 0 && $fail_count == 0) {
	$json[success] = "true";
	$json[message] = "그레이딩 목록이 입력되었습니다";
}
else if($succ_count > 0 && $fail_count > 0) {
	$json[success] = "false";
	$json[message] = "{$succ_count}건 입력성공, {$fail_count}건 입력실패";
}
else {
	$json[success] = "false";
	$json[message] = "입력 실패";
}


$json_data = json_encode_unicode($json);
echo $json_data;
?>