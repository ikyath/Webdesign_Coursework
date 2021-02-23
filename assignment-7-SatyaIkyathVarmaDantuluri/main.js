var rows=100;
var columns=20;
var maximum_columns = 26;
const sub = new rxjs.Subject();
const rowObs = new rxjs.Subject();

// The below function is used for to call sum() and other operations
const calculate = (td) =>{
    rxjs.fromEvent(td,'input').pipe(rxjs.operators.debounceTime(800)).subscribe(x=>{
        if(td.innerText.startsWith("=SUM(") && td.innerText.endsWith(")")){
            let sumStr = td.innerText.substring(5,td.innerText.length-1);
            let sumValues=[];
            sumStr.split(":").forEach(x=>{
                if (x.length>1)
                    sumValues.push(x);

            });
            if(sumValues.length==2){
                sum(td,sumValues);
            }
        }
        else if (td.innerText.startsWith("=",0) && td.innerText.length>5 && !td.innerText.includes("=SUM")) {
            let calString = td.innerText.substring(1,td.innerText.length);
            let signs = ["+","-","*","/"];
            let operator = "";

            for (let i = 0;i<signs.length;i++){
                if(calString.includes(signs[i])){
                    operator = signs[i];
                }
            }

            let operatorsArray=[];
            calString.split(operator).forEach(x=>{
                operatorsArray.push(x);
            })

            if(operatorsArray.length==2){
                switch(true){
                    case (operator === "+"):{
                        td.setAttribute("isFormula","true")
                        td.setAttribute("type","sum")
                        calculation(td,"+")
                        break;
                    }
                    case (operator === "-"):{
                        td.setAttribute("isFormula","true")
                        td.setAttribute("type","diff")
                        calculation(td,"-")
                        break;
                    }
                    case (operator === "*"):{
                        td.setAttribute("isFormula","true")
                        td.setAttribute("type","mul")
                        calculation(td,"*")
                        break;
                    }
                    case (operator === "/"):{
                        td.setAttribute("isFormula","true")
                        td.setAttribute("type","div")
                        calculation(td,"/")
                        break;
                    }
                    default:
                        {
                            window.alert("Not a valid formula");
                        }
                }

            }
        }
        else if (x.inputType == "deleteContentBackward" && td.getAttribute("isFormula") == "true") {
            td.removeAttribute("isFormula");
            td.removeAttribute("type");
        }
        sub.next(x.target);
    });
}

//Function for +,-,/,* operations 
const calculation = (td,type)=>{
    let initString = td.innerText.substring(1,td.innerText.length);
    td.setAttribute("Formula",td.innerText);
    let signs = ["+","-","*","/"];
    let operation = "";
    for (let i=0;i<signs.length;i++){
        if (initString.includes(signs[i])){
            operation=signs[i];
        }
    }
    let inputValues = [];
    initString.split(operation).forEach(x=>{
        inputValues.push(x);
    })
    let a = document.getElementById(inputValues[0]);
    let b = document.getElementById(inputValues[1]);

    let observer = sub.subscribe(x=>{
        let answer=0;
        if(!a || !b){
            td.innerText='#NAME?';
        }
        else{

        
        switch(true) {
            case (td.getAttribute("isFormula") && td.getAttribute("type")=="sum"):{
                
                td.innerText = parseInt(a.innerText) + parseInt(b.innerText);
                if(isNaN(td.innerText)){
                    td.innerText='!ERR'
                }
                break;
            }
            case (td.getAttribute("isFormula") && td.getAttribute("type")=="diff"):{
                td.innerText = parseInt(a.innerText) - parseInt(b.innerText);
                if(isNaN(td.innerText)){
                    td.innerText='!ERR'
                }
                break;
            }
            case (td.getAttribute("isFormula") && td.getAttribute("type")=="mul"):{
                td.innerText = parseInt(a.innerText) * parseInt(b.innerText);
                if(isNaN(td.innerText)){
                    td.innerText='!ERR'
                }
                break;
            }
            case (td.getAttribute("isFormula") && td.getAttribute("type")=="div"):{
                td.innerText = parseInt(a.innerText) / parseInt(b.innerText);
                if(isNaN(td.innerText)){
                    td.innerText='!ERR'
                }
                if(td.innerText==='Infinity'){
                    td.innerText='#DIV/0!'
                }

                break;
            }
            default:
                {
                    observer.unsubscribe();
                }
        }
    }
    });
}

//Function to load spreadsheet with specified number of rows and columns

const rload = () =>{

    let body = document.getElementsByTagName("body")[0];
    let table = document.createElement("table");

    for (let i=0;i<rows;i++){
        let tr = document.createElement("tr");
        tr.setAttribute("id",i);
        for(let j=0;j<columns;j++){
            let td = document.createElement("td");
            td.setAttribute("id",String.fromCharCode(j+64)+i);
            if( i==0 & j>0 ){
                let text = document.createTextNode(String.fromCharCode(j+64));
                td.addEventListener("click",function(){
                    selectCol(td);
                },false);
                td.appendChild(text); 
            }
            else if(j==0 & i>0){
                let text = document.createTextNode(i);
                td.addEventListener("click",function(){
                    selectRow(tr);
                },false);
                td.appendChild(text);
            }
            else if(i==0 & j==0){
                td.setAttribute("contenteditable","false");
                
                
            }
            else{
                td.setAttribute("contenteditable","true");
                
                calculate(td);
                td.addEventListener("dblclick",function(){
                    selectCell(td);
                },false);
                
            }
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    body.appendChild(table);
}

window.onload = rload();

const seltdRow = new Set();

//Highlighting selected row

const selectRow = (x) => {
    if (x.classList.contains("highlight")) {
        x.classList.remove("highlight");
        seltdRow.delete(x);
    }
    else {
        x.classList.toggle("highlight");
        seltdRow.add(x);
    }
}


const selectCell = (x) => {
    x.innerText = x.getAttribute("Formula");
}

const seltdCol = new Set();

//Highlighting selected column
const selectCol = (x) => {
    if (x.classList.contains("highlight")) {
        seltdCol.delete(x.id);
    }
    else {
        seltdCol.add(x.id);
    }

    for (let i = 0; i < rows; i++) {
        let id = x.id[0];
        let newid = id + i;
        let col = document.getElementById(newid);
        col.classList.toggle("highlight");
    }
}

//Function for SUM

const sum = (td,sumValues)=> {
    //for columnwise sum addition
    if (sumValues[0].charAt(0) == sumValues[1].charAt(0)){
        let col = sumValues[0].charAt(0);
        td.setAttribute("isFormula","true");
        let start = parseInt(sumValues[0].substring(1,sumValues[0].length));
        let end = parseInt(sumValues[1].substring(1,sumValues[1].length));
        let rowObserver = rowObs.subscribe(x => {
            if (x < end && x >= start) {
                end = parseInt(end) + 1;
            } else if (x < start) {
                start = parseInt(start) + 1;
                end = parseInt(end) + 1;
            }
        });
        let observer = sub.subscribe(x => {
            if (td.getAttribute("isFormula")) {
                let sum = 0;
                for (i = start; i <= end; i++) {
                    sum = sum + parseInt(document.getElementById(col + i).innerText);
                }
                td.innerText = sum;
            } else {
                observer.unsubscribe();
                rowObserver.unsubscribe();
            }
        });
        //for row wise sum addition
    } else if (sumValues[0].substring(1, sumValues[0].length) == sumValues[1].substring(1, sumValues[1].length)) {
        td.setAttribute("isFormula", "true")
        let observer = sub.subscribe(x => {
            if (td.getAttribute("isFormula")) {
                let sum = 0;
                let start = sumValues[0].charCodeAt(0);
                let end = sumValues[1].charCodeAt(0);
                let val = sumValues[0].substring(1, sumValues[0].length);
                for (i = start; i <= end; i++) {
                    sum = sum + parseInt(document.getElementById(String.fromCharCode(i) + val).innerText);
                }
                td.innerText = sum;
            } else { observer.unsubscribe() }
        });
    } else {
        console.log("invalid");
    }
        


}

//Add row functionality to add more rows by selecting them
const addRow=()=>{
    if (seltdRow.size!=1 || seltdRow.size == 0){
        alert("Please select only one Row");
    }
    else if(seltdRow.size===1){
        let table = document.getElementsByTagName("table")[0];
        let rowValues = seltdRow.values();
        let row = rowValues.next().value;
        let index = row.rowIndex+1;
        rowObs.next(index-1);
        let nRow = table.insertRow(index);
        nRow.setAttribute("id",index);
        for(let i=0;i<columns;i++){
            let newcell = nRow.insertCell(i);
            if (i == 0) {
                newcell.setAttribute("contenteditable", "false");
                newcell.setAttribute("id", index);
                newcell.addEventListener("click", function () {
                    selectRow(nRow);
                }, false);
            }
            else {
                newcell.setAttribute("contenteditable", "true");
                newcell.setAttribute("id", String.fromCharCode(i + 64) + index);
                seltdCol.forEach(x=>{
                    let newid = x.charCodeAt(0) - 64;
                    if(newid == i)
                    newcell.setAttribute("class","highlight");
                });
                calculate(newcell);
                
        }
    }
    rows = rows + 1;
    rearrangeTableAdd(index);

    }
}

    const rearrangeTableAdd = (index) => {
        let table = document.getElementsByTagName("table")[0];
        //let row = index;
        let x = table.rows;
        for (let i = index; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                let y = x[i].cells;
                y[0].innerText = i;
                y[j].setAttribute("id", String.fromCharCode(j + 64) + i);
            }
        }
    }

    document.getElementById("addRow").addEventListener("click", addRow, false); 
//Delete Row functionality

const deleteRow = () => {
    if (rows < 3) {
        alert("You are not allowed to delete the last few rows");
    }
    else {
        if (seltdRow.size != 1 || seltdRow.size == 0) {
            alert("Please select one row to delete");
        }
        else {
            let table = document.getElementsByTagName("table")[0];
            let iterator = seltdRow.values();
            let row = iterator.next().value;
            let index = row.rowIndex;
            table.deleteRow(index);
            seltdRow.clear();
            rows = rows - 1;
            rearrangeTableDelete(index);
        }
    }
}

//Rearrnge Table after deletion
const rearrangeTableDelete = (index) => {
    let table = document.getElementsByTagName("table")[0];
    //let row = index;
    let x = table.rows;
    for (let i = index; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            let y = x[i].cells;
            y[0].innerText = i;
            y[j].setAttribute("id", String.fromCharCode(j + 64) + i);
        }
    }
}

document.getElementById("deleteRow").addEventListener("click", deleteRow, false);

//Add Column Functionlaity

const addColumn=()=>{
    if(columns>maximum_columns){
        alert("Not allowed to more columns");
    }
    else{
        if(seltdCol!=1 && seltdCol.size==0){
            alert("Please select only one Column");
        }
        else {
            let table = document.getElementsByTagName('table')[0];
            let columnValues = seltdCol.values();
            let column = columnValues.next().value;
            let newid = column.charCodeAt(0) - 64;
            let rel = newid + 1;
            for (let i = 0; i < rows; i++) {
                //let id = column.id(0);
                let id = column[0];
                let col = id + i;
                let oldtd = document.getElementById(col);
                let td = document.createElement("td");

                if (i == 0) {
                    td.setAttribute("contenteditable", "false");
                    td.setAttribute("id", String.fromCharCode(rel + 64) + i);
                    td.addEventListener("click", function () {
                        selectCol(td);
                    }, false);
                }
                else {
                    td.setAttribute("contenteditable", "true");
                    td.setAttribute("id", String.fromCharCode(rel + 64) + i);
                    calculate(td);
                }

                oldtd.insertAdjacentElement('afterend', td);
            }
            columns = columns + 1;
            rearrangeTableColumn(rel);
        }
    }

        }

        const rearrangeTableColumn = (rel) => {
            let table = document.getElementsByTagName("table")[0];
            //let row = index;
            let x = table.rows;
            for (let i = 0; i < rows; i++) {
                for (let j = rel; j < columns; j++) {
                    let y = x[i].cells;
                    if (i == 0)
                        y[j].innerText = String.fromCharCode(j + 64);
                    y[j].setAttribute("id", String.fromCharCode(j + 64) + i);
                }
            }
        }

document.getElementById("addColumn").addEventListener("click", addColumn, false);

//DeleteColumn Functionality
const deleteColumn = () => {
    if (columns < 3) {
        alert("You are not allowed to delete the last few columns");
    }
    else {
        if (seltdCol.size != 1 || seltdCol.size == 0) {
            alert("Please select one column to delete");
        }
        else {
            let table = document.getElementsByTagName("table")[0];
            //let row = index;
            let iterator = seltdCol.values();
            let col = iterator.next().value;
            let newid = col.charCodeAt(0) - 64;
            let delcol = newid;
            let x = table.rows;
            for (let i = 0; i < rows; i++) {
                x[i].deleteCell(delcol);
            }
            seltdCol.clear();
            columns = columns - 1;
            rearrangeTableDeleteCol(delcol);
        }
    }
}

//Rearrange the table after deleting column
const rearrangeTableDeleteCol = (delcol) => {
    let table = document.getElementsByTagName("table")[0];
    //let row = index;
    let x = table.rows;
    for (let i = 0; i < rows; i++) {
        for (let j = delcol; j < columns; j++) {
            let y = x[i].cells;
            if (i == 0)
                y[j].innerText = String.fromCharCode(j + 64);
            y[j].setAttribute("id", String.fromCharCode(j + 64) + i);
        }
    }
}
    
document.getElementById("deleteColumn").addEventListener("click", deleteColumn, false);


const export_to_csv = (html,filename) => {
    let csv = [];
    let rows_All = document.querySelectorAll("table tr");

    for (let i = 0; i < rows_All.length; i++) {
        let row = [], cols = rows_All[i].querySelectorAll("td");
        //This loop traverses through each input field of the table
        //for (let j = 1; j < cols.length; j++) { -- if header need not be exported
        for (let j = 0; j < cols.length; j++) {
            let newid = cols[j].id;
            let value = document.getElementById(newid).innerText;
            row.push(value);
        }
        csv.push(row.join(","));
    }
    //This will call the download CSV function
    download_csv(csv.join("\n"), filename);
}
const exportcsv = () =>{
    let html = document.querySelector("table").outerHTML;
    export_to_csv(html,"sheet.csv")
}

//this function will download the CSV upon clicking the download CSV button
const download_csv = (csv, filename) => {
    let csvFile;
    let downloadLink;

    //This is basically the csv file
    csvFile = new Blob([csv], { type: "text/csv" });

    //This is the download link
    downloadLink = document.createElement("a");

    //This is the filename that will of the CSV that will be downloaded
    downloadLink.download = filename;

    //A link to the file needs to be create and the link should not be displayed
    downloadLink.href = window.URL.createObjectURL(csvFile);
    downloadLink.style.display = "none";

    //The link needs to be appended to the DOM
    document.body.appendChild(downloadLink);
    downloadLink.click();
}

// event listener to export the current table as csv
document.getElementById("export").addEventListener("click", exportcsv, false);



// event listener to export the current table as csv
document.getElementById("export").addEventListener("click", exportcsv, false);

//method for pop up of the upload csv dialog box
const div_show = () => {
    document.getElementById('upload').style.display = "block";
}

// event listener to show the pop up of the upload csv dialog box 
document.getElementById("uploadpopup").addEventListener("click", div_show, false);

// method to hide the pop up of the upload csv dialog box
const div_hide = () => {
    document.getElementById('upload').style.display = "none";
}

// event listener to hide the pop up of the upload csv dialog box
document.getElementById("uploadhide").addEventListener("click", div_hide, false);


// Function to import the csv file and append it in our spreadsheet.
const Upload = () => {
    let fileUpload = document.getElementById("fileUpload");
    let regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
    if (regex.test(fileUpload.value.toLowerCase())) {
        if (typeof (FileReader) != "undefined") {
            let reader = new FileReader();
            reader.onload = function (e) {
            let table = document.getElementsByTagName("table")[0];
                let x = table.rows;
                for (j = 0; j < x.length; j++) {
                    // let index = j + 1;
                    table.deleteRow(j);
                    j = j - 1;
                }
                let body = document.getElementsByTagName("body")[0];
                seltdCol.clear();
                seltdRow.clear();
                body.removeChild(table);
                let rows_table = e.target.result.split("\n");
                rows = rows_table.length;
                for (let i = 0; i < rows_table.length; i++) {
                    let cell = rows_table[0].split(",");
                    if (cell.length > maximum_columns) {
                        alert("Showing maximum possible columns");
                        columns = maximum_columns + 1;
                        break;
                    }
                    else {
                        let temp = cell.length + 1;
                        columns = temp;
                    }
                }
                rload();
                let table1 = document.getElementsByTagName("table")[0];
                let x1 = table1.rows;
                let r = e.target.result.split("\n");
    
                for (let l = 0, i = 0; l < r.length, i < rows-1; i++ , l++) {
                    let cell = r[l].split(",");
                    if (cell.length < maximum_columns) {
                        for (let k = 0, j = 0; k < cell.length, j < columns-1; k++ , j++) {
                            let y = x1[i].cells;
                            y[j].innerText = cell[k];
                        }
                    }
                    else {
                        for (let k = 0, j = 0; k < max_columns, j < columns; k++ , j++) {
                            let y = x1[i].cells;
                            y[j].innerText = cell[k];
                        }
                    }
                }
            }
            reader.readAsText(fileUpload.files[0]);
            div_hide();

        } else {
            alert("This browser does not support HTML5.");
            div_hide();
        }
    } else {
        alert("Please upload a valid CSV file.");
        div_hide();
    }
}

// event listener to upload the csv from the local file system
document.getElementById("uploadcsv").addEventListener("click", Upload, false);