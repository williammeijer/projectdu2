

function array_find (array, test_function) {
  for (let i = 0; i < array.length; i++) {
    if (test_function(array[i])) {
      return array[i];
    } 
  }
}

function array_filter (array, test_function) {
  let result = [];
  for (let i = 0; i < array.length; i++) {
    if (test_function(array[i])) {
      result.push(array[i]);
    } 
  }
  return result;
}

function array_each (array, callback) {
  let index = 0;
  for (let i = 0; i < array.length; i++) {
    callback(array[i]);
  }
}



function array_average (array) {
  let sum = 0;
  array.forEach(x => sum += x);
  return ("" + (sum/array.length)).substring(0, 4);
}

function array_random_element (array) {
  const random_index = get_random_number(array.length);
  return array[random_index];
}