import ChannelsList from './ChannelList';
import MessagesContainer from './MessagesContainer';

const Container = () => (
  <div className="container h-100 my-4 overflow-hidden rounded shadow">
    <div className="row h-100 bg-white flex-md-row">
      <ChannelsList />
      <MessagesContainer />
    </div>
  </div>
);

export default Container;
