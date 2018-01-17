<?php
require_once __DIR__.'/vendor/autoload.php';
include "_common.php";

use SoftLayer\Common\ObjectMask;
use SoftLayer\SoapClient;
use SoftLayer\XmlRpcClient;

$json = array();
$data = array();
$cluster_id = $_SESSION[cluster_id];

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

/* REMOTE FILTER */
$filter = json_decode(str_replace('\"','"',stripslashes( iconv('utf-8', 'cp949', $_GET[filter] ) )),true);
for($i = 0; $i < count($filter); $i++) {
	$FILTER_BY .= " AND	 T.".$filter[$i][property]." ".$filter[$i][operator]." '%".$filter[$i][value]."%' ";
}
$AND_SQL = "";



$클러스터ID조건 = ($mb_id == 'admin') ? "" : "AND cluster_id = '$cluster_id' ";

if($mode == 'eventlog') {
	$SELECT_SQL = "	SELECT	*
									FROM		softlayer_eventlog
									WHERE		1=1
									$클러스터ID조건
	";
}
else if($mode == 'notilog') {
	$SELECT_SQL = "	SELECT	*
									FROM		softlayer_notilog
									WHERE		1=1
									$클러스터ID조건
	";
}


/* 조회 */
$main_sql = "	$SELECT_SQL
							$ORDER_BY
							LIMIT $start, $limit
";
$result = $sqli->query($main_sql);

while($row = $result->fetch_array()) {
	foreach($row as $key => $val) {
//		$row[$key] = 개행문자삭제($val);
		
		
		if($key == 'summary') {
			$row[$key] = str_replace("\r\n",'<br>',$val);
		}
		else {
			$row[$key] = $val;	
		}
		
	}
	array_push($data, $row);
}

$json['data'] = $data;
$json['total'] = count($data);
$json_data = json_encode($json);
echo $json_data;

?>