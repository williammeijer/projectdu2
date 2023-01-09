"use strict";



<<<<<<< Updated upstream
createFilterElements(LEVELS, document.querySelector("#level_filter > ul"));
createFilterElements(SUBJECTS, document.querySelector("#subject_filter > ul"));
createFilterElements(LANGUAGES, document.querySelector("#language_filter > ul"));
create_countries_cities_filters();

=======

/*

  Notice the images on the page header.

  G: The images can be hard-coded in the CSS (as background-image)
  VG: Every time the user selects / unselects one or more filter elements, the app
      shows three random images from all the possible country images.

*/


create_levels_filter();
create_subjects_filter();
create_language_filter();
create_countries_cities_filters();

function create_language_filter () {
  function create_element (data) {
    const dom = create_filter_element({
      parent: document.querySelector("#language_filter > ul"),
      class: "selected",
      textContent: data.name,
    });
    dom.dataset.id = data.id;
  }
  array_each(LANGUAGES, create_element);
}

function create_levels_filter () {
    function create_level (level) {
      const dom = create_filter_element({
        parent: document.querySelector("#level_filter > ul"),
        class: "selected",
        textContent: level.name,
      });
      dom.dataset.id = level.id;
    }
    array_each(LEVELS, create_level);
  }

  function create_subjects_filter () {
    function create_subject (subject) {
      const dom = create_filter_element({
        parent: document.querySelector("#subject_filter > ul"),
        class: "selected",
        textContent: subject.name,
      });
      dom.dataset.id = subject.id;
    }
    array_each(SUBJECTS, create_subject);
  }


>>>>>>> Stashed changes
document.querySelector("#search_field button").addEventListener("click", update_programmes);

// Initialise programmes list by calling relevant function
update_programmes();
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
