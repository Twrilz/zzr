(function() {
  function initLeaves() {
    try {
      if (!document.getElementById('falling-leaves-keyframes')) {
        var styleSheet = document.createElement("style");
        styleSheet.id = 'falling-leaves-keyframes';
        styleSheet.type = "text/css";
        styleSheet.innerHTML = `
          @keyframes fall {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(110vh) rotate(360deg);
              opacity: 0.2;
            }
          }
        `;
        document.head.appendChild(styleSheet);
      }

      var testMode = false; // change to true to test the leaves effect outside the date range 
      var startDate = new Date("2026-09-22T00:00:00");
      var endDate = new Date("2026-12-21T23:59:59");
      var currentDate = new Date();

      if (testMode || (currentDate >= startDate && currentDate <= endDate)) {
        startFallingLeaves();
      }

      function startFallingLeaves() {
        var container = document.createElement("div");
        container.id = "falling-leaves-container";
        container.style.display = "block";
        container.style.position = "fixed";
        container.style.top = "0";
        container.style.left = "0";
        container.style.width = "100%";
        container.style.height = "100%";
        container.style.pointerEvents = "none";
        container.style.zIndex = "9998";
        container.style.overflow = "hidden";
        document.body.appendChild(container);

        var leafCount = 22;
        for (var i = 0; i < leafCount; i++) {
          createLeaf(container);
        }
      }

      function createLeaf(container) {
        var leaf = document.createElement("div");
        leaf.className = "leaf";
        leaf.style.position = "absolute";
        leaf.style.top = "-10vh";
        
        var width = Math.random() * 10 + 10;
        var height = Math.random() * 12 + 14;
        leaf.style.width = width + "px";
        leaf.style.height = height + "px";
        leaf.style.left = (Math.random() * 100) + "vw";
        
        var duration = Math.random() * 6 + 4;
        var delay = Math.random() * 6;
        
        leaf.style.animation = "fall " + duration + "s linear " + delay + "s infinite";

        var colors = [
          "#ff5722", "#e64a19", "#ffb300", "#ffa000", 
          "#d84315", "#c62828", "#fbc02d", "#b26a00", "#e65100"
        ];
        leaf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        
        var shapes = [
          "0% 100% 50% 50% / 0% 50% 50% 100%",
          "50% 50% 20% 80% / 40% 30% 70% 60%",
          "30% 70% 30% 70% / 70% 30% 70% 30%",
          "80% 20% 60% 40% / 50% 50% 50% 50%",
          "100% 0% 40% 60% / 60% 40% 0% 100%"
        ];
        leaf.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
        
        leaf.style.boxShadow = "inset -2px -2px 4px rgba(0,0,0,0.25)";

        container.appendChild(leaf);

        leaf.addEventListener("animationiteration", function() {
          leaf.style.left = (Math.random() * 100) + "vw";
        });
      }

    } catch (e) {
      console.error('Failed to initialize falling leaves', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLeaves);
  } else {
    initLeaves();
  }
})();