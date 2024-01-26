// Function to hide all items and show the one with the id provided
function showExperience(experienceId) {
    // Hide all experiences
    var experiences = document.querySelectorAll('.experience-item');
    experiences.forEach(function(exp) {
        exp.style.display = 'none';
        exp.style.opacity = 0;
    });

    // Show the selected experience
    var expToShow = document.getElementById(experienceId);
    if (expToShow) {
        expToShow.style.display = 'block';
        setTimeout(() => {
            expToShow.style.opacity = 1;
        }, 10);
    }

    // Update active class on sidebar
    var sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(function(link) {
        if (link.getAttribute('href') === '#' + experienceId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Add event listeners once the DOM is fully loaded
document.addEventListener('DOMContentLoaded', (event) => {
    // Attach click event to sidebar links
    var sidebarLinks = document.querySelectorAll('.sidebar a');
    sidebarLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault(); // Stop the anchor link from jumping to the section
            var experienceId = this.getAttribute('href').substring(1); // Get the experience id
            showExperience(experienceId);
        });
    });

    // Initialize by showing the first experience
    showExperience('exp1');
});