class Linker {
    constructor(args, defaultDatabase) {
        switch (args.length) {
            case 1: {
                this.function = destCol;
                this.type = 0;
                break;
            }
            case 2: {
                this.destCol = destCol;
                this.destTable = destTable;
                this.database = database;
                this.type = 1;
                break;
            }
            case 3: {
                this.destCol = destCol;
                this.destTable = destTable;
                this.database = defaultDatabase;
                this.type = 1;
                break;
            }
        }
    }
}


class TechAds {
    shouldReplace = false;
    cols = [];
    headers = [];
    currentDatabase;
    tableTrs = [];
    currentTable = [];
    jsonData;
    scriptDeployed = false;
    queryParameters = {};

    calcArea() {
        return this.height * this.width;
    }

    composeLink(jsonData, force = false) {

        location.search.substr(1).split("&").forEach(item => {
            item = item.split("=");
            this.queryParameters[item[0]] = item[1];
        });
        this.queryParameters.server = this.queryParameters.server || '127.0.0.1';

        this.jsonData = jsonData;
        if (this.headers.length == 0) {
            var cols = $('#table thead tr th a span');
            for (let i = 0; i < cols.length; i++) {
                //firs col is a TD for the check box
                this.headers[cols[i].innerHTML] = i + 1;
            }
        }
        if (!NodeList.prototype.isPrototypeOf(this.tableTrs) || force) {
            this.tableTrs = $('#table tbody tr');
        } else {
            return;
        }

        this.currentDatabase = document.querySelector("input[name='db']").value;
        this.currentTable = document.querySelector("input[name='select']").value;

        if (!isEmpty(jsonData)) {
            //do we have some rewrite for the current DB ?
            if (!this.jsonData[this.currentDatabase]) {
                return;
            }
            var dbRewrite = this.jsonData[this.currentDatabase];

            //do we have some rewrite for the current Table
            if (!dbRewrite[this.currentTable]) {
                return;
            }
            var tableRewrite = dbRewrite[this.currentTable];

            // set index foreach column name, if exists
            for (var colName in tableRewrite) {
                let operation = tableRewrite[colName];
                var index = this.headers[colName];

                let unionScripts = [];

                for (let i = 0; i < this.tableTrs.length; i++) {
                    let thisTr = this.tableTrs[i];
                    let thisTd = thisTr.cells[index];
                    let dbToUse = this.currentDatabase;

                    switch (operation.length) {
                        case 1: {
                            //still better than eval
                            let rewrite = window[operation[0]](thisTd);
                            thisTd.innerHTML = rewrite;
                            ;
                            break;
                        }
                        case 3:
                            //override db
                            dbToUse = operation[2];
                        case 2: {
                            let thisUrl = location.pathname +
                                '?server=' + this.queryParameters.server +
                                '&username=' + this.queryParameters.username +
                                '&db=' + dbToUse +
                                '&select=' + operation[1] +
                                '&where[0][col]=' + operation[0] +
                                '&where[0][op]=%3D' +
                                '&where[0][val]=' + thisTd.innerText;
                            thisTd.innerHTML = '<a href="' + thisUrl + '">' + thisTd.innerText + ' ' + operation[1] + '</a>';
                            break;
                        }
                    }
                }
            }
        }
    }
}

const fetchData = () => fetch("./techAdsLinker/link.json").then(res => res.json()).then(res => {
    //register as a global too!
    techAds = new TechAds();
    techAds.composeLink(res);
});

$(document).ready(function () {
    fetchData();
});

//Just an helper function
function isEmpty(obj) {
    for (var x in obj) {
        return false;
    }
    return true;
}

function stdLinker(text, table, col, id) {

    let a = location.pathname +
        '?server=' + techAds.queryParameters.server +
        '&username=' + techAds.queryParameters.username +
        '&db=' + techAds.currentDatabase +
        '&select=' + table +
        '&where[0][col]=' + col +
        '&where[0][op]=%3D' +
        '&where[0][val]=' + id;

    let link = '<a href="' + a + '">' + text + '</a>';
    return link;
}