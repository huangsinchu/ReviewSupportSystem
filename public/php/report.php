<?php
class report{
	public $type;
	public $count;
}

session_start();
if(!isset($_SESSION['uid'])||!isset($_GET['id'])||!isset($_GET['type'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	$reviewid = $_GET['id'];
	$type = $_GET['type'];
	
	require 'connect.php';
	$sub_url = 'review/'.$reviewid;
	$review = get_content($sub_url);
	if($review->userId!=$_SESSION['uid']||$review->status!=200){
		header('HTTP/1.1 503 Service Unavailable');
		header('Status: 503 Service Unavailable');
	}else{
		if($type=='analysis'){
			$sub_url = 'review/'.$reviewid.'/count';
			$analysis = get_content($sub_url);
			
			$json_text = json_encode(array(
				'people'=>$analysis->countedReviewer,
				'reviews'=>$analysis->countedDeficiency,
				'merged'=>$analysis->finalDeficiency,
				'guess'=>$analysis->predictedDeficiency
			));
			
			echo $json_text;
		}elseif($type=='time'){
			$sub_url = 'reading?reviewId='.$reviewid;
			$recordlist = get_content($sub_url);
			$timerec = array();
			foreach($recordlist as $record){
				$user = $record->userId;
				$lastTime = (int)$record->endTime-(int)$record->startTime;
				if(!isset($timerec[$user]))$timerec[$user]=0;
				$timerec[$user]+=$lastTime;
			}
			$type = array("0~1小时","1~2小时","2～3小时","3～4小时","4小时以上");
			$count = array(0,0,0,0,0);
			foreach($timerec as $rec){
				$hours = floor($rec/3600);
				if($hours<=3){
					$count[$hours]+=1;
				}else{
					$count[4]+=1;
				}
			}
			$json_text = json_encode(array('type'=>$type, 'count'=>$count));
			echo $json_text;
		}
	}
}
?>