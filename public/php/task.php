<?php
class review{
	public $id;
	public $title;
	public $url;
	public $type;
	public $state;
	public $content;
}

session_start();
if(!isset($_SESSION['uid'])){
	header('HTTP/1.1 403 Forbidden'); 
}else{
	require 'connect.php';
	
	$sub_url = 'invatation?uid='.$_SESSION['uid'];
	$list = get_content($sub_url);
	$arr = array();
	foreach($list as $m){
		$sub_url = 'review/'.$m->reviewId;
		$r = get_content($sub_url);
		$re = new review;
		$re->id = $r->id;
		$re->title = $r->title;
		$re->url = $r->address;
		if($r->type==100){
			$re->type = "文档评审";
		}else{
			$re->type = "代码评审";
		}
		$re->state = ($r->status==100);
		$re->content = $r->description;
		$arr[] = $re;
	}
	$json_text = json_encode($arr);
	echo $json_text;
}
?>