<?php
require_once __DIR__.'/vendor/autoload.php';
include "_common.php";

use SoftLayer\Common\ObjectMask;
use SoftLayer\SoapClient;
use SoftLayer\XmlRpcClient;

$json = array();
$data = array();
$cluster_id = $_SESSION['cluster_id'];
$apiUser = $_SESSION['api_id'];
$apiKey = $_SESSION['api_key'];


if($_GET['mode'] == 'eventlog') {

	$response = SoapClient::getClient('SoftLayer_Event_Log', null, $apiUser, $apiKey);
	$data = $response->getAllObjects();
	
	for($i = 0; $i < count($data); $i++) {
		$arr = $data[$i];
		
		$traceId = $arr->traceId;
		$accountId = $arr->accountId;
		$eventCreateDate = $arr->eventCreateDate;
		$eventName = $arr->eventName;
		$ipAddress = $arr->ipAddress;
		$label = $arr->label;
		$metaData = $arr->metaData;
		$objectId = $arr->objectId;
		$objectName = $arr->objectName;
		$userId = $arr->userId;
		$userType = $arr->userType;
		$username = $arr->username;	
		
		$INS_SQL = "INSERT IGNORE INTO 	softlayer_eventlog VALUES (
																			NULL,
																			'$cluster_id',
																			'$traceId',
																			'$accountId',
																			'$eventCreateDate',
																			'$eventName',
																			'$ipAddress',
																			'$label',
																			'$metaData',
																			'$objectId',
																			'$objectName',
																			'$userId',
																			'$userType',
																			'$username'
																			)
		";
		$sqli->query($INS_SQL);
	}
	
}
else if($_GET['mode'] == 'notilog') {
	$response = SoapClient::getClient('SoftLayer_Notification_Occurrence_Event', null, $apiUser, $apiKey);
	$data = $response->getAllObjects();

	for($i = 0; $i < count($data); $i++) {
		$arr = $data[$i];
		$endDate = $arr->endDate;
		$id = $arr->id;
		$lastImpactedUserCount = $arr->lastImpactedUserCount;
		$modifyDate = $arr->modifyDate;
		$recoveryTime = $arr->recoveryTime;
		$startDate = $arr->startDate;
		$statusCode_KeyName = $arr->statusCode_KeyName;
		$statusCode_name = $arr->statusCode_name;
		$subject = $arr->subject;
		$summary = $arr->summary;
		$systemTicketId = $arr->systemTicketId;

		$INS_SQL = "INSERT IGNORE INTO 	softlayer_notilog VALUES (
																			NULL,
																			'$cluster_id',
																			'$endDate',
																			'$id',
																			'$lastImpactedUserCount',
																			'$modifyDate',
																			'$recoveryTime',
																			'$startDate',
																			'$statusCode_KeyName',
																			'$statusCode_name',
																			'$subject',
																			'$summary',
																			'$systemTicketId'
																			)
		";
		$sqli->query($INS_SQL);
	}
}

if($i) {
	$json['total'] = $i;
	$json_data = json_encode($json);
	echo $json_data;
}
?>