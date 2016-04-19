<?php
class deficiency{
	public $reviewId;
	public $userId;
	public $positionId;
	public $status;
	public $content;
}

session_start();
if(isset($_SESSION['uid'])&&isset($_SESSION['rid'])&&isset($_SESSION['rtype'])){
	$uid = $_SESSION['uid'];
	$rid = $_SESSION['rid'];
	require 'connect.php';
	if($_SESSION['rtype']==100){
		$page = $_POST['page'];
		$row = $_POST['row'];
		$content = $_POST['content'];
		$writer = $_POST['writer'];
		$task = $_POST['task'];
		if(($writer==$uid)&&($task==$rid)){
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
		}
	}elseif($_SESSION['rtype']==200){
		$filename = $_POST['page'];
		$row = $_POST['row'];
		$content = $_POST['content'];
		$writer = $_POST['writer'];
		$task = $_POST['task'];
		if(($writer==$uid)&&($task==$rid)){
			$sub_url = 'position/code/';
			$data = json_encode(array('line'=>$row, 'fileName'=>$filename));
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
	}
	
	$readingId = $_SESSION['readingId'];
	$sub_url = 'reading/'.$readingId;
	$readingRecord = get_content($sub_url);
	$readingRecord->endTime = strtotime("now");
	$sub_url = 'reading/';
	$data = json_encode($readingRecord);
	post_content($sub_url, $data);
	
}
?>