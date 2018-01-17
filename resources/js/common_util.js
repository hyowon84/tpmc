/**
 * Created by lucael on 2017-10-16.
 */
//모바일용 우편번호 display
function basket_order_zipcode_display()
{
	basket_order_change_Obj		= document.getElementById("basket_order_zipcode_layer");

	Height_Tmp	= document.body.scrollTop;
	Left_Tmp	= document.body.scrollWidth;

	Height_Box	= basket_order_change_Obj.style.height;
	Height_Box	= Height_Box.replace("px","");
	Height_Box	= parseInt(Height_Box);

	Width_Box	= basket_order_change_Obj.style.width;
	Width_Box	= Width_Box.replace("px","");
	Width_Box	= parseInt(Width_Box);

	// 현재 박스창 구하기
	if ( window.innerHeight == undefined )
	{
		Now_Window_Height = document.body.offsetHeight;
	}
	else
	{
		Now_Window_Height = window.innerHeight;
	}


	Height_Tmp	= Height_Tmp + ( Now_Window_Height / 2 ) - ( Height_Box / 2 );

	Left_Tmp	= (Left_Tmp / 2) - (Width_Box / 2);

	//alert(Height_Tmp);
	//alert(Left_Tmp);

	basket_order_change_Obj.style.top	= Height_Tmp + "px";
	basket_order_change_Obj.style.left	= Left_Tmp + "px";

	if( basket_order_change_Obj.style.display == 'none' )
	{
		basket_order_change_Obj.style.display = "";
	}
	else
	{
		basket_order_change_Obj.style.display = "none";
	}
}

function searchPostcode() {
	daum.postcode.load(function(){
		new daum.Postcode({
			oncomplete: function(data) {
				// 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

				// 도로명 주소의 노출 규칙에 따라 주소를 조합한다.
				// 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
				var fullRoadAddr = data.roadAddress; // 도로명 주소 변수
				var extraRoadAddr = ''; // 도로명 조합형 주소 변수

				// 법정동명이 있을 경우 추가한다.
				if(data.bname !== ''){
					extraRoadAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다.
				if(data.buildingName !== ''){
					extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}
				// 도로명, 지번 조합형 주소가 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
				if(extraRoadAddr !== ''){
					extraRoadAddr = ' (' + extraRoadAddr + ')';
				}
				// 도로명, 지번 주소의 유무에 따라 해당 조합형 주소를 추가한다.
				if(fullRoadAddr !== ''){
					fullRoadAddr += extraRoadAddr;
				}

				// 우편번호와 주소 정보를 해당 필드에 넣는다.
				//document.getElementById("zip").value = data.postcode1+data.postcode2;
				document.getElementsByName("zip")[0].value = data.zonecode;
				document.getElementsByName("addr1_2")[0].value = fullRoadAddr;
				document.getElementsByName("addr1")[0].value = data.jibunAddress;
				//document.getElementById("zip").value = data.zonecode;
				//document.getElementById("addr1_2").value = fullRoadAddr;
				//document.getElementById("addr1").value = data.jibunAddress;

				// 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
				if(data.autoRoadAddress) {
					//예상되는 도로명 주소에 조합형 주소를 추가한다.
					var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
					//document.getElementsByName("guide")[0].innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
					//document.getElementById("guide").innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';

				} else if(data.autoJibunAddress) {
					var expJibunAddr = data.autoJibunAddress;
					//document.getElementsByName("guide")[0].innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
					//document.getElementById("guide").innerHTML = '(예상 지번 주소 : ' + expJibunAddr + ')';
				} else {
					//document.getElementsByName("guide")[0].innerHTML = '';
					//document.getElementById("guide").innerHTML = '';
				}
			}
		}).open();
	})
}