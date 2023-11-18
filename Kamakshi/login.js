function login() {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    var loginData = {
        "login_id": username,
        "password": password
    };

    var apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment_auth.jsp";

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(loginData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }
        return response.text();
    })
    .then(bearerToken => {
        // Handle the success response
        console.log("Bearer Token:", bearerToken);

        // Save the Bearer token for future API calls (you may use localStorage or a cookie)
        // Example using localStorage:
        localStorage.setItem("bearerToken", bearerToken);

        // Redirect to the customer list page
        window.location.href = "customerList.jsp";
    })
    .catch(error => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);

        // Show error message to the user
        alert("Invalid credentials. Please try again.");
    });
}
