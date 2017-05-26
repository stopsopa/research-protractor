<?php

header('Content-type: application/json; charset=utf-8');

usleep(1000000 * 0.5);

echo json_encode(array(
    'ok' => true
));