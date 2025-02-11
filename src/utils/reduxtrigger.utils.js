export const toast = {
  async success(message, timer) {
    const { appDispatch } = await import('../Redux/store/store');
    const { notitrigger } = await import('../Redux/notiReducer/notiReducer');
    appDispatch(notitrigger({ message, type: 'success', timer }));
  },
  async error(message, timer) {
    const { appDispatch } = await import('../Redux/store/store');
    const { notitrigger } = await import('../Redux/notiReducer/notiReducer');
    appDispatch(notitrigger({ message, type: 'error', timer }));
  }
};
