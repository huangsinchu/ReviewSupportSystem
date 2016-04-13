<?php
session_start();
$mail = $_POST['mail'];

require 'connect.php';
$sub_url = 'user?email='.$mail;
$user = get_content($sub_url);
if($user==null){
	echo 0;
}elseif($mail==$_SESSION['logged_mail']){
	echo 1;
}else{
	$sub_url = 'user?email='.$mail;
	$targetid = get_content($sub_url)->id;
	
	$sub_url = 'group?uid='.$_SESSION['uid'];
	$list = get_content($sub_url);
	$added = false;
	foreach($list as $group){
		$gid = $group->id;
		$sub_url = 'contact?group='.$gid;
		$contactlist = get_content($sub_url);
		foreach($contactlist as $contact){
			if($contact->contactId==targetid){
				$added = true;
				break;
			}
		}
		if($added)break;
	}
	if($added){
		echo 1;
	}else{
		echo 2;
	}
}
?>