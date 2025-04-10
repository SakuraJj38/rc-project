document.addEventListener('DOMContentLoaded', function() {
    // Tab System
    const tabs = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        const tabId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
        document.getElementById(tabId).classList.add('active');
      });
    });
    
    // Battery Simulation
    const batteryLevel = document.getElementById('battery-level');
    const batteryPercent = document.getElementById('battery-percent');
    let battery = 85;
    
    function updateBattery(percent) {
      batteryLevel.style.width = `${percent}%`;
      batteryPercent.textContent = `${percent}%`;
      
      // Change color based on battery level
      if (percent > 60) {
        batteryLevel.style.background = 'linear-gradient(to top, var(--success), #38b000';
      } else if (percent > 30) {
        batteryLevel.style.background = 'linear-gradient(to top, var(--warning), #e85d04';
      } else {
        batteryLevel.style.background = 'linear-gradient(to top, var(--danger), #d00000';
        batteryLevel.classList.add('pulse');
      }
    }
    
    // Simulate battery drain
    updateBattery(battery);
    const batteryInterval = setInterval(() => {
      battery -= 0.5;
      if (battery < 0) battery = 100;
      updateBattery(Math.round(battery));
    }, 5000);
    
    // Temperature Monitoring
    const tempValue = document.getElementById('temp-value');
    const tempStatus = document.getElementById('temp-status');
    let temp = 32;
    
    function updateTemperature(temp) {
      tempValue.textContent = `${temp}°C`;
      
      // Update status indicator
      tempStatus.className = 'indicator-light';
      if (temp > 60) {
        tempStatus.classList.add('danger');
        tempStatus.classList.add('pulse');
      } else if (temp > 45) {
        tempStatus.classList.add('warning');
        tempStatus.classList.remove('pulse');
      } else {
        tempStatus.classList.add('active');
        tempStatus.classList.remove('pulse');
      }
    }
    
    // Simulate temperature changes
    updateTemperature(temp);
    const tempInterval = setInterval(() => {
      temp += (Math.random() * 2 - 1);
      if (temp < 30) temp = 30;
      if (temp > 70) temp = 70;
      updateTemperature(Math.round(temp));
    }, 3000);
    
    // Motor Control
    const throttle = document.getElementById('throttle');
    const motorStatus = document.getElementById('motor-status');
    
    throttle.addEventListener('input', function() {
      motorStatus.className = 'indicator-light';
      if (this.value > 0) {
        motorStatus.classList.add('active');
      }
      
      // Update temperature based on throttle (motor heat)
      if (this.value > 70) {
        temp += 0.2;
        if (temp > 70) temp = 70;
        updateTemperature(Math.round(temp));
      }
    });
    
    // Steering Control
    const steering = document.getElementById('steering');
    const servoStatus = document.getElementById('servo-status');
    
    steering.addEventListener('input', function() {
      servoStatus.className = 'indicator-light';
      if (this.value != 0) {
        servoStatus.classList.add('active');
      } else {
        servoStatus.classList.remove('active');
      }
    });
    
    // System Monitoring
    const fanStatus = document.getElementById('fan-status');
    const lightsStatus = document.getElementById('lights-status');
    
    // Auto fan control based on temperature
    setInterval(() => {
      fanStatus.className = 'indicator-light';
      if (temp > 45) {
        fanStatus.classList.add('active');
      } else {
        fanStatus.classList.remove('active');
      }
    }, 1000);
    
    // Simulate lights
    setInterval(() => {
      lightsStatus.className = 'indicator-light';
      if (Math.random() > 0.3) {
        lightsStatus.classList.add('active');
      } else {
        lightsStatus.classList.remove('active');
      }
    }, 2000);
    
    // Advanced Features
    // Save settings to localStorage
    function saveSettings() {
      const settings = {
        throttle: throttle.value,
        steering: steering.value,
        lastUpdated: new Date().toISOString()
      };
      localStorage.setItem('rcTruckSettings', JSON.stringify(settings));
    }
    
    // Load settings from localStorage
    function loadSettings() {
      const savedSettings = localStorage.getItem('rcTruckSettings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        throttle.value = settings.throttle;
        steering.value = settings.steering;
        
        // Trigger input events to update UI
        throttle.dispatchEvent(new Event('input'));
        steering.dispatchEvent(new Event('input'));
      }
    }
    
    // Load settings when page loads
    loadSettings();
    
    // Save settings when controls change
    throttle.addEventListener('change', saveSettings);
    steering.addEventListener('change', saveSettings);
    
    // Add floating animation to battery on low power
    batteryLevel.addEventListener('animationiteration', () => {
      if (battery <= 20) {
        batteryLevel.classList.add('floating');
      } else {
        batteryLevel.classList.remove('floating');
      }
    });
  });
  // Mechanical System Monitoring Class
class MechanicalSystem {
    constructor() {
        this.suspensionStatus = true;
        this.differentialStatus = true;
        this.bearingHealth = 100;
        this.wheelAlignment = 'good';
        this.brakePadWear = 0;
        this.chainTension = 'optimal';
        this.shockTravel = 75;
        this.frameStress = 'low';
    }

    checkMechanicalHealth() {
        // Simulate mechanical wear
        this.bearingHealth = Math.max(0, this.bearingHealth - (0.1 + Math.random() * 0.2));
        this.brakePadWear = Math.min(100, this.brakePadWear + (0.2 + Math.random() * 0.3));
        this.shockTravel = Math.max(50, this.shockTravel - (Math.random() * 0.5));
        
        // Random mechanical issues
        if (Math.random() < 0.03) {
            this.suspensionStatus = Math.random() > 0.3;
        }
        if (Math.random() < 0.02) {
            this.differentialStatus = Math.random() > 0.4;
        }
        if (Math.random() < 0.05) {
            this.wheelAlignment = ['good', 'fair', 'poor'][Math.floor(Math.random()*3)];
        }
        if (Math.random() < 0.04) {
            this.chainTension = ['optimal', 'slightly loose', 'too tight'][Math.floor(Math.random()*3)];
        }
        if (Math.random() < 0.03) {
            this.frameStress = ['low', 'medium', 'high'][Math.floor(Math.random()*3)];
        }
        
        return {
            suspension: this.suspensionStatus,
            differential: this.differentialStatus,
            bearings: this.bearingHealth,
            alignment: this.wheelAlignment,
            brakes: this.brakePadWear,
            chain: this.chainTension,
            shock: this.shockTravel,
            frame: this.frameStress
        };
    }
}

// Initialize Mechanical System
const mechanicalSystem = new MechanicalSystem();

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // Update Mechanical Status
    function updateMechanicalStatus() {
        const status = mechanicalSystem.checkMechanicalHealth();
        
        // Update visual indicators
        updateVisualIndicators(status);
        
        // Update text status
        document.getElementById('suspension-status').textContent = status.suspension ? 'OK' : 'Needs Attention';
        document.getElementById('suspension-status').className = 'status-text ' + (status.suspension ? 'success' : 'danger');
        
        document.getElementById('differential-status').textContent = status.differential ? 'OK' : 'Check Required';
        document.getElementById('differential-status').className = 'status-text ' + (status.differential ? 'success' : 'danger');
        
        document.getElementById('bearing-percent').textContent = `${status.bearings.toFixed(1)}%`;
        document.getElementById('bearing-percent').className = 'status-text ' + 
            (status.bearings > 70 ? 'success' : 
             status.bearings > 30 ? 'warning' : 'danger');
        
        document.getElementById('brake-status').textContent = `${status.brakes.toFixed(1)}% worn`;
        document.getElementById('brake-status').className = 'status-text ' + 
            (status.brakes < 50 ? 'success' : 
             status.brakes < 80 ? 'warning' : 'danger');
        
        // Wheel Alignment
        const alignmentDisplay = document.getElementById('alignment-display');
        alignmentDisplay.className = 'alignment-display';
        alignmentDisplay.classList.add(status.alignment);
        document.getElementById('alignment-status').textContent = status.alignment.toUpperCase();
        document.getElementById('alignment-status').className = 'status-text ' + 
            (status.alignment === 'good' ? 'success' : 
             status.alignment === 'fair' ? 'warning' : 'danger');
        
        // Chain Tension
        const chainStatus = document.getElementById('chain-status');
        chainStatus.className = 'indicator-light';
        chainStatus.classList.add(
            status.chain === 'optimal' ? 'success' : 
            status.chain === 'slightly loose' ? 'warning' : 'danger'
        );
        document.getElementById('chain-tension').textContent = `Tension: ${status.chain}`;
        document.getElementById('chain-tension').className = 'status-text ' + 
            (status.chain === 'optimal' ? 'success' : 
             status.chain === 'slightly loose' ? 'warning' : 'danger');
        
        // Shock Absorbers
        const shockStatus = document.getElementById('shock-status');
        shockStatus.className = 'indicator-light';
        shockStatus.classList.add(
            status.shock > 60 ? 'success' : 
            status.shock > 40 ? 'warning' : 'danger'
        );
        document.getElementById('shock-travel').textContent = `Travel: ${status.shock.toFixed(1)}%`;
        document.getElementById('shock-travel').className = 'status-text ' + 
            (status.shock > 60 ? 'success' : 
             status.shock > 40 ? 'warning' : 'danger');
        
        // Frame Integrity
        const frameStatus = document.getElementById('frame-status');
        frameStatus.className = 'indicator-light';
        frameStatus.classList.add(
            status.frame === 'low' ? 'success' : 
            status.frame === 'medium' ? 'warning' : 'danger'
        );
        document.getElementById('frame-stress').textContent = `Stress: ${status.frame}`;
        document.getElementById('frame-stress').className = 'status-text ' + 
            (status.frame === 'low' ? 'success' : 
             status.frame === 'medium' ? 'warning' : 'danger');
    }
    
    // Update visual indicators
    function updateVisualIndicators(status) {
        // Suspension
        const visSuspension = document.getElementById('visual-suspension');
        visSuspension.className = 'indicator-light';
        visSuspension.classList.add(status.suspension ? 'success' : 'danger');
        
        // Differential
        const visDiff = document.getElementById('visual-differential');
        visDiff.className = 'indicator-light';
        visDiff.classList.add(status.differential ? 'success' : 'danger');
        
        // Bearings
        const visBearing = document.getElementById('visual-bearing');
        visBearing.className = 'indicator-light';
        visBearing.classList.add(
            status.bearings > 70 ? 'success' : 
            status.bearings > 30 ? 'warning' : 'danger'
        );
        
        // Brakes
        const visBrake = document.getElementById('visual-brake');
        visBrake.className = 'indicator-light';
        visBrake.classList.add(
            status.brakes < 50 ? 'success' : 
            status.brakes < 80 ? 'warning' : 'danger'
        );
    }
    
    // Check mechanical systems every 5 seconds
    setInterval(updateMechanicalStatus, 5000);
    updateMechanicalStatus();
});
// GearBox System Class
class GearBox {
    constructor() {
        this.gears = {
            1: { ratio: 3.75, output: 100, speed: "Low (High Torque)", drivingTeeth: 30, drivenTeeth: 8 },
            2: { ratio: 2.5, output: 150, speed: "Medium", drivingTeeth: 20, drivenTeeth: 8 },
            3: { ratio: 1.25, output: 200, speed: "High (Low Torque)", drivingTeeth: 10, drivenTeeth: 8 }
        };
        this.currentGear = 1;
    }
    
    shiftTo(gear) {
        if (this.gears[gear]) {
            this.currentGear = gear;
            return this.gears[gear];
        }
        return null;
    }
    
    getCurrentGearInfo() {
        return this.gears[this.currentGear];
    }
    
    renderDiagram() {
        const gearInfo = this.getCurrentGearInfo();
        const diagram = document.getElementById('gear-diagram');
        
        // Clear previous diagram
        diagram.innerHTML = '';
        
        // Create SVG element
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute('class', 'gear-svg');
        svg.setAttribute('viewBox', '0 0 400 200');
        
        // Calculate gear positions and sizes
        const drivingGearRadius = gearInfo.drivingTeeth * 3;
        const drivenGearRadius = gearInfo.drivenTeeth * 3;
        const drivingGearX = 100;
        const drivenGearX = 300;
        const gearY = 100;
        
        // Draw chain
        const chainPath = `M${drivingGearX},${gearY - drivingGearRadius} 
                          Q200,50 ${drivenGearX},${gearY - drivenGearRadius}
                          M${drivenGearX},${gearY + drivenGearRadius}
                          Q200,150 ${drivingGearX},${gearY + drivingGearRadius}`;
        
        const chain = document.createElementNS("http://www.w3.org/2000/svg", "path");
        chain.setAttribute('d', chainPath);
        chain.setAttribute('stroke', '#333');
        chain.setAttribute('stroke-width', '4');
        chain.setAttribute('fill', 'none');
        chain.setAttribute('stroke-dasharray', '5,5');
        svg.appendChild(chain);
        
        // Draw driving gear (input)
        const drivingGear = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        drivingGear.setAttribute('cx', drivingGearX);
        drivingGear.setAttribute('cy', gearY);
        drivingGear.setAttribute('r', drivingGearRadius);
        drivingGear.setAttribute('fill', '#4361ee');
        drivingGear.setAttribute('stroke', '#3a56d4');
        drivingGear.setAttribute('stroke-width', '2');
        svg.appendChild(drivingGear);
        
        // Draw driven gear (output)
        const drivenGear = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        drivenGear.setAttribute('cx', drivenGearX);
        drivenGear.setAttribute('cy', gearY);
        drivenGear.setAttribute('r', drivenGearRadius);
        drivenGear.setAttribute('fill', '#4cc9f0');
        drivenGear.setAttribute('stroke', '#38b000');
        drivenGear.setAttribute('stroke-width', '2');
        svg.appendChild(drivenGear);
        
        // Add gear labels
        const drivingLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        drivingLabel.setAttribute('x', drivingGearX);
        drivingLabel.setAttribute('y', gearY);
        drivingLabel.setAttribute('text-anchor', 'middle');
        drivingLabel.setAttribute('dominant-baseline', 'middle');
        drivingLabel.setAttribute('fill', 'white');
        drivingLabel.setAttribute('font-weight', 'bold');
        drivingLabel.textContent = `${gearInfo.drivingTeeth}T`;
        svg.appendChild(drivingLabel);
        
        const drivenLabel = document.createElementNS("http://www.w3.org/2000/svg", "text");
        drivenLabel.setAttribute('x', drivenGearX);
        drivenLabel.setAttribute('y', gearY);
        drivenLabel.setAttribute('text-anchor', 'middle');
        drivenLabel.setAttribute('dominant-baseline', 'middle');
        drivenLabel.setAttribute('fill', 'white');
        drivenLabel.setAttribute('font-weight', 'bold');
        drivenLabel.textContent = `${gearInfo.drivenTeeth}T`;
        svg.appendChild(drivenLabel);
        
        // Add rotation arrows
        this.addRotationArrow(svg, drivingGearX, gearY, drivingGearRadius, 'input');
        this.addRotationArrow(svg, drivenGearX, gearY, drivenGearRadius, 'output');
        
        diagram.appendChild(svg);
    }
    
    addRotationArrow(svg, x, y, radius, type) {
        const arrowSize = radius * 0.4;
        const rotation = type === 'input' ? 0 : 180;
        
        const arrow = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arrow.setAttribute('d', `M${x},${y - radius - 10} l${-arrowSize/2},${arrowSize} l${arrowSize},0 z`);
        arrow.setAttribute('fill', type === 'input' ? '#4361ee' : '#4cc9f0');
        arrow.setAttribute('transform', `rotate(${rotation} ${x} ${y})`);
        svg.appendChild(arrow);
        
        const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        text.setAttribute('x', x);
        text.setAttribute('y', type === 'input' ? y - radius - 25 : y + radius + 20);
        text.setAttribute('text-anchor', 'middle');
        text.setAttribute('fill', '#333');
        text.textContent = type === 'input' ? 'Input' : 'Output';
        svg.appendChild(text);
    }
}

// Initialize GearBox System
const gearBox = new GearBox();

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', function() {
    // ... existing code ...
    
    // GearBox Controls
    const gearButtons = document.querySelectorAll('.gear-btn');
    
    function updateGearDisplay(gear) {
        const gearInfo = gearBox.shiftTo(gear);
        
        // Update active button
        gearButtons.forEach(btn => btn.classList.remove('active'));
        document.querySelector(`.gear-btn[data-gear="${gear}"]`).classList.add('active');
        
        // Update display
        document.getElementById('current-gear').textContent = `${gear}${getOrdinalSuffix(gear)} Gear`;
        document.getElementById('output-bar').style.width = `${gearInfo.output}%`;
        document.getElementById('output-value').textContent = `${gearInfo.output}%`;
        document.getElementById('gear-ratio').textContent = `Ratio: ${gearInfo.ratio}:1`;
        document.getElementById('gear-speed').textContent = `Speed: ${gearInfo.speed}`;
        
        // Render gear diagram
        gearBox.renderDiagram();
    }
    
    function getOrdinalSuffix(num) {
        if (num > 3 && num < 21) return 'th';
        switch (num % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    }
    
    // Add event listeners to gear buttons
    gearButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const gear = parseInt(this.getAttribute('data-gear'));
            updateGearDisplay(gear);
        });
    });
    
    // Initialize with first gear
    updateGearDisplay(1);
});
// Get gear elements
const gear1 = document.querySelector('[data-gear="1st"]');
const gear2 = document.querySelector('[data-gear="2nd"]');
const gear3 = document.querySelector('[data-gear="3rd"]');

// Gear information objects
const gearData = {
  "1st": {
    output: "100%",
    ratio: "3.75:1",
    speed: "Low (High Torque)"
  },
  "2nd": {
    output: "70%",
    ratio: "2.50:1",
    speed: "Medium (Balanced)"
  },
  "3rd": {
    output: "50%",
    ratio: "1.25:1",
    speed: "High (Low Torque)"
  }
};

// Update display function
function updateGearDisplay(gear) {
  document.getElementById('current-gear').textContent = `Current Gear: ${gear}`;
  document.getElementById('output').textContent = `Output: ${gearData[gear].output}`;
  document.getElementById('ratio').textContent = `Ratio: ${gearData[gear].ratio}`;
  document.getElementById('speed').textContent = `Speed: ${gearData[gear].speed}`;
}

// Add event listeners
gear1.addEventListener('click', () => updateGearDisplay('1st'));
gear2.addEventListener('click', () => updateGearDisplay('2nd'));
gear3.addEventListener('click', () => updateGearDisplay('3rd'));

// Initialize with 1st gear
updateGearDisplay('1st');
// In your openTab function, add the new tab ID
function openTab(tabName) {
  // ... existing code ...
  // This will already work if you keep the existing tab system
}