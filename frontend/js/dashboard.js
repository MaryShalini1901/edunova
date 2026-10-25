const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user') || '{}');

const demoDashboardProfile = {
    name: 'Mary Shalini',
    streak: 12,
    xp: 1600,
    enrolledCourses: ['1', '2', '3'],
    completedCourses: ['1']
};

// Update dashboard with user data
async function loadDashboard() {
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            updateDashboardUI(userData);
            return;
        }
    } catch (error) {
        console.error('Error loading dashboard from API, showing demo data instead:', error);
    }

    updateDashboardUI(demoDashboardProfile);
}

function updateDashboardUI(userData) {
    // Welcome message
    const userName = document.getElementById('userName');
    if (userName) {
        userName.textContent = userData.name.split(' ')[0];
    }
    
    // Progress summary
    const progressSummary = document.getElementById('progressSummary');
    if (progressSummary && userData.enrolledCourses) {
        const totalCourses = userData.enrolledCourses.length;
        const completedCourses = userData.completedCourses ? userData.completedCourses.length : 0;
        const progress = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
        progressSummary.textContent = `You are ${progress}% through ${totalCourses} courses. Keep the streak alive!`;
    }
    
    // Stats
    const streakCount = document.getElementById('streakCount');
    if (streakCount) streakCount.textContent = userData.streak || 0;
    
    const xpCount = document.getElementById('xpCount');
    if (xpCount) xpCount.textContent = userData.xp || 0;
    
    const certificateCount = document.getElementById('certificateCount');
    if (certificateCount) certificateCount.textContent = userData.completedCourses ? userData.completedCourses.length : 0;
    
    const badgeCount = document.getElementById('badgeCount');
    if (badgeCount) badgeCount.textContent = '0';
    
    // Progress circle
    const overallProgress = document.getElementById('overallProgress');
    const progressCircle = document.getElementById('progressCircle');
    if (overallProgress && progressCircle && userData.enrolledCourses) {
        const totalCourses = userData.enrolledCourses.length;
        const completedCourses = userData.completedCourses ? userData.completedCourses.length : 0;
        const progress = totalCourses > 0 ? Math.round((completedCourses / totalCourses) * 100) : 0;
        
        overallProgress.textContent = `${progress}%`;
        const circumference = 2 * Math.PI * 90;
        const offset = circumference - (progress / 100) * circumference;
        progressCircle.style.strokeDashoffset = offset;
    }
    
    // Load enrolled courses
    loadEnrolledCourses(userData.enrolledCourses);
}

async function loadEnrolledCourses(courses) {
    const continueLearning = document.getElementById('continueLearning');
    if (!continueLearning || !courses) return;
    
    continueLearning.innerHTML = '';
    
    for (const courseId of courses) {
        try {
            const response = await fetch(`${API_URL}/courses/${courseId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const course = await response.json();
                const courseItem = createCourseItem(course);
                continueLearning.appendChild(courseItem);
            }
        } catch (error) {
            console.error('Error loading course:', error);
        }
    }
}

function createCourseItem(course) {
    const div = document.createElement('div');
    div.className = 'course-item';
    div.innerHTML = `
        <div class="course-item-icon">
            <i class="fas fa-code"></i>
        </div>
        <div class="course-item-info">
            <h4>${course.title}</h4>
            <p>${course.category} • Last opened 2 days ago</p>
        </div>
        <div class="course-item-progress">
            <div class="course-progress">
                <div class="progress-bar" style="width: ${Math.random() * 100}%"></div>
            </div>
        </div>
    `;
    return div;
}

// Chatbot functionality
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

if (chatbotToggle) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
    });
}

if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

if (chatbotSend && chatbotInput) {
    chatbotSend.addEventListener('click', sendMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
}

function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    addMessage(message, 'user');
    chatbotInput.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const responses = [
            "That's a great question! Let me help you with that.",
            "I understand. Here's what I think...",
            "Interesting! Let me provide some guidance.",
            "I'm here to help! Could you tell me more?",
            "That's a common question. Here's the answer..."
        ];
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        addMessage(randomResponse, 'bot');
    }, 1000);
}

function addMessage(message, type) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chatbot-message ${type}`;
    messageDiv.textContent = message;
    chatbotMessages.appendChild(messageDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Sidebar navigation
const dashboardMain = document.querySelector('.dashboard-main');
const dashboardOverview = dashboardMain ? Array.from(dashboardMain.children) : [];

function showDashboardAction(sectionName) {
    if (!dashboardMain) return;

    dashboardOverview.forEach(child => {
        child.hidden = true;
    });

    let actionPanel = document.getElementById('dashboardActionPanel');
    if (!actionPanel) {
        actionPanel = document.createElement('section');
        actionPanel.id = 'dashboardActionPanel';
        actionPanel.className = 'dashboard-section dashboard-action-panel';
        dashboardMain.appendChild(actionPanel);
    }

    const actions = {
        planner: ['Study Planner', 'Plan your next study session and keep your learning schedule on track.', 'Open Courses'],
        achievements: ['Achievements', 'Complete lessons and quizzes to unlock new achievements.', 'Continue Learning'],
        certificates: ['Certificates', 'Your certificates will appear here when you complete a course.', 'Browse Courses'],
        forum: ['Learning Forum', 'Ask questions, share ideas, and learn together with the EduNova community.', 'Browse Courses']
    };
    const [title, description, buttonLabel] = actions[sectionName] || actions.planner;
    actionPanel.innerHTML = `
        <div class="section-header">
            <h2>${title}</h2>
        </div>
        <p>${description}</p>
        <a class="btn btn-primary" href="courses.html">${buttonLabel}</a>
    `;
    actionPanel.hidden = false;
}

function showDashboardOverview() {
    dashboardOverview.forEach(child => {
        child.hidden = false;
    });
    const actionPanel = document.getElementById('dashboardActionPanel');
    if (actionPanel) actionPanel.hidden = true;
}

document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionName = link.dataset.section || 'overview';
        document.querySelectorAll('.sidebar-link').forEach(item => {
            item.classList.toggle('active', item === link);
        });

        if (sectionName === 'courses') {
            window.location.href = 'courses.html';
            return;
        }

        if (sectionName === 'overview') {
            showDashboardOverview();
        } else {
            showDashboardAction(sectionName);
        }
    });
});

// Initialize dashboard
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        loadDashboard();
    } else {
        updateDashboardUI(demoDashboardProfile);
    }
});
