// import egeBamyasi from '../lib/staticdata/ege_bamyasi.js';
const superagent = require('superagent');

const dummyData = `[{
    "status": "Accepted",
    "stats": {
        "community": {
            "in_collection": 176,
            "in_wantlist": 826
        }
    },
    "thumb": "",
    "format": "LP, Album",
    "country": "France",
    "title": "Ege Bamyasi",
    "label": "United Artists Records",
    "released": "1972",
    "major_formats": [
        "Vinyl"
    ],
    "catno": "UAS 29 414",
    "resource_url": "https://api.discogs.com/releases/1633198",
    "id": 1633198
},
{
    "status": "Accepted",
    "stats": {
        "community": {
            "in_collection": 91,
            "in_wantlist": 643
        }
    },
    "thumb": "",
    "format": "LP, Album",
    "country": "UK",
    "title": "Ege Bamyasi",
    "label": "United Artists Records",
    "released": "1972",
    "major_formats": [
        "Vinyl"
    ],
    "catno": "UAS 29414",
    "resource_url": "https://api.discogs.com/releases/6952919",
    "id": 6952919
}]`;


const listOfItems = async () => {
    return superagent
    .get(`https://api.discogs.com/masters/11693/versions`)
    .then(res => res.body);
};

const dataFromApi = await listOfItems();
const arrayOfDataFromApi = dataFromApi.versions;
arrayOfDataFromApi.push(dataFromApi);
console.log(arrayOfDataFromApi);
// const parsedegeBamyasi = JSON.parse(dummyData);

let arrayOfIds = [];
arrayOfDataFromApi.forEach(element => {
  arrayOfIds.push(element.id);
});
console.log(arrayOfIds);


const getFullinfo = async (id) => {
  return superagent
    .get(`https://api.discogs.com/releases/${id}`)
    .then(res => res.body);
};

const recordItem = await getFullinfo(6952919);

console.log(recordItem);

const formattedRecordItem = [recordItem.id, recordItem.year, recordItem.lowest_price, recordItem.formats[0].name]

console.log(formattedRecordItem);
