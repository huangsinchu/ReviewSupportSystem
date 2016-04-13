<?php
session_start();
if(!isset($_SESSION['uid'])){
	echo "";
}else{
	$arr['id'] = $_SESSION['uid'];
	$arr['name'] = $_SESSION['name'];
	$arr['mail'] = $_SESSION['logged_mail'];
	$arr['group'] = array();
	require 'connect.php';
	$sub_url = 'group?uid='.$_SESSION['uid'];
	$list = get_content($sub_url);
	foreach($list as $group){
		$arr['group'][] = $group->groupName;
	}
	$json_text = json_encode($arr);
	echo $json_text;
}
?>