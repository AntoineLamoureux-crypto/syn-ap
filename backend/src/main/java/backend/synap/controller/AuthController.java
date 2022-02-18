package backend.synap.controller;

import backend.synap.model.Deliverer;
import backend.synap.model.Employee;
import backend.synap.service.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:3000")
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signUp/deliverer")
    public Deliverer signUpDeliverer(@RequestBody Deliverer deliverer) {
        return service.signUp(deliverer);
    }

    @PostMapping("/signUp/employee")
    public Employee signUpEmployee(@RequestBody Employee employee) {
        return service.signUp(employee);
    }

    @GetMapping("/login/deliverer/{username}/{password}")
    public Deliverer loginDeliverer(@PathVariable String username, @PathVariable String password) {
        return service.loginDeliverer(username, password);
    }

    @GetMapping("/login/employee/{username}/{password}")
    public Employee loginEmployee(@PathVariable String username, @PathVariable String password) {
        return service.loginEmployee(username, password);
    }
}
