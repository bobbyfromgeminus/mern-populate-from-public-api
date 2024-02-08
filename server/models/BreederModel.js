import mongoose from 'mongoose';

const BreederSchema = new mongoose.Schema({
    name: String,
    country: String,
    address: String,
    phone: String,
    email: String,
    web: String,
    breed_id: mongoose.Schema.Types.ObjectId,
    created: {
        type: Date,
        default: Date.now,
    },
});

const BreederModel = mongoose.model('Breeder', BreederSchema);
export default BreederModel;