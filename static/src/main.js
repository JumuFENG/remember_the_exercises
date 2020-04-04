function resize_iframe() {
    var frm = document.getElementById('cpp_iframe');
    frm.height = 100;
    frm.height = frm.contentDocument.documentElement.clientHeight
}

window.addEventListener('message', function(e){
    if (e.data.message == 'resize') {
        resize_iframe();
    };
});

// window.onresize = function(e) {
//     resize_iframe();
// }

class CaseUtils {
    createColsRow(...c){
        var row = document.createElement("tr");
        for (var i = 0; i < c.length; i++) {
            var col = document.createElement("td");
            if ('object' != typeof(c[i]) || !c[i]) {
                col.appendChild(document.createTextNode(c[i]));
            } else {
                col.appendChild(c[i]);
            }
            row.appendChild(col);
        };
        return row;
    }

    createLinkBtn(text, href) {
        var l = document.createElement('a');
        l.textContent = text;
        l.href = href;
        return l;
    }
}

var utils = new CaseUtils();
var caseNames = [
    'OddOccurrencesInArray',
    'PermMissingElem',
    'CyclicRotation',
    'TapeEquilibrium',
    'PermCheck',
    'FrogRiverOne',
    'MaxCounters',
    'MissingInteger',
    'PassingCars',
    'GenomicRangeQuery',
    'MinAvgTwoSlice',
    'CountDiv',
    'MaxProductOfThree',
    'Distinct',
    'Triangle',
    'NumberOfDiscIntersections',
    'Brackets',
    'Fish',
    'Nesting',
    'StoneWall',
    'Dominator',
    'EquiLeader',
    'MaxProfit',
    'MaxSliceSum',
    'MaxDoubleSliceSum',
    'CountFactors',
    'MinPerimeterRectangle',
    'Peaks',
    'Flags'
];

class CaseCollection {
    constructor() {
        this.root = null;
    }

    initialize() {
        this.root = document.getElementById('header_container');
        this.footer = document.getElementById('footer_container');
        this.ifrm = document.getElementById('cpp_iframe');

        this.createCodilityContentTable();
        this.pagerDivUp = this.createPager();
        this.root.appendChild(this.pagerDivUp);
        this.pagerDivDown = this.createPager();
        this.footer.appendChild(this.pagerDivDown);
    }

    createCodilityContentTable() {
        var cod = document.createElement('p');
        cod.appendChild(document.createTextNode('Codility Cases'));
        this.root.appendChild(cod);

        this.contentTableDiv = document.createElement('div');
        this.root.appendChild(this.contentTableDiv);
        this.caseTable = document.createElement('ul');
        for (var i = 0; i < caseNames.length; i++) {
            var cellink = utils.createLinkBtn(caseNames[i], 'javascript:rootContainer.selectCase("' + caseNames[i] + '")');
            var li = document.createElement('li');
            li.appendChild(cellink);
            this.caseTable.appendChild(li);
        };
        this.contentTableDiv.appendChild(this.caseTable);
    }

    createPager() {
        var pagerDiv = document.createElement('div');
        pagerDiv.className = 'pager';
        var preLink = utils.createLinkBtn('上一个', 'javascript:rootContainer.selectPrevious()');
        pagerDiv.appendChild(preLink);
        var backLink = utils.createLinkBtn('回目录', 'javascript:rootContainer.backToContent()');
        pagerDiv.appendChild(backLink);
        var nextLink = utils.createLinkBtn('下一个', 'javascript:rootContainer.selectNext()');
        pagerDiv.appendChild(nextLink);
        pagerDiv.style.display = 'none';
        return pagerDiv;
    }

    selectCase(name) {
        this.curCase = name;
        this.ifrm.src = 'codility/'+name+'.cpp.html';
        this.contentTableDiv.style.display = 'none';
        this.pagerDivUp.style.display = 'block';
        this.pagerDivDown.style.display = 'block';
    }

    selectNext() {
        var curIdx = caseNames.indexOf(this.curCase);
        if (curIdx >= caseNames.length - 1) {
            return;
        };
        this.selectCase(caseNames[curIdx + 1]);
    }

    selectPrevious() {
        var curIdx = caseNames.indexOf(this.curCase);
        if (curIdx <= 0) {
            return;
        };
        this.selectCase(caseNames[curIdx - 1]);
    }

    backToContent() {
        this.ifrm.src = '';
        this.contentTableDiv.style.display = 'block';
        this.pagerDivUp.style.display = 'none';
        this.pagerDivDown.style.display = 'none';
    }
}

var rootContainer = new CaseCollection();

window.onload = function() {
    rootContainer.initialize();
}
