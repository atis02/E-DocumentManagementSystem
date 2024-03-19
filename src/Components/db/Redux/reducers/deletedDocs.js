const documents = [];

const deletedDocuments = (deletedState = documents , action) => {
    const document = action.payload;
    switch (action.type) {
        case 'DELETEDOCUMENTS':
            const existDoc = deletedState.find((x)=>x.id === document.id)
            if(existDoc){
                return deletedState.map((x)=>x.id === document.id ? {...x,qauntity : x.qauntity +1 }:x) ;
            }
            else{
                const document = action.payload;
                return [
                    ...deletedState ,
                    {
                        ...document,
                    }
                ]
            }

            break
        default:
            return deletedState;

            break;
    }
}
export default deletedDocuments;
