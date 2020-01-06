const superagent = require('superagent');


const getFormattedinfo = async(id) => {
  return superagent
    .get(`https://api.discogs.com/releases/${id}`)
    .then(res => res.body);
};

const makeArrayOfVersionsWithPrices = async function(masterId){

  const listOfItems = () => {
    return superagent
      .get(`https://api.discogs.com/masters/${masterId}/versions`)
      .then(res => res.body);
  };

  const dataFromApi = await listOfItems();
  console.log (dataFromApi);
  const arrayOfDataFromApi = dataFromApi.versions;
  arrayOfDataFromApi.push(dataFromApi);

  let arrayOfIds = [];
  arrayOfDataFromApi.forEach(element => {
    arrayOfIds.push(element.id);
  });
  
  const arrayofFormattedRecordArrays = [];
  for(let id of arrayOfIds) {
    const recordItem = await getFormattedinfo(id);
    const formattedRecordItem = [recordItem.id, recordItem.released, recordItem.lowest_price, recordItem.formats[0].name];
    arrayofFormattedRecordArrays.push(formattedRecordItem);
    console.log (arrayofFormattedRecordArrays);
    
  }
  return arrayofFormattedRecordArrays;


};
let finalArray;

const promise = makeArrayOfVersionsWithPrices([54841]);
//   .then (res => {
//     finalArray = res;
//   })();
// console.log(finalArray);
