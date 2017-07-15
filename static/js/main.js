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
       socket.on('init', function(data) {
           loadInitDivisions(data);
           $('.applicant-button').click(function() {
               clearPage();
               resumeClicked();
           });
           $('.recruiter-button').click(function() {
               clearPage();
               recruitmentClicked();
           });
       });
    });

    function resumeClicked() {
        loadApplicantResume();
        $('.upload-resume-btn').click(function() {
            var resumeText = $('#resume-text').val();
            if (resumeText == "") {
                alert('Resume Field Empty');
            } else {
                resumeText =  {resumeText};
                socket.emit("resumeText", resumeText);
            }
        });
    }


    socket.on('ResumeSuccess', function(data) {
        $('#resume-text').val('');
        resumeVerification(data);
    });

    function recruitmentClicked() {
        loadRecruitmentJob();
        $('.upload-jobdescription-btn').click(function() {
            var jobDescriptionText = $('#jobdescription-text').val();
            if (jobDescriptionText == "") {
                alert('Job Description Field Empty');
            } else {
                socket.emit("jobDescriptionText", jobDescriptionText);
            }
            socket.on('JobDescriptionSuccess', function(data) {
                if (data) {
                    notifyUploadJobDescription(data);
                    $('#jobdescription-text').val('');
                    jobDescriptionVerification();
                } else {
                    bigTrouble("Job Description could not be uploaded. Reload and Try again");
                }
            });
        });
    }

    function resumeVerification(data) {
        socket.emit('onResumeVerify', data);
    }


    socket.on('returnParsedResume', function(data) {
        verifyResume(data);
        $('.submit-verifyresume-btn').click(function() {
            var values = $('.skills').val();
            var returnVals = getFinalsSkillSet(values);
            socket.emit('getVerifiedResume', returnVals);
        });
    });

    function jobDescriptionVerification() {
        socket.emit('onJobDescriptVerify');
        socket.on('returnParsedJobDescription', function(data) {
            verifyJobDescription();
        });
    }

    socket.on('sendMatches', function(data) {
        console.log(data)
        showMatch(data);
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
// Get Skillset
function getFinalsSkillSet(data) {
    var data = data.split(',');
    data = data.filter(entry => entry.trim() != '');
    for (var i = 0; i < data.length; i++) {
        data[i] = data[i].substring(1);
    }
    return data;
}

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
        bigTrouble('Oops! Could Not Connect');
    }
}

function bigTrouble(text) {
    clearPage();
    var bigContainer = document.createElement('div');
    bigContainer.className = 'jumbotron jumbotron-fluid text-center could-not-connect';
    bigContainer.innerHTML = "<h1>" + text +"</h1>"
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
        '<textarea class="form-control paste-text-field" rows="30" id="resume-text" placeholder="Paste your Resume here"></textarea>'+
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
        '<textarea class="form-control paste-text-field" rows="30" id="jobdescription-text"></textarea>'+
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

// creating Resume Verification divs
function verifyResume(data) {
    clearPage();
    createHeader("Please Verify If Your Resume Was Parsed Properly");
    createResumeVerifierFormContainers();
    fillVerifierDivs(data);
}

function createResumeVerifierFormContainers() {
    var bigContainer = document.createElement('div');
    bigContainer.className = 'verify-resume-container';
    bigContainer.appendChild(getVerifyResumeForm());
    document.getElementsByClassName('dashboard')[0].appendChild(bigContainer);
}

function getVerifyResumeForm() {
    var formDivHTML =
    '<div class="form-group">' +
        '<label>Name</label>' +
        '<input type="text" class="form-control" id="name" name="name" required>' +
    '</div>' +
    '<div class="form-group">' +
        '<label>Email</label>' +
        '<input type="text" class="form-control" id="email" name="email">' +
    '</div>' +
    '<div class="form-group">' +
        '<label>Skills</label>' +
        '<textarea class="form-control skills" type="textarea" id="skills" rows="15">' +
        '</textarea>' +
    '</div>' +
    '<input type="button" class="btn btn-primary submit-verifyresume-btn"' +
    'value="Submit">';
    var form = document.createElement('form');
    form.className = "verify-resume-form";
    form.id = "verify-resume-form";
    form.setAttribute('role', 'form');
    form.innerHTML = formDivHTML;
    return form;
}

function fillVerifierDivs(data) {
    var skills = data['skills']
    console.log(data['skills'])
    string = ''
    for (var i = 0; i < skills.length; i++) {
         var string = string + "\n" + skills[i] + ",";
    }
    $('.skills').val(string);
}

//////////////////////////////////////////////////////////////////////////////////////////

// creating Resume Verification divs
function verifyJobDescription() {
    clearPage();
    createHeader("Please Verify If Your Job Description Was Parsed Properly");
    createJobDescriptionFormContainers();
}

function createJobDescriptionFormContainers() {
    var bigContainer = document.createElement('div');
    bigContainer.className = 'verify-jobdescription-container';
    bigContainer.appendChild(getVerifyJobDescriptionForm());
    document.getElementsByClassName('dashboard')[0].appendChild(bigContainer);
}

function getVerifyJobDescriptionForm() {
    var formDivHTML =
    '<div class="form-group">' +
        '<label>Name</label>' +
        '<input type="text" class="form-control" id="name" name="name" required>' +
    '</div>' +
    '<div class="form-group">' +
        '<label>Job Name</label>' +
        '<input type="text" class="form-control" id="jobname" name="jobname">' +
    '</div>' +
    '<div class="form-group">' +
        '<label>Qualifications</label>' +
        '<textarea class="form-control qualifications" type="textarea" id="qualifications" rows="15">' +
        '</textarea>' +
    '</div>' +
    '<input type="button" class="btn btn-primary submit-jobdescription-btn"' +
    'value="Submit">';
    var form = document.createElement('form');
    form.className = "verify-resume-form";
    form.id = "verify-resume-form";
    form.setAttribute('role', 'form');
    form.innerHTML = formDivHTML;
    return form;
}

//Employee Match Div Creation
function showMatch(jobMatches) {
    clearPage();
    console.log('sfaf')
    createHeader("Jobs that Match your Skills");
    createMatchDivs(jobMatches);
}

function createMatchDivs(jobMatches) {
    console.log('asds')
    var number = jobMatches.length;
    for (var i = 0; i < number; i++) {
        var job = jobMatches[i];
        var bigContainer = document.createElement('div');
        bigContainer.className = 'jumbotron jumbotron-fluid text-center jobMatches';
        head = '';
        head += "<h1>" + job['position'] +' ' + job['percentage'] + '%' + "</h1></br>" + "<h2>" + job['company'] + "</h2></br>";
        head = head + '<h3>Skill Matches:</h3></br>';
        var num2 = job['matches'].length
        var matchString = '';
        matchString += "<p>";
        for (var j = 0; j < num2; j++) {
            if (j == 0) {
                matchString = matchString + job['matches'][j];
            }
            matchString = matchString + ',' + job['matches'][j];
        }
        matchString = matchString + '</p>';
        head = head + matchString;
        bigContainer.innerHTML = head;
        document.getElementsByClassName("dashboard")[0].appendChild(bigContainer);
    }
}
