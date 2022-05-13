package backend.synap.service;

import backend.synap.model.Deliverer;
import backend.synap.model.Employee;
import backend.synap.model.Order;
import backend.synap.repository.DelivererRepository;
import backend.synap.repository.EmployeeRepository;
import backend.synap.repository.OrderRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDate;

import java.util.*;

@Service
public class BackendService {
    private final OrderRepository orderRepository;

    private final EmployeeRepository employeeRepository;

    private final DelivererRepository delivererRepository;

    public BackendService(OrderRepository orderRepository, EmployeeRepository employeeRepository, DelivererRepository delivererRepository) {
        this.orderRepository = orderRepository;
        this.employeeRepository = employeeRepository;
        this.delivererRepository = delivererRepository;
    }

    public Order addOrder(Order order) {
        Employee employee = order.getCreatedBy();
        employee.setTotalOrdersAssigned(employee.getTotalOrdersAssigned() + 1);
        Optional<Deliverer> optionalDeliverer = delivererRepository.findById(order.getDelivererId());
        Deliverer deliverer = optionalDeliverer.get();
        deliverer.setPoints(deliverer.getPoints() + 200);
        delivererRepository.save(deliverer);
        employeeRepository.save(employee);
        return orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        List<Order> orders = orderRepository.findAll();
        return orders.isEmpty() ? null : orders;
    }

    public List<Order> getTodayOrders() {
        List<Order> orders = orderRepository.findAllByDeliveryDateEquals(new Date());
        return orders.isEmpty() ? null : orders;
    }

    public List<Order> getOrdersByDate(Date date) {
        List<Order> orders = orderRepository.findAllByDeliveryDateEquals(date);
        return orders.isEmpty() ? null : orders;
    }

    public Order markOrderDelivering(String id) {
        Optional<Order> order = orderRepository.findById(id);
        Order updatedOrder = order.get();
        updatedOrder.setOrderStatus(Order.OrderStatus.DELIVERING);
        orderRepository.save(updatedOrder);
        return updatedOrder;
    }

    public Order markOrderDelivered(String id) {
        Optional<Order> order = orderRepository.findById(id);
        Order updatedOrder = order.get();
        String deliverId = updatedOrder.getDelivererId();
        Optional<Deliverer> delivererOptional = delivererRepository.findById(deliverId);
        Deliverer deliverer = delivererOptional.get();
        deliverer.setTotalOrdersCompleted(deliverer.getTotalOrdersCompleted() + 1);
        deliverer.setPoints(deliverer.getPoints() + 1);
        delivererRepository.save(deliverer);
        Employee employee = updatedOrder.getCreatedBy();
        employee.setTotalOrdersAssignedCompleted(employee.getTotalOrdersAssignedCompleted() + 1);
        employeeRepository.save(employee);
        updatedOrder.setOrderStatus(Order.OrderStatus.DELIVERED);
        orderRepository.save(updatedOrder);
        return updatedOrder;
    }

    public List<Order> getMyOrders(String id) {
        List<Order> myOrders = orderRepository.findAllByDelivererId(id);
        return myOrders.isEmpty() ? null : myOrders;
    }


    public List<Deliverer> getAllDeliverers() {
        List<Deliverer> deliverersList = delivererRepository.findAll();
        return deliverersList.isEmpty() ? null : deliverersList;
    }

    public List<String> getDelivererStats(String delivererId) {
        List<String> statsList = new ArrayList<>();
        Optional<Deliverer> deliverer = delivererRepository.findById(delivererId);
        Deliverer currentDeliverer = deliverer.get();
        statsList.add(String.valueOf(currentDeliverer.getTotalOrdersCompleted()));
        statsList.add(String.valueOf(currentDeliverer.getMyOrders()));
        statsList.add(String.valueOf(currentDeliverer.getPoints()));
        return statsList;
    }

    public List<String> getEmployeeStats(Employee employee) {
        List<String> statsList = new ArrayList<>();
        Employee currentEmployee = employeeRepository.findByUsername(employee.getUsername());
        statsList.add(String.valueOf(currentEmployee.getTotalOrdersAssigned()));
        statsList.add( String.valueOf(currentEmployee.getTotalOrdersAssignedCompleted()));
        return statsList;
    }

    public List<String> getGeneralStats() {
        List<String> statsList = new ArrayList<>();
        int totalOrders = orderRepository.findAll().size();
        Date referenceDate = new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(referenceDate);
        c.add(Calendar.MONTH, -1);
        int totalOrdersPasMonth = orderRepository.findAllByDeliveryDateAfter(c.getTime()).size();
        Calendar c2 = Calendar.getInstance();
        c2.setTime(referenceDate);
        int totalOrdersToday = orderRepository.findAllByDeliveryDateEquals(c2.getTime()).size();
        statsList.add(String.valueOf(totalOrders));
        statsList.add(String.valueOf(totalOrdersToday));
        statsList.add(String.valueOf(totalOrdersPasMonth));
        return statsList;
    }
}
