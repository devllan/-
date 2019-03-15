console.log(window.sessionStorage.getItem("seq"));
console.log(window.sessionStorage.getItem("msContentScript"));
console.log(window.sessionStorage.getItem("zong"));

var seq0 = window.sessionStorage.getItem("seq0");
var seq1 = window.sessionStorage.getItem("seq1");
var seq2 = window.sessionStorage.getItem("seq2");
var msContentScript0 = window.sessionStorage.getItem("msContentScript0");
var msContentScript1 = window.sessionStorage.getItem("msContentScript1");
var msContentScript2 = window.sessionStorage.getItem("msContentScript2");
var zong = window.sessionStorage.getItem("zong");
// console.log(seq)

console.log(window.sessionStorage.getItem("book_name"));
console.log(window.sessionStorage.getItem("author"));
console.log(window.sessionStorage.getItem("publishing_house"));

var span1 = document.getElementById('span1');
var span2 = document.getElementById('span2');
var span3 = document.getElementById('span3');

span1.innerText = '书名：' + window.sessionStorage.getItem("book_name");
span2.innerText = '作者：' + window.sessionStorage.getItem("author");
span3.innerText = '出版社：' + window.sessionStorage.getItem("publishing_house");



var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
option = {
    title: {
        text: '排名变化'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['排名']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['2016', '2017', '2018', ]
    }],
    yAxis: [{
        type: 'value',
        // max: 500,
        inverse: true,
    }],
    series: [{
        name: '排名变化',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [seq0, seq1, seq2, ]
    }, ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


var myChart2 = echarts.init(document.getElementById('main2'));

// 指定图表的配置项和数据
option2 = {
    title: {
        text: '评论变化'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data: ['评论数']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['2016', '2017', '2018']
    }],
    yAxis: [{
        type: 'value',
        // min:0,
        
        // mininterval:3
        // splitNumber:3
    }],
    series: [{
        name: '评论数',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [msContentScript0, msContentScript1, msContentScript2, ]
    }]
};
// 使用刚指定的配置项和数据显示图表。
myChart2.setOption(option2);