import { useSelector } from 'react-redux';
import { Dropdown, ButtonGroup } from 'react-bootstrap';
import { activeChannelSelector } from '../../store/slices/activeChannelSlice';
import ChannelItem from './ChannelItem';

const DropdownMenu = ({
  openModal,
  channel,
  t,
}) => {
  const activeChannel = useSelector(activeChannelSelector);
  return (
    <Dropdown as={ButtonGroup} className="me-2 w-100">
      <ChannelItem channel={channel} />
      <Dropdown.Toggle
        split
        variant={activeChannel.id === channel.id ? 'secondary' : ''}
        id="channelDropdown"
      >
        <span className="visually-hidden">{t('channel.description')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item onClick={() => openModal('removing', channel)}>
          {t('channel.deleteButton')}
        </Dropdown.Item>
        <Dropdown.Item onClick={() => openModal('renaming', channel)}>
          {t('channel.renameButton')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default DropdownMenu;
