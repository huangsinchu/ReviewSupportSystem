<?php
session_start();
$mail = $_POST['mail'];
$password = $_POST['password'];
$md5 = md5($password);

require 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user==null){
	echo 1;
}elseif($md5!=$user->password){
	echo 2;
}elseif($md5==$user->password){
	$_SESSION['logged_mail']=$mail;
	$_SESSION['uid']=$user->id;
	$_SESSION['name']=$user->name;
	echo 3;
}else{
	echo 1;	
}
?>