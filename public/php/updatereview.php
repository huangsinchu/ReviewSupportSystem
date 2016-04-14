<?php
class review{
	public $id;
	public $userId;
	public $title;
	public $address;
	public $description;
	public $status;
	public $type;
}

session_start();
if(isset($_SESSION['uid'])){
	$rid = $_POST['id'];
	$title = $_POST['title'];
	$type = $_POST['type'];
	$url = $_POST['url'];
	$content = $_POST['content'];
	#$target = $_POST['target'];
	$state = $_POST['state'];

	$re = new review;
	$re->id = $rid;
	$re->userId = $_SESSION['uid'];
	$re->title = $title;
	$re->address = $url;
	$re->description = $content;
	$re->status = $state?100:200;
	if($type=="ÎÄµµÆÀÉó"){
		$re->type = 100;
	}elseif($type=="´úÂëÆÀÉó"){
		$re->type = 200;
	}else{
		$re->type = 100;
	}
	require_once 'connect.php';
	$sub_url = 'review/';
	$data = json_encode($re);
	post_content($sub_url,$data);
}
?>