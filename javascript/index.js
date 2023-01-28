// ナビゲーションのリンクを取得
const navigationLinks = document.querySelectorAll(".nav-link");

// 各コンテンツのページ上部からの開始位置・終了位置とナビゲーションのリンクを配列に格納しておく
const contents = [];
navigationLinks.forEach((navigationLink) => {
  // 対象コンテンツの id 属性を取得
  const anchorLink = navigationLink.getAttribute("href");
  // ページ内リンクでない場合は除外する
  if (anchorLink.charAt(0) !== "#") return;

  // 対象コンテンツのDOMを取得
  const targetContent = document.querySelector(anchorLink);
  // ページ上部からコンテンツの開始位置までの距離を取得
  const targetContentTop = targetContent.offsetTop;
  // ページ上部からコンテンツの終了位置までの距離を取得
  const targetContentBottom = targetContentTop + targetContent.offsetHeight;
  // 配列に格納
  contents.push({
    top: targetContentTop,
    bottom: targetContentBottom,
    navigationLink,
  });
});

// 現在のスクロール位置でナビゲーションのスタイリングを変更する
const refreshCurrentNavigation = () => {
  // 現在のスクロール位置を取得
  const windowScrollTop = window.pageYOffset;
  contents.forEach((content) => {
    // 現在のスクロール位置が、コンテンツの開始位置と終了位置の間にあるか
    if (content.top <= windowScrollTop && windowScrollTop <= content.bottom) {
      // 開始位置と終了位置の間にあるコンテンツのナビゲーションリンクに class="current" を設定する
      navigationLinks.forEach((navLink) => navLink.classList.remove("current"));
      content.navigationLink.classList.add("current");
    }
  });
};

// ページ読み込み時とスクロール時に、現在地をチェックする
document.addEventListener("DOMContentLoaded", refreshCurrentNavigation); // 対象が画像ではないので load は使わない
document.addEventListener("scroll", refreshCurrentNavigation);

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
