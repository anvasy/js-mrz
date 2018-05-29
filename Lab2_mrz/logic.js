var A = [];
var B = [];
var G = [];
var H = [];
var D = [];
var C = [];
var p = 0;
var m = 0;
var q = 0
var n = 0;
var sumTime = 0;
var compositionTime = 0;
var comparisonTime = 0;
var tableGenerated = 0;
var compositionAmount = 0;
var sumAmount = 0;
var comparisonAmount = 0;
var T1 = 0;
var Tn = 0;

//created by: Vasilyeva

function letItGo() {
    p = document.getElementById('pNum').value;
    m = document.getElementById('mNum').value;
    q = document.getElementById('qNum').value;
    n = document.getElementById('nNum').value;
    
    sumTime = document.getElementById('sumTime').value;
    compositionTime = document.getElementById('compositTime').value;
    comparisonTime = document.getElementById('compareTime').value;

    T1 = 0;
    Tn = 0;

    if (rightInput() == 0)
        return;
        
    generateData();

    dMatrix();
    cMatrix();

    if (tableGenerated == 1) {
        var table = document.getElementById('mainTable');

        document.body.removeChild(table);
        tableGenerated = 0;

        var table = document.createElement("table");
        table.id = 'mainTable';
        table.border = '1';
        document.body.appendChild(table);
    }

    generateTable();
}

function generateData() {
    for (var i = 0; i < p; i++) {
        A[i] = new Array();
        for (var j = 0; j < m; j++) {
            A[i][j] = (2 * Math.random() - 1).toFixed(6);
        }
    }

    for (var i = 0; i < m; i++) {
        B[i] = new Array();
        for (var j = 0; j < q; j++) {
            B[i][j] = (2 * Math.random() - 1).toFixed(6);
        }
    }

    for (var i = 0; i < m; i++) {
        G[i] = new Array();
        for (var j = 0; j < p; j++) {
            G[i][j] = (2 * Math.random() - 1).toFixed(6);
        }
    }
    
    for (var i = 0; i < q; i++) {
        H[i] = new Array();
        for (var j = 0; j < m; j++) {
            H[i][j] = (2 * Math.random() - 1).toFixed(6);
        }
    }
}

function rightInput() {
    if (p == "" || m == "" || q == "" || n == "" || sumTime == "" || comparisonTime == "" || compositionTime == "") {
        alert('Заоплните все поля.');
        return 0;
    }

   if (!p.match(/^\d+$/) || !m.match(/^\d+$/) || !q.match(/^\d+$/) || !n.match(/^\d+$/) || !sumTime.match(/^\d+$/) || !comparisonTime.match(/^\d+$/) 
   || !compositionTime.match(/^\d+$/) || /^0/.test(p) || /^0/.test(m) || /^0/.test(q) || /^0/.test(n) || /^0/.test(compositionTime) 
   || /^0/.test(compositionTime) || /^0/.test(sumTime)) {
        alert("Неверные значения.");
        return 0;
    }

    sumTime = parseInt(sumTime);
    comparisonTime = parseInt(comparisonTime);
    compositionTime = parseInt(compositionTime);

    return 1;
}

function dMatrix() {
    for(var i = 0; i < p; i++) {
        D[i] = new Array(); 
        for (var j = 0; j < q; j++) {
            D[i][j] = new Array();
            for (var k = 0; k < m; k++) {
                D[i][j][k] =(A[i][k] * B[k][j]).toFixed(6);
            }
        }
    }
}

function cMatrix() {
    for(var i = 0; i < p; i++) {
        C[i] = new Array(); 
        for (var j = 0; j < q; j++) {
            C[i][j] = findCij(i, j);
        }
    }
}

function findCij(i, j) {
    compositionAmount = 0;
    sumAmount = 0;
    comparisonAmount = 0;

    var Cij = 0;
    if(compare(i, j) == 1) {
        Cij = compositionDkij(i, j);
    } else {
        Cij = sumDkij(i, j);
    }

    Tn += Math.ceil(compositionAmount/ n) * compositionTime;
    Tn += Math.ceil(sumAmount/ n) * sumTime;
    Tn += Math.ceil(comparisonAmount / n) * comparisonTime;

    return Cij;
}

function compare(i, j) {
    for(var x = 0; x < m; x++) {
        if(G[x][i] < H[j][x]) {
            T1 += comparisonTime;
            comparisonAmount++;
            return 1;
        }
    }
    return 0;
}

function sumDkij(i, j) {
    var sum = 0;
    for(var k = 0; k < m; k++) {
        sum +=  parseFloat(D[i][j][k]);

        sumAmount++;
        T1 += sumTime;  
    }  
    return sum.toFixed(6);
} 

function compositionDkij(i, j) {
    var composition = 1;
    for(var k = 0; k < m; k++) {
        composition = composition * D[i][j][k];

        compositionAmount++;
        T1 += compositionTime;
    }
    return composition.toFixed(6);
}


function generateTable() {

    tableGenerated = 1;

    var table = document.getElementById('mainTable');
    var tableRow = document.createElement('tr');

    var matrix;
    var matrixRow;
    var matrixCell;
    var matrixTitle;

    var tableCell = document.createElement('td');
    matrix = document.createElement('table');
    matrixTitle = document.createElement('caption');
    matrixTitle.innerHTML = "A:";
    matrix.appendChild(matrixTitle);

    for (var i = 0; i < p; i++) {
        matrixRow = document.createElement('tr');
        for (var j = 0; j < m; j++) {
            matrixCell = document.createElement('td');
            matrixCell.innerHTML = A[i][j];
            matrixRow.appendChild(matrixCell);
        }
        matrix.appendChild(matrixRow);
    }

    tableCell.appendChild(matrix);
    tableRow.appendChild(tableCell);

    tableCell = document.createElement('td');
    matrix = document.createElement('table');
    matrixTitle = document.createElement('caption');
    matrixTitle.innerHTML = "B:";
    matrix.appendChild(matrixTitle);

    for (var i = 0; i < m; i++) {
        matrixRow = document.createElement('tr');
        for (var j = 0; j < q; j++) {
            matrixCell = document.createElement('td');
            matrixCell.innerHTML = B[i][j];
            matrixRow.appendChild(matrixCell);
        }
        matrix.appendChild(matrixRow);
    }
    tableCell.appendChild(matrix);
    tableRow.appendChild(tableCell);
    table.appendChild(tableRow);

    tableRow = document.createElement('tr');

    tableCell = document.createElement('td');
    matrix = document.createElement('table');
    matrixTitle = document.createElement('caption');
    matrixTitle.innerHTML = "G:";
    matrix.appendChild(matrixTitle);

    for (var i = 0; i < m; i++) {
        matrixRow = document.createElement('tr');
        for (var j = 0; j < p; j++) {
            matrixCell = document.createElement('td');
            matrixCell.innerHTML = G[i][j];
            matrixRow.appendChild(matrixCell);
        }
        matrix.appendChild(matrixRow);
    }

    tableCell.appendChild(matrix);
    tableRow.appendChild(tableCell);

    tableCell = document.createElement('td');
    matrix = document.createElement('table');
    matrixTitle = document.createElement('caption');
    matrixTitle.innerHTML = "H:";
    matrix.appendChild(matrixTitle);

    for (var i = 0; i < q; i++) {
        matrixRow = document.createElement('tr');
        for (var j = 0; j < m; j++) {
            matrixCell = document.createElement('td');
            matrixCell.innerHTML = H[i][j];
            matrixRow.appendChild(matrixCell);
        }
        matrix.appendChild(matrixRow);
    }
    tableCell.appendChild(matrix);
    tableRow.appendChild(tableCell);
    table.appendChild(tableRow);

    tableRow = document.createElement('tr');

    tableCell = document.createElement('td');
        matrix = document.createElement('table');
        matrixTitle = document.createElement('caption');
        matrixTitle.innerHTML = "C:";
        matrix.appendChild(matrixTitle);

        for (var i = 0; i < p; i++) {
            matrixRow = document.createElement('tr');
            for (var j = 0; j < q; j++) {
                matrixCell = document.createElement('td');
                matrixCell.innerHTML = C[i][j];
                matrixRow.appendChild(matrixCell);
            }
            matrix.appendChild(matrixRow);
        }
        tableCell.appendChild(matrix);
        tableRow.appendChild(tableCell);

        tableCell = document.createElement('td');
        tableCell.innerHTML = "Tn: " + Tn + "<br>"
            + "T1: " + T1;
        tableRow.appendChild(tableCell);
        table.appendChild(tableRow);

        document.body.appendChild(table);
}
