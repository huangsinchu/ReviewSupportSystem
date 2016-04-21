<?php
session_start();
function checkowner($reviewId){
	$sub_url = 'review/'.$reviewId;
	$review = get_content($sub_url);
	return $_SESSION['uid']==$review->userId;
}

if(!isset($_SESSION['uid'])||!isset($_POST['action'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	require 'connect.php';
	$action = $_POST['action'];
	if($action=='edit'){
		$defiId = $_POST['defiId'];
		$content = $_POST['content'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		$reviewId = $defi->reviewId;
		if($!checkowner($reviewId)){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			$defi->content = $content;
			$sub_url = 'deficiency';
			$data = json_encode($defi);
			post_content($sub_url,$data);
		}
	}elseif($action=='deny'){
		$defiId = $_POST['defiId'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		$reviewId = $defi->reviewId;
		if($!checkowner($reviewId)){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			if($defi->status==100){
				$defi->status = 300;
				$sub_url = 'deficiency';
				$data = json_encode($defi);
				post_content($sub_url,$data);
			}else{
				header('HTTP/1.1 503 Service Unavailable');
				header('Status: 503 Service Unavailable');
			}
		}
	}elseif($action=='undeny'){
		$defiId = $_POST['defiId'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		$reviewId = $defi->reviewId;
		if($!checkowner($reviewId)){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			if($defi->status==300){
				$defi->status = 100;
				$sub_url = 'deficiency';
				$data = json_encode($defi);
				post_content($sub_url,$data);
			}else{
				header('HTTP/1.1 503 Service Unavailable');
				header('Status: 503 Service Unavailable');
			}
		}
	}elseif($action=='merge'){
		
	}elseif($action=='split'){
		$defiId = $_POST['defiId'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		if(($defi->status!=200)||($defi->userId!=$_SESSION['uid'])){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			$sub_url = 'deficiency/'.$defiId;
			delete_content($sub_url);
			
			$sub_url = 'deficiency/combine/'.$defiId;
			delete_content($sub_url);
		}
	}
}
?>