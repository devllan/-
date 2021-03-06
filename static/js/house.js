var year = [],
  seq = [],
  zong = 0,
  msContentScript = [];

var url = '/book/publishing_house/';
// var url = './5.json';
layui.use('table', function () {
  var table = layui.table;

  var dom_zong = document.getElementById('zong')
  dom_zong.onclick = function () {
    window.location.reload()
  }

  var cx_16 = document.getElementById('cx_16')
  cx_16.onclick = function () {
    table.reload('test', {
      url: '/book/publishing_house/?year=2016',
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
  }
  var cx_17 = document.getElementById('cx_17')
  cx_17.onclick = function () {
    table.reload('test', {
      url: '/book/publishing_house/?year=2017',
      page: {
        curr: 1 //重新从第 1 页开始
      }
    });
  }
  var cx_18 = document.getElementById('cx_18')
  cx_18.onclick = function () {
    table.reload('test', {
      url: '/book/publishing_house/?year=2018',
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
    parseData: function (res) { //res 即为原始返回的数据
      return {
        "code": 0, //解析接口状态
        "msg": res.errorMsg, //解析提示文本
        "count": res.counts, //解析数据长度
        "data": res.successResult //解析数据列表
      };
    },
    cols: [
      [ {
        field: 'publishing_house',
        width: '50%',
        title: '出版社',
      } , {
        field: 'publishing_house_seq',
        width: '50%',
        title: '出版数量'
      }]
    ],
    limit: 50,
    page: true,
    height: 500,
    // width: 860,
    // totalRow:true,
    limits: [50]
  });
  table.on('row(test)', function (obj) {
    console.log(obj.tr) //得到当前行元素对象
    console.log(obj.data) //得到当前行数据
    // var data = obj.data;
    var Data = obj.data.id;
    console.log(Data);
    window.sessionStorage.setItem("id", obj.data.publishing_house);
    $.ajax({
      // url: './4.json?' + 'publishing_house=' + obj.data.publishing_house,
      url: '/book/publishing_house_data/?' + 'publishing_house=' + obj.data.publishing_house,
      type: "post",
      data: '',
      success: function (info) {
        console.log(obj.data.id)
        console.log(info);
        year = [];
        seq = [];
        msContentScript = [];
        zong = 0;
        var Data = info.successResult;
        // console.log(Data);
        for (var i = 0; i < Data.length; i++) {
          console.log(Data[i])

          // console.log(Data[i].y_seq.year_2016);
          console.log(Data[i].sort.year_2016);
          seq.push(Data[i].sort.year_2016);
          seq.push(Data[i].sort.year_2017);
          seq.push(Data[i].sort.year_2018);
          // seq.push(Data[i].y_seq.year_2017.seq);
          // seq.push(Data[i].y_seq.year_2018.seq);
          // msContentScript.push(Data[i].y_seq.year_2016.content);
          // msContentScript.push(Data[i].y_seq.year_2017.content);
          // msContentScript.push(Data[i].y_seq.year_2018.content);
          // console.log(seq);
          // zong = Data[i].total;
          // console.log(zong)
          // for (var j = 0; j < Data[i].y_seq.length; j++) {
          //   year.push(Data[i].y_seq[j].year);
          //   seq.push(Data[i].y_seq[j].seq);
          //   msContentScript.push(Data[i].y_seq[j].content);
          //   console.log(Data[i].y_seq[j])
          // }
          console.log(seq)
        }
        console.log(seq);
        window.sessionStorage.setItem("seq0", seq[0]);
        window.sessionStorage.setItem("seq1", seq[1]);
        window.sessionStorage.setItem("seq2", seq[2]);
        // window.sessionStorage.setItem("msContentScript0", msContentScript[0]);
        // window.sessionStorage.setItem("msContentScript1", msContentScript[1]);
        // window.sessionStorage.setItem("msContentScript2", msContentScript[2]);
        // window.sessionStorage.setItem("zong", zong);
        console.log(window.sessionStorage.getItem("seq0"));
        console.log(window.sessionStorage.getItem("seq1"));
        console.log(window.sessionStorage.getItem("seq2"));
        // console.log(window.sessionStorage.getItem("msContentScript"));
        window.location = '/book/house_details/'
        // window.location = './house2.html'
        // for (var i = 0; i < seq.length; i++) {
        //   zong = zong + Number(seq[i]);
        //   console.log(seq[i]);

        //   console.log(zong);
        // }

        // console.log(year);
        // console.log(seq);
        // console.log(msContentScript);
        // 基于准备好的dom，初始化echarts实例

      }
    });
    //obj.del(); //删除当前行
    //obj.update(fields) //修改当前行数据

  });
});