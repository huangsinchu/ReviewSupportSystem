<?php
session_start();
if(!assert($_SESSION['uid'])){
	header('HTTP/1.1 403 Forbidden'); 
}elseif(!isset($_POST['action'])){
	header('HTTP/1.1 403 Forbidden'); 
}else{
	$action = $_POST['action'];
	if($action=='add'){
		if(!isset($_POST['mail'])||!isset($_POST['groups'])){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			require_once 'connect.php';
			$mail = $_POST['mail'];
			$sub_url = 'user?email='.$mail;
			$userid = get_content($sub_url)->id;
						
			$groups = $_POST['groups'];
			
			$sub_url = 'group?uid='.$_SESSION['uid'];
			$allgroups = get_content($sub_url);
			
			foreach($groups as $g){
				foreach($allgroups as $group){
					if($g==$group->groupName){
						$gid = $group->id;
						$sub_url = 'contact/';
						$data = json_encode(array('contactId'=>$userid, 'groupId'=>$gid));
						post_content($sub_url,$data);
						break;
					}
				}
			}
		}
	}elseif($action=='delete'){
		if(!isset($_POST['mail'])){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			require_once 'connect.php';
			$mail = $_POST['mail'];
			$sub_url = 'user?email='.$mail;
			$userid = get_content($sub_url)->id;
			
			$sub_url = 'group?uid='.$_SESSION['uid'];
			$allgroups = get_content($sub_url);
			
			foreach($allgroups as $group){
				$gid = $group->id;
				$sub_url = 'contact?groupId='.$gid;
				$contactlist = get_content($sub_url);
				foreach($contactlist as $contact){
					if($userid==$contact->contactId){
						$sub_url = 'contact?contactId='.$userid.'&groupId='.$gid;
						delete_content($sub_url);
					}
				}
			}
		}
	}
}
?>