$(window).load(function() {
    // initialiazing the data before executing anything else
    let runs;

    $("body").append(' <h1> Arnaud\'s running log</h1><div class="buttons"></div><div class="chart-wrapper">')

    $(".buttons").append('<button id="distance">Distance</button><button id="pace">Pace</button><button id="time">Time</button> <button id="locations">Locations</button><button id="weather">Weather</button><button id="difficulty">Difficulty</button>')

    $(".chart-wrapper").append('<div id="chart-dist"></div><div id="chart-pace"></div><div id="chart-time"></div> <div id="chart-locations"></div><div id="chart-weather"></div><div id="chart-difficulty"></div>')

    // reading and assigning the json data to "runs"
    $.getJSON("data/runs.json", function (data) {
        runs = data.runs;
    }).then(function(){
        main(runs);
    })

});

days = ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5"];

let distance = false;
let pace = false;
let time = false;
let locations = false;
let weather = false;
let difficulty = false;

function main(runs){

    $("#chart-dist").hide()
    $("#chart-pace").hide()
    $("#chart-time").hide()
    $("#chart-locations").hide()
    $("#chart-weather").hide()
    $("#allo").hide()

    $("#distance").click(function(){
        if($("#chart-dist").is(":hidden")){
            if(!distance){
                $("#chart-dist").show()
                render_dist(runs)
                distance=true
            }else{
                $("#chart-dist").show()
            }
        }
        else{
            $("#chart-dist").hide()
        }
    })

    $("#pace").click(function(){
        if($("#chart-pace").is(":hidden")){
            if(!pace){
                $("#chart-pace").show()
                render_pace(runs)
                pace = true
            }else{
                $("#chart-pace").show()
            }
        }
        else{
            $("#chart-pace").hide()
        }
    })

    $("#time").click(function(){
        if($("#chart-time").is(":hidden")){
            if(!time){
                $("#chart-time").show()
                render_time(runs)
                time = true
            }else{
                $("#chart-time").show()
            }
        }
        else{
            $("#chart-time").hide()
        }
    })

    $("#locations").click(function(){
        if($("#chart-locations").is(":hidden")){
            if(!locations){
                $("#chart-locations").show()
                render_locations(runs)
                locations = true
            }else{
                $("#chart-locations").show()
            }
        }
        else{
            $("#chart-locations").hide()
        }
    })

    $("#weather").click(function(){
        if($("#chart-weather").is(":hidden")){
            if(!weather){
                $("#chart-weather").show()
                render_weather(runs)
                weather = true
            }else{
                $("#chart-weather").show()
            }
        }
        else{
            $("#chart-weather").hide()
        }
    })

    $("#difficulty").click(function(){
        if($("#chart-difficulty").is(":hidden")){
            if(!difficulty){
                $("#chart-difficulty").show()
                render_difficulty(runs)
                difficulty = true
            }else{
                $("#chart-difficulty").show()
            }
        }
        else{
            $("#chart-difficulty").hide()
        }
    })

}

function render_dist(runs){
    let dist = get_dist(runs);
    var options = {
        chart: {
        height: 250,
        type: 'area',
        stacked: 'false',
        },
        series: [{
          name: 'Distance[KM]',
          data: dist,
        }],
        stroke: {
            width: [4, 4, 4]
          },
        xaxis: {
            categories: days,
            title: {
                text: "Distance Ran per Day(KM)"
            }
        },
        yaxis: {
            labels: {
                minWidth: 40
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#00FC9C',
                shadeTo: 'dark',
                shadeIntensity: 0.65
            },
        }
      }

    distance = new ApexCharts($('#chart-dist')[0], options);

    distance.render();

}

function render_pace(runs){
    let pace = get_pace(runs);
    var options = {
        
        chart: {
            type: 'bar',
            height: 250,
            title: "Locations",
        },
        dataLabels: {
            enabled: false
        },
        series: [{
          name: 'Distance[KM]',
          data: pace,
        }],
        stroke: {
            width: [4, 4, 4]
          },
        plotOptions: {
            bar: {
              columnWidth: "20%"
            }
        },
        xaxis: {
            categories: days,
            title: {
                text: "Pace(KM/min)"
            }
        },
        yaxis: {
            labels: {
                minWidth: 40
            }
        },
        theme: {
            monochrome: {
                enabled: true,
                color: '#FF8036',
                shadeTo: 'dark',
                shadeIntensity: 0.65
            },
        }
      }

    pace = new ApexCharts($('#chart-pace')[0], options);

    pace.render();

}

function render_time(runs){
    let time= get_time(runs);
    var options = {
        chart: {
            type: 'bar',
            height: 250,
        },
        series: [{
          name: 'Time[min]',
          data: time,
        }],
        plotOptions: {
            bar: {
              columnWidth: "20%",
              horizontal: true,
            }
        },
        xaxis: {
            categories: days,
            title: {
                text: "Total Time(min)"
            }
        },
        yaxis: {
            labels: {
                minWidth: 40
            }
        },
        theme: {
            mode: 'light', 
            palette: 'palette3', 
            monochrome: {
                enabled: true,
                color: '#498ABB',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
      }
      
    time = new ApexCharts($('#chart-time')[0], options);

    time.render();

}

function render_locations(runs){
    let locations = get_locations_wratio(runs);

    var options = {
        series: [
        {
          name: 'Locations',
          data: locations
        },
      ],
        legend: {
        show: true
      },
      chart: {
        height: 350,
        type: 'treemap'
      },
      title: {
        text: 'Locations',
        align: 'center'
      },
      plotOptions: {
        treemap: {
          colorScale: {
            ranges: [
              {
                from:0,
                to: 1.1,
                color: '#FFDE5A'
              },
              {
                from: 1.2,
                to: 6,
                color: '#228EE2'
              }
            ]
          }
        }
      }
    };
    var chart_locations = new ApexCharts($('#chart-locations')[0], options);

    chart_locations.render();
}

function render_weather(runs){
    let weather = get_weather_wratio(runs);
    let weather_labels = [];
    let weather_ratios = [];
    weather.forEach(element =>{
        weather_labels.push(element.x);
        weather_ratios.push(element.y);
    })
    

    var options = {
        series: weather_ratios,
        chart: {
        width: 380,
        type: 'pie',
      },
      colors: ['#93C3EE', '#E5C6A0', '#AFAFAF'],
      fill: {
        type: 'image',
        opacity: 0.85,
        image: {
           src: [],
          width: 25,
          imagedHeight: 25
        },
      },
      stroke: {
        width: 4
      },
      dataLabels: {
        enabled: true,
        style: {
          colors: ['#111']
        },
        background: {
          enabled: true,
          foreColor: '#fff',
          borderWidth: 0
        }
      },
      labels: weather_labels,
      fill: {
        type: 'image',
        opacity: 0.85,
        image: {
           src: ['assets/cloud.gif', 'assets/sunny.gif','assets/rain.gif', ],
          width: 25,
          imagedHeight: 25
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
      title:{
        text: "Weather"
      }
      };

    var chart_weather = new ApexCharts($('#chart-weather')[0], options);

    chart_weather.render();
}

function render_difficulty(runs){
    let diff = get_diff_wratio(runs);
    
    var options = {
        series: [{
        name: "Runs with this difficulty",
        data: diff
      }],
        chart: {
        type: 'bar',
        height: 350
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      fill: {
        colors: [function({ value, seriesIndex, dataPointIndex, w }) {
          if(dataPointIndex==0){
            return "#00FC9C";
          }
          if(dataPointIndex==1){
            return "#FF8036";
          }
          return "#CB3C3C";
        }]
      },
        // colors: ["#00FC9C", "#FF8036", "#CB3C3C"],
        xaxis: {
            categories: ["Easy", "Moderate", "Hard"]
        },
        title:{
            text: "Difficulty"
        }
      };

    var distance_chart = new ApexCharts($('#chart-difficulty')[0], options);

    distance_chart.render();
}

function render_dist_pace_chart(runs)
{
    // get data
    let dist = get_dist(runs);
    let pace = get_pace(runs);
    let time = get_time(runs);
    // options
    var options = {
        chart: {
        height: 500,
        width: 850,
        type: 'area',
        stacked: 'false',
        },
        plotOptions: {
            bar:{
                horizontal: true
            }
        },
        series: [{
          name: 'Distance[KM]',
          data: dist,
        },{
            name: 'Pace(KM/min)',
            data: pace,
        },],
        stroke: {
            width: [4, 4, 4]
          },
        plotOptions: {
            bar: {
              columnWidth: "20%"
            }
        },
        xaxis: {
            categories: days,
            title: {
                text: "Distance Ran/Day"
            }
        },
        yaxis: [
            {
              seriesName: 'Pace(KM/min)',
            },
            {
              seriesName: 'Distance[KM]',
            }
          ],
        theme: {
            mode: 'light', 
            palette: 'palette3', 
            monochrome: {
                enabled: true,
                color: '#255aee',
                shadeTo: 'light',
                shadeIntensity: 0.65
            },
        }
      }

    var distance_chart = new ApexCharts($('#chart')[0], options);

    distance_chart.render();
}

function get_dist(runs)
{   
    var dist = [];
    runs.forEach(element => {
        dist.push(element.distance)
    });
    return dist;
}

function get_pace(runs)
{   
    var pace = [];
    runs.forEach(element => {
        pace.push(element.pace)
    });
    return pace;
}

function get_time(runs){
    var time = [];
    runs.forEach(element => {
        time.push(element.time)
    });
    return time;
}

function get_locations_wratio(runs) {
    var locations = [];
    runs.forEach(element => {

        let duplicate = false;

        locations.forEach(obj=>{
            if(obj.x === element.location){
                obj.y = obj.y+1
                duplicate =true;
            }
        })
        if(!duplicate)
            locations.push({x:element.location, y:1})
    });

    return locations;
}

function get_weather(runs)
{   
    var weather = [];
    weather.forEach(element => {
        weather.push(element.weather)
    });
    return weather;
}

function get_weather_wratio(runs) {
    var weather = [];
    runs.forEach(element => {

        let duplicate = false;

        weather.forEach(obj=>{
            if(obj.x === element.weather){
                obj.y = obj.y+1
                duplicate =true;
            }
        })
        if(!duplicate)
            weather.push({x:element.weather, y:1})
    });
    return weather;
}

function get_diff_wratio(runs){
    var diff = [];
    runs.forEach(element => {

        let duplicate = false;

        diff.forEach(obj=>{
            if(obj.x === element.difficulty){
                obj.y = obj.y+1
                duplicate =true;
            }
        })
        if(!duplicate)
            diff.push({x:element.difficulty, y:1})
    });

    return diff;
}