// src/components/withAuth.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const withAuth = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P> => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
      return <div>Loading...</div>;
    }

    return user ? (
      <WrappedComponent {...props} />
    ) : (
      <Navigate to="/login" replace />
    );
  };

  return ComponentWithAuth;
};

export default withAuth;
