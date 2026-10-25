const courseDetails = {
    '1': ['React from the Ground Up', 'Learn React from scratch and build modern web applications.'],
    '2': ['Python for Data Analysis', 'Master Python for data science and analysis.'],
    '3': ['Modern JavaScript from Zero to Pro', 'Complete JavaScript guide from basics to advanced.'],
    '4': ['Node.js Backend Development', 'Build scalable backend applications with Node.js.'],
    '5': ['UI/UX Design Fundamentals', 'Learn the principles of great user interface design.'],
    '6': ['Machine Learning Basics', 'Introduction to machine learning algorithms.']
};

const courseId = new URLSearchParams(window.location.search).get('id');
const course = courseDetails[courseId];

if (course) {
    document.getElementById('courseTitle').textContent = course[0];
    document.getElementById('courseDescription').textContent = course[1];
} else {
    document.getElementById('courseTitle').textContent = 'Course not found';
    document.getElementById('courseDescription').textContent = 'Please return to the courses page and choose a valid course.';
}
