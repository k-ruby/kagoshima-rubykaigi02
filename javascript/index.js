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

// ページ読み込み時とスクロール時に、ナビゲーションのスタイリングを変更する
document.addEventListener("DOMContentLoaded", refreshCurrentNavigation); // 対象が画像ではないので load は使わない
document.addEventListener("scroll", refreshCurrentNavigation);

// タイムスケジュールの線がスクロールに応じて伸びるアニメーション
const timelineScrollAnimation = () => {
  // アニメーションをスタートさせる位置を指定 ※レイアウトによって調整してください
  const animationStartingTop = 100;
  // アニメーションの速度。アニメーションを早くしたいなら高い数字を入れてください
  const animationVelocity = 2;
  // スクロール値を取得
  const windowScrollTop = window.pageYOffset;

  document.querySelectorAll(".timeline-item").forEach((timelineItem) => {
    // それぞれのタイムスケジュール要素の
    const itemTop = timelineItem.offsetTop; // 上からの高さ取得
    const itemHeight = timelineItem.offsetHeight; //liの余白と高さを含めた数値を取得
    const itemBottom = itemTop + itemHeight;
    const startTop = itemTop - animationStartingTop;
    if (startTop <= windowScrollTop && windowScrollTop < itemBottom) {
      // タイムスケジュール要素内でスクロールした高さを計算
      const scrollTopInnerItem = windowScrollTop - startTop;
      //スクロール値から要素までの高さを引いた値を、liの高さの半分のパーセントで出す
      //liの余白と高さの半分で線を100％に伸ばす
      let percent = (scrollTopInnerItem / itemHeight) * animationVelocity * 100;
      // 100% を超えたらずっと100%を入れ続ける
      if (percent < 100) {
        timelineItem.querySelector(".border-line").style.height = `${percent}%`;
      } else {
        timelineItem.querySelector(".border-line").style.height = `100%`;
      }
      // ボーダーの長さをパーセント指定でセット
    } else {
      timelineItem.querySelector(".border-line").style.height = `0%`;
    }
  });
};

// ページが読み込まれてすぐにタイムスケジュールのアニメーションを動かす
document.addEventListener("DOMContentLoaded", timelineScrollAnimation); // 対象が画像ではないので load は使わない
// 画面をスクロールをしたらタイムスケジュールのアニメーションを動かす
document.addEventListener("scroll", timelineScrollAnimation);
