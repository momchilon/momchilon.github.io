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
  const netBg = document.getElementById('network-bg'); // Target the container div
  let simulation, svg, nodeSel, linkSel; // Keep references accessible
  // Node count is dynamically set below (50/100)

  function setupD3Simulation(containerWidth, containerHeight) {
      // Clear previous SVG if resizing
      if (svg) {
          svg.remove();
      }
      if (!netBg) return; // Exit if container not found

      svg = d3.select(netBg).append('svg') // Append to the container div
               .attr('width', containerWidth)
               .attr('height', containerHeight);

      // Adjust node/link count and parameters based on width (Example)
      const isMobile = containerWidth < 768;
      const nodeCount = isMobile ? 50 : 100; // Keep dynamic count
      const linkCount = isMobile ? 70 : 150; // Adjusted link count slightly

      // --- MODIFIED FOR SPREAD ---
      const linkDistance = isMobile ? 80 : 130; // Increased distance significantly
      const chargeStrength = isMobile ? -90 : -120; // Increased charge magnitude
      // --- END MODIFICATION ---

      const nodeRadius = isMobile ? 2.5 : 3;

      const nodes = d3.range(nodeCount).map(i => ({ id: `node-${i}` }));
      // Ensure link source/target are different and within bounds
      const links = d3.range(linkCount).map(() => {
        let s = Math.floor(Math.random() * nodeCount);
        let t = Math.floor(Math.random() * nodeCount);
        while (t === s) { // Ensure source and target are different
          t = Math.floor(Math.random() * nodeCount);
        }
        return { source: nodes[s].id, target: nodes[t].id }; // Link by ID
      });

      // Store simulation reference
      simulation = d3.forceSimulation(nodes)
          .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance).strength(0.6)) // Adjust link strength if needed
          .force("charge", d3.forceManyBody().strength(chargeStrength))
          .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
          .velocityDecay(0.25) // Slightly faster decay
          .alphaTarget(0) // Start simulation cooled down unless interacted with
          .alphaDecay(0.05);

      linkSel = svg.append("g")
          .attr("stroke", "#1abc9c")
          .attr("stroke-opacity", 0.3) // Slightly reduced opacity
          .attr("stroke-width", 1)
          .selectAll("line")
          .data(links)
          .join("line"); // Use join for cleaner enter/update/exit

      nodeSel = svg.append("g")
          .selectAll("circle")
          .data(nodes)
          .join("circle") // Use join
          .attr("r", nodeRadius)
          .attr("fill", "#fff")
          .attr("fill-opacity", 0.7)
          .call(d3.drag() // Enable dragging
              .on("start", dragstarted)
              .on("drag", dragged)
              .on("end", dragended));

      // Tick function
      simulation.on("tick", () => {
          // Optional: Bound nodes within the SVG area
          nodeSel
              .attr("cx", d => d.x = Math.max(nodeRadius, Math.min(containerWidth - nodeRadius, d.x)))
              .attr("cy", d => d.y = Math.max(nodeRadius, Math.min(containerHeight - nodeRadius, d.y)));

          linkSel
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);

      });

      // Give it an initial kick to layout nodes
       simulation.alpha(0.4).restart(); // Slightly stronger initial kick
  }

  // Drag functions (remain the same)
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
    if (!event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }

  // --- Resize Handling for D3 (remains the same) ---
  const handleD3Resize = debounce(() => {
      if (!netBg || !netSection) return; // Ensure elements exist
      const newWidth = netBg.clientWidth;
      const newHeight = netBg.clientHeight;
      console.log(`Resizing D3 to: ${newWidth} x ${newHeight}`);
      if(newWidth > 0 && newHeight > 0) {
        setupD3Simulation(newWidth, newHeight);
      }
  }, 250);
  window.addEventListener('resize', handleD3Resize);

  // Initial setup Call for D3 (remains the same)
  if (netBg && netSection) {
      requestAnimationFrame(() => {
        const initialWidth = netBg.clientWidth;
        const initialHeight = netBg.clientHeight;
        if (initialWidth > 0 && initialHeight > 0) {
             setupD3Simulation(initialWidth, initialHeight);
        } else {
            console.warn("D3 container has zero dimensions on initial setup, trying again shortly.");
            setTimeout(() => {
                 const w = netBg.clientWidth;
                 const h = netBg.clientHeight;
                 if (w > 0 && h > 0) setupD3Simulation(w, h);
            }, 150);
        }
      });
  } else {
       console.error("Networking background container or section not found for D3 setup.");
  }


  // --- Optional: Intersection Observer for D3 Performance (remains the same) ---
  /* // Uncomment and test this block for pausing simulation when off-screen
  ...
  */

  // --- Matrix Binary Code Animation (remains the same) ---
  const canvas = document.getElementById("matrix-canvas");
  const cyberSection = document.getElementById('cybersecurity');
  let ctx;
  let animationFrameId = null;
  let columns = 0;
  let drops = [];
  const fontSize = 16;
  const binaryChars = "01";

  if (canvas && canvas.getContext && cyberSection) {
    ctx = canvas.getContext("2d");

    function resizeMatrixCanvas() {
        const sectionHeight = cyberSection.clientHeight;
        canvas.width = window.innerWidth;
        canvas.height = sectionHeight > 0 ? sectionHeight : window.innerHeight;
        columns = Math.max(1, Math.floor(canvas.width / fontSize));
        drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize));
    }

    const drawMatrix = () => {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)';
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
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    const handleMatrixResize = debounce(() => {
        console.log("Resizing Matrix Canvas");
        resizeMatrixCanvas();
    }, 250);
    window.addEventListener('resize', handleMatrixResize);

    resizeMatrixCanvas(); // Initial size set

    if (animationFrameId) {
         cancelAnimationFrame(animationFrameId);
    }
    drawMatrix(); // Start animation


    // --- Optional: Intersection Observer for Matrix Performance (remains the same) ---
    /* // Uncomment and test this block for pausing animation when off-screen
    ...
    */

  } else {
    console.error("Matrix canvas or cybersecurity section not found, or context not supported.");
  }

}); // End DOMContentLoaded listener
