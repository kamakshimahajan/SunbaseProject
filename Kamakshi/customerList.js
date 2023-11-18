document.addEventListener("DOMContentLoaded", function () {
    // Load customer list using AJAX when the page is loaded
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
