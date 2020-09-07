//JSONを作成
let datalist = {
  key_num: '',
  name: '',
  meisan: '',
  shuzou: '',
  imp: '',
  taste: { hna: '', hjn: '', juk: '', oda: '', dry: '', kei: '' },
};
//セレクトボックスの作成
let str = '';
for (let i = 1; i <= 6; i++) {
  str += '<option>' + i + '</option>';
}
$('.taste_value').html(str);

//Save, Clear後input項目を削除
function emptyOut() {
  $('#name').val('');
  $('#meisan').val('');
  $('#shuzou').val('');
  $('#impression').val('');
  location.reload();

  myRadarChart.data.datasets[0].data = [0, 0, 0, 0, 0, 0];
  myRadarChart.update();
}

//Saveをクリックしたらinput要素をJSON, localStorageに保存
$('#save').on('click', function () {
  if ($('#name').val()) {
    datalist.key_num = localStorage.length;
    datalist.name = $('#name').val();
    datalist.meisan = $('#meisan').val();
    datalist.shuzou = $('#shuzou').val();
    datalist.imp = $('#impression').val();
    datalist.taste.hna = $('#hanayaka').val();
    datalist.taste.hjn = $('#houjun').val();
    datalist.taste.juk = $('#juukou').val();
    datalist.taste.oda = $('#odayaka').val();
    datalist.taste.dry = $('#dry').val();
    datalist.taste.kei = $('#keikai').val();

    console.log(localStorage.length);
    //JSONからキーを取得し、localStorageに保存
    localStorage.setItem(datalist.name, JSON.stringify(datalist));
    const getData = JSON.parse(localStorage.getItem(datalist.name));
    //一覧表示に追加
    const html =
      '<tr class="add_list"><th>' +
      getData.name +
      '</th><td>' +
      getData.meisan +
      '</td><td>' +
      getData.shuzou +
      '</td><td>' +
      getData.imp +
      '</td><td><p id= ' +
      getData.key_num +
      ' class = "graph">グラフ</p></td>' +
      '</td><td><p class = "del_record">削除</p></td></tr>';

    $('#list').append(html);
    emptyOut();
  } else {
    alert('酒名を入力してください！');
  }
});

//一覧を削除
$('#clear').on('click', function () {
  localStorage.clear();
  $('.add_list').empty();

  emptyOut();
});

//localStorageを読み込み一覧表示
for (let i = 0; i < localStorage.length; i++) {
  const name = localStorage.key(i);
  const getData = JSON.parse(localStorage.getItem(name));
  const meisan = getData.meisan;
  const shuzou = getData.shuzou;
  const imp = getData.imp;
  const html =
    '<tr id= ' +
    i +
    ' class="add_list"><th>' +
    name +
    '</th><td>' +
    meisan +
    '</td><td>' +
    shuzou +
    '</td><td>' +
    imp +
    '</td><td><p class = "graph">グラフ</p></td>' +
    '</td><td><p class = "del_record">削除</p></td></tr>';
  $('#list').append(html);
}

// for (let i = 1; i <= localStorage.length; i++) {
//   $('#' + i).on('click', function () {
//     let record = document.getElementById(i);
//     localStorage.removeItem(i);
//   });
// }

//グラフ用のJSONを定義
let getJsonData = {
  key_num: '',
  name: '',
  meisan: '',
  shuzou: '',
  imp: '',
  taste: { hna: '', hjn: '', juk: '', oda: '', dry: '', kei: '' },
};

//グラフを描写
const ctx = document.getElementById('myRaderChart');
const myRadarChart = new Chart(ctx, {
  type: 'radar',
  data: {
    labels: ['華やか', '芳醇', '重厚', '穏やか', 'ドライ', '軽快'],
    datasets: [
      {
        label: getJsonData.name,
        data: [
          getJsonData.taste.hna,
          getJsonData.taste.hjn,
          getJsonData.taste.juk,
          getJsonData.taste.oda,
          getJsonData.taste.dry,
          getJsonData.taste.kei,
        ],
        backgroundColor: 'RGBA(225,95,150, 0.5)',
        borderColor: 'RGBA(225,95,150, 1)',
        borderWidth: 1,
        pointBackgroundColor: 'RGB(46,106,177)',
      },
    ],
  },
  options: {
    title: {
      display: true,
      text: 'お酒の味わい',
    },
    scale: {
      ticks: {
        suggestedMin: 0,
        suggestedMax: 6,
        stepSize: 1,
        callback: function (value, index, values) {
          return value + '点';
        },
      },
    },
  },
});

//グラフボタンを押して味わいグラフを表示
for (let i = 0; i < localStorage.length; i++) {
  const tr_id = 'tr#' + i;

  $(tr_id + ' .graph').on('click', function () {
    const name = localStorage.key(i);
    getJsonData = JSON.parse(localStorage.getItem(name));
    myRadarChart.data.datasets[0].label = getJsonData.name;
    myRadarChart.data.datasets[0].data = [
      getJsonData.taste.hna,
      getJsonData.taste.hjn,
      getJsonData.taste.juk,
      getJsonData.taste.oda,
      getJsonData.taste.dry,
      getJsonData.taste.kei,
    ];
    // console.log(myRadarChart.data.datasets[0].data);
    myRadarChart.update();
  });
}
//削除を押して行を削除
for (let i = 0; i < localStorage.length; i++) {
  const tr_id = 'tr#' + i;
  $(tr_id + ' .del_record').on('click', function () {
    console.log('クリック');
    const name = localStorage.key(i);
    localStorage.removeItem(name);
    $('.del_record' + '#' + i).empty();
    emptyOut();
  });
}
//削除クリック→そのレコードのキーを取得→レコードを削除
// $('#' + i).on('click', function () {
//   let record = document.getElementById(i);
//   localStorage.removeItem('urlBlackList');
// });
