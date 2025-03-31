document.addEventListener("DOMContentLoaded", function () {
  // --- Rotating Taglines ---
  const taglines = [
    "Secure Your Digital Future",
    "Networks Engineered for Excellence",
    "Where Infrastructure Meets Intelligence",
  ];
  let taglineIndex = 0;
  const taglineElement = document.querySelector(".tagline");

  function rotateTagline() {
    taglineIndex = (taglineIndex + 1) % taglines.length;
    taglineElement.textContent = taglines[taglineIndex];
  }
  setInterval(rotateTagline, 4000); // rotate every 4 seconds

  // --- Smooth Scroll for Explore Services Button ---
  document.getElementById("exploreBtn").addEventListener("click", function () {
    document.getElementById("networking").scrollIntoView({ behavior: "smooth" });
  });

  // --- Initialize Vis.js Network Graph ---
  const nodes = new vis.DataSet([
    { id: 1, label: "Router" },
    { id: 2, label: "Switch" },
    { id: 3, label: "Firewall" },
    { id: 4, label: "Server" },
    { id: 5, label: "Client" },
    { id: 6, label: "Cloud" },
  ]);

  const edges = new vis.DataSet([
    { from: 1, to: 2 },
    { from: 2, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 5 },
    { from: 4, to: 5 },
    { from: 4, to: 6 },
  ]);

  const container = document.getElementById("networkGraph");
  const data = { nodes: nodes, edges: edges };
  const options = {
    physics: {
      enabled: true,
      solver: "forceAtlas2Based",
    },
    nodes: {
      color: {
        background: "#8a2be2",
        border: "#ffffff",
      },
      font: { color: "#ffffff" },
    },
    edges: {
      color: "#ffffff",
    },
  };

  new vis.Network(container, data, options);

  // --- Matrix Code Rain Effect ---
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  // Adjust canvas size to match its displayed size
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;

  const letters = "01ABCDEF";
  const fontSize = 16;
  const columns = canvas.width / fontSize;
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 1; // start at position 1
  }

  function drawMatrix() {
    // Translucent background to create fade effect
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0F0"; // Green code
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  setInterval(drawMatrix, 50);

  // --- Contact Form Submission Handler ---
  const contactForm = document.getElementById("contactForm");
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    // Simulate form submission and display confirmation
    document.getElementById("contactConfirmation").classList.remove("hidden");
    contactForm.reset();
  });
});
