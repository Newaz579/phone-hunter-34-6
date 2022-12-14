const loadPhones = async(search, dataLimit) =>{
    const url = `https://openapi.programming-hero.com/api/phones?search=${search}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}

const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = ``;
    const showAll = document.getElementById('show-all'); //get show all button 
    if(dataLimit && phones.length > 10){
        phones = phones.slice(0, 10); //display 10 phones only...
        showAll.classList.remove('d-none');
    }
    else{
        showAll.classList.add('d-none');
    }
    const noPhone = document.getElementById('no-found-message'); //get no-message-found
    if(phones.length === 0){
        noPhone.classList.remove('d-none');
    }
    else{
        noPhone.classList.add('d-none');
    }
    phones.forEach(phone => {
        console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML = `
        <div class="card p-4">
        <img src="${phone.image}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${phone.phone_name}</h5>
          <p class="card-text">${phone.slug}.</p>
          <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Show Details</button>
        </div>
      </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    });
    // stop loader
    toggleSpinner(false);
}

const processSearch = (dataLimit) => {
    toggleSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchFieldValue = searchField.value;
    loadPhones(searchFieldValue, dataLimit);
}

document.getElementById('btn-search').addEventListener('click', function(){
    // start loader
    processSearch(10);
});

document.getElementById('search-field').addEventListener('keypress', function(e){
    if(e.key === 'Enter'){
        processSearch(10);
    }
})

const toggleSpinner = (isLoading) => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

//not the best way to load show all
document.getElementById('all-btn-show').addEventListener('click', function(){
    processSearch();
});

const loadPhoneDetails = async(id) =>{
    const url = `https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayPhoneDetail(data.data);
}

const displayPhoneDetail = (phone) =>{
    console.log(phone);
    const phoneDetailModalLavel = document.getElementById('phoneDetailModalLavel');
    phoneDetailModalLavel.innerText = phone.name;
    const phoneDetails = document.getElementById('phone-details');
    phoneDetails.innerHTML = `
        <p>Release Date: ${phone.releaseDate ? phone.releaseDate: 'No Release Date Found'}</p>
        <p>Others: ${phone.others ? phone.others.Bluetooth : 'No Bluetooth Information'}</p>
    `
}

loadPhones('apple');