import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {

  const [food, setFood] = useState([]);

  useEffect(() => {
    axios.get('https://node-practice-3-5ada42a694c6.herokuapp.com/item')
    .then(res => {
      console.log(res.data.data)
      setFood(res.data.data);
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <React.Fragment>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Food</th>
            <th>Opinion</th>
          </tr>
        </thead>
        <tbody>
          {food.map(item => {
            return (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.food}</td>
                <td>{item.opinion}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </React.Fragment>
  );
}

export default App;
