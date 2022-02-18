package backend.synap.model;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.LocalDate;
import java.util.Date;

@Data
@Document(collection = "order")
public class Order extends Entity {

    @Field
    private String clientName;

    @Field
    private String deliveryNo;

    @Field
    private String deliveryAddress;

    @Field
    private String deliveryTime;

    @Field
    private Date deliveryDate;

    @Field
    private OrderStatus orderStatus;

    @Field
    private String delivererId;

    @DBRef
    private Employee createdBy;

    public enum OrderStatus {
        READY,
        DELIVERING,
        DELIVERED,
    }

    public Order() {
        this.orderStatus = OrderStatus.READY;
    }
}
