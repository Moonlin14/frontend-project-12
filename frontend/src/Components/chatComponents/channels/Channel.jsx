import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup, Nav, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../../store/index.js';

export default ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { name, id, removable } = channel;
  const { setCurrentChannel, openModal } = actions;
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const { currentChannelId } = channelsInfo;

  const handleClick = (channelId) => {
    dispatch(setCurrentChannel(channelId));
  };

  const removeChannelModal = () => {
    dispatch(openModal({ type: 'removing', id }));
  };

  const renameChannelModal = () => {
    dispatch(openModal({ type: 'renaming', id }));
  };

  if(!removable) {
    return (
      <Nav.Item key={id} className='w-100' as='li'>
        <Button 
        variant={id === currentChannelId ? 'secondary' : 'light'}
        className='w-100 rounded-0 text-start'
        onClick={() => handleClick(id)}
        >
          <span className='me-1'>#</span>
          {name}
        </Button>
      </Nav.Item>
    );
  }

  return (
    <Nav.Item key={id} className='w-100' as='li'>
      <Dropdown className='d-flex btn-group' as={ButtonGroup}>
        <Button
        variant={id === currentChannelId ? 'secondary' : 'ligth'}
        className='w-100 rounded-0 text-start text-truncate'
        onClick={() => handleClick(id)}
        >
          <span className='me-1'>#</span>
          {name}
        </Button>
        <Dropdown.Toggle variant={id === currentChannelId ? 'secondary' : 'ligth'} className='flex-grow-0 dropdown-toggle-split'>
          <span className='visually-hidden'>{t('channelControl')}</span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={(e) => removeChannelModal(e)}>{t('remove')}</Dropdown.Item>
          <Dropdown.Item onClick={(e) => renameChannelModal(e)}>{t('rename')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};