// 사진 데이터 (assets 폴더에 있는 내 사진으로 바꾸기)
const photos = [
  { title: "Alley", date: "2026-10-12", src: "assets/alley.jpg" },
  { title: "Night", date: "2026-09-03", src: "assets/night.jpg" },
  { title: "Beach", date: "2026-08-20", src: "assets/beach.jpg" },
  { title: "Campus", date: "2026-11-01", src: "assets/campus.jpg" },
  { title: "Tennis", date: "2026-07-15", src: "assets/tennis.jpg" },
  { title: "Cafe", date: "2026-10-28", src: "assets/cafe.jpg" }
];

// ---------------- Merge Sort ----------------

// 배열을 반으로 나눠서 각각 정렬한 다음 합친다
function mergeSort(arr, compare) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid), compare);
  const right = mergeSort(arr.slice(mid), compare);

  return merge(left, right, compare);
}

// 이미 정렬된 두 배열을 하나의 정렬된 배열로 합친다
function merge(left, right, compare) {
  const result = [];
  let i = 0;
  let j = 0;

  while (i < left.length && j < right.length) {
    // compare 결과가 0 이하면 왼쪽 먼저 (같은 값이면 원래 순서 유지)
    if (compare(left[i], right[j]) <= 0) {
      result.push(left[i]);
      i++;
    } else {
      result.push(right[j]);
      j++;
    }
  }

  // 남은 것들 뒤에 붙이기
  while (i < left.length) {
    result.push(left[i]);
    i++;
  }
  while (j < right.length) {
    result.push(right[j]);
    j++;
  }

  return result;
}

// ---------------- 비교 함수 ----------------

// 최신 날짜가 앞으로 (날짜가 "YYYY-MM-DD" 형식이라 문자열 비교로 충분)
function byNewest(a, b) {
  if (a.date > b.date) return -1;
  if (a.date < b.date) return 1;
  return 0;
}

// 제목 알파벳 순
function byTitle(a, b) {
  if (a.title < b.title) return -1;
  if (a.title > b.title) return 1;
  return 0;
}

// ---------------- 화면에 그리기 ----------------

function renderGallery(list) {
  const gallery = document.getElementById("gallery");
  gallery.innerHTML = "";

  for (let k = 0; k < list.length; k++) {
    const photo = list[k];
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML =
      '<img src="' + photo.src + '" alt="' + photo.title + '">' +
      '<div class="info"><span>' + photo.title + "</span><span>" + photo.date + "</span></div>";
    gallery.appendChild(card);
  }

  // 정렬된 순서를 글자로도 보여주기 (예: Alley → Night → Beach)
  const names = list.map(function (p) { return p.title; });
  document.getElementById("order").textContent = names.join(" → ");
}

function gallerySort(sortType) {
  let compare;
  if (sortType === "title") {
    compare = byTitle;
  } else {
    compare = byNewest;
  }

  const sorted = mergeSort(photos, compare);
  renderGallery(sorted);

  // 누른 버튼 색 바꾸기
  document.getElementById("newest").classList.toggle("active", sortType === "newest");
  document.getElementById("title").classList.toggle("active", sortType === "title");
}

// 버튼 연결
document.getElementById("newest").onclick = function () { gallerySort("newest"); };
document.getElementById("title").onclick = function () { gallerySort("title"); };

// 처음 열었을 때는 최신순
gallerySort("newest");
