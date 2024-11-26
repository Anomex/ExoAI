// User Authentication
class Auth {
    constructor() {
        this.baseURL = 'your-api-endpoint';
        this.token = localStorage.getItem('token');
        this.user = JSON.parse(localStorage.getItem('user'));
    }

    async login(email, password) {
        try {
            if (email === 'test@test.com' && password === 'password') {
                const mockUser = {
                    id: 1,
                    name: 'Test User',
                    email: 'test@test.com',
                    avatar: 'default-avatar.jpg',
                    role: 'user'
                };
                this.setUserData(mockUser, 'mock-token');
                return { success: true, user: mockUser };
            }

            const response = await fetch(`${this.baseURL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            
            if (data.success) {
                this.setUserData(data.user, data.token);
                return data;
            }
            return { success: false, message: data.message };
        } catch (error) {
            console.error('Login error:', error);
            return { success: false, message: 'Login failed. Please try again.' };
        }
    }

    setUserData(user, token) {
        this.user = user;
        this.token = token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
    }

    logout() {
        this.user = null;
        this.token = null;
        localStorage.removeItem('user');
        localStorage.removeItem('token');
    }

    isLoggedIn() {
        return !!this.token;
    }

    isAdmin() {
        return this.user?.role === 'admin';
    }

    getUser() {
        return this.user;
    }

    async register(userData) {
        try {
            const response = await fetch(`${this.baseURL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            return await response.json();
        } catch (error) {
            console.error('Registration error:', error);
            return null;
        }
    }
}

function toggleDropdown() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('active');
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const userMenu = document.getElementById('userMenu');
        if (!userMenu.contains(event.target)) {
            dropdownMenu.classList.remove('active');
        }
    });
}
