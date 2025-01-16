document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simple check (replace this with your actual authentication logic)
    if (username === "user" && password === "password") {
        alert("Login Successful!");
        // Redirect to another page, if needed
        window.location.href = "success.html"; // Create a success.html page for post-login
    } else {
        document.getElementById("error-message").style.display = "block";
    }
});
