import { io } from 'socket.io-client';
import store, { actions } from '../store/index.js';

const { addMessage, addChannel, deleteChannel, renameChannel } = actions;

const { dispatch } = store;

const socket = io();
socket.on('newMessage', (payload) => {
  dispatch(addMessage(payload));
});
socket.on('newChannel', (payload) => {
  dispatch(addChannel(payload));
});
socket.on('removeChannel', (payload) => {
  dispatch(deleteChannel(payload));
});
socket.on('renameChannel', (payload) => {
  dispatch(renameChannel(payload));
});

const chatApi = {
  sendMessage: (message) => new Promise((resolve, reject) => {
    socket.emit('newMessage', message, (respones) => {
      if (respones.error) {
        console.error(respones.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
  newChannel: (name) => new Promise((resolve, reject) => {
    socket.emit('newChannel', { name }, (respones) => {
      if (respones.error) {
        console.error(respones.error);
        reject();
      } else {
        resolve(respones.data.id);
      }
    });
  }),
  removeChannel: (id) => new Promise((resolve, reject) => {
    socket.emit('removeChannel', { id }, (response) => {
      if (respones.error) {
        console.error(response.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
  renameChannel: ({ name, id }) => new Promise((resolve, reject) => {
    socket.emit('renameChannel', { name, id }, (respones) => {
      if (respones.error) {
        console.error(respones.error);
        reject();
      } else {
        resolve();
      }
    });
  }),
};

export default chatApi;