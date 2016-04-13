<?php
session_start(); 
if(!isset($_SESSION['uid'])){
	echo "{}";
}else{
	require_once 'connect.php';
	$sub_url = 'group?uid='.$_SESSION['uid'];
	$grouplist = get_content($sub_url);
	$arr = array();
	foreach($grouplist as $group){
		$gid = $group->id;
		$gname = $group->groupName;
		$sub_url = 'contact?groupId='.$gid;
		$contactlist = get_content($sub_url);
		foreach($contactlist as $contact){
			$sub_url = 'user/'.$contact->contactId;
			$mail = get_content($sub_url)->emailAddress;
			$arr[$gname][] = $mail;
		}
	}
	$json_text = json_encode($arr);
	echo $json_text;
}
?>