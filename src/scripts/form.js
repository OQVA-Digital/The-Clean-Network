const handleSubmit = (event) => {
    event.preventDefault();
  
    const myForm = event.target;
    const formData = new FormData(myForm);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => success())
      .catch((error) => alert(error));
  };

const submitBt = document.querySelector('form button[type="submit"]')

const docLanguage = document.documentElement.lang

function success() {
    
    submitBt.innerHTML = "Submitted successfully. Thank you!"

    submitBt.classList.add('submitted')

    setTimeout(() => {
        submitBt.innerHTML = "Submit again"
  
      submitBt.classList.remove('submitted')
    }, 6000);
}
  
document.querySelector("form").addEventListener("submit", handleSubmit);


