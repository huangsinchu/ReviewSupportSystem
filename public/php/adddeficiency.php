<?php
class deficiency{
	public $reviewId;
	public $userId;
	public $positionId;
	public $status;
	public $content;
}

session_start();
if(isset($_SESSION['uid'])&&isset($_POST['task'])&&isset($_POST['page'])&&isset($_POST['row'])&&isset($_POST['content'])&&isset($_POST['writer'])){
	$uid = $_SESSION['uid'];
	$rid = $_POST['task'];
	$page = $_POST['page'];
	$row = $_POST['row'];
	$content = $_POST['content'];
	$writer = $_POST['writer'];
	require 'connect.php';
	$sub_url = 'review/'.$rid;
	$review = get_content($sub_url);
	
	$sub_url = 'invatation?uid='.$_SESSION['uid'];
	$list = get_content($sub_url);
	$found = false;
	foreach($list as $i){
		if($i->reviewId==$rid){
			$found = true;
			break;
		}
	}
	if(($writer!=$uid)||($review->status!=100)||(!$found)){
		header('HTTP/1.1 403 Forbidden'); 
	}else{
		if($review->type==100){
			$sub_url = 'position/doc/';
			$data = json_encode(array('line'=>$row, 'page'=>$page));
			$pid = post_content($sub_url,$data);
			$defi = new deficiency;
			$defi->reviewId = $rid;
			$defi->userId = $uid;
			$defi->positionId = $pid;
			$defi->status = 100;
			$defi->content = $content;
			
			$sub_url = 'deficiency/';
			$data = json_encode($defi);
			$defiid = post_content($sub_url,$data);
		}elseif($review->type==200){
			$sub_url = 'position/code/';
			$data = json_encode(array('line'=>$row, 'fileName'=>$page));
			$pid = post_content($sub_url,$data);
			$defi = new deficiency;
			$defi->reviewId = $rid;
			$defi->userId = $uid;
			$defi->positionId = $pid;
			$defi->status = 100;
			$defi->content = $content;
			
			$sub_url = 'deficiency/';
			$data = json_encode($defi);
			$defiid = post_content($sub_url,$data);
		}
		
		$readingId = $_SESSION['readingId'];
		$sub_url = 'reading/'.$readingId;
		$readingRecord = get_content($sub_url);
		$readingRecord->endTime = strtotime("now");
		$sub_url = 'reading/';
		$data = json_encode($readingRecord);
		post_content($sub_url, $data);
	}
}
?>