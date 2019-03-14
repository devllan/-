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


var myChart = echarts.init(document.getElementById('main'));

// 指定图表的配置项和数据
option = {
    title: {
        text: '出版数量'
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
        data: ['数量']
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
        type: 'value'
    }],
    series: [{
        name: '数量变化',
        type: 'line',
        stack: '总量',
        areaStyle: {},
        data: [seq0, seq1, seq2]
    }, ]
};


// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);


// layui.use('table', function () {
//     var table = layui.table;

//     //第一个实例
//     table.render({
//         elem: '#test',
//         method: 'get',
//         // request: {
//         //   pageName: 'page' //页码的参数名称，默认：page
//         //     ,
//         //   limitName: 'limit' //每页数据量的参数名，默认：limit
//         // },
//         // headers: {pageName: 'page',limitName: 'limit'},
//         // where:{pageName,limitName},
//         url: './4.json',
//         parseData: function (res) { //res 即为原始返回的数据
//             return {
//                 "code": 0, //解析接口状态
//                 "msg": res.errorMsg, //解析提示文本
//                 "count": res.successResult.counts, //解析数据长度
//                 "data": res.successResult.book_data //解析数据列表
//             };
//         },
//         cols: [
//             [{
//                 field: 'book_name',
//                 width: '100%',
//                 title: '书名'
//             }]
//         ],
//         limit: 50,
//         height: 500,
//         // width: 860,
//         // totalRow:true,

//     });
// });
console.log(window.sessionStorage.getItem("id"));
var id = window.sessionStorage.getItem("id")
$.ajax({
    // url: './4.json?' + 'publishing_house=' + id,
    url: '/book/publishing_house_data/?' + 'publishing_house=' + id,
    type: 'post',
    data: '',
    success: function (info) {
        console.log(info);
        var Data = info.successResult;
        console.log(Data)
        // var ul = document.getElementById('ul')
        var name = document.getElementById('span1');
        var num = document.getElementById('span2');

        for (var i = 0; i < Data.length; i++) {
            console.log(Data[i])
            num.innerText = '共出版' + Data[i].count + '本书';
            for (var j = 0; j < Data[i].book_data.length; j++) {
                console.log(Data[i].book_data[j].book_name);
                var tduser = document.createElement("li");
                tduser.setAttribute("class", "li");
                tduser.innerText = Data[i].book_data[j].book_name;
                $("#ul").append(tduser);
                console.log(tduser)
            }
        }
        console.log(name)
        name.innerText = id;

    }
})