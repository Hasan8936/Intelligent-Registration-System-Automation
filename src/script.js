// ============ DISPOSABLE DOMAINS LIST ============
const DISPOSABLE_DOMAINS = [
    'tempmail.com', 'temp-mail.org', 'throwaway.email', '10minutemail.com',
    'mailinator.com', 'trashmail.com', 'yopmail.com', 'fakeinbox.com',
    'maildrop.cc', 'sharklasers.com', 'grr.la', 'spam4.me'
];

// ============ COUNTRY DATA ============
const COUNTRY_DATA = {
    US: {
        name: 'United States',
        code: '+1',
        states: {
            CA: { name: 'California', cities: ['Los Angeles', 'San Francisco', 'San Diego'] },
            TX: { name: 'Texas', cities: ['Houston', 'Dallas', 'Austin'] },
            NY: { name: 'New York', cities: ['New York City', 'Buffalo', 'Albany'] },
            FL: { name: 'Florida', cities: ['Miami', 'Orlando', 'Tampa'] },
        }
    },
    CA: {
        name: 'Canada',
        code: '+1',
        states: {
            ON: { name: 'Ontario', cities: ['Toronto', 'Ottawa', 'Hamilton'] },
            BC: { name: 'British Columbia', cities: ['Vancouver', 'Victoria', 'Surrey'] },
            QC: { name: 'Quebec', cities: ['Montreal', 'Quebec City', 'Laval'] },
        }
    },
    UK: {
        name: 'United Kingdom',
        code: '+44',
        states: {
            ENG: { name: 'England', cities: ['London', 'Manchester', 'Birmingham'] },
            SCT: { name: 'Scotland', cities: ['Edinburgh', 'Glasgow', 'Aberdeen'] },
            WLS: { name: 'Wales', cities: ['Cardiff', 'Swansea', 'Newport'] },
        }
    },
    AU: {
        name: 'Australia',
        code: '+61',
        states: {
            NSW: { name: 'New South Wales', cities: ['Sydney', 'Newcastle', 'Wollongong'] },
            VIC: { name: 'Victoria', cities: ['Melbourne', 'Geelong', 'Ballarat'] },
            QLD: { name: 'Queensland', cities: ['Brisbane', 'Gold Coast', 'Cairns'] },
        }
    },
    IN: {
        name: 'India',
        code: '+91',
        states: {
            DL: { name: 'Delhi', cities: ['New Delhi', 'Noida', 'Faridabad'] },
            MH: { name: 'Maharashtra', cities: ['Mumbai', 'Pune', 'Nagpur'] },
            KA: { name: 'Karnataka', cities: ['Bangalore', 'Mangalore', 'Mysore'] },
        }
    },
    DE: {
        name: 'Germany',
        code: '+49',
        states: {
            BAY: { name: 'Bavaria', cities: ['Munich', 'Nuremberg', 'Regensburg'] },
            BER: { name: 'Berlin', cities: ['Berlin', 'Charlottenburg', 'Mitte'] },
            NRW: { name: 'North Rhine-Westphalia', cities: ['Cologne', 'Düsseldorf', 'Dortmund'] },
        }
    },
    FR: {
        name: 'France',
        code: '+33',
        states: {
            IDF: { name: 'Île-de-France', cities: ['Paris', 'Boulogne-Billancourt', 'Saint-Denis'] },
            ARA: { name: 'Auvergne-Rhône-Alpes', cities: ['Lyon', 'Grenoble', 'Saint-Étienne'] },
            OCC: { name: 'Occitanie', cities: ['Toulouse', 'Montpellier', 'Nîmes'] },
        }
    }
};

// ============ FORM ELEMENTS ============
const form = document.getElementById('registrationForm');
const submitBtn = document.getElementById('submitBtn');
const globalErrorMessage = document.getElementById('globalErrorMessage');
const successMessage = document.getElementById('successMessage');

const formFields = {
    firstName: document.getElementById('firstName'),
    lastName: document.getElementById('lastName'),
    email: document.getElementById('email'),
    phone: document.getElementById('phone'),
    age: document.getElementById('age'),
    gender: document.querySelectorAll('input[name="gender"]'),
    address: document.getElementById('address'),
    country: document.getElementById('country'),
    state: document.getElementById('state'),
    city: document.getElementById('city'),
    password: document.getElementById('password'),
    confirmPassword: document.getElementById('confirmPassword'),
    termsCheckbox: document.getElementById('termsCheckbox'),
};

// ============ VALIDATION FUNCTIONS ============

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function hasDisposableDomain(email) {
    const domain = email.split('@')[1]?.toLowerCase();
    return DISPOSABLE_DOMAINS.includes(domain);
}

function isValidPhone(phone, countryCode) {
    // Remove common formatting characters
    const cleaned = phone.replace(/[\s\-\(\)\.]/g, '');
    
    // Check if phone starts with country code (without +)
    const codeWithoutPlus = countryCode.replace('+', '');
    
    // Phone should be reasonable length (10-15 digits)
    const digitsOnly = cleaned.replace(/\D/g, '');
    return digitsOnly.length >= 10 && digitsOnly.length <= 15;
}

function getPasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[!@#$%^&*]/.test(password)) strength++;
    
    if (strength <= 1) return 'weak';
    if (strength <= 3) return 'medium';
    return 'strong';
}

function validateField(fieldName) {
    const field = formFields[fieldName];
    let isValid = true;
    let errorMessage = '';
    const errorElement = document.getElementById(`${fieldName}Error`);

    switch (fieldName) {
        case 'firstName':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'First name is required';
            } else if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'First name must be at least 2 characters';
            }
            break;

        case 'lastName':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Last name is required';
            } else if (field.value.trim().length < 2) {
                isValid = false;
                errorMessage = 'Last name must be at least 2 characters';
            }
            break;

        case 'email':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Email is required';
            } else if (!isValidEmail(field.value)) {
                isValid = false;
                errorMessage = 'Email format is invalid';
            } else if (hasDisposableDomain(field.value)) {
                isValid = false;
                errorMessage = 'Disposable email domains are not allowed';
            }
            break;

        case 'phone':
            if (!field.value.trim()) {
                isValid = false;
                errorMessage = 'Phone number is required';
            } else {
                const countryCode = COUNTRY_DATA[formFields.country.value]?.code || '+1';
                if (!isValidPhone(field.value, countryCode)) {
                    isValid = false;
                    errorMessage = 'Phone number format is invalid';
                }
            }
            break;

        case 'age':
            if (field.value && (isNaN(field.value) || field.value < 13 || field.value > 120)) {
                isValid = false;
                errorMessage = 'Age must be between 13 and 120';
            }
            break;

        case 'country':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Country selection is required';
            }
            break;

        case 'state':
            if (!field.value) {
                isValid = false;
                errorMessage = 'State/Province selection is required';
            }
            break;

        case 'city':
            if (!field.value) {
                isValid = false;
                errorMessage = 'City selection is required';
            }
            break;

        case 'password':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Password is required';
            } else if (field.value.length < 8) {
                isValid = false;
                errorMessage = 'Password must be at least 8 characters';
            }
            break;

        case 'confirmPassword':
            if (!field.value) {
                isValid = false;
                errorMessage = 'Confirm password is required';
            } else if (field.value !== formFields.password.value) {
                isValid = false;
                errorMessage = 'Passwords do not match';
            }
            break;

        case 'gender':
            const genderChecked = Array.from(formFields.gender).some(radio => radio.checked);
            if (!genderChecked) {
                isValid = false;
                errorMessage = 'Gender selection is required';
            }
            break;

        case 'termsCheckbox':
            if (!field.checked) {
                isValid = false;
                errorMessage = 'You must agree to the Terms & Conditions';
            }
            break;
    }

    // Update field styling and error message
    if (fieldName === 'gender') {
        const genderError = document.getElementById('genderError');
        if (isValid) {
            genderError.classList.remove('show');
            formFields.gender.forEach(radio => radio.classList.remove('error'));
        } else {
            genderError.textContent = errorMessage;
            genderError.classList.add('show');
            formFields.gender.forEach(radio => radio.classList.add('error'));
        }
    } else {
        const actualField = (fieldName === 'termsCheckbox') ? field : field;
        
        if (isValid) {
            if (errorElement) {
                errorElement.classList.remove('show');
            }
            if (fieldName !== 'termsCheckbox') {
                actualField.classList.remove('error', 'valid');
                actualField.classList.add('valid');
            }
        } else {
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
            if (fieldName !== 'termsCheckbox') {
                actualField.classList.remove('valid');
                actualField.classList.add('error');
            }
        }
    }

    return isValid;
}

function validateAllFields() {
    const fieldsToValidate = [
        'firstName', 'lastName', 'email', 'phone', 'gender',
        'country', 'state', 'city', 'password', 'confirmPassword', 'termsCheckbox'
    ];
    
    return fieldsToValidate.every(field => validateField(field));
}

function updateSubmitButton() {
    const fieldsToCheck = [
        'firstName', 'lastName', 'email', 'phone', 'gender',
        'country', 'state', 'city', 'password', 'confirmPassword', 'termsCheckbox'
    ];

    const allValid = fieldsToCheck.every(fieldName => {
        if (fieldName === 'gender') {
            return Array.from(formFields.gender).some(radio => radio.checked);
        } else if (fieldName === 'termsCheckbox') {
            return formFields[fieldName].checked;
        } else {
            const field = formFields[fieldName];
            return field && field.value.trim() !== '';
        }
    });

    submitBtn.disabled = !allValid;
}

// ============ EVENT LISTENERS ============

// Real-time validation on input
Object.keys(formFields).forEach(fieldName => {
    if (fieldName === 'gender') {
        formFields.gender.forEach(radio => {
            radio.addEventListener('change', () => {
                validateField('gender');
                updateSubmitButton();
            });
        });
    } else {
        formFields[fieldName].addEventListener('blur', () => {
            validateField(fieldName);
        });
        
        formFields[fieldName].addEventListener('input', () => {
            if (fieldName === 'password') {
                updatePasswordStrength();
            }
            updateSubmitButton();
        });
    }
});

// Password strength meter
function updatePasswordStrength() {
    const password = formFields.password.value;
    const strengthMeter = document.getElementById('strengthMeter');
    const strengthText = document.getElementById('strengthText');
    
    if (!password) {
        strengthMeter.className = 'strength-meter-fill';
        strengthText.textContent = 'Password strength: Weak';
        return;
    }
    
    const strength = getPasswordStrength(password);
    strengthMeter.className = `strength-meter-fill ${strength}`;
    strengthText.textContent = `Password strength: ${strength.charAt(0).toUpperCase() + strength.slice(1)}`;
    
    // Re-validate confirm password if it has a value
    if (formFields.confirmPassword.value) {
        validateField('confirmPassword');
    }
}

formFields.password.addEventListener('input', updatePasswordStrength);
formFields.confirmPassword.addEventListener('input', () => {
    validateField('confirmPassword');
});

// Country change - update states
formFields.country.addEventListener('change', () => {
    const selectedCountry = formFields.country.value;
    const stateSelect = formFields.state;
    const citySelect = formFields.city;
    
    stateSelect.innerHTML = '<option value="">-- Select State --</option>';
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    
    if (selectedCountry && COUNTRY_DATA[selectedCountry]) {
        const states = COUNTRY_DATA[selectedCountry].states;
        Object.keys(states).forEach(stateKey => {
            const option = document.createElement('option');
            option.value = stateKey;
            option.textContent = states[stateKey].name;
            stateSelect.appendChild(option);
        });
    }
    
    validateField('country');
    updateSubmitButton();
});

// State change - update cities
formFields.state.addEventListener('change', () => {
    const selectedCountry = formFields.country.value;
    const selectedState = formFields.state.value;
    const citySelect = formFields.city;
    
    citySelect.innerHTML = '<option value="">-- Select City --</option>';
    
    if (selectedCountry && selectedState && COUNTRY_DATA[selectedCountry]) {
        const cities = COUNTRY_DATA[selectedCountry].states[selectedState]?.cities || [];
        cities.forEach(city => {
            const option = document.createElement('option');
            option.value = city;
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
    
    validateField('state');
    updateSubmitButton();
});

// City selection
formFields.city.addEventListener('change', () => {
    validateField('city');
    updateSubmitButton();
});

// Password visibility toggle
document.getElementById('togglePassword').addEventListener('click', (e) => {
    e.preventDefault();
    const passwordInput = formFields.password;
    const toggleBtn = document.getElementById('togglePassword');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.querySelector('span').textContent = '🙈';
    } else {
        passwordInput.type = 'password';
        toggleBtn.querySelector('span').textContent = '👁️';
    }
});

document.getElementById('toggleConfirmPassword').addEventListener('click', (e) => {
    e.preventDefault();
    const confirmPasswordInput = formFields.confirmPassword;
    const toggleBtn = document.getElementById('toggleConfirmPassword');
    
    if (confirmPasswordInput.type === 'password') {
        confirmPasswordInput.type = 'text';
        toggleBtn.querySelector('span').textContent = '🙈';
    } else {
        confirmPasswordInput.type = 'password';
        toggleBtn.querySelector('span').textContent = '👁️';
    }
});

// Form submission
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear global error message
    globalErrorMessage.style.display = 'none';
    globalErrorMessage.innerHTML = '';
    
    // Validate all fields
    if (!validateAllFields()) {
        globalErrorMessage.innerHTML = '❌ Please correct the errors above before submitting.';
        globalErrorMessage.style.display = 'block';
        return;
    }
    
    // Simulate form submission
    console.log('Form submitted successfully!');
    console.log({
        firstName: formFields.firstName.value,
        lastName: formFields.lastName.value,
        email: formFields.email.value,
        phone: formFields.phone.value,
        age: formFields.age.value,
        gender: Array.from(formFields.gender).find(radio => radio.checked)?.value,
        address: formFields.address.value,
        country: formFields.country.value,
        state: formFields.state.value,
        city: formFields.city.value,
        password: formFields.password.value,
    });
    
    // Show success message
    successMessage.innerHTML = '✅ Registration Successful!<br>Your profile has been submitted successfully.';
    successMessage.style.display = 'block';
    
    // Reset form
    setTimeout(() => {
        form.reset();
        successMessage.style.display = 'none';
        submitBtn.disabled = true;
        
        // Clear field styling
        Object.keys(formFields).forEach(fieldName => {
            if (fieldName !== 'gender') {
                formFields[fieldName].classList.remove('error', 'valid');
            }
        });
        
        // Clear error messages
        document.querySelectorAll('.error-text').forEach(error => {
            error.classList.remove('show');
        });
        
        // Reset dropdowns
        formFields.state.innerHTML = '<option value="">-- Select State --</option>';
        formFields.city.innerHTML = '<option value="">-- Select City --</option>';
        
        // Reset password strength
        document.getElementById('strengthMeter').className = 'strength-meter-fill';
        document.getElementById('strengthText').textContent = 'Password strength: Weak';
    }, 1500);
});

// Initialize
window.addEventListener('load', () => {
    updateSubmitButton();
});
