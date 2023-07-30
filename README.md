# 74897555-d5c9-4710-90a3-f8ffbd3c4b93
https://sonarcloud.io/summary/overall?id=examly-test_74897555-d5c9-4710-90a3-f8ffbd3c4b93

# Updating Cross-Origin URLs for React and Spring Boot Applications

To ensure smooth communication between your React frontend and Spring Boot backend, follow these steps to update the Cross-Origin URLs:

## Update Spring Boot Port URL in React

1. Open the React application codebase.
2. Navigate to `reactapp/src/utils/api.js`.
3. Find line number 3 and update the `BASE_URL` constant with the Spring Boot port URL.

Example:
```javascript
const BASE_URL = "http://localhost:8080"; // Replace this with your Spring Boot port URL
```

## Update React Port URL in Spring Boot

1. Open the Spring Boot application codebase.
2. Go to `springapp/src/main/java/com/example/springapp/auth` and open `AuthenticationController.java`.
3. Similarly, navigate to `springapp/src/main/java/com/example/springapp/controller` and open the following classes:
   - `CommunicationController.java`
   - `ProjectController.java`
   - `TaskController.java`
   - `UserController.java`

4. In each of the above controller classes, locate the `@CrossOrigin` annotation and update the URL with the React application's port URL.

Example:
```java
@CrossOrigin("http://localhost:3000") // Replace this with your React application port URL
@RestController
@RequestMapping("/api")
public class CommunicationController {
   // Controller code here
}
```

Additionally, in `springapp/src/main/java/com/example/springapp/SpringappApplication.java`, go to line 23 where you will find `.allowedOrigins("http://localhost:3000")`. Update this URL with your React application's port URL.

Note:
- Replace `http://localhost:8080` with your actual Spring Boot application's port URL.
- Replace `http://localhost:3000` with your actual React application's port URL.

By following these steps, you will enable Cross-Origin requests between your React frontend and Spring Boot backend applications, ensuring they work seamlessly together.

Best regards,
[Your Name]
[Your Position/Role]