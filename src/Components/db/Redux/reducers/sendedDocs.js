
const documents = [];
const delDocs = []
// console.log(delDocs);

const sendedDocs = (state = documents,action) =>{
    const document = action.payload;
    switch (action.type) {
        case 'SENDDOCUMENTS':
            const existItem = state.find((x)=>x.id === document.id)
            // console.log(state);
            if(existItem){
                return state.map((x)=>x.id === document.id?{...x, qauntity : x.qauntity+1} :x )
            }
            else{
                const document = action.payload;
                return[
                    ...state,
                    {
                        ...document,
                    }
                ]
                
            }
            break;
            case 'DELETEDOCUMENTS':
                return  state.filter((x)=>x.id !== document.id );
                

                break
    
        default:
            return state;
            break;
    }
}
export default sendedDocs;