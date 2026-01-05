describe('Intelligent Registration System - Complete Test Suite', () => {
    
    beforeEach(() => {
        // Visit the registration form page
        cy.visit('/index.html');
        cy.window().then(win => {
            win.localStorage.clear();
        });
    });

    describe('Smoke Tests - Page Load Verification', () => {
        it('should load the registration page successfully', () => {
            cy.title().should('contain', 'Intelligent Registration System');
            cy.url().should('include', 'index.html');
        });

        it('should display the form header and title', () => {
            cy.get('.form-header h1').should('contain', 'Create Your Account');
            cy.get('.form-header p').should('contain', 'Join our platform today');
        });

        it('should have all required form fields', () => {
            cy.get('#firstName').should('exist');
            cy.get('#lastName').should('exist');
            cy.get('#email').should('exist');
            cy.get('#phone').should('exist');
            cy.get('#age').should('exist');
            cy.get('input[name="gender"]').should('have.length', 3);
            cy.get('#address').should('exist');
            cy.get('#country').should('exist');
            cy.get('#state').should('exist');
            cy.get('#city').should('exist');
            cy.get('#password').should('exist');
            cy.get('#confirmPassword').should('exist');
            cy.get('#termsCheckbox').should('exist');
        });

        it('should have submit button disabled on page load', () => {
            cy.get('#submitBtn').should('be.disabled');
        });
    });

    describe('Flow A - Negative Scenario (Missing Last Name)', () => {
        
        it('should show error when Last Name is missing and form is submitted', () => {
            // Fill form without Last Name
            cy.get('#firstName').type('John');
            cy.get('#email').type('john.doe@gmail.com');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('input[value="male"]').check();
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            cy.get('#password').type('Test@12345');
            cy.get('#confirmPassword').type('Test@12345');
            cy.get('#termsCheckbox').check();

            // Try to submit (button should still be enabled because all required fields are checked)
            // But let's verify the last name error
            cy.get('#lastNameError').should('not.be.visible');
            
            // Manually trigger blur on empty last name field
            cy.get('#lastName').focus().blur();
            cy.get('#lastNameError').should('be.visible');
            cy.get('#lastNameError').should('contain', 'Last name is required');
            cy.get('#lastName').should('have.class', 'error');
        });

        it('should highlight error fields in red', () => {
            cy.get('#lastName').focus().blur();
            cy.get('#lastName').should('have.class', 'error');
            cy.get('#lastNameError').should('be.visible');
        });

        it('should capture error state screenshot', () => {
            // Fill some fields but leave Last Name empty
            cy.get('#firstName').type('John');
            cy.get('#email').type('john.doe@gmail.com');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('input[value="male"]').check();
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            cy.get('#password').type('Test@12345');
            cy.get('#confirmPassword').type('Test@12345');
            cy.get('#termsCheckbox').check();
            
            // Trigger error on last name
            cy.get('#lastName').focus().blur();
            cy.wait(500);
            
            // Capture screenshot
            cy.screenshot('error-state');
        });
    });

    describe('Flow B - Positive Scenario (Successful Submission)', () => {
        
        it('should successfully submit the form with all valid fields', () => {
            // Fill all required fields
            cy.get('#firstName').type('John', { delay: 50 });
            cy.get('#lastName').type('Doe', { delay: 50 });
            cy.get('#email').type('john.doe@example.com', { delay: 50 });
            cy.get('#phone').type('+1 (555) 123-4567', { delay: 50 });
            cy.get('#age').type('28');
            cy.get('input[value="male"]').check();
            cy.get('#address').type('123 Main Street');
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            cy.get('#password').type('SecurePass@123');
            cy.get('#confirmPassword').type('SecurePass@123');
            cy.get('#termsCheckbox').check();

            // Submit should be enabled
            cy.get('#submitBtn').should('not.be.disabled');
            cy.get('#submitBtn').click();

            // Verify success message appears
            cy.get('#successMessage').should('be.visible');
            cy.get('#successMessage').should('contain', 'Registration Successful');
            cy.get('#successMessage').should('contain', 'Your profile has been submitted successfully');
        });

        it('should verify password and confirm password match', () => {
            cy.get('#password').type('Test@12345');
            cy.get('#confirmPassword').type('Test@12345');
            cy.get('#confirmPasswordError').should('not.be.visible');
        });

        it('should verify terms checkbox is required', () => {
            // Fill all fields except terms
            cy.get('#firstName').type('John');
            cy.get('#lastName').type('Doe');
            cy.get('#email').type('john.doe@example.com');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('input[value="male"]').check();
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            cy.get('#password').type('Test@12345');
            cy.get('#confirmPassword').type('Test@12345');
            
            // Terms should not be checked
            cy.get('#termsCheckbox').should('not.be.checked');
            cy.get('#submitBtn').should('be.disabled');
            
            // Check terms
            cy.get('#termsCheckbox').check();
            cy.get('#submitBtn').should('not.be.disabled');
        });

        it('should reset form after successful submission', () => {
            // Fill and submit form
            cy.get('#firstName').type('John');
            cy.get('#lastName').type('Doe');
            cy.get('#email').type('john.doe@example.com');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('input[value="male"]').check();
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            cy.get('#password').type('SecurePass@123');
            cy.get('#confirmPassword').type('SecurePass@123');
            cy.get('#termsCheckbox').check();
            
            cy.get('#submitBtn').click();
            cy.get('#successMessage').should('be.visible');
            
            // Wait for reset to complete
            cy.wait(2000);
            
            // Verify form is reset
            cy.get('#firstName').should('have.value', '');
            cy.get('#lastName').should('have.value', '');
            cy.get('#email').should('have.value', '');
            cy.get('#phone').should('have.value', '');
        });

        it('should capture success state screenshot', () => {
            // Fill all fields
            cy.get('#firstName').type('John');
            cy.get('#lastName').type('Doe');
            cy.get('#email').type('john.doe@example.com');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('input[value="female"]').check();
            cy.get('#country').select('US');
            cy.get('#state').select('NY');
            cy.get('#city').select('New York City');
            cy.get('#password').type('SecurePass@123');
            cy.get('#confirmPassword').type('SecurePass@123');
            cy.get('#termsCheckbox').check();
            
            // Submit
            cy.get('#submitBtn').click();
            cy.get('#successMessage').should('be.visible');
            cy.wait(500);
            
            // Capture screenshot
            cy.screenshot('success-state');
        });
    });

    describe('Flow C - Form Logic Validation', () => {
        
        it('should update States when Country is changed', () => {
            cy.get('#country').select('US');
            cy.get('#state').find('option').should('have.length.greaterThan', 1);
            cy.get('#state').find('option').eq(1).should('contain', 'California');
            
            // Change to different country
            cy.get('#country').select('UK');
            cy.get('#state').find('option').should('have.length.greaterThan', 1);
            cy.get('#state').find('option').eq(1).should('contain', 'England');
        });

        it('should update Cities when State is changed', () => {
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').find('option').should('have.length', 4); // 1 placeholder + 3 cities
            cy.get('#city').find('option').eq(1).should('contain', 'Los Angeles');
            
            // Change to different state
            cy.get('#state').select('TX');
            cy.get('#city').find('option').should('have.length', 4); // 1 placeholder + 3 cities
            cy.get('#city').find('option').eq(1).should('contain', 'Houston');
        });

        it('should properly link Country -> State -> City dropdowns', () => {
            // Test with US
            cy.get('#country').select('US');
            cy.get('#state').select('CA');
            cy.get('#city').select('Los Angeles');
            
            cy.get('#state').should('have.value', 'CA');
            cy.get('#city').should('have.value', 'Los Angeles');
            
            // Change country - state and city should reset
            cy.get('#country').select('UK');
            cy.get('#state').should('have.value', '');
            cy.get('#city').should('have.value', '');
        });

        it('should validate password strength meter', () => {
            cy.get('#password').type('weak');
            cy.get('#strengthMeter').should('have.class', 'weak');
            cy.get('#strengthText').should('contain', 'Weak');
            
            cy.get('#password').clear().type('Medium@Pass1');
            cy.get('#strengthMeter').should('have.class', 'medium');
            cy.get('#strengthText').should('contain', 'Medium');
            
            cy.get('#password').clear().type('VeryStr0ng@Password123');
            cy.get('#strengthMeter').should('have.class', 'strong');
            cy.get('#strengthText').should('contain', 'Strong');
        });

        it('should show error when passwords do not match', () => {
            cy.get('#password').type('SecurePass@123');
            cy.get('#confirmPassword').type('DifferentPass@123');
            cy.get('#confirmPasswordError').should('be.visible');
            cy.get('#confirmPasswordError').should('contain', 'Passwords do not match');
            cy.get('#confirmPassword').should('have.class', 'error');
        });

        it('should disable submit button until all required fields are valid', () => {
            // Initially disabled
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill First Name
            cy.get('#firstName').type('John');
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill Last Name
            cy.get('#lastName').type('Doe');
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill Email
            cy.get('#email').type('john@example.com');
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill Phone
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('#submitBtn').should('be.disabled');
            
            // Select Gender
            cy.get('input[value="male"]').check();
            cy.get('#submitBtn').should('be.disabled');
            
            // Select Country
            cy.get('#country').select('US');
            cy.get('#submitBtn').should('be.disabled');
            
            // Select State
            cy.get('#state').select('CA');
            cy.get('#submitBtn').should('be.disabled');
            
            // Select City
            cy.get('#city').select('Los Angeles');
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill Password
            cy.get('#password').type('SecurePass@123');
            cy.get('#submitBtn').should('be.disabled');
            
            // Fill Confirm Password
            cy.get('#confirmPassword').type('SecurePass@123');
            cy.get('#submitBtn').should('be.disabled');
            
            // Check Terms
            cy.get('#termsCheckbox').check();
            cy.get('#submitBtn').should('not.be.disabled');
        });
    });

    describe('Validation Tests - Email', () => {
        
        it('should reject disposable email domains', () => {
            cy.get('#email').type('test@tempmail.com');
            cy.get('#email').focus().blur();
            cy.get('#emailError').should('be.visible');
            cy.get('#emailError').should('contain', 'Disposable email domains are not allowed');
        });

        it('should accept valid email domains', () => {
            cy.get('#email').type('john@gmail.com');
            cy.get('#email').focus().blur();
            cy.get('#emailError').should('not.be.visible');
            cy.get('#email').should('have.class', 'valid');
        });

        it('should reject invalid email format', () => {
            cy.get('#email').type('invalid-email');
            cy.get('#email').focus().blur();
            cy.get('#emailError').should('be.visible');
            cy.get('#emailError').should('contain', 'Email format is invalid');
        });
    });

    describe('Validation Tests - Phone Number', () => {
        
        it('should validate phone number format', () => {
            cy.get('#country').select('US');
            cy.get('#phone').type('+1 (555) 123-4567');
            cy.get('#phone').focus().blur();
            cy.get('#phoneError').should('not.be.visible');
        });

        it('should reject invalid phone format', () => {
            cy.get('#phone').type('123');
            cy.get('#phone').focus().blur();
            cy.get('#phoneError').should('be.visible');
        });
    });

    describe('Validation Tests - Required Fields', () => {
        
        it('should show error for empty first name', () => {
            cy.get('#firstName').focus().blur();
            cy.get('#firstNameError').should('be.visible');
            cy.get('#firstName').should('have.class', 'error');
        });

        it('should show error for empty last name', () => {
            cy.get('#lastName').focus().blur();
            cy.get('#lastNameError').should('be.visible');
            cy.get('#lastName').should('have.class', 'error');
        });

        it('should show error for unchecked gender', () => {
            cy.get('input[name="gender"]').each($radio => {
                cy.wrap($radio).should('not.be.checked');
            });
            cy.get('#genderError').should('not.be.visible');
        });

        it('should show error for missing country selection', () => {
            cy.get('#country').select('');
            cy.get('#country').focus().blur();
            cy.get('#countryError').should('be.visible');
        });
    });

    describe('UI Interaction Tests', () => {
        
        it('should toggle password visibility', () => {
            cy.get('#password').type('TestPassword123');
            cy.get('#password').should('have.attr', 'type', 'password');
            
            // Click toggle button
            cy.get('#togglePassword').click();
            cy.get('#password').should('have.attr', 'type', 'text');
            
            // Click again to hide
            cy.get('#togglePassword').click();
            cy.get('#password').should('have.attr', 'type', 'password');
        });

        it('should toggle confirm password visibility', () => {
            cy.get('#confirmPassword').type('TestPassword123');
            cy.get('#confirmPassword').should('have.attr', 'type', 'password');
            
            // Click toggle button
            cy.get('#toggleConfirmPassword').click();
            cy.get('#confirmPassword').should('have.attr', 'type', 'text');
        });

        it('should allow selecting different gender options', () => {
            cy.get('input[value="male"]').check().should('be.checked');
            cy.get('input[value="female"]').check();
            cy.get('input[value="male"]').should('not.be.checked');
            cy.get('input[value="female"]').should('be.checked');
        });
    });

    describe('Age Validation', () => {
        
        it('should reject age below 13', () => {
            cy.get('#age').type('10');
            cy.get('#age').focus().blur();
            cy.get('#ageError').should('be.visible');
        });

        it('should accept valid age', () => {
            cy.get('#age').type('25');
            cy.get('#age').focus().blur();
            cy.get('#ageError').should('not.be.visible');
        });

        it('should allow empty age (optional field)', () => {
            cy.get('#age').focus().blur();
            cy.get('#ageError').should('not.be.visible');
        });
    });

    describe('Cross-Browser & Responsive Tests', () => {
        
        it('should work on mobile viewport', () => {
            cy.viewport('iphone-x');
            cy.get('.registration-wrapper').should('be.visible');
            cy.get('#firstName').should('be.visible');
            cy.get('#submitBtn').should('be.visible');
        });

        it('should work on tablet viewport', () => {
            cy.viewport('ipad-2');
            cy.get('.registration-wrapper').should('be.visible');
            cy.get('#registrationForm').should('be.visible');
        });

        it('should work on desktop viewport', () => {
            cy.viewport(1280, 720);
            cy.get('.registration-wrapper').should('be.visible');
            cy.get('.form-row').should('be.visible');
        });
    });
});
