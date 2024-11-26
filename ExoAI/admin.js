class AdminDashboard {
    constructor() {
        this.auth = new Auth();
        this.initializeEventListeners();
        this.loadDashboardData();
    }

    initializeEventListeners() {
        // Tab switching
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => this.switchTab(item.dataset.tab));
        });

        // Content form submission
        document.getElementById('contentForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContent();
        });
    }

    async loadDashboardData() {
        // Load statistics
        const stats = await this.fetchStats();
        this.updateStats(stats);

        // Load content sections
        const sections = await this.fetchSections();
        this.updateSectionsList(sections);
    }

    switchTab(tabId) {
        document.querySelectorAll('.tab-content').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelectorAll('.menu-item').forEach(item => {
            item.classList.remove('active');
        });

        document.getElementById(tabId).classList.add('active');
        document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    }

    async saveContent() {
        // Implement content saving logic
    }

    // Add more admin functionality methods
}
