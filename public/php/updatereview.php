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
	#$type = $_POST['type'];
	$url = $_POST['url'];
	$content = $_POST['content'];
	#$target = $_POST['target'];
	$state = $_POST['state']=='true';

	require_once 'connect.php';
	$sub_url = 'review/'.$rid;
	$review = get_content($sub_url);
	if($review->userId!=$_SESSION['uid']){
		header('HTTP/1.1 403 Forbidden'); 
	}else{
		$review->title = $title;
		$review->address = $url;
		$review->description = $content;
		if($state){
			$review->status = 100;
		}else{
			$review->status = 200;
		}
		$sub_url = 'review/';
		$data = json_encode($review);
		post_content($sub_url,$data);
		if($review->status==100){
			$sub_url = 'invatation?rid='.$rid;
			$invalist = get_content($sub_url);
			foreach($invalist as $inva){
				$inva->read = false;
				$sub_url = 'invatation/';
				$data = json_encode($inva);
				post_content($sub_url,$data);
			}
		}
	}	
}
?>