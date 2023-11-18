@WebServlet("/authenticate")
public class AuthenticationServlet extends HttpServlet {
    private AuthenticationService authService;

    @Override
    public void init() throws ServletException {
        // Initialize your AuthenticationService
        this.authService = new AuthenticationService();
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String loginId = request.getParameter("login_id");
        String password = request.getParameter("password");

        // Authenticate user and get the Bearer token
        String bearerToken = authService.authenticateUser(loginId, password);

        if (bearerToken != null) {
            // Authentication successful
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("text/plain");
            response.getWriter().write(bearerToken);
        } else {
            // Authentication failed
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("Invalid Authorization");
        }
    }
}
