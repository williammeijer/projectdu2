"use strict";



createFilterElements(LEVELS, document.querySelector("#level_filter > ul"));
createFilterElements(SUBJECTS, document.querySelector("#subject_filter > ul"));
createFilterElements(LANGUAGES, document.querySelector("#language_filter > ul"));
create_countries_cities_filters();

document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();
