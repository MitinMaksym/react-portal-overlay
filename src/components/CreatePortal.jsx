import { useLayoutEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ReactDOM from 'react-dom';


function createWrapperAndAppendToBody(wrapperId) {
    const wrapper = document.createElement("div")
    wrapper.setAttribute("id",wrapperId)
    document.body.appendChild(wrapper)
    return wrapper

}

 const ReactPortal = ({children,wrapperId="react-portal-wrapper"}) => {
     const [wrapperElement,setWrapperElement] = useState(null)
     const [elementCreated, setElementCreated] = useState(false)
    useLayoutEffect(() => {
        let element = document.getElementById(wrapperId)
        if (!element) {
             element = createWrapperAndAppendToBody(wrapperId)
       
            setElementCreated(true)
        }
        setWrapperElement(element) 

        return () => {
            if(elementCreated && wrapperElement.parentNode) {
                wrapperElement.parentNode.removeChild(wrapperElement)
            }
        }
    },[wrapperId])

     if (wrapperElement === null) return null;
   
        return ReactDOM.createPortal(children,wrapperElement)

     
}

export default ReactPortal
