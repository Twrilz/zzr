// Set current year in elements with class 'current-year'
(function(){
  try {
    var year = new Date().getFullYear();
    var els = document.querySelectorAll('.current-year');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = year;
    }

    // Auto-update age based on birthday
    function computeAgeFromDate(birthDate) {
      var today = new Date();
      var age = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }

    var ageEl = document.getElementById('age');
    var birthdayEl = document.getElementById('birthday');
    if (ageEl && birthdayEl) {
      var birthAttr = birthdayEl.getAttribute('data-birthday');
      var birthDate = null;
      if (birthAttr) {
        // Expect ISO format YYYY-MM-DD
        birthDate = new Date(birthAttr + 'T00:00:00');
      } else {
        // Fallback: try parsing text content like "November 28, 2005"
        birthDate = new Date(birthdayEl.textContent.trim());
      }

      // Ensure parsed value is a valid Date
      if (birthDate instanceof Date && !isNaN(birthDate.getTime())) {
        ageEl.textContent = computeAgeFromDate(birthDate);
      } else {
        ageEl.textContent = 'N/A';
        console.warn('Could not parse birthday:', birthdayEl.textContent || birthAttr, birthDate);
      }
    }
  } catch (e) {
    console.error('Failed to set current year or age', e);
  }
})();
