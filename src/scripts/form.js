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

function success() {
    
    submitBt.innerHTML = "Submitted successfully. Thank you!"

    submitBt.classList.add('submited')

    setTimeout(() => {
      submitBt.innerHTML = "Send again"
  
      submitBt.classList.remove('submited')
    }, 6000);
}
  
document.querySelector("form").addEventListener("submit", handleSubmit);


