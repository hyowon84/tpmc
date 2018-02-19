<?php
include "_common.php";
$json = array();
$data = array();



/* REMOTE SORT */
$sort = json_decode(str_replace('\"','"',$_GET[sort]),true);

for($i = 0; $i < count($sort); $i++) {
	if($i == 0) {
		$ORDER_BY = "ORDER BY ".$sort[$i][property]." ".$sort[$i][direction];
	}
	else {
		$ORDER_BY .= ",".$sort[$i][property]." ".$sort[$i][direction];
	}
}


$AND_SQL = "";


/* 그레이딩정보 목록 */
if($mode == 'gradinginfo') {
	if($keyword) {
		$키워드 = " AND ";

		$arrkey = explode(' ',$keyword);
		for($i = 0; $i < count($arrkey); $i++) {
			$복수키워드 .= " (GR.grcode LIKE '%$arrkey[$i]%' OR GR.grcode_name LIKE '%$arrkey[$i]%' ) AND ";
		}
		$복수키워드 = "AND (".substr($복수키워드, 0, strlen($복수키워드)-4).")";
	}
	$AND_SQL .= $복수키워드;


	$SELECT_SQL = "	SELECT	GR.no,					/*NO*/
													GR.grcode,			/*그레이딩 관리코드*/
													GR.grcode_name,	/*그레이딩 타이틀*/
													GR.gr_stats,		/*그레이딩 진행상태*/
													GR.gr_memo,			/*메모*/
													GR.reg_date			/*생성일*/
									FROM		grading_code GR
									WHERE		1=1
									AND			GR.gr_stats >= '00'
									AND			GR.gr_stats <= '60'
									$AND_SQL
	";
}
//그레이딩 신청자 정보
else if($mode == 'mblist') {
	if($grcode) $공구코드조건 .=" AND ( GI.grcode IN (".str_replace("\'","'",$grcode).") ) ";
	if($keyword) $내부조건 .= "AND (GI.gr_name LIKE '%$keyword%' OR GI.gr_nickname LIKE '%$keyword%' )";
//	if($keyword) $내부조건 = " AND (CL.name LIKE '%$keyword%' OR CL.hphone LIKE '%$keyword%' OR CL.clay_id LIKE '%$keyword%' OR ( GI.grcode_name LIKE '%$keyword%' AND CL.stats <= 39) ) ";

	$SELECT_SQL = "	SELECT	GI.gr_nickname,
													GI.gr_name,
													SUM(GI.gr_qty) AS SUM_QTY
									FROM		grading_item GI
									WHERE		GI.gr_stats >= '00'
									AND			GI.gr_stats <= '20'
									$공구코드조건
									$내부조건
									GROUP BY GI.gr_nickname, GI.gr_name
	";
}
else if($mode == 'ordered') {

	$SELECT_SQL = "	SELECT	CONCAT(GR.grcode_name,' - ',GI.gr_id,' - ',GI.gr_nickname,'(',GI.gr_name,')') AS project,
													GI.no,
													GI.grcode,											/*그레이딩 관리코드*/
													GR.grcode_name,
													GI.gr_id,												/*그레이딩 주문ID*/
													GI.gr_no,												/*그레이딩 주문ID*/
													#GI.gr_stats,										/*그레이딩 신청정보 진행상태*/
													GC.value AS gr_stats_name,			/*그레이딩 신청정보 진행상태명*/
													GI.gr_name,											/*그레이딩 주문자 이름*/
													GI.gr_nickname,									/*그레이딩 주문자 닉네임*/
													GI.gr_country,									/*원산지*/
													GI.gr_it_name,									/*상품명*/
													GI.gr_qty,											/*수량*/
													GI.gr_unit,											/*단위*/
													GI.gr_weight,										/*무게 OZ or GRAM*/
													GI.gr_metal,										/*금속유형*/
													GI.gr_parvalue,									/*액면가*/
													GI.gr_year,											/*년도*/
													GI.gr_note1,										/*메모1*/
													GI.gr_note2,											/*메모2*/
													GI.reg_date
									FROM		grading_item GI
													LEFT JOIN grading_code GR ON (GR.grcode = GI.grcode)
													LEFT JOIN comcode GC ON (GC.ctype = 'grading' AND GC.col = 'gr_stats' AND GC.code = GI.gr_stats)
									WHERE		GI.gr_name = '$gr_name'
									AND			GI.gr_nickname = '$gr_nickname'
									AND			GI.gr_stats < '40'
	";
}
//그레이딩 처리완료
else if($mode == 'complete') {

	$SELECT_SQL = "	SELECT	CONCAT(GR.grcode_name,' - ',GI.gr_id) AS project,
													GI.no,
													GI.grcode,											/*그레이딩 관리코드*/
													GR.grcode_name,
													GI.shipping_no,
													GI.gr_id,												/*그레이딩 주문ID*/
													GI.gr_no,												/*그레이딩 주문ID*/
													#GI.gr_stats,										/*그레이딩 신청정보 진행상태*/
													GC.value AS gr_stats_name,			/*그레이딩 신청정보 진행상태명*/
													GI.gr_name,											/*그레이딩 주문자 이름*/
													GI.gr_nickname,									/*그레이딩 주문자 닉네임*/
													GI.gr_country,									/*원산지*/
													GI.gr_it_name,									/*상품명*/
													GI.gr_qty,											/*수량*/
													GI.gr_unit,											/*단위*/
													GI.gr_weight,										/*무게 OZ or GRAM*/
													GI.gr_metal,										/*금속유형*/
													GI.gr_parvalue,									/*액면가*/
													GI.gr_year,											/*년도*/
													GI.gr_note1,										/*메모1*/
													GI.gr_note2,											/*메모2*/
													GI.reg_date
									FROM		grading_item GI
													LEFT JOIN grading_code GR ON (GR.grcode = GI.grcode)
													LEFT JOIN comcode GC ON (GC.ctype = 'grading' AND GC.col = 'gr_stats' AND GC.code = GI.gr_stats)
									WHERE		GI.gr_name = '$gr_name'
									AND			GI.gr_nickname = '$gr_nickname'
									AND			GI.gr_stats >= '40'
	";
}



$result = $sqli->query($SELECT_SQL);
$total_count = $result->num_rows;


$main_sql = "	$SELECT_SQL
							$ORDER_BY
							LIMIT $start, $limit
";
$ob = $sqli->query($main_sql);

//echo $main_sql;


while($row = $ob->fetch_array()) {
	
	foreach($row as $key => $val) {
		$row[$key] = 개행문자삭제($val);
		if($key == 'gp_realprice') $row[$key] = CEIL($val / 100) * 100;
	}
	array_push($data, $row);
}

if($total_count > 0) {
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