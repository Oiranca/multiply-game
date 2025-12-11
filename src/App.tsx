import { Route, Routes, Navigate } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { Container } from './infrastructure/views/Container/Container';
import { MultiplyIndex } from './infrastructure/components/Multiply/MultiplyIndex';
import { Home } from './infrastructure/components/Home/Home';
import { Login } from './infrastructure/components/Login/Login';
import { Profile } from './infrastructure/components/Profile/Profile';
import { ProtectedRoute } from './infrastructure/components/ProtectedRoute/ProtectedRoute';
import { RequireAuth } from './infrastructure/components/RequireAuth/RequireAuth';

function App() {
  return (
    <UserProvider>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              <RequireAuth>
                <Container />
              </RequireAuth>
            }
          >
            <Route index element={<Home />} />
            <Route path="multiply" element={<MultiplyIndex />} />
            <Route path="multiply/:numberMultiply" element={<MultiplyIndex />} />
            <Route
              path="profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </div>
    </UserProvider>
  );
}

export default App;
