package io.nology.backend.common.validators.constraints;

import org.springframework.beans.BeanWrapperImpl;

import io.nology.backend.common.validators.IsMatchingEmail;
import io.nology.backend.employee.CreateEmployeeDTO;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class IsMatchingEmailValidator implements ConstraintValidator<IsMatchingEmail, Object> {

    private String field;
    private String matchingField;

    @Override
    public void initialize(IsMatchingEmail constraintAnnotation) {
        this.field = constraintAnnotation.field();
        this.matchingField = constraintAnnotation.matchingField();
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        // if (!value.getEmail().equals(value.getEmailConfirmation())) {
        // return false;
        // }
        if (value == null) {
            return true;
        }
        Object valueA = new BeanWrapperImpl(value).getPropertyValue(field);
        Object valueB = new BeanWrapperImpl(value).getPropertyValue(matchingField);
        if (valueA == null && valueA == null) {
            return true;
        }
        if (valueA == null || valueB == null) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Email fields must not be empty")
                    .addConstraintViolation();
            return false;
        }
        if (!valueA.equals(valueB)) {
            context.disableDefaultConstraintViolation();
            context.buildConstraintViolationWithTemplate("Entered emails do not match")
                    .addConstraintViolation();
            return false;
        }
        return true;
    }

}