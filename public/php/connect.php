<?php
$GLOBALS['domain']='http://172.17.182.186:8989/application/';
$GLOBALS['enablelog']=false;

function get_content($sub_url){
	$json_txt = file_get_contents($GLOBALS['domain'].$sub_url);
	if($GLOBALS['enablelog']){
		$log = date("[y-m-d H:i:s]")."GET    ".$sub_url."\n";
		error_log($log, 3, "connect.log");
	}
	return json_decode($json_txt);
}

function post_content($sub_url,$data){
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_POST, 1);  
	curl_setopt($ch, CURLOPT_URL, $GLOBALS['domain'].$sub_url);  
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);  
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
		'Content-Type: application/json; charset=utf-8',  
		'Content-Length: '.strlen($data))  
	);  
	ob_start();  
	curl_exec($ch);  
	$return_content = ob_get_contents();  
	ob_end_clean();
	
	if($GLOBALS['enablelog']){
		$log = date("[y-m-d H:i:s]")."POST   ".$sub_url." ".$data."\n";
		error_log($log, 3, "connect.log");
	}	
	
	return $return_content;
	#return json_decode($return_content);
	
	#$return_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);  
	#return array($return_code, $return_content);  
}

function delete_content($sub_url){
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE' ); 
	curl_setopt($ch, CURLOPT_URL, $GLOBALS['domain'].$sub_url);
	curl_setopt($ch, CURLOPT_HEADER, true);  
	ob_start();  
	curl_exec($ch);  
	$return_content = ob_get_contents();  
	ob_end_clean();
	
	if($GLOBALS['enablelog']){
		$log = date("[y-m-d H:i:s]")."DELETE ".$sub_url."\n";
		error_log($log, 3, "connect.log");
	}
	
	return $return_content;
}
?>	