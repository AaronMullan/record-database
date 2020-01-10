require('dotenv').config();
const { getArtist, getArtists } = require('../lib/helpers/data-helpers');

const request = require('supertest');
const app = require('../lib/app');

describe('artist routes', () => {
  it('can create a new artist', async() => {
    return request(app)
      .post('/api/v1/artists')
      .send({
        name: 'Sarah Louise',
        instrument: 'guitar',
        discogsId: 4289077
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          id: expect.any(String),
          name: 'Sarah Louise',
          instrument: 'guitar',
          discogsId: 4289077,
          __v: 0
        });
      });
  });
  it('can get all artists', async() => {
    const artists = await getArtists();
    return request(app)
      .get('/api/v1/artists')
      .then(res => {
        expect(res.body).toHaveLength(artists.length);
        artists.forEach(artist => {
          expect(res.body).toContainEqual(artist);
        });  
      });
  });
});
it('can find an artist by id', async() => {
  const artist = await getArtist();
  return request(app)
    .get(`/api/v1/artists/${artist._id}`)
    .then(res =>{
      expect(res.body).toEqual({
        _id: artist.id,
        id: artist.id,
        name: artist.name,
        instrument: artist.instrument,
        discogsId: artist.discogsId,
        records: expect.any(Array),
        __v: 0,
        dateofBirth: artist.dateofBirth,
        dateofDeath: artist.dateofDeath
      });
    });
});
