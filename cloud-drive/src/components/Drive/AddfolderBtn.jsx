import {React, useState} from 'react'
import { Button, Modal,Form } from 'react-bootstrap'
import {FontAwesomeIcon as FAS } from '@fortawesome/react-fontawesome'
import {faFolderPlus} from '@fortawesome/free-solid-svg-icons'
import {database} from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import { RootFolder } from '../../customHooks/useFolder'


export default function AddfolderBtn({currentFolder}) {

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [name, setName] = useState('')
    const {currentUser } = useAuth()

    console.log('currentFolder',currentFolder);
    function toggleModal() {
            setIsModalOpen(!isModalOpen)
    }

    function handleSubmit(e) {
        e.preventDefault()

        //Duplicate local folder to firebase firestore
        if (currentFolder == null) 
            return 

        const path = [...currentFolder.path]

        if(currentFolder !== RootFolder)
            path.push({ dirName: currentFolder.dirName, id: currentFolder.id })

        const folderData = {
            userID : currentUser.uid,
            dirName : name,
            parentID : currentFolder.id ?? null,
            path,
            createdAt : database.getCurrentTimestamp(),

        }
        console.log('folderToUpdate',folderData);
        database.folders.add(folderData)
        setName('')
        toggleModal()
        
    }
   
    return (
        <>
            <Button onClick={toggleModal} variant='outline-success' size='sm'>
                <FAS icon={faFolderPlus}/>   
            </Button>
            <Modal show={isModalOpen} onHide={toggleModal}>
                <Form onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label>Folder Name</Form.Label>
                            <Form.Control type='text' value={name} onChange={e => setName(e.target.value)}/>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant='primary' size='sm' type='submit'>
                        Add Folder  
                    </Button>
                    <Button onClick={toggleModal} variant='secondary' size='sm'>
                        Close  
                    </Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </>
    )
}
