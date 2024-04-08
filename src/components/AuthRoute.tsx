import { Navigate } from 'react-router-dom'

export const AuthRoute = ({ children } : {children:JSX.Element}) => {
  if(localStorage.getItem('token')){
    return <>{children}</>
  }else{
    return <Navigate to={'/login'} replace></Navigate>
  }
}