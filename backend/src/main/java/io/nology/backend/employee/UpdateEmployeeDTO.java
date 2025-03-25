package io.nology.backend.employee;

import io.nology.backend.common.validators.IsMatchingEmail;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

@IsMatchingEmail(field = "email", matchingField = "emailConfirmation", message = "test")
public class UpdateEmployeeDTO {

    @Size(min = 3, max = 20, message = "First Name must be between 3 and 20 characters")
    private String firstName;

    @Size(min = 1, max = 20, message = "Middle Name must be between 1 and 20 characters")
    private String middleName;

    @Size(min = 3, max = 20, message = "Last Name must be between 3 and 20 characters")
    private String lastName;

    @Email
    private String email;

    @Email
    private String emailConfirmation;

    @Size(min = 10, max = 10, message = "Mobile must be 10 characters long")
    private String mobile;

    @Size(min = 10, max = 80, message = "Address must be between 3 and 20 characters")
    private String address;

    public String getFirstName() {
        return firstName;
    }

    public String getMiddleName() {
        return middleName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getEmail() {
        return email;
    }

    public String getEmailConfirmation() {
        return emailConfirmation;
    }

    public String getMobile() {
        return mobile;
    }

    public String getAddress() {
        return address;
    }
}
