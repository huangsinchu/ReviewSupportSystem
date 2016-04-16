<?php
session_start();
$mail = $_POST['mail'];
$name = $_POST['name'];
$password = $_POST['password'];

require_once 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user!=null){
	echo 2;
}else{
	$data = json_encode(array('emailAddress'=>$mail, 'name'=>$name, 'password'=>$password));
	
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
	#$file = fopen("tmp/".$str, "w") or die("Unable to open file!");
	#fwrite($file, $data);
	#fclose($file);
	
	#require("smtp.php");
	#send_email($mail,$str);

	$sub_url = 'user/';
	post_content($sub_url, $data);
	$sub_url = 'user?email='.$mail;
	$user = get_content($sub_url);
	$id = $user->id;
	$sub_url = 'group/';
	$data = '{"userId":'.$id.',"groupName":"所有联系人"}';
	post_content($sub_url, $data);
	
	echo 1;
}
?>