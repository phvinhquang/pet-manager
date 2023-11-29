"use strict";

const tableBodyEditEl = document.getElementById("tbody-edit");
const editForm = document.getElementById("container-form");
const idInputEdit = document.getElementById("input-id");
const nameInputEdit = document.getElementById("input-name");
const ageInputEdit = document.getElementById("input-age");
const typeInputEdit = document.getElementById("input-type");
const weightInputEdit = document.getElementById("input-weight");
const lengthInputEdit = document.getElementById("input-length");
const colorInputEdit = document.getElementById("input-color-1");
const breedInputEdit = document.getElementById("input-breed");
const vaccinatedInputEdit = document.getElementById("input-vaccinated");
const dewormedInputEdit = document.getElementById("input-dewormed");
const sterilizedInputEdit = document.getElementById("input-sterilized");
const btnSubmitEdit = document.getElementById("submit-btn");

// Hàm hiển thị danh sách thú cưng trong edit
function renderTabeleData(petArr) {
  tableBodyEditEl.innerHTML = "";

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
  <td>${petArr[i].date}</td>
  <td>
    <button type="button" class="btn btn-warning btn--${i}" onclick="edit(${i})">Edit</button>
  </td>`;
    tableBodyEditEl.appendChild(row);
  }
}
renderTabeleData(petArr);

//Hàm Validate dữ liệu sau khi edit
function validateData(data) {
  let isValidated = true;

  if (data.id.trim() === "") {
    alert("There must be an ID");
    isValidated = false;
  }
  if (data.name.trim() === "") {
    alert("There must be a Name");
    isValidated = false;
  }
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    isValidated = false;
  }
  if (data.type === "Select Type") {
    alert("Please select Type!");
    isValidated = false;
  }

  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    isValidated = false;
  }
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    isValidated = false;
  }

  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    isValidated = false;
  }

  return isValidated;
}

//Event khi nhấn vào edit, hiển thị bảng edit
const btnsEdit = document.querySelectorAll(".btn-warning");

//Hàm khi click vào edit
function edit(i) {
  //Hiện form edit
  editForm.classList.remove("hide");

  //Đưa data vào form
  idInputEdit.value = petArr[i].id;
  nameInputEdit.value = petArr[i].name;
  ageInputEdit.value = petArr[i].age;
  typeInputEdit.value = petArr[i].type;
  weightInputEdit.value = petArr[i].weight;
  lengthInputEdit.value = petArr[i].length;
  colorInputEdit.value = petArr[i].color;
  breedOptions();
  breedInputEdit.value = `${petArr[i].breed}`;

  vaccinatedInputEdit.checked = petArr[i].vaccinated;
  dewormedInputEdit.checked = petArr[i].dewormed;
  sterilizedInputEdit.checked = petArr[i].sterilized;
}

//Event nút Submit Edit
btnSubmitEdit.addEventListener("click", function () {
  const data = {
    id: idInputEdit.value,
    name: nameInputEdit.value,
    age: parseInt(ageInputEdit.value),
    color: colorInputEdit.value,
    type: typeInputEdit.value,
    weight: weightInputEdit.value,
    length: lengthInputEdit.value,
    color: colorInputEdit.value,
    breed: breedInputEdit.value,
    vaccinated: vaccinatedInputEdit.checked,
    dewormed: dewormedInputEdit.checked,
    sterilized: sterilizedInputEdit.checked,
  };

  //Validate dữ liệu
  const validate = validateData(data);
  if (validate) {
    // Tìm index của pet đang edit
    const index = petArr.findIndex((obj) => obj.id === data.id);

    // Giữ nguyên added date
    data.date = petArr[index].date;

    //Cập nhật dữ liệu
    petArr[index] = data;
    saveToStorage("petArr", petArr);

    //Ẩn form
    editForm.classList.add("hide");

    //Cập nhật lại dữ liệu thú cưng
    renderTabeleData(petArr);
  }
});
