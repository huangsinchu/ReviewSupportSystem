<?php
if(!isset($_GET['id'])||!isset($_GET['check'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	$id = $_GET['id'];
	$check = $_GET['check'];
	require 'connect.php';
	$sub_url = 'user/'.$id;
	$user = get_content($sub_url);
	$faultmail = explode(':',$user->emailAddress);
	if($faultmail[0]==$check){
		$mail = $faultmail[1];
		$sub_url = 'user?email='.$mail;
		$user = get_content($sub_url);
		if($user!=null){
			echo "<head><meta http-equiv='refresh' content='3;url=login.html'></head>邮箱已被激活过，三秒后跳转登陆页面。";
		}else{
			$user->emailAddress = $faultmail[1];
			$sub_url = 'user/';
			$data = json_encode($user);
			post_content($sub_url, $data);
			$sub_url = 'group/';
			$data = '{"userId":'.$id.',"groupName":"所有联系人"}';
			post_content($sub_url, $data);
			
			echo "<head><meta http-equiv='refresh' content='3;url=login.html'></head>激活成功，三秒后跳转登陆页面。";
		}
		
	}else{
		header('HTTP/1.1 503 Service Unavailable');
		header('Status: 503 Service Unavailable');
	}
}
?>
