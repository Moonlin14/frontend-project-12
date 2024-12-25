import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { useAuth } from '../../hooks/hooks.js';
import fetchData from "../../fetchData.js";
import ChannelsComponent from './channels/ChannelsComponent.jsx';
import MessagesComponent from './messages/MessagesComponent.jsx';

export default () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const channelsInfo = useSelector((state) => state.channelsInfo);

  useEffect(() => {
    const fetchUserData = async () => {
      dispatch(fetchData(auth.getAuthHeader()))
      .unwrap()
      .catch((e) => {
        toast.error(t('toast.authorisationError'));
        console.error(e);
      });
    };
    fetchUserData();
  }, [dispatch, auth, t]);

  if (channelsInfo.loading) {
    return (
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <h1>{t('loading')}</h1>
        </div>
      </Container>
    );
  }

  return (
    <Container className="h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row"> 
        <ChannelsComponent />
        <MessagesComponent />
      </div>
    </Container>
  );
};