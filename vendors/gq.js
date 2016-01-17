import 'whatwg-fetch'
//import {GRAPHQL_URL} from '../config';
// TODO: -> config
const GRAPHQL_URL = '/graphql'

function buildFetchParams(query, variables) {
  let params = {
    method: 'post',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify ({
      query: query,
      variables: variables
    })
  };

  return params
}

function gq( query, variables = null) {
  let success, reject = null
  let params = buildFetchParams (query, variables)

  fetch(GRAPHQL_URL, params)
  .then(response => response.json())
  .then(response => {
    if ('data' in response) {
      success(response.data)
    } else {
      reject(response.errors)
    }
  });

  return new Promise((_success, _reject) => {
    success = _success;
    reject  = _reject;
  });
}

export default gq;
export class ReactQL extends React.Component {
  q(query, variables) {
    (async ()=>{
      this.setState(await gq(query, variables));
    })();
  }
}
