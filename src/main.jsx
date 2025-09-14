import { createRoot } from 'react-dom/client'
import {ThemeContextProvider} from './contexts/ThemeContext'
import { AuthContextProvider } from './contexts/AuthContext'
import  Router  from './Router/router'
import { CheckContextProvider } from './contexts/CheckContext'

createRoot(document.getElementById('root')).render(
    
        <AuthContextProvider>
            <CheckContextProvider>
        <ThemeContextProvider>
            <Router/>
        </ThemeContextProvider>
        </CheckContextProvider>
    </AuthContextProvider>
    
    
)
