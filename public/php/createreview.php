<?php
class review{
	public $userId;
	public $title;
	public $address;
	public $description;
	public $status;
	public $type;
}

class invatation{
	public $reviewId;
	public $userId;
	public $read;
}

session_start();
if(isset($_SESSION['uid'])){
	
	$title = $_POST['title'];
	$type = $_POST['type'];
	$url = $_POST['url'];
	$content = $_POST['content'];
	$target = $_POST['target'];
	$state = $_POST['state'];
	
/*
	$title = $_GET['title'];
	$type = $_GET['type'];
	$url = $_GET['url'];
	$content = $_GET['content'];
	$target = $_GET['target'];
	$state = $_GET['state'];
*/
	//��������
	$re = new review;
	$re->userId = $_SESSION['uid'];
	$re->title = $title;
	$re->address = $url;
	$re->description = $content;
	$re->status = $state?100:200;
	if($type=="�ĵ�����"){
		$re->type = 100;
	}elseif($type=="��������"){
		$re->type = 200;
	}else{
		$re->type = 100;
	}
	require_once 'connect.php';
	$sub_url = 'review/';
	$data = json_encode($re);
	$rid = post_content($sub_url,$data);
	
	//��ȡ�û�����ϵ���б�
	$sub_url = 'group?uid='.$_SESSION['uid'];
	$grouplist = get_content($sub_url);
	$gid = 0;
	foreach($grouplist as $group){
		if($target==$group->groupName){
			$gid = $group->id;
			break;
		}
	}
	
	//��Ŀ����ϵ���������˴���һ������
	$sub_url = 'contact?groupId='.$gid;
	$userlist = get_content($sub_url);
	#$arr = array();
	foreach($userlist as $user){
		$i = new invatation;
		$i->reviewId = $rid;
		$i->userId = $user->id;
		$i->read = false;
		#$arr[] = $i;
		$data = json_encode($i);
		$sub_url = 'invatation/';
		post_content($sub_url,$data);
	}
	
	
}
?>