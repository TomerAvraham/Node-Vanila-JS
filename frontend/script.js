const tableBody = document.querySelector("[data-table-body]");
const formElement = document.querySelector("[data-user-form]");
const fullNameInput = document.querySelector("[data-user-fullname]");
const ageInput = document.querySelector("[data-user-age]");
const editModal = document.querySelector("[data-edit-modal]");
const END_POINT = "http://localhost:3000/";

// axios
function getAllUsers() {
  fetch(END_POINT + "all")
    .then((res) => res.json())
    .then((users) => renderUsers(users));
}

// delete function
function deleteUser(id) {
  console.log("in");
  fetch(END_POINT + `delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then(renderUsers);
}

// need to add something
function renderUsers(users) {
  console.log(users);
  const usersElement = users.map(
    (user) => `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
            <td><span onclick="deleteUser('${user.id}')">X</span></td>
            <td><span onclick="showModal('${user.firstName}', 
            '${user.lastName}', ${user.age}, '${user.id}')">Edit</span></td>
        </tr>
    `
  );

  tableBody.innerHTML = usersElement.join("");
}

const editModalFirstName = document.querySelector('[data-edit-modal-firstName]')
const editModalLatName = document.querySelector('[data-edit-modal-lastName]')
const editModalAge = document.querySelector('[data-edit-modal-age]')
const editModalForm = document.querySelector('[data-edit-modal-form]')


let userUpdateId;

function showModal(firstName, lastName, age, userId) {
  userUpdateId = userId
  editModal.style.display = "flex"
  editModalFirstName.value = firstName
  editModalLatName.value = lastName
  editModalAge.value = age
}

editModalForm.onsubmit = (e) => {
  e.preventDefault()

  console.log(userUpdateId);

  fetch(END_POINT + `update/${userUpdateId}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: editModalFirstName.value,
      lastName: editModalLatName.value,
      age: editModalAge.value
    })
  }).then((res) => res.json())
  .then(renderUsers)

  editModal.style.display = "none"
}

formElement.onsubmit = (e) => {
  e.preventDefault();

  const body = {
    fullName: fullNameInput.value,
    age: ageInput.value,
  };

  fetch(END_POINT + "create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((res) => res.json())
    .then((data) => renderUsers(data));
};

window.addEventListener("DOMContentLoaded", getAllUsers);
