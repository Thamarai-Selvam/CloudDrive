import {useReducer,useEffect} from 'react'
import { useAuth } from '../contexts/AuthContext'
import { database } from '../firebase'

const Actions = {
    SelectFolder : 'selectFolder',
    UpdateFolder: "updateFolder",
    SetChildFolder: "setChildFolders",
    SetChildFiles: "setChildFiles",
}

export const RootFolder = { dirName: "Root", id: null, path: [] }


function reducer(state, {type, payload}) {
    switch(type){
        case Actions.SelectFolder :
            return {
                folderID: payload.folderID,
                folder: payload.folder,
                childFiles: [],
                childFolders: []
            }
        case Actions.UpdateFolder:
            return {
                ...state,
                folder: payload.folder,
            }
        case Actions.SetChildFolder:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case Actions.SetChildFiles:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state    
    }
}

export default function useFolder(folderID = null, folder = null) {
    
    const [state, dispatch] = useReducer(reducer, {
        folderID,
        folder,
        childFolders : [],
        childFiles : []
    })
    const {currentUser} = useAuth()
    useEffect(() => {
        dispatch({
            type : Actions.SelectFolder,
            payload : { folderID, folder }
        })
    }, [folderID, folder])

    useEffect(() => {
        if (folderID == null) {
            return dispatch({
                type : Actions.UpdateFolder,
                payload : { folder : RootFolder }
            })
        }
        database.folders.doc(folderID).get()
        .then(doc => {
            dispatch({
                type: Actions.UpdateFolder,
                payload: { folder: database.formatDoc(doc) },
            })
            console.log('doc', database.formatDoc(doc))
        }).catch(() => {
            dispatch({
                type: Actions.UpdateFolder,
                payload : { folder : RootFolder }
            })
        })
    }, [folderID])

    useEffect(() => {
       
        return database.folders
        .where('parentID', '==', folderID)
        .where('userID', '==', currentUser.uid)
        // .orderBy('createdAt')
        .onSnapshot(snapshot  => {
            dispatch({
                type : Actions.SetChildFolder,
                payload : {childFolders : snapshot.docs.map(database.formatDoc)}
            })
        })
        
    }, [folderID, currentUser])

    useEffect(() => {
       
        return database.files
        .where('folderID', '==', folderID)
        .where('userID', '==', currentUser.uid)
        // .orderBy('createdAt')
        .onSnapshot(snapshot  => {
            dispatch({
                type : Actions.SetChildFiles,
                payload : {childFiles : snapshot.docs.map(database.formatDoc)}
            })
        })
        
    }, [folderID, currentUser])

    
    console.log('state',state);
    return state

}
