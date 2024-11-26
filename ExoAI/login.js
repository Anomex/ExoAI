class LoginPage {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.rememberMe = document.getElementById('rememberMe');
        this.errorDisplay = document.getElementById('loginError');
        this.loadingOverlay = document.getElementById('loadingOverlay');
        this.auth = new Auth();

        this.initializeEventListeners();
    }

    initializeEventListeners() {
        this.form.addEventListener('submit', (e) => this.handleLogin(e));
    }

    async handleLogin(e) {
        e.preventDefault();
        this.clearError();
        this.showLoading();

        try {
            const result = await this.auth.login(
                this.emailInput.value,
                this.passwordInput.value
            );

            if (result.success) {
                if (this.rememberMe.checked) {
                    // Implement remember me functionality
                    localStorage.setItem('rememberMe', 'true');
                }
                window.location.href = 'index.html';
            } else {
                this.showError(result.message || 'Login failed. Please try again.');
            }
        } catch (error) {
            this.showError('An error occurred. Please try again.');
        } finally {
            this.hideLoading();
        }
    }

    showError(message) {
        this.errorDisplay.textContent = message;
        this.errorDisplay.style.display = 'block';
    }

    clearError() {
        this.errorDisplay.textContent = '';
        this.errorDisplay.style.display = 'none';
    }

    showLoading() {
        this.loadingOverlay.style.display = 'flex';
    }

    hideLoading() {
        this.loadingOverlay.style.display = 'none';
    }
}

// Initialize login page
new LoginPage();
