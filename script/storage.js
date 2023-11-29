"use strict";

// Query ở đây để element có thể dùng chung tại các script khác
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyHomeEl = document.getElementById("tbody--home");
const tableBodyBreedEl = document.getElementById("tbody--breed");

const healthyBtn = document.getElementById("healthy-btn");
const calcBmiBtn = document.getElementById("calcBMI-btn");
const bmiEl = document.querySelector(".bmi");

// Hàm lưu trữ dữ liệu nhập vào localstorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Hàm lấy dữ liệu từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// breedArr lưu dữ liệu lấy từ trong local storage
const breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
// petArr lưu dữ liệu lấy từ trong local storage
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];

function showChosenBreeds(type) {
  //Lọc breedArr theo chó hoặc mèo
  const filteredBreed = breedArr.filter(function (obj) {
    if (!type) {
      return obj;
    }

    if (obj.type === type) {
      return obj;
    }
  });

  //Hiển thị các giống được chọn theo chó hoặc mèo
  filteredBreed.forEach((_, i) =>
    breedInput.insertAdjacentHTML(
      "beforeend",
      `<option>${filteredBreed[i].breed}</option>`
    )
  );
}

// Hiển thị breed trên màn hình quản lý thú cưng
// Hiển thị toàn bộ breed khi load trang lần đầu
showChosenBreeds();
function breedOptions() {
  //Xóa content của input breed rồi thêm content theo type input
  breedInput.innerHTML = "";
  breedInput.insertAdjacentHTML("afterbegin", `<option>Select Breed</option>`);

  const chose = typeInput.value;
  if (chose === "Dog") {
    showChosenBreeds("Dog");
  } else if (chose === "Cat") {
    showChosenBreeds("Cat");
  } else if (chose === "Select Type") {
    showChosenBreeds();
  }
}

