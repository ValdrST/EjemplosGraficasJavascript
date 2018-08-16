$(document).ready(function () {
    function grafica_linea_simple() {
        var chart = new Chart(document.getElementById("linea_simple").getContext('2d'), {
            type: 'line',
            data: {
                datasets: [{
                    label: 'linea de datos',
                    data: [0, 20, 40, 50],
                    backgroundColor: 'rgba(0, 0, 0, 0)'
                }],
                labels: ['January', 'February', 'March', 'April']
            },
            options: {
                responsive: true
            }
        });
    }

    function grafica_pie() {
        var chart = new Chart(document.getElementById("pie").getContext('2d'), {
            type: 'pie',
            data: {
                datasets: [{
                    label: 'grafica circular',
                    data: [19, 26, 55],
                    backgroundColor: [
                        'rgba(0,241, 0,1)',
                        'rgba(123, 0, 0, 1)',
                        'rgba(0, 0, 123, 1)'
                    ]
                }],
                labels: ['primer cuadrante', 'segundo cuadrante', 'tercer cuadrante']
            },
            options: {
                responsive: true
            }
        });
    }
    function grafica_barras() {
        var chart = new Chart(document.getElementById("bar").getContext('2d'), {
            type: 'bar',
            data: {
                datasets: [{
                    data: [19, 26, 55],
                    backgroundColor: [
                        'rgba(0,241, 0,1)',
                        'rgba(123, 0, 0, 1)',
                        'rgba(0, 0, 123, 1)'
                    ]
                }],
                labels: ['barra 1', 'barra 2', 'barra 3']
            },
            options: {
                responsive: true
            }
        });
    }
    function grafica_barras_doble() {
        var chart = new Chart(document.getElementById("bar_doble").getContext('2d'), {
            type: 'bar',
            data: {
                datasets: [{
                    label: '2017',
                    data: [19, 26, 55],
                    backgroundColor: [
                        'rgba(0, 0, 123, 1)',
                        'rgba(0, 0, 123, 1)',
                        'rgba(0, 0, 123, 1)'
                    ]
                },
                {
                    label: '2018',
                    data: [21, 30, 70],
                    backgroundColor: [
                        'rgba(0,241,0, 1)',
                        'rgba(0,241,0, 1)',
                        'rgba(0,241,0, 1)'
                    ]
                }
                ],
                labels: ['barra 1', 'barra 2', 'barra 3']
            },
            options: {
                responsive: true,
                barValueSpacing: 20
            }
        });
    }
    function grafica_barras_stack() {
        var chart = new Chart(document.getElementById("bar_stack").getContext('2d'), {
            type: 'bar',
            data: {
                datasets: [{
                    label: '2017',
                    data: [19, 26, 55],
                    backgroundColor: [
                        'rgba(0, 0, 123, 1)',
                        'rgba(0, 0, 123, 1)',
                        'rgba(0, 0, 123, 1)'
                    ]
                },
                {
                    label: '2018',
                    data: [21, 30, 70],
                    backgroundColor: [
                        'rgba(0,241,0, 1)',
                        'rgba(0,241,0, 1)',
                        'rgba(0,241,0, 1)'
                    ]
                }
                ],
                labels: ['barra 1', 'barra 2', 'barra 3']
            },
            options: {
                scales: {
                    yAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        stacked: true,
                        ticks: {
                            beginAtZero: true
                        }
                    }]

                }
            }
        });
    }
    function grafica_puntos() {
        var color = Chart.helpers.color;
        var chart = new Chart(document.getElementById("puntos").getContext('2d'), {
            type: "scatter",
            datasets: [{
                label: 'grupo 1',
                borderColor: "red",
                backgroundColor: 'rgba(255,0,0, 0.2)',
                data: [
                    {
                        x: 1,
                        y: 1
                    }, {
                        x: 2,
                        y: 6
                    }, {
                        x: 3,
                        y: 3
                    }, {
                        x: 4,
                        y: 6
                    }, {
                        x: 5,
                        y: 1
                    }
                ]}, 
                {
                label: 'grupo 2',
                borderColor: "blue",
                backgroundColor: 'rgba(0,0,255, 0.2)',
                data: [
                    {
                        x: 1.5,
                        y: 3
                    }, {
                        x: 2.5,
                        y: 1
                    }, {
                        x: 3.5,
                        y: 7
                    }, {
                        x: 4.5,
                        y: 1
                    }, {
                        x: 5.5,
                        y: 4
                    }],
            }],
            options: {
                title: {
                    display: true,
                    text: 'Chart.js Scatter Chart'
                }
            }
        });
    }

    function grafica_dona(){
        var randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

		var config = {
			type: 'doughnut',
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						"red",
						"orange",
						"yellow",
						"green",
						"blue",
					],
					label: 'Dataset 1'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue'
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Chart.js Doughnut Chart'
				},
				animation: {
					animateScale: true,
					animateRotate: true
				}
			}
		};
        var chart = new Chart(document.getElementById("dona").getContext('2d'), config);

    }

    /*function grafica_pie_multiple(){
        let randomScalingFactor = function() {
			return Math.round(Math.random() * 100);
		};

		let config = {
			data: {
				datasets: [{
					data: [
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
						randomScalingFactor(),
					],
					backgroundColor: [
						"red",
						"orange",
						"yellow",
						"green",
						"blue",
					],
					label: 'My dataset'
				}],
				labels: [
					'Red',
					'Orange',
					'Yellow',
					'Green',
					'Blue',
				]
			},
			options: {
				responsive: true,
				legend: {
					position: 'right',
				},
				title: {
					display: true,
					text: 'polar'
				},
				scale: {
					ticks: {
						beginAtZero: true
					},
					reverse: false
				}
			}
		};

        var chart = new Chart(document.getElementById('polar').getContext('2d'), config);
    }*/

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
        }
        */
    //
    grafica_linea_simple();
    grafica_pie();
    grafica_barras();
    grafica_barras_doble();
    grafica_barras_stack();
    grafica_puntos();
    grafica_dona();
    //grafica_pie_multiple();
});