function Stopwatch(elem) {
    var time = 0;
    var offset;
    var interval;
  
    function update() {
      if (this.isOn) {
        time += delta();
      }
      
      elem.textContent = timeFormatter(time);
    }
  
    function delta() {
      var now = Date.now();
      var timePassed = now - offset;
  
      offset = now;
  
      return timePassed;
    }
  
    function timeFormatter(time) {
      time = new Date(time);
      var hours = time.getUTCHours().toString();
      var minutes = time.getUTCMinutes().toString();
      var seconds = time.getSeconds().toString();
      var milliseconds = time.getMilliseconds().toString();
        
      if (hours.length < 2) {
          hours = '0' + hours;
      }
      if (minutes.length < 2) {
        minutes = '0' + minutes;
      }
  
      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }
  
      while (milliseconds.length < 3) {
        milliseconds = '0' + milliseconds;
      }
  
      return hours + ' : ' + minutes + ' : ' + seconds + ' : ' + milliseconds;
    }
  
    this.start = function() {
      interval = setInterval(update.bind(this), 10);
      offset = Date.now();
      this.isOn = true;
    };
  
    this.stop = function() {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
    };
  
    this.reset = function() {
      time = 0;
      update();
    };
  
    this.isOn = false;
  }

var timer = document.getElementById('timer');
var toggleBtn = document.getElementById('toggle');
var resetBtn = document.getElementById('reset');

var watch = new Stopwatch(timer);

function start() {
  toggleBtn.textContent = 'Stop';
  watch.start();
}

function stop() {
  toggleBtn.textContent = 'Start';
  watch.stop();
}

toggleBtn.addEventListener('click', function() {
  watch.isOn ? stop() : start();
});

resetBtn.addEventListener('click', function() {
  watch.reset();
});