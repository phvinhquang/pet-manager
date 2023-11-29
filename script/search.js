"use strict";

const tableBodySearchEl = document.getElementById("tbody-search");
const btnFind = document.getElementById("find-btn");
const idInputSearch = document.getElementById("input-id");
const nameInputSearch = document.getElementById("input-name");
const typeInputSearch = document.getElementById("input-type");
const breedInputSearch = document.getElementById("input-breed");
const vaccinatedInputSearch = document.getElementById("input-vaccinated");
const dewormedInputSearch = document.getElementById("input-dewormed");
const sterilizedInputSearch = document.getElementById("input-sterilized");

// Render lần đầu load trang
renderTabeleData(petArr);
showChosenBreeds();
breedOptions();

// Hàm hiển thị toàn bộ danh sách thú cưng
function renderTabeleData(petArr) {
  tableBodySearchEl.innerHTML = "";

  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `
  <th scope="row">${petArr[i].id}</th>
  <td>${petArr[i].name}</td>
  <td>${petArr[i].age}</td>
  <td>${petArr[i].type}</td>
  <td>${petArr[i].weight} kg</td>
  <td>${petArr[i].length} cm</td>
  <td>${petArr[i].breed}</td>
  <td>
    <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
  </td>
  <td><i class= "bi ${
    petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
  }"></i></td>
  <td><i class= "${
    petArr[i].dewormed ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
  }"></i></td>
  <td><i class= "${
    petArr[i].sterilized ? "bi bi-check-circle-fill" : "bi bi-x-circle-fill"
  }"></i></td>
  <td>${petArr[i].date}</td>`;
    tableBodySearchEl.appendChild(row);
  }
}

//Hiển thị breed trên màn hình quản lý thú cưng
function breedOptions() {
  //Xóa content của input breed rồi thêm content theo type input
  breedInputSearch.innerHTML = "";
  breedInputSearch.insertAdjacentHTML(
    "afterbegin",
    `<option>Select Breed</option>`
  );

  const chose = typeInputSearch.value;
  if (chose === "Dog") {
    showChosenBreeds("Dog");
  } else if (chose === "Cat") {
    showChosenBreeds("Cat");
  } else if (chose === "Select Type") {
    showChosenBreeds();
  }
  ``;
}

//Sự kiện khi nhấn vào nút Find
btnFind.addEventListener("click", function () {
  let petArrFind = [...petArr];

  if (idInputSearch.value) {
    petArrFind = petArr.filter((pet) =>
      pet.id.toLowerCase().includes(idInputSearch.value.toLowerCase())
    );
  }

  if (nameInputSearch.value) {
    petArrFind = petArrFind.filter((pet) =>
      pet.name.toLowerCase().includes(nameInputSearch.value.toLowerCase())
    );
  }

  if (typeInputSearch.value !== "Select Type") {
    petArrFind = petArrFind.filter((pet) => pet.type === typeInputSearch.value);
  }

  if (breedInputSearch.value !== "Select Breed") {
    petArrFind = petArrFind.filter(
      (pet) => pet.breed === breedInputSearch.value
    );
  }

  if (vaccinatedInputSearch.checked) {
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  }
  if (dewormedInputSearch.checked) {
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  }
  if (sterilizedInputSearch.checked) {
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);
  }

  renderTabeleData(petArrFind);
});

