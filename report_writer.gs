function GetReport() {
  
  // Enter company domain name below where DOMAINNAME is indicated
  // Enter report number into the URL below where the three X's are
  var url = "https://api.bamboohr.com/api/gateway.php/DOMAINNAME/v1/reports/XXX?format=xml";
  
  // Enter API Key below
  var apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  var authHeader = "Basic " + Utilities.base64Encode(apiKey + ":x");  
  var res = UrlFetchApp.fetch( url, {"headers":{"TRN-Api-Key": apiKey, "Authorization": authHeader}})
  
  var content = res.getContentText(); 
  var doc = XmlService.parse(content);
  var root = doc.getRootElement();
  
  
  logChildren(doc.getRootElement().getChildren());
  
  // This will appear in your logger if the program runs successfully.
  Logger.log("Successfully saved data.")

    
  // Function
  function logChildren(elements){
    
    // Get the field names
    var fieldNames = elements[1].getChildren();
    
    // Get all employees
    var employees = elements[2].getChildren();
        
    // Enter the destination sheet URL below
    var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    
    var sheet = ss.getSheets()[0];
    
    // Loop through all the field names
    for (var j=0; j<fieldNames.length; j++) {
      
      var i = fieldNames[j].getAttribute('name').toString().replace("[name='", "").replace("']", "");
      Logger.log(i)
      
      // Writes the field names to the first row
      sheet.getRange(1, j+1).setValue(i);
      
    }
    
    // Loop through all employees and get the field values    
    for (var i=0; i<employees.length; i++) {
      
      var employeeFields = employees[i].getChildren();
      
      for (var j=0; j<employeeFields.length; j++) {
        
        sheet.getRange(i+2, j+1).setValue(employeeFields[j].getText());
                
      }
      
    }
    
  }
  
}
