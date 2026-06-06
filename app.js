// Typewriter effect
const roles = ["Frontend Developer", "Web Designer", "Problem Solver", "DSA Enthusiast"];
let rIdx = 0, cIdx = 0, deleting = false;
const tw = document.getElementById("typewriter");

function typewrite() {
  const word = roles[rIdx];
  if (!deleting) {
    tw.textContent = word.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === word.length) { deleting = true; setTimeout(typewrite, 1800); return; }
  } else {
    tw.textContent = word.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) { deleting = false; rIdx = (rIdx + 1) % roles.length; }
  }
  setTimeout(typewrite, deleting ? 80 : 120);
}
typewrite();

// Navbar scroll effect
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 50);
  highlightNav();
});

// Active nav highlight
function highlightNav() {
  const sections = document.querySelectorAll("section");
  const links = document.querySelectorAll(".nav-links a");
  let current = "";
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.getAttribute("id");
  });
  links.forEach(l => {
    l.classList.toggle("active", l.getAttribute("href") === "#" + current);
  });
}

// Mobile menu
function toggleMenu() {
  document.getElementById("navLinks").classList.toggle("open");
}
function closeMenu() {
  document.getElementById("navLinks").classList.remove("open");
}


// Contact form validation
function handleSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("cName").value.trim();
  const email = document.getElementById("cEmail").value.trim();
  const msg = document.getElementById("cMessage").value.trim();
  let valid = true;

  const clearErrors = () => {
    ["errName", "errEmail", "errMsg"].forEach(id => document.getElementById(id).textContent = "");
  };
  clearErrors();

  if (!name) { document.getElementById("errName").textContent = "Name is required."; valid = false; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    document.getElementById("errEmail").textContent = "Enter a valid email."; valid = false;
  }
  if (!msg || msg.length < 10) { document.getElementById("errMsg").textContent = "Message must be at least 10 characters."; valid = false; }

  if (valid) {
    const btn = document.getElementById("submitBtn");
    btn.textContent = "Sending...";
    btn.disabled = true;
    setTimeout(() => {
      document.getElementById("formSuccess").textContent = "✅ Message sent successfully! I'll get back to you soon.";
      document.getElementById("cName").value = "";
      document.getElementById("cEmail").value = "";
      document.getElementById("cMessage").value = "";
      btn.textContent = "Send Message";
      btn.disabled = false;
    }, 1500);
  }
}

// Smooth scroll offset for fixed navbar
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", e => {
    const target = document.querySelector(a.getAttribute("href"));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 70, behavior: "smooth" });
    }
  });
});
