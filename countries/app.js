const countryConta = document.querySelector('.countries-con');
const filterByRegion = document.querySelector('.filter-by-region')
const searchContainer = document.querySelector('.search-container')
let allCountriesData

fetch('https://restcountries.com/v3.1/all')
    .then((res) => res.json())
    .then((data) =>{
        renderCountries(data)
        allCountriesData = data
    }) 
        


    filterByRegion.addEventListener('change' ,(e) =>{
        e.preventDefault()
        fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
        .then((res) => res.json())
        .then(renderCountries)
    
        
    })

    function renderCountries(data){
        countryConta.innerHTML = " ";
        data.forEach((country) => {
            // console.log(country.flags.svg);
            
            const countryCard = document.createElement('a');
            countryCard.classList.add('country-card');
            countryCard.href =` /country.html?Name=${country.name.common}`
            
            countryCard.innerHTML =` <img src="${country.flags.svg}" alt="">
                           <div class="card-txt">
                            <h3 class="card-h">${country.name.common}</h3>
                            <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                            <p><b>Region: </b>${country.continents
                            }</p>
                            <p><b>Capital: </b>${country.capital}</p>
                           </div>`
            countryConta.append(countryCard)
            
        })
    }
    
searchContainer.addEventListener('input' ,(e) =>{
   const fillterCoun =  allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
    renderCountries(fillterCoun)
 })   
  const Dark = document.querySelector('.Drak')
  const Ligth = document.querySelector('.Ligth')


   Dark.addEventListener('click' ,(e)=>{
      e.preventDefault()
        document.body.classList.toggle('dark')
        Dark.style.display = "none";
        Ligth.style.display = "block";
         
    })

    Ligth.addEventListener('click' ,(e)=>{
        e.preventDefault()
          document.body.classList.remove('dark')
          Ligth.style.display = "none";
          Dark.style.display = "block";
           
      })
  




