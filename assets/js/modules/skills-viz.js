/**
 * Skills Visualization Module
 * Chart.js radar chart for technical skills
 */

let chartInstance = null;

/**
 * Skills data configuration
 */
const skillsData = {
  labels: [
    'Structural Biology',
    'Protein Biochemistry',
    'Biophysical Methods',
    'Molecular Biology',
    'Computational Analysis',
    'Specialized Assays'
  ],
  datasets: [{
    label: 'Proficiency Level',
    data: [95, 90, 85, 88, 82, 80], // Proficiency scores (0-100)
    backgroundColor: 'rgba(228, 120, 57, 0.2)',
    borderColor: 'rgba(228, 120, 57, 1)',
    borderWidth: 3,
    pointBackgroundColor: 'rgba(228, 120, 57, 1)',
    pointBorderColor: '#fff',
    pointBorderWidth: 2,
    pointRadius: 6,
    pointHoverRadius: 8,
    pointHoverBackgroundColor: '#e47839',
    pointHoverBorderColor: '#fff',
  }]
};

/**
 * Initialize skills radar chart
 */
export function initSkillsViz() {
  // Check if Chart.js is available
  if (typeof Chart === 'undefined') {
    console.warn('Chart.js library not loaded');
    return null;
  }

  // Check if canvas exists
  const canvas = document.getElementById('skills-chart');
  if (!canvas) {
    console.log('Skills chart canvas not found');
    return null;
  }

  const ctx = canvas.getContext('2d');

  // Get computed text color for theme support
  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-primary').trim() || '#ffffff';

  const gridColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border-color').trim() || 'rgba(255, 255, 255, 0.1)';

  // Chart configuration
  const config = {
    type: 'radar',
    data: skillsData,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      aspectRatio: 1,
      scales: {
        r: {
          beginAtZero: true,
          min: 0,
          max: 100,
          ticks: {
            stepSize: 20,
            color: textColor,
            backdropColor: 'transparent',
            font: {
              size: 12,
              family: "'Inconsolata', monospace",
            }
          },
          grid: {
            color: gridColor,
            lineWidth: 1,
          },
          pointLabels: {
            color: textColor,
            font: {
              size: 13,
              weight: 'bold',
              family: "'Montserrat', sans-serif",
            },
            padding: 15,
          },
          angleLines: {
            color: gridColor,
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          titleFont: {
            family: "'Montserrat', sans-serif",
            size: 14,
            weight: 'bold',
          },
          bodyFont: {
            family: "'Inconsolata', monospace",
            size: 13,
          },
          padding: 12,
          cornerRadius: 8,
          displayColors: false,
          callbacks: {
            label: function(context) {
              return 'Proficiency: ' + context.parsed.r + '%';
            }
          }
        }
      },
      animation: {
        duration: 1500,
        easing: 'easeOutQuart',
      }
    }
  };

  // Create chart
  chartInstance = new Chart(ctx, config);

  // Animate chart on scroll into view
  setupScrollAnimation(canvas);

  console.log('✓ Skills visualization initialized');
  return chartInstance;
}

/**
 * Setup scroll-triggered animation for chart
 */
function setupScrollAnimation(canvas) {
  // Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  // Initially hide the chart
  chartInstance.options.animation.duration = 0;
  chartInstance.update();

  // Setup Intersection Observer
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && chartInstance) {
          // Animate chart when it comes into view
          chartInstance.options.animation.duration = 1500;
          chartInstance.update('active');
          observer.unobserve(canvas);
        }
      });
    }, {
      threshold: 0.5,
    });

    observer.observe(canvas);
  }
}

/**
 * Get chart instance
 */
export function getChart() {
  return chartInstance;
}

/**
 * Update chart theme colors
 */
export function updateChartTheme() {
  if (!chartInstance) return;

  const textColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--text-primary').trim() || '#ffffff';

  const gridColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--border-color').trim() || 'rgba(255, 255, 255, 0.1)';

  chartInstance.options.scales.r.ticks.color = textColor;
  chartInstance.options.scales.r.pointLabels.color = textColor;
  chartInstance.options.scales.r.grid.color = gridColor;
  chartInstance.options.scales.r.angleLines.color = gridColor;

  chartInstance.update();
}

/**
 * Destroy chart instance
 */
export function destroySkillsViz() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}

export default { initSkillsViz, getChart, updateChartTheme, destroySkillsViz };
