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


/* 공구목록 */
if($mode == 'product') {
	if($keyword) {
		$키워드 = " AND ";

		$arrkey = explode(' ',$keyword);
		for($i = 0; $i < count($arrkey); $i++) {
			$복수키워드 .= " (GI.gpcode LIKE '%$arrkey[$i]%' OR GI.gpcode_name LIKE '%$arrkey[$i]%' ) AND ";
		}
		$복수키워드 = "AND (".substr($복수키워드, 0, strlen($복수키워드)-4).")";
	}
	$AND_SQL .= $복수키워드;


	/* 주문금액 큰 순서대로 회원목록 추출 */
	$SELECT_SQL = "	SELECT	'QUICK' AS gpcode,
													'코투 빠른배송상품' AS gpcode_name,
													'00' AS stats,
													'상시진행' AS stats_name,
													'2016-01-01' AS start_date,
													'2999-12-31' AS end_date,
													'2999-12-31 00:00:00' AS reg_date,
													(	SELECT	COUNT(*)
														FROM		g5_shop_group_purchase GP
														WHERE		GP.ca_id LIKE 'CT%'
													) AS ITEM_CNT
									FROM		DUAL
									UNION ALL
									SELECT	'JAEGO' AS gpcode,
													'코투 재고칸' AS gpcode_name,
													'00' AS stats,
													'상시진행' AS stats_name,
													'2016-01-01' AS start_date,
													'2999-12-31' AS end_date,
													'2999-12-31 00:00:00' AS reg_date,
													(	SELECT	COUNT(*)
														FROM		g5_shop_group_purchase GP
														WHERE		GP.location != ''
													) AS ITEM_CNT
									FROM		DUAL
									UNION ALL
									SELECT	'TEMP' AS gpcode,
													'코투 재고조사중' AS gpcode_name,
													'00' AS stats,
													'상시진행' AS stats_name,
													'2016-01-01' AS start_date,
													'2999-12-31' AS end_date,
													'2999-12-31 00:00:00' AS reg_date,
													(	SELECT	COUNT(*)
														FROM		g5_shop_group_purchase GP
														WHERE		GP.ca_id LIKE 'JG%'
													) AS ITEM_CNT
									FROM		DUAL
									UNION ALL
									SELECT	GI.gpcode,
													GI.gpcode_name,
													GI.stats,
													SN.value AS stats_name,
													GI.start_date,
													GI.end_date,
													GI.reg_date,
													GL.ITEM_CNT
									FROM		gp_info GI
													LEFT JOIN comcode SN ON (SN.ctype = 'clayorder' AND SN.col = 'stats' AND SN.code = GI.stats)
													LEFT JOIN (	SELECT	gpcode,
																							COUNT(*) AS ITEM_CNT
																			FROM		v_gpinfo_links
																			GROUP BY gpcode
													) GL ON (GL.gpcode = GI.gpcode)
									WHERE		GI.gpcode != 'QUICK'
									$AND_SQL
	";
}
//주문정보 에디터 유틸페이지
else if($mode == 'editor') {
	if($query) $AND_SQL .= " AND	( GI.gpcode LIKE '%$query%' OR GI.gpcode_name LIKE '%$query%' )";

	$SELECT_SQL = "	SELECT	GI.gpcode,
													GI.gpcode_name,
													GI.stats,
													SN.value AS stats_name,
													GI.start_date,
													GI.end_date,
													GI.reg_date,
													GL.ITEM_CNT
									FROM		gp_info GI
													LEFT JOIN comcode SN ON (SN.ctype = 'clayorder' AND SN.col = 'stats' AND SN.code = GI.stats)
													LEFT JOIN (	SELECT	gpcode,
																							COUNT(*) AS ITEM_CNT
																			FROM		v_gpinfo_links
																			GROUP BY gpcode
													) GL ON (GL.gpcode = GI.gpcode)
									WHERE		1=1
									$AND_SQL
	";
}

$result = $sqli->query($SELECT_SQL);
$total_count = $result->num_rows;


/* */
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