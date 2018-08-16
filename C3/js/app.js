$(document).ready(function () {
    function grafica_linea_simple() {
        var chart = c3.generate({
            bindto: d3.select('#linea_simple'),
            data: {
                columns: [
                    ['datos', 1, 2, 4, 8, 16]
                ]
            }
        });
    }
    function grafica_pie() {
        var chart = c3.generate({
            bindto: d3.select('#pie'),
            data: {
                // iris data from R
                columns: [
                    ['primer cuadrante', 19],
                    ['segundo cuadrante', 26],
                    ['tercer cuadrante', 55]
                ],
                type : 'pie',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            }
        });
    }

    function grafica_barras() {
        var chart = c3.generate({
            bindto: d3.select('#bar_doble'),
            data: {
                columns: [
                    ['datos', 19, 26, 55]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            }
        });
    }

    function grafica_barras_doble() {
        var chart = c3.generate({
            bindto: d3.select('#bar'),
            data: {
                columns: [
                    ['2017', 20, 14, 23],
                    ['2018',12, 18, 29]
                ],
                type: 'bar'
            },
            bar: {
                width: {
                    ratio: 0.5 // this makes bar width 50% of length between ticks
                }
                // or
                //width: 100 // this makes bar width 100px
            }
        });
    }

    function grafica_barras_stack(){
        var chart = c3.generate({
            bindto: d3.select('#bar_stack'),
            data: {
                columns: [
                    ['2017',20, 14, 23],
                    ['2018', 12, 18, 29]
                ],
                type: 'bar',
                groups: [
                    ['2017', '2018']
                ]
            },
            grid: {
                y: {
                    lines: [{value:0}]
                }
            }
        });
    }
    function grafica_puntos() {
        var chart = c3.generate({
            bindto: d3.select('#puntos'),
            data: {
                xs: {
                    grupo1: 'grupo1_x',
                    grupo2: 'grupo2_x',
                    grupo3: 'grupo3_x',
                    grupo4: 'grupo4_x'
                },
                // iris data from R
                columns: [
                    ["grupo1_x",1, 2, 3, 4, 5],
                    ["grupo1",1, 6, 3, 6, 1],
                    ["grupo2_x",1.5, 2.5, 3.5, 4.5, 5.5],
                    ["grupo2",4, 1, 7, 1, 4],
                    ["grupo3_x",5, 3, 9, 6, 5],
                    ["grupo3",1, 6, 4, 6, 1],
                    ["grupo4_x",5, 8, 2, 6, 5],
                    ["grupo4",4, 1, 7, 1, 4],
                ],
                type: 'scatter'
            },
            axis: {
                x: {
                    label: 'Algo',
                    tick: {
                        fit: false
                    }
                },
                y: {
                    label: 'Algo 2'
                }
            }
        });
    }

    function grafica_dona() {
        var chart = c3.generate({
            bindto: d3.select('#dona'),
            data: {
                columns: [
                    ['data1', 30],
                    ['data2', 120],
                    ['data3', 45],
                    ['data4', 70]
                ],
                type : 'donut',
                onclick: function (d, i) { console.log("onclick", d, i); },
                onmouseover: function (d, i) { console.log("onmouseover", d, i); },
                onmouseout: function (d, i) { console.log("onmouseout", d, i); }
            },
            donut: {
                title: "Grafica de dona"
            }
        });
    }

    function grafica_mixta(){
        var chart = c3.generate({
            bindto: d3.select('#mixta'),
            data: {
                columns: [
                    ['data1', 30, 20, 50, 40, 60, 50],
                    ['data2', 200, 130, 90, 240, 130, 220],
                    ['data3', 300, 200, 160, 400, 250, 250],
                    ['data4', 200, 130, 90, 240, 130, 220],
                    ['data5', 130, 120, 150, 140, 160, 150],
                    ['data6', 90, 70, 20, 50, 60, 120],
                ],
                type: 'bar',
                types: {
                    data3: 'spline',
                    data4: 'line',
                    data6: 'area',
                },
                groups: [
                    ['data1','data2']
                ]
            }
        });
    }
    /*
    function grafica_pie_multiple() {
        data = [
            {
              type: "scatterpolar",
              mode: "lines",
              r: [0, 1.5, 1.5, 0, 2.5, 2.5, 0],
              theta: [0, 10, 25, 0, 205, 215, 0],
              fill: "toself",
              fillcolor: '#709BFF',
              line: {
                color: 'black'
              }
            },
            {
              type: "scatterpolar",
              mode: "lines",
              r: [0, 3.5, 3.5, 0],
              theta: [0, 55, 75, 0],
              fill: "toself",
              fillcolor: '#E4FF87',
              line: {
                color: 'black'
              }
            },
            {
              type: "scatterpolar",
              mode: "lines",
              r: [0, 4.5, 4.5, 0, 4.5, 4.5, 0],
              theta: [0, 100, 120, 0, 305, 320, 0],
              fill: "toself",
              fillcolor: '#FFAA70',
              line: {
                color: 'black'
              }
            },
            {
              type: "scatterpolar",
              mode: "lines",
              r: [0, 4, 4, 0],
              theta: [0, 165, 195, 0],
              fill: "toself",
              fillcolor: '#FFDF70',
              line: {
                color: 'black'
              }
            },
            {
              type: "scatterpolar",
              mode: "lines",
              r: [0, 3, 3, 0],
              theta: [0, 262.5, 277.5, 0],
              fill: "toself",
              fillcolor: '#B6FFB4',
              line: {
                color: 'black'
              }
            }
          ]
          
          layout = {
            polar: {
              radialaxis: {
                visible: true,
                range: [0, 5]
              }
            },
            showlegend: false
          }
          
        Plotly.plot(document.getElementById("pie_multiple"), data, layout);
    }
*/
    grafica_barras();
    grafica_linea_simple();
    grafica_pie();
    grafica_barras_doble();
    grafica_barras_stack();
    grafica_puntos();
    grafica_dona();
    grafica_mixta();
    // grafica_pie_multiple();


});