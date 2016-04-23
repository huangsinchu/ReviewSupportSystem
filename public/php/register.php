<?php
session_start();
$mail = $_POST['mail'];
$name = $_POST['name'];
$password = $_POST['password'];

$pattern = "/^([0-9A-Za-z\\-_\\.]+)@([0-9a-z]+\\.[a-z]{2,3}(\\.[a-z]{2})?)$/i";
if(!preg_match($pattern,$mail)){
	echo 3;
}else{
	require_once 'connect.php';
	$sub_url = 'user?email='.$mail;
	$user = get_content($sub_url);
	if($user!=null){
		echo 2;
	}else{
		$str = date("ymdHis");
		for ($i = 0; $i < 16; $i++){
			$r = mt_rand(48, 109);
			if($r>=58&&$r<=83){
				$r+=7;
			}elseif($r>=84){
				$r+=13;
			}
			$str .= chr($r);
		}
		
		$faultmail = $str.":".$mail;
		$md5 = md5($password);
		$data = json_encode(array('emailAddress'=>$faultmail, 'name'=>$name, 'password'=>$md5));
		$sub_url = 'user/';
		$uid = post_content($sub_url, $data);
		
		$string = '?id='.$uid.'&check='.$str;
		
		require 'email.php';
		send_mail($mail,$string);
		
		echo 1;
	}
}


?>