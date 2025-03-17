package io.nology.backend.common.validators;

// import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import io.nology.backend.common.validators.constraints.IsMatchingEmailValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;
// import jakarta.validation.constraintvalidation.ValidationTarget;

// @Documented
@Target({ ElementType.TYPE, ElementType.ANNOTATION_TYPE })
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = IsMatchingEmailValidator.class)
public @interface IsMatchingEmail {
    String message() default "Email does not match";

    public Class<?>[] groups() default {};

    public Class<? extends Payload>[] payload() default {};

    // ValidationTarget[] value();

    String field();

    String matchingField();
}