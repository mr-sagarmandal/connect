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
       loadInitDivisions(true);
       $('.applicant-button').click(function() {
           clearPage();
           loadApplicantResume();
       });
       $('.recruiter-button').click(function() {
           clearPage();
           loadRecruitmentJob();
       });
    });
});

//Clear Page
function clearPage() {
    $('.dashboard').empty();
}

////////////////////////////////////////////////////////////////////////////////

//Responsible for creating initial division for choosing recruiter or applicants
function loadInitDivisions(success) {
    if (success) {
        createInitDivs();
    } else {
        couldNotConnect();
    }
}

function couldNotConnect() {
    clearPage();
    var bigContainer = document.createElement('div');
    bigContainer.className = 'jumbotron jumbotron-fluid text-center could-not-connect';
    bigContainer.innerHTML = "<h1>Oops! Could Not Connect</h1>"
    document.getElementsByClassName("dashboard")[0].appendChild(bigContainer);
}

function createInitDivs() {
    clearPage();
    var bigContainer = document.createElement('div');
    bigContainer.className = 'init-container';
    var bigRow = document.createElement('div');
    bigRow.className = 'row center-content-between';
    var col1 = document.createElement('col');
    col1.className = 'col-md-4 col-sm-12 col-xs-12 col-md-offset-1 text-center applicant-text';
    col1.innerHTML = "<div class='jumbotron jumbotron-fluid init-buttons applicant-button'><h2 id='init-head'>Applicant</h2></div>"
    bigRow.appendChild(col1);
    var col2 = document.createElement('col');
    col2.className = 'col-md-4 col-sm-12 col-xs-12 col-md-offset-1 text-center recruiter-text';
    col2.innerHTML = "<div class='jumbotron jumbotron-fluid recruiter-button init-buttons'><h2 id='init-head'>Recruiter</h2></div>"
    bigRow.appendChild(col2);
    bigContainer.appendChild(bigRow);
    document.getElementsByClassName("dashboard")[0].appendChild(bigContainer);
}
///////////////////////////////////////////////////////////////////////////////

//Responsible for loading Applicant Resume Upload Prompt
function loadApplicantResume() {
    console.log("inside loadApplicantResume")
}
///////////////////////////////////////////////////////////////////////////////

//Responsible for loading Recruiter Job Description Upload Prompt
function loadRecruitmentJob() {
    console.log("inside loadRecruitmentJob")
}
