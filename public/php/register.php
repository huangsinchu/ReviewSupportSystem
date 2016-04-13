<?php
session_start();
$mail = $_POST['mail'];
$name = $_POST['name'];
$password = $_POST['password'];

require 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user!=null){
	echo 2;
}else{
	$sub_url = 'user/';
	$data = json_encode(array('emailAddress'=>$mail, 'name'=>$name, 'password'=>$password));
	post_content($sub_url, $data);
	echo 1;
}
?>