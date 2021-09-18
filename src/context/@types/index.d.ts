interface ISignContext {
  userId: number;
  isSigned: boolean;
  trySignIn: (id: number) => void;
  trySignUp: () => void;
}
