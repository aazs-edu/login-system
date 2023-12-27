"use strict";

(function () {
  localStorage.removeItem("userLogged");
})();

// Select Elements
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const InputsList = [userEmailInput, userPasswordInput];
const signinBtn = document.getElementById("signinBtn");
signinBtn.addEventListener("click", userSignin);
let userInfo;

// Handle Clear Inputs
function clearInputs(){
  userEmailInput.value = "";
  userPasswordInput.value = "";
}


// Handle user Sign in
var usersList = [];
usersList = (localStorage.getItem("users") != null) ? JSON.parse(localStorage.getItem("users")) : [];

function userSignin(){
  if (checkValidate()){
    clearInputs();
    InputsList.forEach(input => input.classList.remove("is-valid"));
    Swal.fire({
      toast: true,
      text: `Welcome, ${userInfo[0].userName}`,
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      position: "top",
    });
    localStorage.setItem("userLogged", `${userInfo[0].userName}`);
    setTimeout(() => {
      window.location.replace("/home.html");
    }, 1000);
  }
  else {
    Swal.fire({
      title: "Please enter a valid inputs!",
      icon: "warning"
    });
    InputsList.forEach(input => {if(!input.classList.contains("is-valid")) {input.classList.add("is-invalid")}});
    localStorage.removeItem("userLogged");
  }
}


// Handle Input Validation
function validate(element){
    userInfo = usersList.filter(user => user.userEmail === userEmailInput.value);
    if (element === userEmailInput){
      if (userInfo.length){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");   
      }
      else{
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
      }
    }

    if (element === userPasswordInput){
      if (userInfo.length){
        if(userInfo[0].userPassword === userPasswordInput.value){
          element.classList.add("is-valid");
          element.classList.remove("is-invalid"); 
        }
        else{
          document.getElementById("invalidPasswordFeedback").innerHTML = "Incorrect password"
          element.classList.add("is-invalid");
          element.classList.remove("is-valid");
        }
      }
      else{
        document.getElementById("invalidPasswordFeedback").innerHTML = "Enter Valid Email First"
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
      }
    }  
}

userEmailInput.addEventListener("input", function () {
    validate(userEmailInput);   
});
userPasswordInput.addEventListener("input", function () {
    validate(userPasswordInput);
});

function checkValidate(){
  return InputsList.every(input => input.classList.contains("is-valid"));
}