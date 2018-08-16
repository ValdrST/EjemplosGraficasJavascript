$(document).ready(function () {
    function grafica_linea_simple() {
        new Chartist.Line('#linea_simple', {
            labels: ['1', '2', '3', '4', '5'],
            series: [
              [2, 4, 8, 10, 16],
              [1, 2, 10, 5, 7]
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 20
            }
          });
    }

    function grafica_pie() {
        var data = {
            labels: ['primer cuadrante', 'segundo cuadrante', 'tercer cuadrante'],
            series: [19, 26, 55]
          };
          var options = {
            labelInterpolationFnc: function(value) {
              return value[0]
            }
          };

          var responsiveOptions = [
            ['screen and (min-width: 640px)', {
              chartPadding: 100,
              labelOffset: 150,
              labelDirection: 'explode',
              labelInterpolationFnc: function(value) {
                return value;
              }
            }],
            ['screen and (min-width: 1024px)', {
              labelOffset: 80,
              chartPadding: 20
            }]
          ];
          
          
          new Chartist.Pie('#pie', data, options, responsiveOptions);
    }

    function grafica_barras() {
        var data = {
            labels: ['barra 1', 'barra2', 'barra 3'],
            series: [[19, 26, 55]]
          };
          
          var options = {
            high: 100,
            low: 0,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return value;
              }
            }
          };
          
          new Chartist.Bar('#bar', data, options);
    }

    function grafica_barras_doble() {
        var data = {
            labels: ['11', '12', '13'],
            series: [
                [20, 14, 23],
                [12, 18, 29]
            ]
          };
          
          var options = {
            seriesBarDistance: 10
          };
          
          var responsiveOptions = [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value;
                }
              }
            }]
          ];
          
          new Chartist.Bar('#bar_doble', data, options, responsiveOptions);
    }
    function grafica_barras_stack() {
        new Chartist.Bar('#bar_stack', {
            labels: ['11', '12', '13'],
            series: [
                [20, 14, 23],
                [12, 18, 29]
            ]
          }, {
            stackBars: true,
            axisY: {
              labelInterpolationFnc: function(value) {
                return value;
              }
            }
          }).on('draw', function(data) {
            if(data.type === 'bar') {
              data.element.attr({
                style: 'stroke-width: 30px'
              });
            }
          });     
    }

    function grafica_puntos() {
        var times = function(n) {
            return Array.apply(null, new Array(n));
          };
          
          var data = times(52).map(Math.random).reduce(function(data, rnd, index) {
            data.labels.push(index + 1);
            data.series.forEach(function(series) {
              series.push(Math.random() * 100)
            });
          
            return data;
          }, {
            labels: [],
            series: times(4).map(function() { return new Array() })
          });
          
          var options = {
            showLine: false,
            axisX: {
              labelInterpolationFnc: function(value, index) {
                return index % 13 === 0 ? 'Grupo' + value : null;
              }
            }
          };
          
          var responsiveOptions = [
            ['screen and (min-width: 640px)', {
              axisX: {
                labelInterpolationFnc: function(value, index) {
                  return index % 4 === 0 ? 'Grupo' + value : null;
                }
              }
            }]
          ];
          
          new Chartist.Line('#puntos', data, options, responsiveOptions);
    }

    function grafica_dona() {
        new Chartist.Pie('#dona', {
            labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
            series: [16, 15, 12, 6, 5, 4, 42]
          }, {
            donut: true,
            donutWidth: 40,
            donutSolid: true,
            startAngle: 270,
            showLabel: true
          });
    }

    function grafica_mixta() {
        var chart = new Chartist.Line('#mixta', {
            labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
            series: [
              [5, 5, 10, 8, 7, 5, 4, null, null, null, 10, 10, 7, 8, 6, 9],
              [10, 15, null, 12, null, 10, 12, 15, null, null, 12, null, 14, null, null, null],
              [null, null, null, null, 3, 4, 1, 3, 4,  6,  7,  9, 5, null, null, null],
              [{x:3, y: 3},{x: 4, y: 3}, {x: 5, y: undefined}, {x: 6, y: 4}, {x: 7, y: null}, {x: 8, y: 4}, {x: 9, y: 4}]
            ]
          }, {
            fullWidth: true,
            chartPadding: {
              right: 10
            },
            low: 0
          });
          
    }
    /*
    function grafica_pie_multiple() {
        var allLabels = ['1st', '2nd', '3rd', '4th', '5th'];

        var allValues = [
            [38, 27, 18, 10, 7],
            [28, 26, 21, 15, 10],
            [38, 19, 16, 14, 13],
            [31, 24, 19, 18, 8]
        ];

        var ultimateColors = [
            ['rgb(56, 75, 126)', 'rgb(18, 36, 37)', 'rgb(34, 53, 101)', 'rgb(36, 55, 57)', 'rgb(6, 4, 4)'],
            ['rgb(177, 127, 38)', 'rgb(205, 152, 36)', 'rgb(99, 79, 37)', 'rgb(129, 180, 179)', 'rgb(124, 103, 37)'],
            ['rgb(33, 75, 99)', 'rgb(79, 129, 102)', 'rgb(151, 179, 100)', 'rgb(175, 49, 35)', 'rgb(36, 73, 147)'],
            ['rgb(146, 123, 21)', 'rgb(177, 180, 34)', 'rgb(206, 206, 40)', 'rgb(175, 51, 21)', 'rgb(35, 36, 21)']
        ];

        var data = [{
            values: allValues[0],
            labels: allLabels,
            type: 'pie',
            name: 'Starry Night',
            marker: {
                colors: ultimateColors[0]
            },
            domain: {
                x: [0, .48],
                y: [0, .49]
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }, {
            values: allValues[1],
            labels: allLabels,
            type: 'pie',
            name: 'Sunflowers',
            marker: {
                colors: ultimateColors[1]
            },
            domain: {
                x: [0.52, 1],
                y: [0, .49]
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }, {
            values: allValues[2],
            labels: allLabels,
            type: 'pie',
            name: 'Irises',
            marker: {
                colors: ultimateColors[2]
            },
            domain: {
                x: [0, .48],
                y: [.51, 1]
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }, {
            values: allValues[3],
            labels: allLabels,
            type: 'pie',
            name: 'The Night Cafe',
            marker: {
                colors: ultimateColors[3]
            },
            domain: {
                x: [0.52, 1],
                y: [0.52, 1]
            },
            hoverinfo: 'label+percent+name',
            textinfo: 'none'
        }];

        var layout = {
            height: 400,
            width: 500
        };
        Plotly.plot(document.getElementById("pie_multiple"), data, layout);
    }*/
    
    grafica_linea_simple();
    grafica_barras();
    grafica_pie();
    grafica_barras_doble();
    grafica_barras_stack();
    grafica_puntos();
    grafica_dona();
    grafica_mixta();


});