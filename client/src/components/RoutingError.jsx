import {useRouteError} from 'react-router-dom'

function RoutingError() {
    let err=useRouteError()
    console.log(err)
  return (
    <div>
        <h1 className='display-1 text-danger mt-5 text-center'>{err.data}</h1>
        <h2 className='text-center display-3 text-warning'>{err.status}-{err.statusText}</h2>
    </div>
  )
}

export default RoutingError