var currHours = new Date().getHours()
var update = document.querySelector('button.is-link');
var table = document.getElementById('slots')
var selects = []

update.addEventListener('click', function(event) {
	update.classList.add('is-loading');
	for (var i = 1, row; row = table.rows[i]; i++) { // i = 1 instead of 0 to not count the first row aka timings
    // iterate through rows
    // rows would be accessed using the "row" variable assigned in the for loop
		for (var j = 1, col; col = row.cells[j]; j++) { // i = 1 instead of 0 to not count the first col aka names
        // iterate through columns
        // columns would be accessed using the "col" variable assigned in the for loop
            if (table.rows[i].cells[j].className == 'is-selected' || table.rows[i].cells[j].className == 'is-booked') {
                /* ORIGINAL CODE
					 selects.push(table.rows[i].cells[0].querySelector("#teacher").innerHTML)
                selects.push(table.rows[0].cells[j].id)
					 */
					table.rows[i].cells[j].className = 'is-booked'
            } else if (table.rows[i].cells[j].className == 'is-cancelled') { // NEW
					table.rows[i].cells[j].className = '' // NEW
				} // NEW
        }
    }
    document.querySelector('.button.is-link').value = selects
	setTimeout(update.classList.remove('is-loading'), 1000 ) // NEW
});

for (var i = 1, row; row = table.rows[i]; i++) { // i = 1 instead of 0 to not count the first row aka timings
    // iterate through rows
    // rows would be accessed using the "row" variable assigned in the for loop
    for (var j = 1, col; col = row.cells[j]; j++) { // i = 1 instead of 0 to not count the first col aka names
        // iterate through columns
        // columns would be accessed using the "col" variable assigned in the for loop
        if (table.rows[i].cells[j].classList.contains('is-blocked')) {
            table.rows[i].cells[j].addEventListener('click', function (event) {
                alrBooked(this)
            })
        } else {
            table.rows[i].cells[j].addEventListener('click', function (event) {
                bookSlot(this)
            })
        }
    }
}

function bookSlot(tableCell) {
    // tableCell.parentNode.rowIndex - row num of particular cell,tableCell.cellIndex - col num of particular cell
    // see "https://stackoverflow.com/questions/3400628/how-can-i-get-the-position-of-a-cell-in-a-table-using-javascript/3400673#3400673"
    for (var i = 1; i < table.rows.length; i++) { // go through all rows except first
        // if other cells in same col except itself is booked - so that can still cancel a booked slot
        if (table.rows[i].cells[tableCell.cellIndex].classList.contains('is-booked') || table.rows[i].cells[tableCell.cellIndex].classList.contains('is-selected')) {
            if (i != tableCell.parentNode.rowIndex) {
                bookConflict(this)
                return;
            }
        } else if (tableCell.className == 'is-booked') {
            tableCell.classList.replace('is-booked','is-cancelled');
            return;
        } else if (tableCell.className == 'is-cancelled') {
            tableCell.classList.replace('is-cancelled','is-booked');
			  return;
        }
    }
    tableCell.classList.toggle('is-selected');
}

function alrBooked(tableCell) {
    alert("Slot already booked.");
}

function bookConflict(tableCell) {
    alert("Cannot book multiple slots at once.");
}