import React from 'react'
import { Container } from 'react-bootstrap'
import { useLocation, useParams } from 'react-router'
import useFolder from '../../customHooks/useFolder'
import AddfolderBtn from './AddfolderBtn'
import AddfileBtn from './AddfileBtn'
import Folder from './Folder'
import FolderPath from './FolderPath'
import Header from './Header'
import File from './File.jsx'

export default function Dashboard() {
    const {folderID} = useParams()
    const {pState = {} } = useLocation()
    const { folder, childFolders, childFiles } = useFolder(folderID, pState.folder)
    console.log('folder',folder);
    console.log('childFolders', childFolders);
    return (
    <>
        <Header/>
        <Container fluid> 
        <div className="d-flex align-items-center">
          <FolderPath currentFolder={folder} />
          <AddfileBtn currentFolder={folder} />
          <AddfolderBtn currentFolder={folder} />
        </div>  
        {
            childFolders.length > 0 && (
            <div className="d-flex flex-wrap">
                {
                    childFolders.map(childFolder => (
                        <div
                            key={childFolder.id}
                            style={{ maxWidth: "250px" }}
                            className="p-2"
                        >
                        <Folder folder={childFolder} />
                    </div>
                    ))
                }
            </div>
            )
        }

            {
                childFolders.length > 0 && childFiles.length > 0 && <hr />}
                    {
                        childFiles.length > 0 && (
                            <div className="d-flex flex-wrap">
                                {childFiles.map(childFile => (
                                <div
                                    key={childFile.id}
                                    style={{ maxWidth: "250px" }}
                                    className="p-2"
                                >
                                    <File file={childFile} />
                                </div>
                                ))
                        }
                        </div>
                )
            }
        </Container>
            
    </>   
    )
}
