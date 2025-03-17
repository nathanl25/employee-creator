package io.nology.backend.common.validators;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.nology.backend.common.validators.constraints.IsLowercaseValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Target({ ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsLowercaseValidator.class)
public @interface IsLowercase {

    String message() default "Field is not lowercase";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};
}
