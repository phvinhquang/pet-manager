"use strict";
const fileInput = document.getElementById("file-import");
const importBtn = document.querySelector(".btn-import");

// Hàm lưu trữ dữ liệu nhập vào localstorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
// Hàm lấy dữ liệu từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}
const petArr = JSON.parse(getFromStorage("petArr")) ?? [];

// Hàm import dữ liệu và lưu vào data base
importBtn.addEventListener("click", function () {
  const file = fileInput.files[0];
  console.log(file);

  if (file) {
    var reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      // document.getElementById("fileContents").innerHTML = evt.target.result;
      const importedData = JSON.parse(evt.target.result);
      // Kiểm tra nếu import data có 2 pet trùng id thì báo lỗi và không thực hiện tiếp bước sau
      const importedId = importedData.map((pet) => pet.id);
      const isDuplicated = importedData.length !== new Set(importedId).size;
      if (isDuplicated) {
        alert("Data được import có chứa id trùng, hãy kiểm tra và thử lại");
        return;
      }

      // Lưu dữ liệu được import vào local storage
      const newPetArr = [...petArr, ...importedData];
      saveToStorage("petArr", newPetArr);
      location.replace("../index.html");
    };
    reader.onerror = function (evt) {
      // document.getElementById("fileContents").innerHTML = "error reading file";
      alert("error reading file");
    };
  } else {
    alert("Không có file");
  }
});

function saveDynamicDataToFile() {
  const toDownload = JSON.stringify(petArr);

  var blob = new Blob([toDownload], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "pet-list.json");
}
