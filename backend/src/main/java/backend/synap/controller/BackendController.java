package backend.synap.controller;

import backend.synap.model.Deliverer;
import backend.synap.model.Order;
import backend.synap.service.BackendService;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:3000")
public class BackendController {

    private final BackendService service;

    public BackendController(BackendService service) {
        this.service = service;
    }

    @PostMapping("/addNewOrder")
    public Order addNewOrder(@RequestBody Order order) {
        return service.addOrder(order);
    }

    @PostMapping("/modifyOrder/status/delivering/{id}")
    public Order modifyOrderStatusDelivering(@PathVariable String id) {
        return service.markOrderDelivering(id);
    }

    @PostMapping("/modifyOrder/status/delivered/{id}")
    public Order modifyOrderStatusDelivered(@PathVariable String id) {
        return service.markOrderDelivered(id);
    }

    @GetMapping("/getTodayOrders")
    public List<Order> getTodayOrders() {
        return service.getTodayOrders();
    }

    @GetMapping("/getOrdersByDate/{date}")
    public List<Order> getOrdersByDate(@PathVariable Date date) {
        return service.getOrdersByDate(date);
    }


    @GetMapping("/getMyOrders/{id}")
    public List<Order> getMyOrders(@PathVariable String id) {
        return service.getMyOrders(id);
    }

    @GetMapping("/getAllOrders")
    public List<Order> getAllOrders() {
        return service.getAllOrders();
    }

    @GetMapping("/getAllDeliverers")
    public List<Deliverer> getAllDeliverers() {
        return service.getAllDeliverers();
    }
}
