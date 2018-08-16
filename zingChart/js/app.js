$(document).ready(function () {
    function grafica_linea_simple() {
        var myConfig = {
            type: 'line',
            backgroundColor: '#2C2C39',
            title: {
                text: 'Grafica Lineal',
                adjustLayout: true,
                fontColor: "#E3E3E5",
                marginTop: 7
            },
            legend: {
                align: 'center',
                verticalAlign: 'top',
                backgroundColor: 'none',
                borderWidth: 0,
                item: {
                    fontColor: '#E3E3E5',
                    cursor: 'hand'
                },
                marker: {
                    type: 'circle',
                    borderWidth: 0,
                    cursor: 'hand'
                }
            },
            plotarea: {
                margin: 'dynamic 70'
            },
            plot: {
                aspect: 'spline',
                lineWidth: 2,
                marker: {
                    borderWidth: 0,
                    size: 5
                }
            },
            tooltip: {
                borderWidth: 0,
                borderRadius: 3
            },
            crosshairX: {
                plotLabel: {
                    multiple: true,
                    borderRadius: 3
                },
                scaleLabel: {
                    backgroundColor: '#53535e',
                    borderRadius: 3
                },
                marker: {
                    size: 7,
                    alpha: 0.5
                }
            },
            crosshairY: {
                lineColor: '#E3E3E5',
                type: 'multiple',
                scaleLabel: {
                    decimals: 2,
                    borderRadius: 3,
                    offsetX: -5,
                    fontColor: "#2C2C39",
                    bold: true
                }
            },
            series: [
                {
                    values: [1, 2, 4, 8, 16],
                    lineColor: '#E34247',
                    marker: {
                        backgroundColor: '#E34247'
                    }
                }
            ]
        };


        zingchart.render({
            id: 'linea_simple',
            data: myConfig,
        });
    }
    function grafica_pie() {
        var myConfig = {
            type: "pie",
            backgroundColor: "#2B313B",
            plot: {
                borderColor: "#2B313B",
                borderWidth: 5,
                // slice: 90,
                valueBox: {
                    placement: 'out',
                    text: '%t\n%npv%',
                    fontFamily: "Open Sans"
                },
                tooltip: {
                    fontSize: '18',
                    fontFamily: "Open Sans",
                    padding: "5 10",
                    text: "%npv%"
                },
                animation: {
                    effect: 2,
                    method: 5,
                    speed: 500,
                    sequence: 1
                }
            },
            title: {
                fontColor: "#fff",
                text: 'Grafica de pie',
                align: "left",
                offsetX: 10,
                fontFamily: "Open Sans",
                fontSize: 25
            },
            subtitle: {
                offsetX: 10,
                offsetY: 10,
                fontColor: "#8e99a9",
                fontFamily: "Open Sans",
                fontSize: "16",
                text: 'subtitulo',
                align: "left"
            },
            plotarea: {
                margin: "20 0 0 0"
            },
            series: [
                {
                    values: [19],
                    text: 'primer cuadrante',
                    backgroundColor: '#50ADF5',
                },
                {
                    values: [26],
                    text: 'segundo cuadrante',
                    backgroundColor: '#FF7965'
                },
                {
                    values: [55],
                    text: 'tercer cuadrante',
                    backgroundColor: '#FFCB45'
                }
            ]
        };

        zingchart.render({
            id: 'pie',
            data: myConfig,
            height: 500,
            width: 725
        });


    }

    function grafica_barras() {
        var myConfig = {
            "type": "bar3d",
            "background-color": "#efeff5",
            "3d-aspect": {
                "true3d": 0,
                "y-angle": 10,
                "depth": 30
            },
            "title": {
                "text": "Grafica de barras",
                "height": "40px",
                "font-weight": "normal",
                "text-color": "#0000"
            },
            "legend": {
                "layout": "float",
                "background-color": "none",
                "border-color": "none",
                "item": {
                    "font-color": "#000"
                },
                "x": "37%",
                "y": "10%",
                "width": "90%",
                "shadow": 0
            },
            "plotarea": {
                "margin": "95px 35px 50px 70px",
                "background-color": "#000",
                "alpha": 0.3
            },
            "scale-y": {
                "background-color": "#000",
                "border-width": "1px",
                "border-color": "#333",
                "alpha": 0.5,
                "format": "%v",
                "guide": {
                    "line-style": "solid",
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "tick": {
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "item": {
                    "font-color": "#000",
                    "padding-right": "6px"
                }
            },
            "scale-x": {
                "background-color": "#000",
                "border-width": "1px",
                "border-color": "#333",
                "alpha": 0.5,
                "values": ["11", "12", "13"],
                "guide": {
                    "visible": false
                },
                "tick": {
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "item": {
                    "font-size": "11px",
                    "font-color": "#333"
                }
            },
            "series": [
                {
                    "values": [19, 26, 55],
                    "text": "Product 1",
                    "background-color": "#03A9F4 #4FC3F7",
                    "border-color": "#03A9F4",
                    "legend-marker": {
                        "border-color": "#03A9F4"
                    },
                    "tooltip": {
                        "background-color": "#03A9F4",
                        "text": "%v",
                        "font-size": "12px",
                        "padding": "6 12",
                        "border-color": "none",
                        "shadow": 0,
                        "border-radius": 5
                    }
                }
            ]
        };

        zingchart.render({
            id: 'bar',
            data: myConfig,
            defaults: {
                'font-family': 'sans-serif'
            }
        });
    }


    function grafica_barras_doble() {
        var myConfig = {
            "type": "bar3d",
            "background-color": "#fff",
            "3d-aspect": {
                "true3d": 0,
                "y-angle": 10,
                "depth": 30
            },
            "title": {
                "text": "Grafica doble",
                "height": "40px",
                "font-weight": "normal",
                "text-color": "#ffffff"
            },
            "legend": {
                "layout": "float",
                "background-color": "none",
                "border-color": "none",
                "item": {
                    "font-color": "#333"
                },
                "x": "37%",
                "y": "10%",
                "width": "90%",
                "shadow": 0
            },
            "plotarea": {
                "margin": "95px 35px 50px 70px",
                "background-color": "#fff",
                "alpha": 0.3
            },
            "scale-y": {
                "background-color": "#fff",
                "border-width": "1px",
                "border-color": "#333",
                "alpha": 0.5,
                "format": "%v",
                "guide": {
                    "line-style": "solid",
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "tick": {
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "item": {
                    "font-color": "#333",
                    "padding-right": "6px"
                }
            },
            "scale-x": {
                "background-color": "#fff",
                "border-width": "1px",
                "border-color": "#333",
                "alpha": 0.5,
                "values": ["11", "12", "13"],
                "guide": {
                    "visible": false
                },
                "tick": {
                    "line-color": "#333",
                    "alpha": 0.2
                },
                "item": {
                    "font-size": "11px",
                    "font-color": "#333"
                }
            },
            "series": [
                {
                    "values": [20, 14, 23],
                    "text": "2017",
                    "background-color": "#03A9F4 #4FC3F7",
                    "border-color": "#03A9F4",
                    "legend-marker": {
                        "border-color": "#03A9F4"
                    },
                    "tooltip": {
                        "background-color": "#03A9F4",
                        "text": "%v",
                        "font-size": "12px",
                        "padding": "6 12",
                        "border-color": "none",
                        "shadow": 0,
                        "border-radius": 5
                    }
                },
                {
                    "values": [12, 18, 29],
                    "text": "2018",
                    "background-color": "#673AB7 #9575CD",
                    "border-color": "#673AB7",
                    "legend-marker": {
                        "border-color": "#673AB7"
                    },
                    "tooltip": {
                        "background-color": "#673AB7",
                        "text": "%v",
                        "font-size": "12px",
                        "padding": "6 12",
                        "border-color": "none",
                        "shadow": 0,
                        "border-radius": 5
                    }
                }
            ]
        };

        zingchart.render({
            id: 'bar_doble',
            data: myConfig,
            defaults: {
                'font-family': 'sans-serif'
            }
        });
    }

    function grafica_barras_stack() {


        zingchart.THEME = "classic";
        var myConfig =
        {
            "type": "bar",
            "stacked": true,
            "stack-type": "normal",
            "background-color": "#FFFFFF",
            "plot": {
                "bar-width": "25px",
                "hover-state": {
                    "visible": false
                },
                "animation": {
                    "delay": 300,
                    "sequence": 1
                }
            },
            "labels": [
                {
                    "text": "2017",
                    "background-color": "#90A23B",
                    "font-size": "14px",
                    "font-family": "arial",
                    "font-weight": "normal",
                    "font-color": "#FFFFFF",
                    "padding": "10%",
                    "border-radius": "3px",
                    "offset-y": -30,
                    "shadow": false,
                    "callout": true,
                    "callout-height": "10px",
                    "callout-width": "15px",
                    "hook": "node:plot=0;index=0"
                },
                {
                    "text": "2018",
                    "background-color": "#FFC700",
                    "font-size": "14px",
                    "font-family": "arial",
                    "font-weight": "normal",
                    "font-color": "#FFFFFF",
                    "padding": "10%",
                    "border-radius": "3px",
                    "shadow": false,
                    "callout": true,
                    "callout-height": "10px",
                    "callout-width": "15px",
                    "hook": "node:plot=1;index=1",
                    "offset-y": -30
                }
            ],
            "scale-x": {
                "values": [
                    "JAN",
                    "FEB"
                ],
                "line-color": "#7E7E7E",
                "tick": {
                    "visible": false
                },
                "guide": {
                    "visible": false
                },
                "item": {
                    "font-family": "arial",
                    "font-color": "#8B8B8B"
                }
            },
            "scale-y": {
                "values": "0:40:1",
                "short": true,
                "line-color": "#7E7E7E",
                "tick": {
                    "visible": false
                },
                "guide": {
                    "line-style": "solid"
                },
                "item": {
                    "font-family": "arial",
                    "font-color": "#8B8B8B"
                }
            },
            "series": [
                {
                    "values": [
                        20, 14, 23
                    ],
                    "background-color": "#90A23B"
                },
                {
                    "values": [
                        12, 18, 29
                    ],
                    "background-color": "#FFC700"
                }
            ],
            "tooltip": {
                "visible": false
            }
        }
            ;

        zingchart.render({
            id: 'bar_stack',
            data: myConfig,
        });


    }

    function grafica_puntos() {


        zingchart.THEME = "classic";

        var myJson = {
            "graphset": [
                {
                    "type": "scatter",
                    "background-color": "#fff #fbfbfb",
                    "title": {
                        "text": "Height Versus Weight of 507 Individuals By Gender<br>Source: Heinz et al. 2003",
                        "background-color": "#00a679 #33b894"
                    },
                    "plotarea": {
                        "margin": "60 40 dynamic dynamic"
                    },
                    "legend": {
                        "margin-top": 55,
                        "shadow": 0,
                        "alpha": 0.8,
                        "border-color": "#00a679",
                        "border-radius": 5,
                        "border-width": 3,
                        "adjust-layout": true,
                        "cursor": "hand",
                        "item": {
                            "bold": true,
                            "cursor": "hand"
                        },
                        "marker": {
                            "type": "circle",
                            "size": 5,
                            "border-color": "#fff",
                            "border-width": 1,
                            "cursor": "hand"
                        }
                    },
                    "shapes": [
                        {
                            "type": "star5",
                            "x": "89%",
                            "y": "24.6%",
                            "size": 6,
                            "background-color": "#00a679"
                        }
                    ],
                    "labels": [
                        {
                            "text": "Seleccionado",
                            "x": "91%",
                            "y": "23%",
                            "bold": true,
                            "font-size": 11
                        }
                    ],
                    "scale-x": {
                        "offset-start": 20,
                        "offset-end": 20,
                        "items-overlap": true,
                        "max-items": 16,
                        "label": {
                            "text": "Height (cm)"
                        }
                    },
                    "scale-y": {
                        "min-value": "auto",
                        "offset-start": 20,
                        "offset-end": 20,
                        "label": {
                            "text": "Weight (Kg)"
                        }
                    },
                    "plot": {
                        "selection-mode": "multiple",
                        "selected-marker": {
                            "background-color": "#00a679",
                            "border-width": 1,
                            "border-color": "#00a679",
                            "size": 6,
                            "type": "star5"
                        }
                    },
                    "series": [
                        {
                            "marker": {
                                "type": "circle",
                                "background-color": "#e24b77",
                                "border-width": 1,
                                "border-color": "#fff",
                                "shadow": 0
                            },
                            "tooltip": {
                                "padding": 10,
                                "background-color": "#FFF",
                                "border-color": "#e24b77",
                                "color": "#e24b77",
                                "border-width": 2,
                                "alpha": "0.8",
                                "text-align": "left",
                                "border-radius": 8,
                                "text": "%k / %v"
                            },
                            "text": "grupo 2",
                            "values": [[1.5, 4], [2.5, 1], [3.5, 7], [4.5, 1], [5.5, 4]]
                        },
                        {
                            "marker": {
                                "type": "circle",
                                "background-color": "#4c77ba",
                                "border-width": 1,
                                "border-color": "#fff",
                                "shadow": 0
                            },
                            "tooltip": {
                                "padding": 10,
                                "background-color": "#FFF",
                                "border-color": "#4c77ba",
                                "color": "#4c77ba",
                                "border-width": 2,
                                "alpha": "0.8",
                                "text-align": "left",
                                "border-radius": 8,
                                "text": "%k / %v"
                            },
                            "text": "grupo 1",
                            "values": [[1, 1], [2, 6], [3, 3], [4, 6], [5, 1]]
                        }
                    ]
                }
            ]
        };
        zingchart.render({
            id: 'puntos',
            data: myJson,
        });
    }
    function grafica_dona() {


        var myConfig = {
            backgroundColor: '#FBFCFE',
            type: "ring",
            title: {
                text: "GRAFICA DE DONA",
                fontFamily: 'Lato',
                fontSize: 14,
                // border: "1px solid black",
                padding: "15",
                fontColor: "#1E5D9E",
            },
            subtitle: {
                text: "Subtitulo",
                fontFamily: 'Lato',
                fontSize: 12,
                fontColor: "#777",
                padding: "5"
            },
            plot: {
                slice: '50%',
                borderWidth: 0,
                backgroundColor: '#FBFCFE',
                animation: {
                    effect: 2,
                    sequence: 3
                },
                valueBox: [
                    {
                        type: 'all',
                        text: '%t',
                        placement: 'out'
                    },
                    {
                        type: 'all',
                        text: '%npv%',
                        placement: 'in'
                    }
                ]
            },
            tooltip: {
                fontSize: 16,
                anchor: 'c',
                x: '50%',
                y: '50%',
                sticky: true,
                backgroundColor: 'none',
                borderWidth: 0,
                thousandsSeparator: ',',
                text: '<span style="color:%color">Page Url: %t</span><br><span style="color:%color">Pageviews: %v</span>',
                mediaRules: [
                    {
                        maxWidth: 500,
                        y: '54%',
                    }
                ]
            },
            plotarea: {
                backgroundColor: 'transparent',
                borderWidth: 0,
                borderRadius: "0 0 0 10",
                margin: "70 0 10 0"
            },
            legend: {
                toggleAction: 'remove',
                backgroundColor: '#FBFCFE',
                borderWidth: 0,
                adjustLayout: true,
                align: 'center',
                verticalAlign: 'bottom',
                marker: {
                    type: 'circle',
                    cursor: 'pointer',
                    borderWidth: 0,
                    size: 5
                },
                item: {
                    fontColor: "#777",
                    cursor: 'pointer',
                    offsetX: -6,
                    fontSize: 12
                },
                mediaRules: [
                    {
                        maxWidth: 500,
                        visible: false
                    }
                ]
            },
            scaleR: {
                refAngle: 270
            },
            series: [
                {
                    text: "data 1",
                    values: [30],
                    lineColor: "#00BAF2",
                    backgroundColor: "#00BAF2",
                    lineWidth: 1,
                    marker: {
                        backgroundColor: '#00BAF2'
                    }
                },
                {
                    text: "data 2",
                    values: [120],
                    lineColor: "#E80C60",
                    backgroundColor: "#E80C60",
                    lineWidth: 1,
                    marker: {
                        backgroundColor: '#E80C60'
                    }
                },
                {
                    text: "data 3",
                    values: [45],
                    lineColor: "#9B26AF",
                    backgroundColor: "#9B26AF",
                    lineWidth: 1,
                    marker: {
                        backgroundColor: '#9B26AF'
                    }
                },
                {
                    text: "data 4",
                    values: [70],
                    lineColor: "#9B26AF",
                    backgroundColor: "#26268F",
                    lineWidth: 1,
                    marker: {
                        backgroundColor: '#9B26AF'
                    }
                }
            ]
        };
        try {
            zingchart.render({
                id: 'dona',
                data: {
                    gui: {
                        contextMenu: {
                            button: {
                                visible: true,
                                lineColor: "#2D66A4",
                                backgroundColor: "#2D66A4"
                            },
                            gear: {
                                alpha: 1,
                                backgroundColor: "#2D66A4"
                            },
                            position: "right",
                            backgroundColor: "#306EAA", /*sets background for entire contextMenu*/
                            docked: true,
                            item: {
                                backgroundColor: "#306EAA",
                                borderColor: "#306EAA",
                                borderWidth: 0,
                                fontFamily: "Lato",
                                color: "#fff"
                            }

                        },
                    },
                    graphset: [myConfig]
                },
                height: '499',
                width: '99%'
            });
        }catch(Exception){

        }
        
    
    
    }

    function grafica_horizontal() {


        zingchart.THEME = "classic";
        var myConfig = {
            "graphset": [
                {
                    "type": "hbar3d",
                    "background-color": "#43577c",
                    "stacked": true,
                    "3d-aspect": {
                        "true3d": false,
                        "y-angle": 10,
                        "depth": 15
                    },
                    "title": {
                        "text": "Horizontal",
                        "background-color": "#ABAAAD",
                        "font-color": "#000000",
                        "font-weight": "normal"
                    },
                    "legend": {
                        "layout": "float",
                        "margin": "12% auto auto auto",
                        "background-color": "none",
                        "border-width": 0,
                        "shadow": 0,
                        "toggle-action": "remove",
                        "marker": {
                            "border-color": "#fff"
                        },
                        "item": {
                            "font-color": "#acbad0"
                        }
                    },
                    "tooltip": {
                        "text": "%t / %k = %v<br>%k Total = %total",
                        "font-color": "#000000",
                        "border-width": "1px",
                        "border-color": "#ffffff"
                    },
                    "plot": {
                        "bar-width": 25,
                        "alpha": 0.9
                    },
                    "plotarea": {
                        "background-color": "#4f678e",
                        "margin": "25% 5% 20% 15%"
                    },
                    "scale-x": {
                        "values": [
                            "Region 1",
                            "Region 2",
                            "Region 3",
                            "Region 4",
                            "Region 5",
                            "Region 6"
                        ],
                        "background-color": "#4F678E",
                        "guide": {
                            "line-color": "#fff"
                        },
                        "tick": {
                            "line-color": "#6e82a1"
                        },
                        "item": {
                            "font-color": "#acbad0",
                            "offset-x": "-5%"
                        }
                    },
                    "scale-y": {
                        "background-color": "#43577c #4F678E",
                        "label": {
                            "text": "Number of Samples Taken",
                            "font-color": "#acbad0",
                            "font-weight": "normal",
                            "offset-y": "5%"
                        },
                        "guide": {
                            "line-color": "#fff"
                        },
                        "tick": {
                            "line-color": "#6e82a1"
                        },
                        "item": {
                            "font-color": "#acbad0"
                        }
                    },
                    "series": [
                        {
                            "values": [
                                17,
                                28,
                                9,
                                14,
                                27,
                                13
                            ],
                            "background-color": "#7D7B6E",
                            "text": "Type 1A"
                        },
                        {
                            "values": [
                                11,
                                26,
                                7,
                                44,
                                11,
                                28
                            ],
                            "background-color": "#A3A090",
                            "text": "Type 2C"
                        },
                        {
                            "values": [
                                13,
                                21,
                                16,
                                30,
                                23,
                                18
                            ],
                            "background-color": "#BDB9A6",
                            "text": "Type 2F"
                        },
                        {
                            "values": [
                                8,
                                31,
                                12,
                                24,
                                20,
                                40
                            ],
                            "background-color": "#D7D3BD",
                            "text": "Type 3D"
                        }
                    ]
                }
            ]
        };

        zingchart.render({
            id: 'horizontal',
            data: myConfig,
        });


    }

    grafica_linea_simple();
    grafica_pie();
    grafica_barras();
    grafica_barras_stack();
    grafica_barras_doble();
    grafica_puntos();
    grafica_dona();
    grafica_horizontal();
    /*
    grafica_mixta();*/
    // grafica_pie_multiple();


});