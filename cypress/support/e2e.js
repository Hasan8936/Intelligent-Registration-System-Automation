// Cypress Support File - Add custom commands and global configurations

// Disable uncaught exception handling for testing
Cypress.on('uncaught:exception', (err, runnable) => {
    // Return false to prevent Cypress from failing the test
    return false;
});

// Custom command to fill form
Cypress.Commands.add('fillRegistrationForm', (data = {}) => {
    const defaultData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        phone: '+1 (555) 123-4567',
        age: '28',
        gender: 'male',
        address: '123 Main Street',
        country: 'US',
        state: 'CA',
        city: 'Los Angeles',
        password: 'SecurePass@123',
        confirmPassword: 'SecurePass@123',
        termsCheckbox: true
    };

    const formData = { ...defaultData, ...data };

    if (formData.firstName) cy.get('#firstName').type(formData.firstName);
    if (formData.lastName) cy.get('#lastName').type(formData.lastName);
    if (formData.email) cy.get('#email').type(formData.email);
    if (formData.phone) cy.get('#phone').type(formData.phone);
    if (formData.age) cy.get('#age').type(formData.age);
    if (formData.gender) cy.get(`input[value="${formData.gender}"]`).check();
    if (formData.address) cy.get('#address').type(formData.address);
    if (formData.country) cy.get('#country').select(formData.country);
    if (formData.state) cy.get('#state').select(formData.state);
    if (formData.city) cy.get('#city').select(formData.city);
    if (formData.password) cy.get('#password').type(formData.password);
    if (formData.confirmPassword) cy.get('#confirmPassword').type(formData.confirmPassword);
    if (formData.termsCheckbox) cy.get('#termsCheckbox').check();
});

// Custom command to check form validation
Cypress.Commands.add('checkFieldError', (fieldName, shouldHaveError = true) => {
    const errorElement = cy.get(`#${fieldName}Error`);
    const field = cy.get(`#${fieldName}`);

    if (shouldHaveError) {
        errorElement.should('be.visible');
        field.should('have.class', 'error');
    } else {
        errorElement.should('not.be.visible');
        field.should('not.have.class', 'error');
    }
});

// Custom command to submit form
Cypress.Commands.add('submitForm', () => {
    cy.get('#submitBtn').click();
});

// Custom command to check success message
Cypress.Commands.add('checkSuccessMessage', () => {
    cy.get('#successMessage').should('be.visible');
    cy.get('#successMessage').should('contain', 'Registration Successful');
});
