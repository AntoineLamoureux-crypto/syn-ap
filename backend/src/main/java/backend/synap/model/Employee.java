package backend.synap.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;


@Data
@Document(collection = "employee")
public class Employee extends Entity {

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
    private String jobName;

    @Field
    private Boolean isAdmin;

    @Field
    private int totalOrdersAssigned;

    @Field
    private int totalOrdersAssignedCompleted;

    public Employee() {
        super();
        this.isAdmin = false;
    }
}
