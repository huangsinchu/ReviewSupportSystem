<?php
session_start();
function checkowner($reviewId){
	$sub_url = 'review/'.$reviewId;
	$review = get_content($sub_url);
	return $_SESSION['uid']==$review->userId;
}

if(!isset($_SESSION['uid'])||!isset($_POST['action'])){
	header('HTTP/1.1 403 Forbidden'); 
}else{
	require 'connect.php';
	$action = $_POST['action'];
	if($action=='edit'){
		$defiId = $_POST['defiId'];
		$content = $_POST['content'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		$reviewId = $defi->reviewId;
		if(!checkowner($reviewId)){
			header('HTTP/1.1 403 Forbidden'); 
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
		if(!checkowner($reviewId)){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			if($defi->status==100){
				$defi->status = 300;
				$sub_url = 'deficiency';
				$data = json_encode($defi);
				post_content($sub_url,$data);
			}else{
				header('HTTP/1.1 403 Forbidden'); 
			}
		}
	}elseif($action=='undeny'){
		$defiId = $_POST['defiId'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		$reviewId = $defi->reviewId;
		if(!checkowner($reviewId)){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			if($defi->status==300){
				$defi->status = 100;
				$sub_url = 'deficiency';
				$data = json_encode($defi);
				post_content($sub_url,$data);
			}else{
				header('HTTP/1.1 403 Forbidden'); 
			}
		}
	}elseif($action=='merge'){
		$page = $_POST['page'];
		$line = $_POST['row'];
		$content = $_POST['content'];
		$children = $_POST['children'];
		$reviewId = 0;
		foreach($children as $child){
			$sub_url = 'deficiency/'.$child;
			$defi = get_content($sub_url);
			if($reviewId==0){
				$reviewId = $defi->reviewId;
			}elseif($reviewId!=$defi->reviewId){
				return;
			}
		}
		$sub_url = 'review/'.$reviewId;
		$review = get_content($sub_url);
		
		if($_SESSION['uid']!=$review->userId){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			$sub_url = '';
			if($review->type==100){
				$sub_url = 'position/doc/';
				$data = json_encode(array('page'=>$page, 'line'=>$line));
			}elseif($review->type==200){
				$sub_url = 'position/code/';
				$data = json_encode(array('fileName'=>$page, 'line'=>$line));
			}
			$newPosiId = post_content($sub_url, $data);
			
			$sub_url = 'deficiency/';
			$data = json_encode(array(
				'reviewId'=>$reviewId, 
				'userId'=>$_SESSION['uid'], 
				'positionId'=>$newPosiId, 
				'status'=>200, 
				'content'=>$content
			));
			
			$newDefiId = post_content($sub_url,$data);
			
			foreach($children as $child){
				$sub_url = 'deficiency/'.$child;
				$defi = get_content($sub_url);
				$defi->status = 400;
				$sub_url = 'deficiency/';
				$data = json_encode($defi);
				post_content($sub_url,$data);
				
				$sub_url = 'deficiency/combine/';
				$data = json_encode(array('deficiencyId'=>$newDefiId, 'combinedId'=>$child));
				post_content($sub_url,$data);
			}
			
			echo $newDefiId;
		}
	}elseif($action=='split'){
		$defiId = $_POST['defiId'];
		
		$sub_url = 'deficiency/'.$defiId;
		$defi = get_content($sub_url);
		if(($defi->status!=200)||($defi->userId!=$_SESSION['uid'])){
			header('HTTP/1.1 403 Forbidden'); 
		}else{
			$sub_url = 'deficiency/'.$defiId;
			delete_content($sub_url);
			
			$sub_url = 'deficiency/combine/'.$defiId;
			$list = get_content($sub_url);
			foreach($list as $combine){
				$did = $combine->combinedId;
				$sub_url = 'deficiency/'.$did;
				$defi = get_content($sub_url);
				$defi->status = 100;
				$sub_url = 'deficiency/';
				$data = json_encode($defi);
				post_content($sub_url,$data);
			}
			
			$sub_url = 'deficiency/combine/'.$defiId;
			delete_content($sub_url);
		}
	}
}
?>