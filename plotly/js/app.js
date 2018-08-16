$(document).ready(function () {
    function grafica_linea_simple() {
        let data = [{
            x: [1, 2, 3, 4, 5],
            y: [1, 2, 4, 8, 16]
        }]
        let layout = {
            title: "Grafica linea simple",
            xaxis: {
                title: "eje X"
            },
            yaxis: {
                title: "eje Y"
            },
            margin: { t: 50 }
        }
        Plotly.plot(document.getElementById("linea_simple"), data, layout);
    }

    function grafica_pie() {
        let data = [{
            values: [19, 26, 55],
            labels: ['primer cuadrante', 'segundo cuadrante', 'tercer cuadrante'],
            type: 'pie'
        }]
        let layout = {

            height: 400,
            width: 500
        }

        Plotly.plot(document.getElementById("pie"), data, layout);
    }

    function grafica_barras() {
        let data = [{
            y: [19, 26, 55],
            x: ['barra 1', 'barra 2', 'barra 3'],
            type: 'bar'
        }]
        Plotly.plot(document.getElementById("bar"), data);
    }

    function grafica_barras_doble() {
        var trace1 = {
            x: ['11', '12', '13'],
            y: [20, 14, 23],
            name: '2017',
            type: 'bar'
        };

        var trace2 = {
            x: ['11', '12', '13'],
            y: [12, 18, 29],
            name: '2018',
            type: 'bar'
        };

        var data = [trace1, trace2];

        var layout = { barmode: 'group' };
        Plotly.plot(document.getElementById("bar_doble"), data, layout);
    }

    function grafica_barras_stack() {
        var trace1 = {
            x: ['11', '12', '13'],
            y: [20, 14, 23],
            name: '2017',
            type: 'bar'
        };

        var trace2 = {
            x: ['11', '12', '13'],
            y: [12, 18, 29],
            name: '2018',
            type: 'bar'
        };

        var data = [trace1, trace2];

        var layout = { barmode: 'stack' };
        Plotly.plot(document.getElementById("bar_stack"), data, layout);
    }

    function grafica_puntos() {
        var trace1 = {
            x: [1, 2, 3, 4, 5],
            y: [1, 6, 3, 6, 1],
            mode: 'markers',
            type: 'scatter',
            name: 'Grupo 1',
            text: ['A-1', 'A-2', 'A-3', 'A-4', 'A-5'],
            marker: { size: 12 }
        };

        var trace2 = {
            x: [1.5, 2.5, 3.5, 4.5, 5.5],
            y: [4, 1, 7, 1, 4],
            mode: 'markers',
            type: 'scatter',
            name: 'Grupo 2',
            text: ['B-a', 'B-b', 'B-c', 'B-d', 'B-e'],
            marker: { size: 12 }
        };

        var trace3 = {
            x: [5, 3, 9, 6, 5],
            y: [1, 6, 4, 6, 1],
            mode: 'markers',
            type: 'scatter',
            name: 'Grupo 3',
            text: ['D-1', 'D-2', 'D-3', 'D-4', 'D-5'],
            marker: { size: 12 }
        };

        var trace4 = {
            x: [5, 8, 2, 6, 5],
            y: [4, 1, 7, 1, 4],
            mode: 'markers',
            type: 'scatter',
            name: 'Grupo 4',
            text: ['C-a', 'C-b', 'C-c', 'C-d', 'C-e'],
            marker: { size: 12 }
        };

        var data = [trace1, trace2, trace3, trace4];

        var layout = {
            xaxis: {
                range: [0.75, 5.25]
            },
            yaxis: {
                range: [0, 8]
            },
            title: 'Data Labels Hover'
        };
        Plotly.plot(document.getElementById("puntos"), data, layout);
    }

    function grafica_dona() {
        var data = [{
            values: [16, 15, 12, 6, 5, 4, 42],
            labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
            domain: {
                x: [0, .48]
            },
            name: 'GHG Emissions',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
        }, {
            values: [27, 11, 25, 8, 1, 3, 25],
            labels: ['US', 'China', 'European Union', 'Russian Federation', 'Brazil', 'India', 'Rest of World'],
            text: 'CO2',
            textposition: 'inside',
            domain: { x: [.52, 1] },
            name: 'CO2 Emissions',
            hoverinfo: 'label+percent+name',
            hole: .4,
            type: 'pie'
        }];

        var layout = {
            title: 'Global Emissions 1990-2011',
            annotations: [
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: 'GHG',
                    x: 0.17,
                    y: 0.5
                },
                {
                    font: {
                        size: 20
                    },
                    showarrow: false,
                    text: 'CO2',
                    x: 0.82,
                    y: 0.5
                }
            ],
            height: 600,
            width: 600
        };
        Plotly.plot(document.getElementById("dona"), data, layout);
    }

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

    grafica_barras();
    grafica_linea_simple();
    grafica_pie();
    grafica_barras_doble();
    grafica_barras_stack();
    grafica_puntos();
    grafica_dona();
    grafica_pie_multiple();


});