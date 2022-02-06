import { CloseModalButton } from "@components/Menu/styles";
import { CSSProperties } from "@emotion/serialize";
import React, { FC, useCallback } from "react";
import { CreateModal } from "./styles";

interface Props{
    show:boolean;
    onCloseModal:(e:any)=>void;
    //style: CSSProperties;
    closeButton?:boolean;
}
const Modal: FC<Props>=({show, children, onCloseModal})=>{
    const stopPropagation=useCallback((e)=>{
        e.stopPropagation();
    }, []);

    if(!show){
        return null;
    }
    return(
        <CreateModal onClick={onCloseModal}>
            <div onClick={stopPropagation}>
                <CloseModalButton onClick={onCloseModal}>&times;</CloseModalButton>
                {children}
            </div>
        </CreateModal>
    );
};

export default Modal;