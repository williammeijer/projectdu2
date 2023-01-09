
function click_filter_element (event) {
  let classList = event.currentTarget.classList;
  let check = classList.contains("selected")
  console.log(classList);
  console.log(check);

  if (check) {
      classList.remove("selected");
  } else {
      classList.add("selected");
  }

  update_programmes();


}



function create_filter_element (data) {
  const element = document.createElement("li");
    element.classList.add(data.class);
    data.parent.append(element);
    element.textContent = data.textContent;
    element.addEventListener("click", click_filter_element);

    
    return element;
 
}

function add_group_toggling (filter_container_dom) {

}


function toggle_cities (event) {

}


// Create_countries_cities_filters är en function som skapar filter för countries och cities baserat på en array av country objekt och en array av city objekt.
// Create_country tar in ett country objekt och skapar ett div element med classen "country" och "filter_container" och ett ID av "country_" följd av country's ID. Den lägger sedan till detta element till ett ul-element i ett överordnat element med ID "country_filter". InnerHTML för det skapade div-elementet ställs sedan in på att inkludera ett h1-element med landets namn och ett ul-element med klassen "filter_list"
// Create_city tar in ett city objekt och skapar ett filter element med classen "selected", textinnehåll lika med stadens namn, och ett dataattribut "id" satt till stadens ID. Detta filterelement läggs till ett ul-element i ett överordnat element med ID:t "country_" följt av stadens lands-ID.
function create_countries_cities_filters () {
  function create_country (country) {
    const dom = document.createElement("div");
    dom.classList.add("country");
    dom.classList.add("filter_container");
    dom.id = "country_" + country.id;
    document.querySelector("#country_filter > ul").append(dom);
    
    dom.innerHTML = `
      <h1>${country.name}</h1>
      <ul class="filter_list"></ul>
    `;
    
    const cities = array_filter(CITIES, test_function);
    function test_function (city) {
      return city.countryID === country.id;
    }

    array_each(cities, create_city);
  }
  function create_city (city) {

    const dom = create_filter_element({
      parent: document.querySelector(`#country_${city.countryID} > ul`),
      class: "selected",
      textContent: city.name,
    });
    dom.dataset.id = city.id;

  }

  array_each(COUNTRIES, create_country);
}



// Den här funktionen skapar en serie DOM-element baserade på en indatamatris av objekt, programspecifikationer och lägga till dem som underordnade element till ett överordnat element, förälder. Varje skapat element har en klass "selected" och dess textinnehåll ställs in på namnegenskapen för motsvarande objekt i programSpecs. Dessutom sätts ett id-attribut på elementet, med dess värde som id-egenskapen för objektet. Funktionen använder en hjälpfunktion, create_filter_element, för att skapa DOM-elementet och tillämpa det angivna klassen och textinnehållet, men det framgår inte av den medföljande koden vilka andra operationer denna hjälpfunktion utför.

function create_filter(programmesSpecs, parent) {
  function create_element(data) {
    const dom = create_filter_element({
      parent: parent,
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id=filter.id;
  }
  array_each(programmesSpecs, create_element);
}



function create_programme (programme) {
  let uni = UNIVERSITIES.find(function (uni) {
    if (uni.id == programme.universityID) return true;
});

let city = CITIES.find(function (city) {
    if (city.id == uni.cityID) return true;
});

let country = COUNTRIES.find(function (country) {
    if (country.id == city.countryID) return true;
});

let subject = SUBJECTS.find(function (subject) {
    if (subject.id == programme.subjectID) return true;
});

let language = LANGUAGES.find(function (language) {
    if (language.id == programme.languageID) return true;
});

let level = LEVELS.find(function (level) {
    if (level.id == programme.levelID) return true;
});

let newProgramme = document.createElement("li");

newProgramme.innerHTML =
`<h1>${programme.name}</h1><p>${uni.name}</p><p>${city.name},${country.name}</p><p>${level.name}, ${subject.name}, ${language.name}</p>`;

document.querySelector("#programmes>ul").append(newProgramme)

}



function update_programmes () {
  let programmesArray = read_filters();
  console.log(programmesArray);

  if (programmesArray.length < 1) {
  
      document.querySelector('#programmes > p').style.display = 'block';
  } else {
      document.querySelector('#programmes > p').style.display = 'none';
  }
  
  let programmesContainer = document.querySelector("#programmes > ul");
  programmesContainer.innerHTML = "";
  
  programmesArray.forEach(function (programme) {
      create_programme(programme)
  }
  );

}


//Read_filters är en funktion som läser de valda filtren från DOM och returnerar en array av program som matchar de valda filtren. Den gör detta genom att först välja alla listelement med klassen "selected" inom elementen med ID "country_filter", "level_filter", "language_filter" och "subject_filter" och lagra dem i variablerna city_selected_dom, level_selected_dom, language_selected_dom och subject_selected_dom.
//Funktionen definierar sedan flera callback-funktioner som ska skickas som argument till array_each-funktionen, som itererar över en array och anropar den tillhandahållna callback-funktionen på varje element. Dessa återuppringningsfunktioner extraherar "id"-dataattributet från varje DOM-element och skickar det till en array av ID:n för respektive filter (antingen stads-ID, nivå-ID, språk-ID eller ämnes-ID).
//Därefter skapar funktionen en array av universitet som matchar de valda stads-ID:n genom att iterera över arrayen city_id_selected och UNIVERSITIES-arrayen och lägga till varje universitet med ett matchande stads-ID till universitetsarrayen. Den skapar sedan en array av program genom att anropa array_each-funktionen på universitetsarrayen, skicka in en callback-funktion som itererar över PROGRAM-arrayen och lägger till varje program med ett matchande universitets-ID till programarrayen.
//Funktionen filtrerar sedan programmatrisen med hjälp av array_filter-funktionen och callback funktioner som testar om programmets nivå-ID, språk-ID eller ämnes-ID finns i respektive matris av valda ID:n.
//Slutligen filtrerar funktionen programmatrisen igen genom att söka efter en matchning med en söksträng som anges i ett sökfältselement. Om söksträngen inte är tom anropas array_filter-funktionen på program-arrayen med en callback-funktion som testar om programmets namn innehåller söksträngen. Den slutliga programmatrisen returneras sedan.

function read_filters () {
  
  const city_selected_dom = document.querySelectorAll("#country_filter li.selected");

  const city_id_selected = [];
  function callback_add_cityID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    city_id_selected.push(id_as_integer);
  }
  array_each(city_selected_dom, callback_add_cityID);

  const universities = [];
  for (let i = 0; i < city_id_selected.length; i++) {
    const city_id = city_id_selected[i];
    for (let ii = 0; ii < UNIVERSITIES.length; ii++) {
      const university = UNIVERSITIES[ii];
      if (university.cityID === city_id) {
        universities.push(university);
      }
    }
  }

  let programmes = [];
  function callback_add_programmes (university) {
    const university_id = university.id;
    for (let i = 0; i < PROGRAMMES.length; i++) {
      const programme = PROGRAMMES[i];
      if (programme.universityID === university_id) {
        programmes.push(programme);
      }
    }
  }
  array_each(universities, callback_add_programmes);



  const level_selected_dom = document.querySelectorAll("#level_filter li.selected");
  const level_id_selected = [];
  function callback_add_levelID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    level_id_selected.push(id_as_integer);
  }
  array_each(level_selected_dom, callback_add_levelID);

  function test_function_level (programme) {
    return level_id_selected.includes(programme.levelID);
  }
  programmes = array_filter(programmes, test_function_level);



  const language_selected_dom = document.querySelectorAll("#language_filter li.selected");
  const language_id_selected = [];
  function callback_add_languageID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    language_id_selected.push(id_as_integer);
  }
  array_each(language_selected_dom, callback_add_languageID);



  function test_function_language (programme) {
    return language_id_selected.includes(programme.languageID);
  }
  programmes = array_filter(programmes, test_function_language);



  const subject_selected_dom = document.querySelectorAll("#subject_filter li.selected");
  const subject_id_selected = [];
  function callback_add_subjectID (dom_element) {
    const id_as_integer = parseInt(dom_element.dataset.id);
    subject_id_selected.push(id_as_integer);
  }
  array_each(subject_selected_dom, callback_add_subjectID);



  function test_function_subject (programme) {
    return subject_id_selected.includes(programme.subjectID);
  }
  programmes = array_filter(programmes, test_function_subject);



  const search_string = document.querySelector("#search_field input").value;
  if (search_string !== "") {
    function test_function (programme) {
      return programme.name.includes(search_string);
    }
    programmes = array_filter(programmes, test_function);
  }

  return programmes;
}