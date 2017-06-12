<?php

$config = [
    'parameters' => [
        'protocol' => 'http',
        'host' => 'localhost',
        'port' => '1025',
        'selenium_address' => 'http://192.168.180.130:4444/wd/hub'
    ]
];

echo json_encode($config, JSON_PRETTY_PRINT);