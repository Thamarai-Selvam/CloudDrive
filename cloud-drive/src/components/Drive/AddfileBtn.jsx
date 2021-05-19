import {React, useState} from 'react'
import ReactDOM from 'react-dom';
import { ProgressBar, Toast } from "react-bootstrap"
import {FontAwesomeIcon as FAS } from '@fortawesome/react-fontawesome'
import {faFileUpload} from '@fortawesome/free-solid-svg-icons'
import {database, storage} from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { RootFolder } from '../../customHooks/useFolder'
import {v4 as uuidV4} from 'uuid'

export default function AddfileBtn({currentFolder}) {

    const {currentUser } = useAuth()
    const [uploadingFiles, setUploadingFiles] = useState([])

    function handleUpload(e) {
        const file = e.target.files[0]   
        if(currentUser == null || file == null)
            return
        const fileUID = uuidV4()
        setUploadingFiles(prevUpFiles => [...prevUpFiles, {id:fileUID, name:file.name, progress:0, error:false} ])
        const folderPath = currentFolder.path.length > 0
                            ? `${currentFolder.path.join('/')}`
                            : ''
        
        const filePath = currentFolder === RootFolder ? `${folderPath}/${file.name}` : `${folderPath}/${currentFolder.dirName}/${file.name}`
        console.log(filePath);

        const uploader = storage.ref(`/files/${currentUser.uid}/${filePath}`).put(file)

        uploader.on('state_changed', snapshot => {

            const progress = snapshot.bytesTransferred/ snapshot.totalBytes
            setUploadingFiles(prevUpFiles => {
                return prevUpFiles.map(uploadFile => {
                    if(uploadFile.id === fileUID) {
                        return { ...uploadFile, progress: progress}
                    }
                })
            })

        }, () => {
            setUploadingFiles(prevUpFiles => {
                return prevUpFiles.map(uploadFile => {
                    if(uploadFile.id === fileUID) {
                        return { ...uploadFile, error: true}
                    }
                    return uploadFile
                })
            })
        }, () => {

          
            setUploadingFiles(prevUpFiles => {
                return prevUpFiles.filter(uploadFile => {
                    return uploadFile.id !== fileUID
                })
            })

            uploader.snapshot.ref.getDownloadURL().then(url => {
                database.files
                .where("name", "==", file.name)
                .where("userID", "==", currentUser.uid)
                .where("folderID", "==", currentFolder.id)
                .get()
                .then(existingFiles => {
                const existingFile = existingFiles.docs[0]
                if (existingFile) {
                    existingFile.ref.update({ url: url })
                }
                else {
                    database.files.add({
                    name: file.name,
                    url: url,
                    createdAt : database.getCurrentTimestamp(),
                    folderID : currentFolder.id,
                    userID : currentUser.uid
                })
                }
                }) 
                
            })
        })

    }
   
    return (
        <>
            <label className="btn btn-outline-success btn-sm m-0 mr-2">
                <FAS icon={faFileUpload} />
                <input type="file" onChange={handleUpload} style={{ opacity: 0, position: "absolute", left: "-9999px" }}/>
            </label>
            
            {
                uploadingFiles.length > 0 && 
                ReactDOM.createPortal(
                    <div
                    style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "1rem",
                        maxWidth: "250px",
                    }}
                    >
                    {
                        uploadingFiles.map(file => (
                            <Toast
                            key={file.id}
                            onClose={() => {
                                setUploadingFiles(prevUploadingFiles => {
                                return prevUploadingFiles.filter(uploadFile => {
                                    return uploadFile.id !== file.id
                                })
                                })
                            }}
                            >
                            <Toast.Header
                                className="text-truncate w-100 d-block"
                                closeButton={file.error}
                            >
                                {file.name}
                            </Toast.Header>
                            <Toast.Body>
                                <ProgressBar
                                animated={!file.error}
                                variant={file.error ? "danger" : "primary"}
                                now={file.error ? 100 : file.progress * 100}
                                label={
                                    file.error
                                    ? "Error"
                                    : `${Math.round(file.progress * 100)}%`
                                }
                                />
                            </Toast.Body>
                            </Toast>
                        ))
                    }
                    </div>,
                    document.body
                )
            }
        </>
    )
        
}
