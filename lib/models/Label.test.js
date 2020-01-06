const mongoose = require('mongoose');
const Label = require('./Label');

describe('Label Model', () => {
  it('has a required name', () => {
    const label = new Label({});
    const { errors } = label.validateSync();
    expect(errors.name.message).toEqual('Path `name` is required.');
  });
  it('has a name and directions field', () => {
    const label = new Label({
      name: 'Arbitrary Signs',
      address: [ 
        { city: 'Northampton' },
        { state: 'Massachusetts' },
        { country: 'USA' }
      ] 
    });

    expect(label.toJSON()).toEqual({
      _id: expect.any(mongoose.Types.ObjectId),
      name: 'Arbitrary Signs',
      address: [ 
        { city: 'Northampton' },
        { state: 'Massachusetts' },
        { country: 'USA' }
      ] 
    });
  });
});
