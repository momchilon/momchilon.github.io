document.addEventListener("DOMContentLoaded", function() {
  console.log("DOM fully loaded");

  /* Interactive Network Topology Visualization (Networking Section) */
  const netSection = document.getElementById('networking');
  if (!netSection) {
    console.error("Networking section not found!");
    return;
  }
  const width = window.innerWidth;
  const height = netSection.clientHeight;
  console.log("Network section dimensions:", width, height);
  
  const svg = d3.select('#network-bg')
    .append('svg')
    .attr('width', width)
    .attr('height', height);
  
  // Sample network data
  const nodes = [
    { id: 'Router' },
    { id: 'Switch 1' },
    { id: 'Switch 2' },
    { id: 'Server' },
    { id: 'Workstation' }
  ];
  
  const links = [
    { source: 'Router', target: 'Switch 1' },
    { source: 'Router', target: 'Switch 2' },
    { source: 'Switch 1', target: 'Server' },
    { source: 'Switch 2', target: 'Workstation' }
  ];
  
  const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(120))
    .force("charge", d3.forceManyBody().strength(-200))
    .force("center", d3.forceCenter(width / 2, height / 2));
  
  const linkSelection = svg.append("g")
    .attr("stroke", "#1abc9c")
    .attr("stroke-width", 2)
    .selectAll("line")
    .data(links)
    .enter().append("line");
  
  const nodeSelection = svg.append("g")
    .attr("fill", "#fff")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 8)
    .call(d3.drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded));
  
  simulation.on("tick", () => {
    linkSelection
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y);
    
    nodeSelection
      .attr("cx", d => d.x)
      .attr("cy", d => d.y);
  });
  
  function dragStarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  
  function dragEnded(event, d) {
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
  
  // Responsive resize for the SVG container
  window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = netSection.clientHeight;
    console.log("Resizing SVG to:", newWidth, newHeight);
    svg.attr('width', newWidth).attr('height', newHeight);
    simulation.force("center", d3.forceCenter(newWidth / 2, newHeight / 2));
    simulation.alpha(0.3).restart();
  });
  
  /* Matrix-Style Binary Code Animation (Cybersecurity Section) */
  const canvas = document.getElementById("matrix-canvas");
  if (!canvas) {
    console.error("Matrix canvas not found!");
    return;
  }
  const ctx = canvas.getContext("2d");
  
  function resizeCanvas() {
    const cs = document.getElementById('cybersecurity');
    if (cs) {
      canvas.width = window.innerWidth;
      canvas.height = cs.clientHeight;
      console.log("Canvas resized to:", canvas.width, canvas.height);
    } else {
      console.error("Cybersecurity section not found!");
    }
  }
  resizeCanvas();
  
  const binaryChars = "01";
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  const drops = Array(columns).fill(1);
  
  function drawMatrix() {
    ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#0f0";
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
      const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      ctx.fillText(text, x, y);
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(drawMatrix, 50);
  
  window.addEventListener('resize', () => {
    resizeCanvas();
  });
});
