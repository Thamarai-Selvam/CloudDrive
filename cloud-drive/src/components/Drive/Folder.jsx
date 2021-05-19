import React from 'react'
import {FontAwesomeIcon as FAS } from '@fortawesome/react-fontawesome'
import {faFolder} from '@fortawesome/free-solid-svg-icons'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Folder({folder}) {
    return (
        <Button 
            as ={Link} 
            to={{
                pathname : `/folder/${folder.id}` , 
                pState : {folder : folder}
            }} 
            variant='outline-dark'
            className="text-truncate w-100"
        >

           <FAS icon={faFolder} className="mx-2" />
                {folder.dirName}
        </Button>
    )
}
