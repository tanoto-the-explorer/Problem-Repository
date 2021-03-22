const decipher = (key, message) => {

let alphabetOrder = new Array(key.length); // array to store the order of key
let organisedMessage = new Array(key.length).fill(""); // array to organise the message to a box
let result = ""; // final cipher result

// FILTER MESSAGE
let filteredMessage = message.replace(/\s/g, '') // remove space
filteredMessage = filteredMessage.replace(/[^a-z]/gi, '') // only includes alphabet

// GET TOTAL ROW MESSAGE FOR PADDING
let rowLeft = 0;
let remainder = filteredMessage.length % key.length;
if(remainder != 0){ rowLeft = key.length - remainder }
// let totalRow = Math.ceil(filteredMessage.length / key.length) * key.length // get total row
// let rowLeft = totalRow - filteredMessage.length; // number of rows to pad

for (let a = 0; a < rowLeft; a++) {
  filteredMessage = filteredMessage.concat((a+10).toString(36)) // padding abcde...
}

// ORGANISE THE MESSAGE TO THE BOX
let cnt = 0
for(let b=0; b < filteredMessage.length; b++){
  if(b % key.length != 0){
    organisedMessage[cnt] = organisedMessage[cnt].concat(filteredMessage[b])
  } else { // if reach the end of the key, start a new row
    cnt = 0;
    organisedMessage[cnt] = organisedMessage[cnt].concat(filteredMessage[b])
  }
  cnt++;
}

let keyPosition;
let order = 0;
let min = 90; // to find negative number

// GET THE ORDER OF RESULT
for(let j=0; j < key.length; j++){
  for(let i=0; i < key.length; i++){
    if(key[i].charCodeAt(0) - 65 < min && !alphabetOrder[i] && alphabetOrder[i] != 0){ // if smallest letter from key and not flagged
      min = key[i].charCodeAt(0) - 65; // change current letter to smallest
      keyPosition = i; // current index
    }
  }

  // found the smallest letter
  alphabetOrder[keyPosition] = order // alphabetOrder[smallest letter] = 0, 1, 2 respectively
  order++; // increment order
  min=90; // reset
  result = result.concat(organisedMessage[keyPosition]); // concat the organised message of the smallest letter
}
  return result
}

let result = decipher('zebras', 'we are discovered. flee at once.') 
console.log("result of cipher is: " + result)
