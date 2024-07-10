function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('Actualizar Estado')
    .addItem('Cambiar Estado', 'showStatusForm')
    .addToUi();
}

function showStatusForm() {
  const htmlOutput = HtmlService.createHtmlOutputFromFile('StatusForm')
    .setWidth(400)
    .setHeight(300);
  SpreadsheetApp.getUi().showModalDialog(htmlOutput, 'Actualizar Estado del Lead');
}

function updateStatus(rowNumber, status) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const logSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Log') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Log');
  
  const range = sheet.getRange('C' + rowNumber); // Asumiendo que la columna C es donde se guarda el estado
  const oldStatus = range.getValue();
  range.setValue(status);

  const timestamp = new Date();
  logSheet.appendRow([timestamp, 'Fila ' + rowNumber, oldStatus, status]);
}

