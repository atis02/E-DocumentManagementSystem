export const sendMessages = (document) =>{
    return {
        type:'SENDDOCUMENTS',
        payload:document
    }
}
export const deleteMessages = (document)=>{
    return {
        type:'DELETEDOCUMENTS',
        payload:document
    }
}