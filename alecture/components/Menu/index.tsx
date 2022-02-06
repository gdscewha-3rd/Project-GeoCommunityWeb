import React, { FC, useCallback, CSSProperties, PropsWithChildren} from "react";
import { CloseModalButton, CreateMenu } from "@components/Menu/styles";

interface Props{
    show:boolean;
    onCloseModal:()=>void;
    style: CSSProperties;
    closeButton?:boolean;
}
const Menu:FC<PropsWithChildren<Props>>=({closeButton, children, style, show, onCloseModal})=>{
    const stopPropagation=useCallback((e)=>{
        e.stopPropagation();
    },[]);
    return(
        <CreateMenu onClick={onCloseModal}>
            <div style={style} onClick={stopPropagation}>
                {closeButton &&<CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>}
                 {children}
            </div>
            
        </CreateMenu>
    );
};
Menu.defaultProps={
    closeButton:true,
};

export default Menu;