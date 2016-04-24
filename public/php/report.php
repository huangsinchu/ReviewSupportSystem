<?php
class report{
	public $type;
	public $count;
}

session_start();
if(!isset($_SESSION['uid'])||!isset($_GET['id'])||!isset($_GET['type'])){
	header('HTTP/1.1 403 Forbidden'); 
}else{
	$reviewid = $_GET['id'];
	$type = $_GET['type'];
	
	require 'connect.php';
	$sub_url = 'review/'.$reviewid;
	$review = get_content($sub_url);
	if($review->userId!=$_SESSION['uid']||$review->status!=200){
		header('HTTP/1.1 403 Forbidden'); 
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
			
			$name = array();
			$count = array();
			foreach($timerec as $rec=>$rec_value){
				$sub_url = 'user/'.$rec;
				$usr = get_content($sub_url);
				$name[] = $usr->name;
				$count[] = round($rec_value/3600,2);
			}
			
			$json_text = json_encode(array('name'=>$name, 'count'=>$count));
			echo $json_text;
		}elseif($type=='defiDistribution'){
			$sub_url = 'deficiency?rid='.$reviewid;
			$defilist = get_content($sub_url);
			$defirec = array();
			foreach($defilist as $defi){
				$user = $defi->userId;
				if(($defi->status==100)||($defi->status==400)){
					if(!isset($defirec[$user]))$defirec[$user]=0;
					$defirec[$user]+=1;
				}
			}
			
			$name = array();
			$count = array();
			foreach($defirec as $rec=>$rec_value){
				$sub_url = 'user/'.$rec;
				$usr = get_content($sub_url);
				$name[] = $usr->name;
				$count[] = $rec_value;
			}
			
			$json_text = json_encode(array('name'=>$name, 'count'=>$count));
			echo $json_text;
		}
	}
}
?>