let str = '';

let datalist = {
  key_num: '',
  name: '',
  meisan: '',
  shuzou: '',
  imp: '',
  taste: { hna: '', hjn: '', juk: '', oda: '', dry: '', kei: '' },
};

for (let i = 1; i <= 6; i++) {
  str += '<option>' + i + '</option>';
}

$('.taste_value').html(str);

function emptyOut() {
  $('#name').val('');
  $('#meisan').val('');
  $('#shuzou').val('');
  $('#impression').val('');
}

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

    localStorage.setItem(datalist.name, JSON.stringify(datalist));
    const getData = JSON.parse(localStorage.getItem(datalist.name));
    //一覧表示に追加
    const html =
      '<tr><th>' +
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
      '</td><td><p class = "chg_record">編集</p></td></tr>';

    $('#list').append(html);
    emptyOut();
  } else {
    alert('酒名を入力してください！');
  }
});

$('#clear').on('click', function () {
  localStorage.clear();
  $('#list').empty();
  $('#myRaderChart').remove();

  emptyOut();
});

for (let i = 0; i < localStorage.length; i++) {
  const name = localStorage.key(i);
  const getData = JSON.parse(localStorage.getItem(name));
  const meisan = getData.meisan;
  const shuzou = getData.shuzou;
  const imp = getData.imp;
  const html =
    '<tr><th>' +
    name +
    '</th><td>' +
    meisan +
    '</td><td>' +
    shuzou +
    '</td><td>' +
    imp +
    '</td><td><p id=' +
    i +
    ' class = "graph">グラフ</p></td>' +
    '</td><td><p class = "chg_record">編集</p></td></tr>';
  $('#list').append(html);
}

// for (let i = 1; i <= localStorage.length; i++) {
//   $('#' + i).on('click', function () {
//     let record = document.getElementById(i);
//     localStorage.removeItem(i);
//   });
// }

//削除クリック→そのレコードのキーを取得→レコードを削除
// $('#' + i).on('click', function () {
//   let record = document.getElementById(i);
//   localStorage.removeItem('urlBlackList');
// });
for (let i = 0; i < localStorage.length; i++) {
  $('#' + i).on('click', function () {
    const name = localStorage.key(i);
    const getData = JSON.parse(localStorage.getItem(name));
    const ctx = document.getElementById('myRaderChart');

    const myRadarChart = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['華やか', '芳醇', '重厚', '穏やか', 'ドライ', '軽快'], //「華やか」「芳醇」「重厚」「穏やか」「ドライ」「軽快」
        datasets: [
          {
            label: getData.name,
            data: [
              getData.taste.hna,
              getData.taste.hjn,
              getData.taste.juk,
              getData.taste.oda,
              getData.taste.dry,
              getData.taste.kei,
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
  });
}
