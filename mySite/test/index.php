<?php
header('Access-Control-Allow-Origin:*'); 
header("Content-Type: application/json; charset=UTF-8");

$url='https://api.douban.com/v2/book/search?q=python&fields=id,title';  
$data = file_get_contents($url);  
echo $data; 


//php and MS Access
// $conn = new COM("ADODB.Connection");
// $conn->open("PROVIDER=Microsoft.Jet.OLEDB.4.0;Data Source=Northwind.mdb");

// $rs = $conn->execute("SELECT CompanyName, City, Country FROM Customers");

// $outp = "";
// while (!$rs->EOF) {
//     if ($outp != "") {$outp .= ",";}
//     $outp .= '{"Name":"'  . $rs["CompanyName"] . '",';
//     $outp .= '"City":"'   . $rs["City"]        . '",';
//     $outp .= '"Country":"'. $rs["Country"]     . '"}';
//     $rs->MoveNext();
// }
// $outp ='{"records":['.$outp.']}';

// $conn->close();

// echo ($outp); 


?>
