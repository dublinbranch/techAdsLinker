/**
 *  CUSTOM FUNCTIONS
 *  CALLBACKS DECLARED IN myplugin.json
 */

function kwDualLink(td) {
    let link = td.innerText + ' ' +
        stdLinker("kw", "keyword", "id", td.innerText) +
        ' / ' +
        stdLinker("url", "url", "keywordId", td.innerText)
    ;
    return link;
}

function rawHTMLLinker(td) {
    /*
        $folder = SAVE_RAW_HTML_FOLDER;
    @mkdir($folder);

    $hex = sha1($fileName);
    $inner = "";
    $inner[0] = $hex[0];
    $inner[1] = $hex[1];

    @mkdir($folder . "/$inner");
    $inner[2] = "/";
    $inner[3] = $hex[2];
    $inner[4] = $hex[3];

    @mkdir($folder . "/$inner");

    return $folder . "/$inner";
     */
    const t1 = td.innerText.split(",");
    const id = t1[0];
    const sha = t1[1];

    let path = "";
    path += sha[0];
    path += sha[1];
    path += '/';
    path += sha[2];
    path += sha[3];
    path += '/';

    let link = '<a href="/html/' + path + id +'.html.gz">rawHtml</a>';
    return link;
}

