package backend.synap.repository;

import backend.synap.model.Deliverer;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface DelivererRepository extends MongoRepository<Deliverer, String> {
    Deliverer findByUsernameAndPassword(String username, String password);
    Deliverer findByUsername(String username);
}
