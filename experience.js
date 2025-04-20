// Show the right panel *and* swap the shared logo
function showExperience(experienceId, logoUrl) {
    // 1️⃣ Hide all panels
    document.querySelectorAll('.experience-item').forEach(exp => {
      exp.style.display = 'none';
      exp.style.opacity = 0;
    });
  
    // 2️⃣ Show the selected panel
    const panel = document.getElementById(experienceId);
    if (panel) {
      panel.style.display = 'block';
      setTimeout(() => panel.style.opacity = 1, 10);
    }
  
    // 3️⃣ Update the “active” class on the sidebar
    document.querySelectorAll('.sidebar a').forEach(link => {
      link.classList[ link.getAttribute('href') === `#${experienceId}` ? 'add' : 'remove' ]('active');
    });
  
    // 4️⃣ Swap the shared logo’s src/alt
    const logoImg = document.querySelector('.company-logo-container .company-logo');
    if (logoImg) {
      logoImg.src = logoUrl;
      logoImg.alt = experienceId + ' logo';
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar a');
  
    links.forEach(link => {
      link.addEventListener('click', e => {
        e.preventDefault();
        const id   = link.getAttribute('href').slice(1);
        const logo = link.dataset.logo;
        showExperience(id, logo);
      });
    });
  
    // Initialize on the first tab
    if (links.length) {
      const first = links[0];
      showExperience(
        first.getAttribute('href').slice(1),
        first.dataset.logo
      );
    }
  });
  