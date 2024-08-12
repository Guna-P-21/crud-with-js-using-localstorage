document.addEventListener("DOMContentLoaded", function () {
    const modal = document.querySelector(".modal");
    const closeBtn = document.querySelector(".close");
    const tableBody = document.querySelector("#dataList");
    const dataForm = document.getElementById("dataForm");

    const nameInput = document.getElementById("nameInput");
    const ageInput = document.getElementById("ageInput");
    const genderSelect = document.getElementById("genderSelector");

    const editForm = document.getElementById("editForm");
    const editIndex = document.getElementById("editIndex");
    const editNameInput = document.getElementById("editNameInput");
    const editAgeInput = document.getElementById("editAgeInput");
    const editGenderSelect = document.getElementById("editGenderSelect");

    // To add a Data from Add Data Form..
    dataForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const name = nameInput.value.trim();
        const age = parseInt(ageInput.value);
        const gender = genderSelect.value;
        if (name !== "" && !isNaN(age) && gender !== "") {
            const user = {
                name : name,
                age : age,
                gender : gender,
            };
            addToLocalStorage(user);
            loadStoredData();
            dataForm.reset();
        } else {
            alert("Please Fill All Details.");
        }
    });

    // To edit button use for save Changes..
    editForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const index = editIndex.value.trim();
        const newName = editNameInput.value.trim();
        const newAge = parseInt(editAgeInput.value);
        const newGender = editGenderSelect.value;
        if (newName !== "" && !isNaN(newAge) && newGender !== "") {
            const storedData = JSON.parse(localStorage.getItem("myData")) || [];
            storedData[index].name = newName;
            storedData[index].age = newAge;
            storedData[index].gender = newGender;
            localStorage.setItem("myData", JSON.stringify(storedData));
            editForm.reset();
            modal.style.display = "none";
            loadStoredData();
        } else {
            alert("Please Fill All Details.");
        }
    });

    function addToLocalStorage(user) {
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        storedData.push(user);
        localStorage.setItem("myData", JSON.stringify(storedData));
    }

    loadStoredData();

    // edit Data Open
    function editData() {
        const index = this.dataset.index;
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        const data = storedData[index];
        editIndex.value = index;
        editNameInput.value = data.name;
        editAgeInput.value = data.age;
        editGenderSelect.value = data.gender;
        modal.style.display = "block";
    }

    // Delete Data from List of Array Object
    function deleteData() {
        if (confirm("Are You Sure to Delete ?")) {
            const index = this.dataset.index;
            const storedData = JSON.parse(localStorage.getItem("myData")) || [];
            storedData.splice(index, 1);
            localStorage.setItem("myData", JSON.stringify(storedData));
            loadStoredData();
        }
    }

    // Function to close the Modal using close btn
    closeBtn.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Function to close the Modal using modal window click
    window.addEventListener("click", function (e) {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    function loadStoredData () {
        const storedData = JSON.parse(localStorage.getItem("myData")) || [];
        tableBody.innerHTML = "";
        storedData.forEach(function (data, index) {
            const row = document.createElement("tr");
            row.innerHTML = `
               <td>${data.name}</td>
               <td>${data.age}</td>
               <td>${data.gender}</td>
               <td><button data-index="${index}" class="btnEdit">Edit</button></td>
               <td><button data-index="${index}" class="btnDelete">Delete</button></td>
            `;
            tableBody.appendChild(row);
        });
        const editButtons = document.querySelectorAll(".btnEdit");
        // Function to open the Model using Edit btn
        editButtons.forEach((btn) => {
        btn.addEventListener("click", editData);
    });

       const deleteButtons = document.querySelectorAll(".btnDelete");
        // Function to Delete the Data from the MyData..
        deleteButtons.forEach((btn) => {
        btn.addEventListener("click", deleteData);
    });
    }
});

/*
   [{"name":"Tiya","age":2,"gender":"Female"},{"name":"Ram","age":24,"gender":"Male"}]
*/