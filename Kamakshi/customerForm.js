function saveCustomer() {
    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var street = document.getElementById("street").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var state = document.getElementById("state").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;

    var customerData = {
        "first_name": firstName,
        "last_name": lastName,
        "street": street,
        "address": address,
        "city": city,
        "state": state,
        "email": email,
        "phone": phone
    };

    // Check whether it's a new customer or an update
    var cmd = (customerId) ? "update" : "create";
    var apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=" + cmd;

    // If it's an update, include the customer ID in the request
    if (cmd === "update") {
        apiUrl += "&uuid=" + customerId;
    }

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + yourBearerToken // Replace with the actual token
        },
        body: JSON.stringify(customerData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Handle the success response
        console.log(data); // Log the response data

        // Show success message to the user
        alert("Customer saved successfully!");

        // Reload the customer list
        loadCustomerList();
    })
    .catch(error => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);

        // Show error message to the user
        alert("Error saving customer. Please try again.");
    });
}

// Function to load the customer list
document.addEventListener("DOMContentLoaded", function () {
    // Load customer list when the page is loaded
    loadCustomerList();
});

// Function to load the customer list
function loadCustomerList() {
    var apiUrl = "https://qa2.sunbasedata.com/sunbase/portal/api/assignment.jsp?cmd=get_customer_list";

    fetch(apiUrl, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + yourBearerToken // Replace with the actual token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok: " + response.status);
        }
        return response.json();
    })
    .then(data => {
        // Handle the success response
        console.log(data); // Log the response data

        // Update the customer list in the UI
        updateCustomerList(data);
    })
    .catch(error => {
        // Handle errors
        console.error("There was a problem with the fetch operation:", error);

        // Show error message to the user
        alert("Error loading customer list. Please try again.");
    });
}

// Function to update the customer list in the UI
function updateCustomerList(customerList) {
    var tableBody = document.getElementById("customerTableBody");
    tableBody.innerHTML = ""; // Clear existing data

    customerList.forEach(function (customer) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        // Add more cells as needed

        cell1.innerHTML = customer.first_name;
        cell2.innerHTML = customer.last_name;
        cell3.innerHTML = customer.email;
        // Populate other cells as needed
    });
}

