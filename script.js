"use strict";
const navTitleEl = document.getElementById("sidebar-title");
const sidebarEl = document.getElementById("sidebar");

navTitleEl.addEventListener("click", function () {
  sidebarEl.classList.toggle("active");
});

renderTabeleData(petArr);

// Hàm xóa input
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

// Hàm hiển thị danh sách thú cưng
function renderTabeleData(petArr) {
  tableBodyHomeEl.innerHTML = "";

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
  <td class = "bmi-${i}">?</td>
  <td>${petArr[i].date}</td>
  <td>
    <button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
  </td>`;
    tableBodyHomeEl.appendChild(row);
  }
}

// Event khi ấn submit
submitBtn.addEventListener("click", function () {
  //Tạo Object data nhận input value
  const data = {
    id: idInput.value,
    name: nameInput.value,
    age: parseInt(ageInput.value),
    color: colorInput.value,
    type: typeInput.value,
    weight: weightInput.value,
    length: lengthInput.value,
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,

    //Hàm tính BMI
    calcBmi: function () {
      if (this.type === "Dog") {
        const dogBMI = (this.weight * 703) / this.length ** 2;
        return dogBMI.toFixed(2);
      }
      if (this.type === "Cat") {
        const catBMI = (this.weight * 886) / this.length ** 2;
        return catBMI.toFixed(2);
      }
    },

    date: new Date().toLocaleDateString(),
  };
  //Gọi hàm tính BMI và đẩy dữ liệu vào data
  const bmi = data.calcBmi();
  data.bmi = bmi;

  //Validate dữ liệu
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
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].id === data.id) {
        alert("ID must be unique!");
        isValidated = false;
      }
      break;
    }
    return isValidated;
  }

  const validate = validateData(data);
  // Thực hiện hiển thị danh sách thú cưng
  if (validate) {
    petArr.push(data);
    clearInput();
    renderTabeleData(petArr);
  }

  //Đẩy data vào Storage
  saveToStorage("petArr", petArr);
});

//Xóa 1 thú cưng
function deletePet(petId) {
  if (confirm("Are you sure ?")) {
    for (let i = 0; i < petArr.length; i++) {
      if (petId === petArr[i].id) {
        petArr.splice(i, 1);
      }
    }
  }
  renderTabeleData(petArr);
  //Đẩy data vào Storage
  saveToStorage("petArr", petArr);
}

let healthyCheck = true;
// Sự kiện nhấn nút show Healthy
healthyBtn.addEventListener("click", function () {
  if (healthyCheck) {
    //Tạo mảng Healthy Pet
    const healthyPetArr = [];
    // Duyệt, tìm Healthy Pet và push vào mảng Healthy
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
      renderTabeleData(healthyPetArr);
      healthyBtn.textContent = "Show All Pet";
      healthyCheck = false;
    }
  } else {
    renderTabeleData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = true;
  }
});

//Sự kiện khi nhấn vao nút Calculate BMI
calcBmiBtn.addEventListener("click", function () {
  if (healthyCheck) {
    for (let i = 0; i < petArr.length; i++) {
      document.querySelector(`.bmi-${i}`).textContent = petArr[i].bmi;
    }
  } else {
    // Tạo lại Healthy Pet Array
    const healthyPetArr = [];
    for (let i = 0; i < petArr.length; i++) {
      if (petArr[i].vaccinated && petArr[i].dewormed && petArr[i].sterilized) {
        healthyPetArr.push(petArr[i]);
      }
      renderTabeleData(healthyPetArr);
    }

    // Hiển thị BMI với Healthy Pet Array
    for (let i = 0; i < healthyPetArr.length; i++) {
      document.querySelector(`.bmi-${i}`).textContent = healthyPetArr[i].bmi;
    }
  }
});
