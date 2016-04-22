<?php
class defi_review{
	public $id;
	public $page;
	public $row;
	public $content;
}

class defi_merge{
	public $id;
	public $page;
	public $row;
    public $reviewer;
	public $state;
	public $content;
	public $children;
}

function compare($a,$b){
	if($a->page==$b->page){
		return $a->row<$b->row;
	}else{
		return $a->page<$b->page;
	}
}

function fastsort($left,$right,&$list){
	$judge = $list[$right];
	$i=$left;
	$j=$right-1;
	while($i<=$j){
		if(compare($list[$i],$judge)){
			if(compare($list[$j],$judge)){
				$i+=1;
			}else{
				$i+=1;
				$j-=1;
			}
		}else{
			if(compare($list[$j],$judge)){
				$tmp = $list[$i];
				$list[$i] = $list[$j];
				$list[$j] = $tmp;
				$i+=1;
				$j-=1;
			}else{
				$j-=1;
			}
		}
	}
	$list[$right] = $list[$i];
	$list[$i] = $judge;
	if($left<$i-1)fastsort($left,$i-1,$list);
	if($i+1<$right)fastsort($i+1,$right,$list);
}

function sortdefi(&$list){
	$n = sizeof($list);
	fastsort(0,$n-1,$list);
}

session_start();
if(!isset($_SESSION['uid'])||!isset($_GET['id'])||!isset($_GET['type'])){
	header('HTTP/1.1 503 Service Unavailable');
	header('Status: 503 Service Unavailable');
}else{
	$type = $_GET['type'];
	$rid = $_GET['id'];
	$uid = $_SESSION['uid'];
	require 'connect.php';
	if($type=='review'){
		if(!isset($_SESSION['rid'])){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}elseif($rid!=$_SESSION['rid']){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			$sub_url = 'review/'.$rid;
			$review = get_content($sub_url);
			if($review->status!=100){
				header('HTTP/1.1 503 Service Unavailable');
				header('Status: 503 Service Unavailable');
			}else{
				$rtype = $review->type;
				
				$sub_url = 'deficiency?uid='.$uid."&rid=".$rid;
				$defilist = get_content($sub_url);
				$arr = array();
				foreach($defilist as $defi){
					$d = new defi_review();
					$d->id = $defi->id;
					
					$positionId = $defi->positionId;
					if($rtype==100){
						$sub_url = 'position/doc/'.$positionId;
						$position = get_content($sub_url);
						$d->page = $position->page;
						$d->row = $position->line;
					}elseif($rtype==200){
						$sub_url = 'position/code/'.$positionId;
						$position = get_content($sub_url);
						$d->page = $position->fileName;
						$d->row = $position->line;
					}
					
					$d->content = $defi->content;
					$arr[] = $d;
				}
				sortdefi($arr);
				echo json_encode($arr);
			}
		}
	}elseif($type=='merge'){
		$sub_url = 'review/'.$rid;
		$review = get_content($sub_url);
		if($review->userId!=$uid){
			header('HTTP/1.1 503 Service Unavailable');
			header('Status: 503 Service Unavailable');
		}else{
			$rtype = $review->type;
			
			$sub_url = 'deficiency?rid='.$rid;
			$defilist = get_content($sub_url);
			$arr = array();
			foreach($defilist as $defi){
				$d = new defi_merge;
				$d->id = $defi->id;
				
				$positionId = $defi->positionId;
				if($rtype==100){
					$sub_url = 'position/doc/'.$positionId;
					$position = get_content($sub_url);
					$d->page = $position->page;
					$d->row = $position->line;
				}elseif($rtype==200){
					$sub_url = 'position/code/'.$positionId;
					$position = get_content($sub_url);
					$d->page = $position->fileName;
					$d->row = $position->line;
				}
				
				$sub_url = 'user/'.$defi->userId;
				$usr = get_content($sub_url);
				$d->reviewer = $usr->name;
				
				$status = $defi->status;
				if($status==100){
					$d->state = '评审';
				}elseif($status==200){
					$d->state = '合并';
					$sub_url = 'deficiency/combine/'.$defi->id;
					$childlist = get_content($sub_url);
					$child = array();
					foreach($childlist as $c){
						$child[] = $c->combinedId;
					}
					$d->children = $child;
				}elseif($status==300){
					$d->state = '被否决';
				}elseif($status==400){
					$d->state = '被合并';
				}else{
				}
				
				$d->content = $defi->content;
				$arr[] = $d;
			}
			
			sortdefi($arr);
			echo json_encode($arr);
		}
	}
}
?>