import { tldsTokens } from './tldstokens.js';

let tldsArr = tldsTokens.toLowerCase().split("\n");

(function() {
    // https://dashboard.emailjs.com/admin/integration
    emailjs.init('user_hd6MEkKNrWYMfbi7hdzqU');
})();

// Check the format of an email address
let isValidEmailAddress = function(emailAddress){

    if(emailAddress.indexOf("@") == -1 || emailAddress.indexOf(".") == -1){
        document.getElementById("emailChecker").innerText = "Missing '@' or '.' symbol in email address";
        document.getElementById("emailChecker").style = "color: red";
        return false;
    }

    let emailArr = emailAddress.split("@");
    let domain = String(emailArr[1]).split(".")[0];
    let top_level_domain = String(emailArr[1]).split(".")[1];

    if(domain != "yahoo" && domain != "gmail" && domain != "mail" && domain != "outlook" && domain != "udel"){
        document.getElementById("emailChecker").innerText = "Invalid domain in email address";
        document.getElementById("emailChecker").style = "color: red";
        return false;
    }

    if(!tldsArr.includes(top_level_domain)){
        document.getElementById("emailChecker").innerText = "Invalid top-level domain in email address";
        document.getElementById("emailChecker").style = "color: red";
        return false;
    }

    if(domain == "udel"){
        if(top_level_domain != "edu"){
            document.getElementById("emailChecker").innerText = "Invalid domain and top-level domain combination in email address";
            document.getElementById("emailChecker").style = "color: red";
            return false;
        }
    }

    document.getElementById("emailChecker").innerText = "";
    return true;
};

// Check the format of a phone number
let isValidPhoneNumber = function(phoneNumber){
    let size = phoneNumber.length;

    if(size != 12){
        if(size < 12){
            document.getElementById("phoneChecker").innerText = "Phone number too short";
            document.getElementById("phoneChecker").style = "color: red";
        }
        else{
            document.getElementById("phoneChecker").innerText = "Phone number too long";
            document.getElementById("phoneChecker").style = "color: red"; 
        }
        return false;
    }

    for(let i = 0; i < size; i++){
        let currStr = String(phoneNumber.charAt(i));
        if(i != 3 && i != 7){
            if(isNaN(currStr)){
                document.getElementById("phoneChecker").innerText = "Invalid character found in phone number";
                document.getElementById("phoneChecker").style = "color: red";
                return false;
            }
        }
        else{
            if(currStr != "-"){
                document.getElementById("phoneChecker").innerText = "Missing '-' in phone number";
                document.getElementById("phoneChecker").style = "color: red";
                return false;
            }
        }
    }

    document.getElementById("phoneChecker").innerText = "";
    return true;
}

document.getElementById("contact_form").onsubmit = function(){
    let lName = String(document.getElementById("user_lname").value).trim();
    let lNameSize = lName.length;

    let fName = String(document.getElementById("user_fname").value).trim();
    let fNameSize = fName.length;

    let email = String(document.getElementById("user_email").value).trim();
    let emailSize = email.length;

    let phone = String(document.getElementById("user_phone").value).trim();
    let phoneSize = phone.length;

    let message = String(document.getElementById("user_message").value).trim();
    let messageSize = message.length;

    // Check for null field values
    if(lNameSize == 0 || fNameSize == 0 || emailSize == 0 || phoneSize == 0 || messageSize == 0){
        if(lNameSize == 0){
            document.getElementById("lastNameChecker").innerText = "Empty last name field";
            document.getElementById("lastNameChecker").style = "color: red";
        }
        else{
            document.getElementById("lastNameChecker").innerText = "";
        }

        if(fNameSize == 0){
            document.getElementById("firstNameChecker").innerText = "Empty first name field";
            document.getElementById("firstNameChecker").style = "color: red";
        }
        else{
            document.getElementById("firstNameChecker").innerText = "";
        }

        if(emailSize == 0){
            document.getElementById("emailChecker").innerText = "Empty email address field";
            document.getElementById("emailChecker").style = "color: red";
        }
        else{
            document.getElementById("emailChecker").innerText = "";
            isValidEmailAddress(email);
        }

        if(phoneSize == 0){
            document.getElementById("phoneChecker").innerText = "Empty phone number field";
            document.getElementById("phoneChecker").style = "color: red";
        }
        else{
            document.getElementById("phoneChecker").innerText = "";
            isValidPhoneNumber(phone);
        }

        if(messageSize == 0){
            document.getElementById("messageChecker").innerText = "Empty message field";
            document.getElementById("messageChecker").style = "color: red";
        }
        else{
            document.getElementById("messageChecker").innerText = "";
        }
        document.getElementById("successMessage").innerText = "";
        return false;
    }
    else{
        // Making sure that no errors are rendered on the website even after having no null field values
        document.getElementById("lastNameChecker").innerText = "";
        document.getElementById("firstNameChecker").innerText = "";
        document.getElementById("emailChecker").innerText = "";
        document.getElementById("phoneChecker").innerText = "";
        document.getElementById("messageChecker").innerText = "";
    }

    // Check for valid phone number format
    if(isValidPhoneNumber(phone)){

        // Check for valid email address format after phone
        if(isValidEmailAddress(email)){
            document.getElementById("successMessage").innerText = "SUCCESS!!!";

            // Send an email using EmailJS
            emailjs.send("contact_service","contact_form",{
                to_name: "Raj Trivedi",
                from_name: fName + " " + lName,
                message: message,
                user_email: email,
                contact_number: phone,
            });
            return false;
        }
    }

    document.getElementById("successMessage").innerText = "";
    return false;
};