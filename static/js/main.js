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

// Clear Page
function clearPage() {
    $('.dashboard').empty();
}
////////////////////////////////////////////////////////////////////////////////

// Clear Page
function createHeader(header) {
    var sampleText = document.createElement("H1");
    sampleText.className="command-header";
    sampleText.appendChild(document.createTextNode(header));
    document.getElementsByClassName("dashboard")[0].appendChild(sampleText);
}

////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////////////////////////////////

// Clear Page
function refreshPage() {
    loadInitDivisions(true);
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
    createHeader("Paste your Resume");
    createUploadResumeDiv();
}

function createUploadResumeDiv() {
    var bigContainer = document.createElement('div');
    bigContainer.className = 'load-resume-container';
    bigContainer.appendChild(getUploadResumeContainer());
    document.getElementsByClassName('dashboard')[0].appendChild(bigContainer);
}

function getUploadResumeContainer() {
    var saveContainer = document.createElement('div');
    saveContainer.className = 'save-resume-container';
    var instructionHeaderHTML =
        '<h3 class="upload-resume-instruction">Paste your resume' +
        ' in the text field.</h3>';
    saveContainer.innerHTML = instructionHeaderHTML;
    saveContainer.appendChild(getUploadResumeDiv());
    return saveContainer;
}

function getUploadResumeDiv() {
    var saveForm = document.createElement('form');
    saveForm.className = 'upload-resume-form';
    var formElementsHTML =
        '<textarea class="form-control paste-text-field" rows="30" id="comment"></textarea>'+
        '<input type="button" class="btn btn-primary upload-resume-btn"' +
        'value="Upload Resume">';
    saveForm.innerHTML = formElementsHTML;
    return saveForm;
}

function notifyUploadResume(success) {
    var alertDiv = document.createElement('div');
    if (success) {
        if ($('.alert-success')[0]) {
            $('.alert-success').remove();
        }
        alertDiv.className = "alert alert-success save-resume-alert";
        alertDiv.appendChild(
            document.createTextNode("Success. Resume was successfully uploaded"));
    } else {
        if ($('.alert-danger')[0]) {
            $('.alert-danger').remove();
        }
        alertDiv.className = "alert alert-danger save-resume-alert";
        alertDiv.appendChild(
            document.createTextNode("Error. Resume could not be uploaded."));
    }
    document.getElementsByClassName("save-resume-container")[0].appendChild(alertDiv);
    window.setTimeout(function() {
            $(".save-resume-alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            });
        }, 3000);
}
///////////////////////////////////////////////////////////////////////////////

//Responsible for loading Recruiter Job Description Upload Prompt
function loadRecruitmentJob() {
    createHeader("Paste your Job Description");
    createUploadJobDescriptionDiv();
}

function createUploadJobDescriptionDiv() {
    var bigContainer = document.createElement('div');
    bigContainer.className = 'load-jobdescription-container';
    bigContainer.appendChild(getUploadJobDescriptionContainer());
    document.getElementsByClassName('dashboard')[0].appendChild(bigContainer);
}

function getUploadJobDescriptionContainer() {
    var saveContainer = document.createElement('div');
    saveContainer.className = 'save-jobdescription-container';
    var instructionHeaderHTML =
        '<h3 class="upload-resume-instruction">Paste your Job Description' +
        ' in the text field.</h3>';
    saveContainer.innerHTML = instructionHeaderHTML;
    saveContainer.appendChild(getUploadJobDescriptionDiv());
    return saveContainer;
}

function getUploadJobDescriptionDiv() {
    var saveForm = document.createElement('form');
    saveForm.className = 'upload-jobdescription-form';
    var formElementsHTML =
        '<textarea class="form-control paste-text-field" rows="30" id="comment"></textarea>'+
        '<input type="button" class="btn btn-primary upload-jobdescription-btn"' +
        'value="Upload Job Description">';
    saveForm.innerHTML = formElementsHTML;
    return saveForm;
}

function notifyUploadJobDescription(success) {
    var alertDiv = document.createElement('div');
    if (success) {
        if ($('.alert-success')[0]) {
            $('.alert-success').remove();
        }
        alertDiv.className = "alert alert-success save-jobdescription-alert";
        alertDiv.appendChild(
            document.createTextNode("Success. Job Description was successfully uploaded"));
    } else {
        if ($('.alert-danger')[0]) {
            $('.alert-danger').remove();
        }
        alertDiv.className = "alert alert-danger save-jobdescription-alert";
        alertDiv.appendChild(
            document.createTextNode("Error. Job Description could not be uploaded."));
    }
    document.getElementsByClassName("save-jobdescription-container")[0].appendChild(alertDiv);
    window.setTimeout(function() {
            $(".save-jobdescription-alert").fadeTo(500, 0).slideUp(500, function(){
            $(this).remove();
            });
        }, 3000);
}
//////////////////////////////////////////////////////////////////////////////////////////
