//Generates the dropdown years list
function dropDownList(){
  var select = document.getElementById('dropdown')
  select.addEventListener("change", getLimit, false);

  var currentYear = new Date().getFullYear();
  document.getElementById('not18').innerHTML = currentYear-18;

  for(var year = currentYear-18; year >= currentYear-100; year--){
    var listItem = document.createElement('option');
    var yearText = document.createTextNode(year);
    listItem.appendChild(yearText);
    listItem.setAttribute("value", year);
    document.getElementById('dropdown').appendChild(listItem);
  }
  //initialize select
  select.setAttribute("selected", listItem[0])
}

//Get the selected year
function getBirthYear(){
  var select = document.getElementById('dropdown');
  var option = document.getElementsByTagName('option')
  var value = option[select.selectedIndex].value;
  return value;
}

//Perform the contribution limit calculations
function calculateContribution(){
  var currentYear = new Date().getFullYear();
  var birthYear = parseInt(getBirthYear());
  var birthDay18th = birthYear + 18;
  var limit = 0;
  var entitledYear = parseInt(currentYear);

  //clear the table body
  var tableBody = document.getElementById('tablebody');
  tableBody.innerHTML="";

  for(entitledYear; entitledYear >= 2019; entitledYear--){
    let yearlyLimit = 6000;
    limit += yearlyLimit;
    createRows(entitledYear, yearlyLimit, tableBody);
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2016; entitledYear--){
    let yearlyLimit = 5500;
    limit += yearlyLimit;
    createRows(entitledYear, yearlyLimit, tableBody);
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2015; entitledYear--){
    let yearlyLimit = 10000;
    limit += yearlyLimit;
    createRows(entitledYear, yearlyLimit, tableBody);
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2013; entitledYear--){
    let yearlyLimit = 5500;
    limit += yearlyLimit;
    createRows(entitledYear, yearlyLimit, tableBody);
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2009; entitledYear--){
    let yearlyLimit = 5000;
    limit += yearlyLimit;
    createRows(entitledYear, yearlyLimit, tableBody);
    if (birthDay18th >= entitledYear){
      return limit;
    }}
  return limit;
}

function createRows(entitledYear, limit, tableBody){

    var row = tableBody.insertRow();
    var year = row.insertCell();
    var yearlyLimit = row.insertCell();
    var deposit = row.insertCell();
    var withdraw = row.insertCell();
    var netAmount = row.insertCell();

    var depositBox = document.createElement("input");
    depositBox.setAttribute('type', 'number');
    depositBox.setAttribute('id', 'depositInput');
    depositBox.addEventListener("input", calculateRoom, false);

    var withdrawBox = document.createElement("input");
    withdrawBox.setAttribute('type', 'number');
    withdrawBox.setAttribute('id', 'withdrawInput');
    withdrawBox.addEventListener("input", calculateRoom, false);

    year.innerHTML = entitledYear;
    yearlyLimit.innerHTML = limit;
    deposit.appendChild(depositBox);
    withdraw.appendChild(withdrawBox);
    netAmount.innerHTML = "$"+0;
    netAmount.id = "netAmount";
    yearlyLimit.id = "yearLimit";
}

function getLimit(){
  var contributionLimit = calculateContribution();
  document.getElementById('contribution').innerHTML = "$"+contributionLimit;
  calculateRoom();
}

function calculateRoom(){

  var depositList = document.querySelectorAll('input[type=number]#depositInput');
  var withdrawList = document.querySelectorAll('input[type=number]#withdrawInput');
  var limitList = document.querySelectorAll('#yearLimit');
  var netAmountList = document.querySelectorAll('#netAmount');

  var depositSum = 0;
  var withdrawSum = 0;
  var yearLimitSum = 0;
  var net

  for(var col =0; col < depositList.length; col++){

    var yearLimitAmount = parseInt(limitList[col].innerHTML);
    var depositAmount = parseInt(depositList[col].value);
    var withdrawAmount = parseInt(withdrawList[col].value);

    depositAmount = +depositAmount || 0;
    withdrawAmount = +withdrawAmount || 0;

    yearLimitSum += yearLimitAmount;
    depositSum += depositAmount;
    withdrawSum += withdrawAmount;

    var netAmount = yearLimitAmount - depositAmount + withdrawAmount;
    netAmount = +netAmount || 0;
    netAmountList[col].innerHTML = "$"+netAmount;
  }

  var netAmountSum = yearLimitSum - depositSum + withdrawSum;

  document.getElementById('limitTotal').innerHTML = "$"+yearLimitSum;
  document.getElementById('depositTotal').innerHTML = "$"+depositSum;
  document.getElementById('withdrawTotal').innerHTML = "$"+withdrawSum;
  document.getElementById('netTotal').innerHTML = "$"+netAmountSum;
}
dropDownList();
getLimit();
