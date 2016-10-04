import React from 'react';
import classes from './HomeView.scss';
import ChatBox from 'components/ChatBox';
import api from 'services';

// export const HomeView = () => (
//   <div>
//     <ChatBox user="Robert" />
//   </div>
// );


class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      converstions: null
    };
  }

  componentDidMount() {
    console.log("componentDidMount");
    api.getLogs()
    .then(
      function(converstions){
        console.log("Updating state, ", converstions);
        this.setState({ converstions: converstions })
      }.bind(this)
    );
  }


  render() {
    console.log("rendering", this.state);
    let chatBoxes= [];
    if(this.state.converstions){
      this.state.converstions.forEach(function (conversation) {
        console.log("adding chat box");
        chatBoxes.push(<ChatBox key={conversation._id} conversation={conversation} />)
      });
    }
    return (
      <div>
        { chatBoxes }
    </div>
    );
  }
}


export default HomeView;
