

function getLeads(callbackFn) {
    $.getJSON('/api/leads', function(data){
       callbackFn(data);
            });
}

function displayLeads(data) {
    for (index in data) {
        const contact = data[index].name + '<br/>' +
            data[index]["phone-number"] + '<br/>' +
            data[index].email + '<br/>' +
            data[index]["service-address"] + '<br/>' +
            data[index]["service-city"] + ', ' +
            data[index]["service-state"] + ' ' +
            data[index]["service-zip-code"] + '<br/>';

       for (index2 in data[index].jobs) {
          const contactJobs = 
            'Lead #' + data[index].jobs[index2]["job-number"] + '<br/>' +
            'Lead Type: ' + data[index].jobs[index2]["job-name"];

            $('body').append('<p>' + contact + contactJobs + '</p>');
        }  

            
    }  
}


function getAndDisplayLeads() {
    getLeads(displayLeads);
}

function addNewLead(form){
  form.submit(function(e) {
    e.preventDefault();
    
      //console.log(form.find("#js-name").val())
      const newLead = {
        "name": form.find("#js-name").val(),
        "email": form.find("#js-email").val(),
        "phone-number": form.find("#js-phone").val(),
        "service-address": form.find("#js-address").val(),
        "service-city": form.find("#js-city").val(),
        "service-state": form.find("#js-state").val(),
        "service-zip-code": form.find("#js-zip").val(),
        jobs: [{
            "job-name": form.find("#js-service").val()
            }]
        };

        $.ajax({
            url: '/api/leads',
            type: "POST",
            data: JSON.stringify(newLead),
            contentType: "application/json",
            complete: console.log('DONE')
        });

    this.reset();
    //leads.push(newLead);
    getAndDisplayLeads();
  });
}

$(function() {
    //getAndDisplayLeads();
    addNewLead($('#js-form'));
});
