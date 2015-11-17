<?php
	header('Content-type:text/html; charset="utf-8"');

/*
API:
	book.php

		参数
		p : 关键词
*/
$p = isset($_GET['p']) ? $_GET['p'] : '历史';
$cb = $_GET['callback'];
$url = 'http://api.douban.com/book/subjects?q='.$p.'&alt=json&callback='.$cb;
$content = file_get_contents($url);
$content = iconv('gbk', 'utf-8', $content);
echo $cb."($content)";


?>