import React, { useState, useEffect, createContext } from 'react';

export const PageContext = createContext();

const PageContextProvider = (props) => {

    const [lang, setLanguage] = useState('');
    const [showNav, setShowNav] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [disablePlayer, setDisablePlayer] = useState(false);
    const [uriWebview, setUriWebview] = useState('');
    const [route, setRoute] = useState('');

    // global.loadLanguage(lang);
    // global.setLanguage(lang);    
    
    return (
        <PageContext.Provider value={{ 
            lang : lang,
            setLanguage : setLanguage,
            showNav : showNav,
            setShowNav : setShowNav,
            showPlayer : showPlayer,
            setShowPlayer : setShowPlayer,
            disablePlayer : disablePlayer,
            setDisablePlayer : setDisablePlayer,
            route : route,
            setRoute : setRoute
        }}>
        	{props.children}
        </PageContext.Provider>
    );
}
export default PageContextProvider;