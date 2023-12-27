"use strict";

(function () {
  localStorage.removeItem("userLogged");
})();

// Select Elements
const userNameInput = document.getElementById("userName");
const userEmailInput = document.getElementById("userEmail");
const userPasswordInput = document.getElementById("userPassword");
const InputsList = [userNameInput, userEmailInput, userPasswordInput];

const invalidEmailFeedback = document.getElementById("invalidEmailFeedback");

const signupBtn = document.getElementById("signupBtn");
signupBtn.addEventListener("click", adduser);


// Handle Clear Inputs
function clearInputs(){
  userNameInput.value = "";
  userEmailInput.value = "";
  userPasswordInput.value = "";
}


// Handle Add user
var usersList = [];
usersList = (localStorage.getItem("users") != null) ? JSON.parse(localStorage.getItem("users")) : [];

function adduser(){
  if (checkValidate()){
    let user = {
      userName: userNameInput.value,
      userEmail: userEmailInput.value,
      userPassword: userPasswordInput.value,
    }
    usersList.push(user);
    localStorage.setItem("users", JSON.stringify(usersList));
    clearInputs();
    InputsList.forEach(input => input.classList.remove("is-valid"));
    Swal.fire({
      toast: true,
      text: "Sign up successful",
      icon: "success",
      showConfirmButton: false,
      timer: 2000,
      position: "top",
    });
    setTimeout(() => {
      window.location.replace("/index.html");
    }, 1000);
  }
  else {
    Swal.fire({
      title: "Please enter a valid inputs!",
      icon: "warning"
    });
    InputsList.forEach(input => {if(!input.classList.contains("is-valid")) {input.classList.add("is-invalid")}});
  }
}


// Handle Input Validation
var nameRegexp = /^[A-z]{2,}[\w ]{1,}$/;
var emailRegexp = /^[^@]+@[^@]+\.[^@]+$/;
var passwordRegexp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

function validate(element, regexp){
  if (regexp.test(element.value)){
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  }
  else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

userNameInput.addEventListener("input", function () {
  validate(userNameInput, nameRegexp);
});
userEmailInput.addEventListener("input", function () {
  if (checkEmailValidate()){
    validate(userEmailInput, emailRegexp); 
  }   
});
userPasswordInput.addEventListener("input", function () {
  validate(userPasswordInput, passwordRegexp);
});

function checkEmailValidate(){
    let usersEmailList = usersList.map(user => user.userEmail);

    if (usersEmailList.includes(userEmailInput.value)){
      invalidEmailFeedback.innerHTML = "Email already exists!";
      userEmailInput.classList.remove("is-valid");
      userEmailInput.classList.add("is-invalid");
      return false;      
    } else{
      invalidEmailFeedback.innerHTML = "Your email must be in the format user@example.com";
      return true;
    }
   
}

function checkValidate(){
  return InputsList.every(input => input.classList.contains("is-valid"));
}