<?php
function send_mail($to,$str) {
	$domain = '172.17.187.238/ReviewSupportSystem/public/php/confirmregister.php';
	$url = 'http://sendcloud.sohu.com/webapi/mail.send.json';
	$API_USER = 'review_system';
	$API_KEY = 'Orpw1oYnSZD2sfPy';

	$param = array(
		'api_user' => $API_USER, # 使用api_user和api_key进行验证
		'api_key' => $API_KEY,
		'from' => 'i@hsinchu.moe', # 发信人，用正确邮件地址替代
		'fromname' => 'Hsinchu',
		'to' => $to,# 收件人地址, 用正确邮件地址替代, 多个地址用';'分隔  
		'subject' => '激活邮箱完成注册',
		'html' => '<style type="text/css">html,
    body {
        margin: 0;
        padding: 0;
    }
</style>
<center>
<table>
	<tbody>
		<tr>
			<td>
			<table border="0" cellpadding="0" cellspacing="0" width="600px">
				<tbody>
					<tr>
						<td>
						<table style="background:url(http://7xi9bi.com1.z0.glb.clouddn.com/35069/2015/07/20/a9179f3bf9714c08b6b8e02c2296aa42.jpg) no-repeat top center;width:100%;font-size:14px;">
							<tbody>
								<tr>
									<td align="center">
									<table border="0" cellpadding="0" cellspacing="0" style="background:url(http://7xi9bi.com1.z0.glb.clouddn.com/35069/2015/07/20/e8b87c314d4c4b9d9dbbe63c6c2b0632.jpg) no-repeat center center;margin-top:53px;width:500px;height:449px;box-shadow: 3px 3px 3px #eee">
										<tbody>
											<tr>
												<td align="center" colspan="2" valign="top">
												<div style="margin-top:115px;color:#1271be;line-height:1.5;">欢迎加入我们!<br />
												为了保证您正常使用我们的功能，请激活账号。</div>

												<div style="margin-top:60px"><a href="http://'.$domain.$str.'" style="text-decoration:none;display:inline-block;color:#fff;width:144px;height:38px;line-height:38px;background:url(http://7xi9bi.com1.z0.glb.clouddn.com/35069/2015/07/20/2f7e0a9789e642eeb3ccdcfcbf759086.jpg) no-repeat center;">立即激活</a></div>
												</td>
											</tr>
											<tr>
												<td valign="bottom">
												<table border="0" cellpadding="0" cellspacing="0" style="background:url(http://7xi9bi.com1.z0.glb.clouddn.com/35069/2015/07/20/0f5667bc43d94ae49fed78ad3e412e14.png) #f5f5f5 no-repeat top right" width="214px">
													<tbody>
														<tr>
															<td align="center" height="130px" valign="middle">
															<div style="width:148px;color:#fff;font-size:12px;text-align:left;padding-left:10px;line-height:2;">如果以上按钮无法打开，<br />
															请把右侧的链接复制到浏览<br />
															器地址栏中打开：</div>
															</td>
														</tr>
													</tbody>
												</table>
												</td>
												<td valign="bottom">
												<table border="0" cellpadding="0" cellspacing="0" style="background:#f5f5f5" width="287px">
													<tbody>
														<tr>
															<td align="center" height="130px" valign="middle">
															<p style="padding: 0 20px;word-wrap:break-word;word-break:break-word;line-height:1.75">http://'.$domain.$str.'</p>
															</td>
														</tr>
													</tbody>
												</table>
												</td>
											</tr>
										</tbody>
									</table>
									</td>
								</tr>
							</tbody>
						</table>
						</td>
					</tr>
				</tbody>
			</table>
			</td>
		</tr>
	</tbody>
</table>
</center>
',
            'resp_email_id' => 'true'
        );
        

        $data = http_build_query($param);

        $options = array(
            'http' => array(
                'method' => 'POST',
                'header' => 'Content-Type: application/x-www-form-urlencoded',
                'content' => $data
        ));
        $context  = stream_context_create($options);
        $result = file_get_contents($url, FILE_TEXT, $context);

        return $result;
}
?>

