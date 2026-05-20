import http from 'k6/http'
import { sleep } from 'k6'

export const options = {
    vus: 111, //virtual users
    duration: '72s', // for 30 seconds
}

export default function () {
    // create a new item
    const data = { 
        name: 'Max Mustermann',
        email: 'max.must@mail.com'
     };

    const createRes = http.post('http://localhost:5000/api/v1/users', JSON.stringify(data), {
        headers: { 'Content-Type': 'application/json' },
    });

    http.get(`http://localhost:5000/api/v1/users`);

    const id = createRes.json('id');
    const updatedUser = {
        name: 'Jane Doe'
    };

    http.put(`http://localhost:5000/api/v1/users/${id}`, JSON.stringify(updatedUser),  {
        headers: {'Content-Type': 'application/json'},
    });

    sleep(1);
}