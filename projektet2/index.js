"use strict";




create_levels_filter(LEVELS, document.querySelector("#level_filter > ul"));
create_subjects_filter(SUBJECTS, document.querySelector("#subject_filter > ul"));
create_language_filter(LANGUAGES, document.querySelector("#language_filter > ul"));
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



document.querySelector("#search_field button").addEventListener("click", update_programmes);


update_programmes();
