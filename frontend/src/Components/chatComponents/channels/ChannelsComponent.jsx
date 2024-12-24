import { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Nav } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import Channel from './Channel.jsx';
import ChatModal from '../modals/Modal.jsx';
import { actions } from '../../../store/index.js';

export default () => {
  const channelsInfo = useSelector((s) => s.channelsInfo);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { openModal } = actions;
  const channelsView = useRef(null);
  
  const addChannelModal = () => {
    dispatch(openModal({ type: 'addChannel' }));
  };

  useEffect(() => {
    channelsView.current?.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
  }, [channelsInfo.channels.length]);

  return (
    <>
      <ChatModal />
      <div className='col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex'>
        <div className='d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4'>
          <b>{t('channels')}</b>
          <Button 
          variant='gruop-vertical'
          className='p-0'
          onClick={addChannelModal}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
            </svg>
            <span className='visually-hidden'>+</span>
          </Button>  
        </div>
        <Nav>
            {channelsInfo.channels.map((channel) => (
              <Channel channel={channel} key={channel.id} />
            ))}
        </Nav>
      </div>
    </>
  );
};