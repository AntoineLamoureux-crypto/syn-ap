package backend.synap.repository;
import backend.synap.model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.Date;
import java.util.List;

@Repository
public interface OrderRepository extends MongoRepository<Order, String> {
    List<Order> findAllByDelivererId(String delivererId);
    List<Order> findAllByDeliveryDateEquals(Date date);
    List<Order> findAllByDeliveryDateAfter(Date date);
}