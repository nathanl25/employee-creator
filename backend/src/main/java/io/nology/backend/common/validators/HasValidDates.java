package io.nology.backend.common.validators;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

// import java.util.Date;

import io.nology.backend.common.validators.constraints.DatesValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.TYPE, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = DatesValidator.class)
public @interface HasValidDates {
    String message() default "Invalid date";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};

    String startDate();

    String endDate();

    String isOngoing();
}
