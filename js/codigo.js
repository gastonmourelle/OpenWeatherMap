var climaGral;
var climaGral2;
var climaGralActual;
var climaGralActual2;
var contador = 0;

window.fn = {};

window.fn.open = function () {
    var menu = document.getElementById('menu');
    menu.open();
};

window.fn.load = function (page) {
    var content = document.getElementById('content');
    //document.getElementById('content').load("home.html");
    var menu = document.getElementById('menu');
    content.load(page)
            .then(menu.close.bind(menu));
};

var h = new Date().getHours();

if (h >= 7 && h <= 11) {
    $(".page__background").addClass("amanecer");
} else if (h >= 12 && h <= 16) {
    $(".page__background").addClass("dia");
} else if (h >= 17 && h <= 20) {
    $(".page__background").addClass("tardecita");
} else {
    $(".page__background").addClass("noche");
    $("#dResultados").css("background-color", "white");
}

document.addEventListener("init", inicializarPagina);

function inicializarPagina(evt) {
    var destino = evt.target.id;
    $(".barra").hide();
    switch (destino) {
        case "busqueda":
            var c1 = $("#txtCiudad").val();
            var c2 = $("#txtCiudad2").val();
            if (c1 && c2 === "") {
                $("#mostrarError").text("Por favor, introduzca dos ciudades.");
            } else {
                $("#btnBuscar").click(buscarClima);
            }
            break;
        case "resultados":
            $("#btnVolver").click(function () {
                window.location = 'index.html';
            });
//            var dia = new Date(climaGral.dt * 1000);
//            var meses = ["en", "fe", "ma", "ab"];
//            console.log(dia);
//            console.log(dia.getDay());//0-6 -> 0 domingo, 6 sabado
//            console.log(dia.getDate());//14
//            console.log(meses[dia.getMonth()]);//0-11
//            console.log(dia.getFullYear());//2020
            $("#dResultados").empty();

            var promedio1 = 0;
            var promedio2 = 0;

            var tempMinC1 = climaGral.list[0].temp.min + climaGral.list[1].temp.min + climaGral.list[2].temp.min + climaGral.list[3].temp.min + climaGral.list[4].temp.min + climaGral.list[5].temp.min;
            var tempMinC2 = climaGral2.list[0].temp.min + climaGral2.list[1].temp.min + climaGral2.list[2].temp.min + climaGral2.list[3].temp.min + climaGral2.list[4].temp.min + climaGral2.list[5].temp.min;
            var tempDiaC1 = climaGral.list[0].temp.day + climaGral.list[1].temp.day + climaGral.list[2].temp.day + climaGral.list[3].temp.day + climaGral.list[4].temp.day + climaGral.list[5].temp.day;
            var tempDiaC2 = climaGral2.list[0].temp.day + climaGral2.list[1].temp.day + climaGral2.list[2].temp.day + climaGral2.list[3].temp.day + climaGral2.list[4].temp.day + climaGral2.list[5].temp.day;
            var tempMaxC1 = climaGral.list[0].temp.max + climaGral.list[1].temp.max + climaGral.list[2].temp.max + climaGral.list[3].temp.max + climaGral.list[4].temp.max + climaGral.list[5].temp.max;
            var tempMaxC2 = climaGral2.list[0].temp.max + climaGral2.list[1].temp.max + climaGral2.list[2].temp.max + climaGral2.list[3].temp.max + climaGral2.list[4].temp.max + climaGral2.list[5].temp.max;
            var sensTermC1 = climaGral.list[0].feels_like.day + climaGral.list[1].feels_like.day + climaGral.list[2].feels_like.day + climaGral.list[3].feels_like.day + climaGral.list[4].feels_like.day + climaGral.list[5].feels_like.day;
            var sensTermC2 = climaGral2.list[0].feels_like.day + climaGral2.list[1].feels_like.day + climaGral2.list[2].feels_like.day + climaGral2.list[3].feels_like.day + climaGral2.list[4].feels_like.day + climaGral2.list[5].feels_like.day;

            if (tempMinC1 > tempMinC2) {
                promedio1++;
            } else {
                promedio2++;
            }
            if (tempDiaC1 > tempDiaC2) {
                promedio1++;
            } else {
                promedio2++;
            }
            if (tempMaxC1 > tempMaxC2) {
                promedio1++;
            } else {
                promedio2++;
            }
            if (sensTermC1 > sensTermC2) {
                promedio1++;
            } else {
                promedio2++;
            }

            var tempActualC1 = climaGralActual.main.temp;
            var tempActualC2 = climaGralActual2.main.temp;
            var iconoActualC1 = climaGralActual.weather[0].icon;
            var iconoActualC2 = climaGralActual2.weather[0].icon;
            var descActualC1 = climaGralActual.weather[0].description;
            var descActualC2 = climaGralActual2.weather[0].description;

            var d = new Date();
            var dia = new Array(7);
            dia[0] = "DO";
            dia[1] = "LU";
            dia[2] = "MA";
            dia[3] = "MI";
            dia[4] = "JU";
            dia[5] = "VI";
            dia[6] = "SA";

            var hoy = new Date();
            var f = hoy.getDate();

            var mes = new Date();
            var meses = new Array(12);
            meses[0] = "1";
            meses[1] = "2";
            meses[2] = "3";
            meses[3] = "4";
            meses[4] = "5";
            meses[5] = "6";
            meses[6] = "7";
            meses[7] = "8";
            meses[8] = "9";
            meses[9] = "10";
            meses[10] = "11";
            meses[11] = "12";

            var m = meses[mes.getMonth()];

            if (promedio1 > promedio2) {
                $("#dTitulo").append("<h2 style='display:inline-block;' id='ciudadNombre'> " + climaGral.city.name + "</h2>");
                $("#dHoy").append("<img id='iActual' src='http://openweathermap.org/img/wn/" + iconoActualC1 + "@2x.png'>");
                $("#dHoy").append("<p style='font-weight:300; font-size: 80px; margin-top: 0px; margin-bottom: 0px;'>" + Math.round(tempActualC1) + "°</p>");
                $("#dHoy").append("<p id='pDescActual'>" + descActualC1.charAt(0).toUpperCase() + descActualC1.slice(1) + "</p>");
                $("#proxDias").append("Próximos 15 días:");
            } else {
                $("#dTitulo").append("<h2 style='display:inline-block;' id='ciudadNombre'> " + climaGral2.city.name + "</h2>");
                $("#dHoy").append("<img id='iActual' src='http://openweathermap.org/img/wn/" + iconoActualC2 + "@2x.png'>");
                $("#dHoy").append("<p style='font-weight:300; font-size: 80px; margin-top: 0px; margin-bottom: 0px;'>" + Math.round(tempActualC2) + "°</p>");
                $("#dHoy").append("<p id='pDescActual'>" + descActualC2.charAt(0).toUpperCase() + descActualC2.slice(1) + "</p>");
                $("#proxDias").append("Próximos 15 días:");
            }

            for (var i = 1; i < climaGral.list.length; i++) {

                var iconoC1 = climaGral.list[i].weather[0].icon;
                var iconoC2 = climaGral2.list[i].weather[0].icon;

                if (promedio1 > promedio2) {
                    $("#dResultados").append("<div id='dColumnas'><p id='pDia'>" + dia[(d.getDay() + i) % 7] + " <b>" + (hoy.getDate() + i) % 31 + "</b></p><img src='http://openweathermap.org/img/wn/" +
                            iconoC1 + "@2x.png'><p>" + Math.round(climaGral.list[i].temp.max) + "° C</p><hr id='minMax'><p class='min'>" + Math.round(climaGral.list[i].temp.min) + "° C</p>");
                } else {
                    $("#dResultados").append("<div id='dColumnas'><p id='pDia'>" + dia[(d.getDay() + i) % 7] + " <b>" + (hoy.getDate() + i) % 31 + "</b></p><img src='http://openweathermap.org/img/wn/" +
                            iconoC2 + "@2x.png'><p>" + Math.round(climaGral2.list[i].temp.max) + "° C</p><hr id='minMax'><p class='min'>" + Math.round(climaGral2.list[i].temp.min) + "° C</p>");
                }
            }
            break;
    }
}


function buscarClima() {
    ciudad = $("#txtCiudad").val();
    ciudad2 = $("#txtCiudad2").val();
    tempActual = $("#txtCiudad").val();
    tempActual2 = $("#txtCiudad2").val();
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily",
        dataType: "JSON",
        type: "GET",
        data: {
            q: ciudad,
            appid: "e62b2530fdb5f4ba3559c07c8634e5c7",
            lang: "es",
            units: "metric",
            cnt: "16"
        },
        success: mostrarClima,
        beforeSend: mostrarLoader,
        error: mostrarError
    });
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/forecast/daily",
        dataType: "JSON",
        type: "GET",
        data: {
            q: ciudad2,
            appid: "e62b2530fdb5f4ba3559c07c8634e5c7",
            lang: "es",
            units: "metric",
            cnt: "16"
        },
        success: mostrarClima2,
        beforeSend: mostrarLoader,
        error: mostrarError
    });
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        dataType: "JSON",
        type: "GET",
        data: {
            q: tempActual,
            appid: "e62b2530fdb5f4ba3559c07c8634e5c7",
            lang: "es",
            units: "metric"
        },
        success: mostrarClimaActual,
        beforeSend: mostrarLoader,
        error: mostrarError
    });
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather",
        dataType: "JSON",
        type: "GET",
        data: {
            q: tempActual2,
            appid: "e62b2530fdb5f4ba3559c07c8634e5c7",
            lang: "es",
            units: "metric"
        },
        success: mostrarClimaActual2,
        beforeSend: mostrarLoader,
        error: mostrarError
    });
}

function mostrarClima(infoClima) {
    contador++;
    climaGral = infoClima;
    if (contador === 2) {
        document.getElementById('content').load("resultados.html");
        contador = 0;
    }
}

function mostrarClima2(infoClima) {
    contador++;
    climaGral2 = infoClima;
    if (contador === 2) {
        document.getElementById('content').load("resultados.html");
        contador = 0;
    }
}

function mostrarClimaActual(infoClimaActual) {
    contador++;
    climaGralActual = infoClimaActual;
    if (contador === 2) {
        document.getElementById('content').load("resultados.html");
        contador = 0;
    }
}

function mostrarClimaActual2(infoClimaActual) {
    contador++;
    climaGralActual2 = infoClimaActual;
    if (contador === 2) {
        document.getElementById('content').load("resultados.html");
        contador = 0;
    }
}

//function mostrarError(e) {
//    console.log(e);
//    alert("ERROR");
//}

function mostrarLoader() {
    $(".barra").show();
}