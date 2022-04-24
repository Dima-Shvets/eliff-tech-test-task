import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001';


export async function fetchAllBanks() {
    const { data } = await axios.get('/banks');
    return data
}

export async function addNewBank(newBank) {
    const { data } = await axios.post('/banks', newBank);
    return data
}

export async function deleteBankById(id) {
    await axios.delete(`/banks/${id}`);
}

