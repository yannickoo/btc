<?php

$url = 'https://blockchain.info/ticker';
$content = file_get_contents($url);

if ($content) {
  $json = json_decode($content, TRUE);

  $rate = $json['EUR']['last'];
}

?>
<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimal-ui, user-scalable=no">
    <title>1 BTC in €</title>
    <link rel="stylesheet" href="http://cdn.yannick.md/css/vertical-aligned.css">
    <style>
      body { font-family: sans-serif; }
      h1 { font-size: 4em; }
      h1:after { content: '€'; color: #ccc; padding-left: 0.2em; }
    </style>
  </head>
  <body>
    <h1><?php print $rate; ?></h1>
  </body>
</html>

