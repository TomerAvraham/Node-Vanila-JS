const tableBody = document.querySelector("[data-table-body]");
const formElement = document.querySelector("[data-user-form]");
const fullNameInput = document.querySelector("[data-user-fullname]");
const ageInput = document.querySelector("[data-user-age]");
const END_POINT = "http://localhost:3000/";

// axios
function getAllUsers() {
  fetch(END_POINT + "all")
    .then((res) => res.json())
    .then((users) => addUsersToTable(users));
}

function addUsersToTable(users) {
  console.log(users);
  const usersElement = users.map(
    (user) => `
        <tr>
            <td>${user.id}</td>
            <td>${user.firstName}</td>
            <td>${user.lastName}</td>
            <td>${user.age}</td>
        </tr>
    `
  );

  tableBody.innerHTML = usersElement.join("");
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
    .then((data) => addUsersToTable(data));
};

window.addEventListener("DOMContentLoaded", getAllUsers);
