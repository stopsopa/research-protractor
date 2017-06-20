<?php
// example config to present what's necessary to make this config work properly
$config = [
    'parameters' => [
        'protocol' => 'http',
        'host' => 'hub.vagrant8',
        'port' => '80',
        'selenium_address'          => 'http://123.123.123.123:4444/wd/hub',
        'selenium_address_local'    => 'http://localhost:4444/wd/hub'
    ]
];
echo json_encode($config, JSON_PRETTY_PRINT);