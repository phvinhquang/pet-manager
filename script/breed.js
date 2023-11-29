"use strict";

const breedInputBreed = document.getElementById("input-breed");
const typeInputBreed = document.getElementById("input-type");
const btnSubmitBreed = document.getElementById("submit-btn--breed");
const btnDelBreed = document.querySelectorAll(".btn");

renderBreedTableData(breedArr);
//Hàm hiển thị breed list
function renderBreedTableData(arr) {
  tableBodyBreedEl.innerHTML = "";
  breedArr.forEach((obj, i) => {
    tableBodyBreedEl.insertAdjacentHTML(
      "beforeend",
      `
    <tr>
          <th>${i + 1}</th>
          <td>${obj.breed}</td>
          <td>${obj.type}</td>
          <td>
            <button type="button" class="btn btn-danger" onclick = deleteBreed(${i})>Delete</button>
          </td>
    </tr>`
    );
  });
}

//Hàm clear Input
function clearInputBreed() {
  breedInputBreed.value = "";
  typeInputBreed.value = "Select Type";
}

//Event khi nhấn vào Submit
btnSubmitBreed.addEventListener("click", function () {
  const data = {
    breed: breedInputBreed.value,
    type: typeInputBreed.value,
  };
  console.log(data);

  //Hàm Validate dữ liệu
  function validateBreed(arr) {
    let isValidated = true;
    if (data.breed.trim() === "") {
      alert("There must be a breed name");
      isValidated = false;
    }
    if (data.type === "Select Type") {
      alert("You must choose a type");
      isValidated = false;
    }
    return isValidated;
  }

  const validatedCheck = validateBreed(data);
  //Hiển thị dữ liệu sau khi validate
  if (validatedCheck) {
    breedArr.push(data);
    clearInputBreed();
    renderBreedTableData(breedArr);
  }

  // Đưa data vào storage
  saveToStorage("breedArr", breedArr);
});

//Xóa Breed
function deleteBreed(i) {
  if (confirm("Are you sure ?")) {
    //Xóa breed
    breedArr.splice(i, 1);

    //Cập nhật lại giao diện
    renderBreedTableData(breedArr);

    // Cập nhật lại storage
    saveToStorage("breedArr", breedArr);
  }
}
