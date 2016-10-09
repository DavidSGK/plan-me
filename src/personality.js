import * as T from './constants/tags';

export const genTags = () => ({
  FRIENDS : 0,
  SCHOOL : 0,
  WORK : 0,
  HOBBY : 0,
  ROMANCE : 0,
  FAMILY : 0,
  SPORTS : 0,
  ARTS : 0,
  LEISURE : 0,
  FOOD : 0,
  CHORE : 0
});

const tags = genTags();

export const questions = setQuestionArray();
// manuallyTestTags();
// var sorted = sortTags();

export function sortTags(tags) {
  //sort the tags
  var sortedArr = [];
  for (var i in tags){
    sortedArr.push([i, tags[i]]);
  }
  sortedArr.sort(function(a, b) {
      return b[1] - a[1];
  });
  for(var i = 0; i < sortedArr.length; i++){
    sortedArr[i][1] = i+1;
  }  
  var sorted = {};
  sortedArr.forEach(function(sortedElement){
    sorted[sortedElement[0]] = sortedElement[1];
  });
  return sorted;
}


// console.log(sorted);
// console.log(tags);
//UNCOMMENT ONCE COMBINED WITH THE MAIN.JS
//setTags(sorted); //function in the main.js, will error until then
function manuallyTestTags(){
  var quArray = setQuestionArray();
  updateTags(quArray[0].high, quArray[0].low, 1);
  updateTags(quArray[1].high, quArray[1].low, 1);
  updateTags(quArray[2].high, quArray[2].low, 2);
  updateTags(quArray[3].high, quArray[3].low, 0);
  updateTags(quArray[4].high, quArray[4].low, 2);
  updateTags(quArray[5].high, quArray[5].low, 2);
  updateTags(quArray[6].high, quArray[6].low, -2);
  updateTags(quArray[7].high, quArray[7].low, 0);
  updateTags(quArray[8].high, quArray[8].low, 1);
  updateTags(quArray[9].high, quArray[9].low, 1);
  updateTags(quArray[10].high, quArray[10].low, 0);
}
export function updateTags(high, low, ans, tags){
  high.forEach(function(tagName){
    tags[tagName] += parseInt(ans);
  });
  low.forEach(function(tagName){
    tags[tagName] -= parseInt(ans);
  });
  return tags;
}

function setQuestionArray(){
  var quArray = [];
  var numQuestions = 11; //hardcoded, for hardcoded questions
  quArray.push(returnQuestionSet(
    "You are a competitive person",
    [T.FRIENDS, T.SCHOOL, T.WORK],
    [T.ARTS, T.ROMANCE]));
  quArray.push(returnQuestionSet(
    "You consider yourself an introvert.",
    [T.HOBBY, T.ARTS, T.CHORE, T.FOOD],
    [T.FRIENDS, T.ROMANCE, T.FAMILY, T.SPORTS]));
  quArray.push(returnQuestionSet(
    "You like spending your free time just laying back and relaxing.",
    [T.FRIENDS, T.ROMANCE, T.FOOD],
    [T.FAMILY, T.SPORTS, T.SCHOOL, T.HOBBY, T.CHORE]));
  quArray.push(returnQuestionSet(
    "You consider yourself an outdoor-sy person",
    [T.SPORTS, T.FRIENDS, T.ROMANCE],
    [T.FAMILY, T.ARTS, T.HOBBY, T.CHORE]));
  quArray.push(returnQuestionSet(
    "You commonly find time to see close friends.",
    [T.FAMILY, T.ROMANCE],
    [T.FRIENDS]));
  quArray.push(returnQuestionSet(
    "You can't relax when there is a deadline coming up.",
    [T.SCHOOL, T.WORK, T.CHORE],
    [T.FRIENDS, T.ROMANCE, T.FAMILY, T.SPORTS, T.ARTS, T.LEISURE]));
  quArray.push(returnQuestionSet(
    "You prefer a simple dinner with family over going out with friends to eat.",
    [T.FAMILY],
    [T.FRIENDS]));
  quArray.push(returnQuestionSet(
    "You find hobbies more important than reading away at textbooks.",
    [T.SPORTS, T.HOBBY, T.ARTS],
    [T.WORK, T.SCHOOL]));
  quArray.push(returnQuestionSet(
    "You dont mind missing a small deadline or two.",
    [T.FRIENDS, T.ROMANCE, T.LEISURE],
    [T.WORK, T.SCHOOL]));
  quArray.push(returnQuestionSet(
    "You find it calming to work on a side project.",
    [T.HOBBY, T.ARTS],
    [T.LEISURE]));
  quArray.push(returnQuestionSet(
    "You have a tendency to procrastinate.",
    [T.WORK, T.SCHOOL, T.CHORE],
    [T.FRIENDS, T.ROMANCE, T.LEISURE, T.FOOD]));

  return quArray;
}
function returnQuestionSet(question, high, low){
  return {
    question,
    high,
    low,
  };
}
