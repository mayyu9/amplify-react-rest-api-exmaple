import React, { useEffect, useState } from 'react';
import Amplify, { API } from 'aws-amplify';
import config from './aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import './App.css';

Amplify.configure(config);

const App = () => {
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [pets, setPets] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    API.post('petsapi', '/pets', {
      body: {
        name: petName,
        type: petType
      }
    }).then(() => {
      // setPets([...pets, ...fetchedPets])
      setPets([...pets, {'name': petName, 'type': petType }])
    })
  };

  useEffect(() => {
    API.get('petsapi', '/pets/name').then(petsRes => setPets([...pets, ...petsRes]));
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <form onSubmit={handleSubmit}>
          <input type="text" value={petName} onChange={e => setPetName(e.target.value)} />
          <input type="text" value={petType} onChange={e => setPetType(e.target.value)} />
          <button>AddPet</button>
        </form>
        Hello
        <ul>{
          pets.map(x => (
            <li>{x.name}</li>
          ))}</ul>
        <AmplifySignOut />
      </header>
    </div>
  );
}

export default withAuthenticator(App);
