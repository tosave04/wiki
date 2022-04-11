import * as React from 'react'

function useFetchData(search, fetch) {
  const reducer = (state, action) => {
    switch (action.type) {
      case 'fetching':
        return {data: null, error: null, status: 'fetching'}
      case 'fail':
        return {data: null, error: action.error, status: 'fail'}
      case 'done':
        return {data: action.payload, error: null, status: 'done'}
      default:
        throw new Error('Action non supportée')
    }
  }

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
