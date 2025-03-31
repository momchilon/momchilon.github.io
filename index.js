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
  let nodeCount = 100; // Initial counts
  let linkCount = 200;

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
      nodeCount = isMobile ? 50 : 100;
      linkCount = isMobile ? 80 : 200;
      const linkDistance = isMobile ? 50 : 80;
      const chargeStrength = isMobile ? -50 : -70;
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
          .force("link", d3.forceLink(links).id(d => d.id).distance(linkDistance))
          .force("charge", d3.forceManyBody().strength(chargeStrength))
          .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2))
          .velocityDecay(0.25) // Slightly faster decay
          .alphaTarget(0) // Start simulation cooled down unless interacted with
          .alphaDecay(0.05);

      linkSel = svg.append("g")
          .attr("stroke", "#1abc9c")
          .attr("stroke-opacity", 0.4)
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
          linkSel
              .attr("x1", d => d.source.x)
              .attr("y1", d => d.source.y)
              .attr("x2", d => d.target.x)
              .attr("y2", d => d.target.y);
          nodeSel
              .attr("cx", d => d.x)
              .attr("cy", d => d.y);
      });

      // Give it an initial kick to layout nodes
       simulation.alpha(0.3).restart();
  }

  // Drag functions
  function dragstarted(event, d) {
    if (!event.active) simulation.alphaTarget(0.3).restart(); // Heat up simulation on drag start
    d.fx = d.x; // Fix node position
    d.fy = d.y;
  }
  function dragged(event, d) {
    d.fx = event.x; // Update fixed position during drag
    d.fy = event.y;
  }
  function dragended(event, d) {
    if (!event.active) simulation.alphaTarget(0); // Cool down simulation
    d.fx = null; // Release fixed position
    d.fy = null;
  }

  // --- Resize Handling for D3 ---
  const handleD3Resize = debounce(() => {
      if (!netBg || !netSection) return; // Ensure elements exist
      // Use clientWidth/clientHeight of the container
      const newWidth = netBg.clientWidth;
      const newHeight = netBg.clientHeight; // Use container height
      console.log(`Resizing D3 to: ${newWidth} x ${newHeight}`);
      // Re-setup the simulation entirely for dynamic node counts etc.
      if(newWidth > 0 && newHeight > 0) {
        setupD3Simulation(newWidth, newHeight);
      }
  }, 250); // Debounce resize - wait 250ms after resize stops

  window.addEventListener('resize', handleD3Resize);

  // Initial setup Call for D3
  if (netBg && netSection) {
      // Ensure the container has dimensions before setting up
      // Use requestAnimationFrame to wait for layout calculation
      requestAnimationFrame(() => {
        const initialWidth = netBg.clientWidth;
        const initialHeight = netBg.clientHeight; // Use container height
        if (initialWidth > 0 && initialHeight > 0) {
             setupD3Simulation(initialWidth, initialHeight);
        } else {
            console.warn("D3 container has zero dimensions on initial setup, might need layout recalulation or different timing.");
            // Fallback or try again slightly later if needed
            setTimeout(() => {
                 const w = netBg.clientWidth;
                 const h = netBg.clientHeight;
                 if (w > 0 && h > 0) setupD3Simulation(w, h);
            }, 100);
        }
      });
  } else {
       console.error("Networking background container or section not found for D3 setup.");
  }


  // --- Optional: Intersection Observer for D3 Performance ---
  /* // Uncomment and test this block for pausing simulation when off-screen
  const d3ObserverOptions = { root: null, threshold: 0.01 }; // 1% visible
  const d3Observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!simulation) return; // Exit if simulation not initialized
      if (entry.isIntersecting) {
        console.log("Network section visible, restarting simulation if stopped");
        // Only restart if it was actually stopped (check alpha or a custom flag)
        if (simulation.alpha() < simulation.alphaMin()) {
            simulation.alpha(0.3).restart(); // Give it a kick
        }
      } else {
        console.log("Network section hidden, stopping simulation");
        simulation.stop();
      }
    });
  }, d3ObserverOptions);

  if (netSection) {
      d3Observer.observe(netSection);
  } else {
       console.error("Networking section not found for Intersection Observer");
  }
  */


  // --- Matrix Binary Code Animation ---
  const canvas = document.getElementById("matrix-canvas");
  const cyberSection = document.getElementById('cybersecurity'); // Get section element
  let ctx; // Declare context globally for this scope
  let animationFrameId = null; // Store the animation frame ID
  let columns = 0;
  let drops = [];
  const fontSize = 16; // Consider making this adaptable or slightly smaller on mobile
  const binaryChars = "01";

  if (canvas && canvas.getContext && cyberSection) {
    ctx = canvas.getContext("2d");

    function resizeMatrixCanvas() {
        // Use the section's clientHeight for the canvas height
        const sectionHeight = cyberSection.clientHeight;
        canvas.width = window.innerWidth;
        canvas.height = sectionHeight > 0 ? sectionHeight : window.innerHeight; // Fallback height

        columns = Math.max(1, Math.floor(canvas.width / fontSize)); // Ensure at least 1 column
        // Reset drops array based on new column count
        drops = Array(columns).fill(1).map(() => Math.floor(Math.random() * canvas.height / fontSize)); // Random start position
    }

    const drawMatrix = () => {
      if (!ctx) return; // Ensure context exists

      // Use a semi-transparent fill for the trail effect
      ctx.fillStyle = 'rgba(20, 20, 20, 0.05)'; // Dark background with low opacity
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#0f0"; // Green text
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = binaryChars.charAt(Math.floor(Math.random() * binaryChars.length));
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        ctx.fillText(text, x, y);

        // Reset drop randomly after it goes off screen + add randomness
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0; // Reset to top
        }
        drops[i]++;
      }

      // Request the next frame
      animationFrameId = requestAnimationFrame(drawMatrix);
    };

    // Debounced resize handler for Matrix
    const handleMatrixResize = debounce(() => {
        console.log("Resizing Matrix Canvas");
        resizeMatrixCanvas();
        // No need to explicitly restart animationFrame - it continues unless cancelled
    }, 250); // Debounce resize

    window.addEventListener('resize', handleMatrixResize);

    // Initial setup for Matrix
    resizeMatrixCanvas(); // Set initial size

    // Start the animation loop
    // Cancel any previous loop if script re-runs (e.g., in development HMR)
    if (animationFrameId) {
         cancelAnimationFrame(animationFrameId);
    }
    drawMatrix(); // Start the animation loop


    // --- Optional: Intersection Observer for Matrix Performance ---
    /* // Uncomment and test this block for pausing animation when off-screen
    const matrixObserverOptions = { root: null, threshold: 0.01 }; // 1% visible
    const matrixObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                console.log("Matrix section visible, starting animation");
                if (!animationFrameId) { // Start only if not already running
                    drawMatrix();
                }
            } else {
                console.log("Matrix section hidden, stopping animation");
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null; // Reset ID
                }
            }
        });
    }, matrixObserverOptions);

    if (cyberSection) {
        matrixObserver.observe(cyberSection);
    } else {
        console.error("Cybersecurity section not found for Intersection Observer");
        // Fallback: Ensure animation starts if observer setup fails
         if (!animationFrameId) drawMatrix();
    }
    */

  } else {
    console.error("Matrix canvas or cybersecurity section not found, or context not supported.");
  }

}); // End DOMContentLoaded listener