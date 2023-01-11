import React from 'react';
//import {WP_URL} from '@env';
// console.log('WPAI');

export const WPapi = async route => {
  // console.log('WPapi',global.api_url + '' + route);
  if(global.api_url!=null && global.api_url!=''){
    try {
      const response = await fetch(global.api_url + '' + route);
      const json = await response.json();
      return json;
    } catch (error) {
      // console.error(error);
      return {status:500};
    }
  } else {
    return {status:300};
  }
};