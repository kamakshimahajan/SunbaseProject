@WebServlet("/customer")
public class CustomerServlet extends HttpServlet {
    @WebServlet("/customer")
    public class CustomerServlet extends HttpServlet {
        private CustomerService customerService;
    
        @Override
        public void init() throws ServletException {
            // Initialize your CustomerService (which should interact with your database)
            this.customerService = new CustomerService();
        }
    
        protected void doGet(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            String cmd = request.getParameter("cmd");
    
            if ("get_customer_list".equals(cmd)) {
                getCustomerList(request, response);
            } else {
                // Handle invalid command
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("Invalid Command");
            }
        }
    
        protected void doPost(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            String cmd = request.getParameter("cmd");
    
            switch (cmd) {
                case "create":
                    createCustomer(request, response);
                    break;
                case "update":
                    updateCustomer(request, response);
                    break;
                case "delete":
                    deleteCustomer(request, response);
                    break;
                default:
                    // Handle invalid command
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    response.getWriter().write("Invalid Command");
            }
        }
    
        private void getCustomerList(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            // Retrieve customer list from the service
            List<Customer> customers = customerService.getAllCustomers();
    
            // Convert the list to JSON and send it as the response
            response.setContentType("application/json");
            response.getWriter().write(new Gson().toJson(customers));
        }
    
        private void createCustomer(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            // Retrieve customer data from the request parameters
            // Validate input data
    
            Customer newCustomer = new Customer(/* Populate with request parameters */);
    
            // Call the service to create the customer
            boolean success = customerService.createCustomer(newCustomer);
    
            if (success) {
                response.setStatus(HttpServletResponse.SC_CREATED);
                response.getWriter().write("Successfully Created");
            } else {
                response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                response.getWriter().write("First Name or Last Name is missing");
            }
        }
    
        private void updateCustomer(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            // Retrieve customer data from the request parameters
            // Validate input data
    
            String uuid = request.getParameter("uuid");
            Customer updatedCustomer = new Customer(/* Populate with request parameters */);
    
            // Call the service to update the customer
            boolean success = customerService.updateCustomer(uuid, updatedCustomer);
    
            if (success) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("Successfully Updated");
            } else {
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("UUID not found");
            }
        }
    
        private void deleteCustomer(HttpServletRequest request, HttpServletResponse response)
                throws ServletException, IOException {
            String uuid = request.getParameter("uuid");
    
            // Call the service to delete the customer
            boolean success = customerService.deleteCustomer(uuid);
    
            if (success) {
                response.setStatus(HttpServletResponse.SC_OK);
                response.getWriter().write("Successfully deleted");
            } else {
                // Handle different error cases (UUID not found, internal server error, etc.)
                response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                response.getWriter().write("Error Not deleted");
            }
        }
    }
    
}
