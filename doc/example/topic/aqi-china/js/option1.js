function option1 (name) {
    var keyCity = [
        '北京','上海','广州','长春','长沙','成都','福州','哈尔滨','沈阳','杭州','呼和浩特',
        '昆明','南京','贵阳','太原','天津','武汉','西安','郑州','重庆','济南',
        '银川','石家庄','乌鲁木齐','南昌','海口','兰州','西宁','合肥','南宁','深圳',
        '包头','大连','大同','保定','东莞','佛山','桂林','开封','连云港',
        '廊坊','宁波','齐齐哈尔','泉州','绍兴','苏州','唐山','无锡','延安',
        '扬州','徐州','烟台','宜宾','玉溪','湛江','中山','珠海','淄博',
        '威海','潍坊','温州','汕头','青岛','厦门','九江','秦皇岛','洛阳'
    ];
    var option = {
        title : {
            text: '重点城市对比',
            subtext: 'data from PM25.in',
            sublink: 'http://www.pm25.in',
            x:'right',
            y:'bottom'
        },
        tooltip : {
            trigger: 'axis'
        },
        legend: {
            data: keyCity
        },
        toolbox: {
            show : true,
            orient : 'vertical',
            x: 'right',
            y: 'center',
            feature : {
                mark : true,
                dataView : {readOnly: false},
                magicType:['line', 'bar'],
                restore : true,
                saveAsImage : true
            }
        },
        grid:{
            x: 50,
            y: 120,
            x2: '32%',
            borderWidth:0
        },
        xAxis : [
            {
                type : 'category',
                splitLine : {show : false},
                data : ['AQI','PM2.5','PM10','NO2','O3','SO2']
            }
        ],
        yAxis : [
            {
                type : 'value',
                splitArea : {show : true},
                splitLine : {show : true}
            }
        ],
        polar : [
           {
               indicator : [
                   { text: 'AQI'},
                   { text: 'PM2.5'},
                   { text: 'PM10'},
                   { text: 'NO2'},
                   { text: 'O3'},
                   { text: 'SO2'}
                ],
                center : ['84%', 230],
                radius : 120
            }
        ]
    };
    
    var selected = {};
    var series = [
        {
            name: '对比',
            type: 'radar',
            tooltip: {
                trigger:'axis',
                formatter: function(v) {
                    var res = v[0][3] + '<br/>';
                    for (var i = 0, l = v.length; i < l; i++) {
                        res += v[i][1] + ' : ' + v[i][2] + '<br/>';
                    }
                    return res;
                }
            },
            data: []
        }
    ];
    var cityToData = data.cityToData;
    var singleData;
    var city;
    var seriesData;
    for (var i = 0, l = keyCity.length; i < l; i++) {
        city = keyCity[i];
        singleData = cityToData[city];
        seriesData = [
            singleData.aqi, 
            singleData.pm2_5, 
            singleData.pm10, 
            singleData.no2, 
            singleData.o3, 
            singleData.so2
        ];
        series[0].data.push({
            name: city,
            value: seriesData
        });
        series.push({
            name: city,
            type: 'bar',
            data: seriesData
        });
        selected[city] = false;
    }
    selected['北京'] = true;
    selected['上海'] = true;
    selected['广州'] = true;
    //selected['重庆'] = true;
    //selected['哈尔滨'] = true;
    //selected['乌鲁木齐'] = true;
    //selected['拉萨'] = true;
    option.legend.selected = selected;
    option.series = series;
    console.log(option);
    return option;
}