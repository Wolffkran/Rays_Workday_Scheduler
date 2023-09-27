// This ensures that the code runs after the page is fully loaded.
$(document).ready(function() {

  // Adds a listener for click events on the save button
  $('.saveBtn').on('click', function () {
    var userInput = $(this).siblings('.description').val();
    var timeBlockId = $(this).closest('.time-block').attr('id');
    localStorage.setItem(timeBlockId, userInput);
  });

  // Get the current hour using Day.js in 24-hour format (0-23)
  var currentHour = dayjs().hour();

  // Loop through each time block element
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
