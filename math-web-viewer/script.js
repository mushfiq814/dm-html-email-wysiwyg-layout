// graphEquation();

var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['a', 'b', 'c'],
    datasets: [{
      data: [1,2,3],
      borderColor: ['rgba(255, 99, 132, 1)'],
      borderWidth: 1
    }]
  },
  options: {
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});

function graphEquation() {
  var xMin = parseInt(document.getElementById('xMinText').value);
  var xMax = parseInt(document.getElementById('xMaxText').value);
  var expr = document.getElementById('equationText').value;

  var step = 0.1;
  var xAxis = [xMin];

  var xLabels = [parseInt(xMin)];
  var count = 0;
  var currentXLabel = parseInt(xMin);
  for (var i=xMin+step; i<=xMax; i+=step) {
    count++;
    xAxis.push(i);
    if (count % (1/step) == 0) {
      currentXLabel++;
      xLabels.push(currentXLabel);
    }
    else xLabels.push('');
  }

  var scope = { x: xAxis[0] };
  var evaluated = math.evaluate(expr, scope);
  var yAxis = [evaluated]; // populate the first y coordinate
  
  for (var j=1; j<xAxis.length; j++) {
    scope = { x: xAxis[j] };
    evaluated = math.evaluate(expr, scope);
    yAxis.push(evaluated); // push all other y coordinates
  }

  removeData(myChart);
  addData(myChart, xLabels, yAxis);
  
}

function addData(chart, label, data) {
  chart.data.labels.push(label);
  chart.data.datasets.forEach((dataset) => dataset.data.push(data))
  chart.update();
}

function removeData(chart) {
  chart.data.labels.pop();
  chart.data.datasets.forEach((dataset) => dataset.data.pop())
  chart.update();
}

function renderLatex() {
  var input = "\\[" + document.getElementById('latexInput').value + "\\]";
  document.getElementById('latexOutput').innerHTML = input;
  MathJax.typeset();
}