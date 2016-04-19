<?php
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
				$lastTime = $record->endTime-$record->startTime;
				if(!isset($timerec[$user]))$timerec[$user]=0;
				$timerec[$user]+=$lastTime;
			}
			$type = ("0~1Сʱ","1~2Сʱ","2��3Сʱ","3��4Сʱ","4Сʱ����");
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