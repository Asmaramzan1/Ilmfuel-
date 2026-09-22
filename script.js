// ---------- Mobile menu ----------
function openMenu(){ document.getElementById('mobileMenu').classList.add('open'); }
function closeMenu(){ document.getElementById('mobileMenu').classList.remove('open'); }

// ---------- Scroll reveal (respects prefers-reduced-motion) ----------
document.addEventListener('DOMContentLoaded', () => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => io.observe(el));
});

// ---------- Form storage (local "table" until a real backend is connected) ----------
// NOTE for the site owner: this stores submissions in the visitor's own browser
// (localStorage), which is fine for testing but does NOT send you an email and
// does NOT collect data across visitors. To actually receive signups/messages,
// connect this form to Formspree (formspree.io), Buttondown, or a similar service —
// swap the localStorage calls below for a fetch() to that service's endpoint.

function saveSubmission(table, record) {
  const key = 'ilmfuel_' + table;
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({ ...record, submittedAt: new Date().toISOString() });
  localStorage.setItem(key, JSON.stringify(existing));
}

function handleNewsletter(e){
  e.preventDefault();
  const emailInput = e.target.querySelector('input[type=email]');
  const msg = e.target.parentElement.querySelector('.form-msg') || e.target.nextElementSibling;
  saveSubmission('newsletter_signups', { email: emailInput.value });
  if (msg) msg.textContent = "Thanks — you're on the list!";
  e.target.reset();
}

function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('contactName').value;
  const email = document.getElementById('contactEmail').value;
  const message = document.getElementById('contactMessage').value;
  const msg = document.getElementById('contactMsg');
  saveSubmission('contact_messages', { name, email, message });
  msg.textContent = "Message received — we'll reply within a couple of days, insha'Allah.";
  e.target.reset();
}
