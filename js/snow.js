(function() {
  function initSnow() {
    try {
      // 1. Automatically inject keyframes and snow styles into the page
      if (!document.getElementById('falling-snow-styles')) {
        var styleSheet = document.createElement("style");
        styleSheet.id = 'falling-snow-styles';
        styleSheet.type = "text/css";
        styleSheet.innerHTML = `
          .snow {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 9997;
            overflow: hidden;
          }
          .snowflake {
            position: absolute;
            top: -10vh;
            background-color: #ffffff;
            border-radius: 50%;
            opacity: 0.8;
            box-shadow: 0 0 4px rgba(255, 255, 255, 0.6);
            animation: fall-snow linear infinite;
          }
          @keyframes fall-snow {
            0% {
              transform: translateY(0) translateX(0);
            }
            50% {
              transform: translateY(60vh) translateX(15px);
            }
            100% {
              transform: translateY(110vh) translateX(-15px);
            }
          }
        `;
        document.head.appendChild(styleSheet);
      }

      // 2. Snow Animation (Configured dates)
      var testMode = false; // Change to false to disable test mode
      var startDate = new Date("2026-12-22T00:00:00");
      var endDate = new Date("2027-03-20T23:59:59");
      var currentDate = new Date();

      if (testMode || (currentDate >= startDate && currentDate <= endDate)) {
        startSnow();
      }

      function startSnow() {
        var container = document.querySelector('.snow');
        if (!container) {
          container = document.createElement("div");
          container.className = "snow";
          document.body.appendChild(container);
        }

        var flakeCount = 50; 
        for (var i = 0; i < flakeCount; i++) {
          createSnowflake(container);
        }
      }

      function createSnowflake(container) {
        var flake = document.createElement("div");
        flake.className = "snowflake";
        
        flake.style.left = (Math.random() * 100) + "vw";
        
        // Slower, drifting fall speed (3s to 8s)
        var duration = Math.random() * 5 + 3; 
        var delay = Math.random() * 5; 
        flake.style.animationDuration = duration + "s";
        flake.style.animationDelay = delay + "s";
        
        // Random snowflake size (3px to 8px)
        var size = Math.random() * 5 + 3;
        flake.style.width = size + "px";
        flake.style.height = size + "px";

        container.appendChild(flake);

        flake.addEventListener("animationiteration", function() {
          flake.style.left = (Math.random() * 100) + "vw";
        });
      }
    } catch (e) {
      console.error('Failed to initialize snow', e);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSnow);
  } else {
    initSnow();
  }
})();