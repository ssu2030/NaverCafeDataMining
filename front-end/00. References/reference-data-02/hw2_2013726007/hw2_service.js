
var state_do;
var state_shigun;
var Now=new Date();
var hour=Now.getHours();
var day=Now.getDay();
var week = new Array('7', '1', '2', '3', '4', '5', '6');
var dayofweek=week[day]; 
var index;

var lat=new Array();
var lon=new Array();
var duty_name=new Array();
var duty_addr=new Array();
var duty_phonenum=new Array();
var duty_opentime=new Array();
var duty_closetime=new Array();
var spe_add;
var iterator=0;
var contentArray=new Array();
var daytimes;
var daytimec;  
var state
$(document).ready(function(){ //DOM이 준비되고
	
	findhour(hour);
	findday(dayofweek);
	//initMap();
	$("form").submit(function(){ //문서의 모든 form이 submit될때
				
			state_do=document.getElementById("stateselect").value 
			state_shigun=document.getElementById("input_shi").value 
			spe_add=document.getElementById("input_dong").value 
			daytimes='dutyTime'+dayofweek+'s'
			daytimec='dutyTime'+dayofweek+'c'
$(function(){  //
   var endPointUrl = 'http://openapi2.e-gen.or.kr/openapi/service/rest/ErmctInsttInfoInqireService/getParmacyListInfoInqire'; /*URL*/
   var queryParams = '?' + 'ServiceKey' + '=' + 'Dgm9s%2F9GzQ5J%2FuXB7RlPgDqOSEzZ4qd0OFbkmm9sEjXL%2BeQGFt366jqyKdKzVju7%2FgbUo%2FpSQMLcEFZDDlaMJg%3D%3D'; /*Service Key*/
   
   queryParams += '&' + 'Q0' + '=' + encodeURIComponent(state_do);       //위치정보
   queryParams += '&' + 'Q1' + '=' + encodeURIComponent(state_shigun);
   queryParams += '&' + 'QT' + '=' + dayofweek         /*어느요일인지*/
   //queryParams += '&' +'pageNo' + '=' + '1'; /*페이지 번호*/
   queryParams += '&' + 'numOfRows' + '=' + '100'; /*한 페이지 결과 수*/


   
   var url = endPointUrl+queryParams;
   $.ajax({
      url       : url,
      type    : "GET",
      cache    : false,
      async     : true,
      success  : response,
      error    : error1
   });
});
function response(xmlData) {
 

   var xmlData = $(xmlData.responseText).find("items > item");

   var i=0;
   var test=0;
   $(xmlData).each(function() {            //주소와 이름정보만 출력
     test=$(this).find("dutyAddr").text().indexOf(spe_add);
	 if(test!=-1){
			
		 
		
		duty_addr[i]=$(this).find('dutyAddr').text();
		duty_name[i]= $(this).find('dutyName').text();
		duty_phonenum[i]=$(this).find('dutyTel1').text();
		lat[i]=$(this).find('wgs84Lat').text();
		lon[i]=$(this).find('wgs84Lon').text();
		duty_opentime[i]=$(this).find(daytimes).text();
		duty_closetime[i]=$(this).find(daytimec).text();
		contentArray[i]="<h4>약국 이름 : "+duty_name[i]+"</br>"+"약국 주소 : "+duty_addr[i]+"</h4>";
		
		 i++;
	 }
   });

       iterator=0;
for (var a = 0; a <= i; a++) {
		 makeMarker();
	}
	
}
});

	

	
	});




function error1() {  //에러 함수
   $("#result1_1").text("error");
   $("#result1_2").text("error");
}
function checkingtime(){
	
}

function findhour(hour){
	if(12<=hour&&hour<14){
		$("#timeselect option[value='1214']").attr("selected", true);
	}
	else if(14<=hour&&hour<16){
		$("#timeselect option[value='1416']").attr("selected", true);
	}
	else if(16<=hour&&hour<18){
		$("#timeselect option[value='1618']").attr("selected", true);
	}
	else if(18<=hour&&hour<20){
		$("#timeselect option[value='1820']").attr("selected", true);
	}
	else{
		$("#timeselect option[value='1820']").attr("selected", true);
}
}
function findday(dayofweek){
			if(dayofweek==1){
		$("#dayselect option[value='1']").attr("selected", true);
	}
	else if(dayofweek==2){
		$("#dayselect option[value='2']").attr("selected", true);
	}
	else if(dayofweek==3){
		$("#dayselect option[value='3']").attr("selected", true);
	}
	else if(dayofweek==4){
		$("#dayselect option[value='4']").attr("selected", true);
	}
	else if(dayofweek==5){
		$("#dayselect option[value='5']").attr("selected", true);
	}
	else if(dayofweek==6){
		$("#dayselect option[value='6']").attr("selected", true);
	}
	else if(dayofweek==7){
		$("#dayselect option[value='7']").attr("selected", true);
	}
	
	
}
var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.6321375, lng: 127.05082},
    zoom: 14
  });
}
  
function makeMarker(){
   
	var image = {
          url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          // This marker is 20 pixels wide by 32 pixels high.
          size: new google.maps.Size(20, 32),
          // The origin for this image is (0, 0).
          origin: new google.maps.Point(0, 0),
          // The anchor for this image is the base of the flagpole at (0, 32).
          anchor: new google.maps.Point(0, 32)
        };


	var marker = new google.maps.Marker({
		position: {lat: parseFloat(lat[iterator]), lng:parseFloat( lon[iterator])},
        map: map,
        number: iterator,
		title: duty_name[iterator],
		info: duty_name[iterator],
		draggable: false
		//icon: iConArray[iterator]
	});
	//markers.push(marker);
/*
	var infowindow = new google.maps.InfoWindow({
      content: contentArray[iterator]
	});
*/
	google.maps.event.addListener(marker, 'click', function() {
		var infowindow = new google.maps.InfoWindow({
      content: contentArray[marker.number]
	});
		infowindow.open(map,marker);
		text_setting(marker.number)
		
	});
	iterator++;
 map.setCenter(new google.maps.LatLng(parseFloat(lat[0]), parseFloat( lon[0])));	
	}

//Sgoogle.maps.event.addDomListener(window, 'load', initMap);
	
	function text_setting(number){
		$("#test1").text("");
var str;		
		str = "주소 : " + duty_addr[number]  + "\n"
          + "이름 : " + duty_name[number] + "\n"
		  + "전화번호 : " + duty_phonenum[number] + "\n"
		  + "영업시간(본인선택요일) : " + duty_opentime[number] + "시 ~ "+duty_closetime[number]+"시\n"
           + "-------------------------------------------\n";
	$("#test1").text(str);
	}

	/*

       for (var i = 0; i < lon.length; i++) {
          var marker = new google.maps.Marker({
            position: {lat: parseFloat(lat[i]), lng:parseFloat( lon[i])},
            map: map,
            title: duty_name[i],
			info: duty_name[i]
          });
		  map.setCenter(new google.maps.LatLng(parseFloat(lat[0]), parseFloat( lon[0])));
		infoWindow = new google.maps.InfoWindow();
		infoWindow.setOptions({
		 position: {lat: parseFloat(lat[i]), lng:parseFloat( lon[i])},
        content: duty_name+duty_addr[i]

    });
	
	
}
*/

		// var infowindow = new google.maps.InfoWindow({ content: content});