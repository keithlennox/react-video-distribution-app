import React, { useState, useContext } from 'react';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import Login from './Login';
import Navigation from './Navigation';
import Dashboard from './Dashboard';
import Assets from './Assets';
import Template from './Template';
import Schedules from './Schedules';
import Schedule from './Schedule';
import Restores from './Restores';
import Instances from './Instances';
import Collection from './Collection';
import Admin from './Admin';
import Context from './Context';
import './App.css';

const initialUsers = [
  {
    username: 'wiligan',
    password: '************',
    email: 'wiligan@tvo.org',
    group: 'TVO',
    role: 'Admin'
  },
  {
    username: 'klennox',
    password: '************',
    email: 'klennox@tvo.org',
    group: 'TVO',
    role: 'Admin'
  },
  {
    username: 'creyes',
    password: '************',
    email: 'creyes@tvo.org',
    group: 'TVOKids',
    role: 'Standard'
  },
  {
    username: 'schristenson',
    password: '************',
    email: 'schristenson@tvo.org',
    group: 'CAD',
    role: 'Standard'
  },
  {
    username: 'vtagareli',
    password: '************',
    email: 'vtagareli@tvo.org',
    group: 'TVOKids',
    role: 'Standard'
  },
  {
    username: 'psherrard',
    password: '************',
    email: 'psherrard@tvo.org',
    group: 'ILC',
    role: 'Standard'
  },
  {
    username: 'gcraven',
    password: '************',
    email: 'gcraven@tvo.org',
    group: 'TVOKids',
    role: 'Standard'
  },
  {
    username: 'rmichael',
    password: '************',
    email: 'rmichael@tvo.org',
    group: 'CAD',
    role: 'Standard'
  },
  {
    username: 'rfreeman',
    password: '************',
    email: 'rfreeman@tvo.org',
    group: 'CAD',
    role: 'Standard'
  },
  {
    username: 'radams',
    password: '************',
    email: 'radams@tvo.org',
    group: 'ILC',
    role: 'Standard'
  }
]

const initialCollection = [
  {
    id: '2345674',
    series: 'Paw Patrol',
    title: 'Pups Take Charge',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Compubot',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '8765432',
    series: 'Odd Squad',
    title: 'The case of the missing bike',
    status: 'Not Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5678567',
    series: 'Wild Kratts',
    title: 'Tigers',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5634373',
    series: 'Odd Squad',
    title: 'Project Orange',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Paw Patrol',
    title: 'Pups To The Rescue',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5678567',
    series: 'Wild Kratts',
    title: 'Wolf Hawks',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Dumpster Diving',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Search Partly',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '2355722',
    series: 'Wild Kratts',
    title: 'Elephants',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '2345674',
    series: 'Paw Patrol',
    title: 'Pups Take Charge',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Compubot',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '8765432',
    series: 'Odd Squad',
    title: 'The case of the missing bike',
    status: 'Not Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5678567',
    series: 'Wild Kratts',
    title: 'Tigers',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5634373',
    series: 'Odd Squad',
    title: 'Project Orange',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Paw Patrol',
    title: 'Pups To The Rescue',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '5678567',
    series: 'Wild Kratts',
    title: 'Wolf Hawks',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Dumpster Diving',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '1323876',
    series: 'Annedroids',
    title: 'Search Partly',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  },
  {
    id: '2355722',
    series: 'Wild Kratts',
    title: 'Elephants',
    status: 'Active',
    description: 'Lorem ipsum dolor sit amet...',
    schedule: [{
      pubpoint: 'Brightcove / tvo.org',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'Brightcove / TVOKids',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    },
    {
      pubpoint: 'YouTube TAWSP',
      start: '2019-05-22 23:30',
      end: '2019-05-22 23:30'
    }
  ]
  }
]

const App = () => {

  //Create global state
  const [asset, setAsset] = useState();
  const [collection, setCollection] = useState(initialCollection);
  const [currentUser, setCurrentUser] = useState(1);
  const [users, setUsers] = useState(initialUsers);
  const [scheduleId, setScheduleId] = useState();
  const [publishStart, setPublishStart] = useState();
  const [publishEnd, setPublishEnd] = useState();
  const [platform, setPlatform] = useState('');
  const [editing, setEditing] = useState(false); // schedule editing
  const [instanceEditing, setInstanceEditing] = useState(false);
  const [status, setStatus] = useState();

  return (
    <Router>
      <div>
        <Context.Provider value={{ instanceEditing, setInstanceEditing, status, setStatus, editing, setEditing, platform, setPlatform, publishEnd, setPublishEnd, publishStart, setPublishStart, scheduleId, setScheduleId, asset, setAsset, collection, setCollection, currentUser, setCurrentUser, users, setUsers }}>
          <Navigation/>
          <Route exact path="/" component={Dashboard} />
          <Route exact path="/assets" component={Assets} />
          <Route exact path="/template" component={Template} />
          <Route exact path="/restores" component={Restores} />
          <Route exact path="/instances" component={Instances} />
          <Route exact path="/schedules" component={Schedules} />
          <Route exact path="/schedule" component={Schedule} />
          <Route exact path="/collection" component={Collection} />
          <Route exact path="/admin" component={Admin} />
          <Route exact path="/login" component={Login} />
        </Context.Provider>
      </div>
    </Router>
  )
}

export default App;