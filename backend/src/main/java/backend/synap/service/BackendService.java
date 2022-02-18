package backend.synap.service;

import backend.synap.model.Deliverer;
import backend.synap.model.Employee;
import backend.synap.model.Order;
import backend.synap.repository.DelivererRepository;
import backend.synap.repository.EmployeeRepository;
import backend.synap.repository.OrderRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
        List<Order> orders = orderRepository.findAllByDeliveryDate(new Date());
        return orders.isEmpty() ? null : orders;
    }

    public List<Order> getOrdersByDate(Date date) {
        List<Order> orders = orderRepository.findAllByDeliveryDate(date);
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
}
