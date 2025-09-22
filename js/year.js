// Set current year in elements with class 'current-year'
(function(){
  try {
    var year = new Date().getFullYear();
    var els = document.querySelectorAll('.current-year');
    for (var i = 0; i < els.length; i++) {
      els[i].textContent = year;
    }
  } catch (e) {
    console.error('Failed to set current year', e);
  }
})();
