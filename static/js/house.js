var year = [],
  seq = [],
  zong = 0,
  msContentScript = [];
layui.use('table', function () {
  var table = layui.table;

  table.render({
    elem: '#test',
    url: './1.json',
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
      },]
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
    var data = obj.data;
    $.ajax({
      url: './2.json',
      type: "get",
      data: data,
      success: function (info) {
        console.log(info);
        year = [];
        seq = [];
        msContentScript = [];
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
        }
        for (var i = 0; i < seq.length; i++) {
          zong = zong + Number(seq[i]);
          console.log(seq[i]);

          console.log(zong);
        }
        zong = Number(zong) / seq.length;
        console.log(zong)

        
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main'));

        // 指定图表的配置项和数据
        option = {
          title: {
              text: '排名变化'
          },
          tooltip : {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  label: {
                      backgroundColor: '#6a7985'
                  }
              }
          },
          legend: {
              data:['排名']
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
          xAxis : [
              {
                  type : 'category',
                  boundaryGap : false,
                  data : ['2016','2017','2018','总排名']
              }
          ],
          yAxis : [
              {
                  type : 'value'
              }
          ],
          series : [
              {
                  name:'排名变化',
                  type:'line',
                  stack: '总量',
                  areaStyle: {},
                  data:[seq[0], seq[1], seq[2],]
              },
          ]
      };


        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);
      }
    });
    //obj.del(); //删除当前行
    //obj.update(fields) //修改当前行数据

  });
});