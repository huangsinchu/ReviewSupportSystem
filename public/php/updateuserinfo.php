<?php
session_start();
$id = $_SESSION['uid'];
$name = $_POST['name'];
$oldpassword = $_POST['oldpassword'];
$password = $_POST['password'];

require_once 'connect.php';
$sub_url = 'user/'.$id;
$user = get_content($sub_url);
if($user==null){
	echo 3;
}elseif($oldpassword!=$user->password){
	echo 2;
}else{
	$data = json_encode(array('id'=>$id, 'emailAddress'=>$_SESSION['logged_mail'], 'name'=>$name, 'password'=>$password));
	$sub_url = 'user/';
	post_content($sub_url, $data);
	echo 1;
}
?>