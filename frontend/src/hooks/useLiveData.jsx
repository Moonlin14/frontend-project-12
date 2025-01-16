import { useGetChannelsQuery } from '../store/api/chatApi';
import defaultChannel from '../utils/defaultChannel';

const useLiveData = (channel) => {
  const { data: channels, isLoading } = useGetChannelsQuery();
  if (isLoading) {
    return { activeChannelId: null, activeChannelName: 'Loading...' };
  }
  const foundChannel = channels?.find((c) => c.id === channel.id);
  const activeChannel = foundChannel || defaultChannel;
  const activeChannelId = activeChannel.id;
  const activeChannelName = activeChannel.name;
  return {
    activeChannelId, activeChannelName, channels, isLoading,
  };
};

export default useLiveData;
