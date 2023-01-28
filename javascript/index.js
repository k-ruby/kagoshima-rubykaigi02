$(function () {
  // ナビゲーションのリンクを指定
  const navLink = $("#nav li a");

  // 各コンテンツのページ上部からの開始位置と終了位置を配列に格納しておく
  const contentsArr = new Array();
  for (let i = 0; i < navLink.length; i++) {
    // コンテンツのIDを取得
    const targetContents = navLink.eq(i).attr("href");
    // ページ内リンクでないナビゲーションが含まれている場合は除外する
    if (targetContents.charAt(0) == "#") {
      // ページ上部からコンテンツの開始位置までの距離を取得
      const targetContentsTop = $(targetContents).offset().top;
      // ページ上部からコンテンツの終了位置までの距離を取得
      const targetContentsBottom =
        targetContentsTop + $(targetContents).outerHeight(true) - 1;
      // 配列に格納
      contentsArr[i] = [targetContentsTop, targetContentsBottom];
    }
  }

  // 現在地をチェックする
  function currentCheck() {
    // 現在のスクロール位置を取得
    const windowScrolltop = $(window).scrollTop();
    for (let i = 0; i < contentsArr.length; i++) {
      // 現在のスクロール位置が、配列に格納した開始位置と終了位置の間にあるものを調べる
      if (
        contentsArr[i][0] <= windowScrolltop &&
        contentsArr[i][1] >= windowScrolltop
      ) {
        // 開始位置と終了位置の間にある場合、ナビゲーションにclass="current"をつける
        navLink.removeClass("current");
        navLink.eq(i).addClass("current");
        i == contentsArr.length;
      }
    }
  }

  // ページ読み込み時とスクロール時に、現在地をチェックする
  $(window).on("load scroll", function () {
    currentCheck();
  });

  // ナビゲーションをクリックした時のスムーズスクロール
  navLink.click(function () {
    $("html,body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top,
      },
      300
    );
    return false;
  });
});

//線が伸びるための設定を関数でまとめる
function ScrollTimelineAnime() {
  $(".timeline li").each(function () {
    // それぞれのli要素の
    const elemPos = $(this).offset().top; // 上からの高さ取得
    const scroll = $(window).scrollTop(); // スクロール値取得
    const windowHeight = $(window).height(); // windowの高さ取得
    const startPoint = 100; //線をスタートさせる位置を指定※レイアウトによって調整してください
    if (scroll >= elemPos - windowHeight - startPoint) {
      const H = $(this).outerHeight(true); //liの余白と高さを含めた数値を取得
      //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
      let percent = ((scroll + startPoint - elemPos) / (H / 2)) * 100; //liの余白と高さの半分で線を100％に伸ばす

      // 100% を超えたらずっと100%を入れ続ける
      if (percent > 100) {
        percent = 100;
      }
      // ボーダーの長さをセット
      $(this)
        .children(".border-line")
        .css({
          height: percent + "%", //CSSでパーセント指定
        });
    }
  });
}

// 画面をスクロールをしたら動かしたい場合の記述
$(window).on("scroll", function () {
  ScrollTimelineAnime(); // 線が伸びる関数を呼ぶ
});

// ページが読み込まれたらすぐに動かしたい場合の記述
$(window).on("load", function () {
  ScrollTimelineAnime(); // 線が伸びる関数を呼ぶ
});
