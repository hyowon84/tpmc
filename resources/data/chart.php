<?
include "_common.php";
$json = array();
$data = array();



/* REMOTE SORT */
$sort = json_decode(str_replace('\"','"',$_GET['sort']),true);

for($i = 0; $i < count($sort); $i++) {
	if($i == 0) {
		$ORDER_BY = "ORDER BY ".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
	else {
		$ORDER_BY .= ",".$sort[$i]['property']." ".$sort[$i]['direction'];
	}
}



/*
 * 
 * 
CPU 그래프 : 선 그래프

메모리 그래프 : 스택드 그래프
- 사용량(USE + 캐쉬, 쉐어, 버퍼)
- 프리
- 토탈
바텀 사용률%, 사용가능량%

네트워크 그래프  : 선그래프
- 

디스크사용률 그래프 : 
- 

 * 
 * */
//$start = ($start) ? $start : 0;
//$limit = ($limit) ? $limit : 25;


//$cluster_id = 'ssoh';
//$node_id = 'node00';
$기간조건 = '';
$디바이스단위 = ($접속기기 == '데스크탑') ? '-24' : '-6';
$날짜포맷['minute'] = "DATE_FORMAT(from_unixtime(val_x),'%H:%i')";
$날짜포맷['hour'] = "DATE_FORMAT(from_unixtime(val_x),'%H시')";
$날짜포맷['day'] = "DATE_FORMAT(from_unixtime(M.val_x),'%m-%d')";
$날짜포맷['month'] = "DATE_FORMAT(from_unixtime(M.val_x),'%Y-%m')";
$날짜포맷['year'] = "DATE_FORMAT(from_unixtime(M.val_x),'%Y')";

$timetype = ($timetype) ? $timetype : 'minute';
$날짜포맷 = $날짜포맷[$timetype];

$테이블['cpu']['minute'] = "mms_data_cpu_min";
$테이블['cpu']['hour'] = "mms_data_cpu_hour";
$테이블['cpu']['day'] = "mms_data_cpu_day";
$테이블['cpu']['month'] = "mms_data_cpu_month";
$테이블['cpu']['year'] = "mms_data_cpu_year";

$테이블['memory']['minute'] = "v_mms_data_memory_min_per";
$테이블['memory']['hour'] = "v_mms_data_memory_hour_per";
$테이블['memory']['day'] = "v_mms_data_memory_day_per";
$테이블['memory']['month'] = "v_mms_data_memory_month_per";
$테이블['memory']['year'] = "mms_data_memory_year_per";

$테이블['network']['minute'] = "mms_data_network_min";
$테이블['network']['hour'] = "mms_data_network_hour";
$테이블['network']['day'] = "mms_data_network_day";
$테이블['network']['month'] = "mms_data_network_month";
$테이블['network']['year'] = "mms_data_network_year";

$테이블['disk']['minute'] = "mms_data_disk_min";
$테이블['disk']['hour'] = "mms_data_disk_hour";
$테이블['disk']['day'] = "mms_data_disk_day";
$테이블['disk']['month'] = "mms_data_disk_month";
$테이블['disk']['year'] = "mms_data_disk_year";

//두시간 기준

if($mb_id == 'admin') {
	$계정조건 = "	#AND			M.cluster_id = '$cluster_id'
								AND			M.node_id = '$node_id'
	";
}
else {
	$계정조건 = "	AND			M.cluster_id = '$cluster_id'
								AND			M.node_id = '$node_id'
	";
}


if($sdate) {
	$기간조건 .= "		AND			M.m_date >=  '$sdate'	";
}
if($edate) {
	$기간조건 .= "		AND			M.m_date <=  '$edate'	";
}
if(!$sdate && !$edate) {
	$기간조건 .= "		AND			M.m_date >=  DATE_ADD( MDAY.m_date, INTERVAL $디바이스단위 $timetype)	";
}
$추가조건 = $계정조건.$기간조건;



////기본조건 셋팅
//if($timetype == 'minute') {
//
//	if(!$sdate && !$edate) {
//		$기간조건 .= "		AND			M.m_date <=  DATE_ADD( MDAY.m_date, INTERVAL -15 MINUTE)	";
//	}
//	$추가조건 = $계정조건.$기간조건;
//}
//else if($timetype == 'hour') {
//	$기간조건 = "
//		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -20 HOUR)
//	";
//	$추가조건 = $계정조건.$기간조건;
//}
//else if($timetype == 'day') {
//	$기간조건 = "
//		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -20 DAY)
//	";
//	$추가조건 = $계정조건.$기간조건;
//}
//else if($timetype == 'month') {
//	$기간조건 = "
//		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -20 MONTH)
//	";
//	$추가조건 = $계정조건.$기간조건;
//}

//날짜선택시 검색 값셋팅
//$추가조건 .= "	AND "; 
							


//CPU 사용량
if($mode == 'cpu_report') {
	
	$table = $테이블['cpu'][$timetype];
	
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,	
													M.D1_AVG,													
													M.D2 + M.D3 + M.D4 + M.D5 + M.D6 AS D2,
													D2_MIN + D3_MIN + D4_MIN + D5_MIN + D6_MIN AS D2_MIN,
													D2_AVG + D3_AVG + D4_AVG + D5_AVG + D6_AVG AS D2_AVG
								FROM			$table M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		$table
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
	";
}

//메모리 사용량
else if ($mode == 'mem_report') {
	$table = $테이블['memory'][$timetype];
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													IFNULL(M.D1,0) AS D1,
													100 - IFNULL(M.D1,0) AS D2
								FROM			$table M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		$table
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
	";
}

//네트워크 사용량
else if($mode == 'network_report') {
	$table = $테이블['network'][$timetype];
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,	
													M.D1_AVG,	
													M.D2,	/*Y좌표 값(측정수치) Nice*/
													M.D2_MIN,	
													M.D2_AVG	
								FROM			$table M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		$table
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
	";
}

//디스크 사용량
else if($mode == 'disk_report') {
	$table = $테이블['disk'][$timetype];
	$SELECT_SQL = "	SELECT	M.no,	
													M.cluster_id,	/*클러스터명*/
													M.node_id,	/*그룹ID*/
													M.val_x,	/*X좌표 값(유닉스타임 값)*/
													M.mdate,
													M.m_date,	/*유닉스타임 -> 날짜변환*/
													M.reg_date,	/*서버에서 입력한 시간*/
													M.D1,	/*Y좌표 값(측정수치) User*/
													M.D1_MIN,	
													M.D1_AVG,	
													M.D2,	/*Y좌표 값(측정수치) Nice*/
													M.D2_MIN,	
													M.D2_AVG	
								FROM			$table M
													LEFT JOIN (	SELECT	cluster_id,
																							node_id,
																							MAX(m_date) AS m_date
																			FROM		$table
																			GROUP BY cluster_id, node_id
													) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
								WHERE		1=1
								$추가조건
	";
}

//노드 유형 카운팅
else if($mode == 'node_summary') {


	$클러스터ID조건 = ($mb_id == 'admin') ? "" : "AND		MN.cluster_id = '$cluster_id'"; 
	
	$SELECT_SQL = "	SELECT	CONCAT(OS.code_name,'(',MN.node_type,')') AS TITLE,
													COUNT(*) AS VAL
									FROM		mms_node MN
													LEFT JOIN codes OS ON (OS.dbtable = 'mms_node' AND OS.col = 'node_os' AND OS.code = MN.node_os)
									WHERE		1=1
									$클러스터ID조건
									GROUP BY MN.cluster_id, MN.node_os, MN.node_type
	";
}

//노드 활성화 비율
else if($mode == 'node_active') {

	$SELECT_SQL = "
		SELECT	'활성화' AS TITLE,
						'4' AS VAL
		FROM		DUAL
		UNION ALL
		SELECT	'비활성화' AS TITLE,
						'1' AS VAL
		FROM		DUAL
	";

}


$ob = $sqli->query($SELECT_SQL);
$total_count = $ob->num_rows;


/* 코드값 검색 */
$main_sql = "	$SELECT_SQL
							$ORDER_BY
							LIMIT $start, $limit
";
$ob = $sqli->query($main_sql);

//echo $main_sql;



while($row = $ob->fetch_assoc()) {
	foreach($row as $key => $val) {
		$row[$key] = 개행문자삭제($val);
	}
	array_push($data, $row);
}


if($total_count > 0) {
	$json[total] = "$total_count";
	$json[success] = "true";
	$json[data] = $data;
} else {
	$json[total] = 0;
	$json[success] = "false";
}

$json_data = json_encode_unicode($json);
echo $json_data;
?>