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

$날짜포맷['min'] = "DATE_FORMAT(from_unixtime(val_x),'%H:%i')";
$날짜포맷['hour'] = "DATE_FORMAT(from_unixtime(val_x),'%H시')";
$날짜포맷['day'] = "DATE_FORMAT(from_unixtime(M.val_x),'%m-%d')";
$날짜포맷['month'] = "DATE_FORMAT(from_unixtime(M.val_x),'%Y-%m')";
$날짜포맷['year'] = "DATE_FORMAT(from_unixtime(M.val_x),'%Y')";

$timetype = ($timetype) ? $timetype : 'min';
$날짜포맷 = $날짜포맷[$timetype];

$테이블['cpu']['min'] = "mms_data_cpu_min";
$테이블['cpu']['hour'] = "mms_data_cpu_hour";
$테이블['cpu']['day'] = "mms_data_cpu_day";
$테이블['cpu']['month'] = "mms_data_cpu_month";
$테이블['cpu']['year'] = "mms_data_cpu_year";

$테이블['memory']['min'] = "mms_data_memory_min";
$테이블['memory']['hour'] = "mms_data_memory_hour";
$테이블['memory']['day'] = "mms_data_memory_day";
$테이블['memory']['month'] = "mms_data_memory_month";
$테이블['memory']['year'] = "mms_data_memory_year";

$테이블['network']['min'] = "mms_data_network_min";
$테이블['network']['hour'] = "mms_data_network_hour";
$테이블['network']['day'] = "mms_data_network_day";
$테이블['network']['month'] = "mms_data_network_month";
$테이블['network']['year'] = "mms_data_network_year";

$테이블['disk']['min'] = "mms_data_disk_min";
$테이블['disk']['hour'] = "mms_data_disk_hour";
$테이블['disk']['day'] = "mms_data_disk_day";
$테이블['disk']['month'] = "mms_data_disk_month";
$테이블['disk']['year'] = "mms_data_disk_year";



$cluster_list = explode(',',$_GET[cluster_id]);
$node_list = explode(',',$_GET[node_id]);


function makeWhere($cluster_id, $node_id) {
	global $_POST,$timetype;

	//두시간 기준
	$계정조건 = "	AND			M.cluster_id = '$cluster_id'
								AND			M.node_id	= '$node_id'	
	";

	//기본조건 셋팅
	if($timetype == 'min') {
		$기간조건 = "	
		AND			M.m_date >=  DATE_ADD( MDAY.m_date, INTERVAL -15 MINUTE)		
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'hour') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -24 HOUR)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'day') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -10 DAY)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else if($timetype == 'month') {
		$기간조건 = "
		AND			M.m_date >=  DATE_ADD( MDAY.m_date,INTERVAL -12 MONTH)
	";
		$추가조건 = $계정조건.$기간조건;
	}
	else {
		$추가조건 = $계정조건.$기간조건;
	}
	
	return $추가조건;
}


//날짜선택시 검색 값셋팅
//$추가조건 .= "	AND ";


$arr = array();

//메모리 사용량
if ($mode == 'mem_report') {
	
	$table = $테이블['memory'][$timetype];
	
	//노드 개수만큼
	for($i = 1; $i <= count($node_list); $i++) {
		$arr[$i-1] = array();
		
		$추가조건 = makeWhere($cluster_list[$i-1], $node_list[$i-1]);
			
		$SELECT_SQL = "	SELECT	M.no,	
														M.cluster_id,	/*클러스터명*/
														M.node_id,	/*그룹ID*/
														M.val_x,	/*X좌표 값(유닉스타임 값)*/
														M.mdate,
														M.m_date,	/*유닉스타임 -> 날짜변환*/
														M.reg_date,	/*서버에서 입력한 시간*/
														M.D1 + D2 + D3 + D4 + D6 AS D{$i},
														M.D1_MIN + D2_MIN + D3_MIN + D4_MIN + D6_MIN AS D{$i}_MIN,
														M.D1_AVG + D2_AVG + D3_AVG + D4_AVG + D6_AVG AS D{$i}_AVG
														
										FROM			$table M
															LEFT JOIN mms_node MN ON (MN.node_id = M.node_id)
															LEFT JOIN (	SELECT	cluster_id,
																									node_id,
																									MAX(m_date) AS m_date
																					FROM		$table
																					GROUP BY cluster_id, node_id
															) MDAY ON (MDAY.cluster_id = M.cluster_id AND MDAY.node_id = M.node_id)
										WHERE		1=1
										$추가조건
		";


		$ob = $sqli->query($SELECT_SQL);
		$total_count = $ob->num_rows;


		/* 코드값 검색 */
		$main_sql = "	$SELECT_SQL
									$ORDER_BY
									LIMIT $start, $limit
		";
		$ob = $sqli->query($main_sql);
		
//		print_r($main_sql);
		while($row = $ob->fetch_assoc()) {
			$arr[$i-1][$row[mdate]] = $row;
		}
		
	}//for

//	print_r($arr);
	
	for($j = 1; $j < count($arr); $j++) {
		
		//$key = 시간, $val = 배열
		foreach($arr[0] AS $key => $val) {
			$arr[0][$key] = array_merge($arr[0][$key], $arr[$j][$key]);
		}
	}
//	print_r($arr[0]);
	$data = array();
	$idx = 0;
	foreach($arr[0] AS $key => $val) {
		$data[$idx++] = $val;
	}

}

//CPU 사용량
else if($mode == 'cpu_report') {
	
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
													M.D2,	/*Y좌표 값(측정수치) Nice*/
													M.D2_MIN,	
													M.D2_AVG,	
													M.D3,	/*Y좌표 값(측정수치) System*/
													M.D3_MIN,	
													M.D3_AVG,	
													M.D4,	/*Y좌표 값(측정수치) Wait*/
													M.D4_MIN,	
													M.D4_AVG,	
													M.D5,	/*Y좌표 값(측정수치) Steal*/
													M.D5_MIN,	
													M.D5_AVG,	
													M.D6,	/*Y좌표 값(측정수치) Idle*/
													M.D6_MIN,	
													M.D6_AVG	
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

//
//while($row = $ob->fetch_assoc()) {
//	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
//	}
//	array_push($data, $row);
//}


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