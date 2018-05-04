var cForm = $('#contactForm');
cForm.addEventListener('submit', contact, false);

function contact(e){
    // Prevent Default Form Submission
    e.preventDefault();

    var target = e.target || e.srcElement;
    var i = 0;
    var message = '';

    // Loop Through All Input Fields
    for(i = 0; i < target.length; ++i) {
        // only work with content of the message and the name
        if(target[i].name != 'body' ||  target[i].name != 'Name'){
           continue;
        }

        // Add Input Name and value followed by a line break
        message += target[i].name + ': ' + target[i].value + "\r\n";
     }
     // Modify the hidden body input field that is required for the mailto: scheme
     target.elements["message"].value = message;

     // Submit the form since we previously stopped it. May cause recursive loop in some browsers? Should research this.
     this.submit();
}