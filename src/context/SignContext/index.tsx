import React,{createContext,useState,useEffect} from 'react';

interface Props{
    children : JSX.Element | Array<JSX.Element>;
}

const SignContext = createContext<ISignContext>({
    userId: 0,
    isSigned : false,
    trySignIn : (id:number):void =>{},
    trySignUp :():void => {},
});

const SignContextProvider = ({children}:Props)=>{
    const [isSigned,setSignFlag] = useState<boolean>(false);
    const [userId,setUserId] = useState<number>(0);

    const trySignIn = (id:number):void =>{
        setUserId(id);
        setSignFlag(true);
    };

    const trySignUp = ():void =>{
        setSignFlag(false);
    }
    useEffect(()=>{
        setSignFlag(false);
    },[])

    return (
        <SignContext.Provider
        value={{userId,isSigned,trySignIn,trySignUp}}>
            {children}
        </SignContext.Provider>
    );
};

export {SignContext,SignContextProvider};