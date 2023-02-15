<?php
try {
    
    switch($_POST['data']['acao']) {

        case 'buscar-dados':
            $id = $_POST['data']['id'] ;
            $handle = curl_init("http://localhost:8080/query/{$id}");
            curl_setopt($handle, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($handle);
            curl_close($handle);
            $response = str_replace('{"search":{"edges":[',"",$response);
            $array = explode("},",$response);
            echo "<pre><div><h1>Resultado:</h1><a href='index.php'>Voltar</a></div><hr>";
            print_r($array);
            break;
        default:
            echo 'Erro';
        break;
    }

} catch (Exception $e) {
    echo '<pre>';
    print_r($e);
    die;
}
?>