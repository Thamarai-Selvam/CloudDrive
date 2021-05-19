import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { RootFolder } from '../../customHooks/useFolder'
import { Link } from "react-router-dom"

export default function FolderPath({currentFolder }) {
    let path = currentFolder === RootFolder ? [] : [RootFolder]
    console.log('path',...path);
    if(currentFolder)
        path = [...path, ...currentFolder.path]
    return (
        <>
            <Breadcrumb className='flex-grow-1' listProps={{className: 'bg-white pl-0 m-0'}}>
            { path.map((folder, index) =>(
                <Breadcrumb.Item  
                    key={folder.id}
                    linkAs={Link}
                    linkProps={{
                        to: {
                            pathname: folder.id ? `/folder/${folder.id}` : "/",
                            pState: { folder: { ...folder, path: path.slice(1, index) } },
                        },
                        // to : folder.id ? `/folder/${folder.id}` : "/"
                    }}
                    className="text-truncate d-inline-block"
                    style={{ maxWidth: "150px" }}
              >
                {folder.dirName}
                
                </Breadcrumb.Item>

            ))
            }
            {
                currentFolder && (
                    <Breadcrumb.Item className='text-truncate d-inline-block' style={{maxWidth : '200px'}} active>
                        {currentFolder.dirName}
                    </Breadcrumb.Item>
                )
            }
            </Breadcrumb>
        </>
    )
}
