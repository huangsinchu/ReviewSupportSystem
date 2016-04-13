<?php
$GLOBALS['domain']='http://192.168.1.101:8989/application/';

function get_content($sub_url){
	$json_txt = file_get_contents($GLOBALS['domain'].$sub_url);
	return json_decode($json_txt);
}

function post_content($sub_url,$data){
	$ch = curl_init();  
	curl_setopt($ch, CURLOPT_POST, 1);  
	curl_setopt($ch, CURLOPT_URL, $GLOBALS['domain'].$sub_url);  
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data_string);  
	curl_setopt($ch, CURLOPT_HTTPHEADER, array(  
		'Content-Type: application/json; charset=utf-8',  
		'Content-Length: ' . strlen($data_string))  
	);  
	ob_start();  
	curl_exec($ch);  
	$return_content = ob_get_contents();  
	ob_end_clean();
	return json_decode($return_content);
	#$return_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);  
	#return array($return_code, $return_content);  
}
?>	