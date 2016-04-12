<?php
session_start();
$mail = $_POST['mail'];
$password = $_POST['password'];

require 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user==null){
	echo 1;
}elseif($password!=$user->password){
	echo 2;
}elseif($password==$user->password){
	$_SESSION['logged_mail']=$mail;
	$_SESSION['uid']=$user->id;
	$_SESSION['name']=$user->name;
	echo 3;
}else{
	echo 1;	
}
?>