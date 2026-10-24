const API_URL = 'http://localhost:5000/api';
const token = localStorage.getItem('token');

// Load profile data
async function loadProfile() {
    try {
        const response = await fetch(`${API_URL}/auth/profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const userData = await response.json();
            updateProfileUI(userData);
        }
    } catch (error) {
        console.error('Error loading profile:', error);
    }
}

function updateProfileUI(userData) {
    // Profile info
    const profileName = document.getElementById('profileName');
    if (profileName) profileName.textContent = userData.name;
    
    const profileEmail = document.getElementById('profileEmail');
    if (profileEmail) profileEmail.textContent = userData.email;
    
    const profileLevel = document.getElementById('profileLevel');
    if (profileLevel) profileLevel.textContent = userData.level || 1;
    
    const profileXP = document.getElementById('profileXP');
    if (profileXP) profileXP.textContent = userData.xp || 0;
    
    const profileStreak = document.getElementById('profileStreak');
    if (profileStreak) profileStreak.textContent = userData.streak || 0;
    
    const profileCourses = document.getElementById('profileCourses');
    if (profileCourses) profileCourses.textContent = userData.enrolledCourses ? userData.enrolledCourses.length : 0;
    
    const profileCertificates = document.getElementById('profileCertificates');
    if (profileCertificates) profileCertificates.textContent = userData.completedCourses ? userData.completedCourses.length : 0;
    
    // Form values
    const nameInput = document.getElementById('name');
    if (nameInput) nameInput.value = userData.name;
    
    const bioInput = document.getElementById('bio');
    if (bioInput) bioInput.value = userData.bio || '';
    
    const skillsInput = document.getElementById('skills');
    if (skillsInput) skillsInput.value = userData.skills ? userData.skills.join(', ') : '';
    
    // Load achievements
    loadAchievements();
    
    // Load certificates
    loadCertificates();
}

async function loadAchievements() {
    try {
        const response = await fetch(`${API_URL}/achievements`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const achievements = await response.json();
            displayAchievements(achievements);
        }
    } catch (error) {
        console.error('Error loading achievements:', error);
    }
}

function displayAchievements(achievements) {
    const achievementsGrid = document.getElementById('achievementsGrid');
    if (!achievementsGrid) return;
    
    if (achievements.length === 0) {
        achievementsGrid.innerHTML = '<p class="no-achievements">No achievements yet</p>';
        return;
    }
    
    achievementsGrid.innerHTML = '';
    achievements.forEach(achievement => {
        const badge = document.createElement('div');
        badge.className = 'achievement-badge';
        badge.innerHTML = `
            <i class="${achievement.icon || 'fas fa-medal'}"></i>
            <span>${achievement.title}</span>
        `;
        achievementsGrid.appendChild(badge);
    });
}

async function loadCertificates() {
    try {
        const response = await fetch(`${API_URL}/certificates`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (response.ok) {
            const certificates = await response.json();
            displayCertificates(certificates);
        }
    } catch (error) {
        console.error('Error loading certificates:', error);
    }
}

function displayCertificates(certificates) {
    const certificatesList = document.getElementById('certificatesList');
    if (!certificatesList) return;
    
    if (certificates.length === 0) {
        certificatesList.innerHTML = '<p class="no-certificates">No certificates earned yet</p>';
        return;
    }
    
    certificatesList.innerHTML = '';
    certificates.forEach(certificate => {
        const certItem = document.createElement('div');
        certItem.className = 'certificate-item';
        certItem.innerHTML = `
            <div class="certificate-info">
                <h4>${certificate.course?.title || 'Course Certificate'}</h4>
                <p>Certificate #: ${certificate.certificateNumber}</p>
                <p>Issued: ${new Date(certificate.issueDate).toLocaleDateString()}</p>
            </div>
            <button class="btn btn-outline btn-sm">Download</button>
        `;
        certificatesList.appendChild(certItem);
    });
}

// Update profile form
const profileForm = document.getElementById('profileForm');
if (profileForm) {
    profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const bio = document.getElementById('bio').value;
        const skills = document.getElementById('skills').value.split(',').map(s => s.trim()).filter(s => s);
        
        try {
            const response = await fetch(`${API_URL}/auth/profile`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name, bio, skills })
            });
            
            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                alert('Profile updated successfully!');
                loadProfile();
            } else {
                alert('Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('An error occurred. Please try again.');
        }
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (token) {
        loadProfile();
    } else {
        window.location.href = 'login.html';
    }
});
