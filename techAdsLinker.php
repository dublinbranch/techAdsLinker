<?php

class TechAdsLinker{

    function headers(){
        header("Content-Security-Policy: frame-src https://trott.pw;");
    }

    function head(){
        $nonce = nonce();
        $version = date( "Y" );
        echo <<<EOD
<script src="./jquery-3.5.0.min.js"></script>
<script src="./techAdsLinker/techAdsLinker.js?ver={$version}"{$nonce}></script>
<script src="./techAdsLinker/custom.functions.js?ver={$version}"{$nonce}></script>
EOD;
    }
}
