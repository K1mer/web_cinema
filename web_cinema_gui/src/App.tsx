import { Playlist, Users, Video } from './widgets';

import './App.scss';


function App() {
  return (
    <div className = 'App'>
      <header className = 'App-header'>
        <div className = 'HorizontalFlex cinema-container'>
          <Video/>
          <div className = 'VerticalFlex right-panel-container'>
            <Users/>
            <Playlist/>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;