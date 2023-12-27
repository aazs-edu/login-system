(function () {

if (localStorage.getItem("userLogged")){
    document.querySelector("nav").classList.remove("d-none");
    document.querySelector("section").classList.remove("d-none");
    document.querySelector("section h3").innerHTML = `Welcome, ${localStorage.getItem("userLogged")}`

    document.getElementById("signoutBtn").addEventListener("click", function(){
        localStorage.removeItem("userLogged");
        window.location.replace("/index.html");
    })
}
else{
    document.querySelector("nav").classList.add("d-none");
    document.querySelector("section").classList.add("d-none");

    Swal.fire({
        title: "You must Sign in!",
        icon: "error",
        confirmButtonText: "Sign in",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.replace("/index.html");
        }
      });
    
      setTimeout(() => {
        window.location.replace("/index.html");
      }, 2000);
}

})();