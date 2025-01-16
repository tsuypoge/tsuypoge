document.getElementById("signup-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Simple validation check
    if (username === "" || email === "" || password === "") {
        document.getElementById("error-message").style.display = "block";
        document.getElementById("success-message").style.display = "none";
    } else {
        document.getElementById("error-message").style.display = "none";
        document.getElementById("success-message").style.display = "block";

        // Normally, you'd send the data to your backend server here for saving
        console.log("User signed up:", { username, email, password });

        // Clear form after submission
        setTimeout(() => {
            document.getElementById("signup-form").reset();
        }, 2000);
    }
});
