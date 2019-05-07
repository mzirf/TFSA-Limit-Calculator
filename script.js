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
  var entitledYear = currentYear;

  for(entitledYear; entitledYear >= 2019; entitledYear--){
    limit +=6000;
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2016; entitledYear--){
    limit += 5500;
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2015; entitledYear--){
    limit += 10000;
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2013; entitledYear--){
    limit += 5500;
    if (birthDay18th >= entitledYear){
      return limit;
    }}

  for(entitledYear; entitledYear >= 2009; entitledYear--){
    limit += 5000;
    if (birthDay18th >= entitledYear){
      return limit;
    }}
  return limit;
}

function getLimit(){
  var contributionLimit = calculateContribution();
  document.getElementById('contribution').innerHTML = "$"+contributionLimit;
}

dropDownList();
getLimit();
