const flagImage = document.querySelector('.country-details img');
const countryNameH1 = document.querySelector('.country-details h1');
const nativeName = document.querySelector('.native-name');
const population = document.querySelector('.population');
const region = document.querySelector('.region');
const subRegion = document.querySelector('.sub-region');
const capital = document.querySelector('.capital');
const topLevelDomain = document.querySelector('.top-level-domain');
const currencies = document.querySelector('.currencies');
const languages = document.querySelector('.languages');
const borderCountries = document.querySelector('.border-countries');



const countryName = new URLSearchParams(location.search).get('Name');

async function fetchCountryData() {
    try {
        // Fetch country data
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`);
        if (!response.ok) throw new Error('Country not found');
        
        const countries = await response.json();
        if (countries.length === 0) throw new Error('No country data found');

        const country = countries[0];

        // Update DOM elements with country data
        flagImage.src = country.flags.svg;
        countryNameH1.innerText = country.name.common;
        population.innerText = country.population.toLocaleString('en-IN');
        region.innerText = country.region;
        topLevelDomain.innerText = country.tld.join(', ');

        capital.innerText = country.capital?.[0] || 'No Capital In This Country';
        subRegion.innerText = country.subregion || 'No SubRegion In This Country';
        nativeName.innerText = country.name.nativeName ? Object.values(country.name.nativeName)?.[0].common : country.name.common;
        
        if (country.currencies) {
            currencies.innerText = Object.values(country.currencies).map((currency) => currency.name).join(', ');
        }
        else {
           currencies.innerText = 'No Currencie In This Country';
        }
        
        if (country.languages) {
            languages.innerText = Object.values(country.languages).join(', ');
        }
        

        // Fetch border countries if available
        if (country.borders) {
            await fetchBorders(country.borders);
        } else {
            borderCountries.innerText = 'No Borders In This Country';
        }
    } catch (error) {
        console.error(error);
    }
}

async function fetchBorders(borders) {
    for (const border of borders) {
        try {
            const borderResponse = await fetch(`https://restcountries.com/v3.1/alpha/${border}`);
            const borderCountry = await borderResponse.json();
            const borderCountryTag = document.createElement('a');

            // Add border country name and link to country page
            borderCountryTag.innerText = borderCountry[0].name.common;
            borderCountryTag.href = `country.html?Name=${borderCountry[0].name.common}`;
            borderCountryTag.classList.add('border-country-link');
            
            // Add the new anchor tag to the DOM
            borderCountries.append(borderCountryTag);
        } catch (error) {
            console.error('Error fetching border country:', error);
        }
    }
}

// Call the function to fetch the data
fetchCountryData();


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