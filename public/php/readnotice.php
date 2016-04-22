<?php
session_start();
require 'connect.php';
$uid = $_SESSION['uid'];
$sub_url = 'invatation?uid='.$uid;
$invalist = get_content($sub_url);
foreach($invalist as $inva){
	$inva->read = true;
	$sub_url = 'invatation/';
	$data = json_encode($inva);
	post_content($sub_url,$data);
}
echo 1;
?>