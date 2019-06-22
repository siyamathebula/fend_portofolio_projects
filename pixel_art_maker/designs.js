const tableWidth = document.getElementById('inputWidth').value; //variable to get the width of the table
const tableHeight = document.getElementById('inputHeight').value; //variable to get the height of the table
const tableSize = document.getElementById('sizePicker'); //variable to get the size of the table
var tableColor = document.getElementById('colorPicker').value; //variable to get the color of the each cell
var myTable = document.getElementById("pixelCanvas"); //variable for table element itself


//event listener to dynamically create table upon form submit
tableSize.addEventListener('submit', function(submit){
    submit.preventDefault();
    const tableWidth = document.getElementById('inputWidth').value;
    const tableHeight = document.getElementById('inputHeight').value;
    makeGrid(tableHeight,tableWidth);
})


//function called to make the table according to exact specifications
function makeGrid(tableHeight,tableWidth){
    myTable.innerHTML = ""; //initialization of table to allow a refresh when submit is pressed again

    //loop to create table by first creating rows
    for (let tableRow=1; tableRow <= tableHeight; tableRow++){
        myTable = document.getElementById("pixelCanvas"); //redefining table at each iteration
        addRow = myTable.insertRow(tableRow-1); //inserting rows

        //loop to add colums to the above rows
        for (let tableCol=1; tableCol <= tableWidth; tableCol++){
            addCell = addRow.insertCell(tableCol-1); //adding the <td>'s within each table row

            //listener for each click to color each cell
            addCell.addEventListener('click', function(click){
                tableColor = document.getElementById('colorPicker').value;
                click.target.style.backgroundColor = tableColor;
            })
       }
   }
} 


