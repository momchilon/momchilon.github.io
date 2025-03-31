document.addEventListener("DOMContentLoaded", function() {

  // --- Debounce Helper Function ---
  function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
      const context = this;
      const args = arguments;
      const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };


  // --- Network Visualization ---
  const netSection = document.getElementById('networking');
  const netBg = document.getElementById('network-bg');
  let simulation, svg, nodeSel, linkSel; // Keep references accessible

  function setupD3Simulation(containerWidth, containerHeight) {
      if (svg) {
          svg.remove(); // Clear previous SVG
      }
      if (!netBg || containerWidth <= 0 || containerHeight <= 0) {
          console.error("D3 container not found or has zero dimensions.");
          return; // Exit if container not valid
      }

      svg = d3.select(netBg).append('svg')
               .attr('width', containerWidth)
               .attr('height', containerHeight);

      // Dynamic parameters based on width
      const isMobile = containerWidth < 768;
      const nodeCount = isMobile ? 50 : 100;
      const linkCount = isMobile ? 70 : 150;
      const linkDistance = isMobile ? 80 : 130; // Increased distance
      const chargeStrength = isMobile ? -90 : -120; // Increased repulsion
      const nodeRadius = isMobile ? 2.5 : 3;

      const nodes = d3.range(nodeCount).map(i => ({ id: `node-${i}` }));
      const links = d3.range(linkCount).map(() => {
        let s = Math.floor(Math.random() * nodeCount);
        let t = Math.floor(Math.random() * nodeCount);
        while (t === s) {
          t = Math.floor(Math.random() * nodeCount);
        }
        // Ensure nodes exist before accessing id - robust linking
        return { source: nodes[s]?.id, target: nodes[t]?.id };
      }).filter(link => link.source && link.target); // Filter out invalid links if nodes array is modified

      // Force Simulation Setup
      simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance).strength(0.5)) // Adjusted link strength
          .force("charge", d3.forceManyBody().strength(chargeStrength))
          .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
          .force("collide", d3.forceCollide().radius(nodeRadius + 2)) // Add collision force
          .velocityDecay(0.3) // Slightly faster settling
          .alphaTarget(0)
          .alphaDecay(0.03); // Slower decay for more initial movement

      // Draw Links
      linkSel = svg.append("g")
          .attr("class", "links")
          .attr("stroke", "#1abc9c")
          .attr("stroke-opacity", 0.3)
          .attr("stroke-width", 1)
          .selectAll("line")
          .data(links)
          .join("line");

      // Draw Nodes
      nodeSel = svg.append("g")
          .attr("class", "nodes")
          .selectAll("circle")
          .data(nodes)
          .join("circle")
          .attr("r", nodeRadius)
          .attr("fill", "#fff")
          .attr("fill-opacity", 0.8) // Slightly more opaque
          .call(d3.drag() // Enable dragging
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      // Tick Function: Update positions
      simulation.on("tick", () => {
          // Keep nodes within bounds
          nodeSel
              .attr("cx", d => d.x = Math.max(nodeRadius + 1, Math.min(containerWidth - nodeRadius - 1, d.x)))
              .attr("cy", d => d.y = Math.max(nodeRadius + 1, Math.min(containerHeight - nodeRadius - 1, d.y)));

          linkSel
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);
      });

      // Initial kick
       simulation.alpha(0.5).restart(); // Stronger initial kick
  }

  // D3 Drag Handlers
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x;
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0); // Cool down
    d.fx = null; // Release fixed position
    d.fy = null;
  }

  // Debounced Resize Handler for D3
  const handleD3Resize = debounce(() => {
      if (!netBg || !netSection) return;
      const newWidth = netBg.clientWidth;
      const newHeight = netBg.clientHeight;
      console.log(`Debounced Resize D3 to: ${newWidth} x ${newHeight}`);
      if(newWidth > 0 && newHeight > 0) {
        setupD3Simulation(newWidth, newHeight);
      } else {
        console.warn("Container dimensions are zero during resize.");
      }
  }, 250);
  window.addEventListener('resize', handleD3Resize);

  // Initial D3 Setup Call (using RAF for better timing)
  function initD3() {
      if (!netBg || !netSection) {
           console.error("Networking background container or section not found for D3 setup.");
           return;
      }
      requestAnimationFrame(() => { // Wait for next frame render
            const initialWidth = netBg.clientWidth;
            const initialHeight = netBg.clientHeight;
            console.log(`Initial D3 Size: ${initialWidth} x ${initialHeight}`);
            if (initialWidth > 0 && initialHeight > 0) {
                 setupD3Simulation(initialWidth, initialHeight);
            } else {
                console.warn("D3 container zero dimensions on init, retrying shortly...");
                // Retry after a short delay if initial dimensions were 0
                setTimeout(() => {
                     const w = netBg.clientWidth;
                     const h = netBg.clientHeight;
                     if (w > 0 && h > 0) setupD3Simulation(w, h);
                     else console.error("D3 container still zero dimensions after retry.");
                }, 200);
            }
      });
  }
  initD3(); // Call the initialization function


  // --- Matrix Binary Code Animation ---
  const canvas = document.getElementById("matrix-canvas");
  const cyberSection = document.getElementById('cybersecurity');
  let ctx;
  let animationFrameId = null;
  let columns = 0;
  let drops = [];
  const fontSize = 14; // Slightly smaller font size
  const binaryChars = "01"; // Can add more characters: "01<>/"

  if (canvas && canvas.getContext && cyberSection) {
    ctx = canvas.getContext("2d");

    function resizeMatrixCanvas() {
        const sectionHeight = cyberSection.clientHeight;
        canvas.width = window.innerWidth;
        // Ensure minimum height, useful if section is very short initially
        canvas.height = Math.max(sectionHeight, 300);
        columns = Math.max(1, Math.floor(canvas.width / fontSize));
        // Smart drop reset: keep existing drops if columns unchanged, else reset
        if (drops.length !== columns) {
             drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize));
        } else {
             // Optional: Adjust existing drop positions if height changed significantly
             drops = drops.map(d => Math.min(d, Math.floor(canvas.height / fontSize)));
        }
    }

    const drawMatrix = () => {
      if (!ctx || !canvas) return;

      // Semi-transparent background for trails
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Green color
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Reset drops randomly
        if (y > canvas.height && Math.random() > 0.98) { // Slightly less frequent reset
          drops[i] = 0;
        }
        drops[i]++;
      }

      // Continue animation loop
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    // Debounced Resize Handler for Matrix
    const handleMatrixResize = debounce(() => {
        console.log("Debounced Resize Matrix Canvas");
        resizeMatrixCanvas();
        // Animation loop continues automatically via requestAnimationFrame
    }, 250);
    window.addEventListener('resize', handleMatrixResize);

    // Initial Matrix Setup
    function initMatrix() {
         requestAnimationFrame(() => { // Wait for layout
             resizeMatrixCanvas();
             if (animationFrameId) { // Cancel previous loop if exists
                  cancelAnimationFrame(animationFrameId);
             }
             drawMatrix(); // Start the animation loop
         });
    }
    initMatrix(); // Call initialization

  } else {
    console.error("Matrix canvas, cybersecurity section not found, or 2D context not supported.");
  }

  // Optional: Add Intersection Observers here if desired for performance
  // (See previous examples - requires careful testing)

}); // End DOMContentLoaded listener
