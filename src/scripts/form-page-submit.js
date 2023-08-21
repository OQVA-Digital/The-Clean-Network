
const handleSubmit = (e) => {
    e.preventDefault();
    let myForm = document.getElementById("form");
    let formData = new FormData(myForm);
    fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString(),
    })
        .then(() => success())
        .catch((error) => alert(error));
    };

    function success() {
        document.querySelector('button[type=submit]').innerHTML = 'Form successfully submitted!';

    }

    document.querySelector("form").addEventListener("submit", handleSubmit);