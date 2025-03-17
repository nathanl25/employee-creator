package io.nology.backend.contract;

import java.util.Date;

import io.nology.backend.common.validators.HasValidDates;
import io.nology.backend.contract.Contract.EmploymentBasis;
import io.nology.backend.contract.Contract.EmploymentStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

@HasValidDates(startDate = "startDate", endDate = "endDate", isOngoing = "isOngoing")
public class CreateContractDTO implements ContractDTO {
    // @NotNull
    private Date startDate;

    // @NotNull
    private Date endDate;

    // @NotBlank
    // @NotNull
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

    public Date getStartDate() {
        return startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public boolean getIsOngoing() {
        return isOngoing;
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
