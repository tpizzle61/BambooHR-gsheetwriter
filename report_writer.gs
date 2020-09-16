function GetReport() {

  // Enter user variables below

  // To find your domain name, navigate to the home page of your BambooHR and look for the domain before .bamboohr.com/home - https://EXAMPLE.bamboohr.com/home/
  var domainName = "sampleDomain";
  //To find your report number, navigate to https://DOMAIN.bamboohr.com/reports/custom/ReplaceIQ/XXXX - these last numbers are your report number
  var reportNumber = "XXXX";
  // A BambooHR admin will have to obtain the API key by selecting the "Account" icon in the top right corner in BambooHR and selecting "API Keys"
  var apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
  // Copy just the URL portion of the spreadsheet. The end of the URL might have "/" or "/edit#gid=0" - You can remove all that. Follow the example of the URL below.
  var ssURL = "https://docs.google.com/spreadsheets/d/ThIsIsanExamPleOnLTiTlooksLike-RanDOmleTTerS";

  // No user input needed beyond this point
  // ------------------------------------------------------------------------------------------------------------------ 
  
  // API 
  var authHeader = "Basic " + Utilities.base64Encode(apiKey + ":x");  
  var res = UrlFetchApp.fetch("https://api.bamboohr.com/api/gateway.php/"+domainName+"/v1/reports/"+reportNumber+"?format=xml", {"headers":{"TRN-Api-Key": apiKey, "Authorization": authHeader}})
  
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
        
    // Get Spreadsheet URL
    var ss = SpreadsheetApp.openByUrl(ssURL+"/");
   
    var sheet = ss.getSheets()[0];
    sheet.clear(); // Clears the sheet before inputting data to ensure there are no duplicates
    
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
