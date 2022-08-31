// url fetching
const loadPhone = (searchText, dataLimit) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayPhone(data.data, dataLimit));
};

// data loading
const displayPhone = (phone, dataLimit) => {
  const phoneContainer = document.getElementById("Phone-container");
  phoneContainer.innerHTML = ``;

  // show all system
  const btnShowall = document.getElementById("btn-showAll");
  if (dataLimit && phone.length > 10) {
    phone = phone.slice(0, 10);
    btnShowall.classList.remove("hidden");
  } else {
    btnShowall.classList.add("hidden");
  }

  // no match found message
  const noPhoneFoundMessage = document.getElementById("no-phone-found-message");
  if (phone.length === 0) {
    noPhoneFoundMessage.classList.remove("hidden");
  } else {
    noPhoneFoundMessage.classList.add("hidden");
  }

  // geting array element
  phone.forEach((phones) => {
    const phoneDiv = document.createElement("div");
    phoneDiv.innerHTML = `
          <div class="max-w-sm rounded-lg overflow-hidden shadow-xl p-4">
            <img class="w-full" src="${phones.image}" alt="Mountain">
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2">${phones.phone_name}</div>
              <p class="text-gray-700 text-base">
                <h1>Egula shob amar phone hahahhaha</h1>
              </p>
              <button onclick="loadPhoneDetails('${phones.slug}')" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Details
              </button>
            </div>
        `;
    phoneContainer.appendChild(phoneDiv);
  });

  // toggle spinner is off
  toggleSpinner(false);
};

// search system function
const searchProcess = (dataLimit) => {
  toggleSpinner(true);
  const inputFiled = document.getElementById("input-field");
  const inputValue = inputFiled.value;
  loadPhone(inputValue, dataLimit);
};

// search system
document.getElementById("btn-search").addEventListener("click", function () {
  searchProcess(10);
});

// keybord input search
document
  .getElementById("input-field")
  .addEventListener("keypress", function (e) {
    if (e.key == "Enter") {
      searchProcess(10);
    }
  });

// toggle for preloader
const toggleSpinner = (isLoding) => {
  const toggleSpinner = document.getElementById("toggle-spinner");
  if (isLoding) {
    toggleSpinner.classList.remove("hidden");
  } else {
    toggleSpinner.classList.add("hidden");
  }
};

// loadPhone("a");

// pagination system
document.getElementById("btn-all").addEventListener("click", function () {
  searchProcess();
});

const loadPhoneDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => console.log(data.data));
};
