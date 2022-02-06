import {
    AddButton,
    Channels,
    Chats,
    Header,
    LogOutButton,
    MenuScroll,
    ProfileImg,
    ProfileModal,
    RightMenu,
    WorkspaceButton,
    WorkspaceModal,
    WorkspaceName,
    Workspaces,
    WorkspaceWrapper,
  } from './styles';
import React, { FC, useCallback, useState } from "react";
import fetcher from "@utils/fetcher";
import useSWR from "swr";
import axios from "axios";
import{Link, Redirect, Route, Switch} from "react-router-dom";
import gravatar from 'gravatar';
import loadable from "@loadable/component";
import Menu from "@components/Menu";
import { IUser } from "@typings/db";
import { Button, Input, Label } from "@pages/SignUp/styles";
import useInput from "@hooks/useInput";
import Modal from '@components/Modal';
import { toast } from 'react-toastify';


const Channel=loadable(()=>import('@pages/Channel'));
const DirectMessage=loadable(()=>import('@pages/DirectMessage'));

const Workspace: FC=({children})=>{
    const [newUrl, onChangeNewUrl, setNewUrl]=useInput('');
    const [newWorkspace, onChangeNewWorkspace, setNewWorkspace]=useInput('');
    const [showUserMenu, setShowUserMenu]=useState(false);
    const [showCreateWorkspaceModal, setShowCreateWorkspaceModal]=useState(false);
    const { data:userData, error, revalidate, mutate } = useSWR<IUser | false>('http://localhost:3095/api/users', fetcher, {
        dedupingInterval: 2000, //2초
    });

    const onLogout=useCallback(()=>{
        axios
        .post('http://localhost:3095/api/users/logout',null, {
            withCredentials: true,
        } )
        .then(()=>{
            mutate(false, false);
        })
    }, []);

    const onCloseUserProfile=useCallback((e)=>{
        e.stopPropagation();
        setShowUserMenu(false);
    }, []);

    const onClickUserProfile=useCallback(()=>{
        setShowUserMenu((prev)=>(!prev));
    }, []);

    const onClickCreateWorkspace=useCallback(()=>{
        setShowCreateWorkspaceModal(true);
    }, []);

    const onCreateWorkspace=useCallback((e)=>{
        e.preventDefault();
        if(!newWorkspace||!newWorkspace.trim()) return;
        if(!newUrl||!newUrl.trim()) return;
        axios.post('http://localhost:3095/api/workspaces',{
            workspace: newWorkspace,
            url: newUrl,
        }, {
            withCredentials: true,
        })
        .then(()=>{
            revalidate();
            setShowCreateWorkspaceModal(false);
            setNewWorkspace('');
            setNewUrl(''); //완료되고 나면 input창 비워두기
        })
        .catch((error)=>{
            console.dir(error);
            toast.error(error.response?.data,{position:'bottom-center'});
        });

    }, [newWorkspace, newUrl]);

    const onCloseModal=useCallback(()=>{
        setShowCreateWorkspaceModal(false);
    }, []);

    if(!userData){ //로그아웃해서 data가 false가 되는 순간 login페이지로 보내버림 
        return <Redirect to="/login"/>;
    }

    return(
        <div>
        <Header>
            <RightMenu>
                <span onClick={onClickUserProfile}>
                    <ProfileImg src={gravatar.url(userData.email, {s: '28px', d: 'retro'})} alt={userData.nickname}/>
                    {showUserMenu && (
                    <Menu style={{right: 0, top: 38}} show={showUserMenu} onCloseModal={onClickUserProfile}>
                        <ProfileModal>
                            <img src={gravatar.url(userData.email, {s: '36px', d: 'retro'})} alt={userData.nickname}/>
                            <div>
                                <span id="profile-name">{userData.nickname}</span>
                                <span id="profile-active">Active</span>
                            </div>
                        </ProfileModal>
                        <LogOutButton onClick={onLogout}>로그아웃</LogOutButton>
                    </Menu>
                    )}
                </span>
            </RightMenu>
          
        </Header>
        <button onClick={onLogout}>로그아웃</button>
        <WorkspaceWrapper>
            <Workspace>
                {userData?.Workspaces?.map((ws)=>{
                return(
                    <Link key={ws.id} to={'/workspace/${123}/channel/일반'}>
                        <WorkspaceButton>{ws.name.slice(0, 1).toUpperCase()}</WorkspaceButton>
                    </Link>
                )
            })}
            <AddButton>onClick={onClickCreateWorkspace}</AddButton>
            </Workspace>
            <Channels>
                <WorkspaceName>Sleact</WorkspaceName>
                <MenuScroll>menu scroll</MenuScroll>
            </Channels>
            <Chats>
                <Switch>
                    <Route path="/workspace/:workspace/channel/:channel" component={Channel} />
                    <Route path="/workspace/:workspace/dm/:id" component={DirectMessage} />
                </Switch>
            </Chats>
        </WorkspaceWrapper>
        <Modal show={showCreateWorkspaceModal} onCloseModal={onCloseModal}>
            <form onSubmit={onCreateWorkspace}>
            <Label id='workspace-label'>
                <span>워크스페이스 이름</span>
                <Input id='workspace' value={newWorkspace} onChange={onChangeNewWorkspace}/>
            </Label>
            <Label id='workspace-url-label'>
                <span>워크스페이스 이름</span>
                <Input id='workspace' value={newUrl} onChange={onChangeNewUrl}/>
            </Label>
            <Button type="submit">생성하기</Button>
            </form>
        </Modal>
        {children}
        </div>
    )
}

export default Workspace;