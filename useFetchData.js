import * as React from 'react'

const reducer = (state, action) => {
  switch (action.type) {
    case 'fetching':
      return {data: null, error: null, status: 'fetching'}
    case 'done':
      return {data: action.payload, error: null, status: 'done'}
    case 'fail':
      return {data: null, error: action.error, status: 'fail'}
    default:
      throw new Error('Action non supportée')
  }
}

function useFetchData() {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })

  const execute = React.useCallback(promise => {
    dispatch({type: 'fetching'})
    promise
      .then(data => dispatch({type: 'done', payload: data}))
      .catch(error => dispatch({type: 'fail', error}))
  }, [])

  return {...state, execute}
}

function useFetchSearch(search, fetch) {
  const [state, dispatch] = React.useReducer(reducer, {
    data: null,
    error: null,
    status: 'idle',
  })

  React.useEffect(() => {
    if (!search) {
      return
    }

    dispatch({type: 'fetching'})

    fetch(search)
      .then(data => dispatch({type: 'done', payload: data}))
      .catch(error => dispatch({type: 'fail', error}))
  }, [fetch, search])

  return state
}

export default useFetchData
export useFetchSearch
