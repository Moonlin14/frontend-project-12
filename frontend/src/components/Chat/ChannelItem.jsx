import { useSelector, useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import {
  setActiveChannel,
  activeChannelSelector,
} from '../../store/slices/activeChannelSlice';
import useLiveData from '../../hooks/useLiveData';

const ChannelItem = ({ channel }) => {
  const activeChannel = useSelector(activeChannelSelector);
  const { activeChannelId } = useLiveData(activeChannel);
  const dispatch = useDispatch();
  const classes = channel.id === activeChannelId
    ? 'w-100 rounded-0 text-start text-truncate btn btn-secondary'
    : 'w-100 rounded-0 text-start text-truncate btn';
  const handleSetActiveChannel = (currentChannel) => {
    dispatch(setActiveChannel(currentChannel));
  };
  return (
    <button
      type="button"
      className={classes}
      onClick={() => handleSetActiveChannel(channel)}
    >
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </button>
  );
};

export default ChannelItem;
