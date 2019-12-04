<?php

$json = file_get_contents('../goods.json');
$json = json_decode($json, true);

$message = '';
$message .= '<h1>Order in shop</h1>';
$message .= '<p>Phone: '.$_POST['ephone'].'</p>';
$message .= '<p>Email: '.$_POST['email']. '</p>';
$message .= '<p>Customer: '.$_POST['ename']. '</p>';

$cart = $_POST['cart'];
$sum = 0;

foreach ($cart as $id=>$count) {
    $message .= $json[$id]['name']. ' --- ';
    $message .= $count. ' --- ';
    $message .= $count*$json[id]['cost'];
    $message .= '<br>';
    $sum = $sum + $count*$json[id]['cost'];
}

$message .='Sum: ' .$sum;
//print_r($message);

$to = 'i.kazmin5@gmail.com'. ',';
$to .=$_POST['email'];
$spectext = '<!DOCTYPE html><html><head>
<title>Order<title></head><body>';
$headers = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$m($to, 'Order', $spectext.$message.'</body></html>', $headers);

if($m) {echo 1;} else {echo 0;}


?>