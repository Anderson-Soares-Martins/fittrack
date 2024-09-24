import {
  useState,
  useEffect,
  createContext,
  useContext,
  type PropsWithChildren
} from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";

import {
  GoogleSignin,
  isErrorWithCode,
  isSuccessResponse,
  statusCodes,
  User
} from "@react-native-google-signin/google-signin";

const AuthContext = createContext<{
  signIn: () => void;
  signOut: () => void;
  session?: User | FirebaseAuthTypes.User | null;
  initializing: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  initializing: false
});

// Hook to use the authentication context
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [initializing, setInitializing] = useState(true);
  const [session, setSession] = useState<User | FirebaseAuthTypes.User | null>(
    null
  );

  GoogleSignin.configure({
    webClientId:
      "893071096204-qgvai1u2uf5f775ouhsm43gmait8u7pg.apps.googleusercontent.com",
    offlineAccess: true,
    profileImageSize: 120
  });

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      setSession(user);
      if (initializing) setInitializing(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  // Sign in with Google
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      const response = await GoogleSignin.signIn();
      if (isSuccessResponse(response)) {
        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(
          response.data?.idToken
        );
      }
    } catch (error) {
      if (isErrorWithCode(error)) {
        console.log(error);
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => console.log("User signed out!"));
  };

  return (
    <AuthContext.Provider
      value={{
        signIn,
        session,
        initializing,
        signOut
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
