"use client";

import { ReactElement, useEffect } from "react";
import { useSession } from "next-auth/react";
import { UserLoginGoogleInfo } from "../interfaces/User";
import { useAppDispatch } from "../stores/hooks";
import { setIsAuthencating } from "../stores/auth";
import { handleAuthen } from "../stores/asyncThunks/auth";

interface AuthProviderProps {
  children: ReactElement;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const { data: session, status } = useSession();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === "authenticated" && session.user) {
      dispatch(handleAuthen(session.user as UserLoginGoogleInfo));
    } else if (status === "unauthenticated") {
      dispatch(setIsAuthencating(false));
    }
  }, [status]);

  return <>{children}</>;
}
