import { parseCookies } from 'nookies';
import ioclient from 'socket.io-client';
import { ACCESS_TOKEN_LOC } from 'src/Constants/common.constants';
import { BASEURL } from 'src/Constants/services.constants';

export const socketinit = {
  token: '',
  socket: null,
  getSocket: function soket(tokenid) {
    if(!this.socket){
      const cookie = parseCookies();
      const token = tokenid || cookie[ACCESS_TOKEN_LOC] || this.token || '';
      this.socket = ioclient(BASEURL, {
        auth: {
          token: 'Bearer ' + token
        },
        reconnectionAttempts: 10
      });
      return this.socket;
    }
    return this.socket;
  },
  addtoken: function addtoken(token) {
    this.token = token;
  },

  removetoken: function removetoken() {
    this.token = '';
  },
  disconnect: function disconnect(){
    if(this.socket){
      this.socket.disconnect();
      this.socket = null;
    }
  }
};