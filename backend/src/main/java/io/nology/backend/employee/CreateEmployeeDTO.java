package io.nology.backend.employee;

import java.util.Date;

import io.nology.backend.common.validators.HasValidDates;
import io.nology.backend.common.validators.IsMatchingEmail;
import io.nology.backend.contract.Contract.EmploymentBasis;
import io.nology.backend.contract.Contract.EmploymentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
// import io.nology.backend.common.validators.Matches;
import jakarta.validation.constraints.AssertTrue;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
// import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
// import jakarta.validation.constraints.PastOrPresent;
import jakarta.validation.constraints.Size;

// @Matches(field = "email", matchingField = "emailConfirmation", message = "Password Confirm does not Match Password")
@HasValidDates(startDate = "startDate", endDate = "endDate", isOngoing = "isOngoing")
@IsMatchingEmail(field = "email", matchingField = "emailConfirmation", message = "test")
public class CreateEmployeeDTO {

    @NotBlank
    @Size(min = 3, max = 20, message = "First Name must be between 3 and 20 characters")
    private String firstName;

    @Size(min = 3, max = 20, message = "Middle Name must be between 3 and 20 characters")
    private String middleName;

    @NotBlank
    @Size(min = 3, max = 20, message = "Last Name must be between 3 and 20 characters")
    private String lastName;

    @NotBlank
    @Email
    private String email;

    @NotBlank
    @Email
    private String emailConfirmation;

    @NotBlank
    private String mobile;

    @NotBlank
    private String address;

    // @NotNull
    private Date startDate;

    // @NotNull
    private Date endDate;

    // @NotBlank
    @NotNull
    private boolean isOngoing;

    @NotNull
    @Min(1)
    @Max(40)
    private int weeklyHours;

    // @NotBlank
    @NotNull
    @Enumerated(EnumType.STRING)
    private EmploymentStatus status;

    // @NotBlank
    @NotNull
    @Enumerated(EnumType.STRING)
    private EmploymentBasis basis;

    public boolean getIsOngoing() {
        return isOngoing;
    }

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

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public int getWeeklyHours() {
        return weeklyHours;
    }

    public EmploymentStatus getStatus() {
        return status;
    }

    public EmploymentBasis getBasis() {
        return basis;
    }
}
