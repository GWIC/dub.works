(function() {
  var lastTime = 0;
  var vendors = ["ms", "moz", "webkit", "o"];
  for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x] + "RequestAnimationFrame"];
    window.cancelAnimationFrame =
      window[vendors[x] + "CancelAnimationFrame"] ||
      window[vendors[x] + "CancelRequestAnimationFrame"];
  }

  if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
      var currTime = new Date().getTime();
      var timeToCall = Math.max(0, 16 - (currTime - lastTime));
      var id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);
      lastTime = currTime + timeToCall;
      return id;
    };

  if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
      clearTimeout(id);
    };
})();

var Nodes = {
  // Settings
  density: 10,

  drawDistance: 24,
  baseRadius: 4,
  maxLineThickness: 4,
  reactionSensitivity: 3,
  lineThickness: 1,

  points: [],
  mouse: { x: -1000, y: -1000, down: false },

  animation: null,

  canvas: null,
  context: null,

  imageInput: null,
  bgImage: null,
  bgCanvas: null,
  bgContext: null,
  bgContextPixelData: null,

  init: function() {
    // Set up the visual canvas
    this.canvas = document.getElementById("canvas");
    this.context = canvas.getContext("2d");
    this.context.globalCompositeOperation = "lighter";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight * 0.25;
    this.canvas.style.display = "block";

    this.imageInput = document.createElement("input");
    this.imageInput.setAttribute("type", "file");
    this.imageInput.style.visibility = "hidden";
    this.imageInput.addEventListener("change", this.upload, false);
    document.body.appendChild(this.imageInput);

    this.canvas.addEventListener("mousemove", this.mouseMove, false);
    this.canvas.addEventListener("mousedown", this.mouseDown, false);
    this.canvas.addEventListener("mouseup", this.mouseUp, false);
    this.canvas.addEventListener("mouseout", this.mouseOut, false);

    window.onresize = function(event) {
      Nodes.canvas.width = window.innerWidth;
      Nodes.canvas.height = window.innerHeight;
      Nodes.onWindowResize();
    };

    // Load initial input image (the chrome logo!)
    this.loadData( "data:image/png;base64,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");
  },

  preparePoints: function() {
    // Clear the current points
    this.points = [];

    var width, height, i, j;

    var colors = this.bgContextPixelData.data;

    for (i = 0; i < this.canvas.height; i += this.density) {
      for (j = 0; j < this.canvas.width; j += this.density) {
        var pixelPosition = (j + i * this.bgContextPixelData.width) * 4;

        // Dont use whiteish pixels
        if (
          (colors[pixelPosition] > 200 &&
            colors[pixelPosition + 1] > 200 &&
            colors[pixelPosition + 2] > 200) ||
          colors[pixelPosition + 3] === 0
        ) {
          continue;
        }

        var color =
          "rgba(" +
          colors[pixelPosition] +
          "," +
          colors[pixelPosition + 1] +
          "," +
          colors[pixelPosition + 2] +
          "," +
          "1)";
        this.points.push({
          x: j,
          y: i,
          originalX: j,
          originalY: i,
          color: color
        });
      }
    }
  },

  updatePoints: function() {
    var i, currentPoint, theta, distance;

    for (i = 0; i < this.points.length; i++) {
      currentPoint = this.points[i];

      theta = Math.atan2(
        currentPoint.y - this.mouse.y,
        currentPoint.x - this.mouse.x
      );

      if (this.mouse.down) {
        distance =
          this.reactionSensitivity *
          200 /
          Math.sqrt(
            (this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
              (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y)
          );
      } else {
        distance =
          this.reactionSensitivity *
          100 /
          Math.sqrt(
            (this.mouse.x - currentPoint.x) * (this.mouse.x - currentPoint.x) +
              (this.mouse.y - currentPoint.y) * (this.mouse.y - currentPoint.y)
          );
      }

      currentPoint.x +=
        Math.cos(theta) * distance +
        (currentPoint.originalX - currentPoint.x) * 0.05;
      currentPoint.y +=
        Math.sin(theta) * distance +
        (currentPoint.originalY - currentPoint.y) * 0.05;
    }
  },

  drawLines: function() {
    var i, j, currentPoint, otherPoint, distance, lineThickness;

    for (i = 0; i < this.points.length; i++) {
      currentPoint = this.points[i];

      // Draw the dot.
      this.context.fillStyle = currentPoint.color;
      this.context.strokeStyle = currentPoint.color;

      for (j = 0; j < this.points.length; j++) {
        // Distaqnce between two points.
        otherPoint = this.points[j];

        if (otherPoint == currentPoint) {
          continue;
        }

        distance = Math.sqrt(
          (otherPoint.x - currentPoint.x) * (otherPoint.x - currentPoint.x) +
            (otherPoint.y - currentPoint.y) * (otherPoint.y - currentPoint.y)
        );

        if (distance <= this.drawDistance) {
          this.context.lineWidth =
            (1 - distance / this.drawDistance) *
            this.maxLineThickness *
            this.lineThickness;
          this.context.beginPath();
          this.context.moveTo(currentPoint.x, currentPoint.y);
          this.context.lineTo(otherPoint.x, otherPoint.y);
          this.context.stroke();
        }
      }
    }
  },

  drawPoints: function() {
    var i, currentPoint;

    for (i = 0; i < this.points.length; i++) {
      currentPoint = this.points[i];

      // Draw the dot.
      this.context.fillStyle = currentPoint.color;
      this.context.strokeStyle = currentPoint.color;

      this.context.beginPath();
      this.context.arc(
        currentPoint.x,
        currentPoint.y,
        this.baseRadius,
        0,
        Math.PI * 2,
        true
      );
      this.context.closePath();
      this.context.fill();
    }
  },

  draw: function() {
    this.animation = requestAnimationFrame(function() {
      Nodes.draw();
    });

    this.clear();
    this.updatePoints();
    this.drawLines();
    this.drawPoints();
  },

  clear: function() {
    this.canvas.width = this.canvas.width;
  },

  // The filereader has loaded the image... add it to image object to be drawn
  loadData: function(data) {
    this.bgImage = new Image();
    this.bgImage.src = data;

    this.bgImage.onload = function() {
      //this
      Nodes.drawImageToBackground();
    };
  },

  // Image is loaded... draw to bg canvas
  drawImageToBackground: function() {
    this.bgCanvas = document.createElement("canvas");
    this.bgCanvas.width = this.canvas.width;
    this.bgCanvas.height = this.canvas.height;

    var newWidth, newHeight;

    // If the image is too big for the screen... scale it down.
    if (
      this.bgImage.width > this.bgCanvas.width - 100 ||
      this.bgImage.height > this.bgCanvas.height - 100
    ) {
      var maxRatio = Math.max(
        this.bgImage.width / (this.bgCanvas.width - 100),
        this.bgImage.height / (this.bgCanvas.height - 100)
      );
      newWidth = this.bgImage.width / maxRatio;
      newHeight = this.bgImage.height / maxRatio;
    } else {
      newWidth = this.bgImage.width;
      newHeight = this.bgImage.height;
    }

    // Draw to background canvas
    this.bgContext = this.bgCanvas.getContext("2d");
    this.bgContext.drawImage(
      this.bgImage,
      (this.canvas.width - newWidth) / 2,
      (this.canvas.height - newHeight) / 2,
      newWidth,
      newHeight
    );
    this.bgContextPixelData = this.bgContext.getImageData(
      0,
      0,
      this.bgCanvas.width,
      this.bgCanvas.height
    );

    this.preparePoints();
    this.draw();
  },

  mouseDown: function(event) {
    Nodes.mouse.down = true;
  },

  mouseUp: function(event) {
    Nodes.mouse.down = false;
  },

  mouseMove: function(event) {
    Nodes.mouse.x = event.offsetX || event.layerX - Nodes.canvas.offsetLeft;
    Nodes.mouse.y = event.offsetY || event.layerY - Nodes.canvas.offsetTop;
  },

  mouseOut: function(event) {
    Nodes.mouse.x = -1000;
    Nodes.mouse.y = -1000;
    Nodes.mouse.down = false;
  },

  // Resize and redraw the canvas.
  onWindowResize: function() {
    cancelAnimationFrame(this.animation);
    this.drawImageToBackground();
  }
};

setTimeout(function() {
  Nodes.init();
}, 10);
