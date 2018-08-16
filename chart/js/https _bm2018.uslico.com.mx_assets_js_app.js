$(document).ready(function () {
    let usuario_nombre = "";
    $("#menu-toggle").click(function () {
        $("#wrapper").toggleClass("active");
    });
    $("#li-avance").click(function () {
        $(".breadcrumb").html("<li><a href='#'><em class='fa fa-home'></em></a></li><li class='active'>Avance</li>");
        $(".page-header").html("Avance");
        $(".container").html("");
        $(".active").removeClass("active");
        $("#li-avance").addClass("active");
        $(".container").load("vista/ver_avance_vista.html");
    });
    if (sessionStorage.getItem("tipo") == 3) {
        $(".altas").hide();
    }
    if (sessionStorage.getItem("tipo") == 2) {
        $(".alta-user").hide();
    }
    $("#user-nameLB").text(sessionStorage.getItem("nombre"));

    //CODIGO LOGIN
    $("#login").click(function () {
        $.ajax({
            type: "POST",
            url: "controlador/sesion_controlador.php",
            data: {
                username: $("#username").val(),
                password: $("#password").val()
            },
            dataType: "application/x-www-form-urlencoded; charset=UTF-8",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    var respuesta = jQuery.parseJSON($.trim(XHTMLHttpRequest.responseText));
                    console.log(respuesta);
                    if (respuesta.usuario != "") {
                        alert("bienvenido " + respuesta.usuario);
                        usuario_nombre = respuesta.usuario;
                        usuario_tipo = respuesta.tipo;
                        sessionStorage.setItem("nombre", usuario_nombre);
                        sessionStorage.setItem("tipo", usuario_tipo);
                        $("#user-nameLB").text(usuario_nombre);
                        console.log(usuario_nombre);
                        location.href = "index.php";
                    } else if (respuesta.tipo == 200) {
                        $_SESSION['username'];
                    } else {
                        alert("Usuario o contraseña no valido");
                    }
                },
                404: function (XHTMLHttpRequest) {
                    alert("Recurso no encontrado");
                },
                500: function (XHTMLHttpRequest) {
                    alert("error en el servidor");
                }
            }
        });
    });


    $("#inicio-btn").click(function () {
        $(".breadcrumb").html("<li><a href='#'><em class='fa fa-home'></em></a></li><li class='active'>Inicio</li>");
        $(".page-header").html("Inicio");
        $(".container").html("");
        $(".active").removeClass("active");
        $("#li-inicio").addClass("active");
    });
    //CODIGO USUARIO
    $("#alta-user").click(function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Usuarios</li><li class='active'>Alta</li>");
        $(".page-header").html("Alta Usuario");
        $(".container").load("vista/usuario/alta_usuario_vista.html");
        $(".active").removeClass("active");
        $("#li-usuario").last().addClass("active");
        $.ajax({
            type: "GET",
            url: "controlador/usuario/getTipo.php",
            dataType: "json"
        }).done(function (data) {
            var tipo = data.pop();
            $("#id_tipo").append("<option value=''></option>");
            while (tipo) {
                $("#id_tipo").append("<option value=" + tipo.ID_TIPO + ">" + tipo.NOMBRE + "</option>");
                tipo = data.pop();
            }
        });
    });

    $(".container").on("click", "#registrar", function () {
        console.log("entro");
        if ($("#password").val().length > 3 && $("#usuario").val().length > 3) {
            $.ajax({
                type: "POST",
                url: "controlador/usuario/registrar_usuario_controlador.php?vista=0",
                data: {
                    nombre_completo: $("#nombrecomp").val(),
                    email: $("#email").val(),
                    usuario: $("#usuario").val(),
                    password: $("#password").val(),
                    id_tipo: $("#id_tipo option:selected").val()
                },
                dataType: "application/x-www-form-urlencoded; charset=UTF-8",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        console.log(XHTMLHttpRequest);
                        var respuesta = jQuery.parseJSON($.trim(XHTMLHttpRequest.responseText));
                        console.log(respuesta);
                        if (respuesta.status == 1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                            ver_user();
                        } else if (respuesta.status == 0) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        } else if (respuesta.status == -1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        }
                    }
                }
            });
        } else {
            alert("No has llenado los datos correctamente");
        }

    });

    ver_user = function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Usuarios</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver usuarios");
        $(".active").removeClass("active");
        $("#li-usuario").last().addClass("active");
        $(".container").load("vista/usuario/ver_usuario_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/usuario/ver_usuario_controlador.php",
                dataType: "json"
            }).done(function (data) {
                if (data == "expired") {
                    alert("sesion expirada");
                    location.href = "index.php";
                    return;
                }
                $("#usuario-tbody").html("");
                var usuario = data[0].pop();
                var tipo = sessionStorage.getItem("tipo");
                var nombre = sessionStorage.getItem("nombre");
                console.log(tipo);
                if (tipo == 1) {
                    while (usuario) {
                        $("#usuario-tbody").append('<tr id=tr-usr-' + usuario.ID_USUARIO + '><td>' + usuario.NOMBRE_COMPLETO + '</td><td>' + usuario.EMAIL + '</td><td>' + usuario.USUARIO + '</td><td>' + usuario.NOMBRE + '</td><td><input type="button" class="btn-mod-usr btn btn-sm btn-warning" value="Modificar" id=' + usuario.ID_USUARIO + '><br><br><input type="button" class="btn-del-usr btn btn-sm btn-danger" value="Eliminar" id=' + usuario.ID_USUARIO + '></td></tr>');
                        usuario = data[0].pop();
                    }
                } else {
                    while (usuario) {
                        if (usuario.USUARIO == nombre) {
                            $("#usuario-tbody").append('<tr id=tr-usr-' + usuario.ID_USUARIO + '><td>' + usuario.NOMBRE_COMPLETO + '</td><td>' + usuario.EMAIL + '</td><td>' + usuario.USUARIO + '</td><td>' + usuario.NOMBRE + '</td><td><input type="button" class="btn-mod-usr btn btn-sm btn-warning" value="Modificar" id=' + usuario.ID_USUARIO + '></td></tr>');
                        }
                        usuario = data[0].pop();
                    }
                }
            });
        });
    }

    $(".container").on("click", ".btn-mod-usr", function () {
        $.ajax({
            type: "POST",
            data: {
                id: $(this).attr('id')
            },
            url: "controlador/usuario/get_datos_mod_usuario_controlador.php",
            dataType: "json"
        }).done(function (data) {
            console.log(data);
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Usuarios</li><li>Ver</li><li class='active'>Modificar usuario</li>");
            $(".page-header").html("Modificar usuario");
            $(".active").removeClass("active");
            $("#li-usuario").last().addClass("active");
            $(".container").load("vista/usuario/mod_usuario_vista.html", data, function () {
                $.ajax({
                    type: "GET",
                    async: false,
                    url: "controlador/usuario/getTipo.php",
                    dataType: "json"
                }).done(function (data) {
                    var tipo = data.pop();
                    $("#id_tipo").append("<option value=''></option>");
                    while (tipo) {
                        $("#id_tipo").append("<option id=" + tipo.ID_TIPO + " value=" + tipo.ID_TIPO + ">" + tipo.NOMBRE + "</option>");
                        tipo = data.pop();
                    }
                });
                $("#nombrecomp").attr("value", data.NOMBRE_COMPLETO);
                $("#email").attr("value", data.EMAIL);
                $("#usuario").attr("value", data.USUARIO);

                $("#" + data.ID_TIPO).attr("selected", "selected");
                $("#idUsuario").attr("value", data.ID_USUARIO);
                if (sessionStorage.getItem("tipo") != 1)
                    $("#id_tipo").prop('disabled', true);

            });
        });
    });

    $("#usuario-tbody").on("click", ".btn-del-usr", function () {
        var tridusr = $(this).attr('id');
        $.ajax({
            type: "POST",
            data: {
                id_usuario: tridusr
            },
            url: "controlador/usuario/eliminar_usuario_controlador.php",
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    var respuesta = XHTMLHttpRequest;
                    if (respuesta.status == 1) {
                        console.log("#tr-usr-" + tridusr);
                        $("#tr-usr-" + tridusr).hide();
                        alert(respuesta.mensaje + " " + respuesta.info);
                        ver_user();
                    } else if (respuesta.status == 0) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                        $("#tr-usr-" + $(this).attr('id')).html("");
                    } else if (respuesta.status == -1) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                    }
                }

            }
        });
    });


    $(".container").on("click", "#modificar", function () {
        if ($("#password").val().length > 3 && $("#usuario").val().length > 3 || $("#password").val().length == 0) {
            $.ajax({
                type: "POST",
                url: "controlador/usuario/modificar_usuario_controlador.php",
                data: {
                    id_usuario: $("#idUsuario").val(),
                    nombre_completo: $("#nombrecomp").val(),
                    email: $("#email").val(),
                    usuario: $("#usuario").val(),
                    password: $("#password").val(),
                    id_tipo: $("#id_tipo option:selected").val()
                },
                dataType: "application/x-www-form-urlencoded; charset=UTF-8",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        var respuesta = jQuery.parseJSON($.trim(XHTMLHttpRequest.responseText));
                        if (respuesta.status == 1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                            ver_user();
                        } else if (respuesta.status == 0) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        } else if (respuesta.status == -1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        }
                    }
                }
            });
        } else {
            alert("La contraseña debe tener mas de 3 caracteres o dejar el campo vacio para no cambiar");
        }
    });

    $("#ver-user").click(ver_user);
    //CODIGO EMPRESA
    $("#alta-emp").click(function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresas</li><li class='active'>Alta</li>");
        $(".page-header").html("Alta de empresa");
        $(".container").load("vista/empresa/alta_empresa_vista.html");
        $(".active").removeClass("active");
        $("#li-empresa").last().addClass("active");
    });

    $(".container").on("click", "#btn-alta-emp", function () {
        let domicilio = $("#calle").val();
        if ($("#exterior").val() != '')
            if ($("#exterior").val().indexOf("LT") == -1)
                domicilio = domicilio + " #" + $("#exterior").val();
            else
                domicilio = domicilio + " " + $("#exterior").val();
        else
            domicilio = domicilio + " S/N";
        if ($("#interior").val() != '')
            if ($("#interior").val().indexOf("CASA") == -1 && $("#interior").val().indexOf("PENTHOUSE") == -1 && $("#interior").val().indexOf("DEP") == -1)
                domicilio = domicilio + " INT " + $("#interior").val();
            else
                domicilio = domicilio + " " + $("#interior").val();
        domicilio = domicilio + ". " + $("#colonia").val();
        domicilio = domicilio + ", " + $("#entidad").val();
        domicilio = domicilio + " C.P " + $("#cp").val();
        if ($("#rfc_empresa").val().length >= 12 && $("#denominacion").val().length > 0) {
            $.ajax({
                type: "POST",
                url: "controlador/empresa/registrar_empresa_controlador.php",
                data: {
                    rfc: $("#rfc_empresa").val(),
                    denominacion: $("#denominacion").val(),
                    domicilio: domicilio,
                    telefono: $("#telefono").val(),
                    giro: $("#giro").val(),
                    nivel: $("#nivel").val(),
                    sitio_web: $("#sitio_web").val()
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        var respuesta = XHTMLHttpRequest;
                        if (respuesta.status == 1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                            ver_empresa();
                        } else if (respuesta.status == 0) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        } else if (respuesta.status == -1) {
                            alert(respuesta.mensaje + " " + respuesta.info);
                        }
                    }
                }
            });
        } else {
            alert("No has llenado los datos requeridos");
        }

    });
    ver_empresa = function ver_empresa() {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresas</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver empresas");
        $(".active").removeClass("active");
        $("#li-empresa").last().addClass("active");
        $(".container").load("vista/empresa/ver_empresa_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/empresa/ver_empresa_controlador.php",
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        $("#empresa-tbody").html("");
                        var empresa = XHTMLHttpRequest[0].pop();
                        var tipo = sessionStorage.getItem("tipo");
                        if (tipo == 1) {
                            while (empresa) {
                                if (empresa.NUMERO_ESCRITURA === null && empresa.ID_OPINION === null) {
                                    empresa.NUMERO_ESCRITURA = "<input type='button' class='btn-add-not btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                    empresa.ID_OPINION = "<input type='button' class='btn-add-opi btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                } else if (empresa.NUMERO_ESCRITURA == null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "<input type='button' class='btn-add-not btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-mod-opi btn btn-sm btn-warning' value='Modificar' id='" + empresa.RFC + "'><input type='button' class='btn-del-opi btn btn-sm btn-danger' value='Borrar' id='" + empresa.RFC + "'>";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION == null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-mod-not btn btn-sm btn-warning' value='Modificar' id='" + empresa.RFC + "'><input type='button' class='btn-del-not btn btn-sm btn-danger' value='Borrar' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "<input type='button' class='btn-add-opi btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir opinion sat'>";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-mod-not btn btn-sm btn-warning' value='Modificar' id='" + empresa.RFC + "'><input type='button' class='btn-del-not btn btn-sm btn-danger' value='Borrar' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-mod-opi btn btn-sm btn-warning' value='Modificar' id='" + empresa.RFC + "'><input type='button' class='btn-del-opi btn btn-sm btn-danger' value='Borrar' id='" + empresa.RFC + "'>";
                                }
                                $("#empresa-tbody").append("<tr id=tr-" + empresa.RFC + "><td>" + empresa.RFC + "</td><td>" + empresa.DENOMINACION + "</td><td>" + empresa.DOMICILIO + "</td><td>" + empresa.TELEFONO + "</td><td>" + empresa.GIRO + "</td><td><a href='http://" + empresa.SITIO_WEB + "'>" + empresa.SITIO_WEB + "</a></td><td>" + empresa.NIVEL + "</td><td id='td-num-esc'>" + empresa.NUMERO_ESCRITURA + "</td><td id='td-opi'>" + empresa.ID_OPINION + "</td><td><input type='button' class='btn-mod-emp btn btn-sm btn-warning' value='Modificar' id='" + empresa.RFC + "'><br><br><input type='button' class='btn-del-emp btn btn-sm btn-danger' value='Eliminar' id='" + empresa.RFC + "'></td></tr>");
                                empresa = XHTMLHttpRequest[0].pop();
                            }
                        } else if (tipo == 2) {
                            while (empresa) {
                                if (empresa.NUMERO_ESCRITURA === null && empresa.ID_OPINION === null) {
                                    empresa.NUMERO_ESCRITURA = "<input type='button' class='btn-add-not btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                    empresa.ID_OPINION = "<input type='button' class='btn-add-opi btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                } else if (empresa.NUMERO_ESCRITURA == null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "<input type='button' class='btn-add-not btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir datos SAT'>";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-view-opi btn btn-sm btn-success' value='ver datos de opinion' id='" + empresa.RFC + "'>";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION == null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-view-not btn btn-sm btn-success' value='ver datos SAT' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "<input type='button' class='btn-add-opi btn btn-sm btn-default' id='" + empresa.RFC + "' value='Añadir opinion sat'>";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-view-not btn btn-sm btn-success' value='ver datos SAT' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-view-opi btn btn-sm btn-success' value='ver datos de opinion' id='" + empresa.RFC + "'>";
                                }
                                $("#empresa-tbody").append("<tr id=tr-" + empresa.RFC + "><td>" + empresa.RFC + "</td><td>" + empresa.DENOMINACION + "</td><td>" + empresa.DOMICILIO + "</td><td>" + empresa.TELEFONO + "</td><td>" + empresa.GIRO + "</td><td><a href='http://" + empresa.SITIO_WEB + "'>" + empresa.SITIO_WEB + "</a></td><td>" + empresa.NIVEL + "</td><td id='td-num-esc'>" + empresa.NUMERO_ESCRITURA + "</td><td id='td-opi'>" + empresa.ID_OPINION + "</td><td><input type='button' class='btn-view-emp btn btn-sm btn-success' value='Ver datos' id='" + empresa.RFC + "'></td></tr>");
                                empresa = XHTMLHttpRequest[0].pop();
                            }
                        } else {
                            while (empresa) {
                                if (empresa.NUMERO_ESCRITURA === null && empresa.ID_OPINION === null) {
                                    empresa.NUMERO_ESCRITURA = "Sin datos";
                                    empresa.ID_OPINION = "Sin datos";
                                } else if (empresa.NUMERO_ESCRITURA == null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "Sin datos";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-view-opi btn btn-sm btn-success' value='ver datos de opinion' id='" + empresa.RFC + "'>";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION == null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-view-not btn btn-sm btn-success' value='ver datos SAT' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "Sin datos";
                                } else if (empresa.NUMERO_ESCRITURA != null && empresa.ID_OPINION != null) {
                                    empresa.NUMERO_ESCRITURA = "<br><input type='button' class='btn-view-not btn btn-sm btn-success' value='ver datos SAT' id='" + empresa.RFC + "'>";
                                    empresa.ID_OPINION = "<br><input type='button' class='btn-view-opi btn btn-sm btn-success' value='ver datos de opinion' id='" + empresa.RFC + "'>";
                                }
                                $("#empresa-tbody").append("<tr id=tr-" + empresa.RFC + "><td>" + empresa.RFC + "</td><td>" + empresa.DENOMINACION + "</td><td>" + empresa.DOMICILIO + "</td><td>" + empresa.TELEFONO + "</td><td>" + empresa.GIRO + "</td><td><a href='http://" + empresa.SITIO_WEB + "'>" + empresa.SITIO_WEB + "</a></td><td>" + empresa.NIVEL + "</td><td id='td-num-esc'>" + empresa.NUMERO_ESCRITURA + "</td><td id='td-opi'>" + empresa.ID_OPINION + "</td><td><input type='button' class='btn-view-emp btn btn-sm btn-success' value='Ver datos' id='" + empresa.RFC + "'></td></tr>");
                                empresa = XHTMLHttpRequest[0].pop();
                            }
                        }


                    }
                }
            });
        });
    }

    $(".container").on("click", ".btn-view-emp", function () {
        $.ajax({
            type: "GET",
            url: "controlador/empresa/get_datos_mod_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    var empresa = XHTMLHttpRequest;
                    $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Ver datos de empresa</li>");
                    $(".page-header").html("Ver datos de empresa");
                    $(".active").removeClass("active");
                    $("#li-empresa").last().addClass("active");
                    $(".container").load("vista/empresa/mod_empresa_vista.html", empresa, function () {
                        $("#rfc_empresa").attr("value", empresa.RFC);
                        $("#rfc_empresa").prop('disabled', true);
                        $("#rfc_empresa_old").attr("value", empresa.RFC);
                        $("#denominacion").attr("value", empresa.DENOMINACION);
                        $("#denominacion").prop('disabled', true);
                        $("#domicilio").attr("value", empresa.DOMICILIO);
                        $("#domicilio").prop('disabled', true);
                        $("#telefono").attr("value", empresa.TELEFONO);
                        $("#telefono").prop('disabled', true);
                        $("#giro").attr("value", empresa.GIRO);
                        $("#giro").prop('disabled', true);
                        $("#nivel").attr("value", empresa.NIVEL);
                        $("#nivel").prop('disabled', true);
                        $("#sitio_web").attr("value", empresa.SITIO_WEB);
                        $("#sitio_web").prop('disabled', true);
                        $(".btn-mod-emp").hide();
                    });
                }
            }
        });
    });

    $(".container").on("click", ".btn-mod-emp", function () {
        $.ajax({
            type: "GET",
            url: "controlador/empresa/get_datos_mod_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json"
        }).done(function (XHTMLHttpRequest) {
            if (XHTMLHttpRequest == "expired") {
                alert("sesion expirada");
                location.href = "index.php";
                return;
            }
            var empresa = XHTMLHttpRequest;
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Modificar empresa</li>");
            $(".page-header").html("Modificar empresa");
            $(".active").removeClass("active");
            $("#li-empresa").last().addClass("active");
            $(".container").load("vista/empresa/mod_empresa_vista.html", empresa, function () {
                $("#rfc_empresa").attr("value", empresa.RFC);
                $("#rfc_empresa_old").attr("value", empresa.RFC);
                $("#denominacion").attr("value", empresa.DENOMINACION);
                $("#domicilio").attr("value", empresa.DOMICILIO);
                $("#telefono").attr("value", empresa.TELEFONO);
                $("#giro").attr("value", empresa.GIRO);
                $("#nivel").attr("value", empresa.NIVEL);
                $("#sitio_web").attr("value", empresa.SITIO_WEB);
            });

        });
    });


    $(".container").on("click", ".btn-del-emp", function () {
        var trrfcemp = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: "controlador/empresa/eliminar_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    var respuesta = XHTMLHttpRequest;
                    if (respuesta.status == 1) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                        ver_empresa();
                    } else if (respuesta.status == 0) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                    } else if (respuesta.status == -1) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                    }
                }
            }
        });
    });

    $(".container").on("click", "#btn-mod-emp", function () {
        $.ajax({
            type: "POST",
            url: "controlador/empresa/modificar_empresa_controlador.php",
            data: {
                rfc: $("#rfc_empresa").val(),
                rfc_old: $("#rfc_empresa_old").val(),
                denominacion: $("#denominacion").val(),
                domicilio: $("#domicilio").val(),
                telefono: $("#telefono").val(),
                giro: $("#giro").val(),
                nivel: $("#nivel").val(),
                sitio_web: $("#sitio_web").val()
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    var respuesta = XHTMLHttpRequest;
                    if (respuesta.status == 1) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                        ver_empresa();
                    } else if (respuesta.status == 0) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                    } else if (respuesta.status == -1) {
                        alert(respuesta.mensaje + " " + respuesta.info);
                    }
                }
            }
        });
    });


    //CODIGO NOTARIA
    $(".container").on("click", ".btn-add-not", function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Añadir Datos Notariales</li>");
        $(".page-header").html("Añadir Datos Notariales");
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/notaria/alta_notaria_vista.html", function () {
            $("#rfc_empresa").val(rfc);
            $("#rfc").val(rfc);
            $("#btn-alta-not").click(function () {
                $.ajax({
                    type: "POST",
                    url: "controlador/empresa/notaria/registrar_notaria_controlador.php",
                    data: new FormData(document.getElementById('notaria-form')),
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    statusCode: {
                        200: function (XHTMLHttpRequest) {
                            if (XHTMLHttpRequest == "expired") {
                                alert("sesion expirada");
                                location.href = "index.php";
                                return;
                            }
                            if (XHTMLHttpRequest == 1) {
                                alert("Datos notariales agregados con exito");
                                ver_empresa();
                            } else {
                                alert("Error en los datos");
                            }
                        }
                    }
                });
            });
        });
    });

    $(".container").on("click", ".btn-mod-not", function () {
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/notaria/mod_notaria_vista.html", function () {
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Modificar Notaria</li>");
            $(".page-header").html("Modificar Datos Notariales");
            $.ajax({
                type: "GET",
                url: "controlador/empresa/notaria/get_datos_mod_notaria_controlador.php",
                data: {
                    rfc: rfc
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        notaria = XHTMLHttpRequest;
                        $("#rfc_not").val(notaria.RFC);
                        $("#numero_escritura").val(notaria.NUMERO_ESCRITURA);
                        $("#numero_escritura_old").val(notaria.NUMERO_ESCRITURA);
                        $("#estado").val(notaria.ESTADO);
                        $("#ciudad").val(notaria.CIUDAD);
                        $("#notario").val(notaria.NOTARIO);
                        $("#fecha").val(notaria.FECHA);
                        $("#objeto").val(notaria.OBJETO);
                        if (notaria.ACTA_NOTARIAL == 1)
                            $("#acta-notarial-div").append("<br><input type='button' id=" + notaria.RFC + " class='btn-bajar-acta-notarial btn btn-md btn-success col-md-6' value='ver documento'>");
                        if (notaria.PODER_NOTARIAL == 1)
                            $("#poder-notarial-div").append("<br><input type='button' id=" + notaria.RFC + " class='btn-bajar-poder-notarial btn btn-md btn-success col-md-6' value='ver documento'>");
                        if (notaria.CAMBIO_SOCIO == 1)
                            $("#cambio-socio-div").append("<br><input type='button' id=" + notaria.RFC + " class='btn-bajar-cambio-socio btn btn-md btn-success col-md-6' value='ver documento'>");
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-bajar-acta-notarial", function () {
        console.log("bajar");
        $.ajax({
            type: "GET",
            url: "controlador/empresa/notaria/get_documento_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id'),
                doc: 1
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    doc = XHTMLHttpRequest;
                    downloadPDF(doc,XHTMLHttpRequest.RFC + "_acta.pdf");
                }
            }
        });
    });

    $(".container").on("click", ".btn-bajar-poder-notarial", function () {
        $.ajax({
            type: "GET",
            url: "controlador/empresa/notaria/get_documento_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id'),
                doc: 2
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    doc = XHTMLHttpRequest;
                    downloadPDF(doc,XHTMLHttpRequest.RFC + "_poder.pdf");
                }
            }
        });
    });

    $(".container").on("click", ".btn-bajar-cambio-socio", function () {
        $.ajax({
            type: "GET",
            url: "controlador/empresa/notaria/get_documento_empresa_controlador.php",
            data: {
                rfc: $(this).attr('id'),
                doc: 3
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    doc = XHTMLHttpRequest;
                    downloadPDF(doc,XHTMLHttpRequest.RFC + "_cambio_socio.pdf");
                }
            }
        });
    });



    $(".container").on("click", "#modificar-notaria", function () {
        $.ajax({
            type: "POST",
            url: "controlador/empresa/notaria/modificar_notaria_controlador.php",
            data: new FormData(document.getElementById('notaria-form')),
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Datos notariales modificados con exito");
                        ver_empresa();
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-del-not", function () {
        $.ajax({
            type: "POST",
            url: "controlador/empresa/notaria/eliminar_notaria_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Datos notariales eliminadados con exito");
                        ver_empresa();
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-view-not", function () {
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/notaria/mod_notaria_vista.html", function () {
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Ver datos SAT</li>");
            $(".page-header").html("Ver Datos SAT");
            $.ajax({
                type: "GET",
                async: false,
                url: "controlador/empresa/notaria/get_datos_mod_notaria_controlador.php",
                data: {
                    rfc: rfc
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        notaria = XHTMLHttpRequest;
                        $("#rfc_not").val(notaria.RFC);
                        $("#rfc_not").prop('disabled', true);
                        $("#numero_escritura").val(notaria.NUMERO_ESCRITURA);
                        $("#numero_escritura").prop('disabled', true);
                        $("#numero_escritura_old").val(notaria.NUMERO_ESCRITURA);
                        $("#estado").val(notaria.ESTADO);
                        $("#estado").prop('disabled', true);
                        $("#ciudad").val(notaria.CIUDAD);
                        $("#ciudad").prop('disabled', true);
                        $("#notario").val(notaria.NOTARIO);
                        $("#notario").prop('disabled', true);
                        $("#fecha").val(notaria.FECHA);
                        $("#fecha").prop('disabled', true);
                        $("#objeto").val(notaria.OBJETO);
                        $("#objeto").prop('disabled', true);
                        $(".input-file").hide();
                        $(".modificar-notaria").hide();
                        if (notaria.ACTA_NOTARIAL == 1)
                            $("#acta-notarial-div").append("<input type='button' id=" + notaria.RFC + " class='btn-bajar-acta-notarial btn btn-md btn-success col-md-6' value='ver documento'>");
                        if (notaria.PODER_NOTARIAL == 1)
                            $("#poder-notarial-div").append("<input type='button' id=" + notaria.RFC + " class='btn-bajar-poder-notarial btn btn-md btn-success col-md-6' value='ver documento'>");
                        if (notaria.CAMBIO_SOCIO == 1)
                            $("#cambio-socio-div").append("<input type='button' id=" + notaria.RFC + " class='btn-bajar-cambio-socio btn btn-md btn-success col-md-6' value='ver documento'>");
                    }
                }
            });
        });
    });


    //CODIGO OPINION
    $(".container").on("click", ".btn-add-opi", function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Añadir Opinion SAT</li>");
        $(".page-header").html("Añadir Opinion SAT");
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/opinion/alta_opinion_vista.html", function () {
            $("#rfc_empresa").val(rfc);
            $("#btn-alta-opi").click(function () {
                $.ajax({
                    type: "POST",
                    url: "controlador/empresa/opinion/registrar_opinion_controlador.php",
                    data: new FormData(document.getElementById("opinion-form")),
                    cache: false,
                    contentType: false,
                    processData: false,
                    dataType: "json",
                    statusCode: {
                        200: function (XHTMLHttpRequest) {
                            if (XHTMLHttpRequest == "expired") {
                                alert("sesion expirada");
                                location.href = "index.php";
                                return;
                            }
                            if (XHTMLHttpRequest == 1) {
                                alert("Opinion agregada con exito");
                                ver_empresa();
                            } else {
                                alert("Error en los datos");
                            }
                        }
                    }
                });

            });
        });
    });

    $(".container").on("click", ".btn-mod-opi", function () {
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/opinion/mod_opinion_vista.html", function () {
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Modificar Opinion SAT</li>");
            $(".page-header").html("Actualizar Opinion SAT");
            $("#rfc_empresa").val(rfc);
            $.ajax({
                type: "GET",
                url: "controlador/empresa/opinion/get_datos_mod_opinion_controlador.php",
                data: {
                    rfc: rfc
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        opinion = XHTMLHttpRequest;
                        if (opinion.DOCUMENTO_OPINION == 1) {
                            $(".opinion_documento").append("<br><input name='doc_exists' type='button' id='" + rfc + "' class='btn-bajar-documento btn btn-md btn-success col-md-6' value='ver documento'>");
                        }
                        $("#" + opinion.OPINION).attr("selected", "selected");
                        $(".container").on("click", "#modificar-opinion", function () {
                            $.ajax({
                                type: "POST",
                                url: "controlador/empresa/opinion/modificar_opinion_controlador.php",
                                data: new FormData(document.getElementById("opinion-form")),
                                cache: false,
                                contentType: false,
                                processData: false,
                                dataType: "json",
                                statusCode: {
                                    200: function (XHTMLHttpRequest) {
                                        if (XHTMLHttpRequest == 1) {
                                            alert("modificado con exito");
                                            ver_empresa();
                                        } else {
                                            alert("error en las modificaciones");
                                        }
                                    }
                                }
                            });
                        });
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-bajar-documento", function () {
        $.ajax({
            type: "GET",
            url: "controlador/empresa/opinion/get_documento_opinion_opinion_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    opinion = XHTMLHttpRequest;
                    doc = opinion.DOCUMENTO_OPINION;
                    downloadPDF(doc,opinion.RFC + "_opinion.pdf");
                }
            }
        });
    });

    $(".container").on("click", ".btn-del-opi", function () {
        $.ajax({
            type: "POST",
            url: "controlador/empresa/opinion/eliminar_opinion_controlador.php",
            data: {
                rfc: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Opinion eliminada con exito");
                        ver_empresa();
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-view-opi", function () {
        var rfc = $(this).attr('id');
        $(".container").load("vista/empresa/opinion/mod_opinion_vista.html", function () {
            $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Empresa</li><li>Ver</li><li class='active'>Ver Opinion SAT</li>");
            $(".page-header").html("Ver Datos de Opinion SAT");
            $("#rfc_empresa").val(rfc);
            $("#rfc_empresa").prop('disabled', true);
            $.ajax({
                type: "GET",
                url: "controlador/empresa/opinion/get_datos_mod_opinion_controlador.php",
                data: {
                    rfc: rfc
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        opinion = XHTMLHttpRequest;
                        $(".modificar-opinion").hide();
                        $("#opinion_documento").hide();
                        if (opinion.DOCUMENTO_OPINION == 1) {
                            $(".opinion_documento").append("<br><input name='doc_exists' type='button' id='" + rfc + "' class='btn-bajar-documento btn btn-md btn-success col-md-6' value='ver documento'>");
                        }
                        $("#" + opinion.OPINION).attr("selected", "selected");
                        $("#opinion").prop('disabled', true);
                    }
                }
            });
        });
    });

    $("#ver-emp").click(ver_empresa);

    //CODIGO BANCO

    ver_bancos = function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Bancos</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver cuentas de bancos");
        $(".active").removeClass("active");
        $("#li-banco").last().addClass("active");
        $(".container").load("vista/banco/ver_bancos_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/banco/ver_banco_controlador.php",
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        bancos = XHTMLHttpRequest[0];
                        $("#banco-tbody").html("");
                        let tipo = sessionStorage.getItem("tipo");
                        banco = bancos.pop();
                        if (tipo == 1) {
                            while (banco) {
                                if (banco.CONTRATO == 1)
                                    banco.CONTRATO = "<input type='button' class='btn-ver-contrato btn btn-sm btn-primary' value='ver contrato' id='" + banco.CUENTA + "'>";
                                else
                                    banco.CONTRATO = "Sin contrato";
                                $("#banco-tbody").append("<tr><td>" + banco.CUENTA + "</td><td>" + banco.RFC + "</td><td>" + banco.BANCO + "</td><td>" + banco.SUCURSAL + "</td><td>" + banco.CLABE + "</td><td>" + banco.EMAIL + "</td><td>" + banco.TELEFONO + "</td><td>" + banco.CONTRATO + "</td><td><input type='button' class='btn-mod-banc btn btn-sm btn-warning' value='Modificar' id='" + banco.CUENTA + "'><br><br><input type='button' class='btn-del-banc btn btn-sm btn-danger' value='Eliminar' id='" + banco.CUENTA + "'></td></tr>");
                                banco = bancos.pop();
                            }
                        } else if (tipo == 2) {
                            while (banco) {
                                if (banco.CONTRATO == 1)
                                    banco.CONTRATO = "<input type='button' class='btn-ver-contrato btn btn-sm btn-primary' value='ver contrato' id='" + banco.CUENTA + "'>";
                                else
                                    banco.CONTRATO = "Sin contrato";
                                $("#banco-tbody").append("<tr><td>" + banco.CUENTA + "</td><td>" + banco.RFC + "</td><td>" + banco.BANCO + "</td><td>" + banco.SUCURSAL + "</td><td>" + banco.CLABE + "</td><td>" + banco.EMAIL + "</td><td>" + banco.TELEFONO + "</td><td>" + banco.CONTRATO + "</td><td><input type='button' class='btn-view-banc btn btn-sm btn-success' value='Ver datos' id='" + banco.CUENTA + "'></td></tr>");
                                banco = bancos.pop();
                            }
                        } else {
                            while (banco) {
                                if (banco.CONTRATO == 1)
                                    banco.CONTRATO = "<input type='button' class='btn-ver-contrato btn btn-sm btn-primary' value='ver contrato' id='" + banco.CUENTA + "'>";
                                else
                                    banco.CONTRATO = "Sin contrato";
                                $("#banco-tbody").append("<tr><td>" + banco.CUENTA + "</td><td>" + banco.RFC + "</td><td>" + banco.BANCO + "</td><td>" + banco.SUCURSAL + "</td><td>" + banco.CLABE + "</td><td>" + banco.EMAIL + "</td><td>" + banco.TELEFONO + "</td><td>" + banco.CONTRATO + "</td><td><input type='button' class='btn-view-banc btn btn-sm btn-success' value='Ver datos' id='" + banco.CUENTA + "'></td></tr>");
                                banco = bancos.pop();
                            }
                        }
                    }
                }
            });
        });
    }

    $(".container").on("click", ".btn-ver-contrato", function () {
        $.ajax({
            type: "GET",
            url: "controlador/banco/get_contrato_banco_controlador.php",
            data: {
                cuenta: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    banco = XHTMLHttpRequest;
                    doc = banco.CONTRATO;
                    downloadPDF(doc,banco.CUENTA + "_contrato.pdf");
                }
            }
        });
    });

    $(".container").on("click", ".btn-mod-banc", function () {
        var cuenta_btn = $(this).attr('id');
        console.log(cuenta_btn);
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Bancos</li><li class='active'>Modificar</li>");
        $(".page-header").html("Modificar cuenta");
        $(".container").load("vista/banco/mod_banco_vista.html", function () {

            $.ajax({
                type: "GET",
                url: "controlador/banco/get_datos_mod_banco_controlador.php",
                data: {
                    cuenta: cuenta_btn
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        banco = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    $("#rfc").append("<option value=></option>");
                                    while (rfc_denominacion) {
                                        $("#rfc").append("<option id=rfc-" + rfc_denominacion.RFC + " value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                    $("#rfc").select2({
                                        tags: true
                                    });
                                }
                            }
                        });
                        $("#cuenta_new").val(banco.CUENTA),
                            $("#cuenta_old").val(banco.CUENTA),
                            $("#rfc-" + banco.RFC).attr("selected", "selected"),
                            $("#sucursal").val(banco.SUCURSAL),
                            $("#banco").val(banco.BANCO),
                            $("#clabe").val(banco.CLABE),
                            $("#email").val(banco.EMAIL),
                            $("#telefono").val(banco.TELEFONO),
                            $(".contrato-div").append("<br><input type='button' class='btn-ver-contrato btn btn-sm btn-primary' value='ver contrato' id='" + banco.CUENTA + "'>");
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-view-banc", function () {
        var cuenta_btn = $(this).attr('id');
        console.log(cuenta_btn);
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Bancos</li><li class='active'>Ver Datos</li>");
        $(".page-header").html("Ver datos de cuenta");
        $(".container").load("vista/banco/mod_banco_vista.html", function () {

            $.ajax({
                type: "GET",
                url: "controlador/banco/get_datos_mod_banco_controlador.php",
                data: {
                    cuenta: cuenta_btn
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        banco = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    $("#rfc").append("<option value=></option>");
                                    while (rfc_denominacion) {
                                        $("#rfc").append("<option id=rfc-" + rfc_denominacion.RFC + " value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                }
                            }
                        });
                        $(".input-contrato").hide();
                        $("#modificar-banco").hide();
                        $("#cuenta_new").val(banco.CUENTA);
                        $("#cuenta_new").prop('disabled', true);
                        $("#cuenta_old").val(banco.CUENTA);
                        $("#rfc-" + banco.RFC).attr("selected", "selected");
                        $("#rfc").prop('disabled', true);
                        $("#cuenta_new").prop('disabled', true);
                        $("#sucursal").val(banco.SUCURSAL);
                        $("#sucursal").prop('disabled', true);
                        $("#banco").val(banco.BANCO);
                        $("#banco").prop('disabled', true);
                        $("#clabe").val(banco.CLABE);
                        $("#clabe").prop('disabled', true);
                        $("#email").val(banco.EMAIL);
                        $("#email").prop('disabled', true);
                        $("#telefono").val(banco.TELEFONO);
                        $("#telefono").prop('disabled', true);
                        $(".contrato-div").append("<br><input type='button' class='btn-ver-contrato btn btn-sm btn-primary' value='ver contrato' id='" + banco.CUENTA + "'>");
                    }
                }
            });
        });
    });

    $(".container").on("click", "#modificar-banco", function () {
        $.ajax({
            type: "POST",
            url: "controlador/banco/modificar_banco_controlador.php",
            data: new FormData(document.getElementById("banco-form")),
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("cuenta actualizada con exito");
                        ver_bancos();
                    } else {
                        alert("error en la modificacion de la cuenta");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-del-banc", function () {
        var cuenta_btn = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: "controlador/banco/eliminar_banco_controlador.php",
            data: {
                cuenta: cuenta_btn
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Cuenta de banco eliminada con exito");
                        ver_bancos();
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $("#alta-banc").click(function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Bancos</li><li class='active'>Alta</li>");
        $(".page-header").html("Alta de cuenta");
        $(".container").load("vista/banco/alta_banco_vista.html");
        $(".active").removeClass("active");
        $("#li-banco").last().addClass("active");
        $.ajax({
            type: "GET",
            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    rfc_denominaciones = XHTMLHttpRequest;
                    rfc_denominacion = rfc_denominaciones.pop();
                    $("#rfc").append("<option value=></option>");
                    while (rfc_denominacion) {
                        $("#rfc").append("<option value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                        rfc_denominacion = rfc_denominaciones.pop();
                    }
                    $("#rfc").select2({
                        tags: true
                    });
                }
            }
        });
    });

    $(".container").on("click", "#btn-alta-banco", function () {
        $.ajax({
            type: "POST",
            url: "controlador/banco/registrar_banco_controlador.php",
            data: new FormData(document.getElementById("banco-form")),
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Datos bancarios agregados con exito");
                        ver_bancos();
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $("#ver-banc").click(ver_bancos);

    //CODIGO SOCIOS

    ver_socios = function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Socios</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver socios");
        $(".active").removeClass("active");
        $("#li-socio").last().addClass("active");
        $(".container").load("vista/socio/ver_socios_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/socio/ver_socio_controlador.php",
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        socios = XHTMLHttpRequest;
                        socio = socios.pop();
                        let tipo = sessionStorage.getItem("tipo");
                        if (tipo == 1) {
                            while (socio) {
                                $("#socio-tbody").append("<tr><td>" + socio.RFC_SOCIO + "</td><td>" + socio.RFC_EMPRESA + "</td><td>" + socio.NOMBRE + "</td><td>" + socio.FECHA_NACIMIENTO + "</td><td>" + socio.CURP + "</td><td>" + socio.EMAIL + "</td><td>" + socio.NOMBRE_TIPO + "</td><td><input type='button' class='btn-mod-soc btn btn-sm btn-warning' value='Modificar' id='" + socio.RFC_SOCIO + "'><br><br><input type='button' class='btn-del-soc btn btn-sm btn-danger' value='Eliminar' id='" + socio.RFC_SOCIO + "'></td></tr>");
                                socio = socios.pop();
                            }
                        } else if (tipo == 2 || tipo == 3) {
                            while (socio) {
                                $("#socio-tbody").append("<tr><td>" + socio.RFC_SOCIO + "</td><td>" + socio.RFC_EMPRESA + "</td><td>" + socio.NOMBRE + "</td><td>" + socio.FECHA_NACIMIENTO + "</td><td>" + socio.CURP + "</td><td>" + socio.EMAIL + "</td><td>" + socio.NOMBRE_TIPO + "</td><td><input type='button' class='btn-view-soc btn btn-sm btn-success' value='Ver datos' id='" + socio.RFC_SOCIO + "'></td></tr>");
                                socio = socios.pop();
                            }
                        }
                    }
                }
            });
        });
    }

    $(".container").on("click", ".btn-del-soc", function () {
        $.ajax({
            type: "POST",
            url: "controlador/socio/eliminar_socio_controlador.php",
            data: {
                rfc_socio: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Socio eliminado exitosamente!");
                        ver_socios();
                    } else {
                        alert("Error en la eliminacion");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-mod-soc", function () {
        var rfc_socio = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Socios</li><li class='active'>Modificar</li>");
        $(".page-header").html("Modificar socio");
        $(".container").load("vista/socio/mod_socio_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/socio/get_datos_mod_socio_controlador.php",
                data: {
                    rfc_socio: rfc_socio
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        socio = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    $("#rfc_empresa").append("<option value=></option>");
                                    while (rfc_denominacion) {
                                        $("#rfc_empresa").append("<option id=" + rfc_denominacion.RFC + " value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                    $("#rfc_empresa").select2({
                                        tags: true
                                    });
                                }
                            }
                        });

                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/socio/get_tipo_socio_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    tipos = XHTMLHttpRequest;
                                    tipo = tipos.pop();
                                    $("#tipo_socio").append("<option value=></option>");
                                    while (tipo) {
                                        $("#tipo_socio").append("<option id=" + tipo.TIPO + " value=" + tipo.TIPO + ">" + tipo.NOMBRE_TIPO + "</option>");
                                        tipo = tipos.pop();
                                    }
                                }
                            }
                        });
                        $("#rfc_socio").val(socio.RFC_SOCIO);
                        $("#" + socio.RFC_EMPRESA).attr('selected', 'selected');
                        $("#nombre").val(socio.NOMBRE);
                        $("#fecha_nacimiento").val(socio.FECHA_NACIMIENTO);
                        $("#curp").val(socio.CURP);
                        $("#email").val(socio.EMAIL);
                        $("#" + socio.TIPO).attr('selected', 'selected');
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-view-soc", function () {
        var rfc_socio = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Socios</li><li class='active'>Ver Datos</li>");
        $(".page-header").html("Ver Datos de Socio");
        $(".container").load("vista/socio/mod_socio_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/socio/get_datos_mod_socio_controlador.php",
                data: {
                    rfc_socio: rfc_socio
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        socio = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    $("#rfc_empresa").append("<option value=></option>");
                                    while (rfc_denominacion) {
                                        $("#rfc_empresa").append("<option id=" + rfc_denominacion.RFC + " value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                }
                            }
                        });

                        $.ajax({
                            type: "GET",
                            async: false,
                            url: "controlador/socio/get_tipo_socio_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    tipos = XHTMLHttpRequest;
                                    tipo = tipos.pop();
                                    $("#tipo_socio").append("<option value=></option>");
                                    while (tipo) {
                                        $("#tipo_socio").append("<option id=" + tipo.TIPO + " value=" + tipo.TIPO + ">" + tipo.NOMBRE_TIPO + "</option>");
                                        tipo = tipos.pop();
                                    }
                                }
                            }
                        });
                        $("#rfc_socio").val(socio.RFC_SOCIO);
                        $("#rfc_socio").prop('disabled', true);
                        $("#" + socio.RFC_EMPRESA).attr('selected', 'selected');
                        $("#rfc_empresa").prop('disabled', true);
                        $("#nombre").val(socio.NOMBRE);
                        $("#nombre").prop('disabled', true);
                        $("#fecha_nacimiento").val(socio.FECHA_NACIMIENTO);
                        $("#fecha_nacimiento").prop('disabled', true);
                        $("#curp").val(socio.CURP);
                        $("#curp").prop('disabled', true);
                        $("#email").val(socio.EMAIL);
                        $("#email").prop('disabled', true);
                        $("#" + socio.TIPO).attr('selected', 'selected');
                        $("#tipo_socio").prop('disabled', true);
                        $("#btn-mod-socio").hide();
                    }
                }
            });
        });
    });


    $(".container").on("click", "#btn-mod-socio", function () {
        $.ajax({
            type: "POST",
            url: "controlador/socio/modificar_socio_controlador.php",
            data: {
                rfc_socio_old: socio.RFC_SOCIO,
                rfc_socio_new: $("#rfc_socio").val(),
                rfc_empresa: $("#rfc_empresa option:selected").val(),
                nombre: $("#nombre").val(),
                fecha_nacimiento: $("#fecha_nacimiento").val(),
                curp: $("#curp").val(),
                email: $("#email").val(),
                tipo: $("#tipo_socio option:selected").val()

            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Actualizacion de datos de socio Exitosa!");
                        ver_socios();
                    } else {
                        alert("Error en la actualizacion de datos");
                    }
                }
            }
        });
    });

    $("#alta-soc").click(function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Socios</li><li class='active'>Alta</li>");
        $(".page-header").html("Alta de socio");
        $(".container").load("vista/socio/alta_socio_vista.html");
        $(".active").removeClass("active");
        $("#li-socio").last().addClass("active");
        $.ajax({
            type: "GET",
            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    rfc_denominaciones = XHTMLHttpRequest;
                    rfc_denominacion = rfc_denominaciones.pop();
                    $("#rfc_empresa").append("<option value=></option>");
                    while (rfc_denominacion) {
                        $("#rfc_empresa").append("<option value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                        rfc_denominacion = rfc_denominaciones.pop();
                    }
                    $("#rfc_empresa").select2({
                        tags: true
                      });
                }
            }
        });


        $.ajax({
            type: "GET",
            url: "controlador/socio/get_tipo_socio_controlador.php",
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    tipos = XHTMLHttpRequest;
                    tipo = tipos.pop();
                    $("#tipo_socio").append("<option value=></option>");
                    while (tipo) {
                        $("#tipo_socio").append("<option value=" + tipo.TIPO + ">" + tipo.NOMBRE_TIPO + "</option>");
                        tipo = tipos.pop();
                    }
                }
            }
        });
    });

    $(".container").on("click", "#btn-alta-socio", function () {
        $.ajax({
            type: "POST",
            url: "controlador/socio/registrar_socio_controlador.php",
            data: {
                rfc_socio: $("#rfc_socio").val(),
                rfc_empresa: $("#rfc_empresa option:selected").val(),
                nombre: $("#nombre").val(),
                fecha_nacimiento: $("#fecha_nacimiento").val(),
                curp: $("#curp").val(),
                email: $("#email").val(),
                tipo: $("#tipo_socio option:selected").val()
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("socio registrado con exito");
                        ver_socios();
                    } else if (XHTMLHttpRequest == -1) {
                        alert("RFC de socio ya existente, revise sus datos");
                    } else {
                        alert("Error en el registro");
                    }
                }
            }
        });

    });



    $("#ver-soc").click(ver_socios);

    //CODIGO TELEFONO

    ver_telefonos = function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver telefonos");
        $(".active").removeClass("active");
        $("#li-telefono").last().addClass("active");
        $(".container").load("vista/telefono/ver_telefono_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/telefono/ver_telefono_controlador.php",
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        telefonos = XHTMLHttpRequest;
                        telefono = telefonos.pop();
                        let tipo = sessionStorage.getItem("tipo");
                        if (tipo == 1) {
                            while (telefono) {
                                let telefonoNumero = telefono.TELEFONO;
                                $("#telefono-tbody").append("<tr><td>" + telefono.TELEFONO + "</td><td>" + telefono.COMPAÑIA + "</td><td id=rfc-" + telefonoNumero + "></td><td id=" + telefono.TELEFONO + "><input type='button' class='btn-ver-pago btn btn-sm btn-success' value='ver pagos' id='" + telefono.TELEFONO + "'></td><td><input type='button' class='btn-mod-tel btn btn-sm btn-warning' value='Modificar' id='" + telefono.TELEFONO + "'><br><br><input type='button' class='btn-del-tel btn btn-sm btn-danger' value='Eliminar' id='" + telefono.TELEFONO + "'></td></tr>");
                                $.ajax({
                                    type: "GET",
                                    async: true,
                                    url: "controlador/telefono/get_datos_telefono_empresa_controlador.php",
                                    data: {
                                        telefono: telefonoNumero
                                    },
                                    dataType: "json",
                                    statusCode: {
                                        200: function (XHTMLHttpRequest) {
                                            if (XHTMLHttpRequest == "expired") {
                                                alert("sesion expirada");
                                                location.href = "index.php";
                                                return;
                                            }
                                            rfcs = XHTMLHttpRequest;
                                            rfc = rfcs.pop();
                                            while (rfc) {
                                                $("#rfc-" + telefonoNumero).append(rfc.RFC + " - " + rfc.DENOMINACION + "<br>");
                                                rfc = rfcs.pop();
                                            }
                                        }
                                    }
                                });
                                telefono = telefonos.pop();
                            }
                        } else if (tipo == 2 || tipo == 3) {
                            while (telefono) {
                                let telefonoNumero = telefono.TELEFONO;
                                $("#telefono-tbody").append("<tr><td>" + telefono.TELEFONO + "</td><td>" + telefono.COMPAÑIA + "</td><td id=rfc-" + telefonoNumero + "></td><td id=" + telefono.TELEFONO + "><input type='button' class='btn-ver-pago btn btn-sm btn-success' value='ver pagos' id='" + telefono.TELEFONO + "'></td><td><input type='button' class='btn-view-tel btn btn-sm btn-success' value='Ver Datos' id='" + telefono.TELEFONO + "'></td></tr>");
                                $.ajax({
                                    type: "GET",
                                    url: "controlador/telefono/get_datos_telefono_empresa_controlador.php",
                                    data: {
                                        telefono: telefonoNumero
                                    },
                                    dataType: "json",
                                    statusCode: {
                                        200: function (XHTMLHttpRequest) {
                                            if (XHTMLHttpRequest == "expired") {
                                                alert("sesion expirada");
                                                location.href = "index.php";
                                                return;
                                            }
                                            rfcs = XHTMLHttpRequest;
                                            rfc = rfcs.pop();
                                            while (rfc) {
                                                $("#rfc-" + telefonoNumero).append(rfc.RFC + " - " + rfc.DENOMINACION + "<br>");
                                                rfc = rfcs.pop();
                                            }
                                        }
                                    }
                                });
                                telefono = telefonos.pop();
                            }
                        }
                    }
                }
            });
        });
    }

    $(".container").on("click", ".btn-ver-pago", function () {
        var telefono = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li>Pagos</li><li class='active'>Ver</li>");
        $(".page-header").html("Ver Pagos de " + telefono);
        $(".container").load("vista/telefono/pago/ver_pago_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/telefono/pago/ver_pago_controlador.php",
                data: {
                    telefono: telefono
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        pagos = XHTMLHttpRequest;
                        pago = pagos.pop();
                        let tipo = sessionStorage.getItem("tipo");
                        if (tipo == 1) {
                            $("#pago-tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td><input type='button' class='btn-add-pago btn btn-sm btn-success' value='Añadir pago' id='" + telefono + "'></td></tr>");
                            while (pago) {
                                if (pago.RECIBO == 1)
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td><input type='button' class='btn-ver-recibo btn btn-sm btn-primary' value='ver recibo' id='" + pago.ID_TELEFONO_PAGO + "'></td><td><input type='button' class='btn-mod-pago btn btn-sm btn-warning' value='Modificar' id='" + pago.ID_TELEFONO_PAGO + "'><br><br><input type='button' class='btn-del-pago btn btn-sm btn-danger' value='Eliminar' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                else
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td>Sin recibo</td><td><input type='button' class='btn-mod-pago btn btn-sm btn-warning' value='Modificar' id='" + pago.ID_TELEFONO_PAGO + "'><br><br><input type='button' class='btn-del-pago btn btn-sm btn-danger' value='Eliminar' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                pago = pagos.pop();
                            }
                        } else if (tipo == 2) {
                            $("#pago-tbody").append("<tr><td></td><td></td><td></td><td></td><td></td><td><input type='button' class='btn-add-pago btn btn-sm btn-success' value='Añadir pago' id='" + telefono + "'></td></tr>");
                            while (pago) {
                                if (pago.RECIBO == 1)
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td><input type='button' class='btn-ver-recibo btn btn-sm btn-primary' value='ver recibo' id='" + pago.ID_TELEFONO_PAGO + "'></td><td><input type='button' class='btn-view-pago btn btn-sm btn-success' value='Ver datos' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                else
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td>Sin recibo</td><td><input type='button' class='btn-mod-pago btn btn-sm btn-success' value='Ver datos' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                pago = pagos.pop();
                            }
                        } else if (tipo == 3) {
                            while (pago) {
                                if (pago.RECIBO == 1)
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td><input type='button' class='btn-ver-recibo btn btn-sm btn-primary' value='ver recibo' id='" + pago.ID_TELEFONO_PAGO + "'></td><td><input type='button' class='btn-view-pago btn btn-sm btn-success' value='Ver datos' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                else
                                    $("#pago-tbody").append("<tr><td></td><td>" + pago.FECHA_PRONTOPAGO + "</td><td>" + pago.FECHA_LIMITE + "</td><td>$" + pago.MONTO + "</td><td>Sin recibo</td><td><input type='button' class='btn-mod-pago btn btn-sm btn-success' value='Ver datos' id='" + pago.ID_TELEFONO_PAGO + "'></td></tr>");
                                pago = pagos.pop();
                            }
                        }

                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-mod-pago", function () {
        var id_telefono_pago = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li>Pagos</li><li class='active'>Modificar</li>");
        $(".container").load("vista/telefono/pago/mod_pago_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/telefono/pago/get_datos_mod_pago_telefono_controlador.php",
                data: {
                    id: id_telefono_pago
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        pagoMod = XHTMLHttpRequest;
                        $(".page-header").html("Modificar pago de " + pagoMod.TELEFONO);
                        $("#id_telefono_pago").val(id_telefono_pago);
                        $("#telefono").val(pagoMod.TELEFONO);
                        $("#fecha_prontopago").val(pagoMod.FECHA_PRONTOPAGO);
                        $("#fecha_limite").val(pagoMod.FECHA_LIMITE);
                        $("#monto").val(pagoMod.MONTO);
                        if (pagoMod.RECIBO == 1)
                            $(".div-recibo").append("<input type='button' class='btn-ver-recibo btn btn-sm btn-primary' value='ver recibo' id='" + pagoMod.ID_TELEFONO_PAGO + "'>");
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-view-pago", function () {
        let id_telefono_pago = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li>Pagos</li><li class='active'>ver Datos</li>");
        $(".container").load("vista/telefono/pago/mod_pago_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/telefono/pago/get_datos_mod_pago_telefono_controlador.php",
                data: {
                    id: id_telefono_pago
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        pagoMod = XHTMLHttpRequest;
                        $(".page-header").html("Ver datos de pago " + pagoMod.TELEFONO);
                        $("#id_telefono_pago").val(id_telefono_pago);
                        $("#telefono").val(pagoMod.TELEFONO);
                        $("#fecha_prontopago").val(pagoMod.FECHA_PRONTOPAGO);
                        $("#fecha_prontopago").prop('disabled', true);
                        $("#fecha_limite").val(pagoMod.FECHA_LIMITE);
                        $("#fecha_limite").prop('disabled', true);
                        $("#monto").val(pagoMod.MONTO);
                        $("#monto").prop('disabled', true);
                        $(".input-recibo").hide();
                        $("#btn-mod-pag").hide();
                        if (pagoMod.RECIBO == 1)
                            $(".div-recibo").append("<input type='button' class='btn-ver-recibo btn btn-sm btn-primary' value='ver recibo' id='" + pagoMod.ID_TELEFONO_PAGO + "'>");
                    }
                }
            });
        });
    });

    $(".container").on("click", "#btn-mod-pag", function () {
        $.ajax({
            type: "POST",
            url: "controlador/telefono/pago/modificar_pago_controlador.php",
            data: new FormData(document.getElementById("pago-form")),
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Pago modificado correctamente");
                        ver_telefonos();
                    } else {
                        alert("Error en la modifcacion del pago");
                    }
                }
            }
        });
    });



    $(".container").on("click", ".btn-del-pago", function () {
        $.ajax({
            type: "POST",
            url: "controlador/telefono/pago/eliminar_pago_controlador.php",
            data: {
                id: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Pago eliminado correctamente");
                        ver_telefonos();
                    } else {
                        alert("Error en la eliminacion de pago");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-del-tel", function () {
        var telefono = $(this).attr('id');
        $.ajax({
            type: "POST",
            url: "controlador/telefono/eliminar_telefono_controlador.php",
            data: {
                telefono: telefono
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("exito en la eliminacion del telefono");
                        ver_telefonos();
                    } else {
                        alert("Error en la eliminacion del registro");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-mod-tel", function () {
        var telefono = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li class='active'>Modificar</li>");
        $(".page-header").html("Modificar datos de telefono");
        $(".container").load("vista/telefono/mod_telefono_vista.html", function () {
            
            $.ajax({
                type: "GET",
                url: "controlador/telefono/get_datos_mod_telefono_controlador.php",
                data: {
                    telefono: telefono
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        telefonoMod = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    while (rfc_denominacion) {
                                        $("#rfc_add").append("<option id='" + rfc_denominacion.RFC + "' class='rfc_empresa' value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        $("#" + rfc_denominacion.RFC).prop('selected', true);
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                    //$("#rfc_add").multiSelect();
                                    //$("#rfc_add").multiSelect('deselect_all');
                                    $("#rfc_add").select2({
                                        tags: true
                                    });
                                    $.ajax({
                                        type: "GET",
                                        async: false,
                                        url: "controlador/telefono/get_datos_telefono_empresa_controlador.php",
                                        data: {
                                            telefono: telefonoMod.TELEFONO
                                        },
                                        dataType: "json",
                                        statusCode: {
                                            200: function (XHTMLHttpRequest) {
                                                if (XHTMLHttpRequest == "expired") {
                                                    alert("sesion expirada");
                                                    location.href = "index.php";
                                                    return;
                                                }
                                                rfc_denominaciones = XHTMLHttpRequest;
                                                rfc_denominacion = rfc_denominaciones.pop();
                                                $("#rfc_add").select2({
                                                    tags: true
                                                });
                                                rfcs = [];
                                                while (rfc_denominacion) {
                                                    rfcs.push(rfc_denominacion.RFC);
                                                    rfc_denominacion = rfc_denominaciones.pop();
                                                }
                                                $("#rfc_add").val(rfcs);
                                                $("#rfc_add").trigger('change');
                                                
                                            }
                                        }
                                    });
                                }
                            }
                        });
                        $("#telefonoOld").val(telefono);
                        $("#telefono").val(telefono);
                        $("#compañia").val(telefonoMod.COMPAÑIA);
                    }
                }
            });
        });
    });

    $(".container").on("click", ".btn-view-tel", function () {
        var telefono = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li class='active'>Modificar</li>");
        $(".page-header").html("Modificar datos de telefono");
        $(".container").load("vista/telefono/mod_telefono_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/telefono/get_datos_mod_telefono_controlador.php",
                data: {
                    telefono: telefono
                },
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        telefonoMod = XHTMLHttpRequest;
                        $.ajax({
                            type: "GET",
                            url: "controlador/telefono/get_datos_telefono_empresa_controlador.php",
                            data: {
                                telefono: telefonoMod.TELEFONO
                            },
                            dataType: "json",
                            statusCode: {
                                200: function (XHTMLHttpRequest) {
                                    if (XHTMLHttpRequest == "expired") {
                                        alert("sesion expirada");
                                        location.href = "index.php";
                                        return;
                                    }
                                    rfc_denominaciones = XHTMLHttpRequest;
                                    rfc_denominacion = rfc_denominaciones.pop();
                                    while (rfc_denominacion) {
                                        $("#rfc_add").append("<option id='" + rfc_denominacion.RFC + "' class='rfc_empresa' value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                                        console.log(rfc_denominacion);
                                        rfc_denominacion = rfc_denominaciones.pop();
                                    }
                                }
                            }
                        });
                        $("#telefonoOld").val(telefono);
                        $("#telefonoOld").prop('disabled', true);
                        $("#telefono").val(telefono);
                        $("#telefono").prop('disabled', true);
                        $("#compañia").val(telefonoMod.COMPAÑIA);
                        $("#compañia").prop('disabled', true);
                        $("#rfc_add").prop('disabled', true);
                        $(".btn-mod-telefono").hide(); 
                    }
                }
            });
        });
    });

    $(".container").on("click", "#btn-mod-telefono", function () {
        $.ajax({
            type: "POST",
            url: "controlador/telefono/modificar_telefono_controlador.php",
            data: {
                telefonoOld: $("#telefonoOld").val(),
                telefonoNew: $("#telefono").val(),
                compañia: $("#compañia").val(),
                rfcs_add: $("#rfc_add").val(),
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("Exito en la modificacion de los datos");
                        ver_telefonos();
                    } else if (XHTMLHttpRequest == -1) {
                        alert("El telefono que deseas modificar ya existe en otro registro");
                    } else {
                        alert("Error en los datos");
                    }
                }
            }
        });
    });

    $("#alta-tel").on("click", function () {
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li class='active'>Alta</li>");
        $(".page-header").html("Alta de telefono");
        $(".active").removeClass("active");
        $("#li-telefono").last().addClass("active");
        $(".container").load("vista/telefono/alta_telefono_vista.html", function () {
            $.ajax({
                type: "GET",
                url: "controlador/empresa/get_rfc_denominacion_empresa_controlador.php",
                dataType: "json",
                statusCode: {
                    200: function (XHTMLHttpRequest) {
                        if (XHTMLHttpRequest == "expired") {
                            alert("sesion expirada");
                            location.href = "index.php";
                            return;
                        }
                        rfc_denominaciones = XHTMLHttpRequest;
                        rfc_denominacion = rfc_denominaciones.pop();
                        while (rfc_denominacion) {
                            $("#rfc_add").append("<option class='rfc_empresa' value=" + rfc_denominacion.RFC + ">" + rfc_denominacion.RFC + " - " + rfc_denominacion.DENOMINACION + "</option>");
                            rfc_denominacion = rfc_denominaciones.pop();
                        }
                        $("#rfc_add").select2({
                            tags: true
                        });
                        //$("#rfc_add").multiSelect();
                        //$("#rfc_add").multiSelect('deselect_all');
                    }
                }
            });
        });
    });

    $(".container").on("click", "#btn-alta-telefono", function () {
        $.ajax({
            type: "POST",
            url: "controlador/telefono/registrar_telefono_controlador.php",
            data: {
                telefono: $("#telefono").val(),
                compañia: $("#compañia").val(),
                rfcs: $("#rfc_add").val()
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    } if (XHTMLHttpRequest == 1) {
                        alert("Datos de telefono registrados exitosamente");
                        ver_telefonos();
                    } else {
                        alert("Error en el registro de datos");
                    }
                }
            }
        });
    });

    $(".container").on("click", ".btn-add-pago", function () {
        var telefono = $(this).attr('id');
        $(".breadcrumb").html("<li><a href='index.php'><em class='fa fa-home'></em></a></li><li>Inicio</li><li>Telefonos</li><li>Pagos</li><li class='active'>Alta</li>");
        $(".page-header").html("Añadir pagos a " + telefono);
        $(".container").load("vista/telefono/pago/alta_pago_vista.html", function () {
            $("#telefono").val(telefono);
        });
    });

    $(".container").on("click", "#btn-alta-pag", function () {

        $.ajax({
            type: "POST",
            url: "controlador/telefono/pago/registrar_pago_controlador.php",
            data: new FormData(document.getElementById("pago-form")),
            cache: false,
            contentType: false,
            processData: false,
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    if (XHTMLHttpRequest == 1) {
                        alert("datos agregados con exito");
                        ver_telefonos();
                    } else {
                        alert("Error en el registro de datos");
                    }
                }
            }
        });
    });

    function downloadPDF(pdf, name) {
        const linkSource = `data:application/pdf;base64,${pdf}`;
        const downloadLink = document.createElement("a");
        const fileName = name;
        var isFirefox = typeof InstallTrigger !== 'undefined';
        if(isFirefox){
            window.open("data:application/pdf;base64," + pdf);
        }else{
            downloadLink.href = linkSource;
            downloadLink.download = fileName;
            downloadLink.click();
        }
    }

    $(".container").on("click", ".btn-ver-recibo", function () {
        $.ajax({
            type: "GET",
            url: "controlador/telefono/pago/get_recibo_pago_controlador.php",
            data: {
                id_telefono_pago: $(this).attr('id')
            },
            dataType: "json",
            statusCode: {
                200: function (XHTMLHttpRequest) {
                    if (XHTMLHttpRequest == "expired") {
                        alert("sesion expirada");
                        location.href = "index.php";
                        return;
                    }
                    pago = XHTMLHttpRequest;
                    doc = pago.RECIBO;
                    downloadPDF(doc,pago.TELEFONO+pago.FECHA_LIMITE+".pdf");
                }
            }
        });
    });

    $("#ver-tel").click(ver_telefonos);
});
