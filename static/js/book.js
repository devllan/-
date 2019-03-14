var year = [],
  seq = [],
  zong = 0,
  msContentScript = [];

var url = '/book/index_data/';
// var url = './3.json';
layui.use('table', function () {
  var table = layui.table;

  var dom_zong = document.getElementById('zong')
  dom_zong.onclick = function () {
    window.location.reload()
  }

  var cx_16 = document.getElementById('cx_16')
  cx_16.onclick = function () {
    table.reload('test', {
      url: '/book/index_data/?year=2016',
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
  }
  var cx_17 = document.getElementById('cx_17')
  cx_17.onclick = function () {
    table.reload('test', {
      url: '/book/index_data/?year=2017',
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
  }
  var cx_18 = document.getElementById('cx_18')
  cx_18.onclick = function () {
    table.reload('test', {
      url: '/book/index_data/?year=2018',
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
  }


  table.render({
    elem: '#test',
    method: 'get',
    // request: {
    //   pageName: 'page' //页码的参数名称，默认：page
    //     ,
    //   limitName: 'limit' //每页数据量的参数名，默认：limit
    // },
    // headers: {pageName: 'page',limitName: 'limit'},
    // where:{pageName,limitName},
    url: url,
    parseData: function(res){ //res 即为原始返回的数据
      return {
        "code": 0, //解析接口状态
        "msg": res.errorMsg, //解析提示文本
        "count": 50, //解析数据长度
        "data": res.successResult //解析数据列表
      };
    },
    cols: [
      [{
        field: 'book_name',
        width: 300,
        title: '书名',
      }, {
        field: 'author',
        width: 300,
        title: '作者'
      }, {
        field: 'publishing_house',
        width: 300,
        title: '出版社',
      }, 
    ]
    ],
    limit: 50,
    page: true,
    height: 650,
    width: 860,
    // totalRow:true,
    limits: [50]
  });
  table.on('row(test)', function (obj) {
    console.log(obj.tr) //得到当前行元素对象
    console.log(obj.data) //得到当前行数据
    var Data = obj.data.id;
    console.log(Data);
    
    $.ajax({
      url: '/book/book_ranking/?' + obj.data.id,
      type: "post",
      data: '',
      success: function (info) {
        console.log(info);
        year = [];
        seq = [];
        msContentScript = [];
        zong = 0;
        var Data = info.successResult;
        // console.log(Data);
        for (var i = 0; i < Data.length; i++) {
          console.log(Data[i].y_seq.year_2016);
          seq.push(Data[i].y_seq.year_2016.seq);
          seq.push(Data[i].y_seq.year_2017.seq);
          seq.push(Data[i].y_seq.year_2018.seq);
          msContentScript.push(Data[i].y_seq.year_2016.content);
          msContentScript.push(Data[i].y_seq.year_2017.content);
          msContentScript.push(Data[i].y_seq.year_2018.content);
          console.log(seq);
          // for (var j = 0; j < Data[i].y_seq.length; j++) {
          //   year.push(Data[i].y_seq[j].year);
          //   seq.push(Data[i].y_seq[j].seq);
          //   msContentScript.push(Data[i].y_seq[j].content);
          //   console.log(Data[i].y_seq[j])
          // }
        }
        for (var i = 0; i < seq.length; i++) {
          zong = zong + Number(seq[i]);
          console.log(seq[i]);

          console.log(zong);
        }
        zong = Number(zong) / seq.length;
        console.log(zong)
        // console.log(year);
        // console.log(seq);
        // console.log(msContentScript);
        // 基于准备好的dom，初始化echarts实例
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
            data: ['2016', '2017', '2018', '总排名']
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '排名变化',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [seq[0], seq[1], seq[2], ]
          }, {
            name: '总排名',
            type: 'bar',
            data: [, , , zong]
          }]
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
            type: 'value'
          }],
          series: [{
            name: '评论数',
            type: 'line',
            stack: '总量',
            areaStyle: {},
            data: [msContentScript[0], msContentScript[1], msContentScript[2], ]
          }]
        };
        // 使用刚指定的配置项和数据显示图表。
        myChart2.setOption(option2);
      }
    });
    //obj.del(); //删除当前行
    //obj.update(fields) //修改当前行数据

  });
});