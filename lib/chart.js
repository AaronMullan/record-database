let data1 = [
  { x: 1970, value: 42 },
  { x: 1990, value: 25 }
];
let data2 = [
    { x: 1987, value: 30 }  
]
          
// create a chart
const chart = anychart.scatter();
      
const series0 = chart.marker(data1);
const series1 = chart.marker(data2);
      
// set the container id
chart.container('container');
      
// initiate drawing the chart
chart.draw();
    
