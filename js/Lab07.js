var select1;
var select2;
var div1;
var div2;
var commitBt;
var tableNameInput;
var colNumberInput;
var trInput = new Array();
var table = new Array();
var br;

window.onload = function () {
    select1 = document.getElementById("select1");
    select2 = document.getElementById("select2");
    commitBt = document.getElementById("button1");
    div1 = document.getElementById("div1");
    div2 = document.getElementById("div2");
    br = document.createElement("br");

    commitBt.style.display = "none";
};

/**
 * 判断第一个下拉框的选择
 */
function select1Change() {
    commitBt.style.display = "block";
    div1.innerHTML = "";
    /**
     * 选中第一个选项 无任何显示
     */
    if(select1.value === "0"){
        commitBt.style.display = "none";
        commitBt.innerHTML = "";
    }
    /**
     * 选中第二个选项 创建表格及表头
     */
    if(select1.value === "1"){
        commitBt.style.display = "none";
        div1.innerHTML = "";
        tableNameInput = document.createElement("input");
        colNumberInput = document.createElement("input");
        tableNameInput.type = "text";
        colNumberInput.type = "number";
        tableNameInput.placeholder = "Table Name";
        colNumberInput.placeholder = "Columns Numbers";

        div1.appendChild(tableNameInput);
        div1.appendChild(colNumberInput);
        div1.appendChild(br);

        tableNameInput.onchange = function () {
            createTable();
        };
        colNumberInput.onchange = function () {
            createTable();
        };
    }
    /**
     * 选中第三个选项 添加行
     */
    if(select1.value === "2"){
        if(select2.selectedIndex === 0){
            commitBt.style.display = "none";
            return;
        }
        var number = select2.selectedIndex - 1;
        for(var i = 0; i <table[number].rows[0].cells.length; i++){
            trInput[i] = document.createElement("input");
            trInput[i].type = "text";
            trInput[i].placeholder = table[number].rows[0].cells[i].textContent;
            div1.appendChild(trInput[i]);
        }
    }
    /**
     * 选中第四个选项 删除行
     */
    if(select1.value === "3"){
        if(select2.selectedIndex === 0){
            commitBt.style.display = "none";
            return;
        }
        var number = select2.selectedIndex - 1;
        for(var i = 0 ;i < table[number].rows[0].cells.length;i++){
            trInput[i] = document.createElement("input");
            trInput[i].type = "text";
            trInput[i].placeholder = table[number].rows[0].cells[i].textContent;
            div1.appendChild(trInput[i]);
        }
    }
    /**
     * 选中第五个选项 删除表格
     */
    if(select1.value === "4"){
        if(select2.selectedIndex === 0){
            commitBt.style.display = "none";
            return;
        }
        div1.innerHTML = "WARNING: You cannot undo this action!";
    }
}

/**
 * 判断第二个下拉框的选项
 */
function select2Change() {
    div2.innerHTML = "";
    select1.onchange();
    if(select2.value === "0"){
        return;
    }
    var number = select2.selectedIndex;
    div2.appendChild(table[number - 1]);
}

/**
 * 点击commit
 */
function btClick() {
    /**
     * 创建表格及表头
     */
    if (select1.value === "1") {
        for(var i = 0;i < trInput.length; i++) {
            if (trInput[i].value == "") {
                return;
            }
        }

        var tableNumber = table.length;
        table[tableNumber] = document.createElement("table");
        table[tableNumber].insertRow(0);
        for(var i = 0; i<trInput.length;i++){
            var th = document.createElement("th");
            th.textContent = trInput[i].value;
            table[tableNumber].rows[0].appendChild(th);
        }
        div2.innerHTML = "";
        div2.appendChild(table[tableNumber]);

        var newOption = document.createElement("option");
        newOption.value = tableNameInput.value;
        newOption.textContent = tableNameInput.value;
        select2.appendChild(newOption);
        newOption.selected = true;
    }
    /**
     * 添加行
     */
    if (select1.value === "2") {
        var number = select2.selectedIndex - 1;
        var rowNumber = table[number].rows.length;
        table[number].insertRow(rowNumber);
        for(var i = 0;i < table[number].rows[0].cells.length;i++){
            var td = table[number].rows[rowNumber].insertCell(i);
            td.textContent = trInput[i].value;
        }
    }
    /**
     * 删除行
     */
    if (select1.value === "3") {
        var number = select2.selectedIndex - 1;
        var rowNumber = table[number].rows.length;
        for(var i = rowNumber - 1;i > 0;i--){
            var deleteRow = true;
            for (var j = 0; j < table[number].rows[0].cells.length; j++){
                if(trInput[j].value === "") {
                    continue;
                }
                if (trInput[j].value != table[number].rows[i].cells[j].textContent) {
                    deleteRow = false;
                    break;
                }
            }
            if(deleteRow) {
                table[number].deleteRow(i);
            }
        }
    }
    /**
     * 删除表格
     */
    if (select1.value === "4") {
        div2.innerHTML ="";
        var number = select2.selectedIndex - 1;
        var option = select2.children[number + 1];
        select2.removeChild(option);

        table.splice(number,1);
        if (select2.options.length>1){
            select2.children[1].selected = true;
            div2.appendChild(table[0]);
        } else {
            select2.children[0].selected = true;
        }
    }
}

/**
 * 创建表格和表头的方法
 */
function createTable() {
    //先复原所有对表格表头的操作
    for(var i = 0; i < trInput.length;i++){
        if(trInput[i].parentNode === div1){
            div1.removeChild(trInput[i]);
        }
    }
    if(tableNameInput.value == "" || colNumberInput.value == ""){
        if(commitBt.style.display === "block"){
            commitBt.style.display = "none";
        }
        return;
    }

    trInput = new Array();
    commitBt.style.display = "block";
    var colNumberValue = parseInt(colNumberInput.value);
    for(var i = 0; i<colNumberValue; i++){
        trInput[i] = document.createElement("input");
        trInput[i].type = "text";
        trInput[i].placeholder = "Attribute";
        div1.appendChild(trInput[i]);
    }
}
