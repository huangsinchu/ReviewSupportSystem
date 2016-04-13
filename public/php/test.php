<?php
$arr['id'] = 11;
	$arr['name'] = 'hsinchu';
	$arr['mail'] = 'huangsinchu@gmail.com';
	$arr['group'] = array();
	#require 'connect.php';
	#$sub_url = 'group?uid='.$_SESSION['uid'];
	#$list = get_content($sub_url);
	$list = json_decode('[{"id":1,"userId":1,"groupName":"user_group_1"},{"id":3,"userId":1,"groupName":"user_group_2"}]');
	foreach($list as $group){
		$arr['group'][] = $group->groupName;
	}
	$json_text = json_encode($arr);
	echo $json_text;
?> 