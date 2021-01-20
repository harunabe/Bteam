var sel = -1;    // 現在選択されているピース番号
var pos = [];    // 各ピースの現在位置

$(function() {
  for (var i = 0; i < 9; i++) pos[i] = i;
  // シャッフルする。
  for (var i = 9; i > 0; i--) {
    var j = Math.floor(Math.random() * i);
    swap(i - 1, j);
  }

  // ピースを配置する。
  for (var i = 0; i < 9; i++) {
    $('<div id="piece' + i + '" class="piece"></div>').css({
      backgroundPosition: '-' + getx(i) + 'px -' + gety(i) + 'px',
      left: getx(pos[i]), top: gety(pos[i])
    }).appendTo($('body'));
  }

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
        for (var i = 0; i < 9; i++) if (pos[i] != i) clear = false;
        if (clear) setTimeout(function(){alert("クリア！");}, 500);
      });
      sel = -1;
    }
  });
});

// ピースの番号から座標を得る。
function getx(n) {return (n % 3) * 100;}
function gety(n) {return Math.floor(n / 3) * 100;}

// ピースの配列を入れ替える。
function swap(i, j) {
  var tmp = pos[i];
  pos[i] = pos[j];
  pos[j] = tmp;
}
