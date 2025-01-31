import { parseCookies } from 'nookies';
import ioclient from 'socket.io-client';
import { ACCESS_TOKEN_LOC } from 'src/Constants/common.constants';
import { BASEURL } from 'src/Constants/services.constants';

export const socketinit = {
  token: '',
  socket: function soket(tokenid) {
    const cookie = parseCookies();
    const token = tokenid || cookie[ACCESS_TOKEN_LOC] || this.token || '';
    return ioclient(BASEURL, {
      auth: {
        token: 'Bearer ' + token
      },
      reconnectionAttempts: 10
    });
  },
  addtoken: function addtoken(token) {
    this.token = token;
  },

  removetoken: function removetoken() {
    this.token = '';
  }
};