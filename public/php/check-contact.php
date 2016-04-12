<?php
session_start();
$mail = $_POST['mail'];

require 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user==null){
	echo 0;
}else{
	echo 1;
}
?>