var firstNameError = document.getElementById("name-error");
var emailError = document.getElementById("email-error")
var passwordError = document.getElementById("password-error")
var submitError = document.getElementById("submit-error");




function validateName(){
    var fname = document.getElementById("contact-name").value;

    if(fname.length ==0){
        firstNameError.innerHTML ='First Name required';
        return false;
    }
    if(!fname.match(/(^[a-zA-Z][a-zA-Z\s]{0,20}[a-zA-Z]$)/)){

        firstNameError.innerHTML = 'Invalid name';
        return false;
    }
    else{
    firstNameError.innerHTML = '' ;
    return true ;
    }
}


function validateEmail(){
    var email = document.getElementById("contact-email").value;
    if(email.length==0){
        emailError.innerHTML="Email required";
        return false;
    }
    if(!email.match(/^[a-zA-Z0-9.!#$%&’+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/)){

        emailError.innerHTML = 'Email Invalid';
        return false;

    }
    emailError.innerHTML="";
    return true;
}

function validatePassword(){
    var password = document.getElementById("contact-password").value;
    if(password.length==0){
        passwordError.innerHTML="Password required";
        return false;
    }
    if(!password.match(/^\d{4}$/)){

        passwordError.innerHTML = 'Only 4 digits';
        return false;

    }
    passwordError.innerHTML="";
    return true;
}

function validateForm(){
    if(!validateName()  || !validateEmail() || !validatePassword() ){
    
        submitError.innerHTML = 'Please fill the fields to submit';
        setTimeout(function(){submitError.style.display = 'none';} , 4000)
        return false;
    }

}



