import ChannelsList from './ChannelList';
import MessagesContainer from './MessagesContainer';
import Loading from '../PagesComponents/Loading';
import { useGetChannelsQuery } from '../../store/api/chatApi';

const Container = () => {
  const { data: channels } = useGetChannelsQuery();

  if (channels === undefined) {
    return (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsList />
        <MessagesContainer />
      </div>
    </div>
  );
};

export default Container;
