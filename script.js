// This ensures that the code runs after the page is fully loaded.
$(document).ready(function() {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  $('.saveBtn').on('click', function () {
    // Get the user input from the textarea associated with the clicked button
    var userInput = $(this).siblings('.description').val();

    // Find the corresponding time-block and extract its id
    var timeBlockId = $(this).closest('.time-block').attr('id');

    // Use the timeBlockId as the key to save the user input in local storage
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js in 24-hour format (0-23)
  var currentHour = dayjs().hour();

  $('.time-block').each(function () {
    var timeBlockHour = parseInt($(this).attr('id').split('-')[1]);

    if (timeBlockHour < currentHour) {
      $(this).addClass('past').removeClass('present future');
    } else if (timeBlockHour === currentHour) {
      $(this).addClass('present').removeClass('past future');
    } else {
      $(this).addClass('future').removeClass('past present');
    }
  });

// Retrieve and set saved user input from localStorage for each time block
for (var i = 9; i <= 17; i++) {
  var userTextInput = localStorage.getItem('hour-' + i);

  // Check if user input exists in localStorage for this time block
  if (userTextInput !== null) {
    $('#hour-' + i + ' .description').val(userTextInput);
  }
}

  // Displays the current date in the header of the page
  var currentDate = dayjs().format('dddd, MMM D, YYYY [at] h:mm:ss A');
  $('#currentDay').text(currentDate); 
});
