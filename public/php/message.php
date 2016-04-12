<?php
class message{
	public $id;
	public $hint;
}

session_start();

$uid = $_SESSION['uid'];
require 'connect.php';
$sub_url = 'invatation?uid='.$uid;
$list = get_content($sub_url);
$arr = array();
foreach($list as $m){
	if($m->read==false){
		$me = new message;
		$me->id = $m->reviewId;
		$sub_url = '/user/'.$m->userId;
		$user = get_content($sub_url);
		$name = $user->name;
		$sub_url = '/review/'.$m->reviewId;
		$review = get_content($sub_url);
		$title = $review->title;
		$me->hint = $name."邀请你评审".$title;
		$arr[] = $me;
	}
}
$json_text = json_encode($arr);
echo $json_text;
?>