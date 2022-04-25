import axios from 'axios';

axios.defaults.baseURL = 'https://cryptic-atoll-50941.herokuapp.com/api';


export async function fetchAllBanks() {
    const { data } = await axios.get('/banks')
    return data.payload.banks
}

export async function addNewBank(newBank) {
    const { data } = await axios.post('/banks', newBank);
    return data.payload.bank
}

export async function deleteBankById(id) {
    await axios.delete(`/banks/${id}`);
}

export async function editBankById(editedBank) {
    const { data } = await axios.put(`/banks/${editedBank._id}`, editedBank);
    console.log(data)
    return data.payload.bank
}

