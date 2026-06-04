/**
 * E2 Software Factory – ROI Simulator
 * Calculates annual savings based on a 75% optimization rate.
 */
(function () {
  'use strict';

  var OPTIMIZATION_RATE = 0.75; // 75% optimization as requested
  var HOURLY_COST_COP = 15000;  // Average hourly cost in COP

  var sliderEmployees = document.getElementById('sim-employees');
  var sliderHours = document.getElementById('sim-hours');
  var displayEmployees = document.getElementById('val-employees');
  var displayHours = document.getElementById('val-hours');

  var resultHours = document.getElementById('res-hours');
  var resultMoney = document.getElementById('res-money');

  if (!sliderEmployees || !sliderHours) return;

  function formatMoney(amount) {
    return '$' + amount.toLocaleString('es-CO');
  }

  function formatNumber(num) {
    return num.toLocaleString('es-CO');
  }

  function calculateROI() {
    var employees = parseInt(sliderEmployees.value, 10);
    var hours = parseInt(sliderHours.value, 10);

    displayEmployees.textContent = employees;
    displayHours.textContent = hours + ' hrs';

    // Calculation: Employees * hours/week * 52 weeks * 75% optimization
    var recoveredHours = Math.round(employees * hours * 52 * OPTIMIZATION_RATE);
    var savedMoney = recoveredHours * HOURLY_COST_COP;

    resultHours.textContent = formatNumber(recoveredHours) + 'h';
    resultMoney.textContent = formatMoney(savedMoney);
  }

  sliderEmployees.addEventListener('input', calculateROI);
  sliderHours.addEventListener('input', calculateROI);

  // Initial calc
  calculateROI();
})();
