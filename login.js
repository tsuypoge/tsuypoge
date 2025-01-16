document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    // For demo purposes, the correct username is "user" and password is "password"
    if (username === "user" && password === "password") {
        alert("Login Successful!");
        window.location.href = "welcome.html";  // Redirect to a post-login page
    } else {
        document.getElementById("login-error-message").style.display = "block";
    }
});
