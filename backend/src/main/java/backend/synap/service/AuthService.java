package backend.synap.service;

import backend.synap.model.Deliverer;
import backend.synap.model.Employee;
import backend.synap.repository.DelivererRepository;
import backend.synap.repository.EmployeeRepository;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final DelivererRepository delivererRepository;
    private final EmployeeRepository employeeRepository;


    public AuthService(DelivererRepository delivererRepository, EmployeeRepository employeeRepository) {
        this.delivererRepository = delivererRepository;
        this.employeeRepository = employeeRepository;
    }

    public Deliverer signUp(Deliverer deliverer) {
        if (delivererRepository.findByUsername(deliverer.getUsername()) == null) {
            delivererRepository.save(deliverer);
            return  deliverer;
        }
        return null;
    }

    public Employee signUp(Employee employee) {
        if (employeeRepository.findByUsername(employee.getUsername()) == null) {
            employeeRepository.save(employee);
            return employee;
        }
        return null;
    }

    public Deliverer loginDeliverer(String username, String password) {
        return delivererRepository.findByUsernameAndPassword(username, password);
    }

    public Employee loginEmployee(String username, String password) {
        return employeeRepository.findByUsernameAndPassword(username, password);
    }
}
