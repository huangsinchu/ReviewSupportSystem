<?php
session_start();
if(isset($_SESSION['uid'])){
	require 'connect.php';
	$defiid = $_POST['id'];
	$content = $_POST['content'];
	$sub_url = 'deficiency/'.$defiid;
	$defi = get_content($sub_url);
	if($defi->userId==$_SESSION['uid']){
		$sub_url = 'review/'.$defi->reviewId;
		$review = get_content($sub_url);
		if($review->status!=100){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			$defi->content = $content;
			$sub_url = 'deficiency/';
			$data = json_encode($defi);
			post_content($sub_url,$data);
			
			$readingId = $_SESSION['readingId'];
			$sub_url = 'reading/'.$readingId;
			$readingRecord = get_content($sub_url);
			$readingRecord->endTime = strtotime("now");
			$sub_url = 'reading/';
			$data = json_encode($readingRecord);
			post_content($sub_url, $data);
		}
	}
}
?>