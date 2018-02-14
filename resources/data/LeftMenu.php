<?
include "_common.php";
admin_check();


if($_SESSION['admin_yn'] == 'Y') {
?>
{
	children:[
    {
			name:"대시보드",
			url: "td.view.dashboard.Main",
			leaf: true,
			expanded: true
    },
	<?
		/*{
			name:"환경설정",
			url: "td.view.dashboard.Main",
			leaf: false,
			expanded: true,
			children:[

			]
		},
		url: "td.view.report.Main",
		*/
	?>
		{
			name: "상품/경매 관리",
			leaf: false,
			expanded: true,
			children:[
				{
					name: "상품 관리",
					url: "td.view.product.ProductMain",
					leaf: true
				},
				{
					name: "경매 관리",
					url: "td.view.product.AuctionMain",
					leaf: true
				}
			]
		},
		{
			name: "공구/퀵 주문관리",
			leaf: false,
			expanded: true,
			children:[
<?
		if($admin_id == 'todaygoldx@naver.com' OR $admin_id == 'heejung@coinstoday.co.kr' OR $admin_id == 'lucael@naver.com') {
?>
				{
					name: "입출금 관리",
					url: "td.view.bank.BankMain",
					leaf: true
				},
<?
		}
?>
				{
					name: "주문 관리",
					url: "td.view.order.OrderMain",
					leaf: true
				},
				{
					name: "통합배송관리",
					leaf: true,
					url: "td.view.shipping.ShippingMain"
				}
			]
		},
		{
			name: "그레이딩 관리",
			leaf: false,
			expanded: true,
			children:[
				{
					name: "그레이딩 신청 관리",
					url: "td.view.grading.GradingMain",
					leaf: true
				}
			]
		},
		{
			name: "발주&입고 관리",
			leaf: false,
			expanded: true,
			children:[
				{
					name: "발주서 조회",
					url: "td.view.invoice.InvoiceSearchMain",
					leaf: true
				},
				{
					name: "발주서 작성",
					url: "td.view.invoice.InvoiceMain",
					leaf: true
				},
				{
					name: "송금내역 작성",
					url: "td.view.invoice.WireMain",
					leaf: true
				},
				{
					name: "통관내역 작성",
					url: "td.view.invoice.ClearanceMain",
					leaf: true
				},
				{
					name: "입고내역 작성",
					url: "td.view.invoice.WarehousingMain",
					leaf: true
				}
			]
		},
		{
			name: "유틸리티",
				leaf: false,
				expanded: true,
				children:[
					{
						name: "주문관리",
						url: "td.view.util.OrderEditMain",
						leaf: true
					}
				]
		},


	<?
					{
						name: "대리주문 입력(XLS)",
						url: "td.view.grading.winImportExcelGrading",
						reference : "winImportExcelGrading",
						window : true,
						leaf: true
					}

	/*

				{
					name: "송금목록",
					url: "td.view.invoice.ReceiptMain",
					leaf: true
				},
				{
					name: "통관목록",
					url: "td.view.invoice.ClearanceMain",
					leaf: true
				},
				{
					name: "입고목록",
					url: "td.view.invoice.WarehousingMain",
					leaf: true
				}
				
			]
		}
	*/ ?>
		
	]
}
<?
} //else end(클라이언트)
//,  M20 마스터계정에 종속되는 일반로그인계정
?>
