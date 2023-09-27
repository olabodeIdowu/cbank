/// current year ///
export function getCurrentYear(year) {
  // const yearEl = document.querySelector('.year');
  const currentYear = new Date().getFullYear();
  year.textContent = currentYear;
}

// Scroll to other links
