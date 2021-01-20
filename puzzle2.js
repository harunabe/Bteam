var sel = -1;    // 現在選択されているピース番号
var pos = [];    // 各ピースの現在位置

$(function() {
  for (var i = 0; i < 16; i++) pos[i] = i;
  // シャッフルする。
  for (var i = 16; i > 0; i--) {
    var j = Math.floor(Math.random() * i);
    swap(i - 1, j);
  }

  // ピースを配置する。
  for (var i = 0; i < 16; i++) {
    $('<div id="piece' + i + '" class="piece"></div>').css({
      backgroundPosition: '-' + getx(i) + 'px -' + gety(i) + 'px',
      left: getx(pos[i]), top: gety(pos[i])
    }).appendTo($('body'));
  }

  setTimeout(function(){
    window.location.href = 'miss.html';},45 * 1000); //時間制限

  //Timer
  const totalTime = 45000;  //時間表示
  const oldTime = Date.now();

  const timeId = setInterval(() => {
    const currentTime = Date.now();

    // 差分を求める
    const diff = currentTime - oldTime;

    const diffSec = totalTime - diff;

    //ミリ秒を整数に変換
    const remainSec = Math.ceil(diffSec / 1000);

    let text = `残り${remainSec}秒`;

    // 0秒以下になったら
    if (diffSec <= 0) {
    clearInterval(timeId);
  }

  // 画面に表示する
  document.querySelector('#log').innerHTML = text;
})
  // ピースをクリックしたとき
  $('.piece').click(function() {
    var no = this.id.substring(5);
    if (sel == no) {
      // 自分自身が選択されているときは選択をキャンセルする。
      $(this).fadeTo(100, 1);
      sel = -1;
    } else if (sel == -1) {
      // 何も選択されていないときは選択する。
      $(this).fadeTo(100, 0.5);
      sel = no;
    } else {
      // 他のピースが選択されているときは入れ替える。
      swap(no, sel);
      $('#piece' + sel).fadeTo(100, 1).animate({left: getx(pos[sel]), top: gety(pos[sel])});
      $(this).animate({left: getx(pos[no]), top: gety(pos[no])}, function() {
        // アニメーション終了時にクリア判定する。
        var clear = true;
        for (var i = 0; i < 16; i++) if (pos[i] != i) clear = false;
        if (clear) setTimeout(function(){alert("クリア！");}, 200);
      });
      sel = -1;
    }
  });
});

// ピースの番号から座標を得る。
function getx(n) {return (n % 4) * 100;}
function gety(n) {return Math.floor(n / 4) * 100;}

// ピースの配列を入れ替える。
function swap(i, j) {
  var tmp = pos[i];
  pos[i] = pos[j];
  pos[j] = tmp;
}
