---
---


let form = document.querySelector("#password-form");

form.addEventListener("submit", function(e) {
  let expando = document.querySelector("#expando");

  let password = document.querySelector("#password")
  let message = document.querySelector("#password-form__flash");
  
  window.crypto.subtle.digest("SHA-256", 
        (new TextEncoder()).encode(password.value))
  .then(function(digest) {
    let hash = Array.from(new Uint8Array(digest))
                .map(val => val.toString(16))
                .join('');
    if (hash == "{{ site.resources_password }}") {
      message.classList.remove("wrong");
      expando.classList.add("open");
    } else {
      password.classList.remove("wrong");
      setTimeout(function() {
        password.classList.add("wrong");
      }, 10);
      message.classList.add("wrong");
    }
  });

  e.preventDefault();
});