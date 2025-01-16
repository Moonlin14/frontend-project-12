/* eslint-disable consistent-return */
const addSocketListener = async (
  socket,
  event,
  cacheDataLoaded,
  updateCachedData,
  cacheEntryRemoved,
) => {
  try {
    await cacheDataLoaded;
    const handleEvent = (payload) => {
      updateCachedData((draft) => {
        switch (event) {
          case 'newChannel':
          case 'newMessage':
            draft.push(payload);
            break;
          case 'renameChannel': {
            const channel = draft.find((c) => c.id === payload.id);
            if (channel) {
              channel.name = payload.name;
            }
            break;
          }
          case 'removeChannel':
            return draft.filter((c) => c.id !== payload.id);
          default:
            break;
        }
      });
    };
    socket.on(event, handleEvent);
  } catch (e) {
    console.error(e);
  }
  await cacheEntryRemoved;
  socket.off(event);
};

export default addSocketListener;
