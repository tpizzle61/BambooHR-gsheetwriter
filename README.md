# BambooHR-gsheetwriter
A Google Apps Script function to pull custom reports from BambooHR into Google Sheets.

## Enter the domain name and report number of your custom report

Open your custom report in BambooHR and view the link as below.

```
https://mycompany.bamboohr.com/reports/custom/My+Custom+Report/983
```

Your domain name will be the first part of the link before '.bamboohr' (in this example, 'mycompany'), while the report number will be the number at the end of the link (in this example, 983). Build out the report link in the first part of the script using your company domain name and report number as follows:

```
var url = "https://api.bamboohr.com/api/gateway.php/mycompany/v1/reports/983?format=xml";
```

## Enter your API key

You will need to obtain an API key from a system administrator in BambooHR. Your API key is viewable in BambooHR by clicking your profile photo in the top right corner of your screen and then selecting "API Keys" in the dropdown. Contact your system administrator if you do not see this option.

Once you have obtained your API key, enter the key in the appropriate section of the script:

```
var apiKey = "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX";
```

## Enter the destination GSheet link

This is the sheet where you want your report to live. If you don't have a specific location in mind, create a new GSheet and copy the link and paste it here.

```
var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
```

## Test your function

To test the program, hit run in your script editor. Once the script has run fully, check your destination GSheet to see if your desired output has been written to the sheet.

## Automate your function

To automate your function, in the script editor go to Edit -> Current project's triggers. This will take you to your projects's triggers screen.

Once at the triggers screen, add a trigger. If you would like the report to refresh daily, choose 'Time-driven' as the event source and select a time of day that you would like the report to refresh.




