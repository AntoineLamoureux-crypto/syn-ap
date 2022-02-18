package backend.synap.model;


import lombok.Data;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.ArrayList;
import java.util.List;

@Data
@Document(collection = "deliverer")
public class Deliverer extends Entity {

    @Field
    @Indexed(unique = true)
    protected String username;

    @Field
    protected String password;

    @Field
    protected String firstName;

    @Field
    protected String lastName;

    @Field
    private List<Order> myOrders;

    @Field
    private int totalOrdersCompleted;

    @Field
    private double points;

    public Deliverer() {
        super();
        this.myOrders = new ArrayList<>();
    }

}
