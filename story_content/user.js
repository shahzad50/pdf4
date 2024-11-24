window.InitUserScripts = function()
{
var player = GetPlayer();
var object = player.object;
var addToTimeline = player.addToTimeline;
var setVar = player.SetVar;
var getVar = player.GetVar;
window.Script1 = function()
{
  //Retrieve Player Variables

var date = new Date();
var dd = String(date.getDate()).padStart(2, '0');
var mm = String(date.getMonth() + 1).padStart(2, '0'); 
var yyyy = date.getFullYear();
date = mm + '/' + dd + '/' + yyyy;

var player = GetPlayer();
userName = player.GetVar("Name");
Question1 = player.GetVar("Q1");
Question2 = player.GetVar("Q2");
Question3 = player.GetVar("Q3");
Question4 = player.GetVar("Q4");
Question5 = player.GetVar("Q5");
Question6 = player.GetVar("Q6");

Constructpdf();

async function Constructpdf() {
//Dynamically load pdf-lib JavaScript module
  await loadMods();
//Call the fillForm asynch function
  await fillForm();
}
async function loadMods() {
await import("https://unpkg.com/pdf-lib/dist/pdf-lib.js");
}

async function fillForm() {
//Read pdf form
  const { PDFDocument } = PDFLib;
  const formUrl = 'PDF.pdf';
  const formPdfBytes = await fetch(formUrl).then (res => res.arrayBuffer());
  const pdfDoc = await PDFDocument.load(formPdfBytes);
  const form = pdfDoc.getForm();
//Get field names
  const uName = form.getTextField("Name");
  const curDate = form.getTextField("Date");
  const Q1Field = form.getTextField('field1');
  const Q2Field = form.getTextField('field2');
  const Q3Field = form.getTextField('field3');
  const Q4Field = form.getTextField('field4');
  const Q5Field = form.getTextField('field5');
  const Q6Field = form.getTextField('field6');

//Fill in form
  uName.setText(userName);
  curDate.setText(date);
  Q1Field.setText(Question1);
  Q2Field.setText(Question2);
  Q3Field.setText(Question3);
  Q4Field.setText(Question4);
  Q5Field.setText(Question5);
  Q6Field.setText(Question6);
  var filename = "Gen.pdf"
//Save form
  const pdfBytes = await pdfDoc.save();
//Download the form
await import('https://unpkg.com/tiny-save-as/dist/tiny-save-as.esm.js')
.then(({default: saveAs}) => {
  const blob = new Blob([pdfBytes], {type: 'application/octet-stream'});
  saveAs(blob, filename);
})
.catch((err) => {
  console.log(err);
});
  }
}

};
