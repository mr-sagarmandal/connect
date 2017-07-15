//Main Javascript Functions
$(document).ready(function() {
    namespace = '';
    var socket = io.connect(location.protocol + '//' +
        document.domain + ':' + location.port + namespace);

    // Event handler for new connections.
    // The callback function is invoked when a connection with the
    // server is established.
    socket.on('connect', function() {
       socket.emit('User has connected!');
       loadInitDivisions(success);
    });
});

//Responsible for creating initial division
function loadInitDivisions(success) {
    if (success) {
        createInitDivs();
    } else {
        couldNotConnect();
    }
}

function couldNotConnect() {
    var bigContainer = document.createElement('div');
    bigContainer.className = 'jumbotron jumbotron-fluid could-not-connect';
    bigContainer.innerHTML = "<h1>Oops! Could Not Connect</h1>"
    document.getElementsByClassName("dashboard")[0].appendChild(bigContainer);
}

function createInitDivs() {

}
