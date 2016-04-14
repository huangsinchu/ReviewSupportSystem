<?php
session_start();
if(!assert($_SESSION['uid'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}elseif(!isset($_POST['groups'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	require 'connect.php';
	$groups = $_POST['groups'];
	$uid = $_SESSION['uid'];
	
	$sub_url = 'group?uid='.$uid;
	$oldgroups = get_content($sub_url);
	
	foreach($groups as $group){
		$exist = false;
		foreach($oldgroups as $oldgroup){
			if($oldgroup->groupName==$group){
				$exist = true;
				break;
			}
			
		}
		if(!$exist){
			$sub_url = 'group/';
			$data = json_encode(array('userId'=>$uid, 'groupName'=>$group));
			post_content($sub_url,$data);
		}
	}
	
	foreach($oldgroups as $oldgroup){
		$exist = false;
		foreach($groups as $group){
			if($oldgroup->groupName==$group){
				$exist = true;
				break;
			}
		}
		if(!$exist){
			$sub_url = 'group/'.$oldgroup->id;
			delete_content($sub_url);
		}
	}
}
?>