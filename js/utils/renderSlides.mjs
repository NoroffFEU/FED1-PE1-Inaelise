import { shortenString } from "./shortenString.mjs";

export function renderSlideOne(post) {
  const slideOne = document.querySelector(".slide-one");
  const firstSlide = post[0];
  slideOne.href = "./post/index.html?id=" + firstSlide.id;
  slideOne.title = "Click to view article";
  slideOne.setAttribute("aria-label", "Link");
  slideOne.innerHTML = `
    <img class="slider-img" src="${firstSlide.media.url}" />
    <div class="slide-content">
      <h2 class="slider-title">${firstSlide.title}</h2>
      <p class="slider-body">${shortenString(firstSlide.body, 50)}</p>
      <div class="read-more-container">
        <p class="read-more">read more</p>
        <i class="fa-solid fa-arrow-right-long read-arrow"></i>
      </div>
    </div>`;
}

export function renderSlideTwo(post) {
  const slideTwo = document.querySelector(".slide-two");
  const secondSlide = post[1];
  slideTwo.href = "./post/index.html?id=" + secondSlide.id;
  slideTwo.title = "Click to view article";
  slideTwo.setAttribute("aria-label", "Link");
  slideTwo.innerHTML = `
    <img class="slider-img" src="${secondSlide.media.url}" />
    <div class="slide-content">
      <h2 class="slider-title">${secondSlide.title}</h2>
      <p class="slider-body">${shortenString(secondSlide.body, 50)}</p>
      <div class="read-more-container">
        <p class="read-more">read more</p>
        <i class="fa-solid fa-arrow-right-long read-arrow"></i>
      </div>
    </div>`;
}

export function renderSlideThree(post) {
  const slideThree = document.querySelector(".slide-three");
  const thirdSlide = post[2];
  slideThree.href = "./post/index.html?id=" + thirdSlide.id;
  slideThree.title = "Click to view article";
  slideThree.setAttribute("aria-label", "Link");
  slideThree.innerHTML = `
    <img class="slider-img" src="${thirdSlide.media.url}" />
    <div class="slide-content">
      <h2 class="slider-title">${thirdSlide.title}</h2>
      <p class="slider-body">${shortenString(thirdSlide.body, 50)}</p>
      <div class="read-more-container">
        <p class="read-more">read more</p>
        <i class="fa-solid fa-arrow-right-long read-arrow"></i>
      </div>
    </div>`;
}
