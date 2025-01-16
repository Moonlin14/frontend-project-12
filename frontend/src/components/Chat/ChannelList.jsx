import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ChannelItem from './ChannelItem';
import useLiveData from '../../hooks/useLiveData';
import Loading from '../PagesComponents/Loading';
import DropdownMenu from './DropdownMenu';
import { openModal, closeModal } from '../../store/slices/modalSlice';
import { activeChannelSelector } from '../../store/slices/activeChannelSlice';
import getModal from '../Modals';
import defaultChannel from '../../utils/defaultChannel';
import ChannelTitle from './ChannelTitle';

const renderModal = (type, close, channel) => {
  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component closeModal={close} channel={channel} />;
};

const ChannelsList = () => {
  const { t } = useTranslation();
  const modalType = useSelector((state) => state.modal.modalType);
  const activeChannel = useSelector(activeChannelSelector);
  const { activeChannelId, channels, isLoading } = useLiveData(activeChannel);
  const dispatch = useDispatch();
  const handleOpenModal = (type, channel) => dispatch(openModal({ type, channel }));
  const handleCloseModal = () => dispatch(closeModal());
  const isEditableChannel = (channel) => channel.removable;

  const channelsListRef = useRef(null);

  useEffect(() => {
    if (activeChannelId === defaultChannel.id) {
      channelsListRef.current.scrollTop = 0;
    } else {
      channelsListRef.current.scrollTop = channelsListRef.current.scrollHeight;
    }
  }, [channels, activeChannelId]);

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <ChannelTitle
        openModal={handleOpenModal}
        t={t}
      />
      <ul
        ref={channelsListRef}
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {isLoading && <Loading t={t} />}
        {channels?.map((channel) => (
          <li className="nav-item w-100" key={channel.id}>
            {isEditableChannel(channel) ? (
              <DropdownMenu
                openModal={handleOpenModal}
                channel={channel}
                t={t}
              />
            ) : (
              <ChannelItem channel={channel} />
            )}
          </li>
        ))}
      </ul>
      {renderModal(modalType, handleCloseModal)}
    </div>
  );
};

export default ChannelsList;
