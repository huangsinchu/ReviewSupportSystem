<?php
class review{
	public $id;
	public $title;
	public $url;
	public $type;
	public $state;
	#public $target;
	public $content;
}

session_start();
if(!isset($_SESSION['uid'])||!isset($_GET['id'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	require 'connect.php';
	
	$sub_url = 'review/'.$rid;
	$review = get_content($sub_url);
	$re = new review;
	$re->id = $review->id;
	$re->title = $review->title;
	$re->url = $review->address;
	$_SESSION['rtype'] = $review->type;
	if($review->type==100){
		$re->type = "文档评审";
	}else{
		$re->type = "代码评审";
	}
	$re->state = ($review->status==100);
	$re->content = $review->description;
	$json_text = json_encode($re);
	
	if($_SESSION['uid']==$review->userId){
		echo $json_text;
	}else{
		$sub_url = 'invatation?uid='.$_SESSION['uid'];
		$list = get_content($sub_url);
		$rid = $_GET['id'];
		$found = false;
		foreach($list as $i){
			if($i->reviewId==$rid){
				$found = true;
				break;
			}
		}
		if(!$found){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			$_SESSION['rid'] = $rid;
			
			$startTime = strtotime("now");
			$endTime = strtotime("+1 minute");
			$uid = $_SESSION['uid'];
			$sub_url = 'reading/';
			$data = json_encode(array('reviewId'=>$rid, 'userId'=>$uid, 'startTime'=>$startTime, 'endTime'=>$endTime));
			$readingid = post_content($sub_url, $data);
			$_SESSION['readingId'] = $readingid;
			
			echo $json_text;
		}
	}
	
	
}
?>