// import egeBamyasi from '../lib/staticdata/ege_bamyasi.js';
const superagent = require('superagent');

const masterId = 11693;

    const getFullinfo = async(id) => {
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
  const arrayOfDataFromApi = dataFromApi.versions;
  arrayOfDataFromApi.push(dataFromApi);

  let arrayOfIds = [];
  arrayOfDataFromApi.forEach(element => {
    arrayOfIds.push(element.id);
  });

const arrayofFullRecordObjects = [];
    
    arrayOfIds.forEach(element => {
      const recordItem = getFullinfo(element);
      console.log (recordItem);
      const formattedRecordItem = [recordItem.id, recordItem.year, recordItem.lowest_price, recordItem.formats[0].name];
      arrayofFullRecordObjects.push(formattedRecordItem);
    });
    return arrayofFullRecordObjects;
};
const mamajamma = await makeArrayOfVersionsWithPrices(masterId);
console.log(mamajamma);
