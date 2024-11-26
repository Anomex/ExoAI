class RegisterForm {
    constructor() {
        this.form = document.getElementById('registerForm');
        this.avatarInput = document.getElementById('avatarInput');
        this.avatarPreview = document.getElementById('avatarPreview');
        this.passwordInput = document.getElementById('password');
        this.confirmPasswordInput = document.getElementById('confirmPassword');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        // Avatar upload
        this.avatarPreview.addEventListener('click', () => this.avatarInput.click());
        this.avatarInput.addEventListener('change', (e) => this.handleAvatarChange(e));

        // Password strength
        this.passwordInput.addEventListener('input', (e) => this.checkPasswordStrength(e.target.value));

        // Form submission
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }

    handleAvatarChange(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('avatarImage').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    }

    checkPasswordStrength(password) {
        const strengthBar = document.getElementById('passwordStrength');
        let strength = 0;

        if (password.length >= 8) strength += 25;
        if (password.match(/[A-Z]/)) strength += 25;
        if (password.match(/[0-9]/)) strength += 25;
        if (password.match(/[^A-Za-z0-9]/)) strength += 25;

        strengthBar.style.setProperty('--strength', `${strength}%`);
        strengthBar.style.backgroundColor = 
            strength <= 25 ? '#ff4444' :
            strength <= 50 ? '#ffbb33' :
            strength <= 75 ? '#00C851' :
            '#007E33';
    }

    async handleSubmit(event) {
        event.preventDefault();
        
        if (!this.validateForm()) return;

        this.showLoading();

        try {
            const formData = new FormData();
            formData.append('firstName', document.getElementById('firstName').value);
            formData.append('lastName', document.getElementById('lastName').value);
            formData.append('email', document.getElementById('email').value);
            formData.append('password', this.passwordInput.value);
            
            if (this.avatarInput.files[0]) {
                formData.append('avatar', this.avatarInput.files[0]);
            }

            const response = await this.registerUser(formData);
            
            if (response.success) {
                // Store user data and redirect
                localStorage.setItem('user', JSON.stringify(response.user));
                localStorage.setItem('token', response.token);
                window.location.href = 'index.html';
            } else {
                this.showError(response.message);
            }
        } catch (error) {
            this.showError('Registration failed. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    validateForm() {
        // Password match validation
        if (this.passwordInput.value !== this.confirmPasswordInput.value) {
            this.showError('Passwords do not match');
            return false;
        }

        // Password strength validation
        if (this.passwordInput.value.length < 8) {
            this.showError('Password must be at least 8 characters long');
            return false;
        }

        return true;
    }

    async registerUser(formData) {
        // Replace with your API endpoint
        const response = await fetch('your-api-endpoint/register', {
            method: 'POST',
            body: formData
        });

        return await response.json();
    }

    showError(message) {
        // Implement error display logic
        alert(message); // Replace with better UI feedback
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }
}

// Initialize the form
new RegisterForm();
