# Intelligent Registration System - Complete Project

A modern, fully-functional registration system with comprehensive form validation, responsive design, and complete automation testing.

## 📁 Project Structure

```
├── src/
│   ├── index.html          # Main registration form HTML
│   ├── styles.css          # Complete styling and responsive design
│   ├── script.js           # All JavaScript logic and validations
│
├── cypress/
│   ├── e2e/
│   │   └── registration.cy.js    # Complete test suite (90+ tests)
│   ├── support/
│   │   └── e2e.js                # Custom Cypress commands
│   └── screenshots/        # Captured screenshots from tests
│
├── tests/                  # Additional test configurations
├── package.json           # Dependencies and scripts
├── cypress.config.js      # Cypress configuration
└── README.md             # This file
```

## 🚀 Features

### Form Fields
- ✅ First Name (Required)
- ✅ Last Name (Required)
- ✅ Email (Required)
- ✅ Phone Number (Required)
- ✅ Age (Optional)
- ✅ Gender (Required - Radio buttons)
- ✅ Address (Optional)
- ✅ Country (Required - Dropdown)
- ✅ State/Province (Required - Dynamic)
- ✅ City (Required - Dynamic)
- ✅ Password (Required)
- ✅ Confirm Password (Required)
- ✅ Terms & Conditions (Required - Checkbox)

### Client-Side Validations
- ✅ Real-time field validation
- ✅ Email format validation
- ✅ Disposable domain detection (tempmail, 10minutemail, etc.)
- ✅ Phone number validation with country code support
- ✅ Password strength meter (Weak/Medium/Strong)
- ✅ Password confirmation matching
- ✅ Age validation (13-120 years)
- ✅ Required field highlighting in red
- ✅ Inline error messages
- ✅ Global error message container
- ✅ Success message with form reset

### Form Logic
- ✅ Dynamic Country → State → City dropdown linking
- ✅ State/City dropdowns update when country changes
- ✅ Submit button disabled until all required fields are valid
- ✅ Password visibility toggle (👁️ icon)
- ✅ Form reset after successful submission
- ✅ Real-time submit button enable/disable

### UI/UX Features
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Gradient background
- ✅ Smooth animations
- ✅ Password strength visual meter
- ✅ Valid field styling (green border)
- ✅ Error field styling (red border, pink background)
- ✅ Accessible form elements
- ✅ Clear error messages
- ✅ Success/Error alerts

## 🧪 Automation Testing

### Test Suite Overview
- **Total Tests**: 90+
- **Framework**: Cypress
- **Coverage**: Form validation, UI interactions, data flow, responsive design

### Test Categories

#### 1. Smoke Tests
- Page load verification
- Form header presence
- All form fields exist
- Submit button initial state

#### 2. Flow A - Negative Scenario
- Missing required field (Last Name)
- Error message display
- Field highlighting in red
- Screenshot: `error-state.png`

#### 3. Flow B - Positive Scenario
- Valid form submission
- Success message verification
- Form reset after submission
- Password matching validation
- Terms checkbox requirement
- Screenshot: `success-state.png`

#### 4. Flow C - Form Logic Validation
- Country → State → City dropdown linking
- Dropdown data updates
- Password strength meter (Weak/Medium/Strong)
- Password mismatch detection
- Submit button enable/disable logic

#### 5. Validation Tests
- Email validation (format, disposable domains)
- Phone number validation
- Required field validation
- Age range validation

#### 6. UI Interaction Tests
- Password visibility toggle
- Gender option selection
- Mobile/Tablet/Desktop responsiveness

## 🔧 Setup & Installation

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

```bash
# Clone or download the project
cd "Intelligent Registration System + Automation"

# Install dependencies
npm install

# Install Cypress (if not included)
npm install cypress --save-dev

# Install http-server for local testing
npm install http-server --save-dev
```

## ▶️ Running the Project

### Start the Web Server
```bash
# Run on http://localhost:8080
npm start
```

The page will automatically open in your default browser.

### Run Automation Tests

#### Open Cypress Test Runner (Interactive)
```bash
npm test
```

#### Run Tests Headless (Command Line)
```bash
npm run test:headless
```

#### Run Tests in Chrome
```bash
npm run test:headless:chrome
```

## 📋 Form Submission Data

When a user submits the form, the following data is captured and logged:
```javascript
{
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+1 (555) 123-4567",
    age: "28",
    gender: "male",
    address: "123 Main Street",
    country: "US",
    state: "CA",
    city: "Los Angeles",
    password: "SecurePass@123"
}
```

## 🌍 Supported Countries

The system includes pre-configured data for:
- 🇺🇸 United States (States: CA, TX, NY, FL)
- 🇨🇦 Canada (States: ON, BC, QC)
- 🇬🇧 United Kingdom (Regions: England, Scotland, Wales)
- 🇦🇺 Australia (States: NSW, VIC, QLD)
- 🇮🇳 India (States: DL, MH, KA)
- 🇩🇪 Germany (States: Bavaria, Berlin, NRW)
- 🇫🇷 France (Regions: Île-de-France, Auvergne-Rhône-Alpes, Occitanie)

Each country has states/regions with 3-4 major cities.

## 🚫 Disposable Email Domains (Blocked)

The system prevents registration with these domains:
- tempmail.com
- temp-mail.org
- throwaway.email
- 10minutemail.com
- mailinator.com
- trashmail.com
- yopmail.com
- fakeinbox.com
- And more...

## 📊 Password Strength Meter

### Weak (Red)
- Less than 8 characters
- Only lowercase or only uppercase
- No numbers or special characters

### Medium (Orange)
- 8-12 characters
- Mix of upper and lowercase
- Contains numbers or special characters

### Strong (Green)
- 12+ characters
- Mix of upper and lowercase
- Contains numbers AND special characters

## 🎯 Test Flow Examples

### Example: Positive Scenario
1. Fill all form fields with valid data
2. Select "United States" as country
3. System auto-populates states
4. Select "California" state
5. System auto-populates cities
6. Select "Los Angeles"
7. Enter matching passwords
8. Check Terms & Conditions
9. Click Submit
10. Success message appears
11. Form automatically resets

### Example: Negative Scenario
1. Fill most form fields
2. Leave "Last Name" empty
3. Click on Last Name field then blur
4. Error message: "Last name is required" appears
5. Field highlighted in red with pink background
6. Submit button remains disabled

## 🖼️ Screenshots

Test suite captures screenshots:
- `error-state.png` - Shows form with validation errors
- `success-state.png` - Shows success message and form state

## 🔐 Security Considerations

- Client-side validation for UX (not security)
- Password shown/hidden toggle for accessibility
- No passwords stored in localStorage
- Success message cleared on page reload
- Form data logged to console (for demo purposes only)

## 📱 Responsive Breakpoints

- **Mobile**: < 600px
- **Tablet**: 600px - 1024px
- **Desktop**: > 1024px

All tests cover these breakpoints.

## 🛠️ Browser Support

- Chrome/Chromium (fully supported)
- Firefox
- Safari
- Edge

## 📝 Test Commands

```bash
# Run all tests
npm run test:headless

# Run specific test file
npx cypress run --spec "cypress/e2e/registration.cy.js"

# Run with specific browser
npx cypress run --browser chrome
npx cypress run --browser firefox

# Run tests with video recording
npx cypress run --record

# Open Cypress UI
npm test
```

## 🎓 Learning Resources

This project demonstrates:
- HTML5 semantic form structure
- CSS3 flexbox and grid layouts
- Vanilla JavaScript validation
- Regular expressions for validation
- DOM manipulation and event handling
- Cypress E2E testing best practices
- Test organization and structure
- Custom Cypress commands
- Screenshot and video capture
- Responsive design testing

## 📄 File Descriptions

### src/index.html
- Complete registration form structure
- Semantic HTML5
- Accessibility attributes
- Error message containers
- Success message container

### src/styles.css
- Responsive grid layout
- Gradient backgrounds
- Smooth animations
- Password strength meter styling
- Mobile-first design
- Form validation styling

### src/script.js
- Complete validation logic
- Country/State/City data
- Disposable domain list
- Password strength calculation
- Event listeners
- Form submission handling
- Dynamic dropdown population

### cypress/e2e/registration.cy.js
- 90+ comprehensive tests
- Smoke tests
- Negative scenarios
- Positive scenarios
- Form logic validation
- UI interaction tests
- Responsive design tests
- Cross-browser tests

## 🚀 Deployment

### Deploy to GitHub Pages
1. Push to GitHub repository
2. Go to repository Settings
3. Enable GitHub Pages from `main` branch
4. Access via `https://username.github.io/repository-name/src/`

### Deploy to Vercel/Netlify
1. Connect GitHub repository
2. Build command: (not required - static site)
3. Public directory: `src`
4. Deploy!

## ✅ Quality Checklist

- ✅ All required form fields implemented
- ✅ All validations working
- ✅ Error highlighting and messages
- ✅ Success message and form reset
- ✅ Password strength meter
- ✅ Disposable domain checking
- ✅ Dynamic dropdown linking
- ✅ Responsive design
- ✅ 90+ automated tests
- ✅ Test screenshots captured
- ✅ Cross-browser compatible

## 📞 Support

For issues or questions about this project, please check:
1. Console for validation logs
2. Network tab for form submissions
3. Cypress test runner output
4. Browser developer tools

## 📜 License

MIT License - Feel free to use and modify!

---

**Created**: January 5, 2026
**Last Updated**: January 5, 2026
