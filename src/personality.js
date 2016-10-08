import * as T from './constants/tags';
const tags = {
  FRIENDS : 0,
  ROMANCE : 0,
  FAMILY : 0,
  SCHOOL : 0,
  WORK : 0,
  SPORTS : 0,
  ARTS : 0,
  HOBBY : 0,
  LEISURE : 0,
  FOOD : 0,
  CHORE : 0
}
setQuestionArray();
manuallyTestTags();
console.log("ran calendar test");
function manuallyTestTags(){
  var quArray = setQuestionArray();
  updateTags(quArray[0].high, quArray[0].high, 0);
}
function updateTags(high, low, ans){
  high.forEach(function(tagName){
    tags[tagName] += ans;
  });
  low.forEach(function(tagName){
    tags[tagName] -= ans;
  });
}

function setQuestionArray(){
  var quArray = [];
  var numQuestions = 11; //hardcoded, for hardcoded questions
  quArray.push(returnQuestionSet(
    "You are a competitive person",
    [T.FRIENDS, T.SCHOOL, T.WORK],
    [T.HOBBY, T.ARTS, T.ROMANCE]));
  quArray.push(returnQuestionSet(
    "You consider yourself an introvert.",
    [T.HOBBY, T.ARTS, T.CHORE, T.FOOD],
    [T.FRIENDS, T.ROMANCE, T.FAMILY, T.SPORTS]);
  quArray.push(returnQuestionSet(
    "You like spending your free time just laying back and relaxing.",
    [T.FRIENDS, T.ROMANCE, T.FOOD],
    [T.FAMILY, T.SPORTS, T.SCHOOL, T.HOBBY, T.CHORE]);
  quArray.push(returnQuestionSet(
    "You consider yourself an outdoor-sy person",
    [T.SPORTS, T.FRIENDS, T.ROMANCE],
    [T.FAMILY, T.ARTS, T.HOBBY, T.CHORE]);
  quArray.push(returnQuestionSet(
    "You commonly find time to see close friends.",
    [T.FAMILY, T.ROMANCE],
    [T.FRIENDS]);
  quArray.push(returnQuestionSet(
    "You can't relax when there is a deadline coming up.",
    [T.SCHOOL, T.WORK, T.CHORE],
    [T.FRIENDS, T.ROMANCE, T.FAMILY, T.SPORTS, T.ARTS, T.HOBBY, T.LEISURE]);
  quArray.push(returnQuestionSet(
    "You prefer a simple dinner with family over going out with friends to eat.",
    [T.FAMILY],
    [T.FRIENDS]);
  quArray.push(returnQuestionSet(
    "You find hobbies more important than reading away at textbooks.",
    [T.SPORTS, T.HOBBY, T.ARTS],
    [T.WORK, T.SCHOOL]);
  quArray.push(returnQuestionSet(
    "You dont mind missing a small deadline or two.",
    [T.FRIENDS, T.ROMANCE, T.LEISURE],
    [T.WORK, T.SCHOOL]);
  quArray.push(returnQuestionSet(
    "You find it calming to work on a side project.",
    [T.HOBBY, T.ARTS],
    [T.LEISURE]);
  quArray.push(returnQuestionSet(
    "You have a tendency to procrastinate.",
    [T.WORK, T.SCHOOL, T.CHORE],
    [T.FRIENDS, T.ROMANCE, T.LEISURE, T.FOOD]);

  return quArray;
}
function returnQuestionSet(question, high, low){
  return {
    question: question,
    high: high,
    low: low
  };
}

