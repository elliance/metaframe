<?php

if (count($_POST) > 0) {
    $data_arr = array();
    $data_arr[] = '"'.strip_tags($_POST['comment']).'"';
    $data_arr[] = '"'.strip_tags($_POST['user']).'"';
    $data_arr[] = '"'.strip_tags($_POST['timestamp']).'"';
    $data_arr[] = '"'.strip_tags($_POST['page']).'"';
    $data_str = implode(',', $data_arr)."\n";

    $fp = fopen(dirname(__FILE__).'/'.strip_tags($_POST['csv_filename']), 'a');
    fputs($fp, $data_str); 
    fclose($fp);
    echo "wrote to ".$_POST['csv_filename'];
}
else {
    echo "this page only accepts submits, please!";
}

?>
