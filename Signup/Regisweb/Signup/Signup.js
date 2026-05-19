// Form validation script
const registrationForm = document.getElementById('registrationForm');
const fileInput = document.getElementById('fileUpload');
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB in bytes

// Form fields
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const emailInput = document.getElementById('email');
const contactInput = document.getElementById('contact');
const genderInput = document.getElementById('gender');
const dateInput = document.getElementById('dateOfBirth');
const cityInput = document.getElementById('city');
const stateInput = document.getElementById('state');

// Error message elements
const errorElements = {
    firstName: document.getElementById('firstNameError'),
    lastName: document.getElementById('lastNameError'),
    email: document.getElementById('emailError'),
    contact: document.getElementById('contactError'),
    gender: document.getElementById('genderError'),
    date: document.getElementById('dateError'),
    city: document.getElementById('cityError'),
    state: document.getElementById('stateError'),
    file: document.getElementById('fileError')
};

const successElements = {
    file: document.getElementById('fileSuccess')
};

// Validation Rules
const validationRules = {
    firstName: {
        validate: (value) => {
            if (!value.trim()) return "First name is required";
            if (value.trim().length < 2) return "First name must be at least 2 characters";
            if (!/^[a-zA-Z\s'-]+$/.test(value)) return "First name can only contain letters, spaces, hyphens, and apostrophes";
            return "";
        }
    },
    lastName: {
        validate: (value) => {
            if (!value.trim()) return "Last name is required";
            if (value.trim().length < 2) return "Last name must be at least 2 characters";
            if (!/^[a-zA-Z\s'-]+$/.test(value)) return "Last name can only contain letters, spaces, hyphens, and apostrophes";
            return "";
        }
    },
    email: {
        validate: (value) => {
            if (!value.trim()) return "Email is required";
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) return "Please enter a valid email address";
            return "";
        }
    },
    contact: {
        validate: (value) => {
            if (!value.trim()) return "Contact number is required";
            const phoneRegex = /^[0-9\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value)) return "Contact number can only contain digits and valid symbols";
            const digitsOnly = value.replace(/\D/g, '');
            if (digitsOnly.length < 10) return "Contact number must be at least 10 digits";
            if (digitsOnly.length > 10) return "Contact number must not exceed 10 digits";
            return "";
        }
    },
    gender: {
        validate: (value) => {
            if (!value) return "Gender is required";
            return "";
        }
    },
    date: {
        validate: (value) => {
            if (!value) return "Date of birth is required";
            const selectedDate = new Date(value);
            const today = new Date();
            const age = today.getFullYear() - selectedDate.getFullYear();
            const monthDiff = today.getMonth() - selectedDate.getMonth();
            
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < selectedDate.getDate())) {
                // Age calculation adjustment
                age--;
            }
            
            if (selectedDate > today) return "Date of birth cannot be in the future";
            if (age < 13) return "You must be at least 13 years old";
            if (age > 120) return "Please enter a valid date of birth";
            return "";
        }
    },
    city: {
        validate: (value) => {
            if (!value) return "City is required";
            return "";
        }
    },
    state: {
        validate: (value) => {
            if (!value) return "State is required";
            return "";
        }
    },
    file: {
        validate: (files) => {
            if (!files || files.length === 0) return "Please upload a PDF file";
            
            const file = files[0];
            const allowedExtensions = ['pdf'];
            const fileExtension = file.name.split('.').pop().toLowerCase();
            
            if (!allowedExtensions.includes(fileExtension)) {
                return `Invalid file type. Allowed types: ${allowedExtensions.join(', ')}`;
            }
            
            if (file.size > MAX_FILE_SIZE) {
                const sizeMB = (file.size / (1024 * 1024)).toFixed(2);
                return `File size (${sizeMB} MB) exceeds 10 MB limit`;
            }
            
            return "";
        }
    }
};

// Display error message
function showError(fieldName, errorMessage) {
    const errorElement = errorElements[fieldName];
    if (errorElement) {
        if (errorMessage) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }
}

// Display success message for file
function showSuccess(fieldName, message) {
    const successElement = successElements[fieldName];
    if (successElement) {
        if (message) {
            successElement.textContent = message;
            successElement.classList.add('show');
        } else {
            successElement.textContent = '';
            successElement.classList.remove('show');
        }
    }
}

// Validate individual field
function validateField(fieldName, value) {
    const rule = validationRules[fieldName];
    if (!rule) return true;
    
    const error = rule.validate(value);
    showError(fieldName, error);
    
    return !error;
}

// Real-time validation listeners
firstNameInput.addEventListener('blur', () => {
    validateField('firstName', firstNameInput.value);
});

lastNameInput.addEventListener('blur', () => {
    validateField('lastName', lastNameInput.value);
});

emailInput.addEventListener('blur', () => {
    validateField('email', emailInput.value);
});

contactInput.addEventListener('blur', () => {
    validateField('contact', contactInput.value);
});

genderInput.addEventListener('change', () => {
    validateField('gender', genderInput.value);
});

dateInput.addEventListener('change', () => {
    validateField('date', dateInput.value);
});

cityInput.addEventListener('change', () => {
    validateField('city', cityInput.value);
});

stateInput.addEventListener('change', () => {
    validateField('state', stateInput.value);
});

// File input validation with real-time feedback
fileInput.addEventListener('change', function() {
    const error = validationRules.file.validate(this.files);
    
    if (error) {
        showError('file', error);
        showSuccess('file', '');
        this.classList.remove('success');
        this.classList.add('error');
    } else {
        const fileName = this.files[0].name;
        const fileSizeMB = (this.files[0].size / (1024 * 1024)).toFixed(2);
        showError('file', '');
        showSuccess('file', `✓ File "${fileName}" (${fileSizeMB} MB) uploaded successfully`);
        this.classList.remove('error');
        this.classList.add('success');
    }
});

// Form submission
registrationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    
    isValid = validateField('firstName', firstNameInput.value) && isValid;
    isValid = validateField('lastName', lastNameInput.value) && isValid;
    isValid = validateField('email', emailInput.value) && isValid;
    isValid = validateField('contact', contactInput.value) && isValid;
    isValid = validateField('gender', genderInput.value) && isValid;
    isValid = validateField('date', dateInput.value) && isValid;
    isValid = validateField('city', cityInput.value) && isValid;
    isValid = validateField('state', stateInput.value) && isValid;
    isValid = validateField('file', fileInput.files) && isValid;
    
    if (isValid) {
        // Form is valid, submit
        showSuccessAlert();
        // Uncomment to actually submit the form
        // this.submit();
    } else {
        // Scroll to first error
        const firstError = document.querySelector('.error-message.show');
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
});

// Show success alert
function showSuccessAlert() {
    const formData = {
        firstName: firstNameInput.value,
        lastName: lastNameInput.value,
        email: emailInput.value,
        contact: contactInput.value,
        gender: genderInput.value,
        dateOfBirth: dateInput.value,
        city: cityInput.value,
        state: stateInput.value,
        file: fileInput.files[0].name
    };
    
    alert(`✓ Registration Successful!\n\nName: ${formData.firstName} ${formData.lastName}\nEmail: ${formData.email}\nContact: ${formData.contact}\n\nYour form has been submitted successfully!`);
    
    console.log('Form Data:', formData);
}

// Set max date to today for date picker
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('max', today);

// Prevent future dates in date picker
dateInput.addEventListener('change', function() {
    if (this.value > today) {
        this.value = '';
        showError('date', 'Date of birth cannot be in the future');
    }
});
