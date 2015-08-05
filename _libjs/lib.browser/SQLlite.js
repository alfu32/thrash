/**
 * Created with JetBrains PhpStorm.
 * User: ioanalferaru
 * Date: 10/17/12
 * Time: 3:39 PM
 * To change this template use File | Settings | File Templates.
 */
//INTEGER PRIMARY KEY AUTOINCREMENT
//TEXT
function SQLLite(){

}
function SQLLiteDatabase(){

}
function SQLLiteTable(){

}
function SQLLiteRow(){

}


function sqlStatement_createTable($table,$fields){
    var initialfields;
    if(typeof $fields=="object") initialfields= "("+ $fields.getKeyValuePairs(" ").join(",") +");";

    var statement = ["CREATE TABLE IF NOT EXISTS",$table.surroundWith("´"),initialfields];
    return statement.join(" ");
}
//log(sqlStatement_createTable("test_data",{key:"INTEGER PRIMARY KEY AUTOINCREMENT",file:"TEXT",begin:"FLOAT",calc:"FLOAT",end:"FLOAT"}))


function sqlStatement_select($table,$fields,$condition){
    var condition=$condition||"1=1";
    var fieldNames=$fields||"*";

    /*if($condition instanceof Array && $fields.length>0)condition= $condition.join(" AND ")
    else if(!($condition instanceof String) && typeof $condition == "object")condition= $condition.getKeyValuePairs("").join(" AND ");

    //if(typeof $condition=="object") condition= $condition.join(" AND ");
    if(typeof $condition=="object") condition= $condition.getKeyValuePairs("").join(" AND ");*/

    if($fields instanceof Array && $fields.length>0)fieldNames="´"+$fields.join("´,´")+"´";
    else if(!($fields instanceof String) && typeof $fields == "object")fieldNames=$fields.getKeys("´").join(",");

    var statement = ["SELECT",fieldNames,"FROM",$table.surroundWith("´"),"WHERE",condition,";"];
    return statement.join(" ");
}
//log(sqlStatement_select("my_table",["key","begin","name","address"],"address=baltimore AND begin>2200"))
//log(sqlStatement_select("my_table",["key","begin","name","address"]))
//log(sqlStatement_select("my_table",{key:null,begin:null,name:null,address:null}))
//log(sqlStatement_select("my_table"))


function sqlStatement_insertInto($table,$fields){
    var keys=$fields.getKeys("´").join(",");
    var values=$fields.getValues("'").join(",");
    var statement = ["INSERT INTO",$table.surroundWith("´")," (",keys,") VALUES (",values,");"];
    return statement.join(" ");
}
//log(sqlStatement_insertInto("my_table",{begin:2547,name:"alvin",address:"new york"}))


function sqlStatement_update($table,$fields,$condition){
    var keyValuePair,condition=$condition||"1=1";

    if(typeof $fields=="object") keyValuePair= $fields.getKeyValuePairs("=").join(",");
    //if(typeof $condition=="object") condition= $condition.getKeyValuePairs("").join(" AND ");

    var statement = ["UPDATE",$table.surroundWith("´"),"SET (",keyValuePair," )","WHERE",condition,";"];
    return statement.join(" ");
}

//log(sqlStatement_update("my_table",{begin:2647,name:"alvin klein",address:"baltimore"}))
//log(sqlStatement_update("my_table",{begin:2647,name:"alvin klein",address:"baltimore"},"key=12 OR begin>2000"))

function sqlStatement_delete($table,$condition){
    var condition=$condition||"1=1";

    //if(typeof $condition=="object") condition= $fields.keyValuePairs("").join(" AND ");
    var statement = ["DELETE FROM",$table.surroundWith("´"),"WHERE",condition,";"];
    return statement.join(" ");
}
//log(sqlStatement_delete("my_table","key=12 OR begin>2000"))

function sqlStatement_dropTable($table){
    var statement = ["DROP TABLE",$table.surroundWith("´")];
    return statement.join(" ");
}
//log(sqlStatement_dropTable("my_table"))


var db = openDatabase("AddressBook", "1.0", "Address Book", 30*1024/*1024*/);
function sql_execute(sqlString){
    db.transaction(function(tx) {
        tx.executeSql(createStatement, [], showRecords, onError);
    });
}



var createStatement = "CREATE TABLE IF NOT EXISTS $ ($ $, $ $, lastName TEXT, phone TEXT)";
var selectAllStatement = "SELECT * FROM Contacts";
var insertStatement = "INSERT INTO Contacts (firstName, lastName, phone) VALUES (?, ?, ?)";
var updateStatement = "UPDATE Contacts SET firstName = ?, lastName = ?, phone = ? WHERE id = ?";
var deleteStatement = "DELETE FROM Contacts WHERE id=?";
var dropStatement = "DROP TABLE Contacts";

function skip(){
    var db = openDatabase("AddressBook", "1.0", "Address Book", 200000);
    var dataset;
    createTable();

    function onError(tx, error) {
        alert(error.message);
    }

    function showRecords() {
        results.innerHTML = '';
        db.transaction(function(tx) {
            tx.executeSql(selectAllStatement, [], function(tx, result) {
                dataset = result.rows;
                for (var i = 0, item = null; i < dataset.length; i++) {
                    item = dataset.item(i);
                    results.innerHTML +=
                        '<li>' + item['lastName'] + ' , ' + item['firstName'] + ' <a href="#" onclick="loadRecord('+i+')">edit</a>  ' +
                            '<a href="#" onclick="deleteRecord('+item['id']+')">delete</a></li>';
                }
            });
        });
    }

    function createTable() {
        db.transaction(function(tx) {
            tx.executeSql(createStatement, [], showRecords, onError);
        });
    }

    function insertRecord() {
        db.transaction(function(tx) {
            tx.executeSql(insertStatement, [firstName.value, lastName.value, phone.value], loadAndReset, onError);
        });
    }

    function loadRecord(i) {
        var item = dataset.item(i);
        firstName.value = item['firstName'];
        lastName.value = item['lastName'];
        phone.value = item['phone'];
        id.value = item['id'];
    }

    function updateRecord() {
        db.transaction(function(tx) {
            tx.executeSql(updateStatement, [firstName.value, lastName.value, phone.value, id.value], loadAndReset, onError);
        });
    }

    function deleteRecord(id) {
        db.transaction(function(tx) {
            tx.executeSql(deleteStatement, [id], showRecords, onError);
        });
        resetForm();
    }

    function dropTable() {
        db.transaction(function(tx) {
            tx.executeSql(dropStatement, [], showRecords, onError);
        });
        resetForm();
    }

    function loadAndReset(){
        resetForm();
        showRecords();
    }

    function resetForm(){
        firstName.value = '';
        lastName.value = '';
        phone.value = '';
        id.value = '';
    }
}