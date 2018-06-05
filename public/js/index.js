var socket = io();


socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var li = jQuery('<li></li>');
  li.text(`${formattedTime} ${message.from} : ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current location</a>');

  li.text(`${formattedTime} ${message.from} : `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
});

socket.on('newWeatherMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mma');
  var li = jQuery('<li></li>');
  var a = jQuery('<a target="_blank">My current weather</a>');

  li.text(`${formattedTime} ${message.from} : `);
  a.attr('href', message.url);
  li.append(a);
  jQuery('#messages').append(li);
  console.log(message.currentWeather);
});

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  var messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
    messageTextbox.val('')
  });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function () {
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser');
  }
  locationButton.attr('disabled', 'disabled').text('Sending location--');
  navigator.geolocation.getCurrentPosition(function (position) {
    locationButton.removeAttr('disabled').text('---Send location---');
    var messageTextbox = jQuery('[name=message]');
    if(messageTextbox.val() === 'weather'){
      socket.emit('createWeatherMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      messageTextbox.val('');
    } else {
      socket.emit('createLocationMessage', {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      messageTextbox.val('');
    }
  }, function () {
    messageTextbox.val('');
    locationButton.removeAttr('disabled').text('---Send location---');
    alert('Unable to fetch location.');
  });
});
