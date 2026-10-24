const API_URL = 'http://localhost:5000/api';

// Sample course data used when backend is unavailable (GitHub Pages / demo mode)
const sampleCourses = [
    {
        _id: '1',
        title: 'React from the Ground Up',
        description: 'Learn React from scratch and build modern web applications',
        category: 'Web Development',
        difficulty: 'Beginner',
        instructor: 'John Doe',
        duration: 20,
        rating: 4.8,
        enrolledCount: 150
    },
    {
        _id: '2',
        title: 'Python for Data Analysis',
        description: 'Master Python for data science and analysis',
        category: 'Data Science',
        difficulty: 'Intermediate',
        instructor: 'Jane Smith',
        duration: 25,
        rating: 4.7,
        enrolledCount: 200
    },
    {
        _id: '3',
        title: 'Modern JavaScript from Zero to Pro',
        description: 'Complete JavaScript guide from basics to advanced',
        category: 'Programming',
        difficulty: 'Beginner',
        instructor: 'Mike Johnson',
        duration: 30,
        rating: 4.9,
        enrolledCount: 300
    },
    {
        _id: '4',
        title: 'Node.js Backend Development',
        description: 'Build scalable backend applications with Node.js',
        category: 'Web Development',
        difficulty: 'Advanced',
        instructor: 'Sarah Williams',
        duration: 35,
        rating: 4.6,
        enrolledCount: 120
    },
    {
        _id: '5',
        title: 'UI/UX Design Fundamentals',
        description: 'Learn the principles of great user interface design',
        category: 'Design',
        difficulty: 'Beginner',
        instructor: 'Emily Brown',
        duration: 15,
        rating: 4.5,
        enrolledCount: 180
    },
    {
        _id: '6',
        title: 'Machine Learning Basics',
        description: 'Introduction to machine learning algorithms',
        category: 'Data Science',
        difficulty: 'Intermediate',
        instructor: 'David Lee',
        duration: 40,
        rating: 4.8,
        enrolledCount: 250
    }
];

// Load courses
async function loadCourses() {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    try {
        const response = await fetch(`${API_URL}/courses`);
        let courses = sampleCourses;
        
        if (response.ok) {
            courses = await response.json();
        } else {
            console.warn('API unavailable, using demo course data.');
        }
        
        displayCourses(courses);
    } catch (error) {
        console.warn('Error loading courses from API, using demo data instead:', error);
        displayCourses(sampleCourses);
    }
}

function displayCourses(courses) {
    const coursesGrid = document.getElementById('coursesGrid');
    if (!coursesGrid) return;
    
    coursesGrid.innerHTML = '';
    
    courses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesGrid.appendChild(courseCard);
    });
}

function createCourseCard(course) {
    const div = document.createElement('div');
    div.className = 'course-card';
    div.innerHTML = `
        <div class="course-thumbnail">
            <i class="fas fa-laptop-code"></i>
        </div>
        <div class="course-content">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <div class="course-meta">
                <span><i class="fas fa-folder"></i> ${course.category}</span>
                <span><i class="fas fa-signal"></i> ${course.difficulty}</span>
            </div>
            <div class="course-meta">
                <span><i class="fas fa-user"></i> ${course.instructor}</span>
                <span><i class="fas fa-clock"></i> ${course.duration}h</span>
            </div>
            <div class="course-progress">
                <div class="progress-bar" style="width: ${Math.random() * 100}%"></div>
            </div>
            <div class="course-footer">
                <span><i class="fas fa-star"></i> ${course.rating}</span>
                <span><i class="fas fa-users"></i> ${course.enrolledCount}</span>
            </div>
        </div>
    `;
    
    div.addEventListener('click', () => {
        if (localStorage.getItem('token')) {
            window.location.href = `course-details.html?id=${course._id}`;
        } else {
            window.location.href = 'login.html';
        }
    });
    
    return div;
}

// Filter courses
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const difficultyFilter = document.getElementById('difficultyFilter');

if (searchInput) {
    searchInput.addEventListener('input', filterCourses);
}

if (categoryFilter) {
    categoryFilter.addEventListener('change', filterCourses);
}

if (difficultyFilter) {
    difficultyFilter.addEventListener('change', filterCourses);
}

function filterCourses() {
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : '';
    const difficulty = difficultyFilter ? difficultyFilter.value : '';
    
    let filteredCourses = sampleCourses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchTerm) ||
                              course.description.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || course.category === category;
        const matchesDifficulty = !difficulty || course.difficulty === difficulty;
        
        return matchesSearch && matchesCategory && matchesDifficulty;
    });
    
    displayCourses(filteredCourses);
}

// Load more button
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        alert('Load more functionality - implement pagination');
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadCourses();
    
    // Load trending courses on home page
    const trendingCourses = document.getElementById('trendingCourses');
    if (trendingCourses) {
        displayCourses(sampleCourses.slice(0, 3));
    }
});
