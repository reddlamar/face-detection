import Naviagation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import ParticlesBg from 'particles-bg'
import './App.css';
import { useState } from 'react';

const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: new Date(),
  }
};

function App() {
  const [input, setInput] = useState('');
  const [imageURL, setImageURL] = useState('');
  const [box, setBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: new Date(),
});

  const loadUser = (data) => {
    setUser({
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined,
    });
  };

  const onRouteChange = (route) => {
    if (route === 'signout') {
      setIsSignedIn(initialState.isSignedIn);
      setBox(initialState.box);
      setInput(initialState.input);
      setImageURL(initialState.imageURL);
      setRoute(initialState.route);
    } else if (route === 'home') {
      setIsSignedIn(true);
    }
    setRoute(route);
  };

  const calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  }

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    setImageURL(input);

    fetch('http://localhost:3000/imageURL', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          input: input,
      }),
    })
    .then(response => response.json())
    .then(data => {
      if (data) {
        fetch('http://localhost:3000/image', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              id: user.id,
          }),
        })
        .then(response => response.json())
        .then(count => setUser(user => ({...user, entries: count})))
        .catch(console.log);
      }
      displayFaceBox(calculateFaceLocation(data))
    })
    .catch(error => console.log('error', error));
  };

  return (
    <div className="App">
      <ParticlesBg type='cobweb' color='#2ff900' num={300} bg={true} className='particles' />
      <Naviagation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {
        route === 'home' ? 
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit} />
          {imageURL && <FaceRecognition imageURL={imageURL} box={box} />}
        </>
        : (
          route === 'signin' || route === 'signout' ?
          <Signin onRouteChange={onRouteChange} loadUser={loadUser} /> :
          <Register onRouteChange={onRouteChange} loadUser={loadUser} />
        )
      }
    </div>
  );
}

export default App;
