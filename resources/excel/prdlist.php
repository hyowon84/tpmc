<?
include "_common.php";

include_once(SRC_PATH.'/lib/Excel/php_writeexcel/class.writeexcel_workbook.inc.php');
include_once(SRC_PATH.'/lib/Excel/php_writeexcel/class.writeexcel_worksheet.inc.php');



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


if($keyword) {
	$키워드 = " AND ";

	$arrkey = explode(' ',$keyword);
	for($i = 0; $i < count($arrkey); $i++) {
		$복수키워드 .= " ( T.gp_id LIKE '%$arrkey[$i]%' OR T.gp_name LIKE '%$arrkey[$i]%' OR T.location LIKE '%$arrkey[$i]%' ) AND ";
	}
	$복수키워드 = "AND (".substr($복수키워드, 0, strlen($복수키워드)-4).")";
}
$AND_SQL .= $복수키워드;




/* 코투재고는 */
if ($gpcode == 'QUICK') {
	/* 카테고리 CT */
	$SELECT_SQL = "	SELECT	
													T.gp_id,
													T.ca_id,
													T.location,
													T.gp_img,
													T.gp_name,
													T.gp_update_time,
													T.gp_price_type,
													T.gp_metal_type,
													T.gp_metal_don,
													T.gp_spotprice_type,
													T.gp_spotprice,
													T.gp_order,
													T.gp_use,
													
													T.gp_price,
													T.gp_usdprice,
													T.gp_realprice,
													T.gp_price_org,
													T.gp_buy_max_qty,
													T.only_member,
													
													/*최초재고값 + 발주수량 - 실주문량*/
													T.real_jaego,												/*실재고*/
													T.jaego,														/*재고보정값*/
													T.jaego_memo,												/*재고메모*/
													IFNULL(T.CO_SUM,0) AS CO_SUM,				/*누적주문량*/
													T.IV_SUM,														/*누적발주량*/
													
													T.ac_yn,								/*경매진행여부*/
													T.ac_code,							/*경매진행코드*/
													T.ac_qty,								/*경매진행수량*/
													T.ac_enddate,						/*경매종료일자*/
													T.ac_startprice,				/*경매 시작가*/
													T.ac_buyprice,						/*경매 즉시구매가*/
													T.ebay_id
									FROM		$sql_admin_product
									WHERE		1=1
									$AND_SQL
	";
//			echo $SELECT_SQL;
}
else if($gpcode == 'JAEGO') {
	/* 카테고리 CT */
	$SELECT_SQL = "	SELECT	
													T.gp_id,
													T.ca_id,
													T.location,
													T.gp_img,
													T.gp_name,
													T.gp_update_time,
													T.gp_price_type,
													T.gp_metal_type,
													T.gp_metal_don,
													T.gp_spotprice_type,
													T.gp_spotprice,
													T.gp_order,
													T.gp_use,
													
													T.gp_price,
													T.gp_usdprice,
													T.gp_realprice,
													T.gp_price_org,
													T.gp_buy_max_qty,
													T.only_member,
													
													/*최초재고값 + 발주수량 - 실주문량*/
													T.real_jaego,												/*실재고*/
													T.jaego,														/*재고보정값*/
													T.jaego_memo,												/*재고메모*/
													IFNULL(T.CO_SUM,0) AS CO_SUM,				/*누적주문량*/
													T.IV_SUM,														/*누적발주량*/
													
													T.ac_yn,								/*경매진행여부*/
													T.ac_code,							/*경매진행코드*/
													T.ac_qty,								/*경매진행수량*/
													T.ac_enddate,						/*경매종료일자*/
													T.ac_startprice,				/*경매 시작가*/
													T.ac_buyprice,						/*경매 즉시구매가*/
													T.ebay_id
									FROM		$sql_admin_product
									WHERE		1=1
									AND			T.location != ''
									$AND_SQL
	";
//		echo $SELECT_SQL;
}


$ob = $sqli->query($SELECT_SQL);


	

$fname = tempnam(TEMP_PATH,"tmp-prdlist.xls");
$workbook = new writeexcel_workbook($fname);
$worksheet = $workbook->addworksheet();


//기본설정
$arr = array();

$worksheet->set_column('A1', 35);
$text_format =& $workbook->addformat(array(
	bold    => 1,
	italic  => 1,
	color   => 'blue',
	size    => 18
));
$worksheet->write(0, 0, iconv_euckr('코투 상품목록'), $text_format);



$rowLineNo = 3;
$worksheet->write($rowLineNo, 0, iconv('utf-8','euc-kr','상품코드'));
$worksheet->write($rowLineNo, 1, iconv('utf-8','euc-kr','카테고리'));
$worksheet->write($rowLineNo, 2, iconv('utf-8','euc-kr','재고위치'));	
$worksheet->write($rowLineNo, 3, iconv('utf-8','euc-kr','이미지URL'));
$worksheet->write($rowLineNo, 4, iconv('utf-8','euc-kr','상품명'));
$worksheet->write($rowLineNo, 5, iconv('utf-8','euc-kr','갱신일'));
$worksheet->write($rowLineNo, 6, iconv('utf-8','euc-kr','가격유형'));
$worksheet->write($rowLineNo, 7, iconv('utf-8','euc-kr','금속유형'));
$worksheet->write($rowLineNo, 8, iconv('utf-8','euc-kr','OZ'));
$worksheet->write($rowLineNo, 9, iconv('utf-8','euc-kr','스팟유형'));
$worksheet->write($rowLineNo, 10, iconv('utf-8','euc-kr','+스팟시세'));
$worksheet->write($rowLineNo, 11, iconv('utf-8','euc-kr','정렬순서'));
$worksheet->write($rowLineNo, 12, iconv('utf-8','euc-kr','상품사용여부'));
$worksheet->write($rowLineNo, 13, iconv('utf-8','euc-kr','판매가￦'));
$worksheet->write($rowLineNo, 14, iconv('utf-8','euc-kr','달러가$'));
$worksheet->write($rowLineNo, 15, iconv('utf-8','euc-kr','스팟시세가￦'));
$worksheet->write($rowLineNo, 16, iconv('utf-8','euc-kr','매입가$'));
$worksheet->write($rowLineNo, 17, iconv('utf-8','euc-kr','최대구매수량'));
$worksheet->write($rowLineNo, 18, iconv('utf-8','euc-kr','회원전용구매'));
$worksheet->write($rowLineNo, 19, iconv('utf-8','euc-kr','실재고'));
$worksheet->write($rowLineNo, 20, iconv('utf-8','euc-kr','최초재고값'));
$worksheet->write($rowLineNo, 21, iconv('utf-8','euc-kr','재고메모'));
$worksheet->write($rowLineNo, 22, iconv('utf-8','euc-kr','주문누적량'));
$worksheet->write($rowLineNo, 23, iconv('utf-8','euc-kr','발주누적량'));
$worksheet->write($rowLineNo, 24, iconv('utf-8','euc-kr','경매진행여부'));
$worksheet->write($rowLineNo, 25, iconv('utf-8','euc-kr','경매코드'));
$worksheet->write($rowLineNo, 26, iconv('utf-8','euc-kr','경매진행수량'));
$worksheet->write($rowLineNo, 27, iconv('utf-8','euc-kr','경매종료일'));
$worksheet->write($rowLineNo, 28, iconv('utf-8','euc-kr','경매시작가'));
$worksheet->write($rowLineNo, 29, iconv('utf-8','euc-kr','경매즉구가'));


while( $row = $ob->fetch_array() ) {
	$rowLineNo++;
	
	for($i = 0; $i < 30; $i++) {
		
		//가격유형, 스팟유형,
		if($i == 6 || $i == 7 || $i == 9) {
			switch($row[$i]) {
				case 'Y':
					$데이터 = '스팟';
					break;
				case 'N':
					$데이터 = '달러';
					break;
				case 'W':
					$데이터 = '원화';
					break;
				case 'GL':
					$데이터 = '금';
					break;
				case 'SL':
					$데이터 = '은';
					break;
				case 'U$':
					$데이터 = '1oz이상($)';
					break;
				case 'D$':
					$데이터 = '1oz이하($)';
					break;
				default:
					$데이터 = '';
					break;
			}
		}
		else {
			$데이터 = $row[$i];
		}

		$worksheet->write($rowLineNo, $i, iconv('utf-8','euc-kr',$데이터));
		
	}
	
}
$workbook->close();

if($rowLineNo==3)alert("자료가 존재하지 않습니다.");
else{

	header("Content-Type: application/x-msexcel; name=\"prdlist-".date("ymd", time()).".xls\"");
	header("Content-Disposition: inline; filename=\"prdlist-".date("ymd", time()).".xls\"");
	$fh=fopen($fname, "rb");
	fpassthru($fh);
	unlink($fname);

	exit;
}

?>