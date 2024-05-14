import { shortenString } from "./shortenString.mjs";

export function renderSlideOne(post) {
  const slideOne = document.querySelector(".slide-one");
  const firstSlide = post[0];
  slideOne.href = "./post/index.html?id=" + firstSlide.id;
  slideOne.title = "Click to view article";
  slideOne.innerHTML = `<img class="slider-img" src="${
    firstSlide.media.url
  }" /><div class="slide-content"><h3 class="slider-title">${
    firstSlide.title
  }</h3><p>${shortenString(firstSlide.body, 25)}</p></div>`;
}

export function renderSlideTwo(post) {
  const slideTwo = document.querySelector(".slide-two");
  const secondSlide = post[1];
  slideTwo.href = "./post/index.html?id=" + secondSlide.id;
  slideTwo.title = "Click to view article";
  slideTwo.innerHTML = `<img class="slider-img" src="${
    secondSlide.media.url
  }" /><div class="slide-content"><h3 class="slider-title">${
    secondSlide.title
  }</h3><p>${shortenString(secondSlide.body, 25)}</p></div>`;
}

export function renderSlideThree(post) {
  const slideThree = document.querySelector(".slide-three");
  const thirdSlide = post[2];
  slideThree.href = "./post/index.html?id=" + thirdSlide.id;
  slideThree.title = "Click to view article";
  slideThree.innerHTML = `<img class="slider-img" src="${
    thirdSlide.media.url
  }" /><div class="slide-content"><h3 class="slider-title">${
    thirdSlide.title
  }</h3><p>${shortenString(thirdSlide.body, 25)}</p></div>`;
}
