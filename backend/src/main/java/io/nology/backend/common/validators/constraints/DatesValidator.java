package io.nology.backend.common.validators.constraints;

import java.util.Date;

import org.springframework.beans.BeanWrapperImpl;

import io.nology.backend.common.validators.HasValidDates;
import io.nology.backend.employee.CreateEmployeeDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class DatesValidator implements ConstraintValidator<HasValidDates, Object> {

    private String startDate;
    private String endDate;
    private String isOngoing;

    @Override
    public void initialize(HasValidDates constraintAnnotation) {
        this.startDate = constraintAnnotation.startDate();
        this.endDate = constraintAnnotation.endDate();
        this.isOngoing = constraintAnnotation.isOngoing();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        if (value == null) {
            return true;
        }
        Date dateStart = (Date) new BeanWrapperImpl(value).getPropertyValue(startDate);
        Date dateEnd = (Date) new BeanWrapperImpl(value).getPropertyValue(endDate);
        Object ongoing = new BeanWrapperImpl(value).getPropertyValue(isOngoing);
        boolean isOngoing = ongoing == null ? false : ((Boolean) ongoing).booleanValue();
        // if (dateEnd == null) {
        // context.disableDefaultConstraintViolation();
        // context.buildConstraintViolationWithTemplate("Some shit is going on")
        // .addConstraintViolation();
        // return false;
        // }
        // return true;
        // Date dateStart = value.getStartDate();
        // Date dateEnd = value.getEndDate();
        if (dateStart == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Contract must have a start date")
                    .addConstraintViolation();
            return false;
        }
        // boolean isOngoing = value.getIsOngoing();
        if (isOngoing && dateEnd != null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Contract cannot be ongoing and have an end date")
                    .addConstraintViolation();
            return false;
        }
        if (!isOngoing && dateEnd == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Contract that is not ongoing must have an end date")
                    .addConstraintViolation();
            return false;
        }
        if (dateEnd != null && dateEnd.getTime() < dateStart.getTime()) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("End date cannot be earlier than start date")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }

}
